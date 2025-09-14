import { pgTable, text, timestamp, integer, boolean, jsonb, uuid, index, real } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * A/B Test Events Table
 * Stores all tracking events from the frontend
 */
export const abTestEvents = pgTable("ab_test_events", {
  id: uuid("id").primaryKey().defaultRandom(),

  // Event details
  eventType: text("event_type").notNull(), // page_view, click, scroll, conversion
  eventName: text("event_name").notNull(), // hero_cta_clicked, scroll_50, etc

  // A/B test context
  variation: text("variation").notNull(), // control, problem, savings, speed, proof
  pageVersion: text("page_version").notNull(), // original, a, b

  // Session/user tracking
  sessionId: text("session_id").notNull(),
  userId: text("user_id"), // Optional, if we have user auth

  // Metadata
  properties: jsonb("properties"), // Additional event properties
  userAgent: text("user_agent"),
  referrer: text("referrer"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  // Indexes for fast queries
  sessionIdx: index("session_idx").on(table.sessionId),
  variationIdx: index("variation_idx").on(table.variation),
  eventTypeIdx: index("event_type_idx").on(table.eventType),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
}));

/**
 * A/B Test Sessions Table
 * Tracks user sessions for conversion funnel analysis
 */
export const abTestSessions = pgTable("ab_test_sessions", {
  id: text("id").primaryKey(), // Session ID from frontend

  // Session details
  variation: text("variation").notNull(),
  pageVersion: text("page_version").notNull(),

  // Metrics
  timeOnPage: integer("time_on_page"), // Seconds
  maxScrollDepth: real("max_scroll_depth"), // Percentage (0-100)
  bounced: boolean("bounced").default(false),
  converted: boolean("converted").default(false),

  // User context
  country: text("country"),
  device: text("device"), // mobile, tablet, desktop
  browser: text("browser"),

  // Timestamps
  startedAt: timestamp("started_at").defaultNow().notNull(),
  endedAt: timestamp("ended_at"),

  // Conversion details
  conversionType: text("conversion_type"), // cta_click, whatsapp_click, form_submit
  conversionValue: real("conversion_value"), // For tracking revenue if applicable
}, (table) => ({
  variationIdx: index("session_variation_idx").on(table.variation),
  convertedIdx: index("converted_idx").on(table.converted),
  startedAtIdx: index("started_at_idx").on(table.startedAt),
}));

/**
 * A/B Test Metrics (Aggregated)
 * Pre-calculated metrics for fast dashboard loading
 */
export const abTestMetrics = pgTable("ab_test_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),

  // Identifiers
  variation: text("variation").notNull(),
  pageVersion: text("page_version").notNull(),
  date: timestamp("date").notNull(), // Daily aggregation

  // Core metrics
  views: integer("views").default(0).notNull(),
  uniqueVisitors: integer("unique_visitors").default(0).notNull(),
  conversions: integer("conversions").default(0).notNull(),
  conversionRate: real("conversion_rate"), // Pre-calculated percentage

  // Engagement metrics
  avgTimeOnPage: real("avg_time_on_page"), // Seconds
  avgScrollDepth: real("avg_scroll_depth"), // Percentage
  bounceRate: real("bounce_rate"), // Percentage

  // Click metrics
  ctaClicks: integer("cta_clicks").default(0).notNull(),
  ctaClickRate: real("cta_click_rate"), // Percentage

  // Updated timestamp
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  // Composite index for fast lookups
  lookupIdx: index("metrics_lookup_idx").on(table.variation, table.pageVersion, table.date),
}));

// Types for TypeScript
export type ABTestEvent = typeof abTestEvents.$inferSelect;
export type NewABTestEvent = typeof abTestEvents.$inferInsert;

export type ABTestSession = typeof abTestSessions.$inferSelect;
export type NewABTestSession = typeof abTestSessions.$inferInsert;

export type ABTestMetric = typeof abTestMetrics.$inferSelect;
export type NewABTestMetric = typeof abTestMetrics.$inferInsert;