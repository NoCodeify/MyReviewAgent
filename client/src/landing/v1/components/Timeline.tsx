import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RocketLaunchIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function Timeline() {
  const steps = [
    {
      time: "0 min",
      title: "Click Get Access",
      description: "Secure checkout via Stripe",
      icon: RocketLaunchIcon,
      highlight: false
    },
    {
      time: "1 min",
      title: "Instant Access Email",
      description: "Login credentials + quick start guide",
      icon: CheckCircleIcon,
      highlight: false
    },
    {
      time: "2 min",
      title: "Connect WhatsApp",
      description: "One-click WhatsApp Business API connection",
      icon: ChatBubbleBottomCenterTextIcon,
      highlight: false
    },
    {
      time: "3 min",
      title: "AI Training",
      description: "Upload your product info, pricing, FAQs",
      icon: SparklesIcon,
      highlight: false
    },
    {
      time: "5 min",
      title: "First Sale",
      description: "Your AI agent closes its first deal",
      icon: CurrencyDollarIcon,
      highlight: true
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-chart-1/10 text-chart-1 border-0 text-base px-4 py-2 font-semibold">
              <ClockIcon className="w-4 h-4 mr-2" />
              WHAT HAPPENS NEXT
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              From Purchase to First Sale
              <span className="block text-3xl lg:text-4xl mt-2 text-primary">
                In Just 5 Minutes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No developers. No complex setup. No waiting weeks for implementation.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-chart-1 via-chart-2 to-chart-1 hidden lg:block"></div>

            {/* Steps */}
            <div className="space-y-8 lg:space-y-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-6 ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <Card
                    className={`flex-1 p-6 ${
                      step.highlight
                        ? 'bg-gradient-to-br from-chart-1/10 to-chart-2/10 border-chart-1/30 ring-2 ring-chart-1/20'
                        : 'hover-elevate'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.highlight
                            ? 'bg-gradient-to-r from-chart-1 to-chart-2 text-white'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {step.time}
                          </Badge>
                          {step.highlight && (
                            <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-xs">
                              MONEY TIME
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Center Dot */}
                  <div className="hidden lg:flex items-center justify-center">
                    <div
                      className={`w-6 h-6 rounded-full border-4 bg-background ${
                        step.highlight
                          ? 'border-chart-1 ring-4 ring-chart-1/20'
                          : 'border-primary'
                      }`}
                    ></div>
                  </div>

                  {/* Empty Space for Alternating Layout */}
                  <div className="hidden lg:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Comparison */}
          <Card className="mt-12 p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Compare This to Traditional Solutions
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="space-y-2">
                  <div className="text-xl font-bold text-destructive">2-4 Weeks</div>
                  <div className="text-sm text-muted-foreground">Hiring & training a VA</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xl font-bold text-destructive">$5,000+</div>
                  <div className="text-sm text-muted-foreground">Custom chatbot development</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xl font-bold text-destructive">30+ Hours</div>
                  <div className="text-sm text-muted-foreground">ManyChat flow building</div>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
              onClick={() => {
                const ctaSection = document.getElementById('final-cta');
                ctaSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Your 5-Minute Setup
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Average time to first sale: 3 hours 47 minutes
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}