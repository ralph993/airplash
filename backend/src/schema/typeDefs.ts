export const typeDefs = `#graphql
  enum SubscriptionTier {
    free
    pro
    premium
  }

  enum JobStatus {
    requested
    accepted
    en_route
    arrived
    in_progress
    completed
    cancelled
  }

  enum ServiceType {
    basic_wash
    full_wash
    interior_detail
    exterior_detail
    full_detail
  }

  type Coordinates {
    latitude: Float!
    longitude: Float!
  }

  type Address {
    street: String!
    city: String!
    state: String!
    zipCode: String!
    coordinates: Coordinates!
  }

  type Vehicle {
    make: String!
    model: String!
    year: Int!
    color: String!
    licensePlate: String
  }

  type Customer {
    id: ID!
    email: String!
    name: String!
    phone: String!
    addresses: [Address!]!
    jobs: [Job!]!
    createdAt: String!
    updatedAt: String!
  }

  type Washer {
    id: ID!
    email: String!
    name: String!
    phone: String!
    subscriptionTier: SubscriptionTier!
    isAvailable: Boolean!
    currentLocation: Coordinates
    rating: Float
    totalJobs: Int!
    jobs: [Job!]!
    createdAt: String!
    updatedAt: String!
  }

  type Job {
    id: ID!
    customer: Customer!
    washer: Washer
    serviceType: ServiceType!
    vehicle: Vehicle!
    location: Address!
    status: JobStatus!
    price: Float!
    notes: String
    scheduledAt: String
    acceptedAt: String
    startedAt: String
    completedAt: String
    cancelledAt: String
    rating: Int
    review: String
    createdAt: String!
    updatedAt: String!
  }

  # Inputs
  input CoordinatesInput {
    latitude: Float!
    longitude: Float!
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zipCode: String!
    coordinates: CoordinatesInput!
  }

  input VehicleInput {
    make: String!
    model: String!
    year: Int!
    color: String!
    licensePlate: String
  }

  input CreateJobInput {
    serviceType: ServiceType!
    vehicle: VehicleInput!
    location: AddressInput!
    notes: String
    scheduledAt: String
  }

  # Queries
  type Query {
    # Customer queries
    customer(id: ID!): Customer

    # Washer queries
    washer(id: ID!): Washer
    nearbyWashers(location: CoordinatesInput!, radiusKm: Float!): [Washer!]!

    # Job queries
    job(id: ID!): Job
    customerJobs(customerId: ID!): [Job!]!
    washerJobs(washerId: ID!): [Job!]!
    availableJobs(location: CoordinatesInput!, radiusKm: Float!): [Job!]!
  }

  # Mutations
  type Mutation {
    # Customer mutations
    createCustomer(email: String!, name: String!, phone: String!): Customer!

    # Washer mutations
    createWasher(email: String!, name: String!, phone: String!): Washer!
    updateWasherLocation(washerId: ID!, location: CoordinatesInput!): Washer!
    setWasherAvailability(washerId: ID!, isAvailable: Boolean!): Washer!

    # Job mutations
    createJob(customerId: ID!, input: CreateJobInput!): Job!
    acceptJob(jobId: ID!, washerId: ID!): Job!
    updateJobStatus(jobId: ID!, status: JobStatus!): Job!
    cancelJob(jobId: ID!, reason: String): Job!
    rateJob(jobId: ID!, rating: Int!, review: String): Job!
  }

  # Subscriptions
  type Subscription {
    jobStatusUpdated(jobId: ID!): Job!
    washerLocationUpdated(washerId: ID!): Washer!
    newJobInArea(location: CoordinatesInput!, radiusKm: Float!): Job!
  }
`;
