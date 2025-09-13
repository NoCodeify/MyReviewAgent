import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SparklesIcon, BoltIcon, CheckCircleIcon, StarIcon, PlayIcon, ClockIcon, UsersIcon, ChatBubbleLeftRightIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import heroImage from "@assets/generated_images/WhatsApp_AI_Agent_Interface_916383d2.png";
import TrustBadges from "@/components/TrustBadges";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";

export default function HeroSection() {
  const dynamic = useDynamicContentContext();

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
              The WhatsApp AI That Generated{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                $5M in 12 Months
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-slate-300 font-light">
                (Without Any Human Help)
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

                    {/* "Case Study" badge overlay */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-500/90 text-white border-0 text-xs px-3 py-1 font-semibold rounded-lg">
                        <StarIcon className="w-3 h-3 mr-1" />
                        Updated: {dynamic.todayDate}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Value Props */}
              <div className="space-y-4">
                {[
                  "100% autonomous - no templates, no human intervention",
                  "Handles full sales cycles in WhatsApp from hello to payment",
                  "Proven system working in 37+ industries right now"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 text-lg text-slate-200">
                    <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                  data-testid="button-get-lifetime-access"
                >
                  Get The $5M System - $497
                </Button>
              </div>


              {/* Trust Badges */}
              <TrustBadges />

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
                      className="w-24 h-24 rounded-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 border-0 shadow-[0_0_20px_0_rgba(34,197,94,0.4),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_0_rgba(34,197,94,0.5),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] relative z-10 transform hover:scale-110 hover:translate-y-[-2px] transition-all duration-200"
                      data-testid="button-play-video-desktop"
                    >
                      <PlayIcon className="w-10 h-10 ml-1" fill="currentColor" />
                    </Button>

                    {/* Video stats overlay */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        <ClockIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">12:34</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        <UsersIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">15.2K views</span>
                      </div>
                    </div>

                    {/* "Case Study" badge overlay */}
                    <div className="absolute top-6 right-6">
                      <Badge className="bg-orange-500/90 text-white border-0 text-sm px-4 py-2 font-semibold rounded-xl">
                        <StarIcon className="w-4 h-4 mr-2" />
                        Watch $5M Case Study
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Social Proof Numbers */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { value: "$5M", label: "in 12 Months" },
                  { value: "847", label: "Deals Closed" },
                  { value: "1,276%", label: "Avg ROI" }
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
                    <StarIcon key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className={`text-sm text-slate-400 min-h-[20px] inline-block transition-opacity duration-500`}>
                  1,247+ businesses • Average ROI: 1,276%<span className={`transition-opacity duration-500 ${
                    dynamic.location ? 'opacity-100' : 'opacity-0'
                  }`}>{dynamic.location ? ` • ${Math.floor(1247 * 0.15)} in ${dynamic.location.country}` : ''}</span>
                </span>
              </div>
              
              
              {/* Success metrics floating cards */}
              <div className="absolute top-20 -left-8 bg-slate-900/90 backdrop-blur-sm border border-slate-700 p-3 rounded-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] z-20">
                <div className="text-green-400 text-sm font-semibold">$487K in Q1</div>
                <div className="text-slate-400 text-xs">Marcus Johnson</div>
              </div>

              <div className="absolute bottom-32 -right-8 bg-slate-900/90 backdrop-blur-sm border border-slate-700 p-3 rounded-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] z-20">
                <div className="text-blue-400 text-sm font-semibold">67 deals closed</div>
                <div className="text-slate-400 text-xs">Sarah Chen - Autonomously</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}