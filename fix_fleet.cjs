const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Fleet.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The file has original content up to `  ort React`
// Let's find `  ort React`
const badIdx = content.indexOf('ort React');
if (badIdx > -1) {
  // Good part is from 0 to badIdx
  let goodPart = content.substring(0, badIdx);
  
  // Find where `const filteredFleet` is inside the bad part
  const restIdx = content.indexOf('const filteredFleet', badIdx);
  if (restIdx > -1) {
    let restPart = content.substring(restIdx);
    content = goodPart + restPart;
  }
}

// Ensure imports
if (!content.includes('import { fleetData }')) {
  content = content.replace("import { GlassCard } from '../components/common/GlassCard';", "import { GlassCard } from '../components/common/GlassCard';\nimport { fleetData } from '../data/fleetData';\nimport { pricingService } from '../services/pricingService';");
}

// Apply price replacements
content = content.split("₹{car.price.toLocaleString('en-IN')}").join("{pricingService.getDisplayPrice(car.id).replace('₹', '')}");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Fleet.jsx');
