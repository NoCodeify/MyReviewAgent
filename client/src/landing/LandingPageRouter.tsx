/**
 * Landing Page Router
 * Routes to different page structures based on experiment variant
 */

import { useExperiment } from '@/experiments/hooks/useExperiment';
import LandingV1Original from './v1/index';
import LandingV1A from './v1/indexA';
import LandingV1B from './v1/indexB';

export default function LandingPageRouter() {
  // Get page structure experiment variant
  const { variant, isLoading } = useExperiment('page-structure');

  // Show loading state briefly while experiment loads
  if (isLoading) {
    return null; // Or a loading spinner if preferred
  }

  // Route to appropriate page structure based on experiment variant
  switch (variant) {
    case 'problem-focused':
      // 10 components, problem-agitation focused
      return <LandingV1A />;

    case 'value-focused':
      // 8 components, value and ROI focused
      return <LandingV1B />;

    case 'original':
    default:
      // Full 18-component page
      return <LandingV1Original />;
  }
}