const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const anchorIndex = content.indexOf(`id: 'mercedes-s-class',`);
if (anchorIndex === -1) {
    console.error('Anchor not found');
    process.exit(1);
}

const startIndex = content.lastIndexOf('{[', anchorIndex);
const filterIndex = content.indexOf('.filter(v => showroomFilter === \'all\' || v.categoryKey === showroomFilter)', anchorIndex);

if (startIndex === -1 || filterIndex === -1) {
    console.error('Could not find start or end index');
    process.exit(1);
}

const before = content.substring(0, startIndex);
const after = content.substring(filterIndex);

const replacement = `{fleetData\n                `;

content = before + replacement + after;

// Now do the map replacement!
const mapTarget = `                .map(vehicle => (
                  <div
                    key={vehicle.id}`;

const mapReplacement = `                .map(vehicle => {
                  const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
                  const priceStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : 'Price on Request';
                  return (
                  <div
                    key={vehicle.id}`;

content = content.replace(mapTarget, mapReplacement);

const cardTarget = `                      price={vehicle.price}
                      period={vehicle.period}`;

const cardReplacement = `                      price={priceStr.replace('₹', '')}
                      period="8h / 80km"`;

content = content.replace(cardTarget, cardReplacement);

// Fix closing tags
const mapEndTarget = `                      onExplore={() => onViewVehicleDetail && onViewVehicleDetail(vehicle)}
                    />
                  </div>
                ))}
              </div>`;

const mapEndReplacement = `                      onExplore={() => onViewVehicleDetail && onViewVehicleDetail(vehicle)}
                    />
                  </div>
                );
                })}
              </div>`;

content = content.replace(mapEndTarget, mapEndReplacement);

if (!content.includes('import { pricingService }')) {
    content = `import { pricingService } from '../services/pricingService';\n` + content;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully replaced inline array and injected pricingService');
