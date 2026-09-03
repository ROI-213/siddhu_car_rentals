const fs = require('fs');
const path = require('path');

const { fleetData } = require('./src/data/fleetData.js');

const filePath = path.join(__dirname, 'src', 'services', 'pricingService.js');
let content = fs.readFileSync(filePath, 'utf8');

const { tariffApi } = require('./src/services/tariffApi.js');

const mappingRegex = /export const FLEET_TARIFF_MAPPING = \{([^}]+)\}/;
const match = content.match(mappingRegex);
if (!match) {
    console.error('Mapping not found');
    process.exit(1);
}

let mapping = {};
eval(`mapping = {${match[1]}}`);

// We must also extract DEFAULT_DISPOSAL_TARIFFS from tariffApi.js manually if it's an ES module, but we can just use Regex or something
const tariffApiContent = fs.readFileSync(path.join(__dirname, 'src', 'services', 'tariffApi.js'), 'utf8');
const disposalMatch = tariffApiContent.match(/export const DEFAULT_DISPOSAL_TARIFFS = (\[[\s\S]*?\]);/);
let disposalTariffs = [];
eval(`disposalTariffs = ${disposalMatch[1]}`);

fleetData.forEach(vehicle => {
    const variantName = mapping[vehicle.id];
    if (!variantName) {
        console.log(`ERROR: No mapping for vehicle ID: ${vehicle.id} (${vehicle.name})`);
    } else {
        const tariff = disposalTariffs.find(t => t.vehicle_variant === variantName);
        if (!tariff) {
            console.log(`ERROR: Mapping "${variantName}" not found in DEFAULT_DISPOSAL_TARIFFS for vehicle ${vehicle.id}`);
        } else {
            console.log(`OK: ${vehicle.id} -> ${variantName} (8hrs: ${tariff.eight_hours_eighty_km})`);
        }
    }
});

