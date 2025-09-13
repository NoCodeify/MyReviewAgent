import { useState, useEffect } from 'react';
import { countryFlags, countryHolidays, southernHemisphereCountries, getSeasonalFallback, getDayOfWeekFallback } from '@/data/countries';

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

const dayOffers: Record<string, string> = {
  Monday: "Fresh Start Monday - Extra Templates",
  Tuesday: "Transform Tuesday Deal",
  Wednesday: "Midweek Special",
  Thursday: "Almost Friday Bonus",
  Friday: "Weekend Warrior Package",
  Saturday: "Saturday Flash Sale - 10% Extra OFF",
  Sunday: "Sunday Funday - Last Chance"
};

const timeMessages = {
  morning: "Start closing deals before lunch",
  afternoon: "Set up now, see results by dinner",
  evening: "Configure tonight, wake up to closed deals",
  night: "Perfect time for zero-distraction setup"
};

const getCountryHoliday = (countryCode: string, month: number): string | null => {
  return countryHolidays[countryCode]?.[month] || null;
};



export function useDynamicContent(): DynamicContent {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [licensesRemaining, setLicensesRemaining] = useState(47);
  const [viewerCount, setViewerCount] = useState(12);

  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = now.toLocaleDateString('en-US', { month: 'long' });
  const todayDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Determine time of day
  const hour = now.getHours();
  let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  if (hour >= 5 && hour < 12) timeOfDay = 'morning';
  else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
  else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
  else timeOfDay = 'night';

  // Calculate dynamic licenses (decreases over time)
  useEffect(() => {
    const updateLicenses = () => {
      const startDate = new Date('2025-01-01').getTime();
      const secondsElapsed = Math.floor((Date.now() - startDate) / 1000);
      // Decrease every 30-45 seconds for realistic urgency
      const decreaseRate = 35; // seconds per license
      const remaining = Math.max(7, 47 - Math.floor(secondsElapsed / decreaseRate) % 40); // Cycles between 47 and 7
      setLicensesRemaining(remaining);
    };

    updateLicenses(); // Initial calculation
    const interval = setInterval(updateLicenses, 5000); // Update every 5 seconds to catch changes

    return () => clearInterval(interval);
  }, []);

  // Simulate viewer count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.min(25, Math.max(8, prev + change));
      });
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Get location data with multiple fallbacks
  useEffect(() => {
    const geolocationAPIs = [
      {
        url: 'https://ipapi.co/json/',
        parser: (data: any) => ({
          city: data.city,
          country: data.country_name,
          country_code: data.country_code,
          region: data.region,
          timezone: data.timezone
        })
      },
      {
        url: 'https://ipwho.is/',
        parser: (data: any) => ({
          city: data.city,
          country: data.country,
          country_code: data.country_code,
          region: data.region,
          timezone: data.timezone?.id
        })
      },
      {
        url: 'https://api.ipbase.com/v2/info',
        parser: (data: any) => ({
          city: data.data?.location?.city?.name,
          country: data.data?.location?.country?.name,
          country_code: data.data?.location?.country?.alpha2,
          region: data.data?.location?.region?.name,
          timezone: data.data?.timezone?.id
        })
      }
    ];

    const fetchLocationFromAPI = async (apiConfig: typeof geolocationAPIs[0], retryCount = 0): Promise<LocationData | null> => {
      try {
        console.log(`Attempting to fetch location from: ${apiConfig.url}`);
        const response = await fetch(apiConfig.url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Raw API response:', data);

        const parsedData = apiConfig.parser(data);

        if (!parsedData.country_code || parsedData.country_code.length !== 2) {
          throw new Error('Invalid country code received');
        }

        const locationData: LocationData = {
          city: parsedData.city || 'your city',
          country: parsedData.country || 'your country',
          country_code: parsedData.country_code || 'WW',
          country_flag: countryFlags[parsedData.country_code] || '🌍',
          region: parsedData.region || 'your region',
          timezone: parsedData.timezone || 'your timezone'
        };

        console.log('Successfully detected location:', locationData);
        return locationData;

      } catch (error) {
        console.error(`Failed to fetch from ${apiConfig.url}:`, error);

        // Retry with exponential backoff (max 3 attempts)
        if (retryCount < 2) {
          const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
          console.log(`Retrying ${apiConfig.url} in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchLocationFromAPI(apiConfig, retryCount + 1);
        }

        return null;
      }
    };

    const fetchLocation = async () => {
      // Try each API in sequence until one succeeds
      for (const apiConfig of geolocationAPIs) {
        const result = await fetchLocationFromAPI(apiConfig);
        if (result) {
          setLocation(result);
          return;
        }
      }

      // All APIs failed, use fallback with browser hints
      console.warn('All geolocation APIs failed, using fallback');
      const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const browserLanguage = navigator.language;

      // Try to guess country from timezone or language
      let guessedCountryCode = 'WW';
      if (browserTimezone.includes('America/New_York') || browserLanguage.startsWith('en-US')) {
        guessedCountryCode = 'US';
      } else if (browserTimezone.includes('Europe/London') || browserLanguage.startsWith('en-GB')) {
        guessedCountryCode = 'GB';
      } else if (browserLanguage.startsWith('en-CA')) {
        guessedCountryCode = 'CA';
      } else if (browserLanguage.startsWith('en-AU')) {
        guessedCountryCode = 'AU';
      }

      setLocation({
        city: 'your city',
        country: 'your country',
        country_code: guessedCountryCode,
        country_flag: countryFlags[guessedCountryCode] || '🌍',
        region: 'your region',
        timezone: browserTimezone
      });
    };

    fetchLocation();
  }, []);

  // Calculate last purchase time
  const minutesAgo = Math.floor(Math.random() * 45) + 3;
  const lastPurchaseTime = `${minutesAgo} minutes ago`;

  // Generate country-specific bonus code
  const countryBonus = location ? `${location.country_code}5` : 'SAVE5';

  // Get holiday-specific offer
  let holidayOffer = 'Exclusive Offer';
  if (location && location.country_code !== 'WW') {
    // Try country-specific holiday first
    holidayOffer = getCountryHoliday(location.country_code, now.getMonth() + 1) ||
                   getSeasonalFallback(location.country_code, now.getMonth() + 1);
  } else {
    // Use day of week fallback if no location
    holidayOffer = getDayOfWeekFallback(dayOfWeek);
  }

  return {
    dayOfWeek,
    dayOffer: dayOffers[dayOfWeek] || 'Special Offer',
    timeOfDay,
    timeMessage: timeMessages[timeOfDay],
    location,
    licensesRemaining,
    lastPurchaseTime,
    viewerCount,
    monthName,
    todayDate,
    countryBonus,
    holidayOffer
  };
}