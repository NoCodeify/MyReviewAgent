/**
 * ExperimentManager - Handles experiment assignment and tracking
 * Uses Microsoft Clarity for analytics
 */

import { EXPERIMENTS, type Experiment, type Variant } from './config';

// Extend Window interface for Clarity
declare global {
  interface Window {
    clarity: (action: string, ...args: any[]) => void;
  }
}

class ExperimentManager {
  private static instance: ExperimentManager;
  private experiments = EXPERIMENTS;
  private assignments: Map<string, string> = new Map();

  private constructor() {
    // Load existing assignments from localStorage
    this.loadAssignments();
  }

  static getInstance(): ExperimentManager {
    if (!ExperimentManager.instance) {
      ExperimentManager.instance = new ExperimentManager();
    }
    return ExperimentManager.instance;
  }

  /**
   * Load assignments from localStorage
   */
  private loadAssignments(): void {
    Object.keys(this.experiments).forEach(expId => {
      const stored = localStorage.getItem(`exp_${expId}`);
      if (stored) {
        this.assignments.set(expId, stored);
      }
    });
  }

  /**
   * Select a variant based on weights
   */
  private selectVariant(variants: Variant[]): string {
    const random = Math.random();
    let cumulative = 0;

    for (const variant of variants) {
      cumulative += variant.weight;
      if (random < cumulative) {
        return variant.id;
      }
    }

    // Fallback to last variant (shouldn't happen if weights sum to 1)
    return variants[variants.length - 1].id;
  }

  /**
   * Get or assign variant for an experiment
   */
  getVariant(experimentId: string): string {
    // Check if already assigned
    if (this.assignments.has(experimentId)) {
      return this.assignments.get(experimentId)!;
    }

    const experiment = this.experiments[experimentId];
    if (!experiment || experiment.status !== 'active') {
      return 'control'; // Default fallback
    }

    // Assign new variant
    const variant = this.selectVariant(experiment.variants);

    // Store assignment
    this.assignments.set(experimentId, variant);
    localStorage.setItem(`exp_${experimentId}`, variant);

    // Track assignment in Clarity
    this.trackAssignment(experimentId, variant);

    return variant;
  }

  /**
   * Get variant configuration
   */
  getVariantConfig(experimentId: string, variantId?: string): Record<string, any> {
    const experiment = this.experiments[experimentId];
    if (!experiment) return {};

    const variant = variantId || this.getVariant(experimentId);
    const variantData = experiment.variants.find(v => v.id === variant);

    return variantData?.config || {};
  }

  /**
   * Track experiment assignment in Clarity
   */
  private trackAssignment(experimentId: string, variant: string): void {
    if (typeof window !== 'undefined' && window.clarity) {
      // Set custom identifier for this experiment
      window.clarity('set', `exp_${experimentId}`, variant);

      // Track assignment event
      window.clarity('event', 'experiment_assigned', {
        experiment: experimentId,
        variant: variant,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Track experiment exposure (when user sees the variant)
   */
  trackExposure(experimentId: string): void {
    const variant = this.getVariant(experimentId);

    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', 'experiment_exposed', {
        experiment: experimentId,
        variant: variant,
        url: window.location.pathname,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Track custom event for an experiment
   */
  trackEvent(experimentId: string, eventName: string, data?: Record<string, any>): void {
    const variant = this.getVariant(experimentId);

    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', eventName, {
        experiment: experimentId,
        variant: variant,
        ...data,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Track goal/conversion for an experiment
   */
  trackGoal(experimentId: string, goalName: string, value?: number): void {
    const variant = this.getVariant(experimentId);

    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', `goal_${goalName}`, {
        experiment: experimentId,
        variant: variant,
        value: value,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Track conversion for ALL active experiments
   */
  trackConversion(conversionType: string, value?: number): void {
    // Track conversion for all active experiments
    Object.entries(this.experiments).forEach(([expId, experiment]) => {
      if (experiment.status === 'active' && this.assignments.has(expId)) {
        const variant = this.assignments.get(expId)!;

        if (typeof window !== 'undefined' && window.clarity) {
          window.clarity('event', 'conversion', {
            experiment: expId,
            variant: variant,
            type: conversionType,
            value: value,
            timestamp: Date.now()
          });
        }
      }
    });
  }

  /**
   * Get all current assignments (for debugging)
   */
  getAllAssignments(): Record<string, string> {
    const assignments: Record<string, string> = {};
    this.assignments.forEach((variant, expId) => {
      assignments[expId] = variant;
    });
    return assignments;
  }

  /**
   * Reset all experiments (for testing)
   */
  resetAllExperiments(): void {
    // Clear localStorage
    Object.keys(this.experiments).forEach(expId => {
      localStorage.removeItem(`exp_${expId}`);
    });

    // Clear internal state
    this.assignments.clear();

    // Track reset
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', 'experiments_reset', {
        timestamp: Date.now()
      });
    }
  }

  /**
   * Reset specific experiment
   */
  resetExperiment(experimentId: string): void {
    localStorage.removeItem(`exp_${experimentId}`);
    this.assignments.delete(experimentId);

    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', 'experiment_reset', {
        experiment: experimentId,
        timestamp: Date.now()
      });
    }
  }
}

export default ExperimentManager;