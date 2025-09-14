import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XMarkIcon,
  SparklesIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function WhatsAppScreenshots() {
  const beforeMessages = [
    { type: "customer", text: "Hi, I'm interested in your services", time: "10:23 AM" },
    { type: "waiting", text: "Message delivered ✓✓", time: "10:23 AM" },
    { type: "waiting", text: "...", time: "2:45 PM" },
    { type: "business", text: "Hi! Sorry for the late reply. How can I help?", time: "2:45 PM" },
    { type: "customer", text: "Never mind, I already bought from someone else", time: "2:46 PM" },
    { type: "lost", text: "Lead Lost - Responded 4 hours late", time: "" }
  ];

  const afterMessages = [
    { type: "customer", text: "Hi, I'm interested in your services", time: "10:23 AM" },
    { type: "ai", text: "Hello! Thanks for reaching out! I'd love to help you. Which service are you interested in?", time: "10:23 AM" },
    { type: "customer", text: "I need help with WhatsApp automation", time: "10:24 AM" },
    { type: "ai", text: "Perfect! Our WhatsApp AI agent can handle your sales 24/7. It responds instantly, handles objections, and closes deals. Currently we have a special offer - lifetime access for just $497. Would you like to see how it works?", time: "10:24 AM" },
    { type: "customer", text: "Yes, but is it complicated to set up?", time: "10:25 AM" },
    { type: "ai", text: "Not at all! Setup takes just 5 minutes. You connect WhatsApp, upload your business info, and the AI starts working immediately. We also provide full support. Should I send you a demo?", time: "10:25 AM" },
    { type: "customer", text: "Sounds good. I'll take it!", time: "10:26 AM" },
    { type: "success", text: "✅ Deal Closed in 3 minutes - $497 sale", time: "" }
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
                Before vs After WhatsAgent
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real WhatsApp conversations showing how businesses lose leads vs how WhatsAgent closes them
            </p>
          </div>

          {/* Screenshots Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Before - Without WhatsAgent */}
            <Card className="p-6 border-red-200 dark:border-red-900 bg-gradient-to-b from-red-50/50 to-white dark:from-red-950/20 dark:to-slate-900">
              <div className="flex items-center gap-2 mb-6">
                <XMarkIcon className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-foreground">Without WhatsAgent</h3>
                <Badge variant="destructive">Lead Lost</Badge>
              </div>

              {/* Phone Mockup */}
              <div className="bg-slate-900 rounded-[2rem] p-3 shadow-xl max-w-sm mx-auto">
                <div className="bg-[#075E54] rounded-t-2xl p-3 text-white text-sm font-semibold flex items-center justify-between">
                  <span>Business Name</span>
                  <span className="text-xs opacity-70">WhatsApp</span>
                </div>
                <div className="bg-[#ECE5DD] dark:bg-[#1A1A1A] p-4 rounded-b-2xl min-h-[400px] space-y-3">
                  {beforeMessages.map((msg, index) => (
                    <div key={index}>
                      {msg.type === "customer" && (
                        <div className="flex justify-start">
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 max-w-[80%] shadow-sm">
                            <p className="text-sm text-slate-900 dark:text-slate-100">{msg.text}</p>
                            <p className="text-xs text-slate-500 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      )}
                      {msg.type === "business" && (
                        <div className="flex justify-end">
                          <div className="bg-[#DCF8C6] dark:bg-green-900/30 rounded-lg p-3 max-w-[80%] shadow-sm">
                            <p className="text-sm text-slate-900 dark:text-slate-100">{msg.text}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      )}
                      {msg.type === "waiting" && (
                        <div className="text-center">
                          <p className="text-xs text-slate-500 italic">{msg.text}</p>
                        </div>
                      )}
                      {msg.type === "lost" && (
                        <div className="bg-red-100 dark:bg-red-950/50 rounded-lg p-3 text-center mt-4">
                          <p className="text-sm font-semibold text-red-600 dark:text-red-400">{msg.text}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <XMarkIcon className="w-4 h-4" />
                  <span className="text-sm">Response time: 4+ hours</span>
                </div>
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <XMarkIcon className="w-4 h-4" />
                  <span className="text-sm">Customer lost to competitor</span>
                </div>
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <XMarkIcon className="w-4 h-4" />
                  <span className="text-sm">Revenue: $0</span>
                </div>
              </div>
            </Card>

            {/* After - With WhatsAgent */}
            <Card className="p-6 border-green-200 dark:border-green-900 bg-gradient-to-b from-green-50/50 to-white dark:from-green-950/20 dark:to-slate-900">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-foreground">With WhatsAgent</h3>
                <Badge className="bg-green-500/10 text-green-600 border-0">Deal Closed</Badge>
              </div>

              {/* Phone Mockup */}
              <div className="bg-slate-900 rounded-[2rem] p-3 shadow-xl max-w-sm mx-auto">
                <div className="bg-[#075E54] rounded-t-2xl p-3 text-white text-sm font-semibold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>Business Name</span>
                    <SparklesIcon className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="text-xs opacity-70">WhatsApp AI</span>
                </div>
                <div className="bg-[#ECE5DD] dark:bg-[#1A1A1A] p-4 rounded-b-2xl min-h-[400px] space-y-3">
                  {afterMessages.map((msg, index) => (
                    <div key={index}>
                      {msg.type === "customer" && (
                        <div className="flex justify-start">
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 max-w-[80%] shadow-sm">
                            <p className="text-sm text-slate-900 dark:text-slate-100">{msg.text}</p>
                            <p className="text-xs text-slate-500 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      )}
                      {msg.type === "ai" && (
                        <div className="flex justify-end">
                          <div className="bg-[#DCF8C6] dark:bg-green-900/30 rounded-lg p-3 max-w-[80%] shadow-sm border border-green-300 dark:border-green-700">
                            <p className="text-sm text-slate-900 dark:text-slate-100">{msg.text}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1">
                              {msg.time} <SparklesIcon className="w-3 h-3 text-green-600" />
                            </p>
                          </div>
                        </div>
                      )}
                      {msg.type === "success" && (
                        <div className="bg-green-100 dark:bg-green-950/50 rounded-lg p-3 text-center mt-4">
                          <p className="text-sm font-semibold text-green-600 dark:text-green-400">{msg.text}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span className="text-sm">Response time: Instant</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span className="text-sm">Deal closed in 3 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span className="text-sm">Revenue: $497</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-blue-200 dark:border-blue-800 p-8">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                This Happens 24/7 With WhatsAgent
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                While you sleep, eat, or spend time with family, WhatsAgent is closing deals.
                The average business using WhatsAgent sees
                <span className="font-bold text-primary"> 67 more sales per month</span>.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(59,130,246,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(59,130,246,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                onClick={() => {
                  const ctaSection = document.getElementById('final-cta');
                  ctaSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Try it yourself - Let the AI convince you
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}