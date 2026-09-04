
import { DEFAULT_DISPOSAL_TARIFFS, DEFAULT_OUTSTATION_TARIFFS } from './tariffApi';

export const FLEET_TARIFF_MAPPING = {
  "mercedes-s-class": "Merc \"S\" Class / BMW 7\" / Audi A8 latest model",
  "bmw-7-series": "Merc \"S\" Class / BMW 7\" / Audi A8 latest model",
  "audi-a8": "Merc \"S\" Class / BMW 7\" / Audi A8 latest model",
  "mercedes-e-class": "Merc \"E\" Class / BMW 5\" / Audi A6",
  "bmw-5-series": "Merc \"E\" Class / BMW 5\" / Audi A6",
  "audi-a6": "Merc \"E\" Class / BMW 5\" / Audi A6",
  "vellfire": "Toyota Vellfie",
  "toyota-vellfire": "Toyota Vellfie",
  "innova-hycross": "Innova Hycross",
  "innova-crysta": "Innova Crysta",
  "innova": "Innova,Ertiga,Kia Carnes",
  "maruti-ertiga": "Innova,Ertiga,Kia Carnes",
  "kia-carens": "Innova,Ertiga,Kia Carnes",
  "toyota-camry": "Camry / Accord / Fortuner latest model",
  "sedan-dzire": "D'zire / Amaze / Indigo / Etios",
  "tempo-traveller": "Tempo Traveller A/C",
  "traveller": "Tempo Traveller A/C",
  "urbania": "Urbania 16+1",
  "audi-q7": "AUDI Q7",
  "toyota-fortuner": "Camry / Accord / Fortuner latest model",
  "fortuner": "Camry / Accord / Fortuner latest model",
  "honda-accord": "Camry / Accord / Fortuner latest model",
  "toyota-commuter": "Toyato Commuter",
  "luxury-mini-bus": "Mini Bus 21 Seater AC",
  "luxury-large-bus": "Bus 45 Seater AC"
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
