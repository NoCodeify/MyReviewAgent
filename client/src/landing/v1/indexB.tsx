import HeroSection from "./components/HeroSection";
import ROICalculator from "./components/ROICalculator";
import PricingPlans from "./components/PricingPlans";
import CompetitorPricing from "./components/CompetitorPricing";
import WhatsAppScreenshots from "./components/WhatsAppScreenshots";
import CustomerLogos from "./components/CustomerLogos";
import SocialProofSection from "./components/SocialProofSection";
import BonusStack from "./components/BonusStack";
import NotForSection from "./components/NotForSection";
import CTASection from "./components/CTASection";
import StickyHeader from "./components/StickyHeader";
import ScarcityIndicator from "./components/ScarcityIndicator";
import ExitIntent from "./components/ExitIntent";
import { useEffect } from "react";
import { trackPageView, updateSession, trackScrollMilestone } from "@/services/tracking";

// Extend window for Clarity
declare global {
  interface Window {
    clarity: (action: string, key: string, value: string) => void;
  }
}

/**
 * Version B: Value-Focused Flow
 * Based on Pabbly's strategy - immediate ROI focus
 * Streamlined from 18 to 8 core components
 */
export default function LandingV1B() {
  // Track page version in Clarity
  useEffect(() => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('set', 'page_version', 'version_b');
      window.clarity('set', 'components', '8');
      window.clarity('set', 'strategy', 'value_focused');
    }
    trackPageView();

    // Set up scroll tracking
    let scrollMilestones = [25, 50, 75, 90];
    let trackedMilestones = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / scrollHeight) * 100;

      for (const milestone of scrollMilestones) {
        if (scrollPercentage >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          trackScrollMilestone(milestone);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      updateSession();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Persistent Components */}
      <StickyHeader />
      <ScarcityIndicator />
      <ExitIntent />

      {/* 1. Hook with the big promise */}
      <HeroSection />

      {/* 2. Show immediate value/ROI */}
      <ROICalculator />

      {/* 3. Show pricing options */}
      <div id="pricing-plans">
        <PricingPlans />
      </div>

      {/* 4. Price comparison - savings focus */}
      <CompetitorPricing />

      {/* 5. Prove it works */}
      <WhatsAppScreenshots />

      {/* 6. Trust indicators merged */}
      <CustomerLogos />
      <SocialProofSection />

      {/* 7. Stack the value */}
      <BonusStack />

      {/* 8. Create urgency with qualification */}
      <NotForSection />

      {/* 9. Final CTA */}
      <CTASection />
    </div>
  );
}