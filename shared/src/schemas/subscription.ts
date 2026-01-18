import { z } from 'zod';

export const subscriptionTierSchema = z.enum(['free', 'pro', 'premium']);

export const subscriptionLimitsSchema = z.object({
  tier: subscriptionTierSchema,
  maxJobsPerMonth: z.number().int().positive().or(z.literal(-1)), // -1 = unlimited
  searchPriority: z.number().int().min(1).max(3), // 1 = lowest, 3 = highest
  hasBadge: z.boolean(),
  isFeatured: z.boolean(),
});

// Subscription tier configurations
export const SUBSCRIPTION_LIMITS: Record<string, z.infer<typeof subscriptionLimitsSchema>> = {
  free: {
    tier: 'free',
    maxJobsPerMonth: 10,
    searchPriority: 1,
    hasBadge: false,
    isFeatured: false,
  },
  pro: {
    tier: 'pro',
    maxJobsPerMonth: -1,
    searchPriority: 2,
    hasBadge: true,
    isFeatured: false,
  },
  premium: {
    tier: 'premium',
    maxJobsPerMonth: -1,
    searchPriority: 3,
    hasBadge: true,
    isFeatured: true,
  },
};

export const washerSubscriptionSchema = z.object({
  id: z.string(),
  washerId: z.string(),
  tier: subscriptionTierSchema,
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  currentPeriodStart: z.date().optional(),
  currentPeriodEnd: z.date().optional(),
  cancelAtPeriodEnd: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;
export type SubscriptionLimits = z.infer<typeof subscriptionLimitsSchema>;
export type WasherSubscription = z.infer<typeof washerSubscriptionSchema>;
