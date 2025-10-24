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
  const baseIndustries = [
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
  ];

  // Split industries for two rows
  const firstRowIndustries = baseIndustries.slice(0, Math.ceil(baseIndustries.length / 2));
  const secondRowIndustries = baseIndustries.slice(Math.ceil(baseIndustries.length / 2));

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
            From local shops to global enterprises, MyReviewAgent.ai adapts to any business
          </p>
        </div>

        {/* Scrolling Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F4F5F7] dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F4F5F7] dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

          {/* First Row - Scrolling Left */}
          <div className="relative overflow-hidden mb-4">
            <div className="flex animate-scroll-left">
              {/* First set */}
              <div className="flex gap-4 min-w-max">
                {firstRowIndustries.map((industry, index) => (
                  <div
                    key={`row1-set1-${index}`}
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
              {/* Duplicate set for seamless loop */}
              <div className="flex gap-4 min-w-max">
                {firstRowIndustries.map((industry, index) => (
                  <div
                    key={`row1-set2-${index}`}
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
          </div>

          {/* Second Row - Scrolling Right */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right">
              {/* First set */}
              <div className="flex gap-4 min-w-max">
                {secondRowIndustries.map((industry, index) => (
                  <div
                    key={`row2-set1-${index}`}
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
              {/* Duplicate set for seamless loop */}
              <div className="flex gap-4 min-w-max">
                {secondRowIndustries.map((industry, index) => (
                  <div
                    key={`row2-set2-${index}`}
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

      <style>{`
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
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 10s linear infinite;
          display: flex;
          gap: 1rem;
        }

        .animate-scroll-right {
          animation: scroll-right 10s linear infinite;
          animation-direction: reverse;
          display: flex;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .animate-scroll-left {
            animation-duration: 20s;
          }

          .animate-scroll-right {
            animation-duration: 20s;
          }
        }

        @media (min-width: 1024px) {
          .animate-scroll-left {
            animation-duration: 30s;
          }

          .animate-scroll-right {
            animation-duration: 30s;
          }
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}