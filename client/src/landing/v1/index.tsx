import HeroSection from "./components/HeroSection";
import SocialProofSection from "./components/SocialProofSection";
import BenefitsSection from "./components/BenefitsSection";
import CTASection from "./components/CTASection";
import StickyHeader from "./components/StickyHeader";
import FAQSection from "./components/FAQSection";
import ComparisonTable from "./components/ComparisonTable";
import BonusStack from "./components/BonusStack";
import ScarcityIndicator from "./components/ScarcityIndicator";

export default function LandingV1() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <ScarcityIndicator />
      <HeroSection />
      <SocialProofSection />
      <ComparisonTable />
      <BenefitsSection />
      <FAQSection />
      <BonusStack />
      <CTASection />
    </div>
  );
}