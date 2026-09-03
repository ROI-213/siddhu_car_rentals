import React, { useState } from 'react';
import { Crown, Clock, MapPin, Car, ShieldCheck, PhoneCall, MessageSquare, ChevronRight, CheckCircle2, Award, Calendar, Navigation, Building2, ShoppingBag } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { pricingService } from '../services/pricingService';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { EnquiryForm } from '../components/common/EnquiryForm';

export const LocalTransfer = () => {
  const [selectedPackage, setSelectedPackage] = useState('8h');

  const scrollToEnquiry = () => {
    const el = document.getElementById('local-enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <PageHero
        badge="Bengaluru City Chauffeur"
        badgeIcon={Clock}
        title="Executive Local City Rentals & Hourly"
        titleHighlight="Packages"
        description="Punctual, non-smoking chauffeur services for business meetings at UB City, IT park visits, shopping tours, and luxury event mobility within Bengaluru."
        breadcrumbs={['Services', 'Local Transfer']}
        image="/images/services_local_vellfire.jpg"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
          <PremiumButton variant="gold" size="lg" pill icon={ChevronRight} iconPosition="right" onClick={scrollToEnquiry}>
            Book Local Package
          </PremiumButton>
          <a
            href="tel:+9176250 59665"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.95rem 1.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              textDecoration: 'none'
            }}
          >
            <PhoneCall size={18} color="#C5A059" />
            <span>Call Dispatch</span>
          </a>
        </div>
      </PageHero>

      {/* 2. HOURLY PACKAGE SELECTOR */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="Transparent Hourly Rates"
            badgeIcon={Award}
            title="Popular Local Hourly Rental"
            titleHighlight="Packages"
            description="Choose the package duration that fits your schedule. Extra kilometers and extra hours are billed transparently."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            
            {/* Package 1: 4 Hours / 40 KM */}
            <GlassCard variant="interactive" style={{ padding: '32px', textAlign: 'center' }}>
              <Badge variant="glass" style={{ marginBottom: '16px' }}>Half Day</Badge>
              <h3 className="text-h2" style={{ marginBottom: '4px' }}>4 Hours / 40 Kms</h3>
              <p className="text-small" style={{ marginBottom: '20px' }}>Ideal for quick airport runs, business lunches, or executive city appointments.</p>
              
              <div style={{ padding: '16px', background: 'rgba(197,160,89,0.08)', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase' }}>Innova Crysta VIP Rate</div>
                
                {(() => {
                  const t = pricingService.getLocalTariff('innova-crysta');
                  return (
                    <>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-charcoal-900)' }}>
                        {t?.four_hours_forty_km ? pricingService.formatPrice(t.four_hours_forty_km) : 'On Request'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-primary)', fontWeight: '600', marginTop: '2px' }}>
                        Extra: {t?.extra_hour ? pricingService.formatPrice(t.extra_hour) : ''}/hr • {t?.extra_km ? pricingService.formatPrice(t.extra_km) : ''}/km
                      </div>
                    </>
                  );
                })()}

              </div>

              <PremiumButton variant="gold" size="md" fullWidth pill onClick={scrollToEnquiry}>
                Book 4h Package
              </PremiumButton>
            </GlassCard>

            {/* Package 2: 8 Hours / 80 KM (POPULAR) */}
            <GlassCard variant="glowing" style={{ padding: '32px', textAlign: 'center' }}>
              <Badge variant="gold" style={{ marginBottom: '16px' }}>Most Popular (Full Day)</Badge>
              <h3 className="text-h2" style={{ marginBottom: '4px' }}>8 Hours / 80 Kms</h3>
              <p className="text-small" style={{ marginBottom: '20px' }}>Complete full-day mobility for corporate meetings, IT park visits, and shopping.</p>
              
              <div style={{ padding: '16px', background: 'rgba(197,160,89,0.12)', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase' }}>Innova Crysta VIP Rate</div>
                
                {(() => {
                  const t = pricingService.getLocalTariff('innova-crysta');
                  return (
                    <>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-charcoal-900)' }}>
                        {t?.eight_hours_eighty_km ? pricingService.formatPrice(t.eight_hours_eighty_km) : 'On Request'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-primary)', fontWeight: '600', marginTop: '2px' }}>
                        Extra: {t?.extra_hour ? pricingService.formatPrice(t.extra_hour) : ''}/hr • {t?.extra_km ? pricingService.formatPrice(t.extra_km) : ''}/km
                      </div>
                    </>
                  );
                })()}

              </div>

              <PremiumButton variant="gold" size="md" fullWidth pill onClick={scrollToEnquiry}>
                Book 8h Package
              </PremiumButton>
            </GlassCard>

            {/* Package 3: 12 Hours / 120 KM */}
            <GlassCard variant="interactive" style={{ padding: '32px', textAlign: 'center' }}>
              <Badge variant="glass" style={{ marginBottom: '16px' }}>Extended Full Day</Badge>
              <h3 className="text-h2" style={{ marginBottom: '4px' }}>12 Hours / 120 Kms</h3>
              <p className="text-small" style={{ marginBottom: '20px' }}>Extended coverage for long corporate schedules, weddings, or city-wide travel.</p>
              
              <div style={{ padding: '16px', background: 'rgba(197,160,89,0.08)', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase' }}>Innova Crysta VIP Rate</div>
                
                {(() => {
                  const t = pricingService.getLocalTariff('innova-crysta');
                  return (
                    <>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-charcoal-900)' }}>
                        {t?.eight_hours_eighty_km && t?.extra_hour ? pricingService.formatPrice(t.eight_hours_eighty_km + (t.extra_hour * 4)) : 'On Request'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-primary)', fontWeight: '600', marginTop: '2px' }}>
                        Extra: {t?.extra_hour ? pricingService.formatPrice(t.extra_hour) : ''}/hr • {t?.extra_km ? pricingService.formatPrice(t.extra_km) : ''}/km
                      </div>
                    </>
                  );
                })()}

              </div>

              <PremiumButton variant="gold" size="md" fullWidth pill onClick={scrollToEnquiry}>
                Book 12h Package
              </PremiumButton>
            </GlassCard>

          </div>
        </div>
      </section>

      {/* 3. LOCAL SERVICE SCENARIOS */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Versatile City Mobility"
            badgeIcon={Building2}
            title="Local Transfer Services in"
            titleHighlight="Bengaluru"
            description="Providing luxury chauffeur travel across major corporate hubs, tech parks, and luxury hotels."
            align="center"
          />

          <div className="grid-showcase">
            <GlassCard variant="interactive">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Building2 size={24} color="var(--accent-gold-primary)" />
              </div>
              <h3 className="text-h3" style={{ marginBottom: '8px' }}>Tech Park & Corporate Travel</h3>
              <p className="text-small">
                Punctual chauffeurs for Manyata Tech Park, Bagmane Tech Park, Prestige Tech Park, and Electronic City meetings.
              </p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Navigation size={24} color="var(--accent-gold-primary)" />
              </div>
              <h3 className="text-h3" style={{ marginBottom: '8px' }}>Point-to-Point City Drops</h3>
              <p className="text-small">
                Direct single-trip or return drops between luxury hotels (The Leela, Taj West End, Ritz-Carlton) and office towers.
              </p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShoppingBag size={24} color="var(--accent-gold-primary)" />
              </div>
              <h3 className="text-h3" style={{ marginBottom: '8px' }}>Luxury Shopping & Dining</h3>
              <p className="text-small">
                Relaxed chauffeur waiting outside UB City Collection, Phoenix Marketcity, or Indiranagar fine-dining restaurants.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. LOCAL ENQUIRY FORM */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }} id="local-enquiry">
        <div className="container">
          <EnquiryForm title="Book Local Hourly City Chauffeur" subtitle="Instant Hourly Package Tariff Confirmation" />
        </div>
      </section>

    </div>
  );
};
