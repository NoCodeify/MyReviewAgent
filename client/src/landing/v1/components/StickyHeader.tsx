import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";

export default function StickyHeader() {
  const dynamic = useDynamicContentContext();

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
      setTimeLeft(calculateTimeToMidnight());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center lg:justify-between py-3">
          {/* Left: Scarcity */}
          <div className="hidden lg:flex items-center gap-4">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-3 py-1 animate-pulse">
              Only {dynamic.licensesRemaining} licenses left
            </Badge>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <ClockIcon className="w-4 h-4" />
              <span className="font-mono">
                {dynamic.dayOfWeek} ends in {timeLeft.hours.toString().padStart(2, '0')}:
                {timeLeft.minutes.toString().padStart(2, '0')}:
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Center: Value Prop */}
          <div className="text-center px-4">
            <p className="text-base font-medium text-slate-200">
              {dynamic.location ? (
                <>
                  <span><span className="inline-block w-8 h-6 mr-2 text-2xl leading-none align-middle">{dynamic.location.country_flag}</span><span className="text-base font-medium">{dynamic.holidayOffer} for {dynamic.location.country}:</span></span>
                  <span className="text-green-400 font-bold ml-2 text-base">Use code EXTRA50 for EXTRA 50% OFF!</span>
                </>
              ) : (
                <>
                  <span className="hidden md:inline">{dynamic.dayOfWeek} Special: </span>
                  <span className="text-green-400 font-bold">{dynamic.timeMessage}</span>
                </>
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}