const fs = require('fs');
const path = require('path');

// 1. VehicleBookingModal.jsx
const modalPath = path.join(__dirname, 'src', 'components', 'modals', 'VehicleBookingModal.jsx');
let modalContent = fs.readFileSync(modalPath, 'utf8');

if (!modalContent.includes('const priceStr')) {
  modalContent = modalContent.replace(/const \[submitted, setSubmitted\] = useState\(false\);/, `const [submitted, setSubmitted] = useState(false);\n  const localTariff = vehicle ? (pricingService.getLocalTariff(vehicle.id) || {}) : {};\n  const priceStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : 'Price on Request';`);
  fs.writeFileSync(modalPath, modalContent, 'utf8');
  console.log('Fixed VehicleBookingModal');
}

// 2. VehicleDetail.jsx
const detailPath = path.join(__dirname, 'src', 'pages', 'VehicleDetail.jsx');
let detailContent = fs.readFileSync(detailPath, 'utf8');

if (!detailContent.includes('const halfDayStr')) {
  detailContent = detailContent.replace(/const \[activeImage, setActiveImage\] = useState\(galleryImages\[0\]\);/, `const [activeImage, setActiveImage] = useState(galleryImages[0]);\n  const localTariff = vehicle ? (pricingService.getLocalTariff(vehicle.id) || {}) : {};\n  const outstationTariff = vehicle ? (pricingService.getOutstationTariff(vehicle.id) || {}) : {};\n  const halfDayStr = localTariff.four_hours_forty_km ? pricingService.formatPrice(localTariff.four_hours_forty_km) : "Not Available";\n  const fullDayStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : "Not Available";\n  const extraHrKmStr = (localTariff.extra_hour && localTariff.extra_km) ? \`\${pricingService.formatPrice(localTariff.extra_hour)}/hr | \${pricingService.formatPrice(localTariff.extra_km)}/km\` : "N/A";\n  const airportStr = localTariff.airport_transfer ? pricingService.formatPrice(localTariff.airport_transfer) : "N/A";\n  const outstationStr = outstationTariff.rate_per_km ? \`\${pricingService.formatPrice(outstationTariff.rate_per_km)}/km\` : "Price on Request";`);
  fs.writeFileSync(detailPath, detailContent, 'utf8');
  console.log('Fixed VehicleDetail');
}
