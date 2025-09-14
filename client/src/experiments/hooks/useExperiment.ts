/**
 * useExperiment Hook
 * React hook for easy experiment integration in components
 */

import { useState, useEffect, useCallback } from 'react';
import ExperimentManager from '../ExperimentManager';
import { getExperiment } from '../config';

interface ExperimentHookResult {
  variant: string;
  config: Record<string, any>;
  isLoading: boolean;
  trackEvent: (eventName: string, data?: Record<string, any>) => void;
  trackGoal: (goalName: string, value?: number) => void;
  trackConversion: (type: string, value?: number) => void;
}

/**
 * Hook to use an experiment in a component
 */
export function useExperiment(experimentId: string): ExperimentHookResult {
  const [variant, setVariant] = useState<string>('control');
  const [config, setConfig] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const manager = ExperimentManager.getInstance();

    // Get or assign variant
    const assignedVariant = manager.getVariant(experimentId);
    setVariant(assignedVariant);

    // Get variant configuration
    const variantConfig = manager.getVariantConfig(experimentId, assignedVariant);
    setConfig(variantConfig);

    // Track exposure (user has seen this variant)
    manager.trackExposure(experimentId);

    setIsLoading(false);
  }, [experimentId]);

  // Track custom event
  const trackEvent = useCallback((eventName: string, data?: Record<string, any>) => {
    const manager = ExperimentManager.getInstance();
    manager.trackEvent(experimentId, eventName, data);
  }, [experimentId]);

  // Track goal
  const trackGoal = useCallback((goalName: string, value?: number) => {
    const manager = ExperimentManager.getInstance();
    manager.trackGoal(experimentId, goalName, value);
  }, [experimentId]);

  // Track conversion
  const trackConversion = useCallback((type: string, value?: number) => {
    const manager = ExperimentManager.getInstance();
    manager.trackConversion(type, value);
  }, []);

  return {
    variant,
    config,
    isLoading,
    trackEvent,
    trackGoal,
    trackConversion
  };
}

/**
 * Hook to get all active experiments for a user
 */
export function useAllExperiments(): Record<string, string> {
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  useEffect(() => {
    const manager = ExperimentManager.getInstance();
    const allAssignments = manager.getAllAssignments();
    setAssignments(allAssignments);
  }, []);

  return assignments;
}

/**
 * Hook for experiment debugging
 */
export function useExperimentDebug() {
  const assignments = useAllExperiments();

  const resetAllExperiments = useCallback(() => {
    const manager = ExperimentManager.getInstance();
    manager.resetAllExperiments();
    window.location.reload();
  }, []);

  const resetExperiment = useCallback((experimentId: string) => {
    const manager = ExperimentManager.getInstance();
    manager.resetExperiment(experimentId);
    window.location.reload();
  }, []);

  return {
    assignments,
    resetAllExperiments,
    resetExperiment
  };
}