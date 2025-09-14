import HeroSection from "./components/HeroSection";
import HeroSectionV2 from "./components/HeroSectionV2";
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
import BiggestMistakes from "./components/BiggestMistakes";
import CustomerLogos from "./components/CustomerLogos";
import FeatureComparison from "./components/FeatureComparison";
import NotForSection from "./components/NotForSection";
import MediaLogos from "./components/MediaLogos";
import WhatsAppScreenshots from "./components/WhatsAppScreenshots";
import ABTestDashboard from "./components/ABTestDashboard";

export default function LandingV1() {
  // Check if we should use V2 components with variations
  const urlParams = new URLSearchParams(window.location.search);
  const useV2 = urlParams.has('v') || urlParams.get('test') === 'true';

  return (
    <div className="min-h-screen">
      <StickyHeader />
      <ScarcityIndicator />
      <ExitIntent />
      <ABTestDashboard />
      {useV2 ? <HeroSectionV2 /> : <HeroSection />}
      <CustomerLogos />
      <ProblemAgitation />
      <BiggestMistakes />
      <WhatsAppScreenshots />
      <SocialProofSection />
      <CaseStudyCarousel />
      <ROICalculator />
      <ComparisonTable />
      <FeatureComparison />
      <CompetitorPricing />
      <BenefitsSection />
      <Timeline />
      <FounderStory />
      <FAQSection />
      <BonusStack />
      <NotForSection />
      <CTASection />
    </div>
  );
}