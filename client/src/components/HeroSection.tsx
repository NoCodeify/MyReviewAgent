import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Zap, TrendingUp, CheckCircle, Star, Play, Clock, Users } from "lucide-react";
import heroImage from "@assets/generated_images/WhatsApp_AI_Agent_Interface_916383d2.png";

export default function HeroSection() {
  const handleVideoPlay = () => {
    console.log('Video play triggered');
    // TODO: Remove mock functionality - integrate real video player
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-500/10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Centered Header */}
          <div className="text-center space-y-8 mb-16">
            {/* Lifetime Deal Badge */}
            <div className="flex justify-center">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-sm px-4 py-2 font-semibold hover-elevate animate-pulse rounded-xl">
                <Zap className="w-4 h-4 mr-2" />
                🔥 LIFETIME DEAL - LIMITED TIME
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight drop-shadow-lg">
                Turn Your WhatsApp Into a{" "}
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  $2M+ Sales Machine
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                The AI agent that's already closed{" "}
                <span className="text-green-400 font-semibold">$2M+ in deals</span>, booked{" "}
                <span className="text-green-400 font-semibold">100s of appointments</span>{" "}
                with a proven{" "}
                <span className="text-green-400 font-semibold">25% closing rate</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 lg:space-y-10">

              {/* Video Player - Mobile only */}
              <div className="relative group max-w-2xl mx-auto lg:hidden">
                <Card className="relative overflow-hidden rounded-3xl shadow-[0_0_20px_-6px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.05)] border border-slate-700/50 hover-elevate">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                    {/* Video thumbnail/placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20"></div>
                    
                    {/* Play button */}
                    <Button
                      size="icon"
                      onClick={handleVideoPlay}
                      className="w-20 h-20 rounded-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 border border-green-400/30 shadow-[0_6px_20px_0_rgba(34,197,94,0.4),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_0_rgba(34,197,94,0.5),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] relative z-10 transform hover:scale-110 hover:translate-y-[-2px] transition-all duration-200"
                      data-testid="button-play-video"
                    >
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </Button>

                    {/* Video stats overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white">
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">12:34</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">15.2K views</span>
                      </div>
                    </div>

                    {/* "Case Study" badge overlay */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-500/90 text-white border-0 text-xs px-3 py-1 font-semibold rounded-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Case Study
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Value Props */}
              <div className="space-y-4">
                {[
                  "Pay once, use forever - No monthly fees",
                  "Setup in under 5 minutes",
                  "Works with your existing WhatsApp"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-lg text-slate-200">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border border-green-400/30 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl"
                  data-testid="button-get-lifetime-access"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Lifetime Access Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-500/50 text-white hover:from-slate-600 hover:via-slate-700 hover:to-slate-800 text-lg px-8 py-6 h-auto font-medium backdrop-blur-sm shadow-[0_3px_10px_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl"
                  data-testid="button-watch-demo"
                >
                  Watch Demo Below ↓
                </Button>
              </div>

              {/* Social Proof Numbers */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { value: "$2M+", label: "Deals Closed" },
                  { value: "100s", label: "Appointments" },
                  { value: "25%", label: "Close Rate" }
                ].map((stat, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4 text-center hover-elevate shadow-[0_0_15px_-4px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
                    <div className="text-2xl md:text-3xl font-bold text-green-400 font-display">{stat.value}</div>
                    <div className="text-xs md:text-sm text-slate-400 mt-1">{stat.label}</div>
                  </Card>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-slate-400">Trusted by 1,247+ businesses</span>
              </div>
            </div>

            {/* Right Content - Video Player (Desktop) */}
            <div className="relative lg:mt-0 mt-12 hidden lg:block">
              <div className="relative z-10">
                <Card className="relative overflow-hidden rounded-3xl shadow-[0_0_20px_-6px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.05)] border border-slate-700/50 hover-elevate">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                    {/* Video thumbnail/placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20"></div>
                    
                    {/* Play button */}
                    <Button
                      size="icon"
                      onClick={handleVideoPlay}
                      className="w-24 h-24 rounded-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 border border-green-400/30 shadow-[0_6px_20px_0_rgba(34,197,94,0.4),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_0_rgba(34,197,94,0.5),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] relative z-10 transform hover:scale-110 hover:translate-y-[-2px] transition-all duration-200"
                      data-testid="button-play-video-desktop"
                    >
                      <Play className="w-10 h-10 ml-1" fill="currentColor" />
                    </Button>

                    {/* Video stats overlay */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Clock className="w-5 h-5" />
                        <span className="text-sm font-medium">12:34</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Users className="w-5 h-5" />
                        <span className="text-sm font-medium">15.2K views</span>
                      </div>
                    </div>

                    {/* "Case Study" badge overlay */}
                    <div className="absolute top-6 right-6">
                      <Badge className="bg-orange-500/90 text-white border-0 text-sm px-4 py-2 font-semibold rounded-xl">
                        <Star className="w-4 h-4 mr-2" />
                        Case Study Video
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-2xl shadow-green-500/25 animate-bounce z-20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-2xl shadow-blue-500/25 animate-pulse z-20">
                <MessageCircle className="w-6 h-6" />
              </div>
              
              {/* Success metrics floating cards */}
              <div className="absolute top-20 -left-8 bg-slate-900/90 backdrop-blur-sm border border-slate-700 p-3 rounded-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] z-20">
                <div className="text-green-400 text-sm font-semibold">+$50K this month</div>
                <div className="text-slate-400 text-xs">Revenue generated</div>
              </div>
              
              <div className="absolute bottom-32 -right-8 bg-slate-900/90 backdrop-blur-sm border border-slate-700 p-3 rounded-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] z-20">
                <div className="text-blue-400 text-sm font-semibold">42 appointments</div>
                <div className="text-slate-400 text-xs">Booked this week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}