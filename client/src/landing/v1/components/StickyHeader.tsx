import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTryNow = () => {
    window.open('https://wa.me/31658015937?text=Hi! I want to try MyReviewAgent.ai', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-lg animate-in slide-in-from-top duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-lg">MyReviewAgent.ai</span>
            <span className="hidden sm:inline text-sm text-gray-400">
              Get 3x More Reviews On Autopilot
            </span>
          </div>

          {/* CTA Button */}
          <Button
            size="sm"
            onClick={handleTryNow}
            className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-semibold border-0 shadow-[0_2px_8px_0_rgba(34,197,94,0.4)] hover:shadow-[0_4px_12px_0_rgba(34,197,94,0.5)] transition-all duration-200"
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Try Now</span>
            <span className="sm:hidden">Try</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
