import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Zap, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/WhatsApp_AI_Agent_Interface_916383d2.png";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Lifetime Deal Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-chart-2 text-black border-0 text-base px-4 py-2 font-bold hover-elevate">
                <Zap className="w-4 h-4 mr-2" />
                LIFETIME DEAL - LIMITED TIME
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Turn Your WhatsApp Into a
                <span className="block text-chart-1">$2M+ Sales Machine</span>
              </h1>
              <p className="text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed">
                The AI agent that's already closed <strong>$2M+ in deals</strong>, booked <strong>100s of appointments</strong> 
                with a proven <strong>25% closing rate</strong>
              </p>
            </div>

            {/* Value Props */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-lg">
                <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                <span>Pay once, use forever - No monthly fees</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                <span>Setup in under 5 minutes</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                <span>Works with your existing WhatsApp</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-chart-1 hover:bg-chart-1/90 text-white text-lg px-8 py-6 h-auto"
                data-testid="button-get-lifetime-access"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Lifetime Access Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8 py-6 h-auto backdrop-blur-sm"
                data-testid="button-watch-demo"
              >
                Watch Demo Below
              </Button>
            </div>

            {/* Social Proof Numbers */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4 text-center hover-elevate">
                <div className="text-3xl font-bold text-chart-1">$2M+</div>
                <div className="text-sm text-primary-foreground/80">Deals Closed</div>
              </Card>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4 text-center hover-elevate">
                <div className="text-3xl font-bold text-chart-1">100s</div>
                <div className="text-sm text-primary-foreground/80">Appointments</div>
              </Card>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4 text-center hover-elevate">
                <div className="text-3xl font-bold text-chart-1">25%</div>
                <div className="text-sm text-primary-foreground/80">Close Rate</div>
              </Card>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="MyWhatsAgent.ai Interface" 
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl border border-white/20"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-chart-1 text-white p-3 rounded-xl shadow-lg animate-pulse">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-chart-2 text-black p-3 rounded-xl shadow-lg animate-pulse">
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}