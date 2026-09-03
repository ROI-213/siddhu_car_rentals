const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize to LF
content = content.replace(/\r\n/g, '\n');

const target1 = `.slice(0, 6)
                  .map(vehicle => (
                  <div
                    key={vehicle.id}
                    style={{ width: "100%", display: "flex", flexDirection: "column" }}
                    className="showroom-card-wrapper"
                  >
                    <VehicleCard
                      name={vehicle.name}
                      category={vehicle.category}
                      image={vehicle.image}
                      price={vehicle.price}
                      period={vehicle.period}`;

const replace1 = `.slice(0, 6)
                  .map(vehicle => {
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
                      period="8h / 80km"`;

const target2 = `onExplore={() => onViewVehicleDetail && onViewVehicleDetail(vehicle)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>`;

const replace2 = `onExplore={() => onViewVehicleDetail && onViewVehicleDetail(vehicle)}
                    />
                  </div>
                ); })}
              </div>
            </div>
          </div>
        </div>
      </section>`;

if (content.includes(target1)) {
    content = content.replace(target1, replace1);
    content = content.replace(target2, replace2);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed Home price strings');
} else {
    console.error('Could not find target1');
}
