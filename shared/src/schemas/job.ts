import { z } from 'zod';
import { addressSchema, coordinatesSchema } from './user';

export const vehicleSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1900).max(2100),
  color: z.string().min(1),
  licensePlate: z.string().optional(),
});

export const serviceTypeSchema = z.enum([
  'basic_wash',
  'full_wash',
  'interior_detail',
  'exterior_detail',
  'full_detail',
]);

export const jobStatusSchema = z.enum([
  'requested',
  'accepted',
  'en_route',
  'arrived',
  'in_progress',
  'completed',
  'cancelled',
]);

export const jobSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  washerId: z.string().optional(),
  serviceType: serviceTypeSchema,
  vehicle: vehicleSchema,
  location: addressSchema,
  status: jobStatusSchema,
  price: z.number().positive(),
  notes: z.string().optional(),
  scheduledAt: z.date().optional(),
  acceptedAt: z.date().optional(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  cancelledAt: z.date().optional(),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createJobInput = z.object({
  serviceType: serviceTypeSchema,
  vehicle: vehicleSchema,
  location: addressSchema,
  notes: z.string().optional(),
  scheduledAt: z.date().optional(),
});

export const washerLocationUpdateSchema = z.object({
  washerId: z.string(),
  coordinates: coordinatesSchema,
  timestamp: z.date(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;
export type ServiceType = z.infer<typeof serviceTypeSchema>;
export type JobStatus = z.infer<typeof jobStatusSchema>;
export type Job = z.infer<typeof jobSchema>;
export type CreateJobInput = z.infer<typeof createJobInput>;
export type WasherLocationUpdate = z.infer<typeof washerLocationUpdateSchema>;
