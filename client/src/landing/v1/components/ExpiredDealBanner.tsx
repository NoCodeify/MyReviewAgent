import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowRightIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useDealPricing, useFormattedPrice } from "@/hooks/useDealPricing";
import { useState } from "react";

export default function ExpiredDealBanner() {
  const dealPricing = useDealPricing();
  const pricing = useFormattedPrice();
  const [isDismissed, setIsDismissed] = useState(false);

  // Only show if deal is expired and not dismissed
  const showBanner = (dealPricing.isFirstExpired || dealPricing.isFinalExpired) && !isDismissed;

  if (!showBanner) {
    return null;
  }

  const handleGetDeal = () => {
    const ctaSection = document.getElementById('final-cta');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <Card className="relative max-w-4xl mx-auto bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/90 dark:to-red-950/90 border-2 border-orange-200 dark:border-orange-800 shadow-xl animate-in slide-in-from-top duration-500">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Dismiss banner"
        >
          <XMarkIcon className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Warning Icon & Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <ExclamationTriangleIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-lg text-foreground">
                  {dealPricing.isFinalExpired
                    ? "Final Chance - Now Monthly Pricing Only"
                    : "Your Original Deal Has Expired"
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  {dealPricing.isFinalExpired ? (
                    <>
                      Last chance to get MyWhatsAgent for{" "}
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        {pricing.formattedPrice}
                      </span>{" "}
                      (lifetime pricing is no longer available)
                    </>
                  ) : (
                    <>
                      But you can still get lifetime access for{" "}
                      <span className="font-semibold text-orange-600 dark:text-orange-400">
                        {pricing.currentPrice}
                      </span>{" "}
                      before it becomes {pricing.nextTierPrice}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Urgency Badge */}
            <div className="hidden lg:flex items-center gap-3">
              <Badge className={`font-medium ${
                dealPricing.isFinalExpired
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                  : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
              }`}>
                <ClockIcon className="w-3 h-3 mr-1" />
                {dealPricing.isFinalExpired ? 'Final Chance' : 'Deal Expired'}
              </Badge>
            </div>

            {/* CTA Button */}
            <Button
              size="sm"
              onClick={handleGetDeal}
              className={`text-white font-semibold whitespace-nowrap ${
                dealPricing.isFinalExpired
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
              }`}
            >
              {dealPricing.isFinalExpired ? 'Get Monthly Plan' : `Get ${pricing.currentPrice} Deal`}
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Urgency Badge */}
          <div className="lg:hidden mt-3 flex justify-center">
            <Badge className={`font-medium ${
              dealPricing.isFinalExpired
                ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
            }`}>
              <ClockIcon className="w-3 h-3 mr-1" />
              {dealPricing.isFinalExpired
                ? 'Monthly pricing only - lifetime no longer available'
                : `Last chance before it becomes ${pricing.nextTierPrice}`
              }
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}