/**
 * Experiments Debug Panel
 * Shows active experiments and allows resetting for development
 */

import { useState } from 'react';
import { useExperimentDebug } from '../hooks/useExperiment';
import { EXPERIMENTS } from '../config';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BeakerIcon,
  ArrowPathIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function ExperimentsDebugPanel() {
  const { assignments, resetAllExperiments, resetExperiment } = useExperimentDebug();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development or with debug parameter
  const isDev = import.meta.env.DEV;
  const hasDebug = new URLSearchParams(window.location.search).get('debug') === 'true';

  if (!isDev && !hasDebug) return null;

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        size="icon"
        className="fixed bottom-20 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        title="Show Experiments Panel"
      >
        <BeakerIcon className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-2xl border-purple-200 dark:border-purple-800 max-w-md">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BeakerIcon className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-sm">Active Experiments</h3>
            <Badge variant="outline" className="text-xs">
              {Object.keys(assignments).length} active
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6"
            >
              {isExpanded ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronUpIcon className="w-4 h-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6"
            >
              <XMarkIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Experiments List */}
        <div className="space-y-2">
          {Object.entries(assignments).map(([expId, variant]) => {
            const experiment = EXPERIMENTS[expId];
            if (!experiment) return null;

            return (
              <div
                key={expId}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {experiment.name}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className="text-xs"
                      variant={variant === 'control' ? 'secondary' : 'default'}
                    >
                      {variant}
                    </Badge>
                    {isExpanded && (
                      <span className="text-xs text-gray-500">
                        {experiment.primaryMetric}
                      </span>
                    )}
                  </div>
                </div>
                {isExpanded && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => resetExperiment(expId)}
                    className="h-6 w-6"
                    title="Reset this experiment"
                  >
                    <ArrowPathIcon className="w-3 h-3" />
                  </Button>
                )}
              </div>
            );
          })}

          {Object.keys(assignments).length === 0 && (
            <div className="text-sm text-gray-500 text-center py-2">
              No experiments assigned yet
            </div>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            {/* Hypothesis for each experiment */}
            {Object.entries(assignments).map(([expId, variant]) => {
              const experiment = EXPERIMENTS[expId];
              if (!experiment) return null;

              return (
                <div key={expId} className="text-xs">
                  <div className="font-medium text-gray-600 dark:text-gray-400">
                    {experiment.name}:
                  </div>
                  <div className="text-gray-500 dark:text-gray-500 mt-1">
                    {experiment.hypothesis}
                  </div>
                </div>
              );
            })}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={resetAllExperiments}
                className="flex-1 text-xs"
              >
                <ArrowPathIcon className="w-3 h-3 mr-1" />
                Reset All
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open('https://clarity.microsoft.com', '_blank')}
                className="flex-1 text-xs"
              >
                View in Clarity
              </Button>
            </div>

            {/* Info */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>Data is being tracked in Microsoft Clarity.</p>
              <p className="mt-1">
                Use custom filters in Clarity to analyze results:
              </p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {Object.entries(assignments).map(([expId, variant]) => (
                  <li key={expId}>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
                      exp_{expId} = {variant}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}