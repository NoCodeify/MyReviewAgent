import { Router } from "express";
import { memoryStore } from "../db/memory-store.js";
import type { NewABTestEvent, NewABTestSession } from "../db/schema/tracking.js";

const router = Router();

/**
 * Track an event from the frontend
 * POST /api/tracking/event
 */
router.post("/event", async (req, res) => {
  try {
    const {
      eventType,
      eventName,
      variation,
      pageVersion,
      sessionId,
      properties,
      userId
    } = req.body;

    // Validate required fields
    if (!eventType || !eventName || !variation || !pageVersion || !sessionId) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Get user agent and referrer from headers
    const userAgent = req.headers["user-agent"] || "";
    const referrer = req.headers.referer || "";

    // Insert event
    const event: NewABTestEvent = {
      eventType,
      eventName,
      variation,
      pageVersion,
      sessionId,
      userId,
      properties,
      userAgent,
      referrer
    };

    await memoryStore.insertEvent(event);

    // Update session if needed
    if (eventType === "page_view") {
      // Create or update session
      const session: NewABTestSession = {
        id: sessionId,
        variation,
        pageVersion,
        startedAt: new Date()
      };
      await memoryStore.upsertSession(session);
    } else if (eventType === "conversion") {
      // Mark session as converted
      await memoryStore.updateSession(sessionId, {
        converted: true,
        conversionType: properties?.conversionType || "unknown"
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to track event"
    });
  }
});

/**
 * Update session metrics
 * POST /api/tracking/session
 */
router.post("/session", async (req, res) => {
  try {
    const {
      sessionId,
      timeOnPage,
      scrollDepth,
      country,
      device,
      browser
    } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: "Missing session ID"
      });
    }

    // Update session metrics
    await memoryStore.updateSession(sessionId, {
      timeOnPage,
      maxScrollDepth: scrollDepth,
      country,
      device,
      browser,
      endedAt: new Date()
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Session update error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update session"
    });
  }
});

/**
 * Get metrics for dashboard
 * GET /api/tracking/metrics
 */
router.get("/metrics", async (req, res) => {
  try {
    const { variation, pageVersion, days = 7 } = req.query;

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));

    // Get metrics from memory store
    const metrics = await memoryStore.getMetrics({
      startDate,
      endDate,
      variation: variation as string | undefined,
      pageVersion: pageVersion as string | undefined,
    });

    res.json({
      success: true,
      metrics,
      dateRange: {
        start: startDate,
        end: endDate
      }
    });
  } catch (error) {
    console.error("Metrics error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get metrics"
    });
  }
});

/**
 * Get recent events for debugging
 * GET /api/tracking/events
 */
router.get("/events", async (req, res) => {
  try {
    const { limit = 100, sessionId } = req.query;

    const events = await memoryStore.getEvents({
      sessionId: sessionId as string | undefined,
      limit: Number(limit),
    });

    res.json({
      success: true,
      events
    });
  } catch (error) {
    console.error("Events error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get events"
    });
  }
});

/**
 * Export metrics as CSV
 * GET /api/tracking/export
 */
router.get("/export", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const sessions = await memoryStore.getSessions({
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });

    // Sort by startedAt descending
    sessions.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());

    // Convert to CSV
    const headers = [
      "Session ID",
      "Variation",
      "Page Version",
      "Time on Page",
      "Scroll Depth",
      "Converted",
      "Conversion Type",
      "Country",
      "Device",
      "Started At"
    ];

    const rows = sessions.map(s => [
      s.id,
      s.variation,
      s.pageVersion,
      s.timeOnPage || 0,
      s.maxScrollDepth || 0,
      s.converted ? "Yes" : "No",
      s.conversionType || "",
      s.country || "",
      s.device || "",
      s.startedAt?.toISOString() || ""
    ]);

    const csv = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=ab-test-export.csv");
    res.send(csv);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to export data"
    });
  }
});

export default router;