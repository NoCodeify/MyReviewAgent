import { Router } from 'express';
import Stripe from 'stripe';
import { z } from 'zod';

const router = Router();

// Initialize Stripe with secret key - handle missing key for testing
const stripeKey = process.env.STRIPE_SECRET_KEY;
let stripe: Stripe | null = null;

if (stripeKey && stripeKey.trim().length > 0) {
  try {
    stripe = new Stripe(stripeKey, {
      apiVersion: '2025-08-27.basil',
    });
  } catch (error) {
    console.warn('Failed to initialize Stripe:', error);
    stripe = null;
  }
}

// Product/Price configuration for WhatsAgent tiers
const PRODUCT_CONFIG = {
  STARTER: {
    name: 'WhatsAgent Starter',
    description: 'Perfect for small businesses - 500 credits included',
    features: [
      '20k character AI instructions limit',
      '20 AI responses per chat',
      'Incoming messages only',
      'Voice note understanding',
      'Unlimited contacts',
      'One-click campaign optimization',
      'Basic analytics',
      'BYOK: Connect your OpenAI/Claude API',
      'Email support'
    ]
  },
  PROFESSIONAL: {
    name: 'WhatsAgent Professional',
    description: 'For growing businesses - 2,000 credits included',
    features: [
      '100k character AI instructions limit',
      'Unlimited AI responses per chat',
      'Outgoing campaigns',
      'Image understanding',
      'Video understanding',
      'Document understanding (PDF, DOC)',
      'Voice note understanding',
      'Automatic follow-ups',
      'Real-time web search',
      'Custom functions',
      'Webhooks & API access',
      'Advanced mode',
      'AI appointment booking',
      'Contact tagging & segmentation',
      'Priority support (2-hour response)',
      'BYOK: Connect your OpenAI/Claude API',
      'Everything in Starter'
    ]
  },
  AGENCY: {
    name: 'WhatsAgent Agency',
    description: 'Build your own AI agency - 10,000 credits included',
    features: [
      'Everything in Professional PLUS:',
      'Unlimited sub-accounts',
      'Full white-labeling',
      'Personalized onboarding',
      'Priority support',
      'Early access to new features',
      'Roadmap priority',
      'BYOK: Use for yourself AND your clients'
    ]
  }
};

// Order bump products
const ORDER_BUMPS = {
  SKOOL_MASTERMIND: {
    id: 'skool_mastermind',
    name: 'Skool Mastermind Community',
    description: 'Lifetime access to private community of WhatsApp automation users',
    price: 197,
    savings: 300,
    originalPrice: 497
  },
  CREDITS_BUNDLE: {
    id: 'credits_bundle',
    name: '5,000 Credits Bundle',
    description: 'Never run out of conversations with this lifetime credit pack',
    price: 197,
    savings: 300,
    originalPrice: 497
  },
  FUEGENIX_BLUEPRINT: {
    id: 'fuegenix_blueprint',
    name: 'The FueGenix $15M Blueprint',
    description: 'Complete scaling blueprint from $0 to $15M revealed',
    price: 97,
    savings: 200,
    originalPrice: 297
  }
};

// Input validation schemas
const CreateCheckoutSessionSchema = z.object({
  tier: z.enum(['STARTER', 'PROFESSIONAL', 'AGENCY']),
  orderBumps: z.array(z.string()).optional().default([]),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
  customerEmail: z.string().email().optional(),
  metadata: z.record(z.string()).optional().default({})
});

// Business information schema
const BusinessInfoSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(2, 'Country is required').default('US')
});

