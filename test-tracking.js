/**
 * Test script for A/B tracking system
 * Run with: node test-tracking.js
 */

const BASE_URL = 'http://localhost:5000';

async function testTracking() {
  console.log('🧪 Testing A/B Tracking System...\n');

  // Generate test session ID
  const sessionId = `test_session_${Date.now()}`;
  const variation = 'problem';
  const pageVersion = 'a';

  // 1. Test page view event
  console.log('1️⃣  Testing page view event...');
  const pageViewResponse = await fetch(`${BASE_URL}/api/tracking/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'page_view',
      eventName: 'page_viewed',
      variation,
      pageVersion,
      sessionId,
      properties: {}
    })
  });
  console.log(`   ✅ Page view: ${pageViewResponse.ok ? 'Success' : 'Failed'}`);

  // 2. Test scroll event
  console.log('\n2️⃣  Testing scroll event...');
  const scrollResponse = await fetch(`${BASE_URL}/api/tracking/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'scroll',
      eventName: 'scroll_50',
      variation,
      pageVersion,
      sessionId,
      properties: { depth: 50 }
    })
  });
  console.log(`   ✅ Scroll: ${scrollResponse.ok ? 'Success' : 'Failed'}`);

  // 3. Test CTA click
  console.log('\n3️⃣  Testing CTA click event...');
  const clickResponse = await fetch(`${BASE_URL}/api/tracking/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'click',
      eventName: 'cta_clicked',
      variation,
      pageVersion,
      sessionId,
      properties: {
        button_text: 'Get The $5M System',
        section: 'hero-cta'
      }
    })
  });
  console.log(`   ✅ CTA Click: ${clickResponse.ok ? 'Success' : 'Failed'}`);

  // 4. Test conversion event
  console.log('\n4️⃣  Testing conversion event...');
  const conversionResponse = await fetch(`${BASE_URL}/api/tracking/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'conversion',
      eventName: 'conversion_purchase_intent',
      variation,
      pageVersion,
      sessionId,
      properties: {
        conversionType: 'purchase_intent',
        value: 497
      }
    })
  });
  console.log(`   ✅ Conversion: ${conversionResponse.ok ? 'Success' : 'Failed'}`);

  // 5. Update session metrics
  console.log('\n5️⃣  Testing session update...');
  const sessionResponse = await fetch(`${BASE_URL}/api/tracking/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      timeOnPage: 120,
      scrollDepth: 75,
      device: 'desktop',
      browser: 'Chrome'
    })
  });
  console.log(`   ✅ Session Update: ${sessionResponse.ok ? 'Success' : 'Failed'}`);

  // 6. Get metrics
  console.log('\n6️⃣  Fetching metrics...');
  const metricsResponse = await fetch(`${BASE_URL}/api/tracking/metrics?days=1`);
  const metrics = await metricsResponse.json();

  if (metrics.success && metrics.metrics.length > 0) {
    console.log('   ✅ Metrics retrieved successfully!');
    console.log('\n📊 Current Metrics:');
    metrics.metrics.forEach(m => {
      console.log(`   • ${m.variation} (${m.pageVersion}): ${m.totalSessions} sessions, ${m.conversions} conversions (${m.conversionRate.toFixed(2)}%)`);
    });
  } else {
    console.log('   ❌ Failed to retrieve metrics');
  }

  // 7. Get recent events
  console.log('\n7️⃣  Fetching recent events...');
  const eventsResponse = await fetch(`${BASE_URL}/api/tracking/events?limit=5`);
  const events = await eventsResponse.json();

  if (events.success && events.events.length > 0) {
    console.log(`   ✅ Retrieved ${events.events.length} recent events`);
  } else {
    console.log('   ❌ Failed to retrieve events');
  }

  console.log('\n✨ Testing complete!');
  console.log('\n💡 To view the dashboard, visit: http://localhost:5000/?debug=true');
}

// Run the test
testTracking().catch(console.error);