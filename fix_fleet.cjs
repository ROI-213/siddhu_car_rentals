const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Fleet.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The line is: const theme = getTheme(vehicle.categoryKey, vehicle.name);
// We want to insert the variable declarations right after this line.

const injection = `
                  const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
                  const outstationTariff = pricingService.getOutstationTariff(vehicle.id) || {};
                  const halfDayStr = localTariff["4hrs_40km"] ? pricingService.formatCurrency(localTariff["4hrs_40km"]) : "Not Available";
                  const fullDayStr = localTariff["8hrs_80km"] ? pricingService.formatCurrency(localTariff["8hrs_80km"]) : "Not Available";
                  const extraHrKmStr = (localTariff.extra_hr && localTariff.extra_km) ? \`\${pricingService.formatCurrency(localTariff.extra_hr)}/hr | \${pricingService.formatCurrency(localTariff.extra_km)}/km\` : "N/A";
                  const airportStr = localTariff.airport_pickup_drop ? pricingService.formatCurrency(localTariff.airport_pickup_drop) : "N/A";
                  const outstationStr = outstationTariff.rate_per_km ? \`\${pricingService.formatCurrency(outstationTariff.rate_per_km)}/km\` : "Price on Request";
`;

content = content.replace(/const theme = getTheme\(vehicle\.categoryKey, vehicle\.name\);/g, `const theme = getTheme(vehicle.categoryKey, vehicle.name);` + injection);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed fleet pricing injection');
