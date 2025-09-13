import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  BoltIcon,
  StarIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";

export default function CTASection() {
  const dynamic = useDynamicContentContext();

  // Calculate time until midnight (resets daily)
  const calculateTimeToMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Show as "days" for visual impact
    const days = hours > 24 ? 1 : 0;
    const displayHours = hours % 24;

    return { days, hours: displayHours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeToMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeToMidnight());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    "The exact $5M WhatsApp AI system",
    "Fully autonomous deal closing (no human needed)",
    "Handles objections and negotiations",
    "Books appointments to your calendar",
    "Works in 52 languages, 60+ countries",
    "Full WhatsApp Business integration (no API restrictions)",
    "37+ industry templates included",
    "Weekly group coaching calls",
    "All future updates forever",
    "30-day results guarantee"
  ];

  const handleGetAccess = () => {
    console.log('Get lifetime access clicked');
    // TODO: Remove mock functionality - integrate real purchase flow
  };

  return (
    <section id="final-cta" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Urgency Header */}
          <div className="text-center space-y-6 mb-12">
            <Badge variant="outline" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 text-base px-4 py-2 font-bold animate-pulse">
              <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
              {dynamic.dayOfWeek.toUpperCase()} ONLY - {dynamic.licensesRemaining} LICENSES LEFT
            </Badge>
            
            <h2 className="font-display text-4xl lg:text-5xl font-bold">
              Get The Same AI That Generated
              <span className="block text-chart-1">$5M in 12 Months</span>
            </h2>
            
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              After these 47 licenses, we're closing to new members and switching to
              $297/month. Lock in lifetime access now for just $497.
            </p>
          </div>

          {/* Countdown Timer */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-8 mb-12 shadow-[0_0_20px_-6px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
            <div className="text-center space-y-4">
              <h3 className="font-display text-2xl font-bold text-white">{dynamic.dayOfWeek} Deal Expires In:</h3>
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-white text-primary text-3xl font-bold p-4 rounded-lg">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-primary-foreground/80 mt-2 capitalize">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Pricing Card */}
          <Card className="bg-white text-foreground p-8 mb-8 relative overflow-hidden shadow-[0_0_20px_-6px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
            {/* Popular badge */}
            <div className="absolute -right-8 top-8 bg-chart-2 text-black px-8 py-2 rotate-45 font-bold text-sm">
              MOST POPULAR
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Pricing */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-3xl font-bold">MyWhatsAgent.ai</h3>
                  <p className="text-muted-foreground">The $5M WhatsApp System</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-chart-1">$497</span>
                    <span className="text-xl text-muted-foreground line-through">$3,564</span>
                  </div>
                  <div className="text-muted-foreground">
                    One-time payment • Use forever
                  </div>
                  <Badge variant="outline" className="bg-gradient-to-r from-chart-1/20 to-chart-2/20 text-chart-1 border-chart-1/30 font-bold">
                    Save $3,564/year vs monthly
                  </Badge>
                </div>

                <Button
                  size="lg"
                  onClick={handleGetAccess}
                  className="w-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_0_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                  data-testid="button-get-lifetime-access-final"
                >
                  Yes! Give Me The $5M System
                </Button>

                {/* Secondary CTA - Final Chance */}
                <div className="space-y-2 pt-4">
                  <Button
                    size="lg"
                    asChild
                    className="w-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white text-base px-6 py-3 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(59,130,246,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(59,130,246,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                    data-testid="button-chat-demo-final"
                  >
                    <a href="https://wa.me/+447723487983?text=Still skeptical. Let the AI convince me!" target="_blank" rel="noopener noreferrer" className="text-center">
                      Still skeptical? Let it pitch YOU on WhatsApp
                    </a>
                  </Button>
                  <p className="text-sm text-slate-600 text-center font-medium">
                    Fair warning: 25.3% closing rate applies to you too 😏
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      ✓ Results in 24 hours
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      ✓ 30-day guarantee
                    </Badge>
                  </div>
                  <p className="text-xs text-center text-muted-foreground/70">
                    If you don't see real appointments booked within 30 days, get 100% of your money back
                  </p>
                </div>
              </div>

              {/* Right: Features */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Everything Included:</h4>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-chart-1 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Social proof */}
          <div className="text-center space-y-4">
            <div className="text-center text-primary-foreground/80">
              <span className="font-semibold">
                <UsersIcon className="w-4 h-4 inline mr-1" />
                {dynamic.viewerCount} people {dynamic.location && `from ${dynamic.location.country}`} viewing this page right now
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-chart-2 fill-current" />
                ))}
              </div>
              <span className="sm:ml-2 text-primary-foreground/80">4.9/5 from 1,247+ customers</span>
            </div>

            <p className="text-primary-foreground/80 text-base max-w-2xl mx-auto font-medium">
              🔒 Secure checkout • SSL encrypted • Instant access after payment
            </p>
            <p className="text-primary-foreground/60 text-sm max-w-xl mx-auto mt-2">
              Questions? Chat with the AI or watch the 12-minute case study above
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}