/**
 * Growth Experiments Configuration
 * Each experiment tests a specific hypothesis with multiple variants
 */

export interface Variant {
  id: string;
  weight: number; // 0-1, must sum to 1 for each experiment
  config: Record<string, any>;
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  primaryMetric: string;
  targetImprovement: number; // percentage
  variants: Variant[];
  startDate?: string;
  endDate?: string;
}

export const EXPERIMENTS: Record<string, Experiment> = {
  'headline-copy': {
    id: 'headline-copy',
    name: 'Headline Copy Test',
    hypothesis: 'Problem-focused headlines will increase engagement by 25%',
    status: 'active',
    primaryMetric: 'time_on_page',
    targetImprovement: 25,
    variants: [
      {
        id: 'control',
        weight: 0.2,
        config: {
          headline: 'The WhatsApp AI That Generated',
          gradient: '$5M in 12 Months',
          subtitle: '(Without Any Human Help)'
        }
      },
      {
        id: 'problem',
        weight: 0.2,
        config: {
          headline: 'Stop Losing 73% of Your',
          gradient: 'WhatsApp Leads While You Sleep',
          subtitle: '(Your Competitors AI Agents Are Closing Them)'
        }
      },
      {
        id: 'savings',
        weight: 0.2,
        config: {
          headline: 'Replace Your $48,000/year',
          gradient: 'Sales Team with $497 AI',
          subtitle: '(Save $47,503 & Never Miss a Lead)'
        }
      },
      {
        id: 'speed',
        weight: 0.2,
        config: {
          headline: 'Start Closing WhatsApp Deals',
          gradient: 'In The Next 5 Minutes',
          subtitle: '(Setup in 5 Min, Closing in 10)'
        }
      },
      {
        id: 'proof',
        weight: 0.2,
        config: {
          headline: 'The Only WhatsApp AI That',
          gradient: 'Actually Closes Deals',
          subtitle: '(25.3% Close Rate, 847 Deals Proven)'
        }
      }
    ]
  },

  'page-structure': {
    id: 'page-structure',
    name: 'Page Structure Optimization',
    hypothesis: 'Simplified page with 8 components will convert 30% better than 18 components',
    status: 'active',
    primaryMetric: 'conversion_rate',
    targetImprovement: 30,
    variants: [
      {
        id: 'original',
        weight: 0.33,
        config: {
          layout: 'original',
          components: 18,
          description: 'Full feature-rich page'
        }
      },
      {
        id: 'problem-focused',
        weight: 0.33,
        config: {
          layout: 'version-a',
          components: 10,
          description: 'Problem-agitation focused'
        }
      },
      {
        id: 'value-focused',
        weight: 0.34,
        config: {
          layout: 'version-b',
          components: 8,
          description: 'Value and ROI focused'
        }
      }
    ]
  },

  'cta-strategy': {
    id: 'cta-strategy',
    name: 'CTA Button Test',
    hypothesis: 'Urgency-based CTAs will increase click rate by 20%',
    status: 'active',
    primaryMetric: 'cta_click_rate',
    targetImprovement: 20,
    variants: [
      {
        id: 'control',
        weight: 0.25,
        config: {
          primary: 'Get The $5M System',
          secondary: 'Start Your Success Story',
          urgency: false
        }
      },
      {
        id: 'urgency',
        weight: 0.25,
        config: {
          primary: 'Get Instant Access (17 left)',
          secondary: 'Lock In Your License Now',
          urgency: true,
          urgencyText: 'Only 17 licenses remaining'
        }
      },
      {
        id: 'free-trial',
        weight: 0.25,
        config: {
          primary: 'Start Free 14-Day Trial',
          secondary: 'No Credit Card Required',
          urgency: false
        }
      },
      {
        id: 'discount',
        weight: 0.25,
        config: {
          primary: 'Get 50% Off Today Only',
          secondary: 'Save $249 - Limited Time',
          urgency: true,
          urgencyText: 'Offer expires in 24 hours'
        }
      }
    ]
  },

  'social-proof': {
    id: 'social-proof',
    name: 'Social Proof Display',
    hypothesis: 'Video testimonials will increase trust by 40% vs text testimonials',
    status: 'active',
    primaryMetric: 'scroll_depth',
    targetImprovement: 40,
    variants: [
      {
        id: 'numbers',
        weight: 0.33,
        config: {
          type: 'statistics',
          display: 'numbers',
          content: '1,247+ businesses, $5M generated, 25.3% close rate'
        }
      },
      {
        id: 'testimonials',
        weight: 0.33,
        config: {
          type: 'testimonials',
          display: 'carousel',
          content: 'Text testimonials with photos'
        }
      },
      {
        id: 'video',
        weight: 0.34,
        config: {
          type: 'video',
          display: 'grid',
          content: 'Video testimonials from customers'
        }
      }
    ]
  },

  'pricing-display': {
    id: 'pricing-display',
    name: 'Pricing Model Test',
    hypothesis: 'Subscription pricing will reduce friction and increase conversions by 35%',
    status: 'active',
    primaryMetric: 'purchase_intent',
    targetImprovement: 35,
    variants: [
      {
        id: 'one-time',
        weight: 0.33,
        config: {
          model: 'one-time',
          price: '$497',
          description: 'Lifetime access',
          highlight: 'Best value'
        }
      },
      {
        id: 'monthly',
        weight: 0.33,
        config: {
          model: 'subscription',
          price: '$97/month',
          description: 'Cancel anytime',
          highlight: 'Most flexible'
        }
      },
      {
        id: 'tiered',
        weight: 0.34,
        config: {
          model: 'tiered',
          price: '$297/$497/$997',
          description: 'Starter/Pro/Enterprise',
          highlight: 'Choose your plan'
        }
      }
    ]
  },

  'urgency-type': {
    id: 'urgency-type',
    name: 'Urgency Mechanism Test',
    hypothesis: 'License scarcity will create 50% more urgency than time-based deadlines',
    status: 'active',
    primaryMetric: 'conversion_speed',
    targetImprovement: 50,
    variants: [
      {
        id: 'no-urgency',
        weight: 0.25,
        config: {
          type: 'none',
          display: false
        }
      },
      {
        id: 'time-based',
        weight: 0.25,
        config: {
          type: 'deadline',
          display: true,
          message: 'Offer expires in 24 hours'
        }
      },
      {
        id: 'quantity-based',
        weight: 0.25,
        config: {
          type: 'scarcity',
          display: true,
          message: 'Only 17 licenses left'
        }
      },
      {
        id: 'hybrid',
        weight: 0.25,
        config: {
          type: 'hybrid',
          display: true,
          message: '17 licenses left - Offer ends Friday'
        }
      }
    ]
  }
};

/**
 * Get all active experiments
 */
export function getActiveExperiments(): Experiment[] {
  return Object.values(EXPERIMENTS).filter(exp => exp.status === 'active');
}

/**
 * Get experiment by ID
 */
export function getExperiment(id: string): Experiment | undefined {
  return EXPERIMENTS[id];
}