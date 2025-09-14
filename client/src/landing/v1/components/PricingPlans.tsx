import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  FireIcon,
  BuildingOfficeIcon,
  InformationCircleIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { trackCTAClick } from "@/services/tracking";
import { useDealPricing, useFormattedPrice } from "@/hooks/useDealPricing";

interface PricingTier {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  icon: React.ComponentType<any>;
  popular?: boolean;
  features: string[];
  limitations?: string[];
  creditsIncluded: string;
  whatsappNumbers: string;
  buttonText: string;
  buttonVariant?: "default" | "outline";
  highlighted?: boolean;
}

export default function PricingPlans() {
  const dealPricing = useDealPricing();
  const starterPricing = useFormattedPrice('STARTER');
  const professionalPricing = useFormattedPrice('PROFESSIONAL');
  const agencyPricing = useFormattedPrice('AGENCY');

  const isMonthlyPricing = dealPricing.dealStatus === 'final_expired';


  const tiers: PricingTier[] = [
    {
      name: "Starter",
      price: starterPricing.currentPrice,
      description: "Perfect for small businesses",
      icon: FireIcon,
      creditsIncluded: "500 credits included (~250 conversations)",
      whatsappNumbers: "1 WhatsApp Business Account",
      features: [
        "20k character AI instructions limit",
        "20 AI responses per chat",
        "Incoming messages only",
        "Voice note understanding",
        "Unlimited contacts",
        "One-click campaign optimization",
        "Basic analytics",
        "BYOK: Connect your OpenAI/Claude API",
        "Email support"
      ],
      buttonText: "Get Starter",
      buttonVariant: "outline"
    },
    {
      name: "Professional",
      price: professionalPricing.currentPrice,
      originalPrice: "$11,964/year with others",
      description: "For growing businesses",
      icon: BoltIcon,
      popular: true,
      highlighted: true,
      creditsIncluded: "2,000 credits included (~1,000 conversations)",
      whatsappNumbers: "3 WhatsApp Business Accounts",
      features: [
        "100k character AI instructions limit",
        "Unlimited AI responses per chat",
        "Outgoing campaigns",
        "Image understanding",
        "Video understanding",
        "Document understanding (PDF, DOC)",
        "Voice note understanding",
        "Automatic follow-ups",
        "Real-time web search",
        "Custom functions",
        "Webhooks & API access",
        "Advanced mode",
        "AI appointment booking",
        "Contact tagging & segmentation",
        "Priority support (2-hour response)",
        "BYOK: Connect your OpenAI/Claude API",
        "Everything in Starter"
      ],
      buttonText: "Get Professional",
      buttonVariant: "default"
    },
    {
      name: "Agency",
      price: agencyPricing.currentPrice,
      originalPrice: "$59,640 over 5 years with others",
      description: "Build your own AI agency",
      icon: BuildingOfficeIcon,
      creditsIncluded: "10,000 credits included (~5,000 conversations)",
      whatsappNumbers: "Unlimited WhatsApp Accounts",
      features: [
        "Everything in Professional PLUS:",
        "Unlimited sub-accounts",
        "Full white-labeling",
        "Personalized onboarding",
        "Priority support",
        "Early access to new features",
        "Roadmap priority",
        "BYOK: Use for yourself AND your clients"
      ],
      buttonText: "Get Agency",
      buttonVariant: "outline"
    }
  ];

  const handlePricingClick = (tierName: string, price: string) => {
    trackCTAClick(`Select ${tierName} Plan`, "pricing-plans");
    // Scroll to CTA section
    const ctaSection = document.getElementById('final-cta');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <Badge className={`border-0 text-base px-4 py-2 font-semibold ${
              dealPricing.isFirstExpired || dealPricing.isFinalExpired ?
              'bg-red-500/20 text-red-600 dark:text-red-400' :
              'bg-primary/10 text-primary'
            }`}>
              <SparklesIcon className="w-4 h-4 mr-2" />
              {dealPricing.isFinalExpired ? 'MONTHLY PRICING' :
               dealPricing.isFirstExpired ? 'LAST CHANCE LIFETIME' :
               'LIFETIME PRICING'}
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              {dealPricing.isFinalExpired ? 'Monthly Plans Available' :
               dealPricing.isFirstExpired ? 'Last Chance for Lifetime Access' :
               'Choose Your WhatsAgent Plan'}
              <span className="block text-3xl lg:text-4xl mt-2 text-primary">
                {dealPricing.isFinalExpired ? 'Monthly Subscription Pricing' :
                 dealPricing.isFirstExpired ? 'Higher Prices - Still Lifetime' :
                 'Pay Once, Use Forever'}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {dealPricing.isFinalExpired ?
                'Lifetime deals are no longer available. Monthly plans only.' :
                dealPricing.isFirstExpired ?
                'Original deal expired. Get lifetime access at higher prices before it becomes monthly only.' :
                'True lifetime access with BYOK (Bring Your Own Key) support. No monthly fees, no hidden costs.'
              }
            </p>
          </div>

          {/* BYOK Explanation */}
          <Card className="p-6 mb-16 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <div className="flex items-start gap-4">
              <InformationCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Two Ways to Use WhatsAgent</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p>
                    <strong>Option 1 - Unlimited Plan:</strong> Connect your OpenAI or Claude API key for unlimited AI conversations
                  </p>
                  <p>
                    <strong>Option 2 - Convenience Plan:</strong> Use included credits to get started, top up as needed
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-2">
                    {isMonthlyPricing ?
                      'Most users connect their API keys for unlimited use at low monthly rates!' :
                      "Most users connect their API keys for unlimited use - that's the real value of lifetime access!"
                    }
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-16 md:gap-6 lg:gap-8 mb-16">
            {tiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden hover-elevate transition-all duration-300 ${
                  tier.highlighted
                    ? 'ring-2 ring-green-500 shadow-[0_0_30px_-10px_rgba(34,197,94,0.5)] scale-105 border-0'
                    : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 text-sm font-bold">
                    ⭐ MOST POPULAR - BEST VALUE
                  </div>
                )}

                <div className={`p-6 space-y-6 ${tier.popular ? 'pt-14' : ''}`}>
                  {/* Header */}
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <tier.icon className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-foreground">{tier.price}</span>
                      <span className="text-muted-foreground">{isMonthlyPricing ? '/month' : 'lifetime'}</span>
                    </div>
                    {tier.originalPrice && !isMonthlyPricing && (
                      <p className="text-sm text-muted-foreground">
                        vs {tier.originalPrice}
                      </p>
                    )}
                    {!isMonthlyPricing && (
                      <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                        Pay once, use forever
                      </Badge>
                    )}
                  </div>

                  {/* Credits & Numbers */}
                  <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">{tier.creditsIncluded}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChatBubbleLeftRightIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{tier.whatsappNumbers}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 min-h-[300px]">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Everything included:
                    </h4>
                    <div className="space-y-2">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    size="lg"
                    variant={tier.buttonVariant}
                    className={`w-full ${
                      tier.highlighted
                        ? 'bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5)]'
                        : ''
                    } transform hover:translate-y-[-1px] transition-all duration-200`}
                    onClick={() => handlePricingClick(tier.name, tier.price)}
                  >
                    {tier.buttonText}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Feature Comparison</h3>

            {/* Mobile View - Cards */}
            <div className="block lg:hidden space-y-2">
              {/* Feature Cards */}
              {[
                { name: "AI Instructions Limit", starter: "20k", professional: "100k", agency: "100k" },
                { name: "AI Responses per Chat", starter: "20", professional: "Unlimited", agency: "Unlimited" },
                { name: "Campaign Type", starter: "Incoming", professional: "In + Out", agency: "All" },
                { name: "Voice Note Understanding", starter: true, professional: true, agency: true },
                { name: "Image Understanding", starter: false, professional: true, agency: true },
                { name: "AI Appointment Booking", starter: false, professional: true, agency: true },
                { name: "Video Understanding", starter: false, professional: true, agency: true },
                { name: "Document Understanding", starter: false, professional: true, agency: true },
                { name: "Real-time Web Search", starter: false, professional: true, agency: true },
                { name: "Automatic Follow-ups", starter: false, professional: true, agency: true },
                { name: "API & Webhooks", starter: false, professional: true, agency: true },
                { name: "White-label", starter: false, professional: false, agency: true }
              ].map((feature, index) => (
                <Card key={index} className="p-3 bg-muted/20">
                  <h4 className="font-semibold text-xs text-foreground mb-2">{feature.name}</h4>
                  <div className="grid grid-cols-3 gap-1 text-[10px]">
                    {/* Starter */}
                    <div className="p-1.5 bg-background rounded border border-border">
                      <div className="font-medium text-muted-foreground mb-0.5 text-center text-[9px]">Starter</div>
                      <div className="text-center">
                        {typeof feature.starter === 'boolean' ? (
                          feature.starter ? (
                            <div className="inline-flex items-center justify-center w-4 h-4 bg-green-500/10 rounded-full">
                              <CheckIcon className="w-2.5 h-2.5 text-green-500" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-4 h-4 bg-red-500/10 rounded-full">
                              <XMarkIcon className="w-2.5 h-2.5 text-red-500" />
                            </div>
                          )
                        ) : (
                          <span className="text-foreground font-medium block break-all">{feature.starter}</span>
                        )}
                      </div>
                    </div>

                    {/* Professional - Highlighted */}
                    <div className="p-1.5 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                      <div className="font-medium text-green-700 dark:text-green-400 mb-0.5 text-center text-[9px]">Pro</div>
                      <div className="text-center">
                        {typeof feature.professional === 'boolean' ? (
                          feature.professional ? (
                            <div className="inline-flex items-center justify-center w-4 h-4 bg-green-500/10 rounded-full">
                              <CheckIcon className="w-2.5 h-2.5 text-green-500" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-4 h-4 bg-red-500/10 rounded-full">
                              <XMarkIcon className="w-2.5 h-2.5 text-red-500" />
                            </div>
                          )
                        ) : (
                          <span className="text-green-700 dark:text-green-400 font-medium block break-all">{feature.professional}</span>
                        )}
                      </div>
                      {index === 0 && (
                        <Badge className="bg-green-500/20 text-green-600 border-0 text-[8px] px-0.5 py-0 mt-0.5 w-full justify-center">
                          BEST
                        </Badge>
                      )}
                    </div>

                    {/* Agency */}
                    <div className="p-1.5 bg-background rounded border border-border">
                      <div className="font-medium text-muted-foreground mb-0.5 text-center text-[9px]">Agency</div>
                      <div className="text-center">
                        {typeof feature.agency === 'boolean' ? (
                          feature.agency ? (
                            <div className="inline-flex items-center justify-center w-4 h-4 bg-green-500/10 rounded-full">
                              <CheckIcon className="w-2.5 h-2.5 text-green-500" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-4 h-4 bg-red-500/10 rounded-full">
                              <XMarkIcon className="w-2.5 h-2.5 text-red-500" />
                            </div>
                          )
                        ) : (
                          <span className="text-foreground font-medium block break-all">{feature.agency}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop View - Table */}
            <Card className="p-4 sm:p-8 hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4">Feature</th>
                      <th className="text-center py-2 sm:py-3 px-2 sm:px-4">Starter</th>
                      <th className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">Professional</th>
                      <th className="text-center py-2 sm:py-3 px-2 sm:px-4">Agency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">AI Instructions Limit</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">20k chars</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">100k chars</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">100k chars</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">AI Responses per Chat</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">20</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">Unlimited</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Campaign Type</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Incoming only</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">In + Outgoing</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">All + Combined</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Voice Note Understanding</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">✅</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Image Understanding</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">❌</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">✅</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">AI Appointment Booking</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">❌</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">✅</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Video Understanding</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">❌</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">✅</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Document Understanding</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">❌</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">✅</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Real-time Web Search</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">❌</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">✅</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Automatic Follow-ups</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">❌</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">✅</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">API & Webhooks</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">❌</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">✅</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">White-label</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">❌</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4 bg-green-50 dark:bg-green-950/20">❌</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Bottom Comparison */}
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">
                  {isMonthlyPricing ? 'Why Choose Monthly Plans' : 'Why Lifetime Beats Monthly'}
                </h3>
                <p className="text-slate-300">
                  {isMonthlyPricing ?
                    'Affordable monthly pricing with all features included. No long-term commitments.' :
                    'Others charge $27-$497/month forever. We charge once. You own it.'
                  }
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-400">
                    {isMonthlyPricing ? 'Low' : '$0'}
                  </div>
                  <div className="text-sm text-slate-300">
                    {isMonthlyPricing ? 'Monthly fees starting at $197' : 'Monthly fees after purchase'}
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-400">Unlimited</div>
                  <div className="text-sm text-slate-300">Conversations with BYOK</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-400">
                    {isMonthlyPricing ? 'Cancel' : 'Forever'}
                  </div>
                  <div className="text-sm text-slate-300">
                    {isMonthlyPricing ? 'Anytime - no contracts' : 'Access & updates included'}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs sm:text-sm lg:text-lg px-3 sm:px-6 py-1.5 sm:py-2 whitespace-normal max-w-full inline-flex items-center flex-wrap justify-center">
                  <InformationCircleIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                  {isMonthlyPricing ? (
                    <>
                      <span className="inline-block">Note: Lifetime deals are no longer available.</span>
                      <span className="inline-block ml-1">Monthly plans only!</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-block">Important: Lifetime deals cannot be upgraded later.</span>
                      <span className="inline-block ml-1">Choose wisely!</span>
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}