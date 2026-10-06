import React, { useState } from 'react';
import { Crown, Clock, MapPin, Car, ShieldCheck, PhoneCall, MessageSquare, ChevronRight, CheckCircle2, Award, Calendar, Navigation, Building2, ShoppingBag } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { EnquiryForm } from '../components/common/EnquiryForm';
import { useSiteContent } from '../hooks/useSiteContent';
import { DEFAULT_LOCAL_CONTENT } from '../data/defaultSiteContent';

export const LocalTransfer = () => {
  const { content } = useSiteContent();
  const local = content?.local || DEFAULT_LOCAL_CONTENT;
  const hero = local.hero || DEFAULT_LOCAL_CONTENT.hero;
  const packagesHeader = local.packagesHeader || DEFAULT_LOCAL_CONTENT.packagesHeader;
  const packages = Array.isArray(local.packages) && local.packages.length > 0 ? local.packages : DEFAULT_LOCAL_CONTENT.packages;
  const scenariosHeader = local.scenariosHeader || DEFAULT_LOCAL_CONTENT.scenariosHeader;
  const scenarios = Array.isArray(local.scenarios) && local.scenarios.length > 0 ? local.scenarios : DEFAULT_LOCAL_CONTENT.scenarios;

  const scrollToEnquiry = () => {
    const el = document.getElementById('local-enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <PageHero
        badge={hero.badge || "Hourly Car Rental with Driver"}
        badgeIcon={Clock}
        title={hero.title || "Local City Transfers & Hourly"}
        titleHighlight={hero.titleHighlight || "Rental Packages"}
        description={hero.description || "Chauffeur-driven cars for business meetings, IT park visits, shopping, airport transfers, and events across Bengaluru. Fixed packages, no surge pricing."}
        breadcrumbs={['Services', 'Local Transfer']}
        image={hero.image || "/images/services_local_vellfire.jpg"}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
          <PremiumButton variant="gold" size="lg" pill icon={ChevronRight} iconPosition="right" onClick={scrollToEnquiry}>
            Book Local Package
          </PremiumButton>
          <a
            href="tel:+917625059665"
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
            badge={packagesHeader.badge || "Transparent Hourly Rates"}
            badgeIcon={Award}
            title={packagesHeader.title || "Popular Local Hourly Rental"}
            titleHighlight={packagesHeader.titleHighlight || "Packages"}
            description={packagesHeader.description || "Choose the package duration that fits your schedule. Extra kilometers and extra hours are billed transparently."}
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {packages.map((pkg, idx) => {
              const isGlowing = pkg.badge?.toLowerCase().includes('popular') || idx === 1;
              return (
                <GlassCard 
                  key={pkg.id || idx} 
                  variant={isGlowing ? "glowing" : "interactive"} 
                  style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <Badge variant={isGlowing ? "gold" : "glass"} style={{ marginBottom: '16px' }}>
                      {pkg.badge || 'Package'}
                    </Badge>
                    <h3 className="text-h2" style={{ marginBottom: '4px' }}>
                      {pkg.name}
                    </h3>
                    <p className="text-small" style={{ marginBottom: '20px', minHeight: '44px' }}>
                      {pkg.desc}
                    </p>
                    
                    <div style={{ padding: '16px', background: isGlowing ? 'rgba(197,160,89,0.12)' : 'rgba(197,160,89,0.08)', borderRadius: '12px', marginBottom: '24px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase' }}>
                        {pkg.vehicleName || 'Innova Crysta VIP Rate'}
                      </div>
                      
                      <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--color-charcoal-900)', margin: '4px 0' }}>
                        {pkg.basePrice}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-primary)', fontWeight: '600' }}>
                        Extra: {pkg.extraHourRate} • {pkg.extraKmRate}
                      </div>
                    </div>
                  </div>

                  <PremiumButton variant="gold" size="md" fullWidth pill onClick={scrollToEnquiry}>
                    Book {pkg.name.split('/')[0].trim() || 'Package'}
                  </PremiumButton>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LOCAL SERVICE SCENARIOS */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge={scenariosHeader.badge || "Versatile City Mobility"}
            badgeIcon={Building2}
            title={scenariosHeader.title || "Local Transfer Services in"}
            titleHighlight={scenariosHeader.titleHighlight || "Bengaluru"}
            description={scenariosHeader.description || "Providing luxury chauffeur travel across major corporate hubs, tech parks, and luxury hotels."}
            align="center"
          />

          <div className="grid-showcase">
            {scenarios.map((scn, idx) => (
              <GlassCard key={scn.id || idx} variant="interactive">
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'rgba(197,160,89,0.12)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '16px',
                  fontSize: '1.4rem'
                }}>
                  {scn.icon || '🏢'}
                </div>
                <h3 className="text-h3" style={{ marginBottom: '8px' }}>
                  {scn.title}
                </h3>
                <p className="text-small">
                  {scn.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LOCAL ENQUIRY FORM */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }} id="local-enquiry">
        <div className="container">
          <EnquiryForm 
            title="Book Local Hourly City Chauffeur" 
            subtitle="Instant Hourly Package Tariff Confirmation" 
            fixedTripType="local" 
          />
        </div>
      </section>

    </div>
  );
};

