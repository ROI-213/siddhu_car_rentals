const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Outstation.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import { pricingService }')) {
  content = content.replace("import { GlassCard } from '../components/common/GlassCard';", "import { GlassCard } from '../components/common/GlassCard';\nimport { pricingService } from '../services/pricingService';");
}

// Replace all '?24' or '₹24' with dynamic
content = content.replace(/['"]\?24\/km['"]/g, "`${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`");
content = content.replace(/['"]₹24\/km['"]/g, "`${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`");

// 237:              <div style={{ color: 'var(--accent-gold-primary)', fontWeight: '700' }}>?24 / km</div>
content = content.replace(/>\?24 \/ km</g, ">{pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23} / km<");
content = content.replace(/>₹24 \/ km</g, ">{pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23} / km<");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Refactored Outstation.jsx');
