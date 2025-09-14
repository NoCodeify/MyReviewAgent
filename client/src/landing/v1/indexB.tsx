import HeroSection from "./components/HeroSection";
import ABTestDashboard from "./components/ABTestDashboard";
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

/**
 * Version B: Value-Focused Flow
 * Based on Pabbly's strategy - immediate ROI focus
 * Streamlined from 18 to 8 core components
 */
export default function LandingV1B() {
  return (
    <div className="min-h-screen">
      {/* Persistent Components */}
      <ABTestDashboard />
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