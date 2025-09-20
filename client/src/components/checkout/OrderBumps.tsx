import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  UsersIcon,
  SparklesIcon,
  TrophyIcon,
  TagIcon,
  ClockIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { trackCTAClick } from '@/services/tracking';

interface OrderBump {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  icon: React.ComponentType<any>;
  features: string[];
  badge?: string;
  urgency?: string;
}

interface OrderBumpsProps {
  selectedBumps: string[];
  onBumpToggle: (bumpId: string) => void;
  tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY';
}

// Order bump configurations
const ORDER_BUMPS: Record<string, OrderBump> = {
  skool_mastermind: {
    id: 'skool_mastermind',
    name: 'Skool Mastermind Community',
    description: 'Lifetime access to private community of WhatsApp automation users',
    price: 197,
    originalPrice: 497,
    savings: 300,
    icon: UsersIcon,
    badge: 'Join 500+ Members',
    urgency: 'Only 50 spots left this month',
    features: [
      'Lifetime access to private Skool community',
      'Weekly winning campaign breakdowns',
      'Copy & steal campaign library',
      'Direct access to 6-7 figure users',
      'Industry-specific channels',
      'Monthly mastermind calls with top performers'
    ]
  },
  credits_bundle: {
    id: 'credits_bundle',
    name: '5,000 Credits Bundle',
    description: 'Never run out of conversations with this lifetime credit pack',
    price: 197,
    originalPrice: 497,
    savings: 300,
    icon: SparklesIcon,
    badge: 'Most Popular',
    urgency: '80% of customers add this',
    features: [
      '5,000 conversation credits',
      'Never expires',
      'Priority processing',
      'Early access to new AI models',
      'Covers years of usage',
      'Peace of mind guarantee'
    ]
  },
  fuegenix_blueprint: {
    id: 'fuegenix_blueprint',
    name: 'The FueGenix $15M Blueprint',
    description: 'Complete scaling blueprint from $0 to $15M revealed',
    price: 97,
    originalPrice: 297,
    savings: 200,
    icon: TrophyIcon,
    badge: 'Steal Our Playbook',
    urgency: 'Only sharing with first 100 customers',
    features: [
      'Complete $15M scaling blueprint',
      'Website & conversion secrets',
      'Meta ads exact campaigns',
      'SEO & Google Ads formula',
      'Guerrilla marketing tactics',
      'CRM for $50k deals'
    ]
  }
};

// Get relevant bumps based on tier
function getRelevantBumps(tier: string): OrderBump[] {
  const allBumps = Object.values(ORDER_BUMPS);

  // All tiers get all bumps, but we could filter based on tier if needed
  return allBumps;
}

export default function OrderBumps({ selectedBumps, onBumpToggle, tier }: OrderBumpsProps) {
  const relevantBumps = getRelevantBumps(tier);

  // Handle order bump toggle
  const handleBumpToggle = (bumpId: string, isChecked: boolean) => {
    onBumpToggle(bumpId);

    // Track bump selection
    trackCTAClick(
      isChecked ? `Add Order Bump: ${ORDER_BUMPS[bumpId]?.name}` : `Remove Order Bump: ${ORDER_BUMPS[bumpId]?.name}`,
      'order-bumps'
    );
  };

  if (relevantBumps.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 w-full overflow-hidden">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2 break-words">
          <SparklesIcon className="w-5 h-5 text-primary" />
          Boost Your Results
        </h3>
        <p className="text-sm text-muted-foreground break-words">
          Add these proven resources to accelerate your success
        </p>
      </div>

      <div className="space-y-4">
        {relevantBumps.map((bump) => {
          const isSelected = selectedBumps.includes(bump.id);

          return (
            <Card
              key={bump.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg w-full cursor-pointer ${
                isSelected
                  ? 'border-2 border-primary shadow-md'
                  : 'hover:border-primary/30'
              }`}
              onClick={() => handleBumpToggle(bump.id, !isSelected)}
            >

              <div className="p-4 relative">
                {/* Checkbox in corner */}
                <div
                  className="absolute top-4 right-4 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    id={bump.id}
                    checked={isSelected}
                    onCheckedChange={(checked) => handleBumpToggle(bump.id, checked as boolean)}
                  />
                </div>

                <div className="space-y-4 pr-8 min-w-0 overflow-hidden">
                    {/* Title and badge */}
                    <div className="space-y-3 w-full">
                      {/* Title with icon */}
                      <div className="flex items-center gap-2 w-full">
                        <bump.icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <h4 className="font-semibold text-base sm:text-lg break-words leading-tight min-w-0 flex-1">{bump.name}</h4>
                      </div>

                      {/* Pricing and badges */}
                      <div className="space-y-2 w-full">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">${bump.price}</span>
                          {bump.badge && (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                              {bump.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground line-through">
                            ${bump.originalPrice}
                          </span>
                          <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                            <TagIcon className="w-3 h-3 mr-1" />
                            Save ${bump.savings}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground break-words">{bump.description}</p>

                      {bump.urgency && (
                        <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                          <ClockIcon className="w-4 h-4" />
                          <span className="font-medium">{bump.urgency}</span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-2 w-full overflow-hidden">
                      <p className="text-sm font-medium text-muted-foreground break-words">What's included:</p>
                      <div className="space-y-2 w-full">
                        {bump.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2 min-w-0 w-full">
                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground break-words min-w-0 flex-1">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>


                    {/* Call to action hint */}
                    <div className="flex items-center justify-between pt-2 gap-2">
                      <div className="text-sm text-muted-foreground min-w-0 flex-1">
                        {isSelected ? (
                          <span className="text-green-600 font-medium flex items-center gap-1">
                            <CheckIcon className="w-4 h-4 flex-shrink-0" />
                            <span className="break-words">Added to your order</span>
                          </span>
                        ) : (
                          <span className="break-words">Click to add this to your order</span>
                        )}
                      </div>

                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        One-time offer
                      </Badge>
                    </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Summary for selected bumps */}
      {selectedBumps.length > 0 && (
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-green-700 dark:text-green-300">
                {selectedBumps.length} add-on{selectedBumps.length > 1 ? 's' : ''} selected
              </span>
              <span className="font-bold text-green-700 dark:text-green-300">
                +${selectedBumps.reduce((total, bumpId) => {
                  const bump = ORDER_BUMPS[bumpId];
                  return total + (bump ? bump.price : 0);
                }, 0).toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              Total savings: ${selectedBumps.reduce((total, bumpId) => {
                const bump = ORDER_BUMPS[bumpId];
                return total + (bump ? bump.savings : 0);
              }, 0).toLocaleString()}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}