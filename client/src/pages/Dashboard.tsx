import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UsersIcon,
  CursorArrowRaysIcon,
  ClockIcon,
  CheckCircleIcon,
  EyeIcon,
  BeakerIcon,
  FunnelIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { variations } from "@/landing/v1/config/variations";

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

interface Event {
  id: string;
  eventType: string;
  eventName: string;
  variation: string;
  pageVersion: string;
  sessionId: string;
  properties: any;
  createdAt: string;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState("7");
  const [selectedVariation, setSelectedVariation] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState("conversions");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Fetch metrics
  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        days: selectedDays,
        ...(selectedVariation !== "all" && { variation: selectedVariation }),
      });

      const response = await fetch(`/api/tracking/metrics?${params}`);
      const data = await response.json();

      if (data.success) {
        setMetrics(data.metrics);
      }
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    } finally {
      setLoading(false);
      setLastRefresh(new Date());
    }
  };

  // Fetch recent events
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/tracking/events?limit=50");
      const data = await response.json();

      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchEvents();
  }, [selectedDays, selectedVariation]);

  // Auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchMetrics();
        fetchEvents();
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, selectedDays, selectedVariation]);

  // Calculate aggregate stats
  const totalSessions = metrics.reduce((sum, m) => sum + m.totalSessions, 0);
  const totalConversions = metrics.reduce((sum, m) => sum + m.conversions, 0);
  const overallConversionRate = totalSessions > 0 ? (totalConversions / totalSessions) * 100 : 0;
  const avgTimeOnPage = metrics.reduce((sum, m) => sum + m.avgTimeOnPage * m.totalSessions, 0) / (totalSessions || 1);

  // Find winner
  const winner = metrics.reduce((best, current) => {
    if (!best || current.conversionRate > best.conversionRate) {
      return current;
    }
    return best;
  }, null as Metric | null);

  // Prepare chart data
  const conversionChartData = metrics.map(m => ({
    name: `${variations[m.variation]?.name || m.variation} (${m.pageVersion.toUpperCase()})`,
    conversionRate: m.conversionRate,
    sessions: m.totalSessions,
    conversions: m.conversions,
  }));

  const engagementChartData = metrics.map(m => ({
    name: `${m.variation}-${m.pageVersion}`,
    timeOnPage: Math.round(m.avgTimeOnPage),
    scrollDepth: Math.round(m.avgScrollDepth),
    bounceRate: m.bounceRate,
  }));

  // Event type distribution
  const eventTypeDistribution = events.reduce((acc, event) => {
    acc[event.eventType] = (acc[event.eventType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(eventTypeDistribution).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  // Export data
  const handleExport = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(selectedDays));

    window.open(
      `/api/tracking/export?startDate=${startDate.toISOString()}&endDate=${new Date().toISOString()}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BeakerIcon className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  A/B Test Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Real-time performance metrics and insights
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Time Range Selector */}
              <Select value={selectedDays} onValueChange={setSelectedDays}>
                <SelectTrigger className="w-40">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Last 24 hours</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="14">Last 14 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectContent>
              </Select>

              {/* Variation Filter */}
              <Select value={selectedVariation} onValueChange={setSelectedVariation}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Variations</SelectItem>
                  {Object.entries(variations).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Actions */}
              <Button
                variant="outline"
                size="icon"
                onClick={fetchMetrics}
                disabled={loading}
              >
                <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </Button>

              <Button variant="outline" onClick={handleExport}>
                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                Export CSV
              </Button>

              {/* Auto-refresh toggle */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Auto-refresh</span>
              </label>
            </div>
          </div>

          {/* Last refresh indicator */}
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <UsersIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all variations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <CheckCircleIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConversions}</div>
              <p className="text-xs text-muted-foreground">
                {overallConversionRate.toFixed(2)}% conversion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
              <ClockIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(avgTimeOnPage)}s</div>
              <p className="text-xs text-muted-foreground">
                Average engagement time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Winner</CardTitle>
              <ArrowTrendingUpIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {winner ? (
                <>
                  <div className="text-2xl font-bold">
                    {variations[winner.variation]?.name || winner.variation}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {winner.conversionRate.toFixed(2)}% conversion rate
                  </p>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">No data yet</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="conversion" className="space-y-4">
          <TabsList>
            <TabsTrigger value="conversion">Conversion Analysis</TabsTrigger>
            <TabsTrigger value="engagement">Engagement Metrics</TabsTrigger>
            <TabsTrigger value="events">Event Distribution</TabsTrigger>
            <TabsTrigger value="table">Detailed Table</TabsTrigger>
          </TabsList>

          <TabsContent value="conversion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate by Variation</CardTitle>
                <CardDescription>
                  Comparing conversion performance across all test variations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={conversionChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="conversionRate" fill="#10b981" name="Conversion Rate (%)" />
                    <Bar dataKey="sessions" fill="#3b82f6" name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Metrics</CardTitle>
                <CardDescription>
                  Time on page, scroll depth, and bounce rate analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={engagementChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="timeOnPage" stroke="#10b981" name="Time on Page (s)" />
                    <Line type="monotone" dataKey="scrollDepth" stroke="#3b82f6" name="Scroll Depth (%)" />
                    <Line type="monotone" dataKey="bounceRate" stroke="#ef4444" name="Bounce Rate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Type Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of tracked events by type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>
                    Live feed of the last 10 tracked events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {events.slice(0, 10).map((event) => (
                      <div key={event.id} className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{event.eventType}</Badge>
                          <span className="text-sm">{event.eventName}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="table" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Metrics Table</CardTitle>
                <CardDescription>
                  Complete breakdown of all variations and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Variation</th>
                        <th className="text-center p-2">Version</th>
                        <th className="text-center p-2">Sessions</th>
                        <th className="text-center p-2">Conversions</th>
                        <th className="text-center p-2">Conv. Rate</th>
                        <th className="text-center p-2">Avg. Time</th>
                        <th className="text-center p-2">Scroll Depth</th>
                        <th className="text-center p-2">Bounce Rate</th>
                        <th className="text-center p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.map((metric, idx) => (
                        <tr key={idx} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">
                            {variations[metric.variation]?.name || metric.variation}
                          </td>
                          <td className="text-center p-2">
                            <Badge variant="outline">
                              {metric.pageVersion.toUpperCase()}
                            </Badge>
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
                          <td className="text-center p-2">
                            {metric === winner ? (
                              <Badge className="bg-green-500 text-white">
                                Winner
                              </Badge>
                            ) : metric.conversionRate > overallConversionRate ? (
                              <Badge className="bg-blue-500 text-white">
                                Above Avg
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Below Avg
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Statistical Note */}
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Statistical Significance:</strong> For reliable results, aim for at least 100 sessions per variation.
                    Current total: <strong>{totalSessions} sessions</strong> across {metrics.length} variations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" onClick={() => window.open("/", "_blank")}>
                <EyeIcon className="w-4 h-4 mr-2" />
                View Original Page
              </Button>
              <Button variant="outline" onClick={() => window.open("/a", "_blank")}>
                <EyeIcon className="w-4 h-4 mr-2" />
                View Version A
              </Button>
              <Button variant="outline" onClick={() => window.open("/b", "_blank")}>
                <EyeIcon className="w-4 h-4 mr-2" />
                View Version B
              </Button>
              <Button variant="outline" onClick={() => window.open("/a?v=problem", "_blank")}>
                <BeakerIcon className="w-4 h-4 mr-2" />
                Test Problem Variation
              </Button>
              <Button variant="outline" onClick={() => window.open("/b?v=savings", "_blank")}>
                <BeakerIcon className="w-4 h-4 mr-2" />
                Test Savings Variation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}