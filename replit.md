# Overview

MyWhatsAgent.ai is a WhatsApp AI automation SaaS platform that transforms WhatsApp into a sales agent. The application is built as a full-stack TypeScript web application featuring a Video Sales Letter (VSL) landing page designed to convert visitors into customers. The platform focuses on automated lead capture, qualification, and appointment booking through WhatsApp conversations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent, professional design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build Tool**: Vite with custom configuration for development and production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture with `/api` prefix for all endpoints
- **Development**: Custom Vite integration for hot module replacement and development server
- **Session Management**: Prepared for connect-pg-simple for PostgreSQL session storage

## Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Drizzle Kit for database migrations and schema synchronization
- **Session Storage**: In-memory storage for development with PostgreSQL session store for production

## Authentication and Authorization
- **Session-based Authentication**: Using Express sessions with PostgreSQL backing store
- **User Management**: Basic user schema with username/password authentication
- **Security**: Prepared infrastructure for secure session management and user authentication

## Component Design System
- **Design Language**: Professional SaaS aesthetic inspired by Calendly and Intercom
- **Color Palette**: Blue-focused professional theme with success green and warning orange accents
- **Typography**: Inter font for clean, modern appearance
- **Layout**: Responsive design with Tailwind's utility-first approach
- **Components**: Modular section-based architecture (Hero, Social Proof, Benefits, CTA, Video)

## Landing Page Architecture
- **VSL-Focused Design**: Video Sales Letter optimized for conversion with social proof elements
- **Section Components**: Modular components for Hero, Social Proof, Benefits, CTA, and Video sections
- **Conversion Optimization**: Scarcity elements, countdown timers, and lifetime deal positioning
- **Performance**: Optimized for fast loading with Vite bundling and modern web standards

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: High-quality React component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and functionality
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast build tool and development server
- **TanStack Query**: Data fetching and caching library
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for production builds

## Fonts and Assets
- **Google Fonts**: Inter and Work Sans for typography
- **Fontshare**: Clash Display for display typography
- **Custom Assets**: Generated images for testimonials and hero sections

## Session Management
- **connect-pg-simple**: PostgreSQL session store for production session persistence
- **Express Session**: Server-side session management middleware