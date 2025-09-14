import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  CheckIcon,
  XMarkIcon,
  ChartBarIcon,
  SparklesIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";
import { useDealPricing, useFormattedPrice } from "@/hooks/useDealPricing";

export default function FeatureComparison() {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0]));
  const dealPricing = useDealPricing();
  const pricing = useFormattedPrice();

  const isMonthlyPricing = dealPricing.dealStatus === 'final_expired';

  const toggleCategory = (index: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCategories(newExpanded);
  };
  const features = [
    {
      category: "AI & Conversation",
      items: [
        {
          feature: "Natural AI Conversations",
          whatsagent: true,
          manychat: false,
          chatfuel: false,
          humanva: true,
          tooltip: "Adaptive conversations that feel human"
        },
        {
          feature: "Handles Complex Objections",
          whatsagent: true,
          manychat: false,
          chatfuel: false,
          humanva: true,
          tooltip: "Intelligently responds to customer concerns"
        },
        {
          feature: "Context Memory",
          whatsagent: true,
          manychat: "limited",
          chatfuel: "limited",
          humanva: true,
          tooltip: "Remembers entire conversation history"
        },
        {
          feature: "Multi-Language Support",
          whatsagent: "52 languages",
          manychat: "20 languages",
          chatfuel: "7 languages",
          humanva: "varies",
          tooltip: "Number of supported languages"
        }
      ]
    },
    {
      category: "WhatsApp Features",
      items: [
        {
          feature: "No API Restrictions",
          whatsagent: true,
          manychat: false,
          chatfuel: false,
          humanva: "N/A",
          tooltip: "Bypass 24-hour messaging window"
        },
        {
          feature: "No Template Requirements",
          whatsagent: true,
          manychat: false,
          chatfuel: false,
          humanva: "N/A",
          tooltip: "Send any message without pre-approval"
        },
        {
          feature: "Media & Voice Messages",
          whatsagent: true,
          manychat: true,
          chatfuel: true,
          humanva: true,
          tooltip: "Send images, videos, voice notes"
        },
        {
          feature: "Group Messages",
          whatsagent: true,
          manychat: false,
          chatfuel: false,
          humanva: true,
          tooltip: "Manage group conversations"
        }
      ]
    },
    {
      category: "Sales & Automation",
      items: [
        {
          feature: "Closes Deals Autonomously",
          whatsagent: true,
          manychat: false,
          chatfuel: false,
          humanva: true,
          tooltip: "Complete sales without human intervention"
        },
        {
          feature: "Negotiates Pricing",
          whatsagent: true,
          manychat: false,
          chatfuel: false,
          humanva: true,
          tooltip: "Handles price discussions and discounts"
        },
        {
          feature: "Books Appointments",
          whatsagent: true,
          manychat: true,
          chatfuel: true,
          humanva: true,
          tooltip: "Schedule meetings automatically"
        },
        {
          feature: "Payment Processing",
          whatsagent: true,
          manychat: "limited",
          chatfuel: "limited",
          humanva: "manual",
          tooltip: "Accept payments in chat"
        }
      ]
    },
    {
      category: "Availability & Pricing",
      items: [
        {
          feature: "Works 24/7/365",
          whatsagent: true,
          manychat: true,
          chatfuel: true,
          humanva: false,
          tooltip: "Always available, never sleeps"
        },
        {
          feature: "Unlimited Conversations",
          whatsagent: true,
          manychat: false,
          chatfuel: false,
          humanva: false,
          tooltip: "No limits on chat volume"
        },
        {
          feature: "One-Time Payment",
          whatsagent: true,
          manychat: false,
          chatfuel: false,
          humanva: false,
          tooltip: "Pay once, use forever"
        },
        {
          feature: "Cost",
          whatsagent: isMonthlyPricing ? `${pricing.currentPrice}/month` : `${pricing.currentPrice} lifetime`,
          manychat: "$145/month",
          chatfuel: "$79/month",
          humanva: "$2000/month",
          tooltip: "Total cost of ownership"
        }
      ]
    }
  ];

  const renderValue = (value: any, compact: boolean = false) => {
    if (value === true) {
      return (
        <div className="flex justify-center">
          <div className={`${compact ? 'w-5 h-5' : 'w-8 h-8'} bg-green-500/10 rounded-full flex items-center justify-center`}>
            <CheckIcon className={`${compact ? 'w-3 h-3' : 'w-5 h-5'} text-green-500`} />
          </div>
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="flex justify-center">
          <div className={`${compact ? 'w-5 h-5' : 'w-8 h-8'} bg-red-500/10 rounded-full flex items-center justify-center`}>
            <XMarkIcon className={`${compact ? 'w-3 h-3' : 'w-5 h-5'} text-red-500`} />
          </div>
        </div>
      );
    }
    if (value === "N/A") {
      return (
        <div className={`text-center text-muted-foreground ${compact ? 'text-xs' : 'text-sm'}`}>N/A</div>
      );
    }
    if (value === "limited") {
      return (
        <div className={`text-center text-orange-500 ${compact ? 'text-xs' : 'text-sm'} font-medium`}>Limited</div>
      );
    }
    // For text values, truncate if too long for mobile
    const displayValue = compact && typeof value === 'string' && value.length > 15
      ? value.substring(0, 12) + '...'
      : value;
    return (
      <div className={`text-center ${compact ? 'text-xs' : 'text-sm'} font-medium text-foreground break-words`}>{displayValue}</div>
    );
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-chart-1/10 text-chart-1 border-0 text-base px-4 py-2 font-semibold">
              <ChartBarIcon className="w-4 h-4 mr-2" />
              DETAILED COMPARISON
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              MyWhatsAgent vs The Competition
              <span className="block text-3xl lg:text-4xl mt-2 text-primary">
                See Why We're 10x Better
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A feature-by-feature breakdown showing exactly why MyWhatsAgent dominates the market
            </p>
          </div>

          {/* Mobile View - Cards */}
          <div className="block lg:hidden space-y-4">
            {/* Mobile Summary Card */}
            <Card className="p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-green-200 dark:border-green-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <SparklesIcon className="w-4 h-4 text-green-500" />
                    <span className="font-bold text-xs sm:text-sm">MyWhatsAgent Wins</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">16/16 Features</div>
                </div>
                <Badge className="bg-green-500/20 text-green-600 border-0 px-2 sm:px-3 py-1 text-xs sm:text-sm self-start sm:self-auto">
                  BEST
                </Badge>
              </div>
            </Card>

            {features.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryIndex)}
                  className="w-full p-4 bg-muted/50 flex items-center justify-between hover:bg-muted/70 transition-colors"
                >
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    {category.category}
                  </h3>
                  {expandedCategories.has(categoryIndex) ? (
                    <ChevronUpIcon className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {/* Category Items */}
                {expandedCategories.has(categoryIndex) && (
                  <div className="p-3 space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <Card key={itemIndex} className="p-3 bg-muted/20">
                        {/* Feature Name */}
                        <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-2">
                          {item.feature}
                        </h4>

                        {/* MyWhatsAgent - Always First & Highlighted */}
                        <div className="mb-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1">
                              <SparklesIcon className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span className="font-semibold text-xs truncate">MyWhatsAgent</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {renderValue(item.whatsagent, true)}
                              {item.whatsagent === true && (
                                <Badge className="bg-green-500/20 text-green-600 border-0 text-[10px] px-1 py-0.5 ml-1">
                                  WIN
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Competitors Grid */}
                        <div className="grid grid-cols-3 gap-1 text-[10px]">
                          <div className="p-1.5 bg-background rounded border border-border">
                            <div className="font-medium text-muted-foreground mb-0.5 truncate">ManyChat</div>
                            <div className="flex justify-center">
                              {renderValue(item.manychat, true)}
                            </div>
                          </div>
                          <div className="p-1.5 bg-background rounded border border-border">
                            <div className="font-medium text-muted-foreground mb-0.5 truncate">Chatfuel</div>
                            <div className="flex justify-center">
                              {renderValue(item.chatfuel, true)}
                            </div>
                          </div>
                          <div className="p-1.5 bg-background rounded border border-border">
                            <div className="font-medium text-muted-foreground mb-0.5 truncate">Human VA</div>
                            <div className="flex justify-center">
                              {renderValue(item.humanva, true)}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Desktop View - Table */}
          <Card className="overflow-hidden hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-semibold text-foreground min-w-[250px]">
                      Feature
                    </th>
                    <th className="p-4 text-center min-w-[120px]">
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <SparklesIcon className="w-5 h-5 text-green-500" />
                          <span className="font-bold text-foreground">MyWhatsAgent</span>
                        </div>
                        <Badge className="bg-green-500/10 text-green-600 border-0 text-xs">
                          RECOMMENDED
                        </Badge>
                      </div>
                    </th>
                    <th className="p-4 text-center font-semibold text-muted-foreground min-w-[120px]">
                      ManyChat
                    </th>
                    <th className="p-4 text-center font-semibold text-muted-foreground min-w-[120px]">
                      Chatfuel
                    </th>
                    <th className="p-4 text-center font-semibold text-muted-foreground min-w-[120px]">
                      Human VA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, categoryIndex) => (
                    <React.Fragment key={`category-${categoryIndex}`}>
                      <tr className="bg-muted/30">
                        <td colSpan={5} className="p-3 font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((item, itemIndex) => (
                        <tr
                          key={`item-${categoryIndex}-${itemIndex}`}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                        >
                          <td className="p-4 text-sm font-medium text-foreground">
                            {item.feature}
                          </td>
                          <td className="p-4 bg-green-50/50 dark:bg-green-950/20">
                            {renderValue(item.whatsagent)}
                          </td>
                          <td className="p-4">
                            {renderValue(item.manychat)}
                          </td>
                          <td className="p-4">
                            {renderValue(item.chatfuel)}
                          </td>
                          <td className="p-4">
                            {renderValue(item.humanva)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Bottom Summary */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center hover-elevate">
              <div className="text-4xl font-bold text-green-500 mb-2">16/16</div>
              <div className="text-sm font-semibold text-foreground mb-1">Features MyWhatsAgent Wins</div>
              <div className="text-xs text-muted-foreground">Complete domination across all categories</div>
            </Card>
            <Card className="p-6 text-center hover-elevate">
              <div className="text-4xl font-bold text-primary mb-2">$239K</div>
              <div className="text-sm font-semibold text-foreground mb-1">You Save Over 5 Years</div>
              <div className="text-xs text-muted-foreground">Compared to hiring a VA</div>
            </Card>
            <Card className="p-6 text-center hover-elevate">
              <div className="text-4xl font-bold text-chart-1 mb-2">∞</div>
              <div className="text-sm font-semibold text-foreground mb-1">ROI Potential</div>
              <div className="text-xs text-muted-foreground">No monthly fees = infinite returns</div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}