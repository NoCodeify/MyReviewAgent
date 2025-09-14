import HeroSection from "./components/HeroSection";
import ABTestDashboardV2 from "./components/ABTestDashboardV2";
import DashboardLink from "@/components/DashboardLink";
import ROICalculator from "./components/ROICalculator";
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

/**
 * Version B: Value-Focused Flow
 * Based on Pabbly's strategy - immediate ROI focus
 * Streamlined from 18 to 8 core components
 */
export default function LandingV1B() {
  // Initialize tracking
  useEffect(() => {
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
      <ABTestDashboardV2 />
      <DashboardLink />
      <StickyHeader />
      <ScarcityIndicator />
      <ExitIntent />

      {/* 1. Hook with the big promise */}
      <HeroSection />

      {/* 2. Show immediate value/ROI */}
      <ROICalculator />

      {/* 3. Price comparison - savings focus */}
      <CompetitorPricing />

      {/* 4. Prove it works */}
      <WhatsAppScreenshots />

      {/* 5. Trust indicators merged */}
      <CustomerLogos />
      <SocialProofSection />

      {/* 6. Stack the value */}
      <BonusStack />

      {/* 7. Create urgency with qualification */}
      <NotForSection />

      {/* 8. Final CTA */}
      <CTASection />
    </div>
  );
}