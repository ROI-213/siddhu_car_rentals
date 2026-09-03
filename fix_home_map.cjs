const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const mapTarget = `                .map(vehicle => (
                  <div
                    key={vehicle.id}`;

const replacement = `                .map(vehicle => {
                  const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
                  const priceStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : 'Price on Request';
                  return (
                  <div
                    key={vehicle.id}`;

content = content.replace(mapTarget, replacement);

const cardTarget = `                      price={vehicle.price}
                      period={vehicle.period}`;

const cardReplacement = `                      price={priceStr.replace('₹', '')}
                      period="8h / 80km"`;

content = content.replace(cardTarget, cardReplacement);

// We also need to fix the closing parenthesis for `.map(...)` because we changed it to a block `=> { return (...) }`
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

// Make sure pricingService is imported in Home.jsx
if (!content.includes('import { pricingService }')) {
    content = `import { pricingService } from '../services/pricingService';\n` + content;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Home map');
