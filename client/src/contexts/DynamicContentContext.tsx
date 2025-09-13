import React, { createContext, useContext } from 'react';
import { useDynamicContent } from '@/hooks/useDynamicContent';

interface LocationData {
  city: string;
  country: string;
  country_code: string;
  country_flag: string;
  region: string;
  timezone: string;
}

interface DynamicContent {
  dayOfWeek: string;
  dayOffer: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  timeMessage: string;
  location: LocationData | null;
  licensesRemaining: number;
  lastPurchaseTime: string;
  viewerCount: number;
  monthName: string;
  todayDate: string;
  countryBonus: string;
  holidayOffer: string;
}

const DynamicContentContext = createContext<DynamicContent | undefined>(undefined);

export function DynamicContentProvider({ children }: { children: React.ReactNode }) {
  const dynamicContent = useDynamicContent();

  return (
    <DynamicContentContext.Provider value={dynamicContent}>
      {children}
    </DynamicContentContext.Provider>
  );
}

export function useDynamicContentContext(): DynamicContent {
  const context = useContext(DynamicContentContext);
  if (context === undefined) {
    throw new Error('useDynamicContentContext must be used within a DynamicContentProvider');
  }
  return context;
}