import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
  GiftIcon,
  ClockIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { useDealPricing, useFormattedPrice } from "@/hooks/useDealPricing";

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const dealPricing = useDealPricing();
  const pricing = useFormattedPrice();

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Add delay before activating to avoid immediate trigger
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClaim = () => {
    const ctaSection = document.getElementById('final-cta');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="relative max-w-2xl w-full p-8 lg:p-12 bg-background border-2 border-destructive/20 shadow-2xl animate-in slide-in-from-top-4 duration-300">

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <XMarkIcon className="w-6 h-6 text-muted-foreground" />
        </button>

        {/* Warning Badge */}
        <div className="flex justify-center mb-6">
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-base px-4 py-2">
            <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
            WAIT! DON'T LEAVE EMPTY-HANDED
          </Badge>
        </div>

        {/* Main Offer */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            {dealPricing.isFirstExpired || dealPricing.isFinalExpired ? (
              <>
                Your Deal Has Expired, But...
                <span className="block text-destructive">You Can Still Get It for {pricing.currentPrice}</span>
              </>
            ) : (
              <>
                You're About to Miss Out on
                <span className="block text-destructive">$127,000 in Lost WhatsApp Sales</span>
              </>
            )}
          </h2>

          <p className="text-lg text-muted-foreground">
            {dealPricing.isFirstExpired || dealPricing.isFinalExpired
              ? "This is your absolute final opportunity before the price goes higher..."
              : "Plus, I want to give you something special..."
            }
          </p>

          {/* Bonus Offer */}
          <Card className="p-6 bg-gradient-to-br from-chart-1/10 to-chart-2/10 border-chart-1/20">
            <h3 className="text-2xl font-bold text-foreground text-center mb-4">
              <GiftIcon className="w-6 h-6 text-chart-1 inline-block mr-2 align-text-bottom" />
              FREE BONUS: My $5M WhatsApp Templates
            </h3>

            <ul className="space-y-3 text-left max-w-md mx-auto mb-6">
              <li className="flex items-start gap-2">
                <span className="text-chart-1 font-bold">✓</span>
                <span className="text-foreground">
                  <strong>Cart Recovery Template</strong> - Recovered $2M in lost sales
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-chart-1 font-bold">✓</span>
                <span className="text-foreground">
                  <strong>Appointment Booking Flow</strong> - 312 bookings in 30 days
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-chart-1 font-bold">✓</span>
                <span className="text-foreground">
                  <strong>Lead Qualification Script</strong> - 45% qualification rate
                </span>
              </li>
            </ul>

            <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-lg px-4 py-2">
              Worth $997 - Yours FREE with MyWhatsAgent
            </Badge>
          </Card>

          {/* Urgency */}
          <div className="flex items-center justify-center gap-2 text-destructive">
            <ClockIcon className="w-5 h-5" />
            <span className="font-semibold">
              {dealPricing.isFirstExpired || dealPricing.isFinalExpired
                ? `Last chance at ${pricing.currentPrice} (Next: ${pricing.nextTierPrice})`
                : `Only 3 licenses left at ${pricing.currentPrice} (Next: ${pricing.nextTierPrice})`
              }
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
              onClick={handleClaim}
            >
              Claim My License + Bonus
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleClose}
            >
              No Thanks, I Hate Money
            </Button>
          </div>

          {/* Trust element */}
          <p className="text-xs text-muted-foreground">
            30-day money-back guarantee • No monthly fees • Lifetime updates
          </p>
        </div>
      </Card>
    </div>
  );
}