const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Fleet.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const startIndex = content.indexOf('const fleetData = [');
const endIndex = content.indexOf('  ];\n\n  const filteredFleet', startIndex) + 4;

if (startIndex > -1 && endIndex > -1) {
  content = content.substring(0, startIndex) + content.substring(endIndex);
}

if (!content.includes('import { fleetData }')) {
  content = content.replace("import { GlassCard } from '../components/common/GlassCard';", "import { GlassCard } from '../components/common/GlassCard';\nimport { fleetData } from '../data/fleetData';\nimport { pricingService } from '../services/pricingService';");
}

// Replace the price rendering dynamically
// Use a standard string replace without regex to avoid encoding issues with rupee symbol
content = content.split("₹{car.price.toLocaleString('en-IN')}").join("{pricingService.getDisplayPrice(car.id).replace('₹', '')}");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Refactored Fleet.jsx');
