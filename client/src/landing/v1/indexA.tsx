import HeroSection from "./components/HeroSection";
import ABTestDashboard from "./components/ABTestDashboard";
import ProblemAgitation from "./components/ProblemAgitation";
import BiggestMistakes from "./components/BiggestMistakes";
import WhatsAppScreenshots from "./components/WhatsAppScreenshots";
import ROICalculator from "./components/ROICalculator";
import CompetitorPricing from "./components/CompetitorPricing";
import CaseStudyCarousel from "./components/CaseStudyCarousel";
import SocialProofSection from "./components/SocialProofSection";
import FounderStory from "./components/FounderStory";
import CTASection from "./components/CTASection";
import StickyHeader from "./components/StickyHeader";
import ScarcityIndicator from "./components/ScarcityIndicator";
import ExitIntent from "./components/ExitIntent";

/**
 * Version A: Problem-Focused Flow
 * Based on Clepher's strategy - 70% problem agitation, 30% solution
 * Streamlined from 18 to 10 core components
 */
export default function LandingV1A() {
  return (
    <div className="min-h-screen">
      {/* Persistent Components */}
      <ABTestDashboard />
      <StickyHeader />
      <ScarcityIndicator />
      <ExitIntent />

      {/* 1. Hook with the big promise */}
      <HeroSection />

      {/* 2. Agitate the problem deeply */}
      <ProblemAgitation />
      <BiggestMistakes />

      {/* 3. Show the solution works */}
      <WhatsAppScreenshots />

      {/* 4. Prove the value */}
      <ROICalculator />

      {/* 5. Compare to alternatives */}
      <CompetitorPricing />

      {/* 6. Social proof & case studies merged */}
      <div className="space-y-0">
        <CaseStudyCarousel />
        <SocialProofSection />
      </div>

      {/* 7. Personal touch & guarantee */}
      <FounderStory />

      {/* 8. Final push with urgency */}
      <CTASection />
    </div>
  );
}