import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalculatorIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function ROICalculator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(200);
  const [averageOrderValue, setAverageOrderValue] = useState(500);
  const [currentCloseRate, setCurrentCloseRate] = useState(5);

  // Calculate improvements with AI
  const aiCloseRate = 25; // Based on your real 25.3% close rate
  const responseRate = 98; // WhatsApp open rate

  // Current performance
  const currentClosedDeals = Math.floor(leadsPerMonth * (currentCloseRate / 100));
  const currentRevenue = currentClosedDeals * averageOrderValue;

  // With MyWhatsAgent
  const aiClosedDeals = Math.floor(leadsPerMonth * (aiCloseRate / 100));
  const aiRevenue = aiClosedDeals * averageOrderValue;

  // Improvements
  const additionalDeals = aiClosedDeals - currentClosedDeals;
  const additionalRevenue = aiRevenue - currentRevenue;
  const yearlyAdditional = additionalRevenue * 12;
  const roi = Math.floor((yearlyAdditional / 497) * 100); // ROI based on lifetime price

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-chart-1/10 text-chart-1 border-0 text-base px-4 py-2 font-semibold">
              <CalculatorIcon className="w-4 h-4 mr-2" />
              ROI CALCULATOR
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Calculate Your AI Agent ROI
              <span className="block text-3xl lg:text-4xl mt-2 text-primary">
                See Your Revenue Potential
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Based on real data from 847 closed deals. Enter your numbers to see potential gains.
            </p>
          </div>

          {/* Calculator */}
          <Card className="p-8 bg-card">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* Left: Inputs */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Your Current Metrics</h3>

                {/* Leads per month */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    WhatsApp Leads Per Month
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="50"
                      value={leadsPerMonth}
                      onChange={(e) => setLeadsPerMonth(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-primary min-w-[80px] text-right">
                      {leadsPerMonth}
                    </span>
                  </div>
                </div>

                {/* Average order value */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Average Order Value ($)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="100"
                      max="5000"
                      step="100"
                      value={averageOrderValue}
                      onChange={(e) => setAverageOrderValue(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-primary min-w-[80px] text-right">
                      ${averageOrderValue}
                    </span>
                  </div>
                </div>

                {/* Current close rate */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Current Close Rate (%)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={currentCloseRate}
                      onChange={(e) => setCurrentCloseRate(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-primary min-w-[80px] text-right">
                      {currentCloseRate}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Results */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Your Potential Results</h3>

                {/* Comparison boxes */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-muted/50">
                    <div className="text-sm text-muted-foreground mb-1">Currently Closing</div>
                    <div className="text-2xl font-bold text-foreground">{currentClosedDeals}</div>
                    <div className="text-sm text-muted-foreground">deals/month</div>
                  </Card>
                  <Card className="p-4 bg-chart-1/10 border-chart-1/20">
                    <div className="text-sm text-chart-1 mb-1">With AI Agent</div>
                    <div className="text-2xl font-bold text-chart-1">{aiClosedDeals}</div>
                    <div className="text-sm text-chart-1">deals/month</div>
                  </Card>
                </div>

                {/* Revenue impact */}
                <Card className="p-6 bg-gradient-to-br from-chart-1/20 to-chart-2/20 border-chart-1/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Additional Monthly Revenue</span>
                      <span className="text-2xl font-bold text-chart-1">
                        +${additionalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Additional Yearly Revenue</span>
                      <span className="text-3xl font-bold text-chart-1">
                        +${yearlyAdditional.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">ROI on $497 Investment</span>
                        <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-lg px-3 py-1">
                          {roi.toLocaleString()}% ROI
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Key improvements */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-chart-1" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">+{additionalDeals}</span> extra deals closed per month
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-chart-1" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">5x</span> improvement in close rate
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-chart-1" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">24/7</span> availability without human agents
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                onClick={() => {
                  const ctaSection = document.getElementById('final-cta');
                  ctaSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ArrowTrendingUpIcon className="w-5 h-5 mr-2" />
                Start Getting These Results
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Based on actual performance data from 847 real closed deals
              </p>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}