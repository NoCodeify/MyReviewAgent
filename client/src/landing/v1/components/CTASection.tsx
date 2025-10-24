import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FireIcon,
  BoltIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";
import { trackCTAClick, trackConversion } from "@/services/tracking";
import { useDealPricing, useFormattedPrice, useDealTimer } from "@/hooks/useDealPricing";
import { getCookie } from "@/services/dealManagement";

export default function CTASection() {
  const dynamic = useDynamicContentContext();
  const dealPricing = useDealPricing();
  const dealTimer = useDealTimer();
  const starterPricing = useFormattedPrice('STARTER');
  const professionalPricing = useFormattedPrice('PROFESSIONAL');
  const agencyPricing = useFormattedPrice('AGENCY');

  const isMonthlyPricing = dealPricing.dealStatus === 'final_expired';

  // Calculate remaining time from first_visit timestamp
  const calculateRemainingTime = () => {
    const firstVisit = getCookie('whatsagent_first_visit');
    if (!firstVisit) return { days: 1, hours: 0, minutes: 0, seconds: 0 };

    const elapsed = Date.now() - parseInt(firstVisit);
    let targetMs;

    if (dealPricing.dealStatus === 'regular') {
      targetMs = 24 * 60 * 60 * 1000; // 24 hours total
    } else if (dealPricing.dealStatus === 'first_expired') {
      targetMs = 48 * 60 * 60 * 1000; // 48 hours total
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Already final expired
    }

    const remaining = targetMs - elapsed;

    // If time has passed, return 0
    if (remaining <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate time components
    const totalHours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    // Show as "days" for visual impact
    const days = totalHours >= 24 ? 1 : 0;
    const displayHours = totalHours % 24;

    return { days, hours: displayHours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateRemainingTime();
      setTimeLeft(newTimeLeft);

      // Check if timer expired (use total seconds threshold instead of exact equality)
      const totalSeconds = newTimeLeft.days * 86400 + newTimeLeft.hours * 3600 + newTimeLeft.minutes * 60 + newTimeLeft.seconds;
      if (totalSeconds <= 0) {
        // Trigger deal expiration based on current status
        if (dealPricing.dealStatus === 'regular') {
          console.log('🚨 CTA Timer expired - triggering first deal expiration');
          dealTimer.onFirstTimerComplete();
        } else if (dealPricing.dealStatus === 'first_expired') {
          console.log('🚨 CTA Timer expired - triggering final deal expiration');
          dealTimer.onFinalTimerComplete();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dealPricing.dealStatus, dealTimer]);

  const handleGetAccess = (tierName: string, price: string) => {
    console.log(`Get ${tierName} access clicked`);
    // Track CTA click
    trackCTAClick(`Get ${tierName} Access`, "final-cta");
    // Track as a purchase intent conversion (extract numeric price)
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
    trackConversion("purchase_intent", numericPrice);
    // TODO: Remove mock functionality - integrate real purchase flow
  };

  const pricingTiers = [
    {
      name: "Starter",
      price: starterPricing.currentPrice,
      formattedPrice: starterPricing.formattedPrice,
      icon: FireIcon,
      description: "Perfect for small businesses",
      features: [
        "500 credits included",
        "20k char AI instructions",
        "20 AI responses per chat",
        "Voice note understanding",
        "BYOK: Use your own API key"
      ],
      buttonText: "Get Starter",
      highlighted: false
    },
    {
      name: "Professional",
      price: professionalPricing.currentPrice,
      formattedPrice: professionalPricing.formattedPrice,
      icon: BoltIcon,
      description: "For growing businesses",
      popular: true,
      features: [
        "2,000 credits included",
        "100k char AI instructions",
        "Unlimited AI responses",
        "All media understanding",
        "Web search & follow-ups",
        "API, webhooks & functions",
        "3 WhatsApp Business Accounts",
        "BYOK: Use your own API key"
      ],
      buttonText: "Get Professional",
      highlighted: true
    },
    {
      name: "Agency",
      price: agencyPricing.currentPrice,
      formattedPrice: agencyPricing.formattedPrice,
      icon: BuildingOfficeIcon,
      description: "Build your own AI agency",
      features: [
        "10,000 credits included",
        "Everything in Professional",
        "Unlimited sub-accounts",
        "Full white-label",
        "Personalized onboarding",
        "Priority support",
        "Early access to features",
        "Roadmap priority",
        "BYOK: Use for your clients too"
      ],
      buttonText: "Get Agency",
      highlighted: false
    }
  ];

  return (
    <section id="final-cta" className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-500/10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Urgency Header */}
          <div className="text-center space-y-6 mb-12">
            <Badge variant="outline" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 text-xs sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 font-bold animate-pulse shadow-[0_0_20px_-5px_rgba(251,191,36,0.7)] ring-1 ring-yellow-400/50">
              <ExclamationTriangleIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1.5 sm:mr-2" />
              {isMonthlyPricing ?
                `${dynamic.dayOfWeek.toUpperCase()} - MONTHLY PRICING ACTIVE` :
                dealPricing.isFirstExpired ?
                `${dynamic.dayOfWeek.toUpperCase()} - LAST CHANCE PRICING` :
                `${dynamic.dayOfWeek.toUpperCase()} ONLY - ${dynamic.licensesRemaining} LICENSES LEFT`
              }
            </Badge>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Get The Same AI That Generated
              <span className="block text-chart-1 drop-shadow-[0_0_4px_rgba(34,197,94,0.3)]">$5M in 12 Months</span>
            </h2>

            <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto">
              {isMonthlyPricing ?
                'Lifetime deals are no longer available. Get monthly access starting at just $197/month.' :
                dealPricing.isFirstExpired ?
                'This is your absolute last chance to get lifetime access. Next step is monthly pricing at $297/month.' :
                `After these ${dynamic.licensesRemaining} licenses, we're closing to new members and switching to $297/month. Lock in lifetime access starting at just $497.`
              }
            </p>
          </div>

          {/* Countdown Timer - Only show if not monthly pricing */}
          {!isMonthlyPricing && (
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4 sm:p-8 mb-12 shadow-[0_0_30px_-8px_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1)] rounded-2xl ring-1 ring-white/10">
              <div className="text-center space-y-4">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">{dynamic.dayOfWeek} Deal Expires In:</h3>
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-white text-primary text-xl sm:text-3xl font-bold p-2 sm:p-4 rounded-lg flex items-center justify-center min-h-[50px] sm:min-h-[80px] shadow-[0_0_15px_-5px_rgba(255,255,255,0.6)] ring-1 ring-white/20">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2 capitalize">
                        {unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* 3-Tier Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-16 mb-12">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`bg-white text-foreground p-6 relative overflow-hidden shadow-[0_0_20px_-8px_rgba(255,255,255,0.1)] border border-gray-200/20 ${
                  tier.highlighted
                    ? 'ring-2 ring-chart-1 shadow-[0_0_40px_-10px_rgba(34,197,94,0.6)] scale-105 border-green-500/30'
                    : 'hover:shadow-[0_0_25px_-8px_rgba(255,255,255,0.15)] hover:border-gray-200/30 transition-all duration-300'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -right-8 top-8 bg-chart-2 text-black px-8 py-2 rotate-45 font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-6">
                  {/* Icon & Name */}
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <tier.icon className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-chart-1">{tier.price}</span>
                      <span className="text-muted-foreground">
                        {isMonthlyPricing ? '/month' : 'lifetime'}
                      </span>
                    </div>
                    {!isMonthlyPricing && (
                      <Badge variant="outline" className="bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-600 dark:text-green-400 border-green-500/30">
                        Pay once, use forever
                      </Badge>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 min-h-[200px]">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-chart-1 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    size="lg"
                    onClick={() => handleGetAccess(tier.name, tier.price)}
                    className="w-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.6),0_0_20px_-5px_rgba(34,197,94,0.4)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.7),0_0_25px_-5px_rgba(34,197,94,0.5)] ring-1 ring-green-400/20 hover:ring-green-400/40 transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl"
                  >
                    {tier.buttonText}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom info */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1 shadow-[0_0_10px_-3px_rgba(34,197,94,0.4)]">
                ✓ Results in 24 hours
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1 shadow-[0_0_10px_-3px_rgba(34,197,94,0.4)]">
                ✓ 30-day guarantee
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 py-1 shadow-[0_0_10px_-3px_rgba(234,179,8,0.4)]">
                {isMonthlyPricing ?
                  '⚠️ Monthly subscription - cancel anytime' :
                  '⚠️ No upgrades on lifetime deals'
                }
              </Badge>
            </div>

            <div className="text-center text-gray-300">
              <span className="font-semibold">
                <UsersIcon className="w-4 h-4 inline mr-1" />
                {dynamic.viewerCount} people {dynamic.location && `from ${dynamic.location.country}`} viewing this page right now
              </span>
            </div>

            <p className="text-gray-200 text-base max-w-2xl mx-auto font-medium">
              🔒 Secure checkout • SSL encrypted • Instant access after payment
            </p>

            {/* Secondary CTA - Demo */}
            <div className="pt-4">
              <Button
                size="lg"
                asChild
                className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-base px-6 py-3 h-auto font-semibold border border-white/30 shadow-[0_4px_12px_0_rgba(255,255,255,0.15),0_0_15px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_16px_0_rgba(255,255,255,0.2),0_0_20px_-5px_rgba(255,255,255,0.15)] ring-1 ring-white/10 hover:ring-white/20 transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl"
              >
                <a href="https://wa.me/31658015937?text=Hi! I want to try MyReviewAgent.ai" target="_blank" rel="noopener noreferrer">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  Have questions? Chat with us on WhatsApp
                </a>
              </Button>
              <p className="text-sm text-gray-400 mt-2">
                See the AI review agent in action
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}