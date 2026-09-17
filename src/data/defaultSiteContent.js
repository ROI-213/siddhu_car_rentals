// Default Home Page & Site Configuration Data
// Used as initial data, fallback cache, and reset baseline for the Admin CMS

export const DEFAULT_SITE_CONTENT = {
  hero: {
    routePill: "BENGALURU & BEYOND",
    titleLine1: "PREMIUM CHAUFFEUR-DRIVEN",
    titleLine2: "CAR RENTALS IN BANGALORE",
    sublineBadge: "Self-Drive Not Available • Verified Chauffeurs • All Premium Cars",
    supportingText: "Premium car rentals with professional chauffeurs for airport transfers, local trips, outstation travel, corporate bookings, and special events across Bangalore and South India.",
    btnExploreText: "EXPLORE FLEET",
    btnQuoteText: "GET QUOTE",
    backgroundImage: "/images/siddhu_adventure_hero.jpg"
  },

  contact: {
    badge: "Get In Touch",
    title: "Bengaluru Dispatch Headquarters &",
    titleHighlight: "Concierge Desk",
    description: "Reach out 24/7 for instant mobility dispatch, corporate agreements, or customized itineraries.",
    addressTitle: "Headquarters Address",
    address: "#314, 12th Main, 15th Cross, JP Nagar 5th Phase, Bengaluru - 560078",
    phoneTitle: "24/7 Dispatch Desk",
    phonePrimary: "+91 76250 59665",
    phoneSecondary: "+91 81472 04327",
    whatsappTitle: "WhatsApp Priority Desk",
    whatsappNumber: "+91 76250 59665",
    whatsappSubtext: "Instant Reply",
    emailTitle: "Corporate Email",
    email: "reservations@siddhucarrentals.com",
    gmapsQuery: "siddhu+car+rentals+%23314%2C+12th+Main%2C+15th+Cross%2C+JP+Nagar+5th+Phase%2C+Bengaluru+-+560078",
    gmapsEmbedUrl: "https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1ssiddhu+car+rentals+JP+Nagar+5th+Phase+Bengaluru"
  },

  testimonials: {
    featured: {
      id: "featured-1",
      rating: 5,
      tag: "Verified Client Experience",
      quote: "Siddhu Car Rentals handled our international board delegation with complete perfection. The Mercedes S-Class was pristine and the chauffeur was impeccably punctual.",
      name: "Ananth Narayan",
      role: "Managing Director",
      company: "Global Tech Capital",
      badge: "VIP Guest",
      avatarBg: "#0F766E"
    },
    list: [
      {
        id: 2,
        name: "Deepak Somaya",
        role: "Corporate Traveler",
        company: "",
        review: "Very professional service. Chauffeur arrived 15 minutes before the pickup time for my early morning flight to Singapore. Smooth and stress-free journey.",
        rating: 5,
        bg: "#F8FAFC",
        borderLeft: "#0284C7"
      },
      {
        id: 3,
        name: "Sneha Ramachandran",
        role: "Family Vacation to Coorg",
        company: "",
        review: "Booked the Innova Crysta for a 4-day family trip to Madikeri. The vehicle was immaculate and the driver navigated the ghat sections very safely and courteously.",
        rating: 5,
        bg: "#FDFBF7",
        borderLeft: "#C5A059"
      },
      {
        id: 4,
        name: "Rajesh Varma",
        role: "VP Operations",
        company: "Indus Logistics",
        review: "Reliable partner for all our executive ground transport across Bangalore and Hosur industrial corridor. Transparent billing with zero unexpected surprises.",
        rating: 5,
        bg: "#F0FDF4",
        borderLeft: "#059669"
      },
      {
        id: 5,
        name: "Vikram Malhotra",
        role: "Wedding Logistics Coordinator",
        company: "",
        review: "Coordinated a fleet of 8 Innova Crystas and 2 Mercedes sedans for a destination wedding in Palace Grounds. Every car arrived on time and chauffeurs were polite.",
        rating: 5,
        bg: "#FFF7ED",
        borderLeft: "#EA580C"
      },
      {
        id: 6,
        name: "Pooja Krishnan",
        role: "Mysore Day Trip",
        company: "",
        review: "Smooth booking experience over WhatsApp. Driver was familiar with all the historic sights in Srirangapatna and Mysore. Highly recommend their outstation service.",
        rating: 5,
        bg: "#FAF5FF",
        borderLeft: "#9333EA"
      },
      {
        id: 7,
        name: "Arjun Nambiar",
        role: "Frequent Airport Traveler",
        company: "",
        review: "Best airport taxi service in Bangalore. No cancellations, clean AC cabs, and drivers who know the toll road routes well. My go-to for airport transfers.",
        rating: 5,
        bg: "#F0F9FF",
        borderLeft: "#0284C7"
      }
    ]
  },

  destinations: {
    heroItems: [
      {
        id: "mysore",
        name: "Mysore Palace (Mysuru)",
        tag: "Palaces & Silk Heritage • 140 km",
        desc: "Uniformed Chauffeur Guaranteed • On-Time Pickup",
        dist: "140 km",
        rate: "From ₹15/km",
        img: "/images/destinations/mysore_palace.jpg",
        type: "outstation",
        tagColor: "var(--accent-coral-primary)"
      },
      {
        id: "airport",
        name: "Bangalore Airport (BLR)",
        tag: "VIP Flight Transfers • 38 km",
        desc: "Flight tracking & punctual luxury chauffeur pickup",
        dist: "38 km",
        rate: "Flat Airport Tariff",
        img: "/images/destinations/bangalore_airport.jpg",
        type: "airport",
        tagColor: "var(--accent-sky-primary)"
      },
      {
        id: "coorg",
        name: "Coorg Hills (Madikeri)",
        tag: "Misty Coffee Valleys • 260 km",
        desc: "Scenic Western Ghats mountain drive with verified driver",
        dist: "260 km",
        rate: "From ₹15/km",
        img: "/images/destinations/coorg.jpg",
        type: "outstation",
        tagColor: "var(--accent-mint-primary)"
      }
    ],
    ribbonItems: [
      { id: "hampi", name: "Hampi Heritage", desc: "UNESCO Stone Heritage & Ruins", dist: "340 km", img: "/images/destinations/hampi.jpg", alt: "Hampi UNESCO Stone Heritage Chariot & Ruins", bg: "#FDFBF7", rate: "From ₹15/km", fare: "300 km/day min", type: "outstation" },
      { id: "chikmagalur", name: "Chikmagalur", desc: "Coffee Estates & Cloud Peaks", dist: "240 km", img: "/images/destinations/chikmagalur.jpg", alt: "Chikmagalur Mullayanagiri Peak & Coffee Estates", bg: "#F0F9FF", rate: "From ₹15/km", fare: "300 km/day min", type: "outstation" },
      { id: "ooty", name: "Ooty & Nilgiris", desc: "Botanical Valleys & Pine Lakes", dist: "270 km", img: "/images/destinations/ooty.jpg", alt: "Ooty Queen of Hill Stations & Botanical Gardens", bg: "#F5F3FF", rate: "From ₹15/km", fare: "300 km/day min", type: "outstation" },
      { id: "wayanad", name: "Wayanad", desc: "Rainforest & Wildlife Sanctuaries", dist: "280 km", img: "/images/destinations/wayanad.jpg", alt: "Wayanad Western Ghats Rainforest & Sanctuaries", bg: "#F0FDF4", rate: "From ₹15/km", fare: "300 km/day min", type: "outstation" },
      { id: "sakleshpur", name: "Sakleshpur", desc: "Mist Hills & Spice Trails", dist: "220 km", img: "/images/destinations/sakleshpur.jpg", alt: "Sakleshpur Manjarabad Star Fort & Spice Hills", bg: "#FDFBF7", rate: "From ₹15/km", fare: "300 km/day min", type: "outstation" },
      { id: "chennai", name: "Chennai ECR", desc: "Coastal Scenic Interstate Highway", dist: "350 km", img: "/images/destinations/chennai_ecr.jpg", alt: "Chennai East Coast Road Coastal Interstate Highway", bg: "#F0F9FF", rate: "From ₹15/km", fare: "300 km/day min", type: "outstation" },
      { id: "nandi", name: "Nandi Hills", desc: "Sunrise Cloud Bed & Historic Fort", dist: "60 km", img: "/images/destinations/nandi_hills.jpg", alt: "Nandi Hills Sunrise Viewpoint & Tipu Sultan Fortress", bg: "#FFF7ED", rate: "From ₹15/km", fare: "Round Trip Local", type: "outstation" },
      { id: "palace", name: "Bangalore Palace", desc: "Tudor Style Royal Architecture", dist: "15 km", img: "/images/destinations/bangalore_palace.jpg", alt: "Bangalore Palace Heritage Royal Grounds", bg: "#FDFBF7", rate: "Local Package", fare: "4h / 8h Local", type: "local" },
      { id: "lalbagh", name: "Lalbagh Gardens", desc: "Botanical Glass House & Florals", dist: "10 km", img: "/images/destinations/lalbagh_glass_house.jpg", alt: "Lalbagh Botanical Garden Historic Glass House", bg: "#F0FDF4", rate: "Local Package", fare: "4h / 8h Local", type: "local" }
    ]
  },

  services: [
    {
      id: "airport",
      title: "AIRPORT TRANSFER",
      subtitle: "Punctual pickups & drop-offs at Kempegowda International Airport.",
      image: "/images/services_airport_final.jpg",
      path: "/local"
    },
    {
      id: "local",
      title: "LOCAL RENTAL",
      subtitle: "Hourly & full-day car rentals within Bangalore.",
      image: "/images/services_local_final.jpg",
      path: "/local"
    },
    {
      id: "outstation",
      title: "OUTSTATION TRIPS",
      subtitle: "One-way & round-trip travel to Mysore, Coorg, Hampi & beyond.",
      image: "/images/services_roundtrip_final.jpg",
      path: "/outstation"
    },
    {
      id: "corporate",
      title: "CORPORATE TRAVEL",
      subtitle: "Dedicated fleet & billing for business & employee commutes.",
      image: "/images/services_corporate_final.jpg",
      path: "/corporate"
    },
    {
      id: "luxury",
      title: "LUXURY CARS",
      subtitle: "Premium sedans & SUVs with chauffeur for executive travel.",
      image: "/images/services_luxury_final.jpg",
      path: "/fleet"
    },
    {
      id: "wedding",
      title: "WEDDINGS & EVENTS",
      subtitle: "Decorated cars for weddings, engagements & special occasions.",
      image: "/images/services_wedding_final.jpg",
      path: "/local"
    },
    {
      id: "group",
      title: "GROUP TRAVEL",
      subtitle: "Tempo travellers & mini buses for group outings & tours.",
      image: "/images/services_group_final.jpg",
      path: "/local"
    }
  ],

  story: [
    {
      id: "01",
      label: "PROFESSIONAL DRIVERS",
      title: "Professional chauffeurs.\nTrained for premium travel.",
      desc: "Uniformed, police-verified, English-speaking chauffeurs trained in VIP confidentiality."
    },
    {
      id: "02",
      label: "WELL-MAINTAINED VEHICLES",
      title: "Premium vehicles.\nAlways ready for your journey.",
      desc: "100% factory-serviced vehicles with sanitized non-smoking cabins."
    },
    {
      id: "03",
      label: "AFFORDABLE PRICING",
      title: "Transparent pricing.\nNo unexpected surprises.",
      desc: "Clear, transparent hourly and per-km tariffs with no hidden surge pricing."
    },
    {
      id: "04",
      label: "ON-TIME SERVICE",
      title: "Punctuality you can\ndepend on.",
      desc: "Chauffeur arrives before scheduled pickup with live flight tracking."
    },
    {
      id: "05",
      label: "24/7 SUPPORT",
      title: "Always available.",
      desc: "Dedicated corporate concierge support to coordinate scheduling changes."
    },
    {
      id: "06",
      label: "SAFE & COMFORTABLE",
      title: "Travel with confidence.",
      desc: "GPS-equipped tracking with emergency response triggers and speed governors."
    }
  ]
};

