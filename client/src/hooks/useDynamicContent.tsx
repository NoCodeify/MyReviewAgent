import { useState, useEffect } from 'react';

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

// Comprehensive holiday mapping
const getCountryHoliday = (countryCode: string, month: number, day: number): string | null => {
  const holidays: Record<string, Record<number, string>> = {
    // Netherlands
    'NL': {
      12: 'Sinterklaas Sale',
      4: "King's Day Special",
      5: 'Liberation Day Offer'
    },
    // Islamic Countries
    'AE': { 3: 'Ramadan Blessing Sale', 4: 'Eid Mubarak Sale', 6: 'Eid al-Adha Special', 12: 'National Day Sale' },
    'SA': { 3: 'Ramadan Blessing Sale', 4: 'Eid Celebration Sale', 6: 'Hajj Season Special', 9: 'National Day Offer' },
    'EG': { 3: 'Ramadan Kareem Sale', 4: 'Eid Festival Sale', 7: 'Revolution Day Special' },
    'ID': { 3: 'Ramadan Special', 4: 'Lebaran Sale', 8: 'Independence Day Sale' },
    'MY': { 3: 'Ramadan Offer', 4: 'Hari Raya Sale', 8: 'Merdeka Day Special', 9: 'Malaysia Day Sale' },
    'PK': { 3: 'Ramadan Mubarak', 4: 'Eid Special', 8: 'Independence Day Sale', 12: 'Quaid Day Special' },
    'TR': { 3: 'Ramazan Sale', 4: 'Bayram Special', 10: 'Republic Day Offer', 5: 'Youth Day Sale' },
    'BD': { 3: 'Ramadan Sale', 4: 'Eid Offer', 12: 'Victory Day Sale' },

    // India
    'IN': {
      10: 'Diwali Festival Sale',
      11: 'Diwali Lights Sale',
      3: 'Holi Color Festival',
      9: 'Dussehra Victory Sale',
      1: 'Republic Day Special',
      8: 'Independence Day Sale',
      4: 'Eid & Baisakhi Sale'
    },

    // East Asia
    'CN': {
      1: 'Spring Festival Sale',
      2: 'Chinese New Year Special',
      9: 'Mid-Autumn Festival',
      11: '11.11 Singles Day',
      10: 'Golden Week Special'
    },
    'JP': {
      1: 'New Year Oshogatsu',
      4: 'Golden Week Special',
      8: 'Obon Festival Sale',
      12: 'Year-End Bonus Sale'
    },
    'KR': {
      9: 'Chuseok Harvest Sale',
      2: 'Lunar New Year Sale',
      10: 'Hangul Day Special',
      5: 'Buddha Birthday Sale'
    },

    // Americas
    'US': {
      11: 'Black Friday Special',
      7: 'Independence Day Sale',
      12: 'Holiday Season Sale',
      10: 'Halloween Special',
      2: 'Presidents Day Sale',
      5: "Memorial Day Sale",
      9: 'Labor Day Sale'
    },
    'CA': {
      7: 'Canada Day Special',
      10: 'Thanksgiving Sale',
      12: 'Boxing Day Special',
      5: 'Victoria Day Sale'
    },
    'BR': {
      2: 'Carnival Special',
      9: 'Independence Week Sale',
      6: 'Festa Junina Offer',
      10: 'Children Day Sale',
      11: 'Black Friday Brasil'
    },
    'MX': {
      11: 'Day of the Dead Special',
      9: 'Independence Day Sale',
      5: 'Cinco de Mayo',
      12: 'Guadalupe Day Sale'
    },
    'AR': { 7: 'Independence Day Sale', 5: 'Revolution Day Special', 12: 'Summer Holiday Sale' },
    'CO': { 2: 'Carnaval Special', 7: 'Independence Sale', 12: 'Navidad Offer' },

    // Europe
    'GB': { 12: 'Boxing Day Special', 11: 'Guy Fawkes Sale', 4: 'Easter Special', 6: 'Jubilee Sale' },
    'DE': { 9: 'Oktoberfest Special', 10: 'Unity Day Sale', 12: 'Christmas Market Sale' },
    'FR': { 7: 'Bastille Day Special', 12: 'Marché de Noël Sale', 1: 'Soldes d\'Hiver', 11: 'Armistice Sale' },
    'IT': { 8: 'Ferragosto Summer Sale', 1: 'La Befana Special', 12: 'Natale Sale', 4: 'Liberation Day Offer' },
    'ES': { 1: 'Three Kings Sale', 10: 'Hispanic Day Special', 12: 'Navidad Offer', 8: 'Summer Festival' },
    'RU': { 1: 'New Year Celebration', 5: 'Victory Day Special', 3: "Women's Day Sale", 6: 'Russia Day Offer' },
    'PL': { 5: 'Constitution Day Sale', 11: 'Independence Day Special', 12: 'Christmas Sale' },

    // Africa & Middle East
    'ZA': { 9: 'Heritage Day Special', 12: 'Day of Reconciliation', 6: 'Youth Day Offer', 3: 'Human Rights Sale' },
    'NG': { 10: 'Independence Day Sale', 5: 'Democracy Day Special', 12: 'Christmas Sale' },
    'KE': { 12: 'Jamhuri Day Sale', 10: 'Mashujaa Day Special', 6: 'Madaraka Day Offer' },
    'IL': { 9: 'Rosh Hashanah Sale', 4: 'Passover Special', 12: 'Hanukkah Festival', 5: 'Independence Day' },

    // Oceania
    'AU': { 1: 'Australia Day Sale', 12: 'Summer Holiday Special', 4: 'ANZAC Day Offer', 10: 'Melbourne Cup Sale' },
    'NZ': { 2: 'Waitangi Day Sale', 4: 'ANZAC Day Special', 12: 'Summer Christmas Sale' }
  };

  return holidays[countryCode]?.[month] || null;
};

