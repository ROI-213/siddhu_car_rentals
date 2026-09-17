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
