import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Zap, 
  Clock, 
  TrendingUp, 
  Users, 
  Shield,
  Smartphone,
  Brain,
  Target
} from "lucide-react";

export default function BenefitsSection() {
  // TODO: Remove mock functionality - customize features based on real product capabilities
  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Conversations",
      description: "Advanced natural language processing creates human-like conversations that convert prospects into customers automatically.",
      highlight: "98% human-like responses"
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Connect your existing WhatsApp number and start converting leads in under 5 minutes. No technical knowledge required.",
      highlight: "5-minute setup"
    },
    {
      icon: Clock,
      title: "24/7 Lead Capture",
      description: "Never miss a lead again. Your AI agent works around the clock, qualifying prospects and booking appointments while you sleep.",
      highlight: "Works while you sleep"
    },
    {
      icon: Target,
      title: "Smart Lead Qualification",
      description: "Automatically identifies hot prospects using advanced scoring algorithms and prioritizes high-value conversations.",
      highlight: "3x better qualification"
    },
    {
      icon: TrendingUp,
      title: "Proven Sales Scripts",
      description: "Built-in templates from $2M+ in successful campaigns. Customizable scripts that adapt to your business and industry.",
      highlight: "Battle-tested scripts"
    },
    {
      icon: Shield,
      title: "WhatsApp Compliant",
      description: "Fully compliant with WhatsApp Business policies. Built-in safety features prevent account restrictions and bans.",
      highlight: "100% compliant"
    }
  ];

  const comparison = [
    {
      feature: "Response Time",
      traditional: "Hours or days",
      mywhatsagent: "Instant (24/7)",
      improvement: "10x faster"
    },
    {
      feature: "Lead Qualification",
      traditional: "Manual screening",
      mywhatsagent: "AI-powered scoring",
      improvement: "3x more accurate"
    },
    {
      feature: "Appointment Booking",
      traditional: "Back-and-forth emails",
      mywhatsagent: "Automated scheduling",
      improvement: "80% less friction"
    },
    {
      feature: "Follow-up Consistency",
      traditional: "Hit or miss",
      mywhatsagent: "Perfect execution",
      improvement: "100% consistent"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-base px-4 py-2">
              <Smartphone className="w-4 h-4 mr-2" />
              Why It Works
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              The Complete WhatsApp
              <span className="block text-primary">Sales Automation System</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to transform your WhatsApp into a revenue-generating machine 
              that works 24/7 without human intervention
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover-elevate">
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
              <h3 className="text-3xl font-bold text-foreground">
                Traditional Sales vs. MyWhatsAgent.ai
              </h3>
              <p className="text-muted-foreground">
                See the dramatic difference in performance and efficiency
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-4 gap-0">
                <div className="bg-muted/50 p-4 font-semibold text-foreground border-r border-border">
                  Feature
                </div>
                <div className="bg-destructive/10 p-4 font-semibold text-foreground border-r border-border">
                  Traditional Sales
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
          </div>

          {/* CTA */}
          <div className="text-center pt-16">
            <Button 
              size="lg" 
              className="bg-chart-1 hover:bg-chart-1/90 text-white text-lg px-8 py-6 h-auto"
              data-testid="button-get-system-now"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get The Complete System Now
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Lifetime access • No monthly fees • 30-day guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}