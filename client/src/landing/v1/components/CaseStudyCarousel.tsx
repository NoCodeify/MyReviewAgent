import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";
import {
  TrophyIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon,
  PlayCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

// Import company logos
import fuegenixLogo from "@assets/generated_images/Logo Black Square.png";
import webAceLogo from "@assets/generated_images/de de web academy logo.jpg";
import cobhosLogo from "@assets/generated_images/cobhos logo.jpg";

export default function CaseStudyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const caseStudies = [
    {
      icon: BuildingStorefrontIcon,
      logo: fuegenixLogo,
      industry: "Hair Transplant Surgery",
      company: testimonials[0].company, // FueGenix Hair Clinic
      name: testimonials[0].name, // Dr. Munib Ahmad
      challenge: "Dealing with $50k+ international clients requiring constant communication across timezones",
      solution: "AI agent qualifying leads, handling objections, and closing high-ticket deals autonomously",
      results: [
        { metric: "10x", label: "Revenue Increase" },
        { metric: "400%", label: "Workload Reduction" },
        { metric: "$50K+", label: "Average Deal Size" }
      ],
      quote: testimonials[0].content,
      author: `${testimonials[0].name}, ${testimonials[0].title}`,
      highlight: true
    },
    {
      icon: AcademicCapIcon,
      logo: webAceLogo,
      industry: "Education Technology",
      company: testimonials[1].company, // Web Academie
      name: testimonials[1].name, // Irene
      challenge: "Sales team missing appointments and leads due to manual booking process",
      solution: "AI assistant handling appointment booking, removing objections, and adapting communication style",
      results: [
        { metric: "3x", label: "More Appointments" },
        { metric: "24/7", label: "Availability" },
        { metric: "100%", label: "Response Rate" }
      ],
      quote: testimonials[1].content,
      author: `${testimonials[1].name}, ${testimonials[1].title}`,
      highlight: false
    },
    {
      icon: PlayCircleIcon,
      logo: cobhosLogo,
      industry: "Streaming Services",
      company: testimonials[2].company, // Cobo's Streaming
      name: testimonials[2].name, // Gaspar Cobo
      challenge: "Multiple communication channels causing confusion and lost leads",
      solution: "Unified WhatsApp AI integration handling all customer interactions naturally",
      results: [
        { metric: "Instant", label: "Sales from AI" },
        { metric: "98%", label: "Customer Satisfaction" },
        { metric: "1", label: "Unified Channel" }
      ],
      quote: testimonials[2].content,
      author: `${testimonials[2].name}, ${testimonials[2].title}`,
      highlight: false
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const study = caseStudies[currentIndex];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-chart-1/10 text-chart-1 border-0 text-base px-4 py-2 font-semibold">
              <TrophyIcon className="w-4 h-4 mr-2" />
              SUCCESS STORIES
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Real Businesses, Real Results
              <span className="block text-3xl lg:text-4xl mt-2 text-primary">
                From Our Early Adopters
              </span>
            </h2>
          </div>

          {/* Carousel */}
          <Card className="p-8 lg:p-12 relative overflow-hidden">
            {study.highlight && (
              <Badge className="absolute top-4 right-4 bg-chart-1/20 text-chart-1 border-chart-1/30">
                FEATURED
              </Badge>
            )}

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Story */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center p-1 border border-border">
                    <img
                      src={study.logo}
                      alt={`${study.company} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs mb-1">
                      {study.industry}
                    </Badge>
                    <h3 className="text-xl font-bold text-foreground">{study.company}</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">THE CHALLENGE</h4>
                    <p className="text-foreground">{study.challenge}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">THE SOLUTION</h4>
                    <p className="text-foreground">{study.solution}</p>
                  </div>
                </div>

                {/* Quote */}
                <Card className="p-4 bg-muted/50 border-l-4 border-primary">
                  <p className="text-foreground italic mb-2">"{study.quote}"</p>
                  <p className="text-sm text-muted-foreground">— {study.author}</p>
                </Card>
              </div>

              {/* Right: Results */}
              <div className="space-y-6">
                <h4 className="text-sm font-semibold text-muted-foreground">THE RESULTS</h4>

                <div className="grid grid-cols-3 gap-2 lg:gap-4">
                  {study.results.map((result, idx) => (
                    <Card key={idx} className="p-2 lg:p-4 text-center bg-gradient-to-br from-chart-1/5 to-chart-2/5 overflow-hidden">
                      <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-chart-1 break-all">
                        {result.metric}
                      </div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground mt-1 break-words">
                        {result.label}
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 bg-gradient-to-r from-chart-1/10 to-chart-2/10 border-chart-1/20">
                  <div className="flex items-center gap-3">
                    <ChartBarIcon className="w-8 h-8 text-chart-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Implementation Time</p>
                      <p className="text-xl font-bold text-foreground">5 minutes</p>
                      <p className="text-xs text-muted-foreground">From signup to first sale</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="hover-elevate"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="flex gap-2">
                {caseStudies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-8 bg-primary'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="hover-elevate"
              >
                Next
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Join these successful businesses already transforming their WhatsApp sales with AI
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
              onClick={() => {
                const ctaSection = document.getElementById('final-cta');
                ctaSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Your Success Story
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}