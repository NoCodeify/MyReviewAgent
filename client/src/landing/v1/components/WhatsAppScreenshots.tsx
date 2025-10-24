import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XMarkIcon,
  SparklesIcon,
  ArrowRightIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export default function WhatsAppScreenshots() {
  const beforeMessages = [
    { type: "silence", text: "Customer had great experience...", time: "Yesterday" },
    { type: "silence", text: "But nobody asked for a review", time: "" },
    { type: "silence", text: "Customer forgets about the experience", time: "+3 days" },
    { type: "lost", text: "⚠️ No Review - Opportunity Lost Forever", time: "" }
  ];

  const afterMessages = [
    { type: "ai", text: "Hi Sarah! 👋 Thanks for visiting Bella's Salon yesterday! How was your experience with us?", time: "Next morning, 9:00 AM" },
    { type: "customer", text: "It was amazing! Best haircut I've had in years", time: "9:12 AM" },
    { type: "ai", text: "That's wonderful to hear! 🎉 Would you mind sharing your experience on Google? It really helps us grow. Here's the link: [Google Review]", time: "9:12 AM" },
    { type: "customer", text: "Sure, done! Left you 5 stars ⭐⭐⭐⭐⭐", time: "9:15 AM" },
    { type: "ai", text: "Thank you so much Sarah! We really appreciate it. Looking forward to seeing you again! 💚", time: "9:15 AM" },
    { type: "success", text: "✅ 5-Star Review Collected - 15 Minutes Total", time: "" }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-blue-500/10 text-blue-500 border-0 text-base px-4 py-2 font-semibold">
              <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
              REAL CONVERSATIONS
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              See The Difference In Action
              <span className="block text-3xl lg:text-4xl mt-2 text-primary">
                Before vs After MyReviewAgent.ai
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real WhatsApp conversations showing how businesses miss reviews vs how MyReviewAgent.ai collects them
            </p>
          </div>

          {/* Screenshots Grid */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
            {/* Before - Without MyReviewAgent */}
            <Card className="p-3 lg:p-6 border-red-200 dark:border-red-900 bg-gradient-to-b from-red-50/50 to-white dark:from-red-950/20 dark:to-slate-900">
              <div className="flex items-center gap-1 lg:gap-2 mb-4 lg:mb-6">
                <XMarkIcon className="w-5 lg:w-6 h-5 lg:h-6 text-red-500 flex-shrink-0" />
                <h3 className="text-sm lg:text-xl font-bold text-foreground">Without MyReviewAgent.ai</h3>
                <Badge variant="destructive" className="text-xs lg:text-sm px-2 py-0.5">No Review</Badge>
              </div>

              {/* Phone Mockup */}
              <div className="bg-slate-900 rounded-[1.5rem] lg:rounded-[2rem] p-2 lg:p-3 shadow-xl max-w-[280px] lg:max-w-sm mx-auto">
                <div className="bg-[#075E54] rounded-t-xl lg:rounded-t-2xl p-2 lg:p-3 text-white text-xs lg:text-sm font-semibold flex items-center justify-between">
                  <span className="truncate">Bella's Salon</span>
                  <span className="text-[10px] lg:text-xs opacity-70">WhatsApp</span>
                </div>
                <div className="bg-[#ECE5DD] dark:bg-[#1A1A1A] p-2 lg:p-4 rounded-b-xl lg:rounded-b-2xl min-h-[300px] lg:min-h-[400px] space-y-3 lg:space-y-4 flex flex-col items-center justify-center">
                  {beforeMessages.map((msg, index) => (
                    <div key={index} className="w-full">
                      {msg.type === "silence" && (
                        <div className="text-center">
                          <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 italic mb-1">{msg.text}</p>
                          {msg.time && <p className="text-[10px] lg:text-xs text-slate-400">{msg.time}</p>}
                        </div>
                      )}
                      {msg.type === "lost" && (
                        <div className="bg-red-100 dark:bg-red-950/50 rounded-lg p-2 lg:p-3 text-center mt-3 lg:mt-4">
                          <p className="text-xs lg:text-sm font-semibold text-red-600 dark:text-red-400 break-words">{msg.text}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 lg:mt-6 space-y-1 lg:space-y-2">
                <div className="flex items-center gap-1 lg:gap-2 text-red-600 dark:text-red-400">
                  <XMarkIcon className="w-3 lg:w-4 h-3 lg:h-4 flex-shrink-0" />
                  <span className="text-xs lg:text-sm">No follow-up sent</span>
                </div>
                <div className="flex items-center gap-1 lg:gap-2 text-red-600 dark:text-red-400">
                  <XMarkIcon className="w-3 lg:w-4 h-3 lg:h-4 flex-shrink-0" />
                  <span className="text-xs lg:text-sm">Customer never asked</span>
                </div>
                <div className="flex items-center gap-1 lg:gap-2 text-red-600 dark:text-red-400">
                  <XMarkIcon className="w-3 lg:w-4 h-3 lg:h-4 flex-shrink-0" />
                  <span className="text-xs lg:text-sm">Reviews collected: 0</span>
                </div>
              </div>
            </Card>

            {/* After - With MyReviewAgent */}
            <Card className="p-3 lg:p-6 border-green-200 dark:border-green-900 bg-gradient-to-b from-green-50/50 to-white dark:from-green-950/20 dark:to-slate-900">
              <div className="flex items-center gap-1 lg:gap-2 mb-4 lg:mb-6">
                <CheckCircleIcon className="w-5 lg:w-6 h-5 lg:h-6 text-green-500 flex-shrink-0" />
                <h3 className="text-sm lg:text-xl font-bold text-foreground">With MyReviewAgent.ai</h3>
                <Badge className="bg-green-500/10 text-green-600 border-0 text-xs lg:text-sm px-2 py-0.5">5★ Review</Badge>
              </div>

              {/* Phone Mockup */}
              <div className="bg-slate-900 rounded-[1.5rem] lg:rounded-[2rem] p-2 lg:p-3 shadow-xl max-w-[280px] lg:max-w-sm mx-auto">
                <div className="bg-[#075E54] rounded-t-xl lg:rounded-t-2xl p-2 lg:p-3 text-white text-xs lg:text-sm font-semibold flex items-center justify-between">
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="truncate">Bella's Salon</span>
                    <SparklesIcon className="w-3 lg:w-4 h-3 lg:h-4 text-yellow-400" />
                  </div>
                  <span className="text-[10px] lg:text-xs opacity-70">AI Agent</span>
                </div>
                <div className="bg-[#ECE5DD] dark:bg-[#1A1A1A] p-2 lg:p-4 rounded-b-xl lg:rounded-b-2xl min-h-[300px] lg:min-h-[400px] space-y-2 lg:space-y-3 overflow-y-auto">
                  {afterMessages.map((msg, index) => (
                    <div key={index}>
                      {msg.type === "customer" && (
                        <div className="flex justify-start">
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-2 lg:p-3 max-w-[85%] shadow-sm">
                            <p className="text-xs lg:text-sm text-slate-900 dark:text-slate-100 break-words">{msg.text}</p>
                            <p className="text-[10px] lg:text-xs text-slate-500 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      )}
                      {msg.type === "ai" && (
                        <div className="flex justify-end">
                          <div className="bg-[#DCF8C6] dark:bg-green-900/30 rounded-lg p-2 lg:p-3 max-w-[85%] shadow-sm border border-green-300 dark:border-green-700">
                            <p className="text-xs lg:text-sm text-slate-900 dark:text-slate-100 break-words">{msg.text}</p>
                            <p className="text-[10px] lg:text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1">
                              {msg.time} <SparklesIcon className="w-2 lg:w-3 h-2 lg:h-3 text-green-600" />
                            </p>
                          </div>
                        </div>
                      )}
                      {msg.type === "success" && (
                        <div className="bg-green-100 dark:bg-green-950/50 rounded-lg p-2 lg:p-3 text-center mt-3 lg:mt-4">
                          <p className="text-xs lg:text-sm font-semibold text-green-600 dark:text-green-400 break-words">{msg.text}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 lg:mt-6 space-y-1 lg:space-y-2">
                <div className="flex items-center gap-1 lg:gap-2 text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="w-3 lg:w-4 h-3 lg:h-4 flex-shrink-0" />
                  <span className="text-xs lg:text-sm">Automated follow-up: Next morning</span>
                </div>
                <div className="flex items-center gap-1 lg:gap-2 text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="w-3 lg:w-4 h-3 lg:h-4 flex-shrink-0" />
                  <span className="text-xs lg:text-sm">Review collected in 15 minutes</span>
                </div>
                <div className="flex items-center gap-1 lg:gap-2 text-green-600 dark:text-green-400">
                  <StarIcon className="w-3 lg:w-4 h-3 lg:h-4 flex-shrink-0 fill-green-600" />
                  <span className="text-xs lg:text-sm">5-Star Google Review</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-blue-200 dark:border-blue-800 p-8">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                This Happens After Every Booking
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                While you focus on your business, MyReviewAgent.ai is collecting reviews automatically.
                The average business using MyReviewAgent.ai collects
                <span className="font-bold text-primary"> 3x more reviews</span> every month.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                onClick={() => {
                  window.open('https://wa.me/31658015937?text=Hi! I want to try MyReviewAgent.ai', '_blank');
                }}
              >
                Start Collecting Reviews on Autopilot
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
