import { Badge } from "@/components/ui/badge";
import {
  BuildingStorefrontIcon,
  AcademicCapIcon,
  HeartIcon,
  ShoppingBagIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  TruckIcon,
  ScaleIcon,
  BeakerIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  FilmIcon,
  SparklesIcon,
  UserGroupIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  BookOpenIcon,
  CakeIcon,
  CameraIcon,
  PhoneIcon,
  PaintBrushIcon,
  MusicalNoteIcon,
  FireIcon,
  RocketLaunchIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function CustomerLogos() {
  const industries = [
    { name: "E-commerce", icon: ShoppingBagIcon },
    { name: "Real Estate", icon: HomeIcon },
    { name: "Healthcare", icon: HeartIcon },
    { name: "Education", icon: AcademicCapIcon },
    { name: "Retail", icon: BuildingStorefrontIcon },
    { name: "Automotive", icon: TruckIcon },
    { name: "Legal Services", icon: ScaleIcon },
    { name: "Beauty & Spa", icon: SparklesIcon },
    { name: "Technology", icon: ComputerDesktopIcon },
    { name: "Finance", icon: CurrencyDollarIcon },
    { name: "Consulting", icon: BriefcaseIcon },
    { name: "Restaurants", icon: CakeIcon },
    { name: "Photography", icon: CameraIcon },
    { name: "Telecom", icon: PhoneIcon },
    { name: "Design", icon: PaintBrushIcon },
    { name: "Entertainment", icon: FilmIcon },
    { name: "Construction", icon: WrenchScrewdriverIcon },
    { name: "Logistics", icon: TruckIcon },
    { name: "Insurance", icon: ShieldCheckIcon },
    { name: "Travel", icon: GlobeAltIcon },
    { name: "Publishing", icon: BookOpenIcon },
    { name: "Music", icon: MusicalNoteIcon },
    { name: "Fitness", icon: FireIcon },
    { name: "HR Services", icon: UserGroupIcon },
    { name: "Marketing", icon: RocketLaunchIcon },
    { name: "Science", icon: BeakerIcon },
    // Duplicate for seamless loop
    { name: "E-commerce", icon: ShoppingBagIcon },
    { name: "Real Estate", icon: HomeIcon },
    { name: "Healthcare", icon: HeartIcon },
    { name: "Education", icon: AcademicCapIcon },
    { name: "Retail", icon: BuildingStorefrontIcon },
    { name: "Automotive", icon: TruckIcon },
  ];

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge className="bg-primary/10 text-primary border-0 text-base px-4 py-2 font-semibold mb-4">
            TRUSTED BY 1,247+ BUSINESSES
          </Badge>
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Working Across 37+ Industries Worldwide
          </h3>
          <p className="text-muted-foreground">
            From local shops to global enterprises, WhatsAgent adapts to any business
          </p>
        </div>

        {/* Scrolling Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>

          {/* First Row - Scrolling Left */}
          <div className="flex gap-4 mb-4 animate-scroll-left">
            {industries.slice(0, Math.ceil(industries.length / 2)).map((industry, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-3 hover:border-primary/50 hover:shadow-md transition-all duration-300 hover-elevate">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <industry.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground whitespace-nowrap">
                    {industry.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - Scrolling Right */}
          <div className="flex gap-4 animate-scroll-right">
            {industries.slice(Math.ceil(industries.length / 2)).map((industry, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-3 hover:border-primary/50 hover:shadow-md transition-all duration-300 hover-elevate">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <industry.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground whitespace-nowrap">
                    {industry.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">37+</div>
            <div className="text-sm text-muted-foreground">Industries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">1,247+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">52</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">4.9★</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}