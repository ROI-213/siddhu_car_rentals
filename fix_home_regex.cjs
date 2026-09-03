const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace .map(vehicle => ( with .map(vehicle => { const ... return (
content = content.replace(/\.map\(vehicle => \(\s*<div\s*key=\{vehicle\.id\}/, `.map(vehicle => {
  const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
  const priceStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km).replace('₹', '').trim() : 'Price on Request';
  return (
<div
  key={vehicle.id}`);

content = content.replace(/price=\{vehicle\.price\}\s*period=\{vehicle\.period\}/, `price={priceStr}\n  period="8h / 80km"`);

content = content.replace(/onViewVehicleDetail\(vehicle\)}\s*\/>\s*<\/div>\s*\)\)\}\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/, `onViewVehicleDetail(vehicle)}\n/>\n</div>\n); })}\n</div>\n</div>\n</div>\n</div>\n</section>`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed using regex!');
