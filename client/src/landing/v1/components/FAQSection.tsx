import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { QuestionMarkCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function FAQSection() {

  const faqs = [
    {
      question: "How does the AI know when to send review requests?",
      answer: "MyReviewAgent.ai integrates with your booking system. After a booking is completed (e.g., next morning after a restaurant visit), the AI automatically sends a personalized WhatsApp or SMS message. You control the timing - immediate, 1 hour, next day, etc."
    },
    {
      question: "What happens with negative reviews?",
      answer: "This is the magic! When a customer rates their experience low (1-3 stars), they're directed to a private feedback form that goes directly to you - NOT to Google, Yelp, or other public platforms. You get the chance to fix the issue before it hurts your reputation. Positive reviews (4-5 stars) are guided to post publicly."
    },
    {
      question: "Does this work for my type of business?",
      answer: "If you have bookings/appointments, yes! We work with restaurants, salons, spas, medical/dental practices, auto repair shops, hotels, fitness studios, and any business where customers book appointments. The AI adapts its messaging to your industry automatically."
    },
    {
      question: "How long does setup take?",
      answer: "About 10 minutes. You'll connect your booking system (or we can set up webhooks), customize the message template for your brand, and configure where reviews should go (Google, Yelp, Facebook, etc.). Most businesses are collecting reviews within the same day."
    },
    {
      question: "What if customers don't have WhatsApp?",
      answer: "No problem! The system can send via SMS as a fallback. You configure your preferred channels - WhatsApp first, then SMS, or vice versa. The AI uses whichever channel is more likely to get a response."
    },
    {
      question: "Will this spam my customers?",
      answer: "Absolutely not. The AI sends ONE personalized message per customer after their visit. If they don't respond, it follows up once after 24 hours, then stops. No aggressive spamming - just friendly, professional review requests that feel personal."
    },
    {
      question: "How do I pay only per feedback?",
      answer: "You're charged only when a customer actually leaves feedback (either private or public review). If they ignore the message, you pay nothing. This aligns our success with yours - we only make money when you get valuable reviews."
    },
    {
      question: "What happens after I sign up? Is there ongoing support?",
      answer: "After signing up, you get a personal onboarding call to connect your booking system. We provide full setup support, help customizing your messaging, and configure the review routing. You'll also get ongoing support via WhatsApp/email to ensure you're getting the best results."
    },
    {
      question: "How much does it cost?",
      answer: "We only charge per feedback received - no upfront fees, no monthly subscriptions. You pay a small fee only when a customer actually leaves feedback (either a review or private feedback). This way, you only pay for results. Try it free with your first 10 customers to see the system in action."
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
            <Badge className="bg-green-400/10 text-green-500 border-0 text-sm sm:text-base px-4 py-2 font-semibold">
              <QuestionMarkCircleIcon className="w-4 h-4 mr-2 text-green-500" />
              FREQUENTLY ASKED QUESTIONS
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Everything You Need to Know
              <span className="block text-primary">Before Getting Started</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real answers to the questions everyone asks about automated review collection
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