const fs = require('fs');
const path = require('path');

const extractText = fs.readFileSync('fleet_extract.txt', 'utf8');
const code = extractText + '\nmodule.exports = fleetData;';
fs.writeFileSync('temp_fleet_eval.cjs', code);

const rawFleetData = require('./temp_fleet_eval.cjs');

// Clean up fleet data
const cleanFleetData = rawFleetData.map(car => {
  const { price, tariffs, ...rest } = car;
  return rest;
});

const fleetDataJs = `export const fleetData = ${JSON.stringify(cleanFleetData, null, 2)};\n`;

fs.mkdirSync(path.join(__dirname, 'src', 'data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'fleetData.js'), fleetDataJs);

console.log('Created src/data/fleetData.js');

const TARIFF_MAPPING = {
  'mercedes-s-class': 'Merc "S" Class / BMW 7" / Audi A8 latest model',
  'bmw-7-series': 'Merc "S" Class / BMW 7" / Audi A8 latest model',
  'mercedes-e-class': 'Merc "E" Class / BMW 5" / Audi A6',
  'vellfire': 'Toyota Vellfire Executive Lounge',
  'toyota-vellfire': 'Toyota Vellfire Executive Lounge',
  'innova-hycross': 'Innova Hycross',
  'innova-crysta': 'Innova Crysta',
  'kia-carens': 'Innova,Ertiga,Kia Carnes',
  'sedan-dzire': "D'zire / Amaze / Indigo / Etios",
  'tempo-traveller': 'Tempo Traveller A/C',
  'traveller': 'Tempo Traveller A/C',
  'urbania': 'Urbania 16+1',
  'audi-q7': 'AUDI Q7',
  'honda-accord': 'Camry / Accord / Fortuner latest model',
  'toyota-commuter': 'Toyota Commuter VIP Lounge',
  'luxury-mini-bus': 'Mini Bus 21 Seater AC',
  'luxury-large-bus': 'Bus 45 Seater AC'
};

rawFleetData.forEach(car => {
    if(!TARIFF_MAPPING[car.id]) {
        console.log('Missing mapping for: ', car.id);
    }
});

const pricingServiceJs = `
import { DEFAULT_DISPOSAL_TARIFFS, DEFAULT_OUTSTATION_TARIFFS } from './tariffApi';

export const FLEET_TARIFF_MAPPING = ${JSON.stringify(TARIFF_MAPPING, null, 2)};

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
`;

fs.writeFileSync(path.join(__dirname, 'src', 'services', 'pricingService.js'), pricingServiceJs);
console.log('Created src/services/pricingService.js');
