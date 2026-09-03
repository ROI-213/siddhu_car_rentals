const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The array starts at `          {[` and ends at `          ].map((car, idx) => (`
const startIndex = content.indexOf('          {[');
const endIndex = content.indexOf('          ].map((car, idx) => (', startIndex);

if (startIndex > -1 && endIndex > -1) {
  content = content.substring(0, startIndex) + '          fleetData.map((car, idx) => (' + content.substring(endIndex + 31);
}

if (!content.includes('import { fleetData }')) {
  content = content.replace("import { GlassCard } from '../components/common/GlassCard';", "import { GlassCard } from '../components/common/GlassCard';\nimport { fleetData } from '../data/fleetData';\nimport { pricingService } from '../services/pricingService';");
}

// Replace hardcoded `car.price` references
content = content.split("₹{car.price.toLocaleString('en-IN')}").join("{pricingService.getDisplayPrice(car.id).replace('₹', '')}");

// Wait, the index was `          ].map((car, idx) => (`. My substring extraction replaced it with `fleetData.map((car, idx) => (`.
fs.writeFileSync(filePath, content, 'utf8');
console.log('Refactored Home.jsx');
