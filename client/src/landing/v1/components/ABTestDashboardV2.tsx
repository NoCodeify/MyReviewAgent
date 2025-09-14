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
  CursorArrowRaysIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

interface Metric {
  variation: string;
  pageVersion: string;
  totalSessions: number;
  conversions: number;
  conversionRate: number;
  avgTimeOnPage: number;
  avgScrollDepth: number;
  bounceRate: number;
}

/**
 * Real-time A/B Test Dashboard using our backend
 * Shows actual metrics from our tracking system
 */
export default function ABTestDashboardV2() {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState(7);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch real metrics
  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tracking/metrics?days=${selectedDays}`);
      const data = await response.json();

      if (data.success) {
        setMetrics(data.metrics);
      }
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only show dashboard with debug parameter
    const urlParams = new URLSearchParams(window.location.search);
    const debugMode = urlParams.get("debug") === "true";
    setIsVisible(debugMode);

    if (debugMode) {
      fetchMetrics();
    }
  }, [selectedDays]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (isVisible && autoRefresh) {
      const interval = setInterval(fetchMetrics, 30000);
      return () => clearInterval(interval);
    }
  }, [isVisible, autoRefresh, selectedDays]);

  if (!isVisible) return null;

  // Group metrics by variation
  const metricsByVariation = metrics.reduce((acc, metric) => {
    const key = `${metric.variation}-${metric.pageVersion}`;
    acc[key] = metric;
    return acc;
  }, {} as Record<string, Metric>);

  // Calculate winner
  const winner = Object.values(metricsByVariation).reduce((best, current) => {
    if (!best || current.conversionRate > best.conversionRate) {
      return current;
    }
    return best;
  }, null as Metric | null);

  // Export data
  const handleExport = async () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - selectedDays);

    window.open(
      `/api/tracking/export?startDate=${startDate.toISOString()}&endDate=${new Date().toISOString()}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-2xl">
      <Card className="p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BeakerIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">A/B Test Dashboard</h3>
              <Badge className="bg-green-500/10 text-green-600">
                Live Data
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={fetchMetrics}
                disabled={loading}
                className="h-8 w-8"
              >
                <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleExport}
                className="h-8 w-8"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show data for:</span>
            <select
              value={selectedDays}
              onChange={(e) => setSelectedDays(Number(e.target.value))}
              className="text-sm border rounded px-2 py-1"
            >
              <option value={1}>Last 24 hours</option>
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-3 h-3"
              />
              Auto-refresh
            </label>
          </div>

          {/* Metrics Grid */}
          {loading ? (
            <div className="text-center py-8">
              <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">Loading metrics...</p>
            </div>
          ) : metrics.length === 0 ? (
            <div className="text-center py-8">
              <ChartBarIcon className="w-8 h-8 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">No data yet. Start driving traffic!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Winner Badge */}
              {winner && (
                <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white">
                      🏆 Current Winner
                    </Badge>
                    <span className="text-sm font-semibold">
                      {variations[winner.variation]?.name || winner.variation} - Version {winner.pageVersion.toUpperCase()}
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      {winner.conversionRate.toFixed(2)}% conversion
                    </span>
                  </div>
                </div>
              )}

              {/* Metrics Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Variation</th>
                      <th className="text-center p-2">Sessions</th>
                      <th className="text-center p-2">Conversions</th>
                      <th className="text-center p-2">Rate</th>
                      <th className="text-center p-2">Avg Time</th>
                      <th className="text-center p-2">Scroll</th>
                      <th className="text-center p-2">Bounce</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(metricsByVariation).map(([key, metric]) => (
                      <tr key={key} className="border-b hover:bg-muted/50">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">
                              {variations[metric.variation]?.name || metric.variation}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Version {metric.pageVersion.toUpperCase()}
                            </div>
                          </div>
                        </td>
                        <td className="text-center p-2">{metric.totalSessions}</td>
                        <td className="text-center p-2">{metric.conversions}</td>
                        <td className="text-center p-2">
                          <Badge
                            className={
                              metric === winner
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {metric.conversionRate.toFixed(2)}%
                          </Badge>
                        </td>
                        <td className="text-center p-2">
                          {Math.round(metric.avgTimeOnPage)}s
                        </td>
                        <td className="text-center p-2">
                          {Math.round(metric.avgScrollDepth)}%
                        </td>
                        <td className="text-center p-2">
                          {metric.bounceRate.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Statistical Significance Note */}
              <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                <p>
                  <strong>Note:</strong> For statistical significance, aim for at least 100 sessions per variation.
                  Current total: {metrics.reduce((sum, m) => sum + m.totalSessions, 0)} sessions.
                </p>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex gap-2 pt-2 border-t">
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.href = "/"}
            >
              View Original
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.href = "/a"}
            >
              View Version A
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.href = "/b"}
            >
              View Version B
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}