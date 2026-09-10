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
        badge="25+ Years of Dedicated Service"
        badgeIcon={Crown}
        title="Pioneering Executive Mobility & Chauffeur"
        titleHighlight="Standards in Bengaluru"
        description="Founded over two decades ago to bridge the gap between ordinary taxi rentals and international C-suite corporate transportation across Karnataka and South India."
        breadcrumbs={['About Us']}
        image="/images/hero_luxury_sedan.jpg"
      />

      {/* 2. COMPANY STATISTICS BAR */}
      <section style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <StatCard value="25+ Years" label="Chauffeur Legacy" sublabel="Established in Bengaluru" icon={Award} />
            <StatCard value="50+ Fleet" label="Luxury Vehicles" sublabel="Mercedes, BMW, Innova" icon={Car} />
            <StatCard value="15,000+" label="Happy Clients" sublabel="VIP & Corporate Travelers" icon={Users} />
            <StatCard value="40+ Cities" label="South India Covered" sublabel="Karnataka, TN, Kerala" icon={MapPin} />
            <StatCard value="25,000+" label="Successful Trips" sublabel="99.8% Punctuality SLA" icon={ShieldCheck} />
          </div>
        </div>
      </section>

      {/* 3. THE MAN BEHIND THE WHEEL - S.M. PATIL (PHOTO FIRST) */}
      <section className="section-padding" style={{ position: 'relative', background: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(145deg, #FFFFFF, #FAF7F2)',
            borderRadius: '36px',
            padding: '48px 40px',
            boxShadow: '0 20px 45px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(197, 160, 89, 0.18)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '52px',
            alignItems: 'center'
          }}>
            
            {/* FIRST: Founder Photo */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '-14px',
                right: '14px',
                bottom: '14px',
                borderRadius: '30px',
                border: '2px solid var(--accent-gold-primary)',
                opacity: 0.35,
                zIndex: 0,
                pointerEvents: 'none'
              }} />

              <div style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '26px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}>
                <img
                  src="/images/sm_patil_founder.jpg"
                  alt="S.M. Patil - The Man Behind The Wheel"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '580px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '12px 18px',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: '800' }}>
                      S.M. Patil
                    </div>
                    <div style={{ color: 'var(--accent-gold-primary)', fontSize: '0.78rem', fontWeight: '600' }}>
                      Founder, Siddhu Car Rentals
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(197, 160, 89, 0.15)',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    color: '#F1F5F9',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    whiteSpace: 'nowrap'
                  }}>
                    25+ Yrs Legacy
                  </div>
                </div>
              </div>
            </div>

            {/* THEN: THE MAN BEHIND THE WHEEL */}
            <div>
              <Badge variant="gold" icon={Crown} style={{ marginBottom: '20px' }}>
                Founder & Visionary
              </Badge>

              <h2 style={{
                fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                fontWeight: '900',
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
                lineHeight: '1.15',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>
                THE MAN BEHIND <span style={{ color: 'var(--accent-gold-primary)' }}>THE WHEEL</span>
              </h2>

              <div style={{
                width: '60px',
                height: '4px',
                background: 'var(--accent-gold-primary)',
                marginBottom: '24px',
                borderRadius: '2px'
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#4A4A4A', fontSize: '1.05rem', lineHeight: '1.8' }}>
                <p>
                  Every great transportation business starts the same way, with one person willing to show up, on time, no matter what. For Siddhu Car Rentals, that person was S.M. Patil.
                </p>

                <p>
                  Over two decades ago, S.M. Patil started this journey with nothing but a single car and an unshakeable belief: &ldquo;If you take care of people the way you'd want to be taken care of, the rest follows&rdquo;. There was no fleet, no office, no brand name yet, just one man, one car, and a simple promise that every ride would be on time, every single time.
                </p>

                <p>
                  That promise became the foundation of everything Siddhu Car Rentals is today. Over the years, one car grew into a full fleet — from dependable sedans to premium Mercedes-Benz, BMW, and Audi vehicles. But the values behind the wheel never changed. Punctuality wasn't a policy. It was personal.
                </p>

                <div style={{
                  margin: '8px 0',
                  padding: '20px 24px',
                  background: 'rgba(197, 160, 89, 0.08)',
                  borderLeft: '4px solid var(--accent-gold-primary)',
                  borderRadius: '0 14px 14px 0'
                }}>
                  <p style={{
                    fontSize: '1.08rem',
                    fontStyle: 'italic',
                    fontWeight: '600',
                    color: '#1E293B',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    &ldquo;People don't remember the car. They remember how you made them feel. That's what I learned in twenty five years behind this business and it's what I still tell every driver who works with us&rdquo;.
                  </p>
                </div>

                <p>
                  What sets Siddhu Car Rentals apart, even now, is something you won't find written into any company handbook: S.M. Patil still personally knows most of his regular clients by name. Not because a system tells him to, but because that's simply who he is. To him, a client isn't a booking number. They're someone he's built trust with, ride after ride, year after year.
                </p>

                <p>
                  That's the difference between a rental service and a relationship. When you choose Siddhu Car Rentals, you're not just hiring a car and a driver, you're stepping into a legacy built on two decades of reliability, care, and the kind of personal attention that turns first-time riders into family.
                </p>
              </div>

              <div style={{
                marginTop: '28px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                borderTop: '1px solid rgba(197, 160, 89, 0.2)',
                paddingTop: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--accent-gold-primary)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1E293B' }}>1st Car to Full Fleet</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--accent-gold-primary)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1E293B' }}>Clients Known by Name</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--accent-gold-primary)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1E293B' }}>Punctuality is Personal</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY & HISTORY (PREMIUM EDITORIAL LAYOUT) */}
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
