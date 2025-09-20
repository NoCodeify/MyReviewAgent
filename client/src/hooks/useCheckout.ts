import { useState, useCallback, useEffect } from 'react';
import { loadStripe, type Stripe } from '@stripe/stripe-js';

// Load Stripe instance - handle missing key for testing
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null);

interface OrderBump {
  id: string;
  name: string;
  description: string;
  price: number;
  savings: number;
  originalPrice: number;
}

interface BusinessInfo {
  companyName: string;
  taxId: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CustomerAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface TaxCalculation {
  id: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  appliesReverseCharge?: boolean;
  isEUVAT?: boolean;
  isDomesticB2B?: boolean;
  isCrossBorderB2B?: boolean;
  taxIdType?: string | null;
  taxBreakdown: Array<{
    amount: number;
    inclusive: boolean;
    tax_rate_details: {
      country: string;
      flat_amount: number | null;
      percentage_decimal: string;
      rate_type: string;
      state: string;
      tax_type: string;
    };
    taxability_reason: string;
    taxable_amount: number;
  }>;
}

interface CheckoutState {
  tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY';
  basePrice: number;
  selectedBumps: string[];
  totalAmount: number;
  totalSavings: number;
  isProcessing: boolean;
  clientSecret?: string;
  sessionId?: string;
  dealStatus: string;
  isMonthly: boolean;
  customerAddress?: CustomerAddress;
  taxCalculation?: TaxCalculation;
  isCalculatingTax: boolean;
  taxId?: string;
}

interface UseCheckoutReturn {
  // State
  state: CheckoutState;
  orderBumps: OrderBump[];
  stripe: Stripe | null;

