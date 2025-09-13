import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SparklesIcon,
  BoltIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";

export default function BenefitsSection() {
  // TODO: Remove mock functionality - customize features based on real product capabilities
  const benefits = [
    {
      icon: CpuChipIcon,
      title: "Fully Autonomous AI Agent",
      description: "Not templates or decision trees. Real AI that thinks, negotiates, handles objections, and closes deals without any human help.",
      highlight: "100% autonomous closing"
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "WhatsApp-Native Intelligence",
      description: "Built for REAL WhatsApp Business - not the limited API. Full features: voice notes, images, documents, groups, and unlimited conversations.",
      highlight: "WhatsApp optimized"
    },
    {
      icon: ClockIcon,
      title: "24/7 Deal Closing Machine",
      description: "Proven to close $5M in deals. Works every hour of every day, never misses a lead, never forgets to follow up.",
      highlight: "$5M proven system"
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "25.3% Closing Rate",
      description: "Outperforms human sales teams. Remembers every detail, perfect pitch every time, handles unlimited conversations simultaneously.",
      highlight: "Beats human reps"
    },
    {
      icon: BoltIcon,
      title: "30-Minute Setup, Same-Day ROI",
      description: "Connect WhatsApp, add your products, set your parameters. Most users see their first closed deal within 24 hours.",
      highlight: "ROI in 24 hours"
    },
    {
      icon: ShieldCheckIcon,
      title: "100% WhatsApp Compliant",
      description: "3+ years, zero bans. Works with standard WhatsApp Business - no API restrictions or limitations. Full messaging freedom.",
      highlight: "Never gets banned"
    }
  ];

  const comparison = [
    {
      feature: "Conversation Type",
      traditional: "Pre-written templates",
      mywhatsagent: "Dynamic AI responses",
      improvement: "Real thinking"
    },
    {
      feature: "Objection Handling",
      traditional: "Can't handle",
      mywhatsagent: "Handles like a pro",
      improvement: "100% coverage"
    },
    {
      feature: "Deal Closing",
      traditional: "Just collects info",
      mywhatsagent: "Closes autonomously",
      improvement: "25.3% close rate"
    },
    {
      feature: "Context Memory",
      traditional: "Resets each chat",
      mywhatsagent: "Remembers everything",
      improvement: "Infinite memory"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-green-400/10 text-green-500 border-0 text-base px-4 py-2 font-semibold">
              <DevicePhoneMobileIcon className="w-4 h-4 mr-2 text-green-500" />
              WHY IT WORKS
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              The Only WhatsApp AI That
              <span className="block text-primary">Actually Closes Deals</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              While others send pre-written templates, our AI thinks, negotiates, and closes
              deals autonomously. The same system that generated $5M in 12 months.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover-elevate shadow-[0_0_15px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs bg-chart-1/10 text-chart-1 border-chart-1/20">
                      {benefit.highlight}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Before vs After Comparison */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="font-display text-3xl font-bold text-foreground">
                Basic Chatbots vs. Our Autonomous AI
              </h3>
              <p className="text-muted-foreground">
                See why template-based bots can't compete with real AI thinking
              </p>
            </div>

            {/* Desktop Table View */}
            <Card className="hidden md:block overflow-hidden shadow-[0_0_15px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
              <div className="grid md:grid-cols-4 gap-0">
                <div className="bg-muted/50 p-4 font-semibold text-foreground border-r border-border">
                  Feature
                </div>
                <div className="bg-destructive/10 p-4 font-semibold text-foreground border-r border-border">
                  Basic Chatbots
                </div>
                <div className="bg-chart-1/10 p-4 font-semibold text-foreground border-r border-border">
                  MyWhatsAgent.ai
                </div>
                <div className="bg-primary/10 p-4 font-semibold text-foreground">
                  Improvement
                </div>
              </div>

              {comparison.map((row, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-0 border-t border-border">
                  <div className="p-4 font-medium text-foreground border-r border-border">
                    {row.feature}
                  </div>
                  <div className="p-4 text-muted-foreground border-r border-border">
                    {row.traditional}
                  </div>
                  <div className="p-4 text-foreground border-r border-border">
                    {row.mywhatsagent}
                  </div>
                  <div className="p-4 font-semibold text-chart-1">
                    {row.improvement}
                  </div>
                </div>
              ))}
            </Card>

            {/* Mobile Card View */}
            <div className="grid gap-4 md:hidden">
              {comparison.map((row, index) => (
                <Card key={index} className="p-5 shadow-[0_0_15px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
                  <div className="space-y-4">
                    {/* Feature Title */}
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg text-foreground">{row.feature}</h4>
                      <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                        {row.improvement}
                      </Badge>
                    </div>

                    {/* Comparison */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Basic Chatbots</div>
                        <div className="text-sm text-muted-foreground bg-destructive/5 px-3 py-2 rounded-lg">
                          {row.traditional}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-medium text-chart-1 uppercase tracking-wider">MyWhatsAgent.ai</div>
                        <div className="text-sm font-medium text-foreground bg-chart-1/5 px-3 py-2 rounded-lg">
                          {row.mywhatsagent}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-16">
            <Button
              size="lg"
              className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_0_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
              data-testid="button-get-system-now"
            >
              Get The $5M System Now
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              One-time $497 • Save $3,564/year • See results in 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}