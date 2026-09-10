import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import { PageHero } from '../../components/common/PageHero';
import { GlassCard } from '../../components/common/GlassCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Crown, Star, PhoneCall, MessageSquare, ArrowLeft, Users, Luggage, Fuel, ShieldCheck, CheckCircle2, MapPin, Car } from 'lucide-react';

const vehicle = {
  name: 'Mercedes-Benz S-Class S350d',
  tagline: 'VIP Flagship Sedan',
  modelYear: '2024–2025 S350d Executive',
  category: 'Ultra Luxury VIP Sedan',
  bestFor: 'VIP Airport Transfers, Luxury Weddings, C-Suite Corporate',
  heroImage: '/images/sclass_front.png',
  shortDescription: 'The Mercedes-Benz S-Class S350d is the benchmark for executive luxury in Bangalore. Immaculate pearl white finish, air suspension, executive rear seats, and a uniformed English-speaking chauffeur. Ideal for Kempegowda Airport VIP pickups, board-level corporate transfers, and high-end wedding convoys.',
  features: [
    { icon: Users, label: 'Seating', value: '3–4 Passengers' },
    { icon: Luggage, label: 'Luggage', value: '4 Suitcases' },
    { icon: Fuel, label: 'Fuel', value: 'Diesel' },
    { icon: ShieldCheck, label: 'Transmission', value: 'Automatic' },
  ],
  highlights: [
    'Air suspension with adaptive damping for a plush, silent ride on Bengaluru highways',
    'Executive rear seats with heating, ventilation, and massage function',
    '360° camera, parking assist, and advanced driver safety suite',
    'Uniformed English-speaking chauffeur with NDA compliance available',
    'Flight gate monitoring for airport VIP arrivals — chauffeur placed 15 mins early',
    'Available for local hourly, airport transfers, outstation, and event bookings',
  ],
  useCases: [
    { title: 'Airport VIP Pickup / Drop', desc: 'Chauffeur with name placard at Kempegowda T1 or T2. Flight delay tracking included.' },
    { title: 'Corporate Executive Transfer', desc: 'Board meetings, investor meets, and C-suite travel across Manyata, UB City, and Embassy Tech Park.' },
    { title: 'Luxury Wedding Convoy', desc: 'Lead car or matching fleet for wedding processions in Mysuru, Bengaluru, or destination weddings.' },
    { title: 'Outstation in Comfort', desc: 'Bengaluru to Coorg, Mysuru, Chikmagalur, Hampi, and beyond — per-km outstation rates available.' },
  ],
  whatsappMessage: 'Hello Siddhu Car Rentals, I am interested in hiring a Mercedes-Benz S-Class with driver in Bangalore. Please share the rates and availability.',
};

export const MercedesSClassPage = ({ onNavigate, onBackToFleet }) => {
  useSEO('mercedes-s-class');
  const whatsappHref = `https://wa.me/917625059665?text=${encodeURIComponent(vehicle.whatsappMessage)}`;

  return (
    <div className="vehicle-landing-page">
      <PageHero
        badge="Ultra Luxury VIP Sedan — with Chauffeur"
        badgeIcon={Car}
        title="Mercedes-Benz S-Class S350d"
        titleHighlight="VIP Flagship"
        description={vehicle.shortDescription}
        breadcrumbs={['Fleet', 'Mercedes S-Class']}
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
              <SectionHeader badge="Why This Vehicle" badgeIcon={Star} title="Key" titleHighlight="Highlights" description="What makes the Mercedes-Benz S-Class a top choice for chauffeur-driven bookings in Bangalore." align="left" />
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
