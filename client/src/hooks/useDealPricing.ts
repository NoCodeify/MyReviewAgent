import { useState, useEffect, useCallback } from 'react';
import {
  initializeFirstVisit,
  getDealStatus,
  getCurrentPrice,
  getCurrentPriceFormatted,
  getNextTierPrice,
  isFirstExpired,
  isFinalExpired,
  isReturningUser,
  isExpiredForced,
  onFirstTimerExpired,
  onFinalTimerExpired,
  getDealDebugInfo,
  getRegularPrice,
  getFirstExpiredPrice,
  getFinalExpiredPrice,
  checkAndUpdateDealStatus,
  type DealStatus
} from '@/services/dealManagement';

export interface DealPricingData {
  // Pricing
  price: number;
  formattedPrice: string;
  nextTierPrice: string;

  // Individual tier prices
  regularPrice: number;
  firstExpiredPrice: number;
  finalExpiredPrice: { price: number; period: string };

  // Status
  dealStatus: DealStatus;
  isFirstExpired: boolean;
  isFinalExpired: boolean;
  isReturning: boolean;
  isForced: DealStatus | null;

  // Actions
  markFirstExpired: () => void;
  markFinalExpired: () => void;

  // Debug
  debugInfo: ReturnType<typeof getDealDebugInfo>;
}

/**
 * Hook for managing dynamic pricing based on deal status
 * Handles cookie-based expiration, URL parameter overrides, and timer integration
 */
export function useDealPricing(tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'STARTER'): DealPricingData {
  const [dealStatus, setDealStatus] = useState<DealStatus>('regular');
  const [forceUpdate, setForceUpdate] = useState(0);

  // Initialize first visit tracking and check for auto-expiry on mount
  useEffect(() => {
    initializeFirstVisit();
    checkAndUpdateDealStatus(); // Check if deals should be auto-expired for returning users
  }, []);

  // Update deal status when component mounts or force update changes
  useEffect(() => {
    const status = getDealStatus();
    setDealStatus(status);
  }, [forceUpdate]);

  // Listen for URL parameter changes (for when user navigates with expired params)
  useEffect(() => {
    const handleLocationChange = () => {
      const status = getDealStatus();
      if (status !== dealStatus) {
        setDealStatus(status);
        setForceUpdate(prev => prev + 1);
      }
    };

    // Check for URL changes periodically (since we're not using router)
    const interval = setInterval(handleLocationChange, 500); // Check more frequently

    // Also check immediately
    handleLocationChange();

    return () => clearInterval(interval);
  }, [dealStatus]);

  // Listen for deal expiration events (from timer)
  useEffect(() => {
    const handleFirstDealExpired = () => {
      setDealStatus('first_expired');
      setForceUpdate(prev => prev + 1);
    };

    const handleFinalDealExpired = () => {
      setDealStatus('final_expired');
      setForceUpdate(prev => prev + 1);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('firstDealExpired', handleFirstDealExpired);
      window.addEventListener('finalDealExpired', handleFinalDealExpired);
      return () => {
        window.removeEventListener('firstDealExpired', handleFirstDealExpired);
        window.removeEventListener('finalDealExpired', handleFinalDealExpired);
      };
    }
  }, []);

  // Manual expiration triggers (can be called by timer components)
  const markFirstExpired = useCallback(() => {
    onFirstTimerExpired();
    setDealStatus('first_expired');
    setForceUpdate(prev => prev + 1);
  }, []);

  const markFinalExpired = useCallback(() => {
    onFinalTimerExpired();
    setDealStatus('final_expired');
    setForceUpdate(prev => prev + 1);
  }, []);

  // Calculate current pricing
  const price = getCurrentPrice(tier);
  const formattedPrice = getCurrentPriceFormatted(tier);
  const nextTierPrice = getNextTierPrice(tier);

  // Individual tier prices
  const regularPrice = getRegularPrice(tier);
  const firstExpiredPrice = getFirstExpiredPrice(tier);
  const finalExpiredPrice = getFinalExpiredPrice(tier);

  // Status checks - use dealStatus instead of separate cookie checks
  const firstExpiredStatus = dealStatus === 'first_expired';
  const finalExpiredStatus = dealStatus === 'final_expired';
  const isReturning = isReturningUser();
  const isForced = isExpiredForced();

  // Debug information
  const debugInfo = getDealDebugInfo();

  return {
    price,
    formattedPrice,
    nextTierPrice,
    regularPrice,
    firstExpiredPrice,
    finalExpiredPrice,
    dealStatus,
    isFirstExpired: firstExpiredStatus,
    isFinalExpired: finalExpiredStatus,
    isReturning,
    isForced,
    markFirstExpired,
    markFinalExpired,
    debugInfo
  };
}

/**
 * Hook for displaying price with currency formatting
 */
export function useFormattedPrice(tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'STARTER'): {
  formatPrice: (price: number) => string;
  currentPrice: string;
  formattedPrice: string;
  nextTierPrice: string;
  regularPrice: string;
  firstExpiredPrice: string;
} {
  const {
    price,
    formattedPrice,
    nextTierPrice,
    regularPrice,
    firstExpiredPrice
  } = useDealPricing(tier);

  const formatPrice = useCallback((price: number): string => {
    return `$${price.toLocaleString()}`;
  }, []);

  return {
    formatPrice,
    currentPrice: formatPrice(price),
    formattedPrice,
    nextTierPrice,
    regularPrice: formatPrice(regularPrice),
    firstExpiredPrice: formatPrice(firstExpiredPrice)
  };
}

/**
 * Hook for components that need to trigger deal expiration (like countdown timers)
 */
export function useDealTimer(tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'STARTER') {
  const {
    markFirstExpired,
    markFinalExpired,
    isFirstExpired,
    isFinalExpired,
    dealStatus
  } = useDealPricing(tier);

  const onFirstTimerComplete = useCallback(() => {
    if (dealStatus === 'regular') {
      markFirstExpired();
    }
  }, [markFirstExpired, dealStatus]);

  const onFinalTimerComplete = useCallback(() => {
    if (dealStatus === 'first_expired') {
      markFinalExpired();
    }
  }, [markFinalExpired, dealStatus]);

  return {
    onFirstTimerComplete,
    onFinalTimerComplete,
    isFirstExpired,
    isFinalExpired,
    dealStatus
  };
}