import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ClockIcon,
  CheckIcon,
  StarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import OrderBumps from '@/components/checkout/OrderBumps';
import { useCheckout } from '@/hooks/useCheckout';
import { useDealPricing } from '@/hooks/useDealPricing';
import { trackCTAClick } from '@/services/tracking';

// Load Stripe - handle missing key for testing
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null);

interface CheckoutProps {
  tier?: 'STARTER' | 'PROFESSIONAL' | 'AGENCY';
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const tierFromUrl = (urlParams.get('tier') as 'STARTER' | 'PROFESSIONAL' | 'AGENCY') || 'PROFESSIONAL';
  const dealStatus = urlParams.get('dealStatus') || 'regular';

  // Hooks
  const dealPricing = useDealPricing(tierFromUrl);
  const checkout = useCheckout(tierFromUrl, dealStatus);

  // Track page visit
  useEffect(() => {
    trackCTAClick(`View Checkout Page - ${tierFromUrl}`, 'checkout');
  }, [tierFromUrl, dealStatus]);

  // Exit intent detection
  useEffect(() => {
    let exitIntentShown = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        setShowExitIntent(true);
        exitIntentShown = true;
        trackCTAClick('Exit Intent Triggered', 'checkout');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleBackToPlans = () => {
    trackCTAClick('Back to Plans', 'checkout');
    setLocation('/');
  };

  // Initialize checkout session on mount if Stripe is configured
  useEffect(() => {
    if (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
      checkout.createCheckoutSession().catch(error => {
        console.error('Error creating checkout session:', error);
      });
    }
  }, [checkout.createCheckoutSession]);

  // Exit intent modal content
  const ExitIntentModal = () => {
    if (!showExitIntent) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-red-600">Wait! Don't Leave Yet!</h3>
            <p className="text-muted-foreground">
              Get an exclusive 20% discount code before you go
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4 text-center">
            <Badge className="bg-green-500 text-white text-lg px-4 py-2 mb-2">
              SAVE20
            </Badge>
            <p className="text-sm text-green-700 dark:text-green-300">
              Use this code for 20% off your purchase (expires in 24 hours)
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowExitIntent(false)}
              className="flex-1"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => {
                setShowExitIntent(false);
                // Apply discount code logic here
                trackCTAClick('Accept Exit Intent Offer', 'checkout');
              }}
              className="flex-1"
            >
              Apply Discount
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="border-b border-border/60 bg-background/95 backdrop-blur sticky top-0 z-40 w-full">
        <div className="w-full px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToPlans}
                className="flex items-center gap-2 -ml-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Plans</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-primary" />
                <span className="font-semibold">Secure Checkout</span>
              </div>
            </div>

            {/* Right section - Trust badges */}
            <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CreditCardIcon className="w-4 h-4" />
                <span>Stripe Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Single-step checkout with order bumps and payment */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 w-full">

            {/* Left column - Order Bumps + Payment Form */}
            <div className="lg:col-span-2 space-y-8 min-w-0 w-full">

              {/* Order Bumps Section */}
              <div className="space-y-6 w-full overflow-hidden">
                <div className="space-y-4">
                  <div className="text-center lg:text-left">
                    <h1 className="text-2xl lg:text-3xl font-bold break-words">
                      Complete Your Order
                    </h1>
                    <p className="text-base lg:text-lg text-muted-foreground mt-2 break-words">
                      Add these proven resources to accelerate your results
                    </p>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg w-full">
                    <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-blue-900 dark:text-blue-100 text-sm sm:text-base break-words">
                        One-time offer - These won't be available again
                      </p>
                      <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 break-words">
                        Save up to 60% compared to buying separately later
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full overflow-hidden">
                  <OrderBumps
                    selectedBumps={checkout.state.selectedBumps}
                    onBumpToggle={checkout.toggleOrderBump}
                    tier={checkout.state.tier}
                  />
                </div>
              </div>

              {/* Payment Form Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-border flex-1" />
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CreditCardIcon className="w-4 h-4" />
                    Payment Details
                  </div>
                  <div className="h-px bg-border flex-1" />
                </div>

                {!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ? (
                  // Demo mode when Stripe is not configured
                  <Card className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <CreditCardIcon className="w-5 h-5 text-primary" />
                          Demo Payment Form
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          This is a preview of the checkout flow. Configure Stripe keys to enable real payments.
                        </p>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg p-4">
                        <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">
                          To enable payments:
                        </h4>
                        <ol className="text-sm text-orange-600 dark:text-orange-400 space-y-1 list-decimal list-inside">
                          <li>Create a Stripe account at stripe.com</li>
                          <li>Get your API keys from the Stripe dashboard</li>
                          <li>Add them to your .env file:
                            <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/30 rounded font-mono text-xs">
                              VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...<br/>
                              STRIPE_SECRET_KEY=sk_test_...<br/>
                              STRIPE_WEBHOOK_SECRET=whsec_...
                            </div>
                          </li>
                          <li>Restart your development server</li>
                        </ol>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email Address</label>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full p-3 border rounded-md bg-muted/50"
                            disabled
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Payment Method</label>
                          <div className="p-4 border rounded-md bg-muted/50 text-center text-muted-foreground">
                            Stripe Payment Element would appear here
                          </div>
                        </div>

                        <Button
                          size="lg"
                          className="w-full font-semibold text-lg bg-gradient-to-b from-green-400 via-green-500 to-green-600 text-white border-0"
                          disabled
                        >
                          <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                          <span className="hidden sm:inline">Complete Purchase • ${checkout.state.totalAmount.toLocaleString()} (Demo)</span>
                          <span className="sm:hidden">Complete • ${checkout.state.totalAmount.toLocaleString()}</span>
                        </Button>

                        <div className="text-center text-xs text-muted-foreground">
                          This is a demonstration. No actual payment will be processed.
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : checkout.state.clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret: checkout.state.clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: 'hsl(var(--primary))',
                          colorBackground: 'hsl(var(--background))',
                          colorText: 'hsl(var(--foreground))',
                          colorDanger: 'hsl(var(--destructive))',
                          borderRadius: '6px',
                        },
                      },
                    }}
                  >
                    <PaymentForm
                      clientSecret={checkout.state.clientSecret}
                      amount={checkout.state.totalAmount}
                      onPaymentSuccess={checkout.handlePaymentSuccess}
                      onPaymentError={checkout.handlePaymentError}
                      isProcessing={checkout.state.isProcessing}
                      tier={checkout.state.tier}
                      orderBumps={checkout.state.selectedBumps}
                      onAddressChange={checkout.setCustomerAddress}
                      onCalculateTax={checkout.calculateTax}
                      onTaxIdChange={checkout.setTaxId}
                    />
                  </Elements>
                ) : (
                  <Card className="p-6">
                    <div className="text-center text-muted-foreground">
                      Initializing payment form...
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* Right column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                tier={checkout.state.tier}
                basePrice={checkout.state.basePrice}
                orderBumps={checkout.getOrderBumpData()}
                totalAmount={checkout.state.totalAmount}
                totalSavings={checkout.state.totalSavings}
                isMonthly={checkout.state.isMonthly}
                dealStatus={checkout.state.dealStatus}
                taxCalculation={checkout.state.taxCalculation}
                isCalculatingTax={checkout.state.isCalculatingTax}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social proof section */}
      <div className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 from 1,247+ businesses</span>
            </div>
            <p className="text-sm text-muted-foreground">
              "Daily we're getting qualified leads and selling is easier than selling water in a desert. Revenue has gone up 10x." - Dr. Munib Ahmad
            </p>
          </div>
        </div>
      </div>

      {/* Exit intent modal */}
      <ExitIntentModal />
    </div>
  );
}