import React from 'react';
import { Crown, Award, ShieldCheck, Clock, Users, Star, Car, CheckCircle2, HeartHandshake, Sparkles, Building2, MapPin } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { StatCard } from '../components/cards/StatCard';

export const About = ({ onReserveClick }) => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <PageHero
        badge="Over a Decade of Excellence"
        badgeIcon={Crown}
        title="Pioneering Executive Mobility & Chauffeur"
        titleHighlight="Standards in Bengaluru"
        description="Founded over 10 years ago to bridge the gap between ordinary taxi rentals and international C-suite corporate transportation across Karnataka and South India."
        breadcrumbs={['About Us']}
        image="/images/hero_luxury_sedan.jpg"
      />

      {/* 2. COMPANY STATISTICS BAR */}
      <section style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <StatCard value="10+ Years" label="Chauffeur Experience" sublabel="Established in Bengaluru" icon={Award} />
            <StatCard value="50+ Fleet" label="Luxury Vehicles" sublabel="Mercedes, BMW, Innova" icon={Car} />
            <StatCard value="15,000+" label="Happy Clients" sublabel="VIP & Corporate Travelers" icon={Users} />
            <StatCard value="40+ Cities" label="South India Covered" sublabel="Karnataka, TN, Kerala" icon={MapPin} />
            <StatCard value="25,000+" label="Successful Trips" sublabel="99.8% Punctuality SLA" icon={ShieldCheck} />
          </div>
        </div>
      </section>

      {/* 3. OUR STORY & HISTORY (PREMIUM EDITORIAL LAYOUT) */}
      <section className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ 
            background: 'linear-gradient(145deg, #ffffff, #FDFBF7)', 
            borderRadius: '40px', 
            padding: '48px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(197, 160, 89, 0.15)',
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '64px', 
            alignItems: 'center' 
          }}>
            
            {/* Story Text */}
            <div style={{ paddingRight: '12px' }}>
              <Badge variant="gold" icon={Sparkles} style={{ marginBottom: '24px' }}>Our Heritage</Badge>
              <h2 style={{ 
                fontSize: '2.8rem', 
                fontWeight: '800', 
                lineHeight: '1.2', 
                color: '#1A1A1A', 
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Born in Bengaluru’s<br/>
                <span style={{ color: 'var(--accent-gold-primary)' }}>Silicon Valley Boom.</span>
              </h2>
              
              <div style={{ 
                width: '60px', 
                height: '4px', 
                background: 'var(--accent-gold-primary)', 
                marginBottom: '28px',
                borderRadius: '2px'
              }}></div>

              <p className="text-body" style={{ fontSize: '1.1rem', color: '#4A4A4A', lineHeight: '1.8', marginBottom: '20px' }}>
                Siddhu Car Rentals was established with a clear mandate: to completely redefine executive travel in Bengaluru. As the city expanded into India's technology capital, corporate founders, international board delegates, and high-net-worth individuals required mobility that matched stringent global standards.
              </p>
              
              <p className="text-body" style={{ fontSize: '1.1rem', color: '#4A4A4A', lineHeight: '1.8' }}>
                Starting with a select fleet of executive sedans, we built our undisputed reputation on surgical punctuality, pristine vehicle hygiene, and uniformed, English-speaking chauffeurs trained in executive NDA etiquette.
              </p>
            </div>

            {/* Story Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                top: '-20px', 
                right: '-20px', 
                bottom: '20px', 
                left: '20px', 
                border: '2px solid var(--accent-gold-primary)', 
                borderRadius: '32px',
                zIndex: 0,
                opacity: 0.3
              }}></div>
              <div style={{ 
                position: 'relative',
                zIndex: 1,
                borderRadius: '32px', 
                overflow: 'hidden', 
                boxShadow: '0 24px 48px rgba(0,0,0,0.15)', 
                border: '1px solid rgba(255,255,255,0.4)', 
                height: '450px' 
              }}>
                <img 
                  src="/images/sclass_chauffeur.png" 
                  alt="Premium Mercedes S-Class Chauffeur Service" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.02)' }} 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. OUR MISSION & VISION (ALTERNATING LAYOUT) */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            
            {/* Vision Image */}
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(0,0,0,0.08)', minHeight: '340px', aspectRatio: '4/3' }}>
              <img src="/images/siddhu_white_car_bengaluru_road.jpg" alt="Siddhu Car Rentals fleet on Bengaluru road" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>

            {/* Mission & Vision Text */}
            <div>
              <Badge variant="gold" icon={Crown} style={{ marginBottom: '16px' }}>Mission & Vision</Badge>
              <h2 className="text-h1" style={{ marginBottom: '20px' }}>
                Uncompromising Quality in Every Journey
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <GlassCard variant="standard">
                  <h4 className="text-h4" style={{ color: 'var(--accent-gold-primary)', marginBottom: '6px' }}>🎯 Our Mission</h4>
                  <p className="text-small" style={{ lineHeight: '1.65' }}>
                    To provide dependable, safe, and luxurious chauffeur-driven mobility with transparent tariffs, zero cancellation penalties, and 24/7 dedicated concierge dispatch.
                  </p>
                </GlassCard>

                <GlassCard variant="standard">
                  <h4 className="text-h4" style={{ color: 'var(--accent-gold-primary)', marginBottom: '6px' }}>🌟 Our Vision</h4>
                  <p className="text-small" style={{ lineHeight: '1.65' }}>
                    To be recognized as South India’s premier executive mobility and diplomatic chauffeur service, setting benchmark standards for fleet safety and client satisfaction.
                  </p>
                </GlassCard>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SAFETY & RELIABILITY PROTOCOLS */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Sanitisation & Safety Commitment"
            badgeIcon={ShieldCheck}
            title="Our 5-Point Safety & Quality"
            titleHighlight="Commitment"
            description="How we ensure every passenger experiences complete peace of mind."
            align="center"
          />

          <div className="grid-showcase">
            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                👮‍♂️ Police-Verified Uniformed Drivers
              </div>
              <p className="text-small">Every driver undergoes background verification, medical eye tests, and defensive driving certification.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                🧼 Daily Interior Sanitisation
              </div>
              <p className="text-small">Cabins are deep vacuumed, leather seats conditioned, and surfaces disinfected before every client pickup.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                ⏱️ Punctuality Guarantee
              </div>
              <p className="text-small">Chauffeurs arrive 15 minutes before the scheduled time. Flight arrival tracking avoids delay penalties.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                📡 Live GPS Speed Monitoring
              </div>
              <p className="text-small">Real-time telematics track speed limits and route progress for highway safety across outstation journeys.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                💳 Transparent GST Tariffs
              </div>
              <p className="text-small">Clear itemised billing with zero surge pricing, zero hidden charges, and official corporate GST invoices.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                📞 24/7 Dispatch Desk Support
              </div>
              <p className="text-small">Human concierge assistance available round-the-clock for flight changes, route tweaks, or instant fleet dispatch.</p>
            </GlassCard>
          </div>
        </div>
      </section>

    </div>
  );
};