const CreatePaymentIntentSchema = z.object({
  tier: z.enum(['STARTER', 'PROFESSIONAL', 'AGENCY']),
  orderBumps: z.array(z.string()).optional().default([]),
  customerEmail: z.union([z.string().email(), z.literal('')]).optional(),
  businessInfo: BusinessInfoSchema.optional(),
  metadata: z.record(z.string()).optional().default({}),
  amount: z.number().positive().optional(), // Custom amount in cents for VAT adjustments
  taxCalculationId: z.string().optional(), // Stripe Tax calculation ID
  customerAddress: z.object({
    country: z.string(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    city: z.string().optional(),
    line1: z.string().optional(),
  }).optional()
});

// Helper function to get dynamic pricing based on deal status
function getDynamicPrice(tier: keyof typeof PRODUCT_CONFIG, dealStatus: string = 'regular'): number {
  const basePrices = {
    regular: { STARTER: 497, PROFESSIONAL: 997, AGENCY: 1997 },
    first_expired: { STARTER: 697, PROFESSIONAL: 1297, AGENCY: 2497 },
    final_expired: { STARTER: 97, PROFESSIONAL: 197, AGENCY: 397 } // Monthly pricing
  };

  const prices = basePrices[dealStatus as keyof typeof basePrices] || basePrices.regular;
  return prices[tier];
}

// Helper function to detect VAT ID type from format
function detectTaxIdType(taxId: string): string {
  // Remove spaces and convert to uppercase for pattern matching
  const cleanId = taxId.replace(/\s/g, '').toUpperCase();

  // EU VAT patterns (country code + numbers + optional check digits)
  if (/^[A-Z]{2}[0-9]{8,12}[A-Z0-9]{0,3}$/.test(cleanId)) {
    const countryCode = cleanId.substring(0, 2);

    // Special cases for different EU VAT formats
    switch (countryCode) {
      case 'GB':
        return 'gb_vat';
      case 'IE':
        return 'ie_vat';
      default:
        return 'eu_vat';
    }
  }

  // US EIN patterns
  if (/^\d{2}-?\d{7}$/.test(cleanId) || /^\d{9}$/.test(cleanId)) {
    return 'us_ein';
  }

  // Canada Business Number
  if (/^\d{9}(RP|RT|RC|RM|RZ)\d{4}$/.test(cleanId)) {
    return 'ca_bn';
  }

  // Australia ABN
  if (/^\d{11}$/.test(cleanId) && cleanId.length === 11) {
    return 'au_abn';
  }

  // Default to US EIN for unknown formats
  return 'us_ein';
}

// Helper function to validate VAT ID format
function isValidVATFormat(taxId: string): boolean {
  const cleanId = taxId.replace(/\s/g, '').toUpperCase();

  const patterns = [
    /^[A-Z]{2}[0-9]{8,12}[A-Z0-9]{0,3}$/, // EU VAT
    /^\d{2}-?\d{7}$/, // US EIN with dash
    /^\d{9}$/, // US EIN without dash
    /^\d{9}(RP|RT|RC|RM|RZ)\d{4}$/, // Canada BN
    /^\d{11}$/ // Australia ABN
  ];

  return patterns.some(pattern => pattern.test(cleanId));
}

// Create checkout session endpoint
router.post('/create-session', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      error: 'Stripe not configured',
      message: 'Payment processing is not available. Please configure STRIPE_SECRET_KEY environment variable.'
    });
  }

  try {
    const body = CreateCheckoutSessionSchema.parse(req.body);
    const { tier, orderBumps, successUrl, cancelUrl, customerEmail, metadata } = body;

    // Get deal status from query params or metadata
    const dealStatus = req.query.dealStatus as string || metadata.dealStatus || 'regular';

    // Base product configuration
    const product = PRODUCT_CONFIG[tier];
    const basePrice = getDynamicPrice(tier, dealStatus);

    // Calculate if this is monthly pricing
    const isMonthly = dealStatus === 'final_expired';

    // Create line items array starting with main product
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            metadata: {
              tier,
              dealStatus,
              type: 'main_product'
            }
          },
          unit_amount: basePrice * 100, // Stripe uses cents
          recurring: isMonthly ? {
            interval: 'month'
          } : undefined
        },
        quantity: 1,
      }
    ];

    // Add order bumps to line items
    let totalSavings = 0;
    orderBumps?.forEach(bumpId => {
      const bumpKey = bumpId.toUpperCase() as keyof typeof ORDER_BUMPS;
      const bump = ORDER_BUMPS[bumpKey];
      if (bump) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: bump.name,
              description: bump.description,
              metadata: {
                type: 'order_bump',
                bump_id: bumpId
              }
            },
            unit_amount: bump.price * 100
          },
          quantity: 1,
        });
        totalSavings += bump.savings;
      }
    });

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: isMonthly ? 'subscription' : 'payment',
      line_items: lineItems,
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        tier,
        dealStatus,
        orderBumps: orderBumps?.join(',') || '',
        totalSavings: totalSavings.toString(),
        ...metadata
      },
      // Enable customer email collection if not provided
      ...(customerEmail ? {} : {
        customer_creation: 'always',
        customer_email: undefined
      }),
      // Custom payment page settings
      payment_intent_data: isMonthly ? undefined : {
        metadata: {
          tier,
          dealStatus,
          orderBumps: orderBumps?.join(',') || ''
        }
      },
      subscription_data: isMonthly ? {
        metadata: {
          tier,
          dealStatus,
          orderBumps: orderBumps?.join(',') || ''
        }
      } : undefined,
      // Localization
      locale: 'auto',
      // Tax calculation (if needed)
      automatic_tax: {
        enabled: false // Set to true if you want Stripe to calculate taxes
      }
    });

    res.json({
      sessionId: session.id,
      url: session.url,
      totalAmount: lineItems.reduce((sum, item) => sum + (item.price_data?.unit_amount || 0), 0) / 100,
      totalSavings
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.errors
      });
    }

    res.status(500).json({
      error: 'Failed to create checkout session',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create Payment Intent for embedded checkout
router.post('/create-payment-intent', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      error: 'Stripe not configured',
      message: 'Payment processing is not available. Please configure STRIPE_SECRET_KEY environment variable.'
    });
  }

  try {
    const body = CreatePaymentIntentSchema.parse(req.body);
    const { tier, orderBumps, metadata, amount, taxCalculationId, customerAddress } = body;

    const dealStatus = metadata.dealStatus || 'regular';
    const product = PRODUCT_CONFIG[tier];

    let totalAmount: number = 0;
    let taxAmount = 0;
    let taxCalculation: any = null;

    // If tax calculation ID is provided, use it
    if (taxCalculationId) {
      try {
        taxCalculation = await stripe.tax.calculations.retrieve(taxCalculationId);
        totalAmount = taxCalculation.amount_total;
        taxAmount = taxCalculation.tax_amount_exclusive;
      } catch (error) {
        console.error('Error retrieving tax calculation:', error);
        // Fall back to manual calculation if tax calculation fails
      }
    }

    // If no tax calculation or it failed, use provided amount or calculate manually
    if (!totalAmount) {
      if (amount) {
        totalAmount = amount;
      } else {
        const basePrice = getDynamicPrice(tier, dealStatus);
        totalAmount = basePrice * 100; // Convert to cents
        orderBumps?.forEach(bumpId => {
          const bumpKey = bumpId.toUpperCase() as keyof typeof ORDER_BUMPS;
      const bump = ORDER_BUMPS[bumpKey];
          if (bump) {
            totalAmount += bump.price * 100;
          }
        });
      }
    }

    // Create payment intent with tax information
    const paymentIntentParams: any = {
      amount: totalAmount,
      currency: 'usd',
      metadata: {
        tier,
        dealStatus,
        orderBumps: orderBumps?.join(',') || '',
        productName: product.name,
        ...(taxCalculationId && { taxCalculationId }),
        ...(taxAmount > 0 && { taxAmount: taxAmount.toString() }),
        ...metadata
      },
      // Enable automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
    };

    // If we have customer address, add it to the payment intent
    if (customerAddress && customerAddress.country) {
      try {
        paymentIntentParams.shipping = {
          name: 'Customer', // Required by Stripe
          address: {
            country: customerAddress.country,
            state: customerAddress.state || null,
            postal_code: customerAddress.postal_code || null,
            city: customerAddress.city || null,
            line1: customerAddress.line1 || null,
          }
        };
      } catch (error) {
        console.warn('Error setting shipping address:', error);
        // Continue without shipping address if there's an issue
      }
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount / 100,
      subtotal: (totalAmount - taxAmount) / 100,
      taxAmount: taxAmount / 100,
      taxCalculation: taxCalculation ? {
        id: taxCalculation.id,
        tax_breakdown: taxCalculation.tax_breakdown
      } : null,
      currency: 'usd'
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.errors
      });
    }

    res.status(500).json({
      error: 'Failed to create payment intent',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Webhook endpoint for Stripe events
router.post('/webhook', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      error: 'Stripe not configured',
      message: 'Webhook processing is not available. Please configure STRIPE_SECRET_KEY environment variable.'
    });
  }

  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    console.error('Stripe webhook secret not configured');
    return res.status(500).send('Webhook secret not configured');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleSuccessfulPayment(session);
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        await handleSubscriptionPayment(invoice);
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// Webhook handlers
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  console.log('Payment successful for session:', session.id);

  const { tier, dealStatus, orderBumps } = session.metadata || {};

  // TODO: Store order in database
  // TODO: Send confirmation email
  // TODO: Provision user account
  // TODO: Track conversion event

  console.log('Order details:', {
    sessionId: session.id,
    customerEmail: session.customer_details?.email,
    tier,
    dealStatus,
    orderBumps: orderBumps?.split(',') || [],
    totalAmount: session.amount_total ? session.amount_total / 100 : 0
  });
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment intent succeeded:', paymentIntent.id);

  // Handle direct payment intent success (for embedded checkout)
  const { tier, dealStatus, orderBumps } = paymentIntent.metadata || {};

  // TODO: Store order in database
  // TODO: Send confirmation email
  // TODO: Provision user account

  console.log('Payment details:', {
    paymentIntentId: paymentIntent.id,
    tier,
    dealStatus,
    orderBumps: orderBumps?.split(',') || [],
    amount: paymentIntent.amount / 100
  });
}

