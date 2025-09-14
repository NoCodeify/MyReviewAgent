/**
 * In-memory store for A/B test tracking
 * Used as a fallback when DATABASE_URL is not configured
 */

import type { NewABTestEvent, NewABTestSession, ABTestEvent, ABTestSession } from "./schema/tracking.js";

interface MemoryStore {
  events: Map<string, ABTestEvent>;
  sessions: Map<string, ABTestSession>;
  metrics: Map<string, any>;
}

const store: MemoryStore = {
  events: new Map(),
  sessions: new Map(),
  metrics: new Map(),
};

export const memoryStore = {
  // Events
  async insertEvent(event: NewABTestEvent): Promise<void> {
    const id = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullEvent: ABTestEvent = {
      id,
      ...event,
      createdAt: new Date(),
    };
    store.events.set(id, fullEvent);
  },

  async getEvents(options?: { sessionId?: string; limit?: number }): Promise<ABTestEvent[]> {
    let events = Array.from(store.events.values());

    if (options?.sessionId) {
      events = events.filter(e => e.sessionId === options.sessionId);
    }

    // Sort by createdAt descending
    events.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (options?.limit) {
      events = events.slice(0, options.limit);
    }

    return events;
  },

  // Sessions
  async upsertSession(session: NewABTestSession): Promise<void> {
    const existing = store.sessions.get(session.id);

    if (existing) {
      // Update existing session
      store.sessions.set(session.id, {
        ...existing,
        ...session,
        startedAt: existing.startedAt, // Keep original start time
      });
    } else {
      // Create new session
      const fullSession: ABTestSession = {
        ...session,
        bounced: session.bounced ?? false,
        converted: session.converted ?? false,
        startedAt: session.startedAt ?? new Date(),
      };
      store.sessions.set(session.id, fullSession);
    }
  },

  async updateSession(sessionId: string, updates: Partial<ABTestSession>): Promise<void> {
    const existing = store.sessions.get(sessionId);
    if (existing) {
      store.sessions.set(sessionId, {
        ...existing,
        ...updates,
      });
    }
  },

  async getSessions(options?: {
    startDate?: Date;
    endDate?: Date;
    variation?: string;
    pageVersion?: string;
  }): Promise<ABTestSession[]> {
    let sessions = Array.from(store.sessions.values());

    if (options?.startDate) {
      sessions = sessions.filter(s => s.startedAt >= options.startDate!);
    }

    if (options?.endDate) {
      sessions = sessions.filter(s => s.startedAt <= options.endDate!);
    }

    if (options?.variation) {
      sessions = sessions.filter(s => s.variation === options.variation);
    }

    if (options?.pageVersion) {
      sessions = sessions.filter(s => s.pageVersion === options.pageVersion);
    }

    return sessions;
  },

  // Metrics calculation
  async getMetrics(options?: {
    startDate?: Date;
    endDate?: Date;
    variation?: string;
    pageVersion?: string;
  }): Promise<any[]> {
    const sessions = await this.getSessions(options);

    // Group sessions by variation and pageVersion
    const grouped = new Map<string, ABTestSession[]>();

    for (const session of sessions) {
      const key = `${session.variation}-${session.pageVersion}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(session);
    }

    // Calculate metrics for each group
    const metrics = [];

    for (const [key, groupSessions] of grouped) {
      const [variation, pageVersion] = key.split('-');
      const totalSessions = groupSessions.length;
      const conversions = groupSessions.filter(s => s.converted).length;
      const bounces = groupSessions.filter(s => s.bounced).length;

      const avgTimeOnPage = groupSessions.reduce((sum, s) => sum + (s.timeOnPage || 0), 0) / totalSessions;
      const avgScrollDepth = groupSessions.reduce((sum, s) => sum + (s.maxScrollDepth || 0), 0) / totalSessions;

      metrics.push({
        variation,
        pageVersion,
        totalSessions,
        conversions,
        conversionRate: totalSessions > 0 ? (conversions / totalSessions) * 100 : 0,
        avgTimeOnPage: Math.round(avgTimeOnPage),
        avgScrollDepth: Math.round(avgScrollDepth),
        bounceRate: totalSessions > 0 ? (bounces / totalSessions) * 100 : 0,
        bounces,
      });
    }

    return metrics;
  },

  // Clear all data (useful for testing)
  clear(): void {
    store.events.clear();
    store.sessions.clear();
    store.metrics.clear();
  },
};