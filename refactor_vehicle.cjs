const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'VehicleDetail.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import { pricingService }')) {
  content = content.replace("import { GlassCard } from '../components/common/GlassCard';", "import { GlassCard } from '../components/common/GlassCard';\nimport { pricingService } from '../services/pricingService';");
}

const sectionStart = content.indexOf('{/* 4. TRANSPARENT TARIFF MATRIX */}');
const sectionEnd = content.indexOf('{/* 5. DEDICATED CHAUFFEUR PROFILE */}');

if (sectionStart > -1 && sectionEnd > -1) {
  const replacement = `{/* 4. TRANSPARENT TARIFF MATRIX */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Transparent Tariffs"
            badgeIcon={Clock}
            title={\`Complete Tariff Matrix for \${vehicle.name}\`}
            description="Clear transparent pricing with zero peak surges and official GST tax invoices."
            align="center"
          />

          <GlassCard variant="standard" style={{ maxWidth: '800px', margin: '0 auto', padding: '0', overflow: 'hidden' }}>
            {(() => {
              const localTariff = pricingService.getLocalTariff(vehicle.id);
              const outstationTariff = pricingService.getOutstationTariff(vehicle.id);
              return (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', background: '#12151C', color: '#C5A059', padding: '14px 24px', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                    <div>Tariff Package</div>
                    <div>Transparent Rate</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Local Half Day Package</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>4 Hours / 40 Kms included</div>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-charcoal-900)' }}>
                      {localTariff?.four_hours_forty_km ? pricingService.formatPrice(localTariff.four_hours_forty_km) : '4 Hours / 40 KM — Not Available'}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'rgba(197,160,89,0.06)' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Local Full Day Package (Popular)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>8 Hours / 80 Kms included</div>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-charcoal-900)' }}>
                      {localTariff?.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : 'Price on Request'}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Extra Hours / KMs (Local)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>Applied post package limit</div>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-charcoal-900)' }}>
                      {localTariff?.extra_hour && localTariff?.extra_km ? \`\${pricingService.formatPrice(localTariff.extra_hour)}/hr & \${pricingService.formatPrice(localTariff.extra_km)}/km\` : 'Price on Request'}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Night Local Bata</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>Before 06:00 AM and after 10:00 PM</div>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-charcoal-900)' }}>
                      {localTariff?.night_local_bata ? pricingService.formatPrice(localTariff.night_local_bata) : 'Price on Request'}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'rgba(15,23,42,0.02)' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Airport Flat Rate</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>Kempegowda Int. (BLR) Pickup/Drop</div>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-charcoal-900)' }}>
                      {localTariff?.airport_transfer ? pricingService.formatPrice(localTariff.airport_transfer) : 'Price on Request'}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '16px 24px' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Outstation Tariff</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>Min {outstationTariff?.minimum_km_per_day || 300} KM/day, Garage to Garage</div>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-charcoal-900)' }}>
                      {outstationTariff?.rate_per_km ? \`\${pricingService.formatPrice(outstationTariff.rate_per_km)}/km + \${pricingService.formatPrice(outstationTariff.driver_allowance)} DA/day\` : 'Price on Request'}
                    </div>
                  </div>
                </>
              );
            })()}
          </GlassCard>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--color-charcoal-400)' }}>
            * Tolls, state taxes, parking, and GST (5%) are charged separately at actuals. 
            Local Driver Allowance is extra before 06:00 AM and after 10:00 PM.
            Day means Calendar Day with 24-hour format.
            Cheque to be released in favour of Siddhu Car Rentals.
          </div>
        </div>
      </section>

      `;
  content = content.substring(0, sectionStart) + replacement + content.substring(sectionEnd);
}

// Replace the price shown at the top of the detail page
// {vehicle.tariffs?.fullDay || `₹${vehicle.price * 4}/day`} -> {pricingService.getDisplayPrice(vehicle.id)}/day
content = content.replace(/\{vehicle\.tariffs\?\.fullDay \|\| `₹\$\{vehicle\.price \* 4\}\/day`\}/g, "{pricingService.getDisplayPrice(vehicle.id)}/day");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Refactored VehicleDetail.jsx');
