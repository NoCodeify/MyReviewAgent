import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GiftIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { useDealPricing } from "@/hooks/useDealPricing";

export default function BonusStack() {
  const dealPricing = useDealPricing();
  const isMonthlyPricing = dealPricing.dealStatus === 'final_expired';
  const bonuses = [
    {
      icon: DocumentTextIcon,
      title: "WhatsApp Sales Templates Library",
      description: "847 proven message templates from our $5M campaigns. Copy-paste ready for 37+ industries.",
      value: "$297",
      highlight: true
    },
    {
      icon: AcademicCapIcon,
      title: "Advanced AI Training Videos",
      description: "6 hours of step-by-step tutorials showing exactly how to maximize your closing rate.",
      value: "$197",
      highlight: false
    },
    {
      icon: UserGroupIcon,
      title: "Weekly Group Coaching Calls",
      description: "Live calls every Thursday with our team. Get your questions answered, see what's working.",
      value: "$97/mo",
      highlight: false
    },
    {
      icon: RocketLaunchIcon,
      title: "Zero-Touch Setup Wizard",
      description: "Automated setup configures everything in 5 minutes. No calls, no waiting, just results.",
      value: "$497",
      highlight: true
    },
    {
      icon: DocumentTextIcon,
      title: "Industry-Specific Playbooks",
      description: "Detailed guides for your exact business type. Pricing strategies, objection scripts, closing techniques.",
      value: "$197",
      highlight: false
    },
    {
      icon: UserGroupIcon,
      title: "Private Mastermind Community",
      description: "Connect with 1,247+ businesses using the system. Share wins, get advice, see live results.",
      value: "$47/mo",
      highlight: false
    }
  ];

  const totalValue = 1332; // Sum of all bonus values

  // Don't show bonuses for monthly pricing
  if (isMonthlyPricing) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-base px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-orange-500/30">
              <GiftIcon className="w-4 h-4 mr-2" />
              LIMITED TIME BONUSES
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Plus You'll Also Get
              <span className="block text-primary">$3,500+ in Bonuses FREE</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to hit the ground running and see results in your first 24 hours
            </p>
          </div>

          {/* Bonuses Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {bonuses.map((bonus, index) => (
              <Card
                key={index}
                className={`p-6 relative overflow-hidden hover-elevate transition-all duration-300 ${
                  bonus.highlight ? 'ring-2 ring-chart-1 shadow-[0_0_20px_-6px_rgba(34,197,94,0.3)]' : ''
                }`}
              >
                {bonus.highlight && (
                  <div className="absolute -right-7 top-2 bg-gradient-to-r from-chart-1 to-chart-2 text-white text-xs font-bold px-8 py-1 rotate-45">
                    HOT
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <bonus.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg text-foreground">
                        {bonus.title}
                      </h3>
                      <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-bold">
                        {bonus.value}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {bonus.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Value Summary */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-chart-1/5 border-primary/20">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <p className="text-muted-foreground">Total Value of Everything You Get:</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold text-muted-foreground/50 line-through">$4,861</span>
                  <span className="text-5xl font-bold text-chart-1">FREE</span>
                </div>
                <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-sm sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2 font-bold whitespace-normal sm:whitespace-nowrap">
                  All Bonuses Included with Every Plan
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Instant access to everything",
                    "No hidden fees ever",
                    "Lifetime updates included"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircleIcon className="w-4 h-4 text-chart-1" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_0_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                  onClick={() => {
                    const ctaSection = document.getElementById('final-cta');
                    ctaSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Lock In Your Bonuses Now
                </Button>

                <p className="text-xs text-muted-foreground">
                  {isMonthlyPricing ?
                    '* Bonuses included with Professional and Agency monthly plans.' :
                    '* Bonuses only available with lifetime deal. Not included with monthly plans.'
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}