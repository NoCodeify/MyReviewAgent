export interface CountryData {
  code: string;
  name: string;
  flag: string;
  hemisphere: 'north' | 'south';
  holidays: Record<number, string>;
}

export const countryFlags: Record<string, string> = {
  // Europe
  'AL': '🇦🇱', 'AD': '🇦🇩', 'AT': '🇦🇹', 'BY': '🇧🇾',
  'BE': '🇧🇪', 'BA': '🇧🇦', 'BG': '🇧🇬', 'HR': '🇭🇷',
  'CY': '🇨🇾', 'CZ': '🇨🇿', 'DK': '🇩🇰', 'EE': '🇪🇪',
  'FI': '🇫🇮', 'FR': '🇫🇷', 'DE': '🇩🇪', 'GR': '🇬🇷',
  'HU': '🇭🇺', 'IS': '🇮🇸', 'IE': '🇮🇪', 'IT': '🇮🇹',
  'XK': '🇽🇰', 'LV': '🇱🇻', 'LI': '🇱🇮', 'LT': '🇱🇹',
  'LU': '🇱🇺', 'MT': '🇲🇹', 'MD': '🇲🇩', 'MC': '🇲🇨',
  'ME': '🇲🇪', 'NL': '🇳🇱', 'MK': '🇲🇰', 'NO': '🇳🇴',
  'PL': '🇵🇱', 'PT': '🇵🇹', 'RO': '🇷🇴', 'RU': '🇷🇺',
  'SM': '🇸🇲', 'RS': '🇷🇸', 'SK': '🇸🇰', 'SI': '🇸🇮',
  'ES': '🇪🇸', 'SE': '🇸🇪', 'CH': '🇨🇭', 'UA': '🇺🇦',
  'GB': '🇬🇧', 'VA': '🇻🇦',

  // Americas
  'AG': '🇦🇬', 'AR': '🇦🇷', 'BS': '🇧🇸', 'BB': '🇧🇧',
  'BZ': '🇧🇿', 'BO': '🇧🇴', 'BR': '🇧🇷', 'CA': '🇨🇦',
  'CL': '🇨🇱', 'CO': '🇨🇴', 'CR': '🇨🇷', 'CU': '🇨🇺',
  'DM': '🇩🇲', 'DO': '🇩🇴', 'EC': '🇪🇨', 'SV': '🇸🇻',
  'GD': '🇬🇩', 'GT': '🇬🇹', 'GY': '🇬🇾', 'HT': '🇭🇹',
  'HN': '🇭🇳', 'JM': '🇯🇲', 'MX': '🇲🇽', 'NI': '🇳🇮',
  'PA': '🇵🇦', 'PY': '🇵🇾', 'PE': '🇵🇪', 'KN': '🇰🇳',
  'LC': '🇱🇨', 'VC': '🇻🇨', 'SR': '🇸🇷', 'TT': '🇹🇹',
  'US': '🇺🇸', 'UY': '🇺🇾', 'VE': '🇻🇪',

  // Asia
  'AF': '🇦🇫', 'AM': '🇦🇲', 'AZ': '🇦🇿', 'BH': '🇧🇭',
  'BD': '🇧🇩', 'BT': '🇧🇹', 'BN': '🇧🇳', 'KH': '🇰🇭',
  'CN': '🇨🇳', 'GE': '🇬🇪', 'IN': '🇮🇳', 'ID': '🇮🇩',
  'IR': '🇮🇷', 'IQ': '🇮🇶', 'IL': '🇮🇱', 'JP': '🇯🇵',
  'JO': '🇯🇴', 'KZ': '🇰🇿', 'KW': '🇰🇼', 'KG': '🇰🇬',
  'LA': '🇱🇦', 'LB': '🇱🇧', 'MY': '🇲🇾', 'MV': '🇲🇻',
  'MN': '🇲🇳', 'MM': '🇲🇲', 'NP': '🇳🇵', 'KP': '🇰🇵',
  'KR': '🇰🇷', 'OM': '🇴🇲', 'PK': '🇵🇰', 'PS': '🇵🇸',
  'PH': '🇵🇭', 'QA': '🇶🇦', 'SA': '🇸🇦', 'SG': '🇸🇬',
  'LK': '🇱🇰', 'SY': '🇸🇾', 'TW': '🇹🇼', 'TJ': '🇹🇯',
  'TH': '🇹🇭', 'TL': '🇹🇱', 'TR': '🇹🇷', 'TM': '🇹🇲',
  'AE': '🇦🇪', 'UZ': '🇺🇿', 'VN': '🇻🇳', 'YE': '🇾🇪',

  // Africa
  'DZ': '🇩🇿', 'AO': '🇦🇴', 'BJ': '🇧🇯', 'BW': '🇧🇼',
  'BF': '🇧🇫', 'BI': '🇧🇮', 'CM': '🇨🇲', 'CV': '🇨🇻',
  'CF': '🇨🇫', 'TD': '🇹🇩', 'KM': '🇰🇲', 'CG': '🇨🇬',
  'CD': '🇨🇩', 'DJ': '🇩🇯', 'EG': '🇪🇬', 'GQ': '🇬🇶',
  'ER': '🇪🇷', 'SZ': '🇸🇿', 'ET': '🇪🇹', 'GA': '🇬🇦',
  'GM': '🇬🇲', 'GH': '🇬🇭', 'GN': '🇬🇳', 'GW': '🇬🇼',
  'CI': '🇨🇮', 'KE': '🇰🇪', 'LS': '🇱🇸', 'LR': '🇱🇷',
  'LY': '🇱🇾', 'MG': '🇲🇬', 'MW': '🇲🇼', 'ML': '🇲🇱',
  'MR': '🇲🇷', 'MU': '🇲🇺', 'MA': '🇲🇦', 'MZ': '🇲🇿',
  'NA': '🇳🇦', 'NE': '🇳🇪', 'NG': '🇳🇬', 'RW': '🇷🇼',
  'ST': '🇸🇹', 'SN': '🇸🇳', 'SC': '🇸🇨', 'SL': '🇸🇱',
  'SO': '🇸🇴', 'ZA': '🇿🇦', 'SS': '🇸🇸', 'SD': '🇸🇩',
  'TZ': '🇹🇿', 'TG': '🇹🇬', 'TN': '🇹🇳', 'UG': '🇺🇬',
  'ZM': '🇿🇲', 'ZW': '🇿🇼',

  // Oceania
  'AU': '🇦🇺', 'FJ': '🇫🇯', 'KI': '🇰🇮', 'MH': '🇲🇭',
  'FM': '🇫🇲', 'NR': '🇳🇷', 'NZ': '🇳🇿', 'PW': '🇵🇼',
  'PG': '🇵🇬', 'WS': '🇼🇸', 'SB': '🇸🇧', 'TO': '🇹🇴',
  'TV': '🇹🇻', 'VU': '🇻🇺'
};

