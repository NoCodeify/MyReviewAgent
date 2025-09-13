import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import marcusAvatar from "@assets/generated_images/Marcus_Johnson_testimonial_avatar_b7a4973f.png";
import sarahAvatar from "@assets/generated_images/Sarah_Chen_testimonial_avatar_3220ea10.png";
import davidAvatar from "@assets/generated_images/David_Rodriguez_testimonial_avatar_8d71a62c.png";

export default function SocialProofSection() {
  // TODO: Remove mock functionality - replace with real testimonials
  const testimonials = [
    {
      name: "Marcus Johnson",
      title: "Sales Director",
      company: "TechFlow Solutions",
      content: "MyWhatsAgent.ai doubled our appointment booking rate in just 3 weeks. The AI conversations feel completely natural.",
      result: "$180K revenue increase",
      avatar: marcusAvatar
    },
    {
      name: "Sarah Chen",
      title: "Founder",
      company: "Digital Marketing Pro",
      content: "I was skeptical about AI sales agents, but this system closed 40% more deals than our human team. Incredible ROI.",
      result: "40% more conversions",
      avatar: sarahAvatar
    },
    {
      name: "David Rodriguez", 
      title: "CEO",
      company: "GrowthHack Inc",
      content: "The lifetime deal was a no-brainer. We've already made back our investment 10x over. Best business decision this year.",
      result: "10x ROI in 2 months",
      avatar: davidAvatar
    }
  ];

  const stats = [
    { icon: DollarSign, value: "$2.1M", label: "Total Revenue Generated", color: "text-chart-1" },
    { icon: Calendar, value: "387", label: "Appointments Booked", color: "text-chart-2" },
    { icon: TrendingUp, value: "25.3%", label: "Average Close Rate", color: "text-chart-1" },
    { icon: Users, value: "1,247", label: "Active Users", color: "text-primary" }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-base px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Real Results
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Join 1,247+ Businesses Already
              <span className="block text-primary">Crushing Their Sales Goals</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. See what real businesses are saying about 
              their results with MyWhatsAgent.ai
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
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial content */}
                  <blockquote className="text-foreground leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Result highlight */}
                  <div className="bg-chart-1/10 text-chart-1 px-3 py-2 rounded-md text-sm font-semibold inline-block">
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

          {/* Trust indicators */}
          <div className="text-center pt-16">
            <div className="flex justify-center items-center gap-8 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}