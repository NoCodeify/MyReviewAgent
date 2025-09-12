import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import SocialProofSection from "@/components/SocialProofSection";
import BenefitsSection from "@/components/BenefitsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <VideoSection />
      <SocialProofSection />
      <BenefitsSection />
      <CTASection />
    </div>
  );
}