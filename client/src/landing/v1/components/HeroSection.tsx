import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircleIcon, StarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import TrustBadges from "./TrustBadges";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";
import { trackCTAClick } from "@/services/tracking";

export default function HeroSection() {
  const dynamic = useDynamicContentContext();

  const handleGetAccess = () => {
    trackCTAClick("Try AI Review Agent", "hero-cta");
    window.open('https://wa.me/31658015937?text=Hi! I want to try MyReviewAgent.ai', '_blank');
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-500/10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 pt-28 md:pt-24 pb-16 relative z-10">
        <div className="max-w-5xl mx-auto pt-8">
          {/* Header Section */}
          <div className="text-center space-y-8 mb-12">
            {/* Badge */}
            <div className="flex justify-center px-4">
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 text-xs sm:text-sm px-4 py-3 font-semibold rounded-xl text-center leading-relaxed max-w-full">
                <StarIcon className="w-4 h-4 mr-1 inline align-middle" />
                AI Review Collection for Booking Businesses
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_40%)]">
              Get 3x More Reviews{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                On Autopilot
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-slate-300 font-light">
                AI Agent Collects Reviews via WhatsApp & SMS
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              After every booking, our AI automatically sends{" "}
              <span className="text-green-400 font-semibold">personalized WhatsApp or SMS messages</span> to collect reviews.
              Negative feedback goes to a{" "}
              <span className="text-green-400 font-semibold">private form</span>, positive reviews get posted{" "}
              <span className="text-green-400 font-semibold">publicly</span>. Only pay per feedback received.
            </p>

            <p className={`text-sm text-slate-400 min-h-[20px] transition-opacity duration-500 ${
              dynamic.location ? 'opacity-100' : 'opacity-0'
            }`}>
              {dynamic.location ? (
                <>⭐ {dynamic.viewerCount} booking businesses from {dynamic.location.country} using this right now</>
              ) : (
                <span className="invisible">Loading viewer count...</span>
              )}
            </p>
          </div>

          {/* Single Column Content */}
          <div className="space-y-8 max-w-3xl mx-auto">
            {/* Value Props */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-base text-slate-200">
              {[
                "Fully Automated",
                "Negative Reviews Protected",
                "Any Booking Business"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-6">
              <Button
                size="lg"
                onClick={handleGetAccess}
                className="w-full sm:w-auto text-white text-lg px-12 py-6 h-auto font-semibold border-0 transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)]"
                data-testid="button-get-lifetime-access"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 inline" />
                Try AI Review Agent on WhatsApp
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center">
              <TrustBadges />
            </div>

            {/* Social Proof Numbers */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { value: "10K+", label: "Reviews Collected" },
                { value: "4.8★", label: "Avg Rating" },
                { value: "3x", label: "More Reviews" }
              ].map((stat, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4 text-center hover-elevate shadow-[0_0_15px_-4px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
                  <div className="text-2xl md:text-3xl font-bold text-green-400 font-display">{stat.value}</div>
                  <div className="text-xs md:text-sm text-slate-400 mt-1">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className={`text-sm text-slate-400 min-h-[20px] transition-opacity duration-500 text-center sm:text-left`}>
                500+ businesses • 10K+ reviews collected<span className={`transition-opacity duration-500 ${
                  dynamic.location ? 'opacity-100' : 'opacity-0'
                }`}>{dynamic.location ? ` • ${Math.floor(500 * 0.15)} in ${dynamic.location.country}` : ''}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
