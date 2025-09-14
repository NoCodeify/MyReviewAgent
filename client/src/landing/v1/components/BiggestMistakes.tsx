import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  MoonIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function BiggestMistakes() {
  const mistakes = [
    {
      number: "1",
      mistake: "Letting WhatsApp Leads Wait More Than 5 Minutes",
      stat: "78%",
      statLabel: "of customers buy from whoever responds first",
      problem: "While you're busy, typing, or away from your phone, your competitors' AI agents are closing YOUR leads in seconds.",
      solution: "MyWhatsAgent responds in under 30 seconds, 24/7, never missing a single opportunity.",
      icon: ClockIcon,
      color: "from-red-500 to-orange-500"
    },
    {
      number: "2",
      mistake: "Using Template-Based Chatbots That Sound Robotic",
      stat: "91%",
      statLabel: "of users abandon robotic conversations",
      problem: "Pre-written templates, rigid decision trees, and 'press 1 for sales' responses that frustrate customers and kill conversions.",
      solution: "MyWhatsAgent uses natural AI that adapts to each conversation, handles objections, and closes deals like a human would.",
      icon: ChatBubbleBottomCenterTextIcon,
      color: "from-orange-500 to-yellow-500"
    },
    {
      number: "3",
      mistake: "Missing 73% of Leads That Come After Business Hours",
      stat: "$4.2M",
      statLabel: "average yearly loss from after-hours leads",
      problem: "Most WhatsApp messages come when you're sleeping, eating dinner, or spending time with family. Those leads go cold forever.",
      solution: "MyWhatsAgent works 24/7/365, closing deals at 3 AM while you sleep, turning night owls into paying customers.",
      icon: MoonIcon,
      color: "from-yellow-500 to-green-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-red-500/10 text-red-500 border-0 text-base px-4 py-2 font-semibold">
              <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
              CRITICAL WARNING
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              The 3 Biggest WhatsApp Sales Mistakes
              <span className="block text-3xl lg:text-4xl mt-2 text-muted-foreground">
                (That Are Costing You Millions)
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              99% of businesses make at least one of these mistakes. Each one is silently destroying your revenue potential.
            </p>
          </div>

          {/* Mistakes Grid */}
          <div className="space-y-8">
            {mistakes.map((mistake, index) => (
              <Card key={index} className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="grid lg:grid-cols-12 gap-0">
                  {/* Mistake Number */}
                  <div className={`lg:col-span-1 bg-gradient-to-br ${mistake.color} flex items-center justify-center p-8 lg:p-0`}>
                    <div className="text-white font-display text-6xl lg:text-7xl font-bold">
                      {mistake.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-11 p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Problem Side */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <XMarkIcon className="w-6 h-6 text-red-500" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              MISTAKE: {mistake.mistake}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-4xl font-bold text-red-500">{mistake.stat}</span>
                              <span className="text-muted-foreground">{mistake.statLabel}</span>
                            </div>
                            <p className="text-muted-foreground">
                              {mistake.problem}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Solution Side */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircleIcon className="w-6 h-6 text-green-500" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              SOLUTION:
                            </h3>
                            <p className="text-muted-foreground">
                              {mistake.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-green-200 dark:border-green-800 p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
                <h3 className="text-2xl font-bold text-foreground">
                  Stop Making These Expensive Mistakes
                </h3>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join 1,247+ businesses that fixed all three mistakes with MyWhatsAgent and saw an average
                <span className="font-bold text-green-600 dark:text-green-400"> 487% revenue increase </span>
                in their first 90 days.
              </p>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}