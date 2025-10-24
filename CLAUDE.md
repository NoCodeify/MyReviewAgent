# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MyReviewAgent.ai is an AI-powered review collection service for booking-based businesses. After a booking (restaurant reservation, salon appointment, medical visit, etc.), the AI automatically sends WhatsApp/SMS messages to collect reviews. The system intelligently routes negative reviews to private feedback forms and guides positive reviews to public platforms. Pay-per-feedback pricing model.

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

# Cloudflare Workers Deployment
npm run deploy               # Deploy to Cloudflare Workers production
npm run deploy:dev           # Deploy to Cloudflare Workers dev environment
npm run wrangler:dev         # Test locally with Workers runtime
npm run wrangler:login       # Login to Cloudflare account
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
- **Deployment**: Cloudflare Workers

### Directory Structure

```
/client/src/
├── landing/v1/          # Landing page for cold email prospects
│   ├── index.tsx       # Main landing page
│   └── components/     # Landing page components
├── components/          # Shared UI components
├── pages/              # Application pages
├── hooks/              # Custom React hooks
└── services/           # API services

/server/
├── index.ts            # Server entry point
├── routes.ts           # Route registration
├── api/               # API endpoints
│   └── checkout.ts    # Stripe checkout integration
└── db/                # Database configuration
    └── schema/        # Database schemas
```

## Product Features

MyReviewAgent.ai automates the review collection process:

1. **Post-Booking Automation**: Triggers after bookings (e.g., next morning after restaurant visit)
2. **Multi-Channel**: Sends via WhatsApp or SMS
3. **Smart Routing**:
   - Negative reviews → Private feedback form
   - Positive reviews → Guides customer to post publicly (Google, Yelp, etc.)
4. **Pay-per-Feedback**: Only pay when customers provide feedback

### Target Audience
- Restaurants and cafes
- Salons and spas
- Medical and dental practices
- Auto repair shops
- Hotels and accommodations
- Any business with booking systems

### Analytics Integration
- **Microsoft Clarity**: Site ID `ta73lpsqxt` for user behavior analytics

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

1. **Landing Page**: Focused on converting cold email prospects
2. **WhatsApp CTA**: Direct link to try the AI agent
3. **Stripe Integration**: Checkout flow for future paid plans
4. **Analytics Tracking**: Microsoft Clarity for user behavior insights
5. **Responsive Design**: Mobile-optimized for WhatsApp users

## Landing Page Strategy

The landing page is designed for prospects who receive cold emails:
- Clear value proposition: Automate review collection
- Problem-solution framework: Manual reviews are tedious
- Trust builders: Social proof, testimonials
- Single CTA: Try the AI via WhatsApp
- Pay-per-feedback pricing to reduce risk