import { z } from 'zod';

export const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  coordinates: coordinatesSchema,
});

export const customerSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().min(1),
  addresses: z.array(addressSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const washerSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().min(1),
  subscriptionTier: z.enum(['free', 'pro', 'premium']),
  isAvailable: z.boolean(),
  currentLocation: coordinatesSchema.optional(),
  rating: z.number().min(0).max(5).optional(),
  totalJobs: z.number().int().min(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input schemas for mutations
export const createCustomerInput = customerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createWasherInput = washerSchema.omit({
  id: true,
  rating: true,
  totalJobs: true,
  createdAt: true,
  updatedAt: true,
});

export type Customer = z.infer<typeof customerSchema>;
export type Washer = z.infer<typeof washerSchema>;
export type CreateCustomerInput = z.infer<typeof createCustomerInput>;
export type CreateWasherInput = z.infer<typeof createWasherInput>;
