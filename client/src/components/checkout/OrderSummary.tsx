import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckIcon,
  SparklesIcon,
  FireIcon,
  BoltIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline';

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

interface OrderSummaryProps {
  tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY';
  basePrice: number;
  orderBumps: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    savings: number;
    originalPrice: number;
  }>;
  totalAmount: number;
  totalSavings: number;
  isMonthly?: boolean;
  dealStatus?: string;
  taxCalculation?: TaxCalculation;
  isCalculatingTax?: boolean;
}

interface TierInfo {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  features: string[];
  creditsIncluded: string;
  whatsappNumbers: string;
}

const TIER_INFO: Record<string, TierInfo> = {
  STARTER: {
    name: 'Starter Plan',
    icon: FireIcon,
    color: 'text-orange-500',
    description: 'Perfect for small businesses',
    creditsIncluded: '500 credits included (~250 conversations)',
    whatsappNumbers: '1 WhatsApp Business Account',
    features: [
      '20k character AI instructions limit',
      '20 AI responses per chat',
      'Incoming messages only',
      'Voice note understanding',
      'Unlimited contacts',
      'Basic analytics',
      'Email support'
    ]
  },
  PROFESSIONAL: {
    name: 'Professional Plan',
    icon: BoltIcon,
    color: 'text-blue-500',
    description: 'For growing businesses',
    creditsIncluded: '2,000 credits included (~1,000 conversations)',
    whatsappNumbers: '3 WhatsApp Business Accounts',
    features: [
      '100k character AI instructions limit',
      'Unlimited AI responses per chat',
      'Outgoing campaigns',
      'Image & video understanding',
      'Document understanding',
      'Automatic follow-ups',
      'Real-time web search',
      'AI appointment booking',
      'Priority support (2-hour response)'
    ]
  },
  AGENCY: {
    name: 'Agency Plan',
    icon: BuildingOfficeIcon,
    color: 'text-purple-500',
    description: 'Build your own AI agency',
    creditsIncluded: '10,000 credits included (~5,000 conversations)',
    whatsappNumbers: 'Unlimited WhatsApp Accounts',
    features: [
      'Everything in Professional PLUS:',
      'Unlimited sub-accounts',
      'Full white-labeling',
      'Personalized onboarding',
      'Early access to new features',
      'Roadmap priority'
    ]
  }
};

