import HeroSection from "@/landing/v1/components/HeroSection";
import SocialProofSection from "@/landing/v1/components/SocialProofSection";
import BenefitsSection from "@/landing/v1/components/BenefitsSection";
import CTASection from "@/landing/v1/components/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SocialProofSection />
      <BenefitsSection />
      <CTASection />
    </div>
  );
}