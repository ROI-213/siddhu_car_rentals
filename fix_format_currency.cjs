const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Fleet.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/pricingService\.formatCurrency/g, 'pricingService.formatPrice');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed pricingService.formatCurrency to formatPrice in Fleet.jsx');
