import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, ArrowTrendingUpIcon, UsersIcon, CurrencyDollarIcon, CalendarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { testimonials } from "@/data/testimonials";

export default function SocialProofSection() {

  const stats = [
    { icon: CurrencyDollarIcon, value: "$50k+", label: "Average Deal Size", color: "text-chart-1" },
    { icon: ArrowTrendingUpIcon, value: "10x", label: "Revenue Increase", color: "text-chart-2" },
    { icon: CalendarIcon, value: "400%", label: "Workload Reduction", color: "text-chart-1" },
    { icon: UsersIcon, value: "3", label: "Channels Unified", color: "text-primary" }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-green-400/10 text-green-500 border-0 text-base px-4 py-2 font-semibold">
              <StarIcon className="w-4 h-4 mr-2 text-green-500" />
              REAL RESULTS
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              1,247+ Businesses Are Already
              <span className="block text-primary">Generating Revenue on Autopilot</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real businesses. Real revenue. Real WhatsApp conversations closing deals 24/7.
              Average ROI: 1,276% in the first 90 days.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover-elevate shadow-[0_0_15px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
                <div className="space-y-3">
                  <div className={`mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover-elevate shadow-[0_0_15px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
                <div className="space-y-4">
                  {/* Star rating */}
                  <div className="flex text-chart-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial content */}
                  <blockquote className="text-foreground leading-relaxed text-sm">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Result highlight */}
                  <div className="bg-gradient-to-r from-chart-1/20 to-chart-2/20 border border-chart-1/30 text-chart-1 px-4 py-2 rounded-lg text-sm font-bold inline-block">
                    {testimonial.result}
                  </div>

                  {/* Author info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Secondary CTA - After Social Proof */}
          <div className="text-center pt-12 pb-4">
            <div className="space-y-3">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 text-white text-lg px-8 py-4 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(147,51,234,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(147,51,234,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                data-testid="button-chat-demo-social"
              >
                <a href="https://wa.me/+447723487983?text=Don't trust testimonials. Let the AI prove itself!" target="_blank" rel="noopener noreferrer" className="text-center">
                  Don't trust us? Let the AI convince you
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">
                Chat with the actual $5M bot (no human involved)
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="text-center pt-16">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full flex-shrink-0 animate-pulse"></div>
                <span className="font-medium">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full flex-shrink-0 animate-pulse"></div>
                <span className="font-medium">Results in first 14 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full flex-shrink-0 animate-pulse"></div>
                <span className="font-medium">WhatsApp compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}