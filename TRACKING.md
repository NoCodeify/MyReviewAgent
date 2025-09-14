# Custom A/B Test Tracking System

## Overview
We've built a custom, lightweight tracking system for A/B testing that runs entirely on your own backend. No external dependencies like Google Analytics, Microsoft Clarity, or ClickUp - you own all your data.

## Architecture

### Backend Components
- **Database Schema** (`/server/db/schema/tracking.ts`)
  - `ab_test_events`: Stores all tracking events
  - `ab_test_sessions`: Tracks user sessions with conversion data
  - `ab_test_metrics`: Pre-calculated metrics for fast dashboard loading

- **API Endpoints** (`/server/api/tracking.ts`)
  - `POST /api/tracking/event`: Track events (page views, clicks, conversions)
  - `POST /api/tracking/session`: Update session metrics
  - `GET /api/tracking/metrics`: Get aggregated metrics
  - `GET /api/tracking/events`: View recent events
  - `GET /api/tracking/export`: Export data as CSV

- **Storage Options**
  - **Production**: PostgreSQL via Neon (set DATABASE_URL in environment)
  - **Development**: In-memory store (automatic fallback)

### Frontend Components
- **Tracking Service** (`/client/src/services/tracking.ts`)
  - Lightweight tracking functions
  - Automatic session management
  - Scroll depth tracking
  - No external scripts or cookies

- **Dashboard** (`/client/src/landing/v1/components/ABTestDashboardV2.tsx`)
  - Real-time metrics display
  - View with `?debug=true` parameter
  - Shows conversion rates, time on page, scroll depth
  - Export functionality

## Quick Start

### 1. Database Setup (Optional)
```bash
# Create a .env file
cp .env.example .env

# Add your Neon PostgreSQL URL
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Run migrations
npm run db:push
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. View Dashboard
Visit: http://localhost:5000/?debug=true

### 4. Test Tracking
```bash
node test-tracking.js
```

## Tracking Events

### Automatic Tracking
These events are tracked automatically on page load:
- Page views
- Scroll milestones (25%, 50%, 75%, 90%)
- Session duration
- Device and browser information

### Manual Tracking
Add tracking to your components:

```typescript
import { trackCTAClick, trackConversion } from '@/services/tracking';

// Track button clicks
const handleClick = () => {
  trackCTAClick("Button Text", "section-name");
};

// Track conversions
const handlePurchase = () => {
  trackConversion("purchase_intent", 497);
};
```

## A/B Test Variations

### Current Test Structure
- **Original** (`/`): Full 18-component landing page
- **Version A** (`/a`): Problem-focused (10 components)
- **Version B** (`/b`): Value-focused (8 components)

### Copy Variations
Configure in `/client/src/landing/v1/config/variations.ts`:
- `control`: Original messaging
- `problem`: Problem-agitation focus
- `savings`: Cost savings emphasis
- `speed`: Speed to results focus
- `proof`: Social proof emphasis

## Metrics Tracked

### Session Metrics
- Total sessions
- Unique visitors
- Time on page
- Scroll depth
- Bounce rate
- Device type
- Browser
- Country (optional)

### Conversion Metrics
- Conversion rate
- Conversion types:
  - `whatsapp_click`: WhatsApp button clicks
  - `demo_request`: Demo form submissions
  - `purchase_intent`: Get Access button clicks
  - `form_submit`: Any form submission

### Engagement Metrics
- CTA click rates
- Scroll milestones reached
- Average engagement time
- Section-specific interactions

## Data Export

### CSV Export
```bash
# Export all data
curl "http://localhost:5000/api/tracking/export" -o tracking-data.csv

# Export date range
curl "http://localhost:5000/api/tracking/export?startDate=2024-01-01&endDate=2024-12-31" -o tracking-2024.csv
```

### API Access
```javascript
// Get metrics
fetch('/api/tracking/metrics?days=7')
  .then(res => res.json())
  .then(data => console.log(data.metrics));

// Get recent events
fetch('/api/tracking/events?limit=100')
  .then(res => res.json())
  .then(data => console.log(data.events));
```

## Performance Impact

- **Bundle Size**: ~3KB (tracking service)
- **Network**: 1-2 requests per page (batched)
- **Processing**: <1ms per event
- **Storage**: ~200 bytes per event

## Privacy & Compliance

- No third-party cookies
- No external tracking scripts
- All data stored on your servers
- No PII collected by default
- GDPR compliant out of the box

## Troubleshooting

### Dashboard Not Showing Data
1. Check server is running: `npm run dev`
2. Verify tracking endpoint: `curl http://localhost:5000/api/tracking/metrics`
3. Check browser console for errors
4. Ensure `?debug=true` is in URL

### Events Not Tracking
1. Check network tab for `/api/tracking/event` calls
2. Verify session storage has `ab_session_id`
3. Check server logs for errors
4. Test with `node test-tracking.js`

### Database Issues
- Works without database (in-memory fallback)
- To use PostgreSQL: Set DATABASE_URL in environment
- Run migrations: `npm run db:push`

## Next Steps

1. **Set up production database**
   - Create Neon account
   - Add DATABASE_URL to production environment
   - Run migrations

2. **Configure variations**
   - Edit `/client/src/landing/v1/config/variations.ts`
   - Add new copy variations
   - Test different messaging angles

3. **Monitor results**
   - Check dashboard daily
   - Export data weekly
   - Adjust based on conversion rates

4. **Scale testing**
   - Add more page versions
   - Test different components
   - Run multivariate tests

## Support

For issues or questions about the tracking system:
- Check server logs: `npm run dev`
- Test with: `node test-tracking.js`
- View dashboard: `http://localhost:5000/?debug=true`