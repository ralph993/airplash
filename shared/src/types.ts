// Common types used across the platform
// Note: SubscriptionTier and JobStatus are defined via Zod in schemas/

export type UserRole = 'customer' | 'washer';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: Coordinates;
}
