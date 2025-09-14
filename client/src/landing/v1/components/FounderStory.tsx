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
              The $7M WhatsApp Discovery
            </h2>
          </div>

          {/* Story Card */}
          <Card className="p-8 lg:p-12 bg-card relative overflow-hidden">
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
                  alt="Sohaib - Founder of MyWhatsAgent"
                  className="w-20 h-20 rounded-full object-cover border-2 border-chart-1/30"
                />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Hi, I'm Sohaib 👋</h3>
                  <p className="text-muted-foreground">CMO, FueGenix | Founder, MyWhatsAgent</p>
                </div>
              </div>

              {/* Story */}
              <div className="space-y-4 text-lg leading-relaxed text-foreground">
                <p>
                  As CMO of FueGenix, I scaled us from <span className="font-bold text-chart-1">$0 to $3M</span> through killer Facebook ads and SEO.
                </p>

                <p>
                  Then I started consulting for 20 other businesses on the side. Same strategies, same ad templates, same everything.
                </p>

                <p className="text-xl font-bold text-destructive">
                  They all failed spectacularly.
                </p>

                <p>
                  FueGenix was closing 40% of WhatsApp leads. My consulting clients? Maybe 5% on a good day.
                </p>

                <p>
                  The difference? We had a full WhatsApp team at FueGenix working 18 hours daily. But even we were bleeding money - missing all the leads that came in after 10 PM and on weekends.
                </p>

                <Card className="bg-destructive/10 border-destructive/30 p-4">
                  <p className="text-center font-bold text-foreground">
                    I watched my consulting clients lose <span className="text-2xl">$2M</span> in combined revenue from slow WhatsApp replies.
                  </p>
                </Card>

                <p>
                  That's when I said "screw it" and built an AI that could actually sell. Not chatbot garbage - real conversations that closed deals at 3 AM.
                </p>

                <Card className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 p-6 border border-chart-1/30">
                  <p className="text-2xl font-bold text-center mb-2 text-foreground">
                    FueGenix result: $3M → $10M in 18 months
                  </p>
                  <p className="text-center text-muted-foreground">
                    After 847 conversations where nobody realized they were talking to AI
                  </p>
                </Card>

                <p>
                  I shut down my consulting and made this available to everyone.
                </p>

                <p>
                  That's MyWhatsAgent - the exact system that added <span className="font-bold text-chart-1">$7M to FueGenix</span>.
                </p>
              </div>

              {/* Personal Guarantee Letter */}
              <Card className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20 p-8 border-2 border-chart-1/30 relative">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500/10 text-green-600 border-0">
                    <ShieldCheckIcon className="w-3 h-3 mr-1" />
                    30-DAY GUARANTEE
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-foreground font-display">
                    My Personal Promise to You...
                  </h4>

                  <div className="space-y-3 text-foreground">
                    <p className="italic">
                      "I'm so confident WhatsAgent will transform your business that I'm putting my reputation on the line."
                    </p>

                    <p className="font-semibold">
                      If MyWhatsAgent doesn't close at least 10 deals in your first 30 days:
                    </p>

                    <ul className="space-y-3 pl-4">
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
                        <span><strong>Full refund</strong> - Every penny back, no questions asked</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
                        <span><strong>Personal audit</strong> - I'll analyze your setup myself</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
                        <span><strong>Bonus templates</strong> - My $5M message sequences, free</span>
                      </li>
                    </ul>

                    <p className="pt-2">
                      That's how certain I am this will work for you.
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
                      <p className="text-sm text-muted-foreground">Founder, MyWhatsAgent</p>
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
                  Got questions? WhatsApp me directly:
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white text-lg px-8 py-6 h-auto font-semibold border-0 shadow-[0_4px_14px_0_rgba(34,197,94,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(34,197,94,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] transform hover:translate-y-[-1px] transition-all duration-200 rounded-xl whitespace-normal"
                  onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  WhatsApp Sohaib
                </Button>
                <p className="text-sm text-muted-foreground">
                  (Yes, it's MyWhatsAgent responding. Try to tell 😉)
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