export const countryHolidays: Record<string, Record<number, string>> = {
  // North America
  'US': {
    1: 'New Year Resolution Sale',
    2: 'Presidents Day Weekend',
    3: 'Spring Break Special',
    4: 'Easter Spring Sale',
    5: 'Memorial Day Sale',
    6: 'Summer Kickoff Sale',
    7: 'Independence Day Sale',
    8: 'Back-to-School Special',
    9: 'Labor Day Sale',
    10: 'Halloween Special',
    11: 'Black Friday Special',
    12: 'Holiday Season Sale'
  },
  'CA': {
    1: 'New Year Sale',
    2: 'Family Day Special',
    3: 'Spring Sale',
    4: 'Easter Special',
    5: 'Victoria Day Sale',
    6: 'Summer Sale',
    7: 'Canada Day Special',
    8: 'Summer Festival',
    9: 'Back-to-School',
    10: 'Thanksgiving Sale',
    11: 'Remembrance Day',
    12: 'Boxing Day Special'
  },
  'MX': {
    1: 'Año Nuevo Sale',
    2: 'Constitution Day',
    3: 'Spring Equinox',
    4: 'Easter Special',
    5: 'Cinco de Mayo',
    6: 'Summer Sale',
    9: 'Independence Day Sale',
    10: 'Revolution Day',
    11: 'Day of the Dead Special',
    12: 'Guadalupe Day Sale'
  },

  // South America
  'BR': {
    1: 'Verão Sale',
    2: 'Carnival Special',
    3: 'Outono Sale',
    4: 'Easter Special',
    5: 'Labor Day Sale',
    6: 'Festa Junina Offer',
    7: 'Winter Sale',
    9: 'Independence Week Sale',
    10: 'Children Day Sale',
    11: 'Black Friday Brasil',
    12: 'Natal Special'
  },
  'AR': {
    1: 'Verano Sale',
    2: 'Carnival Special',
    3: 'Autumn Sale',
    4: 'Easter Special',
    5: 'Labor Day & Revolution Day',
    6: 'Flag Day Special',
    7: 'Independence Day Sale',
    8: 'Winter Sale',
    9: 'Spring Sale',
    10: 'Columbus Day',
    11: 'Sovereignty Day',
    12: 'Summer Holiday Sale'
  },
  'CL': {
    1: 'Verano Sale',
    2: 'Summer Special',
    3: 'Autumn Sale',
    4: 'Easter Special',
    5: 'Navy Day Sale',
    6: 'Winter Sale',
    7: 'Virgin Carmen Day',
    8: 'Assumption Day',
    9: 'Independence Day Sale',
    10: 'Columbus Day',
    11: 'All Saints Day',
    12: 'Christmas Sale'
  },
  'CO': {
    1: 'New Year Sale',
    2: 'Carnaval Special',
    3: 'Spring Sale',
    4: 'Easter Special',
    5: 'Labor Day Sale',
    6: 'Corpus Christi',
    7: 'Independence Sale',
    8: 'Assumption Day',
    9: 'Love & Friendship Day',
    10: 'Columbus Day',
    11: 'Independence Sale',
    12: 'Navidad Offer'
  },
  'PE': {
    1: 'New Year Sale',
    2: 'Summer Sale',
    3: 'Autumn Sale',
    4: 'Easter Special',
    5: 'Labor Day Sale',
    6: 'Inti Raymi Festival',
    7: 'Independence Days Sale',
    8: 'Santa Rosa Day',
    9: 'Spring Sale',
    10: 'Lord of Miracles',
    11: 'All Saints Day',
    12: 'Christmas Sale'
  },

  // Europe
  'GB': {
    1: 'New Year Sale',
    2: 'Valentine Special',
    3: 'Mother\'s Day Sale',
    4: 'Easter Special',
    5: 'Spring Bank Holiday',
    6: 'Jubilee Sale',
    7: 'Summer Sale',
    8: 'Summer Bank Holiday',
    9: 'Back-to-School',
    10: 'Halloween Special',
    11: 'Guy Fawkes Sale',
    12: 'Boxing Day Special'
  },
  'FR': {
    1: 'Soldes d\'Hiver',
    2: 'Saint Valentin',
    3: 'Printemps Sale',
    4: 'Pâques Special',
    5: 'Fête du Travail',
    6: 'Soldes d\'Été',
    7: 'Bastille Day Special',
    8: 'Assumption Sale',
    9: 'Rentrée Special',
    10: 'Halloween Sale',
    11: 'Armistice Sale',
    12: 'Marché de Noël Sale'
  },
  'DE': {
    1: 'Neujahr Sale',
    2: 'Winterschlussverkauf',
    3: 'Frühjahr Sale',
    4: 'Easter Special',
    5: 'Tag der Arbeit',
    6: 'Sommerschlussverkauf',
    7: 'Summer Sale',
    8: 'Summer End Sale',
    9: 'Oktoberfest Special',
    10: 'Unity Day Sale',
    11: 'Black Friday DE',
    12: 'Christmas Market Sale'
  },
  'IT': {
    1: 'La Befana Special',
    2: 'San Valentino',
    3: 'Primavera Sale',
    4: 'Liberation Day Offer',
    5: 'Labor Day Sale',
    6: 'Republic Day Sale',
    7: 'Summer Sale',
    8: 'Ferragosto Summer Sale',
    9: 'Back-to-School',
    10: 'Halloween Sale',
    11: 'Black Friday IT',
    12: 'Natale Sale'
  },
  'ES': {
    1: 'Three Kings Sale',
    2: 'San Valentín',
    3: 'Spring Sale',
    4: 'Easter Special',
    5: 'Labor Day Sale',
    6: 'Summer Sale',
    7: 'Summer Festival',
    8: 'Summer Festival',
    9: 'Back-to-School',
    10: 'Hispanic Day Special',
    11: 'Black Friday ES',
    12: 'Navidad Offer'
  },
  'NL': {
    1: 'New Year Sale',
    2: 'Valentine Sale',
    3: 'Spring Sale',
    4: 'King\'s Day Special',
    5: 'Liberation Day Offer',
    6: 'Summer Sale',
    7: 'Summer Holiday',
    8: 'Summer End Sale',
    9: 'Back-to-School',
    10: 'Halloween Sale',
    11: 'Black Friday NL',
    12: 'Sinterklaas Sale'
  },
  'RU': {
    1: 'New Year Celebration',
    2: 'Defender Day Sale',
    3: 'Women\'s Day Sale',
    4: 'Spring Sale',
    5: 'Victory Day Special',
    6: 'Russia Day Offer',
    7: 'Summer Sale',
    8: 'Summer End Sale',
    9: 'Knowledge Day',
    10: 'Autumn Sale',
    11: 'Unity Day Sale',
    12: 'New Year Prep Sale'
  },
  'PL': {
    1: 'New Year Sale',
    2: 'Valentine Sale',
    3: 'Spring Sale',
    4: 'Easter Special',
    5: 'Constitution Day Sale',
    6: 'Summer Sale',
    7: 'Summer Holiday',
    8: 'Summer End Sale',
    9: 'Back-to-School',
    10: 'Autumn Sale',
    11: 'Independence Day Special',
    12: 'Christmas Sale'
  },

  // Asia
  'CN': {
    1: 'Spring Festival Sale',
    2: 'Chinese New Year Special',
    3: 'Spring Sale',
    4: 'Qingming Festival',
    5: 'Labor Holiday Sale',
    6: 'Dragon Boat Festival',
    7: 'Summer Sale',
    8: 'Qixi Festival',
    9: 'Mid-Autumn Festival',
    10: 'Golden Week Special',
    11: '11.11 Singles Day',
    12: 'Year-End Sale'
  },
  'JP': {
    1: 'New Year Oshogatsu',
    2: 'Plum Blossom Festival',
    3: 'Cherry Blossom Sale',
    4: 'Golden Week Special',
    5: 'Children\'s Day Sale',
    6: 'Rainy Season Sale',
    7: 'Tanabata Festival',
    8: 'Obon Festival Sale',
    9: 'Autumn Festival',
    10: 'Sports Day Sale',
    11: 'Culture Day Sale',
    12: 'Year-End Bonus Sale'
  },
  'KR': {
    1: 'New Year Sale',
    2: 'Lunar New Year Sale',
    3: 'Spring Sale',
    4: 'Cherry Blossom Festival',
    5: 'Buddha Birthday Sale',
    6: 'Memorial Day Sale',
    7: 'Summer Sale',
    8: 'Liberation Day',
    9: 'Chuseok Harvest Sale',
    10: 'Hangul Day Special',
    11: 'Autumn Sale',
    12: 'Year-End Sale'
  },
  'IN': {
    1: 'Republic Day Special',
    2: 'Spring Festival',
    3: 'Holi Color Festival',
    4: 'Eid & Baisakhi Sale',
    5: 'Summer Sale',
    6: 'Monsoon Sale',
    7: 'Independence Sale',
    8: 'Independence Day Sale',
    9: 'Dussehra Victory Sale',
    10: 'Diwali Festival Sale',
    11: 'Diwali Lights Sale',
    12: 'Winter Festival Sale'
  },

  // Islamic Countries
  'AE': {
    1: 'New Year Sale',
    2: 'UAE Innovation',
    3: 'Ramadan Blessing Sale',
    4: 'Eid Mubarak Sale',
    5: 'Spring Sale',
    6: 'Eid al-Adha Special',
    7: 'Summer Sale',
    8: 'Summer Festival',
    9: 'Back-to-School',
    10: 'Autumn Sale',
    11: 'UAE Day Sale',
    12: 'National Day Sale'
  },
  'SA': {
    1: 'New Year Sale',
    2: 'Foundation Day',
    3: 'Ramadan Blessing Sale',
    4: 'Eid Celebration Sale',
    5: 'Spring Sale',
    6: 'Hajj Season Special',
    7: 'Summer Sale',
    8: 'Summer Festival',
    9: 'National Day Offer',
    10: 'Autumn Sale',
    11: 'Islamic New Year',
    12: 'Winter Sale'
  },
  'TR': {
    1: 'New Year Sale',
    2: 'Winter Sale',
    3: 'Ramazan Sale',
    4: 'Bayram Special',
    5: 'Youth Day Sale',
    6: 'Summer Sale',
    7: 'Kurban Bayramı',
    8: 'Victory Day',
    9: 'Back-to-School',
    10: 'Republic Day Offer',
    11: 'Black Friday TR',
    12: 'Year-End Sale'
  },
  'EG': {
    1: 'New Year Sale',
    2: 'Winter Sale',
    3: 'Ramadan Kareem Sale',
    4: 'Eid Festival Sale',
    5: 'Sham el-Nessim',
    6: 'Summer Sale',
    7: 'Revolution Day Special',
    8: 'Summer Festival',
    9: 'Back-to-School',
    10: 'Autumn Sale',
    11: 'Black Friday EG',
    12: 'Winter Holiday'
  },
  'ID': {
    1: 'New Year Sale',
    2: 'Chinese New Year',
    3: 'Ramadan Special',
    4: 'Lebaran Sale',
    5: 'Waisak Day',
    6: 'Pancasila Day',
    7: 'Summer Sale',
    8: 'Independence Day Sale',
    9: 'Back-to-School',
    10: 'Autumn Sale',
    11: 'Heroes Day',
    12: 'Christmas Sale'
  },
  'MY': {
    1: 'New Year Sale',
    2: 'Chinese New Year',
    3: 'Ramadan Offer',
    4: 'Hari Raya Sale',
    5: 'Labor Day Sale',
    6: 'Wesak Day',
    7: 'Summer Sale',
    8: 'Merdeka Day Special',
    9: 'Malaysia Day Sale',
    10: 'Deepavali Sale',
    11: 'Black Friday MY',
    12: 'Christmas Sale'
  },
  'PK': {
    1: 'New Year Sale',
    2: 'Kashmir Day',
    3: 'Ramadan Mubarak',
    4: 'Eid Special',
    5: 'Labor Day Sale',
    6: 'Summer Sale',
    7: 'Summer Festival',
    8: 'Independence Day Sale',
    9: 'Defense Day',
    10: 'Autumn Sale',
    11: 'Iqbal Day',
    12: 'Quaid Day Special'
  },
  'BD': {
    1: 'New Year Sale',
    2: 'Language Day',
    3: 'Ramadan Sale',
    4: 'Eid Offer',
    5: 'Buddha Purnima',
    6: 'Summer Sale',
    7: 'Summer Festival',
    8: 'National Mourning',
    9: 'Back-to-School',
    10: 'Durga Puja',
    11: 'Black Friday BD',
    12: 'Victory Day Sale'
  },

  // Africa
  'ZA': {
    1: 'Summer Holiday Sale',
    2: 'Summer End Sale',
    3: 'Human Rights Sale',
    4: 'Easter Special',
    5: 'Workers Day',
    6: 'Youth Day Offer',
    7: 'Nelson Mandela Day',
    8: 'Women\'s Day',
    9: 'Heritage Day Special',
    10: 'Spring Sale',
    11: 'Black Friday ZA',
    12: 'Day of Reconciliation'
  },
  'NG': {
    1: 'New Year Sale',
    2: 'Valentine Special',
    3: 'Spring Sale',
    4: 'Easter Special',
    5: 'Democracy Day Special',
    6: 'Children\'s Day',
    7: 'Summer Sale',
    8: 'Summer Festival',
    9: 'Back-to-School',
    10: 'Independence Day Sale',
    11: 'Black Friday NG',
    12: 'Christmas Sale'
  },
  'KE': {
    1: 'New Year Sale',
    2: 'Valentine Special',
    3: 'Spring Sale',
    4: 'Easter Special',
    5: 'Labor Day Sale',
    6: 'Madaraka Day Offer',
    7: 'Summer Sale',
    8: 'Summer Festival',
    9: 'Back-to-School',
    10: 'Mashujaa Day Special',
    11: 'Black Friday KE',
    12: 'Jamhuri Day Sale'
  },
  'MA': {
    1: 'New Year Sale',
    2: 'Almond Blossom',
    3: 'Ramadan Kareem',
    4: 'Eid Mubarak',
    5: 'Labor Day Sale',
    6: 'Summer Sale',
    7: 'Throne Day',
    8: 'Oued Ed-Dahab Day',
    9: 'Back-to-School',
    10: 'Green March',
    11: 'Independence Day',
    12: 'Christmas Sale'
  },

  // Oceania
  'AU': {
    1: 'Australia Day Sale',
    2: 'Summer End Sale',
    3: 'Autumn Sale',
    4: 'ANZAC Day Offer',
    5: 'Mother\'s Day Sale',
    6: 'Queen\'s Birthday',
    7: 'Winter Sale',
    8: 'Father\'s Day Sale',
    9: 'Spring Sale',
    10: 'Melbourne Cup Sale',
    11: 'Black Friday AU',
    12: 'Summer Christmas Sale'
  },
  'NZ': {
    1: 'Summer Holiday Sale',
    2: 'Waitangi Day Sale',
    3: 'Autumn Sale',
    4: 'ANZAC Day Special',
    5: 'Mother\'s Day Sale',
    6: 'Queen\'s Birthday',
    7: 'Winter Sale',
    8: 'Father\'s Day Sale',
    9: 'Spring Sale',
    10: 'Labour Day',
    11: 'Black Friday NZ',
    12: 'Summer Christmas Sale'
  }
};

export const southernHemisphereCountries = [
  'AU', 'NZ', 'AR', 'BR', 'ZA', 'CL', 'UY', 'PY',
  'BO', 'PE', 'EC', 'AO', 'BW', 'NA', 'SZ', 'LS',
  'ZW', 'ZM', 'MW', 'MZ', 'MG', 'MU', 'SC', 'RE'
];

export const getSeasonalFallback = (countryCode: string, month: number): string => {
  const isSouthern = southernHemisphereCountries.includes(countryCode);

  if (isSouthern) {
    const southernSeasons: Record<number, string> = {
      12: 'Summer Holiday Sale',
      1: 'New Year Summer Special',
      2: 'Late Summer Sale',
      3: 'Autumn Arrival Sale',
      4: 'Autumn Special',
      5: 'Winter Approach Sale',
      6: 'Winter Special',
      7: 'Midwinter Sale',
      8: 'Late Winter Sale',
      9: 'Spring Season Sale',
      10: 'Spring Special',
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

export const getDayOfWeekFallback = (dayOfWeek: string): string => {
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