export default function OrderSummary({
  tier,
  basePrice,
  orderBumps,
  totalAmount,
  totalSavings,
  isMonthly = false,
  dealStatus = 'regular',
  taxCalculation,
  isCalculatingTax = false
}: OrderSummaryProps) {
  const tierInfo = TIER_INFO[tier];

  // Calculate original price for savings display
  const originalBasePrice = (() => {
    switch (dealStatus) {
      case 'regular':
        return basePrice * 2.4; // Show 2.4x as original price
      case 'first_expired':
        return basePrice * 1.8; // Show 1.8x as original price
      case 'final_expired':
        return basePrice * 8; // Show much higher original for monthly
      default:
        return basePrice * 2;
    }
  })();

  const baseSavings = originalBasePrice - basePrice;
  const totalOriginalPrice = originalBasePrice + orderBumps.reduce((sum, bump) => sum + bump.originalPrice, 0);

  return (
    <Card className="p-6 space-y-6 sticky top-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <tierInfo.icon className={`w-6 h-6 ${tierInfo.color}`} />
          <h3 className="text-xl font-semibold">{tierInfo.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{tierInfo.description}</p>

        {/* Deal status badge */}
        {dealStatus !== 'final_expired' && (
          <Badge className={`${
            dealStatus === 'first_expired'
              ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30'
              : 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30'
          }`}>
            <SparklesIcon className="w-3 h-3 mr-1" />
            {dealStatus === 'first_expired' ? 'Last Chance Lifetime' : 'Lifetime Deal'}
          </Badge>
        )}
      </div>

      <Separator />

      {/* Base plan details */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="font-medium">{tierInfo.name}</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckIcon className="w-3 h-3 text-green-500" />
                <span>{tierInfo.creditsIncluded}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ChatBubbleLeftRightIcon className="w-3 h-3 text-primary" />
                <span>{tierInfo.whatsappNumbers}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">${basePrice.toLocaleString()}</div>
            {baseSavings > 0 && (
              <div className="text-xs text-muted-foreground line-through">
                ${originalBasePrice.toLocaleString()}
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              {isMonthly ? '/month' : 'lifetime'}
            </div>
          </div>
        </div>

        {/* Key features preview */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Key Features:
          </p>
          <div className="space-y-1">
            {tierInfo.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckIcon className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order bumps */}
      {orderBumps.length > 0 && (
        <>
          <Separator />
          <div className="space-y-3">
            <p className="text-sm font-medium">Add-ons:</p>
            {orderBumps.map((bump) => (
              <div key={bump.id} className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">{bump.name}</p>
                  <p className="text-xs text-muted-foreground">{bump.description}</p>
                  {bump.savings > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <TagIcon className="w-3 h-3 mr-1" />
                      Save ${bump.savings}
                    </Badge>
                  )}
                </div>
                <div className="text-right ml-4">
                  <div className="font-semibold">${bump.price}</div>
                  {bump.originalPrice > bump.price && (
                    <div className="text-xs text-muted-foreground line-through">
                      ${bump.originalPrice}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Separator />

      {/* Pricing breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>
            {taxCalculation ?
              `$${taxCalculation.subtotal.toLocaleString()}` :
              `$${(basePrice + orderBumps.reduce((sum, bump) => sum + bump.price, 0)).toLocaleString()}`
            }
          </span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
            <span>You save:</span>
            <span>-${totalSavings.toLocaleString()}</span>
          </div>
        )}

        {/* Tax breakdown */}
        {taxCalculation && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tax{(() => {
                // Extract tax rate from the first breakdown item
                if (taxCalculation.taxBreakdown && taxCalculation.taxBreakdown.length > 0) {
                  // percentage_decimal from Stripe is already a percentage (e.g., "21.0" for 21%)
                  const rate = parseFloat(taxCalculation.taxBreakdown[0].tax_rate_details?.percentage_decimal || '0');
                  return ` (${rate.toFixed(1)}%)`;
                }
                return '';
              })()}:</span>
              <span>${taxCalculation.taxAmount.toLocaleString()}</span>
            </div>

            {/* B2B transaction notices */}
            {taxCalculation.isDomesticB2B && (
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-3 h-3 text-blue-500" />
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Domestic B2B transaction
                  </p>
                </div>
                <p className="text-xs text-muted-foreground ml-5">
                  Standard VAT applies for domestic business transactions
                </p>
              </div>
            )}

            {taxCalculation.appliesReverseCharge && taxCalculation.taxAmount === 0 && taxCalculation.isCrossBorderB2B && (
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-3 h-3 text-green-500" />
                  <p className="text-xs text-green-600 dark:text-green-400">
                    EU VAT Reverse Charge applies
                  </p>
                </div>
                <p className="text-xs text-muted-foreground ml-5">
                  As a cross-border business customer with a valid EU VAT ID, you're responsible for self-assessing VAT
                </p>
              </div>
            )}

            {taxCalculation.taxBreakdown && taxCalculation.taxBreakdown.length > 0 && (
              <div className="ml-4 space-y-1">
                {taxCalculation.taxBreakdown.map((breakdown, index) => {
                  // percentage_decimal from Stripe is already a percentage (e.g., "21.0" for 21%)
                  const rate = parseFloat(breakdown.tax_rate_details?.percentage_decimal || '0');
                  const rateDisplay = rate > 0 ? ` (${rate.toFixed(2)}%)` : ' (0%)';
                  const location = breakdown.tax_rate_details?.state
                    ? `${breakdown.tax_rate_details.state}, ${breakdown.tax_rate_details.country}`
                    : breakdown.tax_rate_details?.country || 'Unknown';
                  return (
                    <div key={index} className="flex justify-between text-xs text-muted-foreground">
                      <span>{location} {breakdown.tax_rate_details?.tax_type}{rateDisplay}:</span>
                      <span>${breakdown.amount.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {taxCalculation.taxBreakdown && taxCalculation.taxBreakdown.length > 0 && taxCalculation.taxAmount === 0 && !taxCalculation.appliesReverseCharge && (
              <p className="text-xs text-muted-foreground ml-4">
                No tax collected - Software as a Service may be exempt in this jurisdiction
              </p>
            )}
          </div>
        )}

        {isCalculatingTax && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Calculating tax...</span>
            <div className="animate-pulse">--</div>
          </div>
        )}

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <div className="text-right">
            <div className="text-2xl font-bold">
              ${(taxCalculation ? taxCalculation.total : totalAmount).toLocaleString()}
            </div>
            {isMonthly && (
              <div className="text-xs text-muted-foreground">/month</div>
            )}
          </div>
        </div>

        {totalSavings > 0 && (
          <div className="text-center">
            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
              <TagIcon className="w-3 h-3 mr-1" />
              Total savings: ${(totalOriginalPrice - totalAmount).toLocaleString()}
            </Badge>
          </div>
        )}
      </div>

      {/* Value propositions */}
      <div className="space-y-3 pt-4 border-t">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ClockIcon className="w-4 h-4 text-primary" />
            <span>Setup in under 5 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckIcon className="w-4 h-4 text-green-500" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SparklesIcon className="w-4 h-4 text-primary" />
            <span>{isMonthly ? 'Cancel anytime' : 'Lifetime access included'}</span>
          </div>
        </div>
      </div>

      {/* Urgency element */}
      {dealStatus !== 'final_expired' && (
        <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
            <ClockIcon className="w-4 h-4" />
            <span className="font-medium">
              {dealStatus === 'first_expired'
                ? 'Final hours for lifetime access!'
                : 'Limited time: Lifetime pricing ending soon!'
              }
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}