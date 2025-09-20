import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  CreditCardIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface TrustBadge {
  icon: React.ComponentType<any>;
  text: string;
  subtext?: string;
  color?: string;
}

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'grid';
  showTestimonial?: boolean;
  className?: string;
}

const SECURITY_BADGES: TrustBadge[] = [
  {
    icon: ShieldCheckIcon,
    text: '256-bit SSL',
    subtext: 'Bank-level security',
    color: 'text-green-500'
  },
  {
    icon: LockClosedIcon,
    text: 'PCI Compliant',
    subtext: 'Stripe protected',
    color: 'text-blue-500'
  },
  {
    icon: CreditCardIcon,
    text: 'Secure Payments',
    subtext: 'No card details stored',
    color: 'text-purple-500'
  }
];

const GUARANTEE_BADGES: TrustBadge[] = [
  {
    icon: ClockIcon,
    text: '30-Day Guarantee',
    subtext: '100% money back',
    color: 'text-orange-500'
  },
  {
    icon: CheckCircleIcon,
    text: 'Instant Access',
    subtext: 'Setup in 5 minutes',
    color: 'text-green-500'
  },
  {
    icon: HeartIcon,
    text: 'Customer Love',
    subtext: '4.9/5 rating',
    color: 'text-red-500'
  }
];

const SOCIAL_PROOF: TrustBadge[] = [
  {
    icon: UserGroupIcon,
    text: '2,847+ Customers',
    subtext: 'Growing daily',
    color: 'text-blue-500'
  },
  {
    icon: StarIcon,
    text: 'Top Rated',
    subtext: 'Industry leading',
    color: 'text-yellow-500'
  }
];

export default function TrustBadges({
  variant = 'horizontal',
  showTestimonial = false,
  className = ''
}: TrustBadgesProps) {
  const allBadges = [...SECURITY_BADGES, ...GUARANTEE_BADGES];

  const renderBadge = (badge: TrustBadge, index: number) => (
    <div key={index} className="flex items-center gap-2 text-sm">
      <badge.icon className={`w-4 h-4 ${badge.color || 'text-primary'}`} />
      <div>
        <div className="font-medium text-foreground">{badge.text}</div>
        {badge.subtext && (
          <div className="text-xs text-muted-foreground">{badge.subtext}</div>
        )}
      </div>
    </div>
  );

  const testimonial = {
    text: "WhatsAgent increased our conversion rate by 340% in just 2 weeks. The setup was incredibly simple!",
    author: "Sarah Martinez",
    company: "E-commerce Store Owner",
    rating: 5
  };

  if (variant === 'grid') {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Security badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SECURITY_BADGES.map(renderBadge)}
        </div>

        {/* Guarantee badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GUARANTEE_BADGES.map(renderBadge)}
        </div>

        {/* Social proof */}
        <div className="grid grid-cols-2 gap-4">
          {SOCIAL_PROOF.map(renderBadge)}
        </div>

        {/* Testimonial */}
        {showTestimonial && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-sm italic text-muted-foreground">
              "{testimonial.text}"
            </blockquote>
            <cite className="text-xs font-medium text-foreground">
              — {testimonial.author}, {testimonial.company}
            </cite>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {allBadges.map(renderBadge)}
        {showTestimonial && (
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <StarIcon key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-xs italic text-muted-foreground">
              "{testimonial.text}"
            </blockquote>
            <cite className="text-xs font-medium text-foreground">
              — {testimonial.author}
            </cite>
          </div>
        )}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main badges row */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
        {SECURITY_BADGES.slice(0, 3).map((badge, index) => (
          <div key={index} className="flex items-center gap-1">
            <badge.icon className={`w-3 h-3 ${badge.color || 'text-primary'}`} />
            <span>{badge.text}</span>
          </div>
        ))}
      </div>

      {/* Guarantee badges */}
      <div className="flex justify-center">
        <Badge variant="secondary" className="text-xs">
          <ClockIcon className="w-3 h-3 mr-1" />
          30-day money-back guarantee
        </Badge>
      </div>

      {/* Customer count */}
      <div className="text-center text-xs text-muted-foreground">
        <UserGroupIcon className="w-4 h-4 inline mr-1" />
        Trusted by 2,847+ businesses worldwide
      </div>

      {/* Testimonial */}
      {showTestimonial && (
        <div className="text-center max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-sm italic text-muted-foreground">
            "{testimonial.text}"
          </blockquote>
          <cite className="text-xs font-medium text-foreground">
            — {testimonial.author}
          </cite>
        </div>
      )}
    </div>
  );
}