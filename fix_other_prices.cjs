const fs = require('fs');
const path = require('path');

// 1. VehicleBookingModal.jsx
let modalPath = path.join(__dirname, 'src', 'components', 'modals', 'VehicleBookingModal.jsx');
let modalContent = fs.readFileSync(modalPath, 'utf8');

// Replace {vehicle.price} with centralized price
// We'll inject pricingService inside VehicleBookingModal
if (!modalContent.includes('pricingService')) {
    modalContent = `import { pricingService } from '../../services/pricingService';\n` + modalContent;
}

modalContent = modalContent.replace(/\{vehicle\.price\}/g, '{priceStr.replace("₹", "")}');
modalContent = modalContent.replace(/\{vehicle\.price \* 4 \|\| '8,800'\}/g, '{priceStr}');

// We need to define priceStr inside VehicleBookingModal component!
modalContent = modalContent.replace(/const \[activeTab, setActiveTab\] = useState\('journey'\);/g, `const [activeTab, setActiveTab] = useState('journey');
  const localTariff = vehicle ? (pricingService.getLocalTariff(vehicle.id) || {}) : {};
  const priceStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : 'Price on Request';`);

fs.writeFileSync(modalPath, modalContent, 'utf8');


// 2. VehicleDetail.jsx
let detailPath = path.join(__dirname, 'src', 'pages', 'VehicleDetail.jsx');
let detailContent = fs.readFileSync(detailPath, 'utf8');

if (!detailContent.includes('pricingService')) {
    detailContent = `import { pricingService } from '../services/pricingService';\n` + detailContent;
}

detailContent = detailContent.replace(/const \{ id \} = useParams\(\);/g, `const { id } = useParams();
  const localTariff = vehicle ? (pricingService.getLocalTariff(vehicle.id) || {}) : {};
  const outstationTariff = vehicle ? (pricingService.getOutstationTariff(vehicle.id) || {}) : {};
  const halfDayStr = localTariff.four_hours_forty_km ? pricingService.formatPrice(localTariff.four_hours_forty_km) : "Not Available";
  const fullDayStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : "Not Available";
  const extraHrKmStr = (localTariff.extra_hour && localTariff.extra_km) ? \`\${pricingService.formatPrice(localTariff.extra_hour)}/hr | \${pricingService.formatPrice(localTariff.extra_km)}/km\` : "N/A";
  const airportStr = localTariff.airport_transfer ? pricingService.formatPrice(localTariff.airport_transfer) : "N/A";
  const outstationStr = outstationTariff.rate_per_km ? \`\${pricingService.formatPrice(outstationTariff.rate_per_km)}/km\` : "Price on Request";`);

detailContent = detailContent.replace(/\{vehicle\.tariffs\?\.halfDay \|\| `₹\$\{vehicle\.price \* 2\}`\}/g, '{halfDayStr}');
detailContent = detailContent.replace(/\{vehicle\.tariffs\?\.fullDay \|\| `₹\$\{vehicle\.price \* 4\}`\}/g, '{fullDayStr}');
detailContent = detailContent.replace(/\{vehicle\.tariffs\?\.airportFlat \|\| '₹3,800'\}/g, '{airportStr}');
detailContent = detailContent.replace(/\{vehicle\.tariffs\?\.outstationRate \|\| '₹24\/km'\}/g, '{outstationStr}');

fs.writeFileSync(detailPath, detailContent, 'utf8');

console.log('Fixed other prices');
