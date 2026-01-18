# Arplash - On-Demand Car Wash Platform

## Project Overview
Arplash is an on-demand car wash service platform with two PWA applications:
- **Customer app**: For users to request car wash services
- **Washer app**: For car wash providers to accept and manage jobs

## Tech Stack

### Frontend (Both PWAs)
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui (styling)
- Apollo Client (GraphQL client with subscription support)
- OneSignal (push notifications)
- PWA with service workers

### Backend
- Node.js + TypeScript
- Apollo Server (GraphQL with subscriptions via WebSockets)
- Prisma (ODM)
- MongoDB (database)

### External Services
- OneSignal - Push notifications
- Mapbox or Google Maps - Location/mapping
- Stripe - Washer subscription payments only

## Business Model

### Customers
- Pay washers directly in person (cash or card)
- No in-app payment required

### Washers (Subscription Tiers)
| Tier | Features |
|------|----------|
| **Free** | Limited visibility, capped jobs/month |
| **Pro** | Priority in search, unlimited jobs, verified badge |
| **Premium** | Top placement, featured washer status |

Stripe handles washer subscription billing. This avoids payment complexity on the customer side while providing predictable recurring revenue.

## Project Structure
```
arplash/
├── customer-fe/     # Customer PWA
├── washer-fe/       # Washer PWA
├── backend/         # GraphQL API server
├── shared/          # Shared types, validation schemas (Zod)
└── CLAUDE.md        # This file
```

## Architecture Decisions

### Why PWA First
- Faster iteration and validation
- Single codebase per app
- Can migrate to React Native later if needed

### Why GraphQL with Subscriptions
- Real-time updates needed for:
  - Washer location tracking
  - Job status changes (requested → accepted → en route → arrived → in progress → completed)
  - Availability updates

### Why MongoDB
- Flexible schema for rapid iteration
- Good geospatial query support (finding nearby washers)
- MongoDB Atlas for managed hosting

## Key Features (Planned)
- [ ] User authentication (customers & washers)
- [ ] Job request and acceptance flow
- [ ] Real-time washer location tracking
- [ ] Job status updates with push notifications
- [ ] Payment processing
- [ ] Rating and review system
- [ ] Washer availability management

## Conventions
- Use TypeScript strict mode
- Shared types between frontend and backend via `shared/` package
- Mobile-first responsive design
- Validate with Zod schemas (shared between client and server)

## Requirements
- Node.js 22+ (use `nvm use 22`)
- npm 10+

## Commands

### Initial Setup
```bash
# Switch to Node 22
nvm use 22

# Install all dependencies (from root)
npm install

# Build shared package first (required before running apps)
npm run build:shared

# Generate Prisma client
npm run db:generate -w backend
```

### Development
```bash
# Run backend (GraphQL server on port 4000)
npm run dev:backend

# Run customer frontend (Vite dev server)
npm run dev:customer

# Run washer frontend (Vite dev server)
npm run dev:washer
```

### Build
```bash
# Build everything
npm run build

# Build individual packages
npm run build:shared
npm run build:backend
npm run build:customer
npm run build:washer
```

### Database
```bash
# Push schema to MongoDB
npm run db:push -w backend

# Generate Prisma client
npm run db:generate -w backend
```

### Type Checking & Linting
```bash
npm run typecheck
npm run lint
```

## Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/arplash"
PORT=4000
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
ONESIGNAL_APP_ID=""
ONESIGNAL_API_KEY=""
```

### Frontend (`customer-fe/.env` and `washer-fe/.env`)
```env
VITE_GRAPHQL_URL="http://localhost:4000/graphql"
VITE_GRAPHQL_WS_URL="ws://localhost:4000/graphql"
```
