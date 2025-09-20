import React, { useState, useEffect, useCallback } from 'react';
import {
  PaymentElement,
  AddressElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  CreditCardIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { trackCTAClick } from '@/services/tracking';

interface CustomerAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface PaymentFormProps {
  clientSecret: string;
  amount: number;
  onPaymentSuccess: (session: any) => void;
  onPaymentError: (error: string) => void;
  isProcessing?: boolean;
  tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY';
  orderBumps: string[];
  onAddressChange?: (address: CustomerAddress) => void;
  onCalculateTax?: (address?: CustomerAddress) => void;
  onTaxIdChange?: (taxId: string) => void;
}

export default function PaymentForm({
  clientSecret,
  amount,
  onPaymentSuccess,
  onPaymentError,
  isProcessing = false,
  tier,
  orderBumps,
  onAddressChange,
  onCalculateTax,
  onTaxIdChange
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [businessName, setBusinessName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [taxIdError, setTaxIdError] = useState<string>('');
  const [taxIdValidation, setTaxIdValidation] = useState<{
    isValid: boolean;
    isValidating: boolean;
    appliesReverseCharge: boolean;
    taxIdType: string | null;
    isEUVAT: boolean;
  }>({
    isValid: false,
    isValidating: false,
    appliesReverseCharge: false,
    taxIdType: null,
    isEUVAT: false
  });

  // Link authentication state
  const [linkEmail, setLinkEmail] = useState('');

  // Track previous country for change detection
  const [previousCountry, setPreviousCountry] = useState<string>('');

  // Track current address for VAT ID recalculation
  const [currentAddress, setCurrentAddress] = useState<CustomerAddress | null>(null);


  // API-based tax ID validation function
  const validateTaxIdWithAPI = useCallback(async (value: string) => {
    if (!value.trim()) {
      setTaxIdError('');
      setTaxIdValidation({
        isValid: false,
        isValidating: false,
        appliesReverseCharge: false,
        taxIdType: null,
        isEUVAT: false
      });
      return;
    }

    setTaxIdValidation(prev => ({ ...prev, isValidating: true }));
    setTaxIdError('');

    try {
      const response = await fetch('/api/checkout/validate-tax-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taxId: value })
      });

      const data = await response.json();

      if (data.isValid) {
        setTaxIdValidation({
          isValid: true,
          isValidating: false,
          appliesReverseCharge: data.appliesReverseCharge || false,
          taxIdType: data.taxIdType,
          isEUVAT: data.isEUVAT || false
        });
        setTaxIdError('');
      } else {
        setTaxIdValidation({
          isValid: false,
          isValidating: false,
          appliesReverseCharge: false,
          taxIdType: data.taxIdType,
          isEUVAT: data.isEUVAT || false
        });
        setTaxIdError(data.error || 'Invalid tax ID');
      }
    } catch (error) {
      console.error('Error validating tax ID:', error);
      setTaxIdValidation({
        isValid: false,
        isValidating: false,
        appliesReverseCharge: false,
        taxIdType: null,
        isEUVAT: false
      });
      setTaxIdError('Error validating tax ID. Please try again.');
    }
  }, []);

  // Debounced tax ID change handler
  const debouncedTaxIdChange = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          await validateTaxIdWithAPI(value);

          if (onTaxIdChange) {
            onTaxIdChange(value);
            console.log('VAT ID set in state, now triggering tax calculation...');
            console.log('onCalculateTax available:', !!onCalculateTax);
            console.log('value.trim():', value.trim());

            // Trigger tax recalculation after VAT ID is set in state
            if (onCalculateTax && value.trim() && currentAddress) {
              console.log('Triggering tax calculation with 100ms delay...');
              console.log('Current address:', currentAddress);
              // Use a shorter delay since VAT ID validation is already complete
              setTimeout(() => {
                console.log('Executing onCalculateTax() with current address...');
                onCalculateTax(currentAddress); // Pass the current address explicitly
              }, 100); // Reduced delay - just enough for state update
            } else {
              console.log('Tax calculation NOT triggered - missing onCalculateTax, empty value, or no address');
              console.log('onCalculateTax:', !!onCalculateTax);
              console.log('value.trim():', value.trim());
              console.log('currentAddress:', currentAddress);
            }
          }
        }, 1000); // 1000ms debounce for API calls
      };
    })(),
    [validateTaxIdWithAPI, onTaxIdChange, onCalculateTax, currentAddress]
  );

  // Handle tax ID input change
  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaxId(value);
    debouncedTaxIdChange(value);
  };

  // Payment Element options with Link email
  const paymentElementOptions = {
    layout: {
      type: 'tabs' as const,
      defaultCollapsed: false,
    },
    business: {
      name: 'WhatsAgent'
    },
    fields: {
      billingDetails: {
        email: 'never' as const,
        name: 'never' as const,
        phone: 'never' as const,
        address: 'never' as const // Address Element will handle this
      }
    },
    // Pass Link email for prefilling
    defaultValues: {
      billingDetails: {
        email: linkEmail || email
      }
    }
  };

  // Address Element options
  const addressElementOptions = {
    mode: 'billing' as const,
    autocomplete: {
      mode: 'automatic' as const,
    },
    // No allowedCountries restriction - support all countries
    fields: {
      phone: 'always' as const, // Make phone number required
    },
    validation: {
      phone: {
        required: 'always' as const
      }
    }
  };

  // Handle Link authentication
  const handleLinkAuthentication = (event: any) => {
    if (event.value.email) {
      setLinkEmail(event.value.email);
      // Also sync with regular email field
      setEmail(event.value.email);
    }
  };

  // Handle address change for tax calculation
  const handleAddressChange = (event: any) => {
    console.log('Address change event:', event);

    if (event.value && onAddressChange && onCalculateTax) {
      // Handle different possible structures
      const addressData = event.value.address || event.value;

      const address: CustomerAddress = {
        line1: addressData.line1 || '',
        line2: addressData.line2 || '',
        city: addressData.city || '',
        state: addressData.state || '',
        postal_code: addressData.postal_code || addressData.postalCode || '',
        country: addressData.country || ''
      };

      console.log('Parsed address:', address);

      // Check if country changed
      const countryChanged = previousCountry && previousCountry !== address.country;
      if (countryChanged) {
        console.log(`Country changed from ${previousCountry} to ${address.country}`);
        console.log('Current VAT ID:', taxId ? `${taxId.substring(0, 3)}***` : 'NONE');
        console.log('VAT validation state:', taxIdValidation);
      }

      // Update previous country
      if (address.country) {
        setPreviousCountry(address.country);
      }

      // Trigger address change and tax calculation if we have at least a country
      if (address.country) {
        // Save current address for VAT ID recalculation
        setCurrentAddress(address);

        onAddressChange(address);

        // Calculate tax immediately with the new address (no state delay)
        console.log('Triggering tax calculation for address:', address);
        console.log('With VAT ID:', taxId ? `${taxId.substring(0, 3)}***` : 'NONE');
        onCalculateTax(address);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Track checkout attempt
    trackCTAClick(`Complete Purchase - ${tier} - $${amount}`, 'checkout-form');

    try {
      // Confirm the payment with the checkout session
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/return`,
          receipt_email: email || undefined,
        },
        redirect: 'if_required'
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred during payment.');
        onPaymentError(error.message || 'Payment failed');
        trackCTAClick(`Payment Error - ${error.type || 'Unknown'}`, 'checkout-form');
      } else {
        // Payment succeeded
        onPaymentSuccess({ status: 'succeeded' });
        trackCTAClick(`Payment Success - ${tier} - $${amount}`, 'checkout-form');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setErrorMessage(errorMsg);
      onPaymentError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };



  // Security badges for trust
  const securityFeatures = [
    { icon: ShieldCheckIcon, text: '256-bit SSL encryption' },
    { icon: LockClosedIcon, text: 'PCI DSS compliant' },
    { icon: CreditCardIcon, text: 'Stripe secure processing' }
  ];

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <CreditCardIcon className="w-5 h-5 text-primary" />
            Payment Details
          </h3>
          <p className="text-sm text-muted-foreground">
            Complete your purchase securely with Stripe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Contact Information</Label>
              <p className="text-xs text-muted-foreground">
                We'll send your receipt and account details here
              </p>
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="link-auth-container">
                <LinkAuthenticationElement
                  onChange={handleLinkAuthentication}
                  options={{
                    defaultValues: {
                      email: email
                    }
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Secure, fast checkout with Link
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="payment-element-container">
              <PaymentElement options={paymentElementOptions} />
            </div>
          </div>

          {/* Business Information (Optional) */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Business Information (Optional)</Label>
              <p className="text-xs text-muted-foreground">
                Only fill if purchasing for your business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your Business LLC"
                  className="w-full px-3 py-2.5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                  style={{
                    height: '48px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.045)',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e6e6e6'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">EU VAT ID</Label>
                <div className="relative">
                  <input
                    id="taxId"
                    type="text"
                    value={taxId}
                    onChange={handleTaxIdChange}
                    placeholder="EU1234567890"
                    className={`w-full px-3 py-2.5 pr-10 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors text-sm ${
                      taxIdError ? 'border-red-500 focus:ring-red-500' :
                      taxIdValidation.isValid ? 'border-green-500 focus:ring-green-500' :
                      'focus:ring-blue-500'
                    }`}
                    style={{
                      height: '48px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.045)',
                      borderRadius: '6px',
                      border: `1px solid ${
                        taxIdError ? '#ef4444' :
                        taxIdValidation.isValid ? '#22c55e' :
                        '#e6e6e6'
                      }`
                    }}
                    onFocus={(e) => e.target.style.borderColor =
                      taxIdError ? '#ef4444' :
                      taxIdValidation.isValid ? '#22c55e' :
                      '#3b82f6'
                    }
                    onBlur={(e) => e.target.style.borderColor =
                      taxIdError ? '#ef4444' :
                      taxIdValidation.isValid ? '#22c55e' :
                      '#e6e6e6'
                    }
                  />

                  {/* Validation status icon */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {taxIdValidation.isValidating ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
                    ) : taxIdValidation.isValid ? (
                      <CheckIcon className="w-4 h-4 text-green-600" />
                    ) : taxIdError ? (
                      <div className="w-4 h-4 text-red-600">✕</div>
                    ) : null}
                  </div>
                </div>

                {/* Error message */}
                {taxIdError && (
                  <p className="text-xs text-red-500 mt-1">{taxIdError}</p>
                )}

                {/* Success message for EU VAT */}
                {taxIdValidation.isValid && taxIdValidation.appliesReverseCharge && (
                  <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <CheckIcon className="w-3 h-3" />
                    VAT reverse charge applies - 0% VAT for B2B transaction
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-2">
            <Label>Billing Address</Label>
            <div className="address-element-container">
              <AddressElement
                options={addressElementOptions}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{errorMessage}</p>
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold text-lg bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5)] transform hover:translate-y-[-1px] transition-all duration-200"
            disabled={!stripe || isLoading || isProcessing}
          >
            {isLoading || isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Processing...
              </>
            ) : (
              <>
                <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Complete Purchase • ${amount.toLocaleString()}</span>
                <span className="sm:hidden">Complete • ${amount.toLocaleString()}</span>
              </>
            )}
          </Button>
        </form>

        {/* Security badges */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-1">
                <feature.icon className="w-3 h-3" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Badge variant="secondary" className="text-xs">
              <ShieldCheckIcon className="w-3 h-3 mr-1" />
              30-day money-back guarantee
            </Badge>
          </div>
        </div>

        {/* Processing notice */}
        <p className="text-xs text-center text-muted-foreground">
          Your payment is processed securely by Stripe. We don't store your card details.
        </p>
      </div>
    </Card>
  );
}