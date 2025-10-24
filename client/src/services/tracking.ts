/**
 * Stub tracking service - A/B testing removed
 * These functions are no-ops for components that still reference them
 */

export function trackPageView() {
  // No-op
}

export function trackCTAClick(buttonText: string, location: string) {
  // No-op
}

export function trackConversion(type: string, value?: number) {
  // No-op
}

export function trackScrollMilestone(milestone: number) {
  // No-op
}

export function updateSession() {
  // No-op
}
