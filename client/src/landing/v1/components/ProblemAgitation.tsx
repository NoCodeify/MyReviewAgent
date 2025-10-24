import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExclamationTriangleIcon,
  ClockIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  FireIcon,
  UserMinusIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function ProblemAgitation() {
  const [customersPerDay, setCustomersPerDay] = useState(20);

  // Calculate review losses
  const withoutAutomation = Math.floor(customersPerDay * 0.15); // Only 15% leave reviews manually
  const withAutomation = Math.floor(customersPerDay * 0.45); // 45% with AI follow-up
  const missedReviewsPerDay = withAutomation - withoutAutomation;
  const missedReviewsPerMonth = missedReviewsPerDay * 30;
  const timeWastedPerMonth = customersPerDay * 5 * 30; // 5 mins per manual request

  const problems = [
    {
      icon: ClockIcon,
      stat: "5 mins",
      label: "Per manual review request",
      comparison: "That's 2.5 hours daily for 30 customers",
      color: "text-red-500"
    },
    {
      icon: UserMinusIcon,
      stat: "85%",
      label: "Customers don't leave reviews",
      comparison: "Without automated follow-up",
      color: "text-orange-500"
    },
    {
      icon: ExclamationTriangleIcon,
      stat: "3x",
      label: "More likely to review when angry",
      comparison: "Negative reviews come naturally",
      color: "text-red-600"
    },
    {
      icon: ChartBarIcon,
      stat: "89%",
      label: "Check reviews before booking",
      comparison: "Your reputation is everything",
      color: "text-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-red-500/10 text-red-500 border-0 text-base px-4 py-2 font-semibold">
              <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
              THE REVIEW GAP
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Missing Hundreds of Reviews
              <span className="block text-3xl lg:text-4xl mt-2 text-destructive">
                Every Single Month
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Manual review requests are costing you reputation, rankings, and new customers
            </p>
          </div>

          {/* Problem Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {problems.map((problem, index) => (
              <Card key={index} className="p-6 text-center hover-elevate">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center`}>
                  <problem.icon className="w-8 h-8 text-destructive" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{problem.stat}</div>
                <div className="text-sm font-semibold text-foreground mb-1">{problem.label}</div>
                <div className="text-xs text-muted-foreground">{problem.comparison}</div>
              </Card>
            ))}
          </div>

          {/* Interactive Calculator */}
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <FireIcon className="w-8 h-8 text-chart-1" />
                <h3 className="text-2xl font-bold">Calculate Your Missing Reviews</h3>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Slider */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Customers per day: <span className="text-2xl font-bold">{customersPerDay}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={customersPerDay}
                      onChange={(e) => setCustomersPerDay(parseInt(e.target.value))}
                      className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, white 0%, white ${((customersPerDay - 5) / (100 - 5)) * 100}%, rgba(255,255,255,0.2) ${((customersPerDay - 5) / (100 - 5)) * 100}%, rgba(255,255,255,0.2) 100%)`
                      }}
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-3xl font-bold">{missedReviewsPerDay}</div>
                    <div className="text-sm opacity-90">Reviews lost daily</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 ring-2 ring-white/50">
                    <div className="text-3xl font-bold">{missedReviewsPerMonth}</div>
                    <div className="text-sm opacity-90 font-semibold">Reviews lost monthly</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-3xl font-bold">{Math.floor(timeWastedPerMonth / 60)}h</div>
                    <div className="text-sm opacity-90">Time wasted monthly</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 space-y-4">
                  <p className="text-lg font-medium">
                    Every week = {missedReviewsPerDay * 7} reviews you'll never get back
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                    onClick={() => {
                      window.open('https://wa.me/31658015937?text=Hi! I want to try MyReviewAgent.ai', '_blank');
                    }}
                  >
                    Start Collecting 3x More Reviews
                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Bottom Warning */}
          <div className="mt-12 text-center">
            <Card className="inline-flex items-center gap-3 px-6 py-4 bg-yellow-50 border-yellow-200">
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
              <p className="text-sm font-medium text-slate-700">
                <span className="font-bold">Reality Check:</span> Your competitors with automated review collection are building 5-star reputations while you're asking customers "one at a time"
              </p>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}