import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { XMarkIcon, CheckCircleIcon, UserIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useDynamicContentContext } from "@/contexts/DynamicContentContext";

export default function ScarcityIndicator() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dynamic = useDynamicContentContext();

  const notifications = [
    { name: "John D.", location: "Austin, Texas", flag: "🇺🇸", time: dynamic.location?.country === "United States" ? "Just now" : "2 minutes ago" },
    { name: "Sarah M.", location: "London, UK", flag: "🇬🇧", time: "3 minutes ago" },
    { name: "Carlos R.", location: "Madrid, Spain", flag: "🇪🇸", time: "5 minutes ago" },
    { name: "Emma L.", location: "Sydney, Australia", time: "7 minutes ago" },
    { name: "Michael K.", location: "Toronto, Canada", time: "8 minutes ago" },
    { name: "Lisa T.", location: "Berlin, Germany", time: "11 minutes ago" },
    { name: "David S.", location: "New York, USA", time: "13 minutes ago" },
    { name: "Anna P.", location: "Paris, France", time: "15 minutes ago" },
    { name: "Roberto M.", location: "São Paulo, Brazil", time: "17 minutes ago" },
    { name: "Yuki T.", location: "Tokyo, Japan", time: "19 minutes ago" },
    { name: "Mohammed A.", location: "Dubai, UAE", time: "21 minutes ago" },
    { name: "Sophie B.", location: "Amsterdam, Netherlands", time: "23 minutes ago" },
    { name: "Alessandro F.", location: "Milan, Italy", time: "25 minutes ago" },
    { name: "Maria G.", location: "Barcelona, Spain", time: "27 minutes ago" },
    { name: "Thomas H.", location: "Munich, Germany", time: "29 minutes ago" },
    { name: "Jennifer W.", location: "Los Angeles, USA", time: "31 minutes ago" },
    { name: "Pierre D.", location: "Lyon, France", time: "33 minutes ago" },
    { name: "Raj P.", location: "Mumbai, India", time: "35 minutes ago" },
    { name: "Chen W.", location: "Shanghai, China", time: "37 minutes ago" },
    { name: "Olga K.", location: "Moscow, Russia", time: "39 minutes ago" },
    { name: "James B.", location: "Chicago, USA", time: "41 minutes ago" },
    { name: "Fatima Z.", location: "Cairo, Egypt", time: "43 minutes ago" },
    { name: "Lucas S.", location: "Buenos Aires, Argentina", time: "45 minutes ago" },
    { name: "Nina R.", location: "Stockholm, Sweden", time: "47 minutes ago" },
    { name: "Ahmed K.", location: "Riyadh, Saudi Arabia", time: "49 minutes ago" },
    { name: "Isabella C.", location: "Rome, Italy", time: "51 minutes ago" },
    { name: "Ryan O.", location: "Dublin, Ireland", time: "53 minutes ago" },
    { name: "Priya S.", location: "Bangalore, India", time: "55 minutes ago" },
    { name: "Hans M.", location: "Zurich, Switzerland", time: "57 minutes ago" },
    { name: "Elena V.", location: "Barcelona, Spain", time: "59 minutes ago" },
    { name: "William T.", location: "Boston, USA", time: "1 hour ago" },
    { name: "Aisha N.", location: "Lagos, Nigeria", time: "1 hour ago" },
    { name: "Daniel L.", location: "Tel Aviv, Israel", time: "1 hour ago" },
    { name: "Julia K.", location: "Vienna, Austria", time: "1 hour ago" },
    { name: "Omar H.", location: "Casablanca, Morocco", time: "1 hour ago" },
    { name: "Emily R.", location: "Vancouver, Canada", time: "1 hour ago" },
    { name: "Kim J.", location: "Seoul, South Korea", time: "1 hour ago" },
    { name: "Marco A.", location: "Lisbon, Portugal", time: "1 hour ago" },
    { name: "Natasha P.", location: "Prague, Czech Republic", time: "2 hours ago" },
    { name: "Robert M.", location: "Miami, USA", time: "2 hours ago" },
    { name: "Amelia S.", location: "Melbourne, Australia", time: "2 hours ago" },
    { name: "Gustav L.", location: "Copenhagen, Denmark", time: "2 hours ago" },
    { name: "Fatou D.", location: "Dakar, Senegal", time: "2 hours ago" },
    { name: "Christopher N.", location: "Singapore", time: "2 hours ago" },
    { name: "Ana R.", location: "Mexico City, Mexico", time: "2 hours ago" },
    { name: "Viktor K.", location: "Budapest, Hungary", time: "2 hours ago" },
    { name: "Rachel G.", location: "San Francisco, USA", time: "2 hours ago" },
    { name: "Ibrahim A.", location: "Istanbul, Turkey", time: "2 hours ago" },
    { name: "Laura F.", location: "Brussels, Belgium", time: "3 hours ago" },
    { name: "Kevin L.", location: "Hong Kong", time: "3 hours ago" },
    { name: "Svetlana M.", location: "Kiev, Ukraine", time: "3 hours ago" },
    { name: "Diego H.", location: "Santiago, Chile", time: "3 hours ago" },
    { name: "Hannah W.", location: "Edinburgh, Scotland", time: "3 hours ago" },
    { name: "Mustafa O.", location: "Ankara, Turkey", time: "3 hours ago" },
    { name: "Grace K.", location: "Nairobi, Kenya", time: "3 hours ago" },
    { name: "Peter S.", location: "Oslo, Norway", time: "3 hours ago" },
    { name: "Yasmin A.", location: "Beirut, Lebanon", time: "3 hours ago" },
    { name: "Frank D.", location: "Phoenix, USA", time: "4 hours ago" },
    { name: "Liu M.", location: "Beijing, China", time: "4 hours ago" },
    { name: "Sandra B.", location: "Lima, Peru", time: "4 hours ago" },
    { name: "Erik J.", location: "Helsinki, Finland", time: "4 hours ago" },
    { name: "Amina K.", location: "Tunis, Tunisia", time: "4 hours ago" },
    { name: "Nathan T.", location: "Seattle, USA", time: "4 hours ago" },
    { name: "Chiara R.", location: "Naples, Italy", time: "4 hours ago" },
    { name: "Ali S.", location: "Kuwait City, Kuwait", time: "4 hours ago" },
    { name: "Michelle L.", location: "Montreal, Canada", time: "4 hours ago" },
    { name: "Andrei P.", location: "Bucharest, Romania", time: "5 hours ago" },
    { name: "Jessica H.", location: "Atlanta, USA", time: "5 hours ago" },
    { name: "Tariq M.", location: "Amman, Jordan", time: "5 hours ago" },
    { name: "Ingrid N.", location: "Reykjavik, Iceland", time: "5 hours ago" },
    { name: "Paulo C.", location: "Rio de Janeiro, Brazil", time: "5 hours ago" },
    { name: "Sophia T.", location: "Athens, Greece", time: "5 hours ago" },
    { name: "Max B.", location: "Frankfurt, Germany", time: "5 hours ago" },
    { name: "Layla H.", location: "Doha, Qatar", time: "5 hours ago" },
    { name: "Richard K.", location: "Denver, USA", time: "5 hours ago" },
    { name: "Mei L.", location: "Taipei, Taiwan", time: "6 hours ago" },
    { name: "Oscar G.", location: "Bogotá, Colombia", time: "6 hours ago" },
    { name: "Elise M.", location: "Geneva, Switzerland", time: "6 hours ago" },
    { name: "Hassan R.", location: "Alexandria, Egypt", time: "6 hours ago" },
    { name: "Victoria P.", location: "Brisbane, Australia", time: "6 hours ago" },
    { name: "Jan K.", location: "Warsaw, Poland", time: "6 hours ago" },
    { name: "Fatima B.", location: "Karachi, Pakistan", time: "6 hours ago" },
    { name: "Steve J.", location: "San Diego, USA", time: "6 hours ago" },
    { name: "Camila R.", location: "Montevideo, Uruguay", time: "7 hours ago" },
    { name: "Nikolai S.", location: "St. Petersburg, Russia", time: "7 hours ago" },
    { name: "Zara A.", location: "Birmingham, UK", time: "7 hours ago" },
    { name: "Hiroshi Y.", location: "Osaka, Japan", time: "7 hours ago" },
    { name: "Patricia M.", location: "Porto, Portugal", time: "7 hours ago" },
    { name: "Abdul W.", location: "Jakarta, Indonesia", time: "7 hours ago" },
    { name: "Linda F.", location: "Calgary, Canada", time: "7 hours ago" },
    { name: "Dimitri K.", location: "Sofia, Bulgaria", time: "7 hours ago" },
    { name: "Rosa L.", location: "Quito, Ecuador", time: "8 hours ago" },
    { name: "Benjamin H.", location: "Philadelphia, USA", time: "8 hours ago" },
    { name: "Noor S.", location: "Dhaka, Bangladesh", time: "8 hours ago" },
    { name: "Alexandra D.", location: "Belgrade, Serbia", time: "8 hours ago" },
    { name: "Tony C.", location: "Las Vegas, USA", time: "8 hours ago" },
    { name: "Marie-Claire B.", location: "Luxembourg", time: "8 hours ago" },
    { name: "Rashid K.", location: "Muscat, Oman", time: "8 hours ago" },
    { name: "Diana V.", location: "Auckland, New Zealand", time: "8 hours ago" },
    { name: "Leon W.", location: "Cape Town, South Africa", time: "9 hours ago" }
  ];

  useEffect(() => {
    // Show first notification after random delay between 3-8 seconds
    const initialDelay = Math.floor(Math.random() * 5000) + 3000;
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused) return;

    // Show popup for 7 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);

      // Random wait between 8-20 seconds before next popup
      const randomWait = Math.floor(Math.random() * 12000) + 8000;

      setTimeout(() => {
        // Pick a random notification, avoiding the current one
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * notifications.length);
        } while (nextIndex === currentNotification && notifications.length > 1);

        setCurrentNotification(nextIndex);
        setIsVisible(true);
      }, randomWait);
    }, 7000);

    return () => clearTimeout(timer);
  }, [isVisible, isPaused, currentNotification]);

  const handleClose = () => {
    setIsVisible(false);
    setIsPaused(true);

    // Resume after random delay between 25-40 seconds with a random notification
    const resumeDelay = Math.floor(Math.random() * 15000) + 25000;
    setTimeout(() => {
      setIsPaused(false);
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setCurrentNotification(randomIndex);
      setIsVisible(true);
    }, resumeDelay);
  };

  if (!isVisible) return null;

  const notification = notifications[currentNotification];

  return (
    <div className="fixed bottom-4 left-4 right-4 lg:left-4 lg:right-auto lg:max-w-sm z-40 animate-in slide-in-from-left duration-500">
      <Card className="bg-white dark:bg-slate-900 shadow-2xl border-0 p-4 pr-12 w-full lg:max-w-sm">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close notification"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircleIcon className="w-6 h-6 text-white" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{notification.name}</span>
              <span className="text-muted-foreground">just purchased</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <span>{notification.flag}</span>
              <span className="whitespace-nowrap">{notification.location}</span>
              <span className="leading-none">•</span>
              <span className="whitespace-nowrap">{notification.time}</span>
            </div>

            <div className="text-xs text-chart-1 font-medium pt-1">
              Lifetime Access secured! (Only {dynamic.licensesRemaining} left)
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}