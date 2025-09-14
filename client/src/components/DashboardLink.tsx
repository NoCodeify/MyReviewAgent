import { Link } from "wouter";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function DashboardLink() {
  // Only show in development or with debug parameter
  const isDev = import.meta.env.DEV;
  const hasDebug = new URLSearchParams(window.location.search).get("debug") === "true";

  if (!isDev && !hasDebug) return null;

  return (
    <Link href="/dashboard">
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 left-4 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
      >
        <ChartBarIcon className="w-4 h-4 mr-2" />
        Analytics Dashboard
      </Button>
    </Link>
  );
}