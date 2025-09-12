import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import BenefitsSection from "@/components/BenefitsSection";
import CTASection from "@/components/CTASection";

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