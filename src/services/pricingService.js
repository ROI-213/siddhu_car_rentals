
import { DEFAULT_DISPOSAL_TARIFFS, DEFAULT_OUTSTATION_TARIFFS } from './tariffApi.js';

export const FLEET_TARIFF_MAPPING = {
  // Luxury Flagships
  "mercedes-s-class": "Mercedes S-Class (VIP Flagship)",
  "toyota-vellfire": "Toyota Vellfire Executive Lounge",
  "bmw-7-series": "BMW 7-Series 730Ld VIP",
  "audi-a8": "Audi A8L Quattro VIP",

  // Premium Sedans & SUVs
  "mercedes-e-class": "Mercedes-Benz E-Class Executive",
  "bmw-5-series": "BMW 5 Series Luxury Line",
  "audi-a6": "Audi A6 Technology",
  "audi-q7": "AUDI Q7 Quattro SUV",
  "toyota-camry": "Toyota Camry Hybrid",

  // Executive SUVs, MPVs & Sedans
  "toyota-fortuner": "Toyota Fortuner 4x4",
  "fortuner": "Toyota Fortuner 4x4",
  "honda-accord": "Honda Accord Executive",
  "innova-hycross": "Innova Hycross Hybrid",
  "innova-crysta": "Innova Crysta VIP",
  "kia-carens": "Kia Carens Luxury Plus",
  "innova": "Toyota Innova Classic",
  "maruti-ertiga": "Maruti Suzuki Ertiga Hybrid",
  "sedan-dzire": "D'zire / Amaze / Etios",

  // Group Travel Coaches & Vans
  "toyota-commuter": "Toyota HiAce Commuter VIP",
  "traveller": "Tempo Traveller A/C",
  "tempo-traveller": "Tempo Traveller A/C",
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
    return FLEET_TARIFF_MAPPING[vehicleId] || null;
  },

  getLocalTariff(vehicleId) {
    const variantName = this.getTariffVariantName(vehicleId);
    if (!variantName) return null;
    return DEFAULT_DISPOSAL_TARIFFS.find(t => t.vehicle_variant === variantName) || null;
  },

  getOutstationTariff(vehicleId) {
    const variantName = this.getTariffVariantName(vehicleId);
    if (!variantName) return null;
    return DEFAULT_OUTSTATION_TARIFFS.find(t => t.vehicle_variant === variantName) || null;
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
