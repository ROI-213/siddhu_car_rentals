const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'LocalTransfer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import { pricingService }')) {
  content = content.replace("import { GlassCard } from '../components/common/GlassCard';", "import { GlassCard } from '../components/common/GlassCard';\nimport { pricingService } from '../services/pricingService';");
}

const localTariffStr = `
                {(() => {
                  const t = pricingService.getLocalTariff('innova-crysta');
                  return (
                    <>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-charcoal-900)' }}>
                        {t?.four_hours_forty_km ? pricingService.formatPrice(t.four_hours_forty_km) : 'On Request'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-primary)', fontWeight: '600', marginTop: '2px' }}>
                        Extra: {t?.extra_hour ? pricingService.formatPrice(t.extra_hour) : ''}/hr • {t?.extra_km ? pricingService.formatPrice(t.extra_km) : ''}/km
                      </div>
                    </>
                  );
                })()}
`;

const localTariffStr2 = `
                {(() => {
                  const t = pricingService.getLocalTariff('innova-crysta');
                  return (
                    <>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-charcoal-900)' }}>
                        {t?.eight_hours_eighty_km ? pricingService.formatPrice(t.eight_hours_eighty_km) : 'On Request'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-primary)', fontWeight: '600', marginTop: '2px' }}>
                        Extra: {t?.extra_hour ? pricingService.formatPrice(t.extra_hour) : ''}/hr • {t?.extra_km ? pricingService.formatPrice(t.extra_km) : ''}/km
                      </div>
                    </>
                  );
                })()}
`;

const localTariffStr3 = `
                {(() => {
                  const t = pricingService.getLocalTariff('innova-crysta');
                  return (
                    <>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-charcoal-900)' }}>
                        {t?.eight_hours_eighty_km && t?.extra_hour ? pricingService.formatPrice(t.eight_hours_eighty_km + (t.extra_hour * 4)) : 'On Request'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-primary)', fontWeight: '600', marginTop: '2px' }}>
                        Extra: {t?.extra_hour ? pricingService.formatPrice(t.extra_hour) : ''}/hr • {t?.extra_km ? pricingService.formatPrice(t.extra_km) : ''}/km
                      </div>
                    </>
                  );
                })()}
`;

content = content.replace(/<div style=\{\{ fontSize: '1\.75rem', fontWeight: '800', color: 'var\(--color-charcoal-900\)' \}\}>₹4,400<\/div>[\s\S]*?Extra: ₹250\/hr • ₹24\/km<\/div>/g, localTariffStr);

content = content.replace(/<div style=\{\{ fontSize: '1\.75rem', fontWeight: '800', color: 'var\(--color-charcoal-900\)' \}\}>₹8,800<\/div>[\s\S]*?Extra: ₹250\/hr • ₹24\/km<\/div>/g, localTariffStr2);

content = content.replace(/<div style=\{\{ fontSize: '1\.75rem', fontWeight: '800', color: 'var\(--color-charcoal-900\)' \}\}>₹12,500<\/div>[\s\S]*?Extra: ₹250\/hr • ₹24\/km<\/div>/g, localTariffStr3);


fs.writeFileSync(filePath, content, 'utf8');
console.log('Refactored LocalTransfer.jsx');