  // Actions
  setTier: (tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY') => void;
  toggleOrderBump: (bumpId: string) => void;
  createCheckoutSession: () => Promise<void>;
  handlePaymentSuccess: (paymentIntent: any) => void;
  handlePaymentError: (error: string) => void;
  setCustomerAddress: (address: CustomerAddress) => void;
  setTaxId: (taxId: string) => void;
  calculateTax: (overrideAddress?: CustomerAddress) => Promise<void>;

  // Computed
  getOrderBumpData: () => OrderBump[];
}

// Order bumps configuration (matches backend)
const ORDER_BUMPS_CONFIG: Record<string, Omit<OrderBump, 'id'>> = {
  skool_mastermind: {
    name: 'Skool Mastermind Community',
    description: 'Lifetime access to private community of WhatsApp automation users',
    price: 197,
    savings: 300,
    originalPrice: 497
  },
  credits_bundle: {
    name: '5,000 Credits Bundle',
    description: 'Never run out of conversations with this lifetime credit pack',
    price: 197,
    savings: 300,
    originalPrice: 497
  },
  fuegenix_blueprint: {
    name: 'The FueGenix $15M Blueprint',
    description: 'Complete scaling blueprint from $0 to $15M revealed',
    price: 97,
    savings: 200,
    originalPrice: 297
  }
};

// Pricing configuration (matches backend)
const PRICING_CONFIG = {
  regular: { STARTER: 497, PROFESSIONAL: 997, AGENCY: 1997 },
  first_expired: { STARTER: 697, PROFESSIONAL: 1297, AGENCY: 2497 },
  final_expired: { STARTER: 97, PROFESSIONAL: 197, AGENCY: 397 } // Monthly
};

function getDynamicPrice(tier: keyof typeof PRICING_CONFIG.regular, dealStatus: string): number {
  const prices = PRICING_CONFIG[dealStatus as keyof typeof PRICING_CONFIG] || PRICING_CONFIG.regular;
  return prices[tier];
}

export function useCheckout(
  initialTier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'PROFESSIONAL',
  initialDealStatus: string = 'regular'
): UseCheckoutReturn {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [state, setState] = useState<CheckoutState>(() => {
    const basePrice = getDynamicPrice(initialTier, initialDealStatus);
    const isMonthly = initialDealStatus === 'final_expired';

    return {
      tier: initialTier,
      basePrice,
      selectedBumps: [],
      totalAmount: basePrice,
      totalSavings: 0,
      isProcessing: false,
      dealStatus: initialDealStatus,
      isMonthly,
      isCalculatingTax: false
    };
  });

  // Load Stripe instance
  useEffect(() => {
    stripePromise.then(setStripe);
  }, []);

  // Calculate totals when tier or bumps change
  const recalculateTotals = useCallback((
    tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY',
    selectedBumps: string[],
    dealStatus: string
  ) => {
    const basePrice = getDynamicPrice(tier, dealStatus);
    const bumpTotal = selectedBumps.reduce((total, bumpId) => {
      const bump = ORDER_BUMPS_CONFIG[bumpId];
      return total + (bump ? bump.price : 0);
    }, 0);

    const totalSavings = selectedBumps.reduce((total, bumpId) => {
      const bump = ORDER_BUMPS_CONFIG[bumpId];
      return total + (bump ? bump.savings : 0);
    }, 0);

    return {
      basePrice,
      totalAmount: basePrice + bumpTotal,
      totalSavings
    };
  }, []);

  const setTier = useCallback((tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY') => {
    setState(prevState => {
      const { basePrice, totalAmount, totalSavings } = recalculateTotals(
        tier,
        prevState.selectedBumps,
        prevState.dealStatus
      );

      return {
        ...prevState,
        tier,
        basePrice,
        totalAmount,
        totalSavings
      };
    });
  }, [recalculateTotals]);

  const toggleOrderBump = useCallback((bumpId: string) => {
    setState(prevState => {
      const selectedBumps = prevState.selectedBumps.includes(bumpId)
        ? prevState.selectedBumps.filter(id => id !== bumpId)
        : [...prevState.selectedBumps, bumpId];

      const { basePrice, totalAmount, totalSavings } = recalculateTotals(
        prevState.tier,
        selectedBumps,
        prevState.dealStatus
      );

      return {
        ...prevState,
        selectedBumps,
        basePrice,
        totalAmount,
        totalSavings
      };
    });
  }, [recalculateTotals]);

  const setCustomerAddress = useCallback((address: CustomerAddress) => {
    setState(prevState => ({
      ...prevState,
      customerAddress: address,
      // Reset tax calculation when address changes
      taxCalculation: undefined,
      // Reset total amount to base calculation while we recalculate tax
      totalAmount: prevState.basePrice + prevState.selectedBumps.reduce((total, bumpId) => {
        const bumpKey = bumpId.toUpperCase() as keyof typeof ORDER_BUMPS_CONFIG;
        const bump = ORDER_BUMPS_CONFIG[bumpKey];
        return total + (bump ? bump.price : 0);
      }, 0)
    }));
  }, []);

  const setTaxId = useCallback((taxId: string) => {
    setState(prevState => ({
      ...prevState,
      taxId,
      // Reset tax calculation when tax ID changes
      taxCalculation: undefined,
      // Reset total amount to base calculation while we recalculate tax
      totalAmount: prevState.basePrice + prevState.selectedBumps.reduce((total, bumpId) => {
        const bumpKey = bumpId.toUpperCase() as keyof typeof ORDER_BUMPS_CONFIG;
        const bump = ORDER_BUMPS_CONFIG[bumpKey];
        return total + (bump ? bump.price : 0);
      }, 0)
    }));
  }, []);

  const calculateTax = useCallback(async (overrideAddress?: CustomerAddress) => {
    const addressToUse = overrideAddress || state.customerAddress;

    if (!addressToUse) {
      console.warn('Cannot calculate tax without customer address');
      return;
    }

    // Don't calculate if we don't have at least a country
    if (!addressToUse.country) {
      console.warn('Cannot calculate tax without customer country');
      return;
    }

    setState(prevState => ({ ...prevState, isCalculatingTax: true }));

    try {
      const requestBody = {
        tier: state.tier,
        orderBumps: state.selectedBumps,
        customerAddress: addressToUse,
        taxId: state.taxId,
        metadata: {
          dealStatus: state.dealStatus
        }
      };

      console.log('Calculating tax with data:', {
        ...requestBody,
        taxId: requestBody.taxId ? `${requestBody.taxId.substring(0, 3)}***` : 'NONE',
        addressCountry: requestBody.customerAddress.country,
        hasValidVAT: !!requestBody.taxId?.trim()
      });

      const response = await fetch('/api/checkout/calculate-tax', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Tax calculation failed:', errorData);

        // Don't throw for tax calculation errors - just show a warning
        setState(prevState => ({
          ...prevState,
          isCalculatingTax: false,
          taxCalculation: undefined // Clear any previous tax calculation
        }));
        return;
      }

      const data = await response.json();
      console.log('Tax calculation response:', data);

      // Flatten the response structure to match the expected interface
      const flatTaxCalculation = {
        id: data.taxCalculation.id,
        subtotal: data.subtotal,
        taxAmount: data.taxAmount,
        total: data.total,
        appliesReverseCharge: data.appliesReverseCharge || false,
        isEUVAT: data.isEUVAT || false,
        isDomesticB2B: data.isDomesticB2B || false,
        isCrossBorderB2B: data.isCrossBorderB2B || false,
        taxIdType: data.taxIdType || null,
        // API already returns breakdown amounts in dollars, no conversion needed
        taxBreakdown: data.taxCalculation.tax_breakdown
      };

      setState(prevState => ({
        ...prevState,
        taxCalculation: flatTaxCalculation,
        totalAmount: data.total,
        isCalculatingTax: false
      }));
    } catch (error) {
      console.error('Error calculating tax:', error);
      setState(prevState => ({
        ...prevState,
        isCalculatingTax: false,
        taxCalculation: undefined // Clear any previous tax calculation
      }));
      // Don't re-throw the error to prevent app crashes
    }
  }, [state.tier, state.selectedBumps, state.taxId, state.dealStatus]);

  const createCheckoutSession = useCallback(async () => {
    setState(prevState => ({ ...prevState, isProcessing: true }));

    try {
      const requestBody = {
        tier: state.tier,
        orderBumps: state.selectedBumps,
        customerAddress: state.customerAddress,
        taxCalculationId: state.taxCalculation?.id,
        metadata: {
          dealStatus: state.dealStatus
        }
      };

      const response = await fetch('/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setState(prevState => ({
        ...prevState,
        clientSecret: data.clientSecret,
        sessionId: data.sessionId,
        isProcessing: false
      }));
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setState(prevState => ({ ...prevState, isProcessing: false }));
      throw error;
    }
  }, [state.tier, state.selectedBumps, state.dealStatus, state.customerAddress, state.taxCalculation?.id]);

  const handlePaymentSuccess = useCallback((paymentIntent: any) => {
    setState(prevState => ({
      ...prevState,
      paymentIntent,
      isProcessing: false
    }));

    // Redirect to success page or show success message
    window.location.href = `/checkout/success?payment_intent=${paymentIntent.id}`;
  }, []);

  const handlePaymentError = useCallback((error: string) => {
    setState(prevState => ({ ...prevState, isProcessing: false }));
    console.error('Payment error:', error);
    // Handle error (show toast, etc.)
  }, []);

  const getOrderBumpData = useCallback((): OrderBump[] => {
    return state.selectedBumps.map(bumpId => ({
      id: bumpId,
      ...ORDER_BUMPS_CONFIG[bumpId]
    })).filter(Boolean);
  }, [state.selectedBumps]);

  const orderBumps = Object.entries(ORDER_BUMPS_CONFIG).map(([id, config]) => ({
    id,
    ...config
  }));

  return {
    state,
    orderBumps,
    stripe,
    setTier,
    toggleOrderBump,
    createCheckoutSession,
    handlePaymentSuccess,
    handlePaymentError,
    setCustomerAddress,
    setTaxId,
    calculateTax,
    getOrderBumpData
  };
}