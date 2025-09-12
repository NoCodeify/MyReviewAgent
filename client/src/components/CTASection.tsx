import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Clock, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  MessageCircle,
  Zap,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";

export default function CTASection() {
  // TODO: Remove mock functionality - replace with real countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    "Complete WhatsApp AI automation system",
    "Proven $2M+ revenue-generating scripts", 
    "24/7 lead capture and qualification",
    "Automated appointment booking",
    "Advanced conversation analytics",
    "WhatsApp Business API compliance",
    "Custom industry templates",
    "Priority customer support",
    "Free lifetime updates",
    "30-day money-back guarantee"
  ];

  const handleGetAccess = () => {
    console.log('Get lifetime access clicked');
    // TODO: Remove mock functionality - integrate real purchase flow
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
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
            <Badge variant="outline" className="bg-chart-2 text-black border-0 text-base px-4 py-2 font-bold">
              <AlertTriangle className="w-4 h-4 mr-2" />
              LIMITED TIME OFFER
            </Badge>
            
            <h2 className="font-display text-4xl lg:text-5xl font-bold">
              Last Chance to Get
              <span className="block text-chart-1">Lifetime Access</span>
            </h2>
            
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              This one-time lifetime deal ends soon. After that, MyWhatsAgent.ai will only be 
              available as a $297/month subscription.
            </p>
          </div>

          {/* Countdown Timer */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-8 mb-12">
            <div className="text-center space-y-4">
              <h3 className="font-display text-2xl font-bold text-white">Offer Expires In:</h3>
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
          <Card className="bg-white text-foreground p-8 mb-8 relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute -right-8 top-8 bg-chart-2 text-black px-8 py-2 rotate-45 font-bold text-sm">
              MOST POPULAR
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Pricing */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-3xl font-bold">MyWhatsAgent.ai</h3>
                  <p className="text-muted-foreground">Lifetime Access Deal</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-chart-1">$497</span>
                    <span className="text-xl text-muted-foreground line-through">$3,564</span>
                  </div>
                  <div className="text-muted-foreground">
                    One-time payment • No monthly fees
                  </div>
                  <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                    Save $3,067 (86% off)
                  </Badge>
                </div>

                <Button 
                  size="lg" 
                  onClick={handleGetAccess}
                  className="w-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-xl px-8 py-6 h-auto font-semibold border border-green-400/30 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200"
                  data-testid="button-get-lifetime-access-final"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Lifetime Access Now
                </Button>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-chart-1" />
                    <span>30-day guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-chart-1" />
                    <span>Instant access</span>
                  </div>
                </div>
              </div>

              {/* Right: Features */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Everything Included:</h4>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-chart-1 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Social proof */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2 text-primary-foreground/80">
              <Users className="w-5 h-5" />
              <span>247 people purchased in the last 24 hours</span>
            </div>
            
            <div className="flex justify-center items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-chart-2 fill-current" />
              ))}
              <span className="ml-2 text-primary-foreground/80">4.9/5 from 1,247+ customers</span>
            </div>

            <p className="text-primary-foreground/60 text-sm max-w-2xl mx-auto">
              Join thousands of businesses already using MyWhatsAgent.ai to automate their WhatsApp sales. 
              This limited-time lifetime deal won't last forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}