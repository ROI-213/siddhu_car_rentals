const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const startStr = `.map(vehicle => (`;

const startIndex = content.lastIndexOf(startStr, content.indexOf(`showroom-card-wrapper`));
const endIndexMatch = content.match(/onViewVehicleDetail\(vehicle\)}\s*\/>\s*<\/div>\s*\)\)\}\s*<\/div>/);
if (!endIndexMatch) {
    console.error('Could not find end match!');
    process.exit(1);
}
const endIndex = endIndexMatch.index + endIndexMatch[0].length;

const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

const newMap = `.map(vehicle => {
                  const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
                  const priceStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km).replace('₹', '').trim() : 'Price on Request';
                  return (
                  <div
                    key={vehicle.id}
                    style={{ width: "100%", display: "flex", flexDirection: "column" }}
                    className="showroom-card-wrapper"
                  >
                    <VehicleCard
                      name={vehicle.name}
                      category={vehicle.category}
                      image={vehicle.image}
                      price={priceStr}
                      period="8h / 80km"
                      passengerCapacity={vehicle.passengerCapacity}
                      luggageCapacity={vehicle.luggageCapacity}
                      transmission={vehicle.transmission}
                      ac={vehicle.ac}
                      rating={vehicle.rating}
                      badgeText={vehicle.badgeText}
                      onReserve={scrollToEnquiry}
                      onExplore={() => onViewVehicleDetail && onViewVehicleDetail(vehicle)}
                    />
                  </div>
                );
                })}
            </div>`;

fs.writeFileSync(filePath, before + newMap + after, 'utf8');
console.log('Fixed Home map perfectly with regex match for end index!');
