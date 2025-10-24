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

  const benefits = [
    {
      icon: CpuChipIcon,
      title: "Fully Automated Review Collection",
      description: "AI automatically sends personalized WhatsApp/SMS messages after every booking. Zero manual work, zero forgotten customers.",
      highlight: "100% automated"
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Smart Negative Review Protection",
      description: "Unhappy customers (1-3 stars) are directed to a private feedback form. You fix issues before they damage your public reputation.",
      highlight: "Reputation protection"
    },
    {
      icon: ClockIcon,
      title: "Perfect Timing, Every Time",
      description: "Sends messages at the optimal moment after service completion. Next morning for restaurants, 2 hours for salons - you choose.",
      highlight: "Optimized timing"
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "3x More Reviews in 30 Days",
      description: "From 15% review rate to 45% review rate. More positive reviews = higher ratings = more bookings. The growth compounds.",
      highlight: "3x more reviews"
    },
    {
      icon: BoltIcon,
      title: "10-Minute Setup, Instant Results",
      description: "Connect your booking system, customize your message, and you're live. Most businesses collect their first review same-day.",
      highlight: "Same-day results"
    },
    {
      icon: ShieldCheckIcon,
      title: "Pay Only Per Feedback Received",
      description: "No upfront costs, no monthly fees. Only pay when a customer actually leaves feedback. Completely risk-free pricing.",
      highlight: "Pay per feedback"
    }
  ];

  const comparison = [
    {
      feature: "Review Collection",
      traditional: "Manual text messages",
      mywhatsagent: "Automated AI messages",
      improvement: "Zero manual work"
    },
    {
      feature: "Response Rate",
      traditional: "10-15% respond",
      mywhatsagent: "45% respond",
      improvement: "3x more reviews"
    },
    {
      feature: "Negative Reviews",
      traditional: "Go straight to Google",
      mywhatsagent: "Routed to private form",
      improvement: "Reputation protected"
    },
    {
      feature: "Time Investment",
      traditional: "2+ hours daily",
      mywhatsagent: "Fully automated",
      improvement: "Save 60+ hours/month"
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
              The Only Review Collection AI That
              <span className="block text-primary">Actually Gets Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              While others send generic review requests, our AI personalizes every message and
              intelligently routes feedback to protect your reputation and maximize reviews.
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
                Manual Review Requests vs. Automated AI
              </h3>
              <p className="text-muted-foreground">
                See how automation transforms your review collection process
              </p>
            </div>

            {/* Desktop Table View */}
            <Card className="hidden md:block overflow-hidden shadow-[0_0_15px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
              <div className="grid md:grid-cols-4 gap-0">
                <div className="bg-muted/50 p-4 font-semibold text-foreground border-r border-border">
                  Feature
                </div>
                <div className="bg-destructive/10 p-4 font-semibold text-foreground border-r border-border">
                  Manual Requests
                </div>
                <div className="bg-chart-1/10 p-4 font-semibold text-foreground border-r border-border">
                  MyReviewAgent.ai
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
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Manual Requests</div>
                        <div className="text-sm text-muted-foreground bg-destructive/5 px-3 py-2 rounded-lg">
                          {row.traditional}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-medium text-chart-1 uppercase tracking-wider">MyReviewAgent.ai</div>
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
              onClick={() => window.open('https://wa.me/31658015937?text=Hi! I want to try MyReviewAgent.ai', '_blank')}
              className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_0_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
              data-testid="button-try-review-agent"
            >
              Try AI Review Agent Now
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Free trial with first 10 customers • See results in 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}