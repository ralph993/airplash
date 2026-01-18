import { PubSub } from 'graphql-subscriptions';
import type { Context } from '../index.js';

const pubsub = new PubSub();

// Subscription event names
const JOB_STATUS_UPDATED = 'JOB_STATUS_UPDATED';
const WASHER_LOCATION_UPDATED = 'WASHER_LOCATION_UPDATED';
const NEW_JOB_IN_AREA = 'NEW_JOB_IN_AREA';

export const resolvers = {
  Query: {
    customer: async (_: unknown, { id }: { id: string }, { prisma }: Context) => {
      return prisma.customer.findUnique({ where: { id } });
    },

    washer: async (_: unknown, { id }: { id: string }, { prisma }: Context) => {
      return prisma.washer.findUnique({ where: { id } });
    },

    nearbyWashers: async (
      _: unknown,
      { location, radiusKm }: { location: { latitude: number; longitude: number }; radiusKm: number },
      { prisma }: Context
    ) => {
      // For now, return all available washers
      // TODO: Implement proper geospatial query with MongoDB
      const washers = await prisma.washer.findMany({
        where: { isAvailable: true },
      });
      return washers;
    },

    job: async (_: unknown, { id }: { id: string }, { prisma }: Context) => {
      return prisma.job.findUnique({
        where: { id },
        include: { customer: true, washer: true },
      });
    },

    customerJobs: async (_: unknown, { customerId }: { customerId: string }, { prisma }: Context) => {
      return prisma.job.findMany({
        where: { customerId },
        include: { customer: true, washer: true },
        orderBy: { createdAt: 'desc' },
      });
    },

    washerJobs: async (_: unknown, { washerId }: { washerId: string }, { prisma }: Context) => {
      return prisma.job.findMany({
        where: { washerId },
        include: { customer: true, washer: true },
        orderBy: { createdAt: 'desc' },
      });
    },

    availableJobs: async (
      _: unknown,
      { location, radiusKm }: { location: { latitude: number; longitude: number }; radiusKm: number },
      { prisma }: Context
    ) => {
      // For now, return all requested jobs
      // TODO: Implement proper geospatial filtering
      return prisma.job.findMany({
        where: { status: 'requested' },
        include: { customer: true },
        orderBy: { createdAt: 'desc' },
      });
    },
  },

  Mutation: {
    createCustomer: async (
      _: unknown,
      { email, name, phone }: { email: string; name: string; phone: string },
      { prisma }: Context
    ) => {
      return prisma.customer.create({
        data: { email, name, phone, addresses: [] },
      });
    },

    createWasher: async (
      _: unknown,
      { email, name, phone }: { email: string; name: string; phone: string },
      { prisma }: Context
    ) => {
      return prisma.washer.create({
        data: { email, name, phone },
      });
    },

    updateWasherLocation: async (
      _: unknown,
      { washerId, location }: { washerId: string; location: { latitude: number; longitude: number } },
      { prisma }: Context
    ) => {
      const washer = await prisma.washer.update({
        where: { id: washerId },
        data: { currentLocation: location },
      });

      pubsub.publish(`${WASHER_LOCATION_UPDATED}.${washerId}`, {
        washerLocationUpdated: washer,
      });

      return washer;
    },

    setWasherAvailability: async (
      _: unknown,
      { washerId, isAvailable }: { washerId: string; isAvailable: boolean },
      { prisma }: Context
    ) => {
      return prisma.washer.update({
        where: { id: washerId },
        data: { isAvailable },
      });
    },

    createJob: async (
      _: unknown,
      { customerId, input }: { customerId: string; input: any },
      { prisma }: Context
    ) => {
      const job = await prisma.job.create({
        data: {
          customerId,
          serviceType: input.serviceType,
          vehicle: input.vehicle,
          location: input.location,
          status: 'requested',
          price: calculatePrice(input.serviceType),
          notes: input.notes,
          scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : null,
        },
        include: { customer: true },
      });

      pubsub.publish(NEW_JOB_IN_AREA, { newJobInArea: job });

      return job;
    },

    acceptJob: async (
      _: unknown,
      { jobId, washerId }: { jobId: string; washerId: string },
      { prisma }: Context
    ) => {
      const job = await prisma.job.update({
        where: { id: jobId },
        data: {
          washerId,
          status: 'accepted',
          acceptedAt: new Date(),
        },
        include: { customer: true, washer: true },
      });

      pubsub.publish(`${JOB_STATUS_UPDATED}.${jobId}`, {
        jobStatusUpdated: job,
      });

      return job;
    },

    updateJobStatus: async (
      _: unknown,
      { jobId, status }: { jobId: string; status: string },
      { prisma }: Context
    ) => {
      const updateData: any = { status };

      if (status === 'in_progress') {
        updateData.startedAt = new Date();
      } else if (status === 'completed') {
        updateData.completedAt = new Date();
      }

      const job = await prisma.job.update({
        where: { id: jobId },
        data: updateData,
        include: { customer: true, washer: true },
      });

      pubsub.publish(`${JOB_STATUS_UPDATED}.${jobId}`, {
        jobStatusUpdated: job,
      });

      return job;
    },

    cancelJob: async (
      _: unknown,
      { jobId, reason }: { jobId: string; reason?: string },
      { prisma }: Context
    ) => {
      const job = await prisma.job.update({
        where: { id: jobId },
        data: {
          status: 'cancelled',
          cancelledAt: new Date(),
          notes: reason,
        },
        include: { customer: true, washer: true },
      });

      pubsub.publish(`${JOB_STATUS_UPDATED}.${jobId}`, {
        jobStatusUpdated: job,
      });

      return job;
    },

    rateJob: async (
      _: unknown,
      { jobId, rating, review }: { jobId: string; rating: number; review?: string },
      { prisma }: Context
    ) => {
      const job = await prisma.job.update({
        where: { id: jobId },
        data: { rating, review },
        include: { customer: true, washer: true },
      });

      // Update washer's average rating
      if (job.washerId) {
        const washerJobs = await prisma.job.findMany({
          where: { washerId: job.washerId, rating: { not: null } },
          select: { rating: true },
        });

        const avgRating =
          washerJobs.reduce((sum, j) => sum + (j.rating || 0), 0) / washerJobs.length;

        await prisma.washer.update({
          where: { id: job.washerId },
          data: { rating: avgRating, totalJobs: { increment: 1 } },
        });
      }

      return job;
    },
  },

  Subscription: {
    jobStatusUpdated: {
      subscribe: (_: unknown, { jobId }: { jobId: string }) => {
        return pubsub.asyncIterator(`${JOB_STATUS_UPDATED}.${jobId}`);
      },
    },

    washerLocationUpdated: {
      subscribe: (_: unknown, { washerId }: { washerId: string }) => {
        return pubsub.asyncIterator(`${WASHER_LOCATION_UPDATED}.${washerId}`);
      },
    },

    newJobInArea: {
      subscribe: () => {
        // TODO: Filter by location/radius
        return pubsub.asyncIterator(NEW_JOB_IN_AREA);
      },
    },
  },
};

// Helper function to calculate price based on service type
function calculatePrice(serviceType: string): number {
  const prices: Record<string, number> = {
    basic_wash: 25,
    full_wash: 45,
    interior_detail: 75,
    exterior_detail: 85,
    full_detail: 150,
  };
  return prices[serviceType] || 25;
}
