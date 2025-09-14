import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CurrencyDollarIcon,
  XMarkIcon,
  CheckIcon,
  CalculatorIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { useDealPricing, useFormattedPrice } from "@/hooks/useDealPricing";

export default function CompetitorPricing() {
  const dealPricing = useDealPricing();
  const pricing = useFormattedPrice('PROFESSIONAL');
  const isMonthlyPricing = dealPricing.dealStatus === 'final_expired';
  const competitors = [
    {
      name: "Hiring a VA",
      price: "$2,000",
      period: "/month",
      yearlyTotal: "$24,000/year",
      cons: [
        "Training required (2-4 weeks)",
        "High turnover rate",
        "Sick days & vacations",
        "Limited to 8-hour shifts",
        "Language barriers"
      ],
      highlighted: false
    },
    {
      name: "ManyChat Pro",
      price: "$145",
      period: "/month",
      yearlyTotal: "$1,740/year",
      cons: [
        "Limited AI capabilities",
        "Template restrictions",
        "24-hour messaging window",
        "Complex flow builder",
        "Extra costs for add-ons"
      ],
      highlighted: false
    },
    {
      name: "Intercom",
      price: "$499",
      period: "/month",
      yearlyTotal: "$5,988/year",
      cons: [
        "Per-seat pricing",
        "Setup fees ($2,000+)",
        "Limited WhatsApp features",
        "Requires technical team",
        "Hidden usage costs"
      ],
      highlighted: false
    },
    {
      name: "MyWhatsAgent Professional",
      price: pricing.currentPrice.replace('$', '$'),
      period: isMonthlyPricing ? "/month" : "lifetime",
      yearlyTotal: isMonthlyPricing ? "Monthly subscription - cancel anytime" : "Pay once, use forever",
      pros: [
        isMonthlyPricing ? "Low monthly fees" : "No monthly fees ever",
        "3 WhatsApp Business numbers",
        "Advanced AI with objection handling",
        "BYOK for unlimited conversations",
        "Natural AI conversations",
        "Priority support included",
        "50+ industry templates",
        isMonthlyPricing ? "Regular updates included" : "Free lifetime updates"
      ],
      highlighted: true
    }
  ];

  // Calculate 5-year costs
  const fiveYearComparison = [
    { name: "Hiring VA", cost: 120000 },
    { name: "ManyChat", cost: 8700 },
    { name: "Intercom", cost: 29940 },
    { name: "MyWhatsAgent Pro", cost: 997 }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-chart-2/10 text-chart-2 border-0 text-base px-4 py-2 font-semibold">
              <CalculatorIcon className="w-4 h-4 mr-2" />
              PRICING COMPARISON
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              {isMonthlyPricing ? 'Affordable Monthly Plans' : 'Stop Paying Forever'}
              <span className="block text-3xl lg:text-4xl mt-2 text-primary">
                {isMonthlyPricing ? 'Cancel Anytime. No Commitment.' : 'One Payment. Lifetime Access.'}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {isMonthlyPricing ?
                'Compare our affordable monthly plans with other WhatsApp automation solutions' :
                "See how much you'll save compared to other WhatsApp automation solutions"
              }
            </p>
          </div>

          {/* Comparison Table */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {competitors.map((competitor, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden hover-elevate ${
                  competitor.highlighted
                    ? 'ring-2 ring-green-500 shadow-[0_0_30px_-10px_rgba(34,197,94,0.5)] scale-105 border-0'
                    : ''
                }`}
              >
                {competitor.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-bold rounded-t-lg">
                    BEST VALUE
                  </div>
                )}

                <div className={`p-6 space-y-6 ${competitor.highlighted ? 'pt-14' : ''}`}>
                  {/* Name & Price */}
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{competitor.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">{competitor.price}</span>
                      <span className="text-muted-foreground">{competitor.period}</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {competitor.yearlyTotal}
                    </p>
                  </div>

                  {/* Features/Cons */}
                  <div className="space-y-2 min-h-[200px]">
                    {competitor.cons && competitor.cons.map((con, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <XMarkIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{con}</span>
                      </div>
                    ))}
                    {competitor.pros && competitor.pros.map((pro, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium">{pro}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  {competitor.highlighted && (
                    <Button
                      className="w-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl"
                      onClick={() => {
                        const ctaSection = document.getElementById('final-cta');
                        ctaSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {isMonthlyPricing ? 'Get Monthly Access' : 'Get Lifetime Access'}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* 5-Year Cost Comparison */}
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">5-Year Total Cost Comparison</h3>
                <p className="text-slate-300">The longer you wait, the more you pay</p>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {fiveYearComparison.map((item, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 rounded-lg ${
                      item.name === "MyWhatsAgent Pro"
                        ? 'bg-green-500/20 ring-2 ring-green-500'
                        : 'bg-white/10'
                    }`}
                  >
                    <div className="text-sm font-medium opacity-90 mb-2">{item.name}</div>
                    <div className="text-3xl font-bold">
                      ${item.cost.toLocaleString()}
                    </div>
                    {item.name !== "MyWhatsAgent Pro" && (
                      <div className="text-xs text-red-400 mt-2">
                        {Math.round(item.cost / 997)}x more expensive
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs sm:text-sm lg:text-lg px-3 lg:px-6 py-2 max-w-full inline-flex items-center flex-wrap justify-center">
                  <InformationCircleIcon className="w-4 lg:w-5 h-4 lg:h-5 mr-1 lg:mr-2 flex-shrink-0" />
                  <span className="inline-block">You save $119,003 over 5 years</span>
                  <span className="inline-block ml-1">with MyWhatsAgent Professional</span>
                </Badge>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}