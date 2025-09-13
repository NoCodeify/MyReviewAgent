import HeroSection from "./components/HeroSection";
import SocialProofSection from "./components/SocialProofSection";
import BenefitsSection from "./components/BenefitsSection";
import CTASection from "./components/CTASection";
import StickyHeader from "./components/StickyHeader";
import FAQSection from "./components/FAQSection";
import ComparisonTable from "./components/ComparisonTable";
import BonusStack from "./components/BonusStack";
import ScarcityIndicator from "./components/ScarcityIndicator";
import ProblemAgitation from "./components/ProblemAgitation";
import FounderStory from "./components/FounderStory";
import CompetitorPricing from "./components/CompetitorPricing";
import ROICalculator from "./components/ROICalculator";
import CaseStudyCarousel from "./components/CaseStudyCarousel";
import Timeline from "./components/Timeline";
import ExitIntent from "./components/ExitIntent";

export default function LandingV1() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <ScarcityIndicator />
      <ExitIntent />
      <HeroSection />
      <ProblemAgitation />
      <SocialProofSection />
      <CaseStudyCarousel />
      <ROICalculator />
      <ComparisonTable />
      <CompetitorPricing />
      <BenefitsSection />
      <Timeline />
      <FounderStory />
      <FAQSection />
      <BonusStack />
      <CTASection />
    </div>
  );
}