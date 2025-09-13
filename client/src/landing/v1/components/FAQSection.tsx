import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { QuestionMarkCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";

export default function FAQSection() {
  const dynamic = useDynamicContentContext();

  const faqs = [
    {
      question: "Is the $5M result typical? What can I realistically expect?",
      answer: "The $5M result came from a high-ticket B2B service over 12 months. Your results will vary based on your industry and pricing. Our users typically see: Small businesses ($10-50K/month revenue): Add $5-15K/month. Mid-size ($50-200K/month): Add $20-50K/month. Enterprise: Results like our case study. The average ROI across all users is 1,276% in the first 90 days."
    },
    {
      question: "Will this get my WhatsApp number banned?",
      answer: "No. Our system uses official WhatsApp Business accounts with intelligent automation - not the restrictive API that gets others banned. We operate with the full WhatsApp platform, avoid spam triggers, and have been operating safely for 3+ years. We've never had a single customer account banned when following our guidelines."
    },
    {
      question: "How is this different from ManyChat or other WhatsApp tools?",
      answer: "ManyChat and similar tools are stuck with WhatsApp's restrictive API - limited templates, 24-hour messaging windows, and rigid conversation flows. We use the full WhatsApp Business platform with no API restrictions. Our AI creates natural conversations, negotiates prices, handles complex objections, and closes deals 24/7 without any limitations. It's like having a senior salesperson with unlimited WhatsApp access vs. a restricted chatbot."
    },
    {
      question: "How long does it take to set up?",
      answer: "5 minutes for basic setup, 30 minutes to customize for your business. You'll connect your WhatsApp Business account, add your product/service details, set your pricing parameters, and configure calendar integration. Most users see their first automated conversation within an hour."
    },
    {
      question: "What if it doesn't work for my industry?",
      answer: "We're currently working successfully in 37+ industries including real estate, coaching, SaaS, e-commerce, healthcare, education, and professional services. If you don't see real appointments booked and deals progressing within 30 days, you get a full refund. No questions asked."
    },
    {
      question: "Can I see actual WhatsApp conversations it's had?",
      answer: "Yes! In our 12-minute case study video, we show real, unedited WhatsApp conversations including a $47K deal closed entirely by AI, complex objection handling over 50+ messages, and appointment booking with rescheduling. You can also request a live demo where we'll show current conversations happening right now."
    },
    {
      question: "Do I need technical skills to use this?",
      answer: "No technical skills required. If you can use WhatsApp, you can use our system. Everything is visual drag-and-drop. We also provide done-for-you templates, video tutorials for every feature, and priority support if you need help."
    },
    {
      question: "What happens after I buy? Is there ongoing support?",
      answer: "After purchase you get instant access to the platform, Zero-Touch Setup Wizard guides you through everything in 5 minutes, access to our private community of 1,247+ users, weekly group coaching calls, and lifetime updates to the software. Plus, you're covered by our 30-day money-back guarantee. No demos, no calls, no waiting - just automated setup and results."
    },
    {
      question: "Why lifetime deal instead of monthly subscription?",
      answer: `Because it's ${dynamic.holidayOffer} ${dynamic.location ? `in ${dynamic.location.country}` : ''} - we're celebrating with lifetime access instead of $297/month subscriptions. This special pricing is only available for the next ${dynamic.licensesRemaining} licenses during this celebration. After that, it's monthly subscriptions only. You're saving $3,564/year and locking in lifetime access forever.`
    },
    {
      question: "Can it handle multiple languages and countries?",
      answer: "Yes! Our AI works in 52 languages and is being used in 60+ countries. It automatically detects the customer's language and responds accordingly. It also handles different time zones, currencies, and cultural communication styles."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-green-400/10 text-green-500 border-0 text-base px-4 py-2 font-semibold">
              <QuestionMarkCircleIcon className="w-4 h-4 mr-2 text-green-500" />
              FREQUENTLY ASKED QUESTIONS
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Everything You Need to Know
              <span className="block text-primary">Before Getting Started</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real answers to the questions everyone asks about our $5M WhatsApp AI system
            </p>
          </div>

          {/* FAQ Accordion */}
          <Card className="p-6 shadow-[0_0_15px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] rounded-2xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3 pr-4">
                      <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-medium text-foreground">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-8 pr-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? Watch our detailed case study video or contact our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="text-sm px-4 py-2">
                <CheckCircleIcon className="w-4 h-4 mr-2 text-chart-1" />
                30-Day Money-Back Guarantee
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <CheckCircleIcon className="w-4 h-4 mr-2 text-chart-1" />
                24/7 Priority Support
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}