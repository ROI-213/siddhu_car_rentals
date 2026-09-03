const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Fleet.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const mapTarget = `                      {filteredFleet.map((vehicle, idx) => {
                        const theme = getTheme(vehicle.categoryKey, vehicle.name);
                        return (`;

const newMapStr = `                      {filteredFleet.map((vehicle, idx) => {
                        const theme = getTheme(vehicle.categoryKey, vehicle.name);
                        const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
                        const outstationTariff = pricingService.getOutstationTariff(vehicle.id) || {};
                        
                        const halfDayStr = localTariff["4hrs_40km"] ? pricingService.formatCurrency(localTariff["4hrs_40km"]) : "Not Available";
                        const fullDayStr = localTariff["8hrs_80km"] ? pricingService.formatCurrency(localTariff["8hrs_80km"]) : "Not Available";
                        const extraHrKmStr = (localTariff.extra_hr && localTariff.extra_km) ? \`\${pricingService.formatCurrency(localTariff.extra_hr)}/hr | \${pricingService.formatCurrency(localTariff.extra_km)}/km\` : "N/A";
                        const airportStr = localTariff.airport_pickup_drop ? pricingService.formatCurrency(localTariff.airport_pickup_drop) : "N/A";
                        const outstationStr = outstationTariff.rate_per_km ? \`\${pricingService.formatCurrency(outstationTariff.rate_per_km)}/km (Min \${outstationTariff.minimum_km_per_day}km/day)\` : "Price on Request";

                        return (`;

content = content.replace(mapTarget, newMapStr);

const cardMapTarget = `                {filteredFleet.map((vehicle) => {
                  const theme = getTheme(vehicle.categoryKey, vehicle.name);
                  return (`;

const newCardMapStr = `                {filteredFleet.map((vehicle) => {
                  const theme = getTheme(vehicle.categoryKey, vehicle.name);
                  const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
                  const outstationTariff = pricingService.getOutstationTariff(vehicle.id) || {};
                  
                  const fullDayStr = localTariff["8hrs_80km"] ? pricingService.formatCurrency(localTariff["8hrs_80km"]) : "Not Available";
                  const outstationStr = outstationTariff.rate_per_km ? \`\${pricingService.formatCurrency(outstationTariff.rate_per_km)}/km\` : "Price on Request";

                  return (`;

content = content.replace(cardMapTarget, newCardMapStr);

// Now replace all instances of {vehicle.tariffs.halfDay} -> {halfDayStr}
content = content.replace(/\{vehicle\.tariffs\.halfDay\}/g, "{halfDayStr}");
content = content.replace(/\{vehicle\.tariffs\.fullDay\}/g, "{fullDayStr}");
content = content.replace(/\{vehicle\.tariffs\.extraHrKm\}/g, "{extraHrKmStr}");
content = content.replace(/\{vehicle\.tariffs\.airportFlat\}/g, "{airportStr}");
content = content.replace(/\{vehicle\.tariffs\.outstationRate\}/g, "{outstationStr}");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Refactored Fleet pricing logic');
