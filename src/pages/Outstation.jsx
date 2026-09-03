import React from 'react';
import { Crown, MapPin, Calendar, Clock, PhoneCall, MessageSquare, ChevronRight, ShieldCheck, Award, Car, CheckCircle2, Navigation } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { pricingService } from '../services/pricingService';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { EnquiryForm } from '../components/common/EnquiryForm';

export const Outstation = ({ onEnquireClick }) => {
  const scrollToEnquiry = () => {
    const el = document.getElementById('outstation-enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getTheme = (idx) => {
    const themes = [
      { bg: '#F0F9FF', accent: 'var(--accent-sky-primary)', borderLeft: '4px solid var(--accent-sky-primary)' },
      { bg: '#FFF7ED', accent: 'var(--accent-coral-primary)', borderLeft: '4px solid var(--accent-coral-primary)' },
      { bg: '#F0FDF4', accent: 'var(--accent-mint-primary)', borderLeft: '4px solid var(--accent-mint-primary)' },
      { bg: '#F5F3FF', accent: 'var(--accent-indigo-primary)', borderLeft: '4px solid var(--accent-indigo-primary)' },
      { bg: '#FDFBF7', accent: 'var(--accent-gold-primary)', borderLeft: '4px solid var(--accent-gold-primary)' },
      { bg: '#F0FDF4', accent: 'var(--accent-mint-primary)', borderLeft: '4px solid var(--accent-mint-primary)' },
      { bg: '#FDFBF7', accent: 'var(--accent-gold-primary)', borderLeft: '4px solid var(--accent-gold-primary)' },
      { bg: '#F0F9FF', accent: 'var(--accent-sky-primary)', borderLeft: '4px solid var(--accent-sky-primary)' }
    ];
    return themes[idx % themes.length];
  };

  const destinations = [
    { name: 'Mysuru (Mysore)', distance: '140 Kms', time: '3.0 Hours', rate: `${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`, image: '/images/destinations/mysuru.jpg', highlight: 'Royal Palaces & Chamundi Hills' },
    { name: 'Coorg (Madikeri)', distance: '260 Kms', time: '5.5 Hours', rate: `${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`, image: '/images/destinations/coorg.jpg', highlight: 'Coffee Plantations & Waterfalls' },
    { name: 'Chikmagalur', distance: '240 Kms', time: '5.0 Hours', rate: `${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`, image: '/images/destinations/chikmagalur.jpg', highlight: 'Mullayanagiri Peak & Tea Estates' },
    { name: 'Ooty & Nilgiris', distance: '270 Kms', time: '6.0 Hours', rate: `${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`, image: '/images/destinations/ooty.jpg', highlight: 'Pine Forests & Botanical Gardens' },
    { name: 'Hampi Heritage', distance: '340 Kms', time: '6.5 Hours', rate: `${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`, image: '/images/destinations/hampi.jpg', highlight: 'UNESCO Stone Chariots & Ruins' },
    { name: 'Wayanad Rainforest', distance: '280 Kms', time: '6.0 Hours', rate: `${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`, image: '/images/destinations/coorg.jpg', highlight: 'Wild Sanctuaries & Tea Valleys' },
    { name: 'Sakleshpur Hills', distance: '220 Kms', time: '4.5 Hours', rate: `${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`, image: '/images/destinations/chikmagalur.jpg', highlight: 'Star Fort & Spice Plantations' },
    { name: 'Chennai Coastal ECR', distance: '350 Kms', time: '6.5 Hours', rate: `${pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23}/km`, image: '/images/destinations/mysuru.jpg', highlight: 'Interstate Business & Marina Beach' }
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <PageHero
        badge="Intercity Luxury Chauffeur"
        badgeIcon={Navigation}
        title="Comfortable Outstation Travel from"
        titleHighlight="Bengaluru"
        description="Pristine air-conditioned sedans, SUVs, and VIP MPVs for one-way drops, round-trip vacations, and airport-to-outstation journeys across Karnataka, Tamil Nadu, and Kerala."
        breadcrumbs={['Services', 'Outstation Travel']}
        image="/images/hero_luxury_sedan.jpg"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
          <PremiumButton variant="gold" size="lg" pill icon={ChevronRight} iconPosition="right" onClick={scrollToEnquiry}>
            Book Outstation Journey
          </PremiumButton>
          <a
            href="https://wa.me/9176250 59665?text=Hello%20Siddhu%20Car%20Rentals,%20I%20would%20like%20an%20outstation%20quote."
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
            <span>WhatsApp Instant Quote</span>
          </a>
        </div>
      </PageHero>

      {/* 2. TRIP TYPES & MODES */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="Flexible Highway Journeys"
            badgeIcon={Car}
            title="Tailored Outstation Mobility"
            titleHighlight="Services"
            description="Whether traveling solo for business or with extended family on holiday."
            align="center"
          />

          <div className="grid-showcase">
            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                🔀 One-Way Intercity Drops
              </div>
              <p className="text-small">
                Pay only for the distance traveled. Flat one-way rates for Mysuru, Chennai, Hyderabad, and major tier-1 cities.
              </p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                🔄 Round-Trip Vacation Packages
              </div>
              <p className="text-small">
                Chauffeur remains with your family throughout the trip for sightseeing, dining, and local hill station exploration.
              </p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                ✈️ Airport to Outstation Express
              </div>
              <p className="text-small">
                Direct pickup from Kempegowda International Airport terminal to Mysuru, Coorg, or Chikmagalur without entering city traffic.
              </p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                👨‍👩‍👧‍👦 Family & Group Road Trips
              </div>
              <p className="text-small">
                Spacious 7-seater Toyota Innova Crysta VIP and 12-seater Force Urbania vans with captain seats and large luggage boots.
              </p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                🌿 Weekend Hill Station Getaways
              </div>
              <p className="text-small">
                Curated weekend getaways to Ooty, Wayanad, Sakleshpur, and Coorg with drivers experienced in ghat mountain driving.
              </p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                🏛️ Heritage & Temple Convoys
              </div>
              <p className="text-small">
                Comfortable long-distance travel to UNESCO Hampi stone ruins, Belur-Halebid, and Tirupati with zero driver hassle.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 3. POPULAR OUTSTATION DESTINATIONS */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Top Highway Routes"
            badgeIcon={MapPin}
            title="Popular Outstation Destinations from"
            titleHighlight="Bengaluru"
            description="Transparent per-kilometer tariffs with no hidden charges or unexpected toll surcharges."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {destinations.map((dest, idx) => {
              const theme = getTheme(idx);
              return (
                <GlassCard
                  key={idx}
                  variant="interactive"
                  className="outstation-dest-card"
                  style={{
                    background: theme.bg,
                    borderLeft: theme.borderLeft,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    padding: '24px',
                    boxShadow: '0 8px 24px -12px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div className="img-ratio-16-9" style={{ marginBottom: '16px', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
                    <img src={dest.image} alt={dest.name} className="dest-hover-img" style={{ transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 5 }}>
                      <Badge variant="glass">{dest.distance}</Badge>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.accent, fontWeight: '700', marginBottom: '4px' }}>
                    Approx {dest.time} Drive
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', marginTop: '2px', marginBottom: '6px', color: 'var(--color-slate-900)' }}>{dest.name}</h4>
                  <p className="text-small" style={{ marginBottom: '16px', color: 'var(--color-slate-600)', lineHeight: '1.5' }}>{dest.highlight}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-slate-500)', textTransform: 'uppercase', fontWeight: '600' }}>Starting Rate</span>
                      <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-slate-900)' }}>{dest.rate}</div>
                    </div>
                    <PremiumButton variant="glass" size="sm" pill onClick={scrollToEnquiry}>
                      Book Journey
                    </PremiumButton>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <style>{`
            .outstation-dest-card:hover .dest-hover-img {
              transform: scale(1.05);
            }
          `}</style>
        </div>
      </section>

      {/* 4. TRANSPARENT OUTSTATION TARIFF TABLE */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="Per-Km Tariff Guide"
            badgeIcon={Award}
            title="Outstation Fleet Per-Km Tariff"
            titleHighlight="Breakdown"
            description="Daily minimum 250 Kms applies. Night driver allowance included transparently."
            align="center"
          />

          <GlassCard variant="standard" style={{ maxWidth: '840px', margin: '0 auto', padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', background: '#12151C', color: '#C5A059', padding: '14px 20px', fontWeight: '700', fontSize: '0.82rem', textTransform: 'uppercase' }}>
              <div>Vehicle Model & Class</div>
              <div>Per Km Rate</div>
              <div>Driver Night Allowance</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: '0.88rem' }}>
              <div style={{ fontWeight: '700' }}>Toyota Innova Crysta VIP (7-Seater)</div>
              <div style={{ color: 'var(--accent-gold-primary)', fontWeight: '700' }}>{pricingService.getOutstationTariff('innova-crysta')?.rate_per_km || 23} / km</div>
              <div>₹500 / night</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: '0.88rem', background: 'rgba(197,160,89,0.05)' }}>
              <div style={{ fontWeight: '700' }}>BMW 5 Series Executive Sedan</div>
              <div style={{ color: 'var(--accent-gold-primary)', fontWeight: '700' }}>₹75 / km</div>
              <div>₹600 / night</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: '0.88rem' }}>
              <div style={{ fontWeight: '700' }}>Toyota Fortuner Legender 4x4 SUV</div>
              <div style={{ color: 'var(--accent-gold-primary)', fontWeight: '700' }}>₹80 / km</div>
              <div>₹600 / night</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: '0.88rem', background: 'rgba(197,160,89,0.05)' }}>
              <div style={{ fontWeight: '700' }}>Mercedes-Benz S-Class VIP</div>
              <div style={{ color: 'var(--accent-gold-primary)', fontWeight: '700' }}>₹120 / km</div>
              <div>₹800 / night</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '16px 20px', fontSize: '0.88rem' }}>
              <div style={{ fontWeight: '700' }}>Force Urbania VIP 12-Seater Van</div>
              <div style={{ color: 'var(--accent-gold-primary)', fontWeight: '700' }}>₹45 / km</div>
              <div>₹600 / night</div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 5. ENQUIRY FORM SECTION */}
      <section className="section-padding" id="outstation-enquiry">
        <div className="container">
          <EnquiryForm title="Book Outstation Highway Journey" subtitle="Instant Per-Km Rate Quote & Driver Confirmation" />
        </div>
      </section>

    </div>
  );
};
