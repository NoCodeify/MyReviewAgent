import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SparklesIcon, BoltIcon, CheckCircleIcon, StarIcon, PlayIcon, ClockIcon, UsersIcon, ChatBubbleLeftRightIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import heroImage from "@assets/generated_images/WhatsApp_AI_Agent_Interface_916383d2.png";
import TrustBadges from "./TrustBadges";
import MediaLogos from "./MediaLogos";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";

/**
 * HeroSection for MyReviewAgent.ai
 */
export default function HeroSectionV2() {
  const dynamic = useDynamicContentContext();

  const handleVideoPlay = () => {
    console.log('Video play triggered');
  };

  const handleCTAClick = () => {
    const ctaSection = document.getElementById('final-cta');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-500/10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 pt-28 md:pt-40 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto pt-8">
          {/* Full-width Header Section */}
          <div className="text-center space-y-8 mb-8">
            {/* Lifetime Deal Badge */}
            <div className="flex justify-center px-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs sm:text-sm px-4 py-3 font-semibold hover-elevate animate-pulse rounded-xl text-center leading-relaxed max-w-full">
                <BoltIcon className="w-4 h-4 mr-1 inline align-middle" />
                LIFETIME DEAL - {dynamic.licensesRemaining} LICENSES LEFT
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_40%)]">
              Automate Review Collection{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                via WhatsApp & SMS
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-slate-300 font-light">
                Pay Only Per Feedback
              </span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start py-4 md:py-12">
            {/* Left Content */}
            <div className="space-y-8 lg:space-y-10">
              {/* Subtitle */}
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                  See exactly how one business added{" "}
                  <span className="text-green-400 font-semibold">$5 million in revenue</span> using our
                  autonomous WhatsApp agent that{" "}
                  <span className="text-green-400 font-semibold">thinks, negotiates, and closes deals</span>{" "}
                  24/7 with a{" "}
                  <span className="text-green-400 font-semibold">25.3% closing rate</span>
                </p>
                <p className={`text-sm text-slate-400 mt-3 text-center lg:text-left min-h-[20px] transition-opacity duration-500 ${
                  dynamic.location ? 'opacity-100' : 'opacity-0'
                }`}>
                  {dynamic.location ? (
                    <>🔥 {dynamic.viewerCount} people from {dynamic.location.country} viewing this page right now</>
                  ) : (
                    <span className="invisible">Loading viewer count...</span>
                  )}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4">
                {[
                  "100% autonomous - no templates, no human intervention",
                  "Handles full sales cycles in WhatsApp from hello to payment",
                  "Proven system working in 37+ industries right now"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-lg text-slate-300">
                    <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={handleCTAClick}
                  className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-xl px-10 py-8 h-auto font-bold border-0 shadow-[0_0_20px_0_rgba(34,197,94,0.4),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_0_rgba(34,197,94,0.5),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-2px] transition-all duration-200 rounded-xl whitespace-normal"
                  data-testid="button-hero-cta"
                >
                  Try AI Review Agent on WhatsApp
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4">
                <div className="text-center lg:text-left space-y-2">
                  <p className="text-sm text-slate-400">
                    <span className="text-green-400 font-semibold">✓ 30-Day Guarantee</span>
                    <span className="mx-2">•</span>
                    <span className="text-green-400 font-semibold">✓ SSL Secure</span>
                    <span className="mx-2">•</span>
                    <span className="text-green-400 font-semibold">✓ Stripe</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Video Player */}
            <div className="relative group max-w-2xl mx-auto">
              <Card className="relative overflow-hidden rounded-3xl shadow-[0_0_20px_-6px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.05)] border border-slate-700/50 hover-elevate">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                  {/* Video thumbnail/placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20"></div>

                  {/* Play button */}
                  <Button
                    size="icon"
                    onClick={handleVideoPlay}
                    className="w-20 h-20 rounded-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 border-0 shadow-[0_0_20px_0_rgba(34,197,94,0.4),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_0_rgba(34,197,94,0.5),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] relative z-10 transform hover:scale-110 hover:translate-y-[-2px] transition-all duration-200"
                    data-testid="button-play-video"
                  >
                    <PlayIcon className="w-8 h-8 ml-1" fill="currentColor" />
                  </Button>

                  {/* Video stats overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <ClockIcon className="w-4 h-4" />
                      <span className="text-sm">12:34</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <UsersIcon className="w-4 h-4" />
                      <span className="text-sm">15.2K views</span>
                    </div>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute top-4 left-4 right-4">
                    <p className="text-white font-semibold">Watch $5M Case Study</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Trust/Value Stats - Replaces MediaLogos for better conversion */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">$5M</div>
              <div className="text-sm text-slate-400">in 12 Months</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">847</div>
              <div className="text-sm text-slate-400">Deals Closed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">1,276%</div>
              <div className="text-sm text-slate-400">Avg ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">1,247+</div>
              <div className="text-sm text-slate-400">businesses • Average ROI: 1,276% • 187 in {dynamic.location?.country || 'The Netherlands'}</div>
            </div>
          </div>

          {/* Optional: MediaLogos (can be toggled based on test) */}
          <div className="mt-8">
            <MediaLogos />
          </div>
        </div>
      </div>
    </section>
  );
}