const getSeasonalFallback = (countryCode: string, month: number): string => {
  // Countries in Southern Hemisphere
  const southernCountries = ['AU', 'NZ', 'AR', 'BR', 'ZA', 'CL', 'UY', 'PY'];
  const isSouthern = southernCountries.includes(countryCode);

  if (isSouthern) {
    const southernSeasons: Record<number, string> = {
      12: 'Summer Holiday Sale',
      1: 'New Year Summer Special',
      2: 'Late Summer Sale',
      3: 'Autumn Arrival Sale',
      6: 'Winter Special',
      7: 'Midwinter Sale',
      9: 'Spring Season Sale',
      11: 'Early Summer Deals'
    };
    return southernSeasons[month] || 'Seasonal Special';
  } else {
    const northernSeasons: Record<number, string> = {
      12: 'Winter Holiday Special',
      1: 'New Year Sale',
      2: 'Winter Clearance',
      3: 'Spring Arrival Sale',
      4: 'Spring Special',
      5: 'Mother\'s Day Sale',
      6: 'Summer Kickoff',
      7: 'Midsummer Sale',
      8: 'Back-to-Business',
      9: 'Fall Season Sale',
      10: 'Autumn Special',
      11: 'Year-End Deals'
    };
    return northernSeasons[month] || 'Exclusive Offer';
  }
};

const getDayOfWeekFallback = (dayOfWeek: string): string => {
  const dayOffers: Record<string, string> = {
    'Monday': 'Motivation Monday Deal',
    'Tuesday': 'Tuesday Special',
    'Wednesday': 'Midweek Offer',
    'Thursday': 'Thursday Exclusive',
    'Friday': 'Friday Flash Sale',
    'Saturday': 'Weekend Special',
    'Sunday': 'Sunday Funday Deal'
  };
  return dayOffers[dayOfWeek] || 'Limited Time Offer';
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

  // Get location data (with fallback)
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Map country code to flag emoji
        const countryFlags: Record<string, string> = {
          'US': '🇺🇸', 'GB': '🇬🇧', 'CA': '🇨🇦', 'AU': '🇦🇺',
          'NL': '🇳🇱', 'DE': '🇩🇪', 'FR': '🇫🇷', 'ES': '🇪🇸',
          'IT': '🇮🇹', 'IN': '🇮🇳', 'BR': '🇧🇷', 'MX': '🇲🇽'
        };

        setLocation({
          city: data.city || 'your city',
          country: data.country_name || 'your country',
          country_code: data.country_code || 'WW',
          country_flag: countryFlags[data.country_code] || '🌍',
          region: data.region || 'your region',
          timezone: data.timezone || 'your timezone'
        });
      } catch (error) {
        // Fallback location
        setLocation({
          city: 'your city',
          country: 'your country',
          country_code: 'WW',
          country_flag: '🌍',
          region: 'your region',
          timezone: 'your timezone'
        });
      }
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
    holidayOffer = getCountryHoliday(location.country_code, now.getMonth() + 1, now.getDate()) ||
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