# Cloudflare Workers Deployment Guide

This guide covers deploying WhatsAgent to Cloudflare Workers with your existing Express.js backend.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Already installed as dev dependency
3. **Node.js**: Version 18+ recommended

## Quick Start

### 1. Login to Cloudflare

```bash
npm run wrangler:login
```

This opens your browser to authenticate with Cloudflare.

### 2. Set Environment Variables

Set your production secrets using Wrangler:

```bash
# Database (use your Neon connection string)
npx wrangler secret put DATABASE_URL

# Stripe keys
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put VITE_STRIPE_PUBLISHABLE_KEY
```

When prompted, paste the actual values from your `.env` file.

### 3. Deploy

```bash
npm run deploy
```

Your app will be deployed to: `https://whatsagent.your-subdomain.workers.dev`

## Configuration Files

### `wrangler.toml`
- **name**: Your Worker name (`whatsagent`)
- **main**: Entry point (`server/index.ts`)
- **compatibility_date**: Enables Node.js APIs (`2025-01-01`)
- **assets**: Serves static files from `dist/client`

### Modified `server/index.ts`
- Conditionally imports `cloudflare:node`
- Exports `httpServerHandler(app)` for Workers
- Maintains local development compatibility

## Available Commands

```bash
# Deploy to production
npm run deploy

# Deploy to dev environment
npm run deploy:dev

# Test locally with Wrangler
npm run wrangler:dev

# Login to Cloudflare
npm run wrangler:login
```

## Environment Setup

### Development (.env)
```env
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Production (Wrangler Secrets)
Use `wrangler secret put` for all sensitive values in production.

## Database Considerations

- **Neon PostgreSQL**: Works great with Workers
- **Connection pooling**: Handled by Neon's serverless driver
- **Migrations**: Run `npm run db:push` before deployment

## Troubleshooting

### Build Issues
```bash
# Check TypeScript
npm run check

# Test build locally
npm run build
```

### Runtime Issues
```bash
# Check Worker logs
npx wrangler tail

# Test locally with Workers runtime
npm run wrangler:dev
```

### Session Storage
Express sessions may need adaptation for Workers. Consider:
- Cloudflare KV for session storage
- Durable Objects for stateful sessions
- JWT tokens for stateless auth

## Migration from Other Platforms

If migrating from Vercel/Railway/Render:
1. Export your environment variables
2. Set them using `wrangler secret put`
3. Update DNS to point to Workers domain
4. Test thoroughly before switching production traffic

## Production Checklist

- [ ] Environment variables set via `wrangler secret put`
- [ ] Database accessible from Workers
- [ ] Static assets building correctly
- [ ] API endpoints responding
- [ ] Stripe webhooks configured for new domain
- [ ] DNS updated (if using custom domain)

## Support

- **Cloudflare Docs**: [developers.cloudflare.com](https://developers.cloudflare.com)
- **Workers Discord**: [discord.gg/cloudflaredev](https://discord.gg/cloudflaredev)
- **Wrangler Issues**: [github.com/cloudflare/workers-sdk](https://github.com/cloudflare/workers-sdk)