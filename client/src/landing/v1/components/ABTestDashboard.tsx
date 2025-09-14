import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { variations } from "../config/variations";
import {
  ChartBarIcon,
  BeakerIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  UserGroupIcon,
  CursorArrowRaysIcon
} from "@heroicons/react/24/outline";

/**
 * A/B Test Dashboard for monitoring variation performance
 * Only visible with ?debug=true URL parameter
 */
export default function ABTestDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<string>('control');
  const [mockData, setMockData] = useState<Record<string, any>>({});

  useEffect(() => {
    // Only show dashboard with debug parameter
    const urlParams = new URLSearchParams(window.location.search);
    const debugMode = urlParams.get('debug') === 'true';
    setIsVisible(debugMode);

    // Generate mock performance data
    if (debugMode) {
      const data: Record<string, any> = {};
      Object.keys(variations).forEach(key => {
        data[key] = {
          views: Math.floor(Math.random() * 1000) + 100,
          clicks: Math.floor(Math.random() * 100) + 10,
          conversions: Math.floor(Math.random() * 50) + 5,
          avgTimeOnPage: Math.floor(Math.random() * 300) + 60,
          scrollDepth: Math.floor(Math.random() * 30) + 70,
        };
      });
      setMockData(data);
    }
  }, []);

  if (!isVisible) return null;

  const handleVariationSwitch = (variantId: string) => {
    setSelectedVariation(variantId);
    // Set in localStorage and reload
    localStorage.setItem('ab_variation', variantId);
    window.location.href = window.location.pathname + '?v=' + variantId;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BeakerIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">A/B Test Dashboard</h3>
            </div>
            <Badge className="bg-green-500/10 text-green-600">
              Debug Mode
            </Badge>
          </div>

          {/* Current Variation */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Current Variation:</p>
            <select
              value={selectedVariation}
              onChange={(e) => handleVariationSwitch(e.target.value)}
              className="w-full p-2 border rounded-lg bg-background text-foreground"
            >
              {Object.entries(variations).map(([key, variation]) => (
                <option key={key} value={key}>
                  {variation.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="text-xs"
            >
              Original
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.href = '/a'}
              className="text-xs"
            >
              Version A
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.href = '/b'}
              className="text-xs"
            >
              Version B
            </Button>
          </div>

          {/* Performance Metrics */}
          {mockData[selectedVariation] && (
            <div className="space-y-3 pt-3 border-t">
              <p className="text-sm font-semibold text-foreground">Mock Performance Data:</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Views</p>
                    <p className="text-sm font-semibold">{mockData[selectedVariation].views}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CursorArrowRaysIcon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Clicks</p>
                    <p className="text-sm font-semibold">{mockData[selectedVariation].clicks}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Conv. Rate</p>
                    <p className="text-sm font-semibold">
                      {((mockData[selectedVariation].conversions / mockData[selectedVariation].views) * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Time</p>
                    <p className="text-sm font-semibold">{mockData[selectedVariation].avgTimeOnPage}s</p>
                  </div>
                </div>
              </div>

              {/* Scroll Depth */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Scroll Depth</span>
                  <span className="font-semibold">{mockData[selectedVariation].scrollDepth}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${mockData[selectedVariation].scrollDepth}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Test Headlines */}
          <div className="space-y-2 pt-3 border-t">
            <p className="text-xs font-semibold text-foreground">Current Headlines:</p>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p>{variations[selectedVariation].headline.main}</p>
              <p className="text-primary">{variations[selectedVariation].headline.gradient}</p>
              <p className="italic">{variations[selectedVariation].headline.subtitle}</p>
            </div>
          </div>

          {/* CTA Variations */}
          <div className="space-y-2 pt-3 border-t">
            <p className="text-xs font-semibold text-foreground">CTA Variations:</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                {variations[selectedVariation].cta.primary}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {variations[selectedVariation].cta.secondary}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}