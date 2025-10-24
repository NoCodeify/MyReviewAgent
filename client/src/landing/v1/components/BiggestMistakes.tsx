import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserMinusIcon,
  FaceFrownIcon
} from "@heroicons/react/24/outline";

export default function BiggestMistakes() {
  const mistakes = [
    {
      number: "1",
      mistake: "Forgetting to Ask for Reviews",
      stat: "85%",
      statLabel: "of customers never get asked",
      problem: "You're busy running your business. By the time you remember to ask for reviews, customers have forgotten their experience and moved on.",
      solution: "MyReviewAgent.ai automatically sends review requests after every booking. Zero manual work, zero forgotten customers.",
      icon: ClockIcon,
      color: "from-red-500 to-orange-500"
    },
    {
      number: "2",
      mistake: "Letting Negative Reviews Go Public",
      stat: "67%",
      statLabel: "of prospects avoid businesses with bad reviews",
      problem: "One angry customer leaves a 1-star review that damages your reputation for years. You never had a chance to fix their issue first.",
      solution: "MyReviewAgent.ai routes negative feedback to a private form. You fix issues before they hurt your public rating.",
      icon: FaceFrownIcon,
      color: "from-orange-500 to-yellow-500"
    },
    {
      number: "3",
      mistake: "Manual Review Requests That Get Ignored",
      stat: "10-15%",
      statLabel: "response rate for manual requests",
      problem: "Generic 'please leave us a review' texts get ignored. Customers are busy and forget immediately after reading your message.",
      solution: "MyReviewAgent.ai sends personalized WhatsApp/SMS messages at the perfect time, achieving 45% response rates.",
      icon: UserMinusIcon,
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
              The 3 Biggest Review Collection Mistakes
              <span className="block text-3xl lg:text-4xl mt-2 text-muted-foreground">
                (That Are Killing Your Reputation)
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              99% of booking businesses make at least one of these mistakes. Each one is silently destroying your review growth.
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
                Join 500+ businesses that fixed all three mistakes with MyReviewAgent.ai and saw
                <span className="font-bold text-green-600 dark:text-green-400"> 3x more reviews </span>
                in their first 30 days.
              </p>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
