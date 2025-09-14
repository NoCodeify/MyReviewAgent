/**
 * A/B Test Variations Configuration
 * Centralized configuration for testing different copy variations
 */

export interface Variation {
  id: string;
  name: string;
  headline: {
    main: string;
    gradient: string;
    subtitle: string;
  };
  cta: {
    primary: string;
    secondary: string;
    urgency: string;
  };
  problemAgitation: {
    title: string;
    subtitle: string;
  };
}

export const variations: Record<string, Variation> = {
  control: {
    id: 'control',
    name: 'Control - $5M Focus',
    headline: {
      main: 'The WhatsApp AI That Generated',
      gradient: '$5M in 12 Months',
      subtitle: '(Without Any Human Help)'
    },
    cta: {
      primary: 'Get The $5M System',
      secondary: 'Start Your Success Story',
      urgency: 'Lock In Your License Now'
    },
    problemAgitation: {
      title: 'The WhatsApp Black Hole',
      subtitle: 'Eating Your Revenue 24/7'
    }
  },

  problem: {
    id: 'problem',
    name: 'Problem-Focused',
    headline: {
      main: 'Stop Losing 73% of Your',
      gradient: 'WhatsApp Leads While You Sleep',
      subtitle: '(Your Competitors AI Agents Are Closing Them)'
    },
    cta: {
      primary: 'Stop The Revenue Leak Now',
      secondary: 'Fix This Problem Today',
      urgency: 'Start Closing Deals Tonight'
    },
    problemAgitation: {
      title: 'Your Biggest Revenue Killer',
      subtitle: 'Missing Leads Every Single Night'
    }
  },

  savings: {
    id: 'savings',
    name: 'Savings-Focused',
    headline: {
      main: 'Replace Your $48,000/year',
      gradient: 'Sales Team with $497 AI',
      subtitle: '(Save $47,503 & Never Miss a Lead)'
    },
    cta: {
      primary: 'Save $47,503/year Now',
      secondary: 'Cut Your Sales Costs Today',
      urgency: 'Claim Your Lifetime Deal'
    },
    problemAgitation: {
      title: 'Bleeding Money on Sales Staff',
      subtitle: 'While Missing 73% of Leads'
    }
  },

  speed: {
    id: 'speed',
    name: 'Speed-Focused',
    headline: {
      main: 'Start Closing WhatsApp Deals',
      gradient: 'In The Next 5 Minutes',
      subtitle: '(Setup in 5 Min, Closing in 10)'
    },
    cta: {
      primary: 'Start Closing in 5 Minutes',
      secondary: 'Get Instant Results',
      urgency: 'Activate Your AI Now'
    },
    problemAgitation: {
      title: 'Every Minute You Wait',
      subtitle: 'Is Another Lead Lost Forever'
    }
  },

  proof: {
    id: 'proof',
    name: 'Proof-Focused',
    headline: {
      main: 'The Only WhatsApp AI That',
      gradient: 'Actually Closes Deals',
      subtitle: '(25.3% Close Rate, 847 Deals Proven)'
    },
    cta: {
      primary: 'Get The Proven System',
      secondary: 'Join 1,247+ Businesses',
      urgency: 'Limited Licenses Available'
    },
    problemAgitation: {
      title: 'Chatbots Don\'t Close Deals',
      subtitle: 'But This AI Actually Does'
    }
  }
};

/**
 * Get variation based on URL parameter or localStorage
 */
export function getCurrentVariation(): Variation {
  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const urlVariation = urlParams.get('v');

  if (urlVariation && variations[urlVariation]) {
    // Store in localStorage for consistency
    localStorage.setItem('ab_variation', urlVariation);
    return variations[urlVariation];
  }

  // Check localStorage
  const storedVariation = localStorage.getItem('ab_variation');
  if (storedVariation && variations[storedVariation]) {
    return variations[storedVariation];
  }

  // Default to control
  return variations.control;
}

/**
 * Track variation performance
 */
export function trackVariationEvent(event: string, properties?: Record<string, any>) {
  const variation = getCurrentVariation();

  // Track with your analytics provider
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, {
      variation_id: variation.id,
      variation_name: variation.name,
      ...properties
    });
  }

  // Also track with Microsoft Clarity if available
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', 'variation', variation.id);
  }
}

/**
 * Get random variation for true A/B testing
 */
export function getRandomVariation(): Variation {
  const variationKeys = Object.keys(variations);
  const randomIndex = Math.floor(Math.random() * variationKeys.length);
  const selectedKey = variationKeys[randomIndex];

  // Store for consistency
  localStorage.setItem('ab_variation', selectedKey);

  return variations[selectedKey];
}