export const DEFAULT_CORPORATE_CONTENT = {
  hero: {
    badge: "Corporate Enterprise Mobility Solutions",
    title: "Executive Fleet Solutions for",
    titleHighlight: "Modern Enterprises",
    description: "Dedicated monthly corporate fleet rentals, executive airport VIP transfers, guest & VIP movement, event convoys, and GST-billed consolidated invoicing — purpose-built for HR, Admin, Travel Desks, and Facilities teams across Bengaluru.",
    image: "/images/services_corporate_s_class_landscape.jpg"
  },
  brochure: {
    bannerTitle: "2026 Corporate Mobility Brochure & Rate Card Available for Download",
    bannerSubtitle: "Includes complete tariff guide, GSTIN compliance documents, SLA terms, and fleet specifications for HR & Travel Desks.",
    pdfUrl: "/siddhu_car_rentals_corporate_profile.pdf",
    phone: "+91 76250 59665"
  },
  rateCard: [
    {
      id: "executive-sedan",
      category: "Executive Sedan",
      models: "Maruti Suzuki Dzire / Toyota Etios (Commercial KA Yellow Board)",
      local8h80k: "₹2,200",
      extraKm: "₹14 / km",
      extraHr: "₹150 / hr",
      airportTransfer: "₹1,400",
      monthlyRetainer: "₹48,000 / month (2500 km / 26 days)"
    },
    {
      id: "corporate-mpv",
      category: "Premium Corporate MPV",
      models: "Toyota Innova Crysta 2.4 VX (Captain Seats, Dual AC)",
      local8h80k: "₹3,400",
      extraKm: "₹19 / km",
      extraHr: "₹250 / hr",
      airportTransfer: "₹2,400",
      monthlyRetainer: "₹72,000 / month (2500 km / 26 days)"
    },
    {
      id: "luxury-sedan",
      category: "Luxury Business Sedan",
      models: "Mercedes-Benz E-Class / Honda Accord Executive",
      local8h80k: "₹8,500",
      extraKm: "₹65 / km",
      extraHr: "₹600 / hr",
      airportTransfer: "₹6,500",
      monthlyRetainer: "Custom Retainer Contract"
    },
    {
      id: "vip-flagship",
      category: "Ultra Luxury VIP Flagship",
      models: "Mercedes-Benz S-Class S350d / BMW 7-Series / Toyota Vellfire",
      local8h80k: "₹16,000",
      extraKm: "₹120 / km",
      extraHr: "₹1,200 / hr",
      airportTransfer: "₹12,000",
      monthlyRetainer: "Dedicated Retainer Available"
    },
    {
      id: "premium-suv",
      category: "Premium SUV",
      models: "Toyota Fortuner 4x4 / Audi Q7 Quattro",
      local8h80k: "₹6,500",
      extraKm: "₹45 / km",
      extraHr: "₹500 / hr",
      airportTransfer: "₹4,800",
      monthlyRetainer: "Custom Retainer Contract"
    },
    {
      id: "vip-van",
      category: "Executive VIP Van & Coach",
      models: "Force Urbania VIP (12+1) / Force Traveller Luxury (16+1)",
      local8h80k: "₹5,500",
      extraKm: "₹28 / km",
      extraHr: "₹350 / hr",
      airportTransfer: "₹4,200",
      monthlyRetainer: "₹95,000 / month (Route Shuttles)"
    }
  ],
  commercialTerms: "Rates quoted above are standard benchmarks. Volume discounts apply for fleets of 3+ vehicles. Tolls, parking, and interstate permits billed at actuals. 5% GST applicable with full Input Tax Credit (ITC) pass-through on GSTIN invoices. 30-day net credit available upon company empanelment.",
  pillars: [
    {
      id: "retainers",
      icon: "Car",
      title: "Monthly & Long-Term Fleet Retainers",
      headline: "Dedicated Chauffeur & Vehicle Assigned to Your Campus",
      points: [
        "Dedicated vehicle stationed exclusively at your office or executive residence",
        "Police-verified, uniformed chauffeur assigned permanently to your account",
        "Fixed flat monthly commercial billing — zero surge pricing during peak hours or rains",
        "Guaranteed immediate replacement vehicle deployed within 60 minutes for servicing or repair",
        "Flexible Dry Lease or Wet Lease options with comprehensive insurance and fuel management"
      ]
    },
    {
      id: "airport",
      icon: "PlaneLanding",
      title: "Executive Airport VIP Transfers",
      headline: "Seamless Kempegowda International Airport (BLR) Protocol",
      points: [
        "Real-time flight gate tracking at Kempegowda Airport Terminal 1 and Terminal 2",
        "Chauffeur placed 15 minutes prior to scheduled flight landing at Arrivals",
        "Personalized acrylic or digital corporate placard meet-and-greet in arrival lounge",
        "Chauffeur name, phone, and vehicle registration shared 2 hours before flight touchdown",
        "Direct kerbside boarding assistance and luggage handling for delegates and CXOs"
      ]
    },
    {
      id: "vip_movement",
      icon: "UsersRound",
      title: "Guest & VIP Delegation Movement",
      headline: "Discretion, Etiquette & Confidentiality for Global Leaders",
      points: [
        "Uniformed chauffeurs trained in executive protocol, etiquette, and defensive driving",
        "Strict confidentiality with signed Non-Disclosure Agreements (NDAs) for board discussions",
        "Pristine interior sanitization with daily English business newspapers, tissues, and packaged water",
        "Priority dispatch for international investor visits, board meetings, and foreign audit teams",
        "Multi-lingual drivers with working knowledge of English, Kannada, and Hindi"
      ]
    },
    {
      id: "events",
      icon: "CalendarDays",
      title: "Event & Conference Transportation",
      headline: "Synchronized Fleet Convoys from 5 to 50+ Vehicles",
      points: [
        "Large-scale convoy movements for corporate offsites, tech summits, annual days, and AGMs",
        "Dedicated on-site Dispatch Marshal stationed at your venue to coordinate live vehicle movement",
        "Homogenous matching luxury fleet (all-white or all-silver Innova Crystas and Mercedes sedans)",
        "Real-time GPS tracking link shared directly with your organizing committee and security desk",
        "Digital trip sheets with single consolidated event billing for simplified accounting"
      ]
    },
    {
      id: "invoicing",
      icon: "Receipt",
      title: "Compliant GST Invoicing & Credit Terms",
      headline: "30-Day Net Credit Terms Built for Enterprise Procurement",
      points: [
        "Single consolidated monthly tax invoice with complete GST input tax credit (ITC) eligibility (SAC 996601)",
        "Itemized duty slip reconciliation with start/end odometer readings, trip times, and passenger signatures",
        "Standard 30-day net credit terms for empanelled corporate accounts",
        "Custom PO (Purchase Order) and Cost Center tagging for frictionless internal finance clearance",
        "Complete vendor empanelment package (GSTIN, PAN, MSME, Police Verifications, Commercial Taxi Permits)"
      ]
    },
    {
      id: "concierge",
      icon: "UserCheck",
      title: "Dedicated Corporate Account Concierge",
      headline: "Single Point of Contact for All Travel & Fleet Operations",
      points: [
        "Named Senior Corporate Account Director for your enterprise: S.M. Patil (+91 76250 59665)",
        "24/7 dedicated enterprise dispatch desk for immediate itinerary amendments or midnight runs",
        "Quarterly fleet utilization reviews with rate lock protection for long-term retainers",
        "Direct WhatsApp enterprise group for HR, Admin, and Facilities teams for 60-second response",
        "Documented SLA commitments: 99.8% on-time dispatch and zero unfulfilled booking guarantee"
      ]
    }
  ],
  tiers: [
    {
      id: "c-suite",
      tier: "C-Suite & Board Sedans",
      badge: "Flagship Luxury",
      models: "Mercedes-Benz S-Class S350d • BMW 7-Series • Mercedes E-Class",
      capacity: "3–4 Passengers • 3 Suitcases",
      bestFor: "Board members, Managing Directors, keynote guests, and CXO airport arrivals.",
      features: ["Ventilated Nappa Leather", "Acoustic Privacy Glass", "Daily Business Papers & Water", "Rear Workspace Charging"]
    },
    {
      id: "mpvs-suvs",
      tier: "Executive MPVs & Luxury SUVs",
      badge: "Enterprise Favorite",
      models: "Toyota Innova Crysta 2.4 VX • Toyota Vellfire VIP Lounge • Audi Q7 Quattro",
      capacity: "6–7 Passengers • 5 Suitcases",
      bestFor: "Visiting client delegations, tech park route audits, and executive team transit.",
      features: ["Reclining Captain Chairs", "Tri-Zone Climate Control", "High Ground Clearance", "Ample Laptop Workspace"]
    },
    {
      id: "coaches-shuttles",
      tier: "VIP Coaches & Executive Shuttles",
      badge: "Group Delegation",
      models: "Force Urbania VIP (12+1) • Force Traveller Luxury (16+1) • Toyota HiAce Commuter",
      capacity: "12–16 Passengers • 12+ Suitcases",
      bestFor: "Corporate tech summit shuttles, project teams, offsite retreats, and airport delegation transfers.",
      features: ["Individual AC Vents", "Pushback Ergonomic Seats", "PA Microphone for Briefs", "Dedicated Luggage Boot"]
    },
    {
      id: "daily-commuters",
      tier: "Daily Campus & Tech Park Commuters",
      badge: "Cost-Effective Mobility",
      models: "Toyota Innova Crysta • Kia Carens • Maruti Suzuki Dzire Executive",
      capacity: "4–6 Passengers • 3 Suitcases",
      bestFor: "Daily scheduled employee commute, IT park shuttles, and inter-office departmental travel.",
      features: ["100% KA Commercial Board", "GPS Live Monitored", "Punctuality SLA 99.8%", "Sanitized Daily"]
    }
  ],
  vendor: {
    badge: "Enterprise Vendor Empanelment",
    title: "Ready for Your Organization's Procurement Process",
    description: "We are pre-equipped for enterprise vendor onboarding with all required documentation — GST registration, PAN, commercial insurance certificates, driver police verification records, and NDA templates. Share your vendor empanelment form and we will complete it within 24 hours.",
    gstin: "29AAMFS1234F1Z5",
    billingTerms: "Monthly Consolidated / Net-30 Credit",
    fleetTag: "100% KA Commercial Yellow Board",
    pdfUrl: "/siddhu_car_rentals_corporate_profile.pdf"
  },
  onboardingSteps: [
    { step: "01", title: "Submit Requirement", desc: "Fill in the corporate enquiry form above with your fleet requirements, office locations, and expected start date." },
    { step: "02", title: "Commercial Proposal", desc: "Our Senior Corporate Accounts Director shares a personalized monthly tariff, SLA agreement, and vehicle allocation plan within 4 hours." },
    { step: "03", title: "Vendor Empanelment", desc: "Sign the corporate mobility agreement, exchange billing GST details, and set up Net-30 credit terms." },
    { step: "04", title: "Live Fleet Deployment", desc: "Vehicles deployed with pre-briefed uniformed chauffeurs, digital duty slips, live tracking, and 24/7 dedicated dispatch support." }
  ]
};

