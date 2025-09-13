import munibAvatar from "@assets/generated_images/Munib.avif";
import ireneAvatar from "@assets/generated_images/Irene.avif";
import gasparAvatar from "@assets/generated_images/Gaspar.avif";

export interface Testimonial {
  name: string;
  title: string;
  company: string;
  content: string;
  result: string;
  avatar: string;
  metrics?: {
    before?: string;
    after?: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Munib Ahmad",
    title: "Founder",
    company: "FueGenix Hair Clinic",
    content: "As a leading hair transplant surgeon dealing with €50k+ clients worldwide, this has been revolutionary. It works better than any extra worker you can hire. Daily we're getting qualified leads and selling is easier than selling water in a desert. Workload has gone down 400% and revenue has gone up 10x.",
    result: "10x Revenue Increase",
    avatar: munibAvatar,
    metrics: {
      before: "Manual lead qualification",
      after: "Zero effort, automated qualification"
    }
  },
  {
    name: "Irene",
    title: "Founder",
    company: "Web Academie",
    content: "I wrote a script that helps people book appointments with my sales team, giving me more appointments and sales. My AI assistant takes away objections and adapts its communication style intuitively to each lead. I keep inventing new ways to use it - for support, invoice questions, everything!",
    result: "More appointments, More sales",
    avatar: ireneAvatar,
    metrics: {
      before: "Manual appointment booking",
      after: "Automated booking & objection handling"
    }
  },
  {
    name: "Gaspar Cobo",
    title: "Founder",
    company: "Cobo's Streaming",
    content: "This solution exceeds my expectations. It seamlessly integrates WhatsApp communications, greatly simplifying business interactions. I've already made sales thanks to its AI integration. The feature I love most is its ability to interact naturally, just like a human sales agent would.",
    result: "Immediate sales from AI",
    avatar: gasparAvatar,
    metrics: {
      before: "Multiple communication channels",
      after: "WhatsApp unified with AI"
    }
  }
];

export const stats = [
  {
    value: "€50k+",
    label: "Average Deal Size",
    subtext: "FueGenix Hair Clinic",
    icon: "DollarSign"
  },
  {
    value: "10x",
    label: "Revenue Increase",
    subtext: "Dr. Munib Ahmad",
    icon: "TrendingUp"
  },
  {
    value: "400%",
    label: "Workload Reduction",
    subtext: "With AI Assistant",
    icon: "Calendar"
  },
  {
    value: "24/7",
    label: "Always Available",
    subtext: "WhatsApp AI Assistant",
    icon: "Users"
  }
];