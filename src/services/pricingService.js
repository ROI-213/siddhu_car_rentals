
import { DEFAULT_DISPOSAL_TARIFFS, DEFAULT_OUTSTATION_TARIFFS } from './tariffApi.js';

export const FLEET_TARIFF_MAPPING = {
  // Luxury Flagships (8h: ₹22,500, Airport: ₹20,000, Outstation: ₹250/km)
  "mercedes-s-class": 'Merc "S" Class / BMW 7" / Audi A8 latest model',
  "toyota-vellfire": "Toyota Vellfie",
  "bmw-7-series": 'Merc "S" Class / BMW 7" / Audi A8 latest model',
  "audi-a8": 'Merc "S" Class / BMW 7" / Audi A8 latest model',

  // Premium Sedans & SUVs
  "mercedes-e-class": 'Merc "E" Class / BMW 5" / Audi A6',
  "bmw-5-series": 'Merc "E" Class / BMW 5" / Audi A6',
  "audi-a6": 'Merc "E" Class / BMW 5" / Audi A6',
  "audi-q7": "AUDI Q7",
  "toyota-camry": "Camry / Accord / Fortuner latest model",

  // Executive SUVs, MPVs & Sedans
  "toyota-fortuner": "Camry / Accord / Fortuner latest model",
  "fortuner": "Camry / Accord / Fortuner latest model",
  "honda-accord": "Camry / Accord / Fortuner latest model",
  "innova-hycross": "Innova Hycross",
  "innova-crysta": "Innova Crysta",
  "kia-carens": "Innova,Ertiga,Kia Carnes",
  "innova": "Innova,Ertiga,Kia Carnes",
  "maruti-ertiga": "Innova,Ertiga,Kia Carnes",
  "sedan-dzire": "D'zire / Amaze / Indigo / Etios",

  // Group Travel Coaches & Vans
  "toyota-commuter": "Toyato Commuter",
  "traveller": "Tempo Traveller A/C",
  "tempo-traveller": "Tempo Traveller A/C",
  "urbania-12": "Urbania 12+1",
  "urbania-16": "Urbania 16+1",
  "mini-bus-21": "Mini Bus 21 Seater AC",
  "luxury-mini-bus": "Mini Bus 21 Seater AC",
  "mini-bus-25": "Mini Bus 25 Seater AC",
  "bus-32": "32 Seater AC Bus",
  "bus-45": "Bus 45 Seater AC",
  "luxury-large-bus": "Bus 45 Seater AC",
  "bus-49": "Bus 49 Seater AC"
};

export const pricingService = {
  getTariffVariantName(vehicleId) {
    if (!vehicleId) return null;
    return FLEET_TARIFF_MAPPING[vehicleId] || null;
  },

  getLocalTariff(vehicleId) {
    const variantName = this.getTariffVariantName(vehicleId);
    if (variantName) {
      const match = DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant === variantName);
      if (match) return match;
    }
    // Fallback search by ID or partial match
    const vLower = (vehicleId || '').toLowerCase();
    if (vLower.includes('crysta')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('Crysta'));
    if (vLower.includes('hycross')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('Hycross'));
    if (vLower.includes('vellfi')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('Vellfi'));
    if (vLower.includes('s-class') || vLower.includes('7-series') || vLower.includes('a8')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('latest model'));
    if (vLower.includes('e-class') || vLower.includes('5-series') || vLower.includes('a6')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('Merc "E" Class'));
    if (vLower.includes('q7')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant === 'AUDI Q7');
    if (vLower.includes('fortuner') || vLower.includes('camry') || vLower.includes('accord')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('Camry'));
    if (vLower.includes('innova') || vLower.includes('ertiga') || vLower.includes('carens')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('Innova,Ertiga'));
    if (vLower.includes('dzire') || vLower.includes('etios') || vLower.includes('amaze')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes("D'zire"));
    if (vLower.includes('urbania') && vLower.includes('16')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('16+1'));
    if (vLower.includes('urbania')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('12+1'));
    if (vLower.includes('commuter') || vLower.includes('hiace')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('Commuter'));
    if (vLower.includes('traveller')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('Tempo Traveller'));
    if (vLower.includes('21')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('21 Seater'));
    if (vLower.includes('25')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('25 Seater'));
    if (vLower.includes('32')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('32 Seater'));
    if (vLower.includes('49')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('49 Seater'));
    if (vLower.includes('45') || vLower.includes('bus')) return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant.includes('45 Seater'));
    return DEFAULT_DISPOSAL_TARIFFS[0] || null;
  },

  getOutstationTariff(vehicleId) {
    const variantName = this.getTariffVariantName(vehicleId);
    if (variantName) {
      const match = DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant === variantName);
      if (match) return match;
    }
    // Fallback search by ID or partial match
    const vLower = (vehicleId || '').toLowerCase();
    if (vLower.includes('crysta')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('Crysta'));
    if (vLower.includes('hycross')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('Hycross'));
    if (vLower.includes('vellfi')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('Vellfi'));
    if (vLower.includes('s-class') || vLower.includes('7-series') || vLower.includes('a8')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('latest model'));
    if (vLower.includes('e-class') || vLower.includes('5-series') || vLower.includes('a6')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('Merc "E" Class'));
    if (vLower.includes('q7')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant === 'AUDI Q7');
    if (vLower.includes('fortuner') || vLower.includes('camry') || vLower.includes('accord')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('Camry'));
    if (vLower.includes('innova') || vLower.includes('ertiga') || vLower.includes('carens')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('Innova,Ertiga'));
    if (vLower.includes('dzire') || vLower.includes('etios') || vLower.includes('amaze')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes("D'zire"));
    if (vLower.includes('urbania') && vLower.includes('16')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('16+1'));
    if (vLower.includes('urbania')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('12+1'));
    if (vLower.includes('commuter') || vLower.includes('hiace')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('Commuter'));
    if (vLower.includes('traveller')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('Tempo Traveller'));
    if (vLower.includes('21')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('21 Seater'));
    if (vLower.includes('25')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('25 Seater'));
    if (vLower.includes('32')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('32 Seater'));
    if (vLower.includes('49')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('49 Seater'));
    if (vLower.includes('45') || vLower.includes('bus')) return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant.includes('45 Seater'));
    return DEFAULT_OUTSTATION_TARIFFS[0] || null;
  },

  getAirportTransferPrice(vehicleId) {
    const tariff = this.getLocalTariff(vehicleId);
    return tariff ? tariff.airport_transfer : null;
  },

  formatPrice(price) {
    if (price === null || price === undefined) return 'Price on Request';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  },
  
  getDisplayPrice(vehicleId) {
    const tariff = this.getLocalTariff(vehicleId);
    if (!tariff) return 'Price on Request';
    // Display 8hr price by default, or 4hr if available.
    if (tariff.eight_hours_eighty_km) return this.formatPrice(tariff.eight_hours_eighty_km);
    if (tariff.four_hours_forty_km) return this.formatPrice(tariff.four_hours_forty_km);
    return 'Price on Request';
  }
};
