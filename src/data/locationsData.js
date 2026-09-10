// Comprehensive Location Database for Bengaluru & South India
// Designed for instant autocomplete across all Siddhu Car Rentals enquiry forms

export const CURATED_LOCATIONS = [
  // ✈️ AIRPORTS
  {
    name: 'Bangalore Airport (Kempegowda International Airport - BLR)',
    shortName: 'Bangalore Airport (BLR)',
    category: 'airport',
    icon: '✈️',
    subtext: 'Terminals 1 & 2 • Devanahalli, Bengaluru',
    aliases: ['airport', 'kempegowda', 'blr', 'kia', 'bial', 't1', 't2', 'bangalore airport']
  },
  {
    name: 'HAL Bangalore Old Airport',
    shortName: 'HAL Old Airport',
    category: 'airport',
    icon: '✈️',
    subtext: 'Old Airport Road, Kodihalli, Bengaluru',
    aliases: ['hal', 'old airport', 'kodihalli', 'domlur']
  },
  {
    name: 'Mysuru Airport (MYQ)',
    shortName: 'Mysore Airport (MYQ)',
    category: 'airport',
    icon: '✈️',
    subtext: 'Mandakalli, Mysuru, Karnataka',
    aliases: ['mysore airport', 'myq', 'mandakalli']
  },
  {
    name: 'Mangaluru International Airport (IXE)',
    shortName: 'Mangalore Airport (IXE)',
    category: 'airport',
    icon: '✈️',
    subtext: 'Bajpe, Mangaluru, Karnataka',
    aliases: ['mangalore airport', 'ixe', 'bajpe']
  },
  {
    name: 'Chennai International Airport (MAA)',
    shortName: 'Chennai Airport (MAA)',
    category: 'airport',
    icon: '✈️',
    subtext: 'Meenambakkam, Chennai, Tamil Nadu',
    aliases: ['chennai airport', 'maa', 'meenambakkam']
  },
  {
    name: 'Hyderabad Rajiv Gandhi Airport (HYD)',
    shortName: 'Hyderabad Airport (HYD)',
    category: 'airport',
    icon: '✈️',
    subtext: 'Shamshabad, Hyderabad, Telangana',
    aliases: ['hyderabad airport', 'hyd', 'shamshabad']
  },

  // 📍 BENGALURU MAJOR AREAS (Includes user examples: Bangalore, Banashankari, Banaswadi, Bannerghatta Road)
  {
    name: 'Bangalore (Bengaluru City Center)',
    shortName: 'Bengaluru Central',
    category: 'area',
    icon: '📍',
    subtext: 'MG Road • Vidhana Soudha • Brigade Road',
    aliases: ['bangalore', 'bengaluru', 'city', 'center', 'central', 'cbd']
  },
  {
    name: 'Banashankari (Stages 1, 2, 3 & 6)',
    shortName: 'Banashankari',
    category: 'area',
    icon: '📍',
    subtext: 'South Bengaluru • BDA Complex • Outer Ring Road',
    aliases: ['banashankari', 'bsk', 'bsk 2nd stage', 'bsk 3rd stage', 'kathriguppe']
  },
  {
    name: 'Banaswadi',
    shortName: 'Banaswadi',
    category: 'area',
    icon: '📍',
    subtext: 'East Bengaluru • HRBR Layout • Kammanahalli',
    aliases: ['banaswadi', 'ombr layout', 'chikka banaswadi', 'dodda banaswadi']
  },
  {
    name: 'Bannerghatta Road',
    shortName: 'Bannerghatta Road',
    category: 'area',
    icon: '📍',
    subtext: 'IIMB • Royal Meenakshi Mall • Fortis Hospital',
    aliases: ['bannerghatta', 'bg road', 'iimb', 'meenakshi mall', 'hulimavu', 'arekere', 'gottigere']
  },
  {
    name: 'JP Nagar (Phases 1 to 9)',
    shortName: 'JP Nagar',
    category: 'area',
    icon: '📍',
    subtext: 'South Bengaluru • Central Mall • Siddhu Car Rentals HQ',
    aliases: ['jp nagar', 'jayaprakash nagar', 'jp nagar 5th phase', 'jp nagar 2nd phase', 'jp nagar 7th phase', 'sarakki']
  },
  {
    name: 'Jayanagar (Blocks 1 to 9)',
    shortName: 'Jayanagar',
    category: 'area',
    icon: '📍',
    subtext: 'South Bengaluru • 4th Block Complex • South End Circle',
    aliases: ['jayanagar', '4th block', 'ashoka pillar', 'tilak nagar']
  },
  {
    name: 'Indiranagar',
    shortName: 'Indiranagar',
    category: 'area',
    icon: '📍',
    subtext: '100ft Road • 12th Main • Defense Colony',
    aliases: ['indiranagar', '100 feet road', '12th main', 'defence colony', 'cmh road']
  },
  {
    name: 'Koramangala (Blocks 1 to 8)',
    shortName: 'Koramangala',
    category: 'area',
    icon: '📍',
    subtext: 'Sony World Signal • Forum Mall • Intermediate Ring Road',
    aliases: ['koramangala', 'sony world', 'forum mall', 'jyoti nivas']
  },
  {
    name: 'Whitefield',
    shortName: 'Whitefield',
    category: 'area',
    icon: '📍',
    subtext: 'ITPL • ECC Road • Hope Farm • Prestige Shantiniketan',
    aliases: ['whitefield', 'itpl', 'hope farm', 'kadugodi', 'shantiniketan', 'vaidehi']
  },
  {
    name: 'Electronic City (Phases 1 & 2)',
    shortName: 'Electronic City',
    category: 'area',
    icon: '📍',
    subtext: 'Infosys • Wipro Campus • Elevated Expressway',
    aliases: ['electronic city', 'e-city', 'ecity', 'infosys ecity', 'wipro ecity', 'neotown']
  },
  {
    name: 'HSR Layout (Sectors 1 to 7)',
    shortName: 'HSR Layout',
    category: 'area',
    icon: '📍',
    subtext: '27th Main • Agara Lake • Outer Ring Road',
    aliases: ['hsr', 'hsr layout', '27th main', 'agara']
  },
  {
    name: 'Bellandur / Outer Ring Road',
    shortName: 'Bellandur',
    category: 'area',
    icon: '📍',
    subtext: 'Ecospace • Green Glen Layout • Central Mall ORR',
    aliases: ['bellandur', 'ecospace', 'green glen', 'devarabisanahalli']
  },
  {
    name: 'Sarjapur Road',
    shortName: 'Sarjapur Road',
    category: 'area',
    icon: '📍',
    subtext: 'Wipro Corporate Office • Carmelaram • Kaikondrahalli',
    aliases: ['sarjapur', 'sarjapur road', 'wipro sarjapur', 'carmelaram']
  },
  {
    name: 'Marathahalli',
    shortName: 'Marathahalli',
    category: 'area',
    icon: '📍',
    subtext: 'Marathahalli Bridge • Kalamandir • Outer Ring Road',
    aliases: ['marathahalli', 'marathahalli bridge', 'kalamandir', 'munnekollal']
  },
  {
    name: 'Hebbal',
    shortName: 'Hebbal',
    category: 'area',
    icon: '📍',
    subtext: 'Hebbal Flyover • Manyata Tech Park • Airport Road',
    aliases: ['hebbal', 'hebbal flyover', 'manyata', 'nagavara', 'bellary road']
  },
  {
    name: 'Malleshwaram',
    shortName: 'Malleshwaram',
    category: 'area',
    icon: '📍',
    subtext: 'Margosa Road • Sampige Road • 8th Cross',
    aliases: ['malleshwaram', 'sampige road', 'margosa road', 'malleswaram']
  },
  {
    name: 'Rajajinagar',
    shortName: 'Rajajinagar',
    category: 'area',
    icon: '📍',
    subtext: 'Orion Mall • World Trade Center • Brigade Gateway',
    aliases: ['rajajinagar', 'orion mall', 'wtc', 'isckon']
  },
  {
    name: 'Basavanagudi',
    shortName: 'Basavanagudi',
    category: 'area',
    icon: '📍',
    subtext: 'Gandhi Bazaar • Bull Temple • DVG Road',
    aliases: ['basavanagudi', 'gandhi bazaar', 'bull temple', 'dvg road', 'national college']
  },
  {
    name: 'Sadashivanagar',
    shortName: 'Sadashivanagar',
    category: 'area',
    icon: '📍',
    subtext: 'Upper Palace Orchards • Sankey Tank',
    aliases: ['sadashivanagar', 'sadashivnagar', 'sankey tank']
  },
  {
    name: 'Frazer Town / Pulakeshinagar',
    shortName: 'Frazer Town',
    category: 'area',
    icon: '📍',
    subtext: 'Coles Road • Mosque Road • Pulakeshinagar',
    aliases: ['frazer town', 'pulakeshinagar', 'coles road', 'mosque road']
  },
  {
    name: 'Richmond Town / Lavelle Road',
    shortName: 'Richmond Town',
    category: 'area',
    icon: '📍',
    subtext: 'UB City • Vittal Mallya Road • Richmond Circle',
    aliases: ['richmond town', 'lavelle road', 'vittal mallya', 'ub city', 'langford town']
  },
  {
    name: 'MG Road / Brigade Road',
    shortName: 'MG Road',
    category: 'area',
    icon: '📍',
    subtext: 'Church Street • Commercial Street • Mayo Hall',
    aliases: ['mg road', 'brigade road', 'church street', 'commercial street', 'trinity circle']
  },
  {
    name: 'Yelahanka',
    shortName: 'Yelahanka',
    category: 'area',
    icon: '📍',
    subtext: 'Yelahanka New Town • Kogilu • CRPF Campus',
    aliases: ['yelahanka', 'yelahanka new town', 'kogilu', 'attur']
  },
  {
    name: 'Devanahalli',
    shortName: 'Devanahalli',
    category: 'area',
    icon: '📍',
    subtext: 'KIADB Aerospace Park • Airport Corridor',
    aliases: ['devanahalli', 'aerotropolis', 'kiadb']
  },
  {
    name: 'BTM Layout',
    shortName: 'BTM Layout',
    category: 'area',
    icon: '📍',
    subtext: 'Udupi Garden • Ring Road • 1st & 2nd Stage',
    aliases: ['btm', 'btm layout', 'udupi garden', 'madiwala']
  },
  {
    name: 'Domlur / HAL Airport Road',
    shortName: 'Domlur',
    category: 'area',
    icon: '📍',
    subtext: 'Embassy GolfLinks (EGL) • Diamond District',
    aliases: ['domlur', 'egl', 'diamond district', 'kodihalli']
  },
  {
    name: 'Yeshwanthpur',
    shortName: 'Yeshwanthpur',
    category: 'area',
    icon: '📍',
    subtext: 'Railway Station • APMC Yard • Peenya Industrial Area',
    aliases: ['yeshwanthpur', 'yeshwantpur', 'peenya', 'goraguntepalya']
  },
  {
    name: 'Kengeri / Mysore Road',
    shortName: 'Kengeri',
    category: 'area',
    icon: '📍',
    subtext: 'Rajarajeshwari Nagar • RVCE • Kengeri Satellite Town',
    aliases: ['kengeri', 'rr nagar', 'rajarajeshwari nagar', 'mysore road', 'nayandahalli']
  },
  {
    name: 'Vijayanagar',
    shortName: 'Vijayanagar',
    category: 'area',
    icon: '📍',
    subtext: 'RPC Layout • Chandra Layout • Pipeline Road',
    aliases: ['vijayanagar', 'chandra layout', 'attiguppe', 'nagarbhavi']
  },
  {
    name: 'Thanisandra / Hennur',
    shortName: 'Thanisandra Road',
    category: 'area',
    icon: '📍',
    subtext: 'Bhartiya City • Hennur Bagalur Road',
    aliases: ['thanisandra', 'hennur', 'bhartiya city', 'geddalahalli']
  },
  {
    name: 'Ulsoor / Halasuru',
    shortName: 'Ulsoor',
    category: 'area',
    icon: '📍',
    subtext: 'Ulsoor Lake • Someshwara Temple • Cambridge Layout',
    aliases: ['ulsoor', 'halasuru', 'cambridge layout', 'kensington road']
  },

  // 🏨 LUXURY HOTELS & LANDMARKS
  {
    name: 'UB City (The Collection)',
    shortName: 'UB City',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Vittal Mallya Road, Bengaluru',
    aliases: ['ub city', 'vittal mallya road', 'oakwood', 'jw marriott']
  },
  {
    name: 'The Leela Palace Bengaluru',
    shortName: 'The Leela Palace',
    category: 'hotel',
    icon: '🏨',
    subtext: 'HAL Old Airport Road, Kodihalli, Bengaluru',
    aliases: ['leela', 'the leela palace', 'leela palace bangalore']
  },
  {
    name: 'ITC Gardenia, a Luxury Collection Hotel',
    shortName: 'ITC Gardenia',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Residency Road, Shanthala Nagar, Bengaluru',
    aliases: ['itc gardenia', 'gardenia residency road', 'itc hotel']
  },
  {
    name: 'ITC Windsor, a Luxury Collection Hotel',
    shortName: 'ITC Windsor',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Golf Course Road, Vasanth Nagar, Bengaluru',
    aliases: ['itc windsor', 'windsor manor', 'golf course road']
  },
  {
    name: 'The Ritz-Carlton Bangalore',
    shortName: 'The Ritz-Carlton',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Residency Road, Ashok Nagar, Bengaluru',
    aliases: ['ritz carlton', 'the ritz carlton', 'ritz carlton residency road']
  },
  {
    name: 'Taj West End, Bengaluru',
    shortName: 'Taj West End',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Race Course Road, High Grounds, Bengaluru',
    aliases: ['taj west end', 'race course road', 'west end hotel']
  },
  {
    name: 'JW Marriott Hotel Bengaluru',
    shortName: 'JW Marriott',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Vittal Mallya Road, Shanthala Nagar, Bengaluru',
    aliases: ['jw marriott', 'marriott vittal mallya', 'jw marriott bangalore']
  },
  {
    name: 'Four Seasons Hotel Bengaluru at Embassy ONE',
    shortName: 'Four Seasons Hotel',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Bellary Road, Ganganagar, Bengaluru',
    aliases: ['four seasons', 'embassy one', 'four seasons bellary road']
  },
  {
    name: 'Shangri-La Bengaluru',
    shortName: 'Shangri-La',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Palace Road, Vasanth Nagar, Bengaluru',
    aliases: ['shangri la', 'shangri-la', 'palace road']
  },
  {
    name: 'Sheraton Grand Bangalore Hotel at Brigade Gateway',
    shortName: 'Sheraton Grand',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Dr Rajkumar Road, Rajajinagar, Bengaluru',
    aliases: ['sheraton grand', 'sheraton brigade gateway', 'sheraton rajajinagar']
  },
  {
    name: 'Taj Yeshwantpur, Bengaluru',
    shortName: 'Taj Yeshwantpur',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Tumkur Road, Yeshwanthpur, Bengaluru',
    aliases: ['taj yeshwantpur', 'taj yeshwanthpur', 'tumkur road hotel']
  },
  {
    name: 'Taj MG Road, Bengaluru',
    shortName: 'Taj MG Road',
    category: 'hotel',
    icon: '🏨',
    subtext: 'Trinity Circle, MG Road, Bengaluru',
    aliases: ['taj mg road', 'taj trinity circle', 'vivanta by taj mg road']
  },

  // 🏢 TECH PARKS & CORPORATE HUBS
  {
    name: 'Manyata Embassy Business Park',
    shortName: 'Manyata Tech Park',
    category: 'techpark',
    icon: '🏢',
    subtext: 'Nagavara / Outer Ring Road, Hebbal, Bengaluru',
    aliases: ['manyata', 'manyata tech park', 'manyata embassy', 'nagavara tech park']
  },
  {
    name: 'International Tech Park Bangalore (ITPL)',
    shortName: 'ITPL Whitefield',
    category: 'techpark',
    icon: '🏢',
    subtext: 'Whitefield Main Road, Bengaluru',
    aliases: ['itpl', 'international tech park', 'itpl whitefield']
  },
  {
    name: 'Bagmane Tech Park',
    shortName: 'Bagmane Tech Park',
    category: 'techpark',
    icon: '🏢',
    subtext: 'CV Raman Nagar, Bengaluru',
    aliases: ['bagmane', 'bagmane tech park', 'cv raman nagar tech park']
  },
  {
    name: 'Embassy GolfLinks Business Park (EGL)',
    shortName: 'Embassy GolfLinks (EGL)',
    category: 'techpark',
    icon: '🏢',
    subtext: 'Intermediate Ring Road, Domlur, Bengaluru',
    aliases: ['egl', 'embassy golflinks', 'domlur tech park']
  },
  {
    name: 'RGA Tech Park',
    shortName: 'RGA Tech Park',
    category: 'techpark',
    icon: '🏢',
    subtext: 'Sarjapur Road, Carmelaram, Bengaluru',
    aliases: ['rga', 'rga tech park', 'sarjapur tech park']
  },
  {
    name: 'Ecospace & EcoWorld Business Park',
    shortName: 'Ecospace / EcoWorld',
    category: 'techpark',
    icon: '🏢',
    subtext: 'Outer Ring Road, Bellandur, Bengaluru',
    aliases: ['ecospace', 'ecoworld', 'bellandur tech park', 'rmz ecospace', 'rmz ecoworld']
  },
  {
    name: 'Prestige Tech Park',
    shortName: 'Prestige Tech Park',
    category: 'techpark',
    icon: '🏢',
    subtext: 'Marathahalli - Sarjapur Outer Ring Road, Bengaluru',
    aliases: ['prestige tech park', 'kadubeesanahalli']
  },
  {
    name: 'World Trade Center Bengaluru (WTC)',
    shortName: 'World Trade Center',
    category: 'techpark',
    icon: '🏢',
    subtext: 'Brigade Gateway Campus, Rajajinagar, Bengaluru',
    aliases: ['wtc', 'world trade center', 'wtc bangalore', 'brigade gateway']
  },

  // 🚆 RAILWAY STATIONS & BUS TERMINALS
  {
    name: 'KSR Bengaluru City Railway Station (Majestic SBC)',
    shortName: 'KSR Bengaluru (Majestic)',
    category: 'station',
    icon: '🚆',
    subtext: 'Kempegowda, Majestic, Bengaluru',
    aliases: ['ksr', 'majestic railway station', 'bangalore city station', 'sbc']
  },
  {
    name: 'Yesvantpur Junction Railway Station (YPR)',
    shortName: 'Yeshwanthpur Station (YPR)',
    category: 'station',
    icon: '🚆',
    subtext: 'Tumkur Road, Yeshwanthpur, Bengaluru',
    aliases: ['yesvantpur', 'yeshwantpur railway station', 'ypr']
  },
  {
    name: 'Sir M. Visvesvaraya Terminal (SMVT Baiyappanahalli)',
    shortName: 'SMVT Terminal (Baiyappanahalli)',
    category: 'station',
    icon: '🚆',
    subtext: 'Baiyappanahalli, Banaswadi, Bengaluru',
    aliases: ['smvt', 'sir m visvesvaraya terminal', 'baiyappanahalli station']
  },
  {
    name: 'Bangalore Cantonment Railway Station (BNC)',
    shortName: 'Cantonment Station (BNC)',
    category: 'station',
    icon: '🚆',
    subtext: 'Vasanth Nagar, Bengaluru',
    aliases: ['cantonment', 'bangalore cantonment', 'bnc']
  },

  // 🛣️ POPULAR OUTSTATION DESTINATIONS FROM BENGALURU
  {
    name: 'Mysuru (Mysore)',
    shortName: 'Mysuru',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Mysore Palace • Chamundi Hill • 145 km via Expressway',
    aliases: ['mysuru', 'mysore', 'mysore palace', 'chamundi']
  },
  {
    name: 'Coorg / Madikeri',
    shortName: 'Coorg',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Kushalnagar • Abbey Falls • 260 km from Bengaluru',
    aliases: ['coorg', 'madikeri', 'kushalnagar', 'virajpet', 'kodagu']
  },
  {
    name: 'Ooty (Udhagamandalam)',
    shortName: 'Ooty',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Nilgiris • Coonoor • Doddabetta • 275 km via Bandipur',
    aliases: ['ooty', 'udhagamandalam', 'coonoor', 'nilgiris', 'kotagiri']
  },
  {
    name: 'Wayanad, Kerala',
    shortName: 'Wayanad',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Vythiri • Kalpetta • Chembra • 280 km from Bengaluru',
    aliases: ['wayanad', 'vythiri', 'kalpetta', 'sulthan bathery']
  },
  {
    name: 'Chikkamagaluru',
    shortName: 'Chikkamagaluru',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Mullayanagiri • Coffee Estates • 245 km from Bengaluru',
    aliases: ['chikkamagaluru', 'chikmagalur', 'mullayanagiri', 'baba budangiri']
  },
  {
    name: 'Sakleshpur',
    shortName: 'Sakleshpur',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Western Ghats • Bisle Ghat • 220 km from Bengaluru',
    aliases: ['sakleshpur', 'sakleshpur ghats', 'manjarabad']
  },
  {
    name: 'Kabini / Nagarhole National Park',
    shortName: 'Kabini',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Jungle Safari • River Lodges • 215 km from Bengaluru',
    aliases: ['kabini', 'nagarhole', 'kabini river', 'orange county']
  },
  {
    name: 'Bandipur National Park',
    shortName: 'Bandipur',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Tiger Reserve • Safari Lodges • 220 km from Bengaluru',
    aliases: ['bandipur', 'bandipur safari', 'bandipur national park']
  },
  {
    name: 'Hampi (UNESCO World Heritage Site)',
    shortName: 'Hampi',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Vijayanagara Ruins • Hosapete • 340 km from Bengaluru',
    aliases: ['hampi', 'hosapete', 'hospet', 'vijayanagara']
  },
  {
    name: 'Tirupati / Tirumala Balaji',
    shortName: 'Tirupati',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Lord Venkateswara Temple • Andhra Pradesh • 250 km',
    aliases: ['tirupati', 'tirumala', 'balaji temple', 'tirupathi']
  },
  {
    name: 'Chennai, Tamil Nadu',
    shortName: 'Chennai',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Marina Beach • OMR • Guindy • 340 km from Bengaluru',
    aliases: ['chennai', 'madras', 'omr', 'ecr chennai']
  },
  {
    name: 'Puducherry (Pondicherry)',
    shortName: 'Pondicherry',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'White Town • Promenade Beach • Auroville • 310 km',
    aliases: ['puducherry', 'pondicherry', 'pondicherry french quarter', 'auroville']
  },
  {
    name: 'Coimbatore, Tamil Nadu',
    shortName: 'Coimbatore',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Isha Yoga Center • Gandhipuram • 360 km from Bengaluru',
    aliases: ['coimbatore', 'isha yoga', 'kovai']
  },
  {
    name: 'Goa (North & South Goa)',
    shortName: 'Goa',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Panaji • Calangute • Candolim • 560 km from Bengaluru',
    aliases: ['goa', 'panaji', 'north goa', 'south goa', 'calangute', 'baga']
  },
  {
    name: 'Hyderabad, Telangana',
    shortName: 'Hyderabad',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'HITEC City • Gachibowli • Banjara Hills • 570 km',
    aliases: ['hyderabad', 'hitec city', 'cyberabad', 'secunderabad']
  },
  {
    name: 'Gokarna / Murudeshwar',
    shortName: 'Gokarna',
    category: 'outstation',
    icon: '🛣️',
    subtext: 'Om Beach • Kudle Beach • Karwar • 490 km from Bengaluru',
    aliases: ['gokarna', 'murudeshwar', 'om beach', 'kudle beach']
  }
];

