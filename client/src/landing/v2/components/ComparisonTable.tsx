import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowRightIcon,
  ChartBarIcon,
  XMarkIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

export default function ComparisonTable() {
  const comparisonData = [
    {
      metric: "Revenue from WhatsApp",
      before: "$0",
      after: "$5,000,000",
      improvement: "∞ increase",
      highlight: true
    },
    {
      metric: "Deals Closed",
      before: "0",
      after: "847",
      improvement: "847 deals",
      highlight: true
    },
    {
      metric: "Hours Spent Selling",
      before: "2,080 hours/year",
      after: "0 hours",
      improvement: "100% automated",
      highlight: false
    },
    {
      metric: "Response Time",
      before: "2-24 hours",
      after: "< 30 seconds",
      improvement: "48x faster",
      highlight: false
    },
    {
      metric: "Message Templates",
      before: "Required by API",
      after: "Natural conversations",
      improvement: "No restrictions",
      highlight: false
    },
    {
      metric: "24-Hour Window",
      before: "API restricted",
      after: "Message anytime",
      improvement: "Unlimited timing",
      highlight: false
    },
    {
      metric: "Closing Rate",
      before: "Industry avg: 18%",
      after: "25.3%",
      improvement: "+40% better",
      highlight: false
    },
    {
      metric: "Lead Follow-up",
      before: "60% forgotten",
      after: "100% contacted",
      improvement: "Zero missed",
      highlight: false
    },
    {
      metric: "Cost",
      before: "$48,000/year (salary)",
      after: "$497 (one-time)",
      improvement: "99% savings",
      highlight: true
    }
  ];

  const capabilities = [
    { feature: "Works 24/7/365", traditional: false, ai: true },
    { feature: "Handles objections", traditional: true, ai: true },
    { feature: "Negotiates pricing", traditional: true, ai: true },
    { feature: "Books appointments", traditional: true, ai: true },
    { feature: "No API restrictions", traditional: false, ai: true },
    { feature: "Remembers all context", traditional: false, ai: true },
    { feature: "Never needs breaks", traditional: false, ai: true },
    { feature: "Scales infinitely", traditional: false, ai: true },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-green-400/10 text-green-500 border-0 text-base px-4 py-2 font-semibold">
              <ChartBarIcon className="w-4 h-4 mr-2 text-green-500" />
              THE $5M TRANSFORMATION
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Before vs After WhatsApp AI
              <span className="block text-primary">12 Months of Real Data</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the exact metrics from our case study business that went from
              $0 to $5M using our autonomous WhatsApp agent
            </p>
          </div>

          {/* Main Comparison Table */}
          <Card className="overflow-hidden shadow-[0_0_20px_-6px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl mb-12">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <div className="grid grid-cols-5 bg-muted/50">
                <div className="p-4 font-semibold text-foreground">
                  Metric
                </div>
                <div className="p-4 font-semibold text-foreground text-center bg-destructive/10">
                  Before WhatsApp AI
                </div>
                <div className="p-4 flex items-center justify-center">
                  <ArrowRightIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="p-4 font-semibold text-foreground text-center bg-chart-1/10">
                  After WhatsApp AI
                </div>
                <div className="p-4 font-semibold text-foreground text-center bg-primary/10">
                  Improvement
                </div>
              </div>

              {comparisonData.map((row, index) => (
                <div key={index} className={`grid grid-cols-5 border-t border-border ${row.highlight ? 'bg-chart-1/5' : ''}`}>
                  <div className="p-4 font-medium text-foreground">
                    {row.metric}
                  </div>
                  <div className="p-4 text-center text-muted-foreground">
                    {row.before}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <ArrowRightIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="p-4 text-center font-semibold text-foreground">
                    {row.after}
                  </div>
                  <div className="p-4 text-center">
                    <Badge className={`${row.highlight ? 'bg-chart-1/20 text-chart-1 border-chart-1/30' : 'bg-primary/10 text-primary border-primary/20'}`}>
                      {row.improvement}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {comparisonData.map((row, index) => (
                <Card key={index} className={`p-4 ${row.highlight ? 'bg-chart-1/5 border-chart-1/20' : ''}`}>
                  <div className="space-y-3">
                    <div className="font-semibold text-foreground">{row.metric}</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Before</div>
                        <div className="text-sm bg-destructive/5 px-3 py-2 rounded-lg text-muted-foreground">
                          {row.before}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-chart-1 mb-1">After</div>
                        <div className="text-sm bg-chart-1/5 px-3 py-2 rounded-lg font-semibold">
                          {row.after}
                        </div>
                      </div>
                    </div>
                    <Badge className={`w-full justify-center ${row.highlight ? 'bg-chart-1/20 text-chart-1 border-chart-1/30' : 'bg-primary/10 text-primary border-primary/20'}`}>
                      {row.improvement}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Capabilities Comparison */}
          <Card className="p-6 shadow-[0_0_15px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Human Sales Rep vs WhatsApp AI Capabilities
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm font-medium text-foreground">{item.feature}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Human:</span>
                      {item.traditional ? (
                        <CheckIcon className="w-4 h-4 text-chart-1" />
                      ) : (
                        <XMarkIcon className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">AI:</span>
                      <CheckIcon className="w-4 h-4 text-chart-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bottom insight */}
          <div className="text-center mt-12">
            <div className="inline-flex items-start gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-chart-1 rounded-full flex-shrink-0 mt-1.5"></div>
              <p className="text-sm">
                Based on actual data from 12 months of WhatsApp AI implementation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}