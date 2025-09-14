import { getCurrentVariation } from "@/landing/v1/config/variations";

/**
 * Simple, lightweight tracking service for A/B tests
 * No external dependencies - just our own backend
 */

// Generate or retrieve session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem("ab_session_id");

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("ab_session_id", sessionId);
  }

  return sessionId;
}

// Get page version from URL
function getPageVersion(): string {
  const path = window.location.pathname;
  if (path === "/a") return "a";
  if (path === "/b") return "b";
  return "original";
}

// Get device type
function getDeviceType(): string {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

// Get browser name
function getBrowserName(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Edge")) return "Edge";
  return "Other";
}

// Track page metrics
let pageStartTime = Date.now();
let maxScrollDepth = 0;

// Update scroll depth
if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    maxScrollDepth = Math.max(maxScrollDepth, scrollPercentage);
  });
}

/**
 * Core tracking function
 */
export async function track(
  eventType: "page_view" | "click" | "scroll" | "conversion",
  eventName: string,
  properties?: Record<string, any>
): Promise<void> {
  try {
    const variation = getCurrentVariation();
    const sessionId = getSessionId();
    const pageVersion = getPageVersion();

    // Send event to our backend
    await fetch("/api/tracking/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        eventName,
        variation: variation.id,
        pageVersion,
        sessionId,
        properties,
        userId: localStorage.getItem("user_id") || undefined,
      }),
    });

    // Log in development
    if (import.meta.env.DEV) {
      console.log("📊 Tracked:", {
        eventType,
        eventName,
        variation: variation.id,
        pageVersion,
        ...properties,
      });
    }
  } catch (error) {
    console.error("Tracking error:", error);
    // Fail silently - don't break the user experience
  }
}

/**
 * Track page view
 */
export function trackPageView(): void {
  pageStartTime = Date.now();
  track("page_view", "page_viewed");
}

/**
 * Track CTA click
 */
export function trackCTAClick(buttonText: string, section: string): void {
  track("click", "cta_clicked", {
    button_text: buttonText,
    section,
    time_to_click: Math.floor((Date.now() - pageStartTime) / 1000),
  });
}

/**
 * Track scroll milestone
 */
export function trackScrollMilestone(depth: number): void {
  track("scroll", `scroll_${depth}`, {
    depth,
    time_to_scroll: Math.floor((Date.now() - pageStartTime) / 1000),
  });
}

/**
 * Track conversion
 */
export function trackConversion(
  conversionType: "whatsapp_click" | "demo_request" | "purchase_intent" | "form_submit",
  value?: number
): void {
  track("conversion", `conversion_${conversionType}`, {
    conversionType,
    value,
    time_to_convert: Math.floor((Date.now() - pageStartTime) / 1000),
  });
}

/**
 * Update session with final metrics before user leaves
 */
export async function updateSession(): Promise<void> {
  try {
    const sessionId = getSessionId();
    const timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);

    await fetch("/api/tracking/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        timeOnPage,
        scrollDepth: Math.round(maxScrollDepth),
        country: localStorage.getItem("user_country") || undefined,
        device: getDeviceType(),
        browser: getBrowserName(),
      }),
    });
  } catch (error) {
    console.error("Session update error:", error);
  }
}

// Auto-update session on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    // Use sendBeacon for reliability
    const sessionId = getSessionId();
    const timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);

    const data = JSON.stringify({
      sessionId,
      timeOnPage,
      scrollDepth: Math.round(maxScrollDepth),
      device: getDeviceType(),
      browser: getBrowserName(),
    });

    navigator.sendBeacon("/api/tracking/session", data);
  });
}

/**
 * Hook for React components
 */
export function useTracking() {
  return {
    track,
    trackPageView,
    trackCTAClick,
    trackScrollMilestone,
    trackConversion,
    updateSession,
  };
}