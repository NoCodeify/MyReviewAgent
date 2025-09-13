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
  const [leadsPerDay, setLeadsPerDay] = useState(10);
  const [avgTicketValue] = useState(347);

  // Calculate losses
  const missedLeadsPerDay = Math.floor(leadsPerDay * 0.73); // 73% missed after hours
  const monthlyLoss = missedLeadsPerDay * avgTicketValue * 30;
  const yearlyLoss = monthlyLoss * 12;

  const problems = [
    {
      icon: ClockIcon,
      stat: "14 hours",
      label: "Average WhatsApp response time",
      comparison: "vs 30 seconds for businesses with AI",
      color: "text-red-500"
    },
    {
      icon: UserMinusIcon,
      stat: "73%",
      label: "Messages unanswered after 5pm",
      comparison: "That's 7 out of 10 customers gone",
      color: "text-orange-500"
    },
    {
      icon: CurrencyDollarIcon,
      stat: "$347",
      label: "Lost per missed WhatsApp lead",
      comparison: "Average customer lifetime value",
      color: "text-red-600"
    },
    {
      icon: ChartBarIcon,
      stat: "89%",
      label: "Customers buy from fastest responder",
      comparison: "Speed beats everything else",
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
              THE HIDDEN CRISIS
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              The WhatsApp Black Hole
              <span className="block text-3xl lg:text-4xl mt-2 text-destructive">
                Eating Your Revenue 24/7
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              While you sleep, eat, or spend time with family, your competitors with AI agents are closing YOUR leads
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
                <h3 className="text-2xl font-bold">Calculate Your Revenue Leak</h3>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Slider */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    WhatsApp leads per day: <span className="text-2xl font-bold">{leadsPerDay}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={leadsPerDay}
                    onChange={(e) => setLeadsPerDay(parseInt(e.target.value))}
                    className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #fff 0%, #fff ${leadsPerDay}%, rgba(255,255,255,0.2) ${leadsPerDay}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                </div>

                {/* Results */}
                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-3xl font-bold">{missedLeadsPerDay}</div>
                    <div className="text-sm opacity-90">Leads lost daily</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-3xl font-bold">${monthlyLoss.toLocaleString()}</div>
                    <div className="text-sm opacity-90">Lost per month</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 ring-2 ring-white/50">
                    <div className="text-3xl font-bold">${yearlyLoss.toLocaleString()}</div>
                    <div className="text-sm opacity-90 font-semibold">Lost per year</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 space-y-4">
                  <p className="text-lg font-medium">
                    Every hour you wait = ${Math.floor(yearlyLoss / 365 / 24)} down the drain
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                    onClick={() => {
                      const ctaSection = document.getElementById('final-cta');
                      ctaSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Stop The Bleeding Now
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
                <span className="font-bold">Fun Fact:</span> Your competitors using AI agents are capturing these leads right now, at 2 AM, while you're sleeping
              </p>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}