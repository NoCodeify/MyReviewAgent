import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ClockIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function CTASection() {
  const handleTryNow = () => {
    window.open('https://wa.me/31658015937?text=Hi! I want to try MyReviewAgent.ai', '_blank');
  };

  return (
    <section id="final-cta" className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-500/10"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-500/15 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <div className="text-center space-y-8">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-base font-semibold">
              <StarIcon className="w-4 h-4 mr-2" />
              READY TO GET 3x MORE REVIEWS?
            </Badge>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Start Collecting Reviews
              <span className="block text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
                On Autopilot Today
              </span>
            </h2>

            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Join 500+ booking businesses that collect reviews automatically via WhatsApp & SMS.
              Try it free with your first 10 customers.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                onClick={handleTryNow}
                className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-xl px-12 py-8 h-auto font-bold border-0 shadow-[0_8px_24px_0_rgba(34,197,94,0.5),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_32px_0_rgba(34,197,94,0.6),inset_0_2px_0_0_rgba(255,255,255,0.2),inset_0_-2px_0_0_rgba(0,0,0,0.1)] ring-2 ring-green-400/30 hover:ring-green-400/50 transform hover:translate-y-[-2px] transition-all duration-200 rounded-2xl"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6 mr-3" />
                Try AI Review Agent on WhatsApp
              </Button>

              <p className="text-sm text-gray-400">
                💬 Chat with us on WhatsApp • Get started in minutes
              </p>
            </div>

            {/* Trust indicators */}
            <div className="grid sm:grid-cols-3 gap-6 pt-12">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6 text-center">
                <CheckCircleIcon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">Try Free First</h3>
                <p className="text-sm text-gray-300">Test with first 10 customers at no charge</p>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6 text-center">
                <ClockIcon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">10-Min Setup</h3>
                <p className="text-sm text-gray-300">Connect booking system and start collecting</p>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6 text-center">
                <ShieldCheckIcon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">Pay Per Feedback</h3>
                <p className="text-sm text-gray-300">Only pay when customers actually respond</p>
              </Card>
            </div>

            {/* Social proof */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <p className="text-gray-300">
                <span className="font-bold text-white">500+ businesses</span> collecting <span className="font-bold text-white">10K+ reviews</span> with MyReviewAgent.ai
              </p>
            </div>

            {/* Additional Info */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                ✅ No credit card required to try • ✅ Setup support included • ✅ Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
