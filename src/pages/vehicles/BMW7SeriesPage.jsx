import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import { PageHero } from '../../components/common/PageHero';
import { GlassCard } from '../../components/common/GlassCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Crown, Star, PhoneCall, MessageSquare, ArrowLeft, Users, Luggage, Fuel, ShieldCheck, CheckCircle2, MapPin, Car } from 'lucide-react';

const vehicle = {
  name: 'BMW 730Ld xDrive',
  tagline: 'Ultra Luxury Flagship Sedan',
  modelYear: '2024–2025 Long Wheelbase Luxury',
  category: 'Ultra Luxury VIP Sedan',
  bestFor: 'VIP Airport Transfers, C-Suite Corporate, Luxury Events',
  heroImage: '/images/bmw_front.jpg',
  shortDescription: 'The BMW 730Ld xDrive (7 Series) delivers long-wheelbase luxury with BMW\'s signature driving dynamics. Spacious rear executive seating, panoramic glass roof, premium build quality, and a professional chauffeur. Perfect for airport VIP transfers, high-level corporate delegations, and special events in Bangalore.',
  features: [
    { icon: Users, label: 'Seating', value: '3–4 Passengers' },
    { icon: Luggage, label: 'Luggage', value: '4 Suitcases' },
    { icon: Fuel, label: 'Fuel', value: 'Diesel' },
    { icon: ShieldCheck, label: 'Transmission', value: 'Automatic' },
  ],
  highlights: [
    'Long wheelbase — extra rear legroom for executive comfort',
    'Panoramic glass roof and ambient lighting with 6 preset themes',
    'Professional chauffeur with verified background and NDA compliance',
    'Live flight tracking for airport VIP arrivals at Kempegowda International',
    'Suitable for local hourly, airport, outstation, and event bookings',
    'Competitive per-km outstation rates with no hidden charges',
  ],
  useCases: [
    { title: 'Airport Executive Transfer', desc: 'Professional chauffeur with name placard at BLR T1/T2. Flight delay monitoring included.' },
    { title: 'Corporate Board Travel', desc: 'Ideal for C-suite executives, board members, and visiting dignitaries across Bangalore tech parks.' },
    { title: 'Luxury Event Transport', desc: 'Corporate annual days, product launches, and high-profile client entertainment events.' },
    { title: 'Outstation Executive Journeys', desc: 'Comfortable long-distance drives to Mysuru, Coorg, Chikmagalur, and Ooty with professional driver.' },
  ],
  whatsappMessage: 'Hello Siddhu Car Rentals, I would like to book a BMW 7-Series with driver in Bangalore. Please share availability and rates.',
};

export const BMW7SeriesPage = ({ onNavigate, onBackToFleet }) => {
  useSEO('bmw-7-series');
  const whatsappHref = `https://wa.me/917625059665?text=${encodeURIComponent(vehicle.whatsappMessage)}`;

  return (
    <div className="vehicle-landing-page">
      <PageHero
        badge="Ultra Luxury VIP Sedan — with Chauffeur"
        badgeIcon={Car}
        title="BMW 730Ld xDrive"
        titleHighlight="7 Series VIP"
        description={vehicle.shortDescription}
        breadcrumbs={['Fleet', 'BMW 7-Series']}
        image={vehicle.heroImage}
      >
        <div className="hero-cta-group">
          <a href={whatsappHref} className="cta-whatsapp-float"><MessageSquare size={18} /> Enquire Now</a>
          <a href="tel:+917625059665" className="cta-phone-float"><PhoneCall size={18} /> +91 76250 59665</a>
          <button onClick={onBackToFleet} className="cta-outline-float"><ArrowLeft size={18} /> All Vehicles</button>
        </div>
      </PageHero>

      <section className="section-padding">
        <div className="container">
          <div className="vlp-specs-grid">
            <GlassCard variant="standard" style={{ padding: '28px' }}>
              <h3 className="text-h3" style={{ marginBottom: '20px' }}>Vehicle Specifications</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {vehicle.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <f.icon size={18} color="#C5A059" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.04em' }}>{f.label}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-charcoal-900)' }}>{f.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px', padding: '14px 16px', background: 'rgba(2,132,199,0.04)', borderRadius: '10px', border: '1px solid rgba(2,132,199,0.12)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-gold-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>Best For</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-700)', lineHeight: '1.5' }}>{vehicle.bestFor}</div>
              </div>
            </GlassCard>

            <div>
              <SectionHeader badge="Why This Vehicle" badgeIcon={Star} title="Key" titleHighlight="Highlights" description="What makes the BMW 7-Series a top choice for chauffeur-driven bookings in Bangalore." align="left" />
              <div style={{ display: 'grid', gap: '12px' }}>
                {vehicle.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.95rem', color: 'var(--color-charcoal-700)', lineHeight: '1.6' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader badge="Popular Booking Types" badgeIcon={MapPin} title="How It's" titleHighlight="Booked" align="center" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {vehicle.useCases.map((uc, i) => (
              <GlassCard key={i} variant="interactive" style={{ padding: '24px' }}>
                <h4 className="text-h3" style={{ fontSize: '0.95rem', marginBottom: '8px' }}>{uc.title}</h4>
                <p className="text-small" style={{ lineHeight: '1.6' }}>{uc.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <GlassCard variant="glowing" style={{ padding: '36px', maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <Crown size={36} color="#C5A059" style={{ margin: '0 auto 16px' }} />
            <h3 className="text-h2" style={{ marginBottom: '8px' }}>Get a Custom Quote</h3>
            <p className="text-body" style={{ marginBottom: '24px' }}>Rates depend on service type, duration, and route. We'll send you an exact quote within minutes.</p>
            <div className="hero-cta-group" style={{ justifyContent: 'center' }}>
              <a href={whatsappHref} className="cta-whatsapp-float"><MessageSquare size={18} /> WhatsApp for Rate</a>
              <a href="tel:+917625059665" className="cta-phone-float"><PhoneCall size={18} /> +91 76250 59665</a>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};