// In-memory cache for online geocoding queries
const onlineCache = new Map();

/**
 * Fast synchronous search across curated database
 */
export function searchLocalLocations(query, limit = 6) {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();

  const exactStarts = [];
  const wordStarts = [];
  const contains = [];

  for (const loc of CURATED_LOCATIONS) {
    const nameLower = loc.name.toLowerCase();
    const shortLower = loc.shortName.toLowerCase();
    const aliases = loc.aliases || [];

    if (nameLower.startsWith(q) || shortLower.startsWith(q)) {
      exactStarts.push(loc);
    } else if (
      nameLower.includes(` ${q}`) ||
      shortLower.includes(` ${q}`) ||
      aliases.some(a => a.startsWith(q))
    ) {
      wordStarts.push(loc);
    } else if (
      nameLower.includes(q) ||
      aliases.some(a => a.includes(q)) ||
      (loc.subtext && loc.subtext.toLowerCase().includes(q))
    ) {
      contains.push(loc);
    }
  }

  return [...exactStarts, ...wordStarts, ...contains].slice(0, limit);
}

/**
 * Asynchronous search: returns local curated matches instantly,
 * then queries Photon Geocoding API if query is 3+ chars and local results < limit.
 */
export async function searchLocationsAsync(query, limit = 6) {
  const localResults = searchLocalLocations(query, limit);

  // If we already have 5+ strong local matches or query is short, return local immediately
  if (localResults.length >= 5 || !query || query.trim().length < 3) {
    return localResults;
  }

  const q = query.trim();
  if (onlineCache.has(q.toLowerCase())) {
    const cached = onlineCache.get(q.toLowerCase());
    return mergeResults(localResults, cached, limit);
  }

  try {
    // Focus around Bengaluru coordinates: lat=12.9716, lon=77.5946
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5&lat=12.9716&lon=77.5946`;
    const response = await fetch(url, { signal: AbortSignal.timeout(2000) });
    if (!response.ok) return localResults;

    const data = await response.json();
    const onlineMatches = (data.features || []).map((feat) => {
      const props = feat.properties || {};
      const placeName = props.name || props.street || q;
      const contextParts = [props.city || props.district, props.state || props.country].filter(Boolean);
      return {
        name: placeName + (contextParts.length > 0 ? `, ${contextParts.join(', ')}` : ''),
        shortName: placeName,
        category: 'area',
        icon: '📍',
        subtext: contextParts.join(' • ') || 'Verified Location',
        isOnline: true
      };
    });

    onlineCache.set(q.toLowerCase(), onlineMatches);
    return mergeResults(localResults, onlineMatches, limit);
  } catch (err) {
    // Network or timeout: gracefully fallback to local
    return localResults;
  }
}

function mergeResults(localList, onlineList, limit) {
  const seen = new Set(localList.map(l => l.name.toLowerCase()));
  const merged = [...localList];

  for (const item of onlineList) {
    if (!seen.has(item.name.toLowerCase())) {
      seen.add(item.name.toLowerCase());
      merged.push(item);
    }
  }

  return merged.slice(0, limit);
}
