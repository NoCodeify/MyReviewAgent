import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckCircleIcon,
  HandRaisedIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function NotForSection() {
  const { licensesRemaining } = useDynamicContentContext();
  const notForItems = [
    {
      title: "Businesses with Less Than 5 WhatsApp Leads Per Month",
      description: "If you're getting fewer than 5 WhatsApp inquiries monthly, you won't see the full ROI potential. Focus on driving more traffic first.",
      icon: XMarkIcon
    },
    {
      title: "Companies That Want Template-Based Responses",
      description: "MyWhatsAgent uses adaptive AI that creates unique responses for each conversation. If you need rigid, scripted replies, this isn't for you.",
      icon: XMarkIcon
    },
    {
      title: "Businesses Afraid of Automation",
      description: "If you're not ready to let AI handle your sales conversations and prefer manual control over every message, MyWhatsAgent won't be a good fit.",
      icon: XMarkIcon
    },
    {
      title: "Those Looking for a 'Magic Button' Without Any Setup",
      description: "While setup takes only 5 minutes, you still need to provide your business info, pricing, and FAQs. If you're not willing to do this minimal setup, look elsewhere.",
      icon: XMarkIcon
    }
  ];

  const perfectForItems = [
    {
      title: "Growth-Focused Businesses",
      description: "You want to scale without hiring more staff",
      icon: CheckCircleIcon
    },
    {
      title: "Smart Entrepreneurs",
      description: "You understand that AI is the future of sales",
      icon: CheckCircleIcon
    },
    {
      title: "Busy Business Owners",
      description: "You want sales happening while you sleep",
      icon: CheckCircleIcon
    },
    {
      title: "ROI-Driven Leaders",
      description: "You want measurable results fast",
      icon: CheckCircleIcon
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-orange-500/10 text-orange-500 border-0 text-base px-4 py-2 font-semibold">
              <HandRaisedIcon className="w-4 h-4 mr-2" />
              IMPORTANT: READ THIS FIRST
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              MyWhatsAgent is NOT for Everyone
              <span className="block text-3xl lg:text-4xl mt-2 text-muted-foreground">
                (And That's By Design)
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're selective about who we work with. If you fall into any of these categories,
              please don't buy MyWhatsAgent:
            </p>
          </div>

          {/* NOT For Cards */}
          <div className="space-y-4 mb-12">
            {notForItems.map((item, index) => (
              <Card
                key={index}
                className="p-6 border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 hover-elevate"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <XMarkIcon className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      ❌ NOT For: {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-12">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-muted-foreground font-semibold">BUT</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Perfect For Section */}
          <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                ✅ MyWhatsAgent IS Perfect For:
              </h3>
              <p className="text-muted-foreground">
                If any of these describe you, MyWhatsAgent will transform your business:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {perfectForItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-foreground mb-4">
                If you checked at least 2 of these boxes, MyWhatsAgent will deliver
                <span className="text-green-600 dark:text-green-400"> massive ROI </span>
                for your business.
              </p>
            </div>
          </Card>

          {/* Bottom Warning */}
          <Card className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-3 mb-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-bold text-foreground">
                Final Warning: Only <span className="text-red-600 dark:text-red-400">{licensesRemaining}</span> Licenses Left
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              We're limiting access to maintain quality and ensure every user gets results.
              Once these licenses are gone, we're closing doors and switching to $297/month pricing.
            </p>
            <p className="text-sm font-semibold text-foreground">
              If you're ready to join the 1,247+ businesses already using MyWhatsAgent to dominate their markets,
              claim your license now before it's too late.
            </p>
          </Card>

        </div>
      </div>
    </section>
  );
}