import HeroSection from "./components/HeroSection";
import ProblemAgitation from "./components/ProblemAgitation";
import BiggestMistakes from "./components/BiggestMistakes";
import WhatsAppScreenshots from "./components/WhatsAppScreenshots";
import ROICalculator from "./components/ROICalculator";
import PricingPlans from "./components/PricingPlans";
import CompetitorPricing from "./components/CompetitorPricing";
import CaseStudyCarousel from "./components/CaseStudyCarousel";
import SocialProofSection from "./components/SocialProofSection";
import FounderStory from "./components/FounderStory";
import CTASection from "./components/CTASection";
import StickyHeader from "./components/StickyHeader";
import ScarcityIndicator from "./components/ScarcityIndicator";
import ExitIntent from "./components/ExitIntent";
import { useEffect } from "react";
import { trackPageView, updateSession, trackScrollMilestone } from "@/services/tracking";

// Extend window for Clarity
declare global {
  interface Window {
    clarity: (action: string, key: string, value: string) => void;
  }
}

/**
 * Version A: Problem-Focused Flow
 * Based on Clepher's strategy - 70% problem agitation, 30% solution
 * Streamlined from 18 to 10 core components
 */
export default function LandingV1A() {
  // Track page version in Clarity
  useEffect(() => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('set', 'page_version', 'version_a');
      window.clarity('set', 'components', '10');
      window.clarity('set', 'strategy', 'problem_focused');
    }
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

      {/* 5. Show pricing options */}
      <div id="pricing-plans">
        <PricingPlans />
      </div>

      {/* 6. Compare to alternatives */}
      <CompetitorPricing />

      {/* 7. Social proof & case studies merged */}
      <div className="space-y-0">
        <CaseStudyCarousel />
        <SocialProofSection />
      </div>

      {/* 8. Personal touch & guarantee */}
      <FounderStory />

      {/* 9. Final push with urgency */}
      <CTASection />
    </div>
  );
}