import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircleIcon, StarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";
import { trackCTAClick } from "@/services/tracking";

export default function HeroSection() {
  const dynamic = useDynamicContentContext();

  const handleGetAccess = () => {
    trackCTAClick("Try AI Review Agent", "hero-cta");
    window.open('https://wa.me/31658015937?text=Hi! I want to try MyReviewAgent.ai', '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Vibrant Background with Patterns */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>

        {/* Large color orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/20 to-green-400/20 rounded-full blur-3xl"></div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-32 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="flex justify-center lg:justify-start">
                <Badge className="bg-green-500 text-white border-0 text-xs px-3 py-1.5 font-medium rounded-full shadow-sm">
                  <StarIcon className="w-3.5 h-3.5 mr-1.5 inline align-middle" />
                  AI-Powered Review Collection
                </Badge>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
                  Get 3x More Reviews{" "}
                  <span className="text-green-500">On Autopilot</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  After every booking, our AI automatically collects reviews via WhatsApp & SMS.
                  Negative feedback stays private, positive reviews go public.
                </p>
              </div>

              {/* Value Props */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-slate-700">
                {[
                  "Fully Automated",
                  "Reputation Protected",
                  "Pay Per Feedback"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Button
                  size="lg"
                  onClick={handleGetAccess}
                  className="text-white text-base px-8 py-6 h-auto font-semibold border-0 transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)]"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  Try It Free on WhatsApp
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-sm text-slate-600 pt-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-medium">
                  500+ businesses • 10K+ reviews collected
                </span>
              </div>
            </div>

            {/* Right: Visual Stats & Proof */}
            <div className="space-y-6 lg:pl-8">
              {/* Floating Review Card */}
              <Card className="bg-white border border-slate-200 shadow-xl p-6 rounded-2xl transform hover:scale-105 transition-transform">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    SM
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">Sarah Martinez</span>
                      <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full border-0">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      "We went from 3 reviews per month to 45. The AI handles everything automatically!"
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500">Bella's Hair Salon</span>
                  <span className="text-xs font-medium text-green-500">+127 reviews</span>
                </div>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "10K+", label: "Reviews", color: "green" },
                  { value: "4.8★", label: "Avg Rating", color: "blue" },
                  { value: "45%", label: "Response", color: "green" }
                ].map((stat, index) => (
                  <Card key={index} className="bg-white border border-slate-200 shadow-md p-4 text-center rounded-xl hover:shadow-lg transition-shadow">
                    <div className={`text-2xl md:text-3xl font-bold font-display mb-1 ${
                      stat.color === 'green' ? 'text-green-500' : 'text-blue-600'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-600">{stat.label}</div>
                  </Card>
                ))}
              </div>

              {/* Success Badge */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-0.5">1Nul8 Restaurant</div>
                    <div className="text-sm text-slate-600">Climbed to #1 on TripAdvisor in 60 days</div>
                  </div>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
