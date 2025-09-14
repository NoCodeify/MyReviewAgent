import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";
import { useDealPricing, useDealTimer } from "@/hooks/useDealPricing";

export default function StickyHeader() {
  const dynamic = useDynamicContentContext();
  const dealPricing = useDealPricing();
  const dealTimer = useDealTimer();
  const [isVisible, setIsVisible] = useState(false);




  // Calculate time until midnight
  const calculateTimeToMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeToMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeToMidnight();
      setTimeLeft(newTimeLeft);

      // Check if timer reached 00:00:00 (all values are 0)
      if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        // Trigger deal expiration based on current status
        if (dealPricing.dealStatus === 'regular') {
          console.log('🚨 Timer expired - triggering first deal expiration');
          dealTimer.onFirstTimerComplete();
        } else if (dealPricing.dealStatus === 'first_expired') {
          console.log('🚨 Timer expired - triggering final deal expiration');
          dealTimer.onFinalTimerComplete();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dealPricing.dealStatus, dealTimer]);


  // Trigger slide-down animation when location is loaded
  useEffect(() => {
    if (dynamic.location) {
      // Small delay to ensure smooth animation
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(showTimer);
    }
  }, [dynamic.location]);

  // Don't render until location is loaded
  if (!dynamic.location) {
    return null;
  }

  return (
    <div
      className={`fixed left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-all duration-500 ease-out ${
        isVisible ? 'top-0 opacity-100' : '-top-20 opacity-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between py-2 lg:py-3 gap-2 lg:gap-0">
          {/* Mobile: Combined scarcity and timer */}
          <div className="lg:hidden flex items-center gap-3 text-xs">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-2 py-0.5 text-xs">
              {dealPricing.isFinalExpired ?
                'Monthly pricing active' :
                dealPricing.isFirstExpired ?
                'Last chance pricing' :
                `Only ${dynamic.licensesRemaining} licenses left`
              }
            </Badge>
            {!dealPricing.isFinalExpired && (
              <div className="flex items-center text-slate-400">
                <span className="font-mono text-xs">
                  {dynamic.dayOfWeek} ends in {timeLeft.hours.toString().padStart(2, '0')}:
                  {timeLeft.minutes.toString().padStart(2, '0')}:
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>

          {/* Desktop: Left Scarcity */}
          <div className="hidden lg:flex items-center gap-4">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-3 py-1">
              {dealPricing.isFinalExpired ?
                'Monthly pricing active' :
                dealPricing.isFirstExpired ?
                'Last chance pricing' :
                `Only ${dynamic.licensesRemaining} licenses left`
              }
            </Badge>
            {!dealPricing.isFinalExpired && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <ClockIcon className="w-4 h-4" />
                <span className="font-mono">
                  {dynamic.dayOfWeek} ends in {timeLeft.hours.toString().padStart(2, '0')}:
                  {timeLeft.minutes.toString().padStart(2, '0')}:
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>

          {/* Center: Value Prop */}
          <div className="text-center px-4">
            <p className="text-base font-medium text-slate-200">
              <span><span className="inline-block w-8 h-6 mr-2 text-2xl leading-none align-middle">{dynamic.location.country_flag}</span><span className="text-base font-medium">{dynamic.holidayOffer} for {dynamic.location.country}:</span></span>
              <span className={`font-bold ml-2 text-base ${
                dealPricing.isFinalExpired ? 'text-red-400' :
                dealPricing.isFirstExpired ? 'text-orange-400' :
                'text-green-400'
              }`}>
                {dealPricing.isFinalExpired ?
                  'FINAL CALL - Monthly only!' :
                  dealPricing.isFirstExpired ?
                  'LAST CHANCE - Extra 50% OFF!' :
                  'Use code EXTRA50 for EXTRA 50% OFF!'
                }
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}