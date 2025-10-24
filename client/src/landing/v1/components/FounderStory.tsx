import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  UserIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";
import sohaibImage from "@assets/generated_images/Sohaib.avif";
import signatureImage from "@assets/generated_images/sohaib signature.png";

export default function FounderStory() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Section Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-primary/10 text-primary border-0 text-base px-4 py-2 font-semibold">
              <UserIcon className="w-4 h-4 mr-2" />
              FROM THE FOUNDER
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Why I Built MyReviewAgent.ai
            </h2>
          </div>

          {/* Story Card */}
          <Card className="p-4 sm:p-6 lg:p-12 bg-card relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
              }}></div>
            </div>

            <div className="relative z-10 space-y-6">
              {/* Greeting */}
              <div className="flex items-center gap-4">
                <img
                  src={sohaibImage}
                  alt="Sohaib - Founder of MyReviewAgent.ai"
                  className="w-20 h-20 rounded-full object-cover border-2 border-chart-1/30"
                />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Hi, I'm Sohaib 👋</h3>
                  <p className="text-muted-foreground">Founder, MyReviewAgent.ai</p>
                </div>
              </div>

              {/* Story */}
              <div className="space-y-4 text-lg leading-relaxed text-foreground">
                <p>
                  I was running growth for several booking-based businesses - restaurants, salons, medical practices.
                </p>

                <p>
                  They all had the same problem: <span className="font-bold text-chart-1">getting customers to leave reviews was like pulling teeth</span>.
                </p>

                <p className="text-xl font-bold text-destructive">
                  Manual review requests? 10-15% response rate at best.
                </p>

                <p>
                  One restaurant owner was spending <span className="font-semibold">2 hours daily</span> texting customers asking for reviews. Another salon had a staff member whose entire job was review collection (they got fired when I showed them this).
                </p>

                <p>
                  But here's what really frustrated me...
                </p>

                <Card className="bg-destructive/10 border-destructive/30 p-4">
                  <p className="text-center font-bold text-foreground">
                    Angry customers always find time to leave <span className="text-2xl">1-star reviews</span>.
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Happy customers? They forget 5 minutes after leaving.
                  </p>
                </Card>

                <p>
                  That's when I built MyReviewAgent.ai - an AI that automatically texts customers via WhatsApp or SMS after their booking.
                </p>

                <Card className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 p-6 border border-chart-1/30">
                  <p className="text-2xl font-bold text-center mb-2 text-foreground">
                    First beta customer: 3x review increase in 30 days
                  </p>
                  <p className="text-center text-muted-foreground">
                    4.2★ to 4.8★ rating • Zero manual work
                  </p>
                </Card>

                <p>
                  The smart routing was the game-changer: negative feedback goes private, positive reviews go public. Protect your reputation while collecting 3x more reviews.
                </p>

                <p>
                  Now 500+ booking businesses use it. Pay only per feedback received.
                </p>
              </div>

              {/* Personal Guarantee Letter */}
              <Card className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20 p-4 sm:p-6 lg:p-8 border-2 border-chart-1/30 relative">
                <div className="hidden sm:block absolute top-4 right-4">
                  <Badge className="bg-green-500/10 text-green-600 border-0">
                    <ShieldCheckIcon className="w-3 h-3 mr-1" />
                    30-DAY GUARANTEE
                  </Badge>
                </div>

                {/* Mobile badge - positioned below title */}
                <div className="block sm:hidden mb-4">
                  <Badge className="bg-green-500/10 text-green-600 border-0">
                    <ShieldCheckIcon className="w-3 h-3 mr-1" />
                    30-DAY GUARANTEE
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-foreground font-display">
                    Risk-Free Promise...
                  </h4>

                  <div className="space-y-3 text-foreground">
                    <p className="italic">
                      "I'm confident MyReviewAgent.ai will 3x your reviews. That's why we only charge when it works."
                    </p>

                    <p className="font-semibold">
                      Here's how we make this completely risk-free:
                    </p>

                    <ul className="space-y-3 pl-4">
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
                        <span><strong>Pay per feedback only</strong> - No upfront costs, no monthly fees</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
                        <span><strong>Try it free first</strong> - Test with your first 10 customers at no charge</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
                        <span><strong>Smart routing included</strong> - Protect your reputation from day one</span>
                      </li>
                    </ul>

                    <p className="pt-2">
                      You literally can't lose. If customers don't respond, you pay nothing.
                    </p>
                  </div>

                  <div className="pt-4 space-y-3">
                    <img
                      src={signatureImage}
                      alt="Sohaib's Signature"
                      className="h-16 opacity-90 object-contain"
                    />
                    <div>
                      <p className="font-semibold text-foreground">Sohaib</p>
                      <p className="text-sm text-muted-foreground">Founder, MyReviewAgent.ai</p>
                      <div className="flex items-center gap-2 mt-2">
                        <EnvelopeIcon className="w-4 h-4 text-muted-foreground" />
                        <a href="mailto:hi@sohaibahmad.me" className="text-sm text-primary hover:underline">
                          hi@sohaibahmad.me
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Contact */}
              <div className="text-center space-y-4 pt-4">
                <p className="text-lg text-foreground">
                  Ready to 3x your reviews? Try it now:
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                  onClick={() => window.open('https://wa.me/31658015937?text=Hi! I want to try MyReviewAgent.ai', '_blank')}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  Try AI Review Agent Now
                </Button>
                <p className="text-sm text-muted-foreground">
                  WhatsApp me directly - I'll set you up personally
                </p>
              </div>

            </div>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span>Verified Results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span>Real Founder</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span>Personal Guarantee</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}