export const DEFAULT_OUTSTATION_CONTENT = {
  hero: {
    badge: "Intercity Luxury Chauffeur",
    title: "Outstation Travel from",
    titleHighlight: "Bengaluru",
    description: "AC sedans, SUVs, and MPVs with driver for one-way drops, round trips, and multi-city trips across Karnataka, Tamil Nadu, and Kerala. Per-km rates, no hidden charges.",
    image: "/images/hero_luxury_sedan.jpg"
  },
  destinations: [
    { id: "mysuru", name: "Mysuru (Mysore)", distance: "140 Kms", time: "3.0 Hours", rate: "From ₹15/km", image: "/images/destinations/mysuru.jpg", alt: "Mysore Palace — Royal Heritage & Chauffeur Tour Mysuru", highlight: "Royal Palaces & Chamundi Hills" },
    { id: "coorg", name: "Coorg (Madikeri)", distance: "260 Kms", time: "5.5 Hours", rate: "From ₹15/km", image: "/images/destinations/coorg.jpg", alt: "Coorg — Misty Coffee Valleys, Abbey Falls & Madikeri Hills", highlight: "Coffee Plantations & Waterfalls" },
    { id: "chikmagalur", name: "Chikmagalur", distance: "240 Kms", time: "5.0 Hours", rate: "From ₹15/km", image: "/images/destinations/chikmagalur.jpg", alt: "Chikmagalur — Mullayanagiri Peak & Coffee Plantation Getaway", highlight: "Mullayanagiri Peak & Tea Estates" },
    { id: "ooty", name: "Ooty & Nilgiris", distance: "270 Kms", time: "6.0 Hours", rate: "From ₹15/km", image: "/images/destinations/ooty.jpg", alt: "Ooty — Queen of Hill Stations & Botanical Gardens Nilgiris", highlight: "Pine Forests & Botanical Gardens" },
    { id: "hampi", name: "Hampi Heritage", distance: "340 Kms", time: "6.5 Hours", rate: "From ₹15/km", image: "/images/destinations/hampi.jpg", alt: "Hampi — UNESCO Stone Heritage Chariot & Ruins", highlight: "UNESCO Stone Chariots & Ruins" },
    { id: "wayanad", name: "Wayanad Rainforest", distance: "280 Kms", time: "6.0 Hours", rate: "From ₹15/km", image: "/images/destinations/wayanad.jpg", alt: "Wayanad — Western Ghats Rainforest & Sanctuaries", highlight: "Wild Sanctuaries & Tea Valleys" },
    { id: "sakleshpur", name: "Sakleshpur Hills", distance: "220 Kms", time: "4.5 Hours", rate: "From ₹15/km", image: "/images/destinations/sakleshpur.jpg", alt: "Sakleshpur — Manjarabad Star Fort & Spice Hills", highlight: "Star Fort & Spice Plantations" },
    { id: "chennai", name: "Chennai Coastal ECR", distance: "350 Kms", time: "6.5 Hours", rate: "From ₹15/km", image: "/images/destinations/chennai_ecr.jpg", alt: "Chennai East Coast Road — Coastal Interstate Scenic Drive", highlight: "Interstate Business & Marina Beach" }
  ],
  options: [
    {
      id: "one-way",
      icon: "🔀",
      title: "One-Way Intercity Drops",
      desc: "Pay only for the distance traveled. Flat one-way rates for Mysuru, Chennai, Hyderabad, and major tier-1 cities."
    },
    {
      id: "round-trip",
      icon: "🔄",
      title: "Round-Trip Vacation Packages",
      desc: "Chauffeur remains with your family throughout the trip for sightseeing, dining, and local hill station exploration."
    },
    {
      id: "airport-express",
      icon: "✈️",
      title: "Airport to Outstation Express",
      desc: "Direct pickup from Kempegowda International Airport terminal to Mysuru, Coorg, or Chikmagalur without entering city traffic."
    },
    {
      id: "family-trips",
      icon: "👨‍👩‍👧‍👦",
      title: "Family & Group Road Trips",
      desc: "Spacious 7-seater Toyota Innova Crysta VIP and 12-seater Force Urbania vans with captain seats and large luggage boots."
    },
    {
      id: "hill-station",
      icon: "🌿",
      title: "Weekend Hill Station Getaways",
      desc: "Curated weekend getaways to Ooty, Wayanad, Sakleshpur, and Coorg with drivers experienced in ghat mountain driving."
    },
    {
      id: "heritage",
      icon: "🏛️",
      title: "Heritage & Temple Convoys",
      desc: "Comfortable long-distance travel to UNESCO Hampi stone ruins, Belur-Halebid, and Tirupati with zero driver hassle."
    }
  ],
  terms: {
    minKmStandard: "300 Kms / Day",
    minKmBuses: "400 Kms / Day",
    billingNotes: "Daily minimum 300 Kms applies (400 Kms for 45/49 seater luxury buses). Garage to garage billing with zero hidden charges. Tolls, state taxes, and parking fees billed at actuals."
  }
};

DEFAULT_SITE_CONTENT.corporate = DEFAULT_CORPORATE_CONTENT;
DEFAULT_SITE_CONTENT.outstation = DEFAULT_OUTSTATION_CONTENT;

