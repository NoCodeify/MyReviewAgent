# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WhatsAgent is a landing page for a WhatsApp AI automation service with A/B testing infrastructure. The project uses a Vite + React frontend with TypeScript, Express backend, and includes comprehensive conversion optimization experiments.

## Development Commands

```bash
# Development
npm run dev                   # Start development server (frontend + backend)

# Building
npm run build                # Build frontend with Vite and backend with esbuild

# Production
npm run start                # Run production build

# Type checking
npm run check                # Run TypeScript type checking

# Database
npm run db:push              # Push database schema changes to Neon
```

## Architecture

### Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Express server with TypeScript
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **State Management**: React Query (TanStack Query)
- **Routing**: Wouter (lightweight React router)
- **UI Components**: Radix UI primitives with custom styling

### Directory Structure

```
/client/src/
├── landing/v1/           # Landing page versions for A/B testing
│   ├── index.tsx        # Control version (18 components)
│   ├── indexA.tsx       # Version A - Problem-focused (10 components)
│   ├── indexB.tsx       # Version B - Value-focused (8 components)
│   ├── config/
│   │   └── variations.ts # Copy variations configuration
│   └── components/      # Landing page specific components
├── components/          # Shared UI components
├── pages/              # Application pages
├── hooks/              # Custom React hooks
└── services/           # API services

/server/
├── index.ts            # Server entry point
├── routes.ts           # Route registration
├── api/               # API endpoints
│   └── tracking.ts    # A/B test tracking endpoints
└── db/                # Database configuration
    ├── schema/        # Database schemas
    └── memory-store.ts # Session storage
```

## A/B Testing System

The project includes an advanced A/B testing framework for landing page optimization:

### Test Variations
1. **Page Structure Tests** (Routes: `/`, `/a`, `/b`)
   - Control: 18 components (full page)
   - Version A: 10 components (problem-focused)
   - Version B: 8 components (value-focused)

2. **Copy Variations** (URL parameter: `?v=`)
   - control: $5M focus
   - problem: Lead loss focus
   - savings: Cost reduction focus
   - speed: Quick setup focus
   - proof: Social proof focus

### Testing URLs
```bash
# Debug dashboard (shows all variations)
http://localhost:5173/?debug=true

# Structure variations
http://localhost:5173/      # Control
http://localhost:5173/a     # Version A
http://localhost:5173/b     # Version B

# Copy variations (combinable with structure)
http://localhost:5173/?v=problem
http://localhost:5173/a?v=savings
http://localhost:5173/b?v=speed
```

### Analytics Integration
- **Microsoft Clarity**: Site ID `ta73lpsqxt`
- **Custom tracking**: Via `trackVariationEvent()` function
- **Tracking API**: `/api/tracking` endpoints for event collection

## Path Aliases

```typescript
@/           → ./client/src/
@shared/     → ./shared/
@assets/     → ./attached_assets/
```

## Database Configuration

Using Drizzle ORM with PostgreSQL (Neon):
- Schema files in `/server/db/schema/` and `/shared/schema.ts`
- Migrations in `/migrations/`
- Connection via `DATABASE_URL` environment variable

## Environment Variables

Required in `.env`:
```
DATABASE_URL=postgresql://...    # Neon database connection string
NODE_ENV=development|production  # Environment mode
```

## UI Component System

Using Radix UI primitives with custom Tailwind styling:
- Components follow shadcn/ui patterns
- Dark mode support via `next-themes`
- Custom color system with CSS variables
- Responsive design with mobile-first approach

## Key Features

1. **Landing Page Variants**: Multiple versions for conversion optimization
2. **Real-time A/B Testing**: Live variation switching with debug dashboard
3. **Analytics Tracking**: Microsoft Clarity + custom event tracking
4. **Session Management**: Express sessions with PostgreSQL storage
5. **Responsive Design**: Mobile-optimized with WhatsApp-like UI elements

## Testing Strategy

The project focuses on conversion rate optimization through:
- Structured A/B tests with clear hypotheses
- Real-time performance monitoring
- Statistical significance tracking (minimum 1,000 visitors per variation)
- 14-day test cycles with weekly reviews

Reference the `AB_TESTING_GUIDE.md` for detailed testing procedures and `AB_TEST_TRACKING.csv` for experiment tracking.