async function handleSubscriptionPayment(invoice: Stripe.Invoice) {
  console.log('Subscription payment succeeded:', invoice.id);

  // Handle recurring monthly payments
  // TODO: Extend user subscription
  // TODO: Send receipt
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  console.log('Subscription canceled:', subscription.id);

  // Handle subscription cancellation
  // TODO: Update user account status
  // TODO: Send cancellation confirmation
}

// Get order bumps endpoint
router.get('/order-bumps', (req, res) => {
  res.json(ORDER_BUMPS);
});

// Get pricing endpoint
router.get('/pricing/:tier', (req, res) => {
  const { tier } = req.params;
  const dealStatus = req.query.dealStatus as string || 'regular';

  if (!['STARTER', 'PROFESSIONAL', 'AGENCY'].includes(tier)) {
    return res.status(400).json({ error: 'Invalid tier' });
  }

  const price = getDynamicPrice(tier as keyof typeof PRODUCT_CONFIG, dealStatus);
  const product = PRODUCT_CONFIG[tier as keyof typeof PRODUCT_CONFIG];

  res.json({
    tier,
    price,
    dealStatus,
    isMonthly: dealStatus === 'final_expired',
    product
  });
});

// Get seller's tax registrations endpoint
router.get('/tax-settings', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      error: 'Stripe not configured',
      message: 'Tax settings not available. Please configure STRIPE_SECRET_KEY environment variable.'
    });
  }

  try {
    // Try to get tax registrations from multiple endpoints
    let registrations = [];
    let taxSettings = null;

    try {
      // Get tax settings
      taxSettings = await stripe.tax.settings.retrieve();
      console.log('Tax settings retrieved:', {
        taxBehavior: taxSettings.defaults?.tax_behavior,
        hasDefaults: !!taxSettings.defaults
      });
    } catch (settingsError) {
      console.log('Tax settings not available:', settingsError.message);
    }

    try {
      // Try to get tax registrations
      const taxRegistrations = await stripe.tax.registrations.list({
        limit: 100
      });

      registrations = taxRegistrations.data.map(reg => ({
        country: reg.country,
        state: reg.country_options?.state || reg.state_options?.state || null,
        status: reg.status,
        type: reg.country_options?.type || 'vat'
      }));

      console.log('Found tax registrations:', registrations);

    } catch (regError) {
      console.log('Tax registrations not available:', regError.message);
    }

    res.json({
      taxBehavior: taxSettings?.defaults?.tax_behavior || 'exclusive',
      registrations,
      registeredCountries: registrations.map(r => r.country),
      hasRegistrations: registrations.length > 0
    });

  } catch (error) {
    console.error('Error fetching tax settings:', error);
    res.status(500).json({
      error: 'Failed to fetch tax settings',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Validate Tax ID endpoint
router.post('/validate-tax-id', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      error: 'Stripe not configured',
      message: 'Tax ID validation is not available. Please configure STRIPE_SECRET_KEY environment variable.'
    });
  }

  try {
    const body = ValidateTaxIdSchema.parse(req.body);
    const { taxId, country } = body;

    // Clean and validate format first
    const cleanId = taxId.replace(/\s/g, '').toUpperCase();

    if (!isValidVATFormat(cleanId)) {
      return res.json({
        isValid: false,
        error: 'Invalid tax ID format',
        taxIdType: null,
        isEUVAT: false
      });
    }

    // Detect tax ID type
    const taxIdType = detectTaxIdType(cleanId);
    const isEUVAT = taxIdType === 'eu_vat' || taxIdType === 'gb_vat' || taxIdType === 'ie_vat';

    try {
      // Create a temporary customer to validate the tax ID with Stripe
      const customer = await stripe.customers.create({
        email: 'temp@validation.com',
        metadata: {
          temp_validation: 'true'
        }
      });

      // Try to create tax ID - this will validate it with tax authorities
      const taxIdObject = await stripe.customers.createTaxId(customer.id, {
        type: taxIdType as any,
        value: cleanId
      });

      // Clean up temp customer
      await stripe.customers.del(customer.id);

      return res.json({
        isValid: true,
        taxIdType,
        isEUVAT,
        verificationStatus: taxIdObject.verification?.status || 'pending',
        appliesReverseCharge: isEUVAT && taxIdObject.verification?.status === 'verified'
      });

    } catch (stripeError: any) {
      // If Stripe validation fails, the tax ID is invalid
      console.log('Stripe tax ID validation failed:', stripeError.message);

      return res.json({
        isValid: false,
        error: stripeError.message || 'Tax ID validation failed',
        taxIdType,
        isEUVAT
      });
    }

  } catch (error) {
    console.error('Error validating tax ID:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.errors
      });
    }

    res.status(500).json({
      error: 'Failed to validate tax ID',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// VAT ID validation schema
const ValidateTaxIdSchema = z.object({
  taxId: z.string().min(1, 'Tax ID is required'),
  country: z.string().optional()
});

// Tax calculation endpoint
const TaxCalculationSchema = z.object({
  tier: z.enum(['STARTER', 'PROFESSIONAL', 'AGENCY']),
  orderBumps: z.array(z.string()).optional(),
  customerAddress: z.object({
    country: z.string(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    city: z.string().optional(),
    line1: z.string().optional(),
  }),
  taxId: z.string().optional(),
  metadata: z.object({
    dealStatus: z.string().optional()
  }).optional()
});

router.post('/calculate-tax', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      error: 'Stripe not configured',
      message: 'Tax calculation is not available. Please configure STRIPE_SECRET_KEY environment variable.'
    });
  }

  try {
    const body = TaxCalculationSchema.parse(req.body);
    const { tier, orderBumps, customerAddress, taxId, metadata } = body;

    // Validate minimum required fields for tax calculation
    if (!customerAddress.country) {
      return res.status(400).json({
        error: 'Missing required field',
        message: 'Customer country is required for tax calculation'
      });
    }

    console.log('Tax calculation request:', {
      tier,
      orderBumps,
      customerAddress,
      taxId: taxId ? `${taxId.substring(0, 3)}***` : 'none' // Don't log full tax ID
    });

    const dealStatus = metadata?.dealStatus || 'regular';
    const product = PRODUCT_CONFIG[tier];
    const basePrice = getDynamicPrice(tier, dealStatus);
    const isMonthly = dealStatus === 'final_expired';

    // Create line items for tax calculation
    const lineItems: any[] = [
      {
        amount: basePrice * 100, // Convert to cents
        reference: `${tier.toLowerCase()}_plan`,
        tax_behavior: 'exclusive',
        tax_code: 'txcd_10103001' // Software as a Service
      }
    ];

    // Add order bumps to line items
    orderBumps?.forEach(bumpId => {
      // Convert lowercase ID to uppercase key for lookup
      const bumpKey = bumpId.toUpperCase() as keyof typeof ORDER_BUMPS;
      const bump = ORDER_BUMPS[bumpKey];
      if (bump) {
        lineItems.push({
          amount: bump.price * 100,
          reference: `order_bump_${bumpId}`,
          tax_behavior: 'exclusive',
          tax_code: 'txcd_10103001' // Software as a Service
        });
      }
    });

    // Calculate tax using Stripe Tax API
    const taxCalculationParams: any = {
      currency: 'usd',
      line_items: lineItems,
      customer_details: {
        address: customerAddress,
        address_source: 'billing'
      }
    };

    // Include tax ID if provided for potential tax exemption
    if (taxId && taxId.trim()) {
      const cleanId = taxId.replace(/\s/g, '').toUpperCase();
      const taxIdType = detectTaxIdType(cleanId);

      console.log('Tax calculation with Tax ID:', {
        original: taxId,
        cleaned: cleanId,
        detectedType: taxIdType
      });


      taxCalculationParams.customer_details.tax_ids = [
        {
          type: taxIdType,
          value: cleanId
        }
      ];
    }

    let taxCalculation;
    try {
      taxCalculation = await stripe.tax.calculations.create(taxCalculationParams);
    } catch (stripeError: any) {
      console.error('Stripe tax calculation error:', stripeError.message);
      return res.status(400).json({
        error: 'Tax calculation failed',
        message: stripeError.message || 'Unable to calculate tax for the provided information'
      });
    }

    // Debug log to understand tax calculation
    const vatIdCountry = taxId ? taxId.substring(0, 2).toUpperCase() : null;
    const isEUVAT = taxId && detectTaxIdType(taxId.replace(/\s/g, '').toUpperCase()).includes('vat');

    // Let Stripe determine if reverse charge applies based on EU VAT rules
    const stripeAppliedReverseCharge = taxCalculation.tax_amount_exclusive === 0 && !!taxId;
    const appliesReverseCharge = stripeAppliedReverseCharge && isEUVAT;

    // Determine transaction type based on Stripe's tax calculation result
    const isDomesticB2B = isEUVAT && !stripeAppliedReverseCharge; // VAT ID provided but tax still charged (domestic)
    const isCrossBorderB2B = isEUVAT && stripeAppliedReverseCharge; // VAT ID provided and tax removed (cross-border)

    console.log('Tax calculation debug (Stripe-based):', {
      taxId: taxId ? `${taxId.substring(0, 3)}***` : 'none',
      taxIdType: taxId ? (taxCalculationParams.customer_details.tax_ids?.[0]?.type) : 'none',
      customerAddress,
      vatIdCountry,
      addressCountry: customerAddress.country,
      isEUVAT,
      subtotal: lineItems.reduce((sum, item) => sum + item.amount, 0) / 100,
      taxAmount: taxCalculation.tax_amount_exclusive / 100,
      total: taxCalculation.amount_total / 100,
      stripeAppliedReverseCharge,
      appliesReverseCharge,
      isDomesticB2B,
      isCrossBorderB2B,
      taxBreakdown: taxCalculation.tax_breakdown?.map(t => ({
        rate: t.tax_rate_details.percentage_decimal,
        amount: t.amount / 100,
        type: t.tax_rate_details.tax_type,
        taxabilityReason: t.taxability_reason
      }))
    });

    res.json({
      taxCalculation: {
        id: taxCalculation.id,
        amount_total: taxCalculation.amount_total,
        tax_amount_exclusive: taxCalculation.tax_amount_exclusive,
        tax_amount_inclusive: taxCalculation.tax_amount_inclusive,
        // Convert tax breakdown amounts from cents to dollars for UI
        tax_breakdown: taxCalculation.tax_breakdown?.map(breakdown => ({
          ...breakdown,
          amount: breakdown.amount / 100,
          taxable_amount: breakdown.taxable_amount / 100
        })),
        line_items: taxCalculation.line_items
      },
      // Also return the breakdown for UI
      subtotal: lineItems.reduce((sum, item) => sum + item.amount, 0) / 100,
      taxAmount: taxCalculation.tax_amount_exclusive / 100,
      total: taxCalculation.amount_total / 100,
      // Additional info for UI
      appliesReverseCharge,
      isEUVAT,
      isDomesticB2B,
      isCrossBorderB2B,
      taxIdType: taxId ? detectTaxIdType(taxId.replace(/\s/g, '').toUpperCase()) : null
    });

  } catch (error) {
    console.error('Error calculating tax:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.errors
      });
    }

    res.status(500).json({
      error: 'Failed to calculate tax',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create embedded checkout session endpoint
router.post('/create-embedded-session', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      error: 'Stripe not configured',
      message: 'Payment processing is not available. Please configure STRIPE_SECRET_KEY environment variable.'
    });
  }

  try {
    const body = CreatePaymentIntentSchema.parse(req.body);
    const { tier, orderBumps, metadata } = body;

    const dealStatus = metadata.dealStatus || 'regular';
    const product = PRODUCT_CONFIG[tier];
    const basePrice = getDynamicPrice(tier, dealStatus);
    const isMonthly = dealStatus === 'final_expired';

    // Create line items array starting with main product
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            metadata: {
              tier,
              dealStatus,
              type: 'main_product'
            }
          },
          unit_amount: basePrice * 100, // Stripe uses cents
          recurring: isMonthly ? {
            interval: 'month'
          } : undefined
        },
        quantity: 1,
      }
    ];

    // Add order bumps to line items
    let totalSavings = 0;
    orderBumps?.forEach(bumpId => {
      const bumpKey = bumpId.toUpperCase() as keyof typeof ORDER_BUMPS;
      const bump = ORDER_BUMPS[bumpKey];
      if (bump) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: bump.name,
              description: bump.description,
              metadata: {
                type: 'order_bump',
                bump_id: bumpId
              }
            },
            unit_amount: bump.price * 100
          },
          quantity: 1,
        });
        totalSavings += bump.savings;
      }
    });

    // Create the checkout session with custom UI mode for Elements compatibility
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'custom',
      mode: isMonthly ? 'subscription' : 'payment',
      line_items: lineItems,
      return_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        tier,
        dealStatus,
        orderBumps: orderBumps?.join(',') || '',
        totalSavings: totalSavings.toString(),
        ...metadata
      },
      // Enable customer creation and tax ID collection
      customer_creation: 'always',
      // Payment intent data for one-time payments
      payment_intent_data: isMonthly ? undefined : {
        metadata: {
          tier,
          dealStatus,
          orderBumps: orderBumps?.join(',') || ''
        }
      },
      // Subscription data for recurring payments
      subscription_data: isMonthly ? {
        metadata: {
          tier,
          dealStatus,
          orderBumps: orderBumps?.join(',') || ''
        }
      } : undefined,
      // Enable automatic tax collection and Tax ID collection
      automatic_tax: {
        enabled: true
      },
      tax_id_collection: {
        enabled: true
      },
      // Localization
      locale: 'auto'
    });

    // Debug: Log the session to see what we're getting
    console.log('Session created:', {
      id: session.id,
      mode: session.mode,
      ui_mode: session.ui_mode,
      client_secret: session.client_secret,
      payment_intent: session.payment_intent
    });

    // Extract the Payment Intent client secret for Elements
    let clientSecret = session.client_secret;

    if (session.payment_intent && typeof session.payment_intent === 'object') {
      clientSecret = session.payment_intent.client_secret;
      console.log('Using Payment Intent client secret:', clientSecret);
    } else {
      console.log('Using Checkout Session client secret:', clientSecret);
    }

    res.json({
      clientSecret,
      sessionId: session.id,
      totalAmount: lineItems.reduce((sum, item) => sum + (item.price_data?.unit_amount || 0), 0) / 100,
      totalSavings
    });

  } catch (error) {
    console.error('Error creating embedded checkout session:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.errors
      });
    }

    res.status(500).json({
      error: 'Failed to create embedded checkout session',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;