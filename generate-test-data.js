/**
 * Generate test data for A/B testing dashboard
 * Run with: node generate-test-data.js
 */

const BASE_URL = 'http://localhost:5000';

// Test configurations
const variations = ['control', 'problem', 'savings', 'speed', 'proof'];
const pageVersions = ['original', 'a', 'b'];

async function simulateSession(variation, pageVersion) {
  const sessionId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Simulate different conversion rates for each variation
  const conversionRates = {
    control: 0.15,
    problem: 0.22,
    savings: 0.28,
    speed: 0.19,
    proof: 0.25,
  };

  const willConvert = Math.random() < (conversionRates[variation] || 0.15);
  const scrollDepth = Math.random() * 100;
  const timeOnPage = Math.floor(Math.random() * 300) + 30;

  // 1. Page view
  await fetch(`${BASE_URL}/api/tracking/event`, {
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

  // 2. Scroll events
  if (scrollDepth > 25) {
    await fetch(`${BASE_URL}/api/tracking/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'scroll',
        eventName: 'scroll_25',
        variation,
        pageVersion,
        sessionId,
        properties: { depth: 25 }
      })
    });
  }

  if (scrollDepth > 50) {
    await fetch(`${BASE_URL}/api/tracking/event`, {
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
  }

  if (scrollDepth > 75) {
    await fetch(`${BASE_URL}/api/tracking/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'scroll',
        eventName: 'scroll_75',
        variation,
        pageVersion,
        sessionId,
        properties: { depth: 75 }
      })
    });
  }

  // 3. CTA clicks
  if (Math.random() < 0.3) {
    await fetch(`${BASE_URL}/api/tracking/event`, {
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
  }

  // 4. Conversion
  if (willConvert) {
    await fetch(`${BASE_URL}/api/tracking/event`, {
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
  }

  // 5. Session update
  await fetch(`${BASE_URL}/api/tracking/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      timeOnPage,
      scrollDepth: Math.round(scrollDepth),
      device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
      browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)]
    })
  });

  return { sessionId, willConvert, timeOnPage, scrollDepth };
}

async function generateTestData() {
  console.log('🎲 Generating test data for A/B testing dashboard...\n');

  const sessions = [];

  // Generate sessions for each variation/version combination
  for (const variation of variations) {
    for (const pageVersion of pageVersions) {
      // Skip invalid combinations
      if (pageVersion === 'original' && variation !== 'control') continue;
      if (pageVersion !== 'original' && variation === 'control') continue;

      // Generate 10-20 sessions per combination
      const sessionCount = Math.floor(Math.random() * 10) + 10;

      console.log(`📊 Generating ${sessionCount} sessions for ${variation}-${pageVersion}...`);

      for (let i = 0; i < sessionCount; i++) {
        const result = await simulateSession(variation, pageVersion);
        sessions.push({ variation, pageVersion, ...result });

        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
  }

  // Calculate and display summary
  console.log('\n✅ Test data generation complete!\n');
  console.log('📈 Summary:');
  console.log(`   Total sessions: ${sessions.length}`);

  const conversions = sessions.filter(s => s.willConvert).length;
  console.log(`   Total conversions: ${conversions}`);
  console.log(`   Overall conversion rate: ${((conversions / sessions.length) * 100).toFixed(2)}%`);

  // Group by variation
  const byVariation = {};
  sessions.forEach(s => {
    const key = `${s.variation}-${s.pageVersion}`;
    if (!byVariation[key]) {
      byVariation[key] = { sessions: 0, conversions: 0 };
    }
    byVariation[key].sessions++;
    if (s.willConvert) byVariation[key].conversions++;
  });

  console.log('\n📊 By Variation:');
  Object.entries(byVariation).forEach(([key, data]) => {
    const rate = ((data.conversions / data.sessions) * 100).toFixed(2);
    console.log(`   ${key}: ${data.sessions} sessions, ${data.conversions} conversions (${rate}%)`);
  });

  console.log('\n🎯 View the dashboard at: http://localhost:5000/dashboard');
}

// Run the generator
generateTestData().catch(console.error);