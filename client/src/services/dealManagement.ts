/**
 * Deal Management System
 * Handles expired deals using cookies and URL parameters
 */

// Cookie names
const FIRST_VISIT_COOKIE = 'whatsagent_first_visit';
const FIRST_EXPIRED_COOKIE = 'whatsagent_first_expired';
const FINAL_EXPIRED_COOKIE = 'whatsagent_final_expired';

// Pricing configuration
export const PRICING = {
  REGULAR: {
    STARTER: 497,
    PROFESSIONAL: 997,
    AGENCY: 4970
  },
  FIRST_EXPIRED: {
    STARTER: 627,  // Higher converting number ending in 7
    PROFESSIONAL: 1297,  // Higher converting number ending in 7
    AGENCY: 6297   // Higher converting number ending in 7
  },
  FINAL_EXPIRED: {
    STARTER: { price: 197, period: 'month' },
    PROFESSIONAL: { price: 297, period: 'month' },
    AGENCY: { price: 497, period: 'month' }
  }
} as const;

export type DealStatus = 'regular' | 'first_expired' | 'final_expired';

/**
 * Cookie utilities
 */
export function setCookie(name: string, value: string, days = 30): void {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * URL parameter utilities
 */
export function getURLParam(name: string): string | null {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

export function isExpiredForced(): DealStatus | null {
  const expiredParam = getURLParam('expired');
  if (expiredParam === 'first') return 'first_expired';
  if (expiredParam === 'final') return 'final_expired';
  if (expiredParam === 'true') return 'first_expired'; // backward compatibility
  return null;
}

/**
 * Deal status management
 */
export function initializeFirstVisit(): void {
  if (typeof document === 'undefined') return;

  const existingVisit = getCookie(FIRST_VISIT_COOKIE);
  if (!existingVisit) {
    setCookie(FIRST_VISIT_COOKIE, Date.now().toString());
  }
}

export function markFirstExpired(): void {
  setCookie(FIRST_EXPIRED_COOKIE, 'true');
}

export function markFinalExpired(): void {
  setCookie(FINAL_EXPIRED_COOKIE, 'true');
}

export function isFirstExpired(): boolean {
  return getCookie(FIRST_EXPIRED_COOKIE) === 'true';
}

export function isFinalExpired(): boolean {
  return getCookie(FINAL_EXPIRED_COOKIE) === 'true';
}

export function isReturningUser(): boolean {
  const firstVisit = getCookie(FIRST_VISIT_COOKIE);
  if (!firstVisit) return false;

  const firstVisitTime = parseInt(firstVisit);
  const now = Date.now();

  // Consider returning user if first visit was more than 30 minutes ago
  return (now - firstVisitTime) > (30 * 60 * 1000);
}

/**
 * Calculate hours elapsed since first visit
 */
export function getElapsedHours(): number {
  const firstVisit = getCookie(FIRST_VISIT_COOKIE);
  if (!firstVisit) return 0;

  const elapsed = Date.now() - parseInt(firstVisit);
  return elapsed / (1000 * 60 * 60); // Convert to hours
}

/**
 * Check elapsed time and auto-expire deals if time has passed
 */
export function checkAndUpdateDealStatus(): void {
  const hours = getElapsedHours();

  // Auto-expire to final if 48+ hours have passed
  if (hours >= 48 && !isFinalExpired()) {
    markFinalExpired();
  }
  // Auto-expire to first if 24+ hours have passed
  else if (hours >= 24 && !isFirstExpired()) {
    markFirstExpired();
  }
}

export function getDealStatus(): DealStatus {
  // Check URL parameter first (for testing)
  const forced = isExpiredForced();
  if (forced) {
    return forced;
  }

  // Check and update based on elapsed time
  checkAndUpdateDealStatus();

  // Check cookies for actual expiration state
  if (isFinalExpired()) {
    return 'final_expired';
  }

  if (isFirstExpired()) {
    return 'first_expired';
  }

  return 'regular';
}

export function getCurrentPrice(tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'STARTER'): number {
  const status = getDealStatus();
  switch (status) {
    case 'first_expired':
      return PRICING.FIRST_EXPIRED[tier];
    case 'final_expired':
      return PRICING.FINAL_EXPIRED[tier].price;
    default:
      return PRICING.REGULAR[tier];
  }
}

export function getCurrentPriceFormatted(tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'STARTER'): string {
  const status = getDealStatus();
  switch (status) {
    case 'first_expired':
      return `$${PRICING.FIRST_EXPIRED[tier]} lifetime`;
    case 'final_expired':
      return `$${PRICING.FINAL_EXPIRED[tier].price}/${PRICING.FINAL_EXPIRED[tier].period}`;
    default:
      return `$${PRICING.REGULAR[tier]} lifetime`;
  }
}

export function getRegularPrice(tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'STARTER'): number {
  return PRICING.REGULAR[tier];
}

export function getFirstExpiredPrice(tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'STARTER'): number {
  return PRICING.FIRST_EXPIRED[tier];
}

export function getFinalExpiredPrice(tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'STARTER') {
  return PRICING.FINAL_EXPIRED[tier];
}

export function getNextTierPrice(tier: 'STARTER' | 'PROFESSIONAL' | 'AGENCY' = 'STARTER'): string {
  const status = getDealStatus();
  switch (status) {
    case 'regular':
      return `$${PRICING.FIRST_EXPIRED[tier]}`;
    case 'first_expired':
      return `$${PRICING.FINAL_EXPIRED[tier].price}/${PRICING.FINAL_EXPIRED[tier].period}`;
    case 'final_expired':
      return 'No longer available';
    default:
      return `$${PRICING.FIRST_EXPIRED[tier]}`;
  }
}

/**
 * Timer integration - to be called when countdown timer expires
 */
export function onFirstTimerExpired(): void {
  markFirstExpired();

  // Dispatch custom event for components to react
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('firstDealExpired'));
  }
}

export function onFinalTimerExpired(): void {
  markFinalExpired();

  // Dispatch custom event for components to react
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('finalDealExpired'));
  }
}

/**
 * Reset deal state (useful for testing)
 */
export function resetDealState(): void {
  deleteCookie(FIRST_VISIT_COOKIE);
  deleteCookie(FIRST_EXPIRED_COOKIE);
  deleteCookie(FINAL_EXPIRED_COOKIE);
}

/**
 * Debug information
 */
export function getDealDebugInfo() {
  return {
    isExpiredForced: isExpiredForced(),
    isFirstExpired: isFirstExpired(),
    isFinalExpired: isFinalExpired(),
    isReturningUser: isReturningUser(),
    dealStatus: getDealStatus(),
    currentPrice: getCurrentPrice(),
    currentPriceFormatted: getCurrentPriceFormatted(),
    nextTierPrice: getNextTierPrice(),
    firstVisitCookie: getCookie(FIRST_VISIT_COOKIE),
    firstExpiredCookie: getCookie(FIRST_EXPIRED_COOKIE),
    finalExpiredCookie: getCookie(FINAL_EXPIRED_COOKIE),
    cookies: typeof document !== 'undefined' ? document.cookie : 'N/A (SSR)'
  };
}