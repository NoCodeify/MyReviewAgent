import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  XMarkIcon,
  CheckCircleIcon,
  HandRaisedIcon
} from "@heroicons/react/24/outline";

export default function NotForSection() {
  const notForItems = [
    {
      title: "Businesses Without a Booking System",
      description: "If you don't have customer bookings or appointments, this service won't work for you. We need booking data to trigger review requests.",
      icon: XMarkIcon
    },
    {
      title: "Companies That Don't Want Automation",
      description: "If you prefer manually requesting reviews from every customer and aren't comfortable with AI automation, this isn't for you.",
      icon: XMarkIcon
    },
    {
      title: "Businesses Without WhatsApp or SMS Setup",
      description: "If you don't have customers' phone numbers or can't send WhatsApp/SMS messages, you can't use MyReviewAgent.ai.",
      icon: XMarkIcon
    },
    {
      title: "Those Who Get Zero Online Reviews",
      description: "If your business doesn't benefit from online reviews (like Google, Yelp, Facebook), you won't see ROI from this service.",
      icon: XMarkIcon
    }
  ];

  const perfectForItems = [
    {
      title: "Booking-Based Businesses",
      description: "Restaurants, salons, medical practices, auto repair shops",
      icon: CheckCircleIcon
    },
    {
      title: "Reputation-Conscious Owners",
      description: "You understand that online reviews drive new bookings",
      icon: CheckCircleIcon
    },
    {
      title: "Busy Business Owners",
      description: "You don't have time to manually request reviews",
      icon: CheckCircleIcon
    },
    {
      title: "Growth-Focused Leaders",
      description: "You want more positive reviews compounding monthly",
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
              MyReviewAgent.ai is NOT for Everyone
              <span className="block text-3xl lg:text-4xl mt-2 text-muted-foreground">
                (And That's By Design)
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're selective about who we work with. If you fall into any of these categories,
              this service won't be a good fit:
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
                ✅ MyReviewAgent.ai IS Perfect For:
              </h3>
              <p className="text-muted-foreground">
                If any of these describe you, MyReviewAgent.ai will transform your reputation:
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
                If you checked at least 2 of these boxes, MyReviewAgent.ai will help you collect
                <span className="text-green-600 dark:text-green-400"> 3x more reviews </span>
                consistently.
              </p>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}