const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/const priceStr = localTariff\.eight_hours_eighty_km \? pricingService\.formatPrice\(localTariff\.eight_hours_eighty_km\) : 'Price on Request';/g, `const priceStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : 'Price on Request';\n                  console.log('HOME MAP:', vehicle.id, localTariff, priceStr);`);

fs.writeFileSync(filePath, content, 'utf8');
