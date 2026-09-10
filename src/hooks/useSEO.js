import { useEffect } from 'react';

const SITE_URL = 'https://siddhucarrentals.com';
const OG_IMAGE = `${SITE_URL}/images/og-share.jpg`;
const DEFAULT_DESCRIPTION = 'Car rental with driver in Bengaluru. Airport transfers, local hourly, outstation trips, and corporate fleets.';
const DEFAULT_TITLE = 'Siddhu Car Rentals — Chauffeur-Driven Car Rental Bangalore';

const pageConfig = {
  home: {
    title: 'Chauffeur Driven Car Rental Bangalore | Luxury Car Rental Bangalore – Siddhu Car Rentals',
    description: 'Premium car rental with driver in Bangalore. Airport VIP transfers, local hourly packages, outstation trips across South India, and corporate fleet rentals. Verified chauffeurs, transparent rates.',
  },
  fleets: {
    title: 'Luxury Car Fleet Bangalore | Mercedes, BMW, Toyota Vellfire, Innova – Siddhu Car Rentals',
    description: 'Browse our fleet of luxury sedans, SUVs, and MPVs with chauffeur. Mercedes S-Class, BMW 7-Series, Toyota Vellfire, Innova Crysta, and more.',
  },
  'vehicle-detail': {
    title: 'Luxury Car Rental with Driver in Bangalore – Siddhu Car Rentals',
    description: 'Premium chauffeur-driven car rental in Bangalore. Choose from Mercedes, BMW, Toyota Vellfire, Innova Crysta, and more.',
  },
  outstation: {
    title: 'Outstation Car Rental with Driver Bangalore | Mysore, Coorg, Chikmagalur, Ooty – Siddhu Car Rentals',
    description: 'Outstation car rental with driver from Bangalore. One-way and round-trip to Mysore, Coorg, Chikmagalur, Ooty, Wayanad, Hampi, and across South India.',
  },
  local: {
    title: 'Local Car Rental with Driver Bangalore | Hourly Packages – Siddhu Car Rentals',
    description: 'Hourly car rental with driver in Bangalore. 4hr/40km, 8hr/80km, and full-day packages for airport transfers, business meetings, and city tours.',
  },
  corporate: {
    title: 'Corporate Car Rental Bangalore | Monthly Fleet Rental & B2B – Siddhu Car Rentals',
    description: 'Corporate car rental with driver in Bangalore. Monthly fleet rentals, executive airport VIP transfers, event convoys, and GST-billed consolidated invoicing for enterprises.',
  },
  about: {
    title: 'About Siddhu Car Rentals | Chauffeur Service Bangalore – Our Story',
    description: 'Siddhu Car Rentals is a Bangalore-based car rental company with verified chauffeurs. Serving airport transfers, local hourly, outstation, and corporate clients across South India.',
  },
  testimonials: {
    title: 'Customer Reviews Bangalore | Siddhu Car Rentals – What Clients Say',
    description: 'Genuine customer reviews for Siddhu Car Rentals, Bangalore. Read feedback from corporate clients, airport transfer guests, outstation travellers, and wedding clients.',
  },
  contact: {
    title: 'Contact Siddhu Car Rentals Bangalore | 24/7 Dispatch +91 76250 59665',
    description: 'Contact Siddhu Car Rentals in JP Nagar, Bangalore. Call +91 76250 59665 or WhatsApp for instant car rental bookings, corporate enquiries, and custom itineraries.',
  },
  tariff: {
    title: 'Car Rental Rates Bangalore | Tariff & Pricing – Siddhu Car Rentals',
    description: 'Transparent car rental rates in Bangalore. Local hourly packages, airport transfer fares, outstation per-km rates, and corporate monthly tariffs.',
  },
  admin: {
    title: 'Admin Tariff Portal – Siddhu Car Rentals',
    description: 'Admin tariff management portal for Siddhu Car Rentals.',
  },
  'mercedes-s-class': {
    title: 'Mercedes S-Class Rental Bangalore | Chauffeur-Driven S-Class – Siddhu Car Rentals',
    description: 'Hire a Mercedes S-Class with driver in Bangalore. Premium sedan for airport VIP transfers, corporate executive travel, and special occasions. Verified chauffeur included.',
  },
  'bmw-7-series': {
    title: 'BMW 7-Series Rental Bangalore | Chauffeur-Driven BMW – Siddhu Car Rentals',
    description: 'Hire a BMW 7-Series with driver in Bangalore. Luxury sedan for airport VIP transfers, corporate executive travel, and special occasions. Verified chauffeur included.',
  },
  'toyota-vellfire': {
    title: 'Toyota Vellfire Rental Bangalore | Chauffeur-Driven Vellfire MPV – Siddhu Car Rentals',
    description: 'Hire a Toyota Vellfire with driver in Bangalore. Premium MPV for VIP guest transport, airport transfers, and family outstation trips. Spacious, luxury, reliable.',
  },
};

export function useSEO(pageKey, customTitle, customDescription) {
  useEffect(() => {
    const config = pageConfig[pageKey] || pageConfig.home;
    const title = customTitle || config.title;
    const description = customDescription || config.description;

    document.title = title;

    const setMeta = (attr, content) => {
      if (!content) return;
      const isOg = attr.startsWith('og:');
      const attrName = isOg ? 'property' : 'name';
      let el = document.querySelector(`meta[${attrName}="${attr}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attr);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:image', OG_IMAGE);
    setMeta('og:image:width', '1200');
    setMeta('og:image:height', '630');
    setMeta('og:image:alt', 'Siddhu Car Rentals — Premium Chauffeur-Driven Car Rental in Bangalore');
    setMeta('og:type', 'website');
    setMeta('og:url', window.location.href);
    setMeta('og:site_name', 'Siddhu Car Rentals');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', OG_IMAGE);

    return () => {
      // Reset to default on unmount
      document.title = DEFAULT_TITLE;
    };
  }, [pageKey, customTitle, customDescription]);
}

export function getVehicleSEOConfig(vehicleName) {
  const lower = vehicleName.toLowerCase();
  if (lower.includes('s-class') || lower.includes('s class') || lower.includes('mercedes')) {
    return pageConfig['mercedes-s-class'];
  }
  if (lower.includes('7-series') || lower.includes('7 series') || lower.includes('bmw')) {
    return pageConfig['bmw-7-series'];
  }
  if (lower.includes('vellfire') || lower.includes('vell fire')) {
    return pageConfig['toyota-vellfire'];
  }
  return {
    title: `${vehicleName} Rental Bangalore | with Driver – Siddhu Car Rentals`,
    description: `Hire a ${vehicleName} with driver in Bangalore. Premium chauffeur-driven car rental for airport transfers, corporate travel, and special occasions.`,
  };
}
