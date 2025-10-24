import HeroSection from "./components/HeroSection";
import SocialProofSection from "./components/SocialProofSection";
import BenefitsSection from "./components/BenefitsSection";
import CTASection from "./components/CTASection";
import StickyHeader from "./components/StickyHeader";
import FAQSection from "./components/FAQSection";
import ProblemAgitation from "./components/ProblemAgitation";
import FounderStory from "./components/FounderStory";
import CaseStudyCarousel from "./components/CaseStudyCarousel";
import BiggestMistakes from "./components/BiggestMistakes";
import CustomerLogos from "./components/CustomerLogos";
import NotForSection from "./components/NotForSection";
import MediaLogos from "./components/MediaLogos";
import WhatsAppScreenshots from "./components/WhatsAppScreenshots";

export default function LandingV1() {

  return (
    <div className="min-h-screen">
      <StickyHeader />
      <HeroSection />
      <CustomerLogos />
      <ProblemAgitation />
      <BiggestMistakes />
      <WhatsAppScreenshots />
      <SocialProofSection />
      <CaseStudyCarousel />
      <BenefitsSection />
      <FounderStory />
      <FAQSection />
      <NotForSection />
      <CTASection />
    </div>
  );
}