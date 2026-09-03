import React, { useState } from 'react';
import {
  Crown, Star, Users, Luggage, Fuel, ShieldCheck, CheckCircle2, ChevronRight,
  PhoneCall, MessageSquare, ArrowLeft, Clock, MapPin, Award, Navigation, Calendar
} from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { pricingService } from '../services/pricingService';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { SectionHeader } from '../components/common/SectionHeader';

export const VehicleDetail = ({ vehicle, onBackToFleet, onSelectForEnquiry }) => {
  if (!vehicle) return null;

  // Image gallery array
  const galleryImages = (vehicle.gallery && vehicle.gallery.length > 0)
    ? vehicle.gallery
    : [
        vehicle.image,
        '/images/fleet/dzire_fleet.jpg',
        '/images/fleet/etios_fleet.jpg',
        '/images/fleet/ertiga_fleet.jpg'
      ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const localTariff = vehicle ? (pricingService.getLocalTariff(vehicle.id) || {}) : {};
  const outstationTariff = vehicle ? (pricingService.getOutstationTariff(vehicle.id) || {}) : {};
  const halfDayStr = localTariff.four_hours_forty_km ? pricingService.formatPrice(localTariff.four_hours_forty_km) : "Not Available";
  const fullDayStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : "Not Available";
  const extraHrKmStr = (localTariff.extra_hour && localTariff.extra_km) ? `${pricingService.formatPrice(localTariff.extra_hour)}/hr | ${pricingService.formatPrice(localTariff.extra_km)}/km` : "N/A";
  const airportStr = localTariff.airport_transfer ? pricingService.formatPrice(localTariff.airport_transfer) : "N/A";
  const outstationStr = outstationTariff.rate_per_km ? `${pricingService.formatPrice(outstationTariff.rate_per_km)}/km` : "Price on Request";

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. VEHICLE SHOWROOM HERO */}
      <section style={{
        position: 'relative',
        paddingTop: '60px',
        paddingBottom: '60px',
        background: 'linear-gradient(180deg, #12151C 0%, #1E232E 100%)',
        color: '#FFFFFF'
      }}>
        <div className="container">
          {/* Back to Fleet Button */}
          <button
            onClick={onBackToFleet}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '8px 16px',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: '600',
              marginBottom: '24px'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Fleet Collection</span>
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <div>
              <Badge variant="dark" icon={Crown} style={{ color: '#C5A059', borderColor: 'rgba(197,160,89,0.4)', marginBottom: '12px' }}>
                {vehicle.category}
              </Badge>
              <h1 className="text-display" style={{ color: '#FFFFFF', margin: 0 }}>
                {vehicle.name} <span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', fontWeight: '400' }}>({vehicle.modelYear || '2025/2026 Fleet Edition'})</span>
              </h1>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Local 8h/80km Package</div>
              <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#C5A059', fontFamily: 'var(--font-ui)' }}>
                {pricingService.getDisplayPrice(vehicle.id)}/day
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTOMOTIVE GALLERY & SPECS MATRIX */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
            
            {/* Left Column: Interactive Image Gallery */}
            <div>
              {/* Main Active Image Display */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '20px',
                overflow: 'hidden',
                marginBottom: '16px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid rgba(0,0,0,0.08)'
              }}>
                <img
                  src={activeImage}
                  alt={vehicle.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'all 0.5s ease' }}
                />
                
              </div>

              {/* Thumbnail Gallery Switcher */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    style={{
                      padding: 0,
                      border: activeImage === img ? '2px solid var(--accent-gold-primary)' : '2px solid transparent',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      aspectRatio: '16/9',
                      cursor: 'pointer',
                      opacity: activeImage === img ? 1 : 0.65,
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Specification Matrix & CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 className="text-h2" style={{ marginBottom: '12px' }}>Vehicle Specifications</h3>
                <p className="text-body" style={{ lineHeight: '1.7', marginBottom: '24px' }}>
                  {vehicle.description}
                </p>

                {/* Specs Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '28px' }}>
                  <div style={{ padding: '16px', background: 'var(--bg-foundation-alt)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase' }}>Seating Capacity</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={18} color="var(--accent-gold-primary)" />
                      <span>{vehicle.passengerCapacity} Executive Seats</span>
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'var(--bg-foundation-alt)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase' }}>Luggage Capacity</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Luggage size={18} color="var(--accent-gold-primary)" />
                      <span>{vehicle.luggageCapacity} Large Suitcases</span>
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'var(--bg-foundation-alt)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase' }}>Transmission</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={18} color="var(--accent-gold-primary)" />
                      <span>{vehicle.transmission || 'Automatic'}</span>
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'var(--bg-foundation-alt)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase' }}>Fuel System</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Fuel size={18} color="var(--accent-gold-primary)" />
                      <span>{vehicle.fuelType || 'Mild Hybrid Diesel'}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Vehicle Reservation CTA */}
                <div style={{ padding: '24px', background: 'rgba(197, 160, 89, 0.08)', borderRadius: '16px', border: '1px solid var(--accent-gold-border)', marginBottom: '24px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)', fontSize: '1.1rem', marginBottom: '6px' }}>
                    Reserve {vehicle.name}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-600)', marginBottom: '16px' }}>
                    Includes uniformed chauffeur, flight tracking, sanitised cabin, bottled water, and zero cancellation fee.
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <PremiumButton
                      variant="gold"
                      size="lg"
                      pill
                      icon={ChevronRight}
                      iconPosition="right"
                      onClick={() => onSelectForEnquiry(vehicle.id)}
                    >
                      Enquire for this Vehicle
                    </PremiumButton>

                    <a
                      href="https://wa.me/9176250 59665"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '0.95rem 1.75rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                        color: '#FFFFFF',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageSquare size={18} />
                      <span>WhatsApp Quote</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SUITABLE FOR APPLICATIONS */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="Versatile Mobility"
            badgeIcon={Award}
            title="Ideal Applications & Suitable"
            titleHighlight="Use Cases"
            description="Curated mobility services for every business & family journey."
            align="center"
          />

          <div className="grid-showcase">
            <GlassCard variant="standard">
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                🏢 Corporate VIP Delegations
              </div>
              <p className="text-small">
                Perfect for hosting visiting C-level executives, board directors, and international investors across Manyata Tech Park, UB City, and Electronic City.
              </p>
            </GlassCard>

            <GlassCard variant="standard">
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                ✈️ Kempegowda Airport VIP Transfers
              </div>
              <p className="text-small">
                Punctual gate-to-door transit with flight arrival tracking, luggage assistance, and express highway toll clearance.
              </p>
            </GlassCard>

            <GlassCard variant="standard">
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                ⛰️ Outstation Highway Journeys
              </div>
              <p className="text-small">
                Spacious, comfortable long-distance travel to Mysuru, Coorg, Chikmagalur, and Ooty with experienced highway drivers.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. TRANSPARENT TARIFF MATRIX */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Transparent Tariffs"
            badgeIcon={Clock}
            title={`Complete Tariff Matrix for ${vehicle.name}`}
            description="Clear transparent pricing with zero peak surges and official GST tax invoices."
            align="center"
          />

          <GlassCard variant="standard" style={{ maxWidth: '800px', margin: '0 auto', padding: '0', overflow: 'hidden' }}>
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
                {halfDayStr}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'rgba(197,160,89,0.06)' }}>
              <div>
                <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Local Full Day Package (Popular)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>8 Hours / 80 Kms included</div>
              </div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--accent-gold-primary)' }}>
                {fullDayStr}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div>
                <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Kempegowda Airport VIP Transfer</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>Flat rate pick or drop</div>
              </div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-charcoal-900)' }}>
                {airportStr}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '16px 24px' }}>
              <div>
                <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Outstation Intercity Travel</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>Per kilometer rate (Min 250km/day)</div>
              </div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-charcoal-900)' }}>
                {outstationStr}
              </div>
            </div>
          </GlassCard>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <PremiumButton
              variant="gold"
              size="lg"
              pill
              icon={ChevronRight}
              iconPosition="right"
              onClick={() => onSelectForEnquiry(vehicle.id)}
            >
              Enquire for this Vehicle Now
            </PremiumButton>
          </div>
        </div>
      </section>

    </div>
  );
};


