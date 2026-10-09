import React, { useState, useEffect } from 'react';
import { Crown, MapPin, Calendar, Clock, PhoneCall, MessageSquare, ChevronRight, ShieldCheck, Award, Car, CheckCircle2, Navigation } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { pricingService } from '../services/pricingService';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { EnquiryForm } from '../components/common/EnquiryForm';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { WhatsAppBookingModal } from '../components/modals/WhatsAppBookingModal';
import { TariffEnquiryModal } from '../components/modals/TariffEnquiryModal';
import { tariffApi, formatCurrency, DEFAULT_OUTSTATION_TARIFFS } from '../services/tariffApi';
import { useSiteContent } from '../hooks/useSiteContent';
import { DEFAULT_OUTSTATION_CONTENT } from '../data/defaultSiteContent';

export const Outstation = ({ onEnquireClick }) => {
  const { content } = useSiteContent();
  const outstation = content?.outstation || DEFAULT_OUTSTATION_CONTENT;
  const hero = outstation.hero || DEFAULT_OUTSTATION_CONTENT.hero;
  const destinations = Array.isArray(outstation.destinations) ? outstation.destinations : DEFAULT_OUTSTATION_CONTENT.destinations;
  const options = Array.isArray(outstation.options) ? outstation.options : DEFAULT_OUTSTATION_CONTENT.options;
  const terms = outstation.terms || DEFAULT_OUTSTATION_CONTENT.terms;

  const [tariffs, setTariffs] = useState(() => tariffApi.getLocalTariffs({ usage_type: 'outstation' }));
  const [selectedRouteModal, setSelectedRouteModal] = useState(null);
  const [selectedTariffForModal, setSelectedTariffForModal] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  useEffect(() => {
    const loadOutstationTariffs = async () => {
      try {
        const data = await tariffApi.getTariffs({ usage_type: 'outstation', all: false });
        if (Array.isArray(data) && data.length > 0) {
          setTariffs(data);
        }
      } catch (err) {
        console.warn('Could not fetch dynamic outstation tariffs:', err);
      }
    };

    loadOutstationTariffs();

    const handleUpdate = () => loadOutstationTariffs();
    window.addEventListener('scr_tariffs_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('scr_tariffs_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleOpenTariffEnquiry = (tariffItem) => {
    setSelectedTariffForModal(tariffItem);
    setIsEnquiryModalOpen(true);
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('outstation-enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectRoute = (dest) => {
    setSelectedRouteModal(dest);
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

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <PageHero
        badge={hero.badge || "Intercity Luxury Chauffeur"}
        badgeIcon={Navigation}
        title={hero.title || "Outstation Travel from"}
        titleHighlight={hero.titleHighlight || "Bengaluru"}
        description={hero.description || "AC sedans, SUVs, and MPVs with driver for one-way drops, round trips, and multi-city trips across Karnataka, Tamil Nadu, and Kerala. Per-km rates, no hidden charges."}
        breadcrumbs={['Services', 'Outstation Travel']}
        image={hero.image || "/images/hero_luxury_sedan.jpg"}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
          <PremiumButton variant="gold" size="lg" pill icon={ChevronRight} iconPosition="right" onClick={scrollToEnquiry}>
            Book Outstation Journey
          </PremiumButton>
          <WhatsAppButton
            message="Hello Siddhu Car Rentals, I would like an outstation quote."
            style={{
              padding: '0.95rem 1.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(37,211,102,0.35)',
            }}
          >
            <MessageSquare size={18} />
            <span>WhatsApp Instant Quote</span>
          </WhatsAppButton>
        </div>
      </PageHero>

      {/* 2. POPULAR OUTSTATION DESTINATIONS */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
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
                  <div
                    className="img-ratio-16-9"
                    style={{ marginBottom: '16px', borderRadius: '14px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                    onClick={() => handleSelectRoute(dest)}
                    title={`Click to get route quote for ${dest.name}`}
                  >
                    <img src={dest.image} alt={dest.alt || `${dest.name} - Luxury Chauffeur Trip`} className="dest-hover-img" style={{ transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
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
                    <PremiumButton variant="glass" size="sm" pill onClick={() => handleSelectRoute(dest)}>
                      Get Quote
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

      {/* 3. ENQUIRY FORM SECTION */}
      <section className="section-padding" id="outstation-enquiry" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <EnquiryForm 
            title="Book Outstation Highway Journey" 
            subtitle="Instant Per-Km Rate Quote & Driver Confirmation" 
            fixedTripType="outstation" 
          />
        </div>
      </section>

      {/* 4. TRIP TYPES & MODES - CONTINUOUS SLIDING MARQUEE */}
      <section className="section-padding" style={{ background: '#FFFFFF', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '32px' }}>
          <SectionHeader
            badge="Flexible Highway Journeys"
            badgeIcon={Car}
            title="Outstation Travel"
            titleHighlight="Options"
            description="One-way drops, round trips, and multi-city journeys with driver. Available for all destinations across South India."
            align="center"
          />
        </div>

        {/* Continuous Sliding in One Row */}
        <div className="outstation-options-marquee-wrapper">
          <div className="outstation-options-marquee-track">
            <div className="outstation-options-set">
              {options.map((opt, i) => (
                <div key={`opt1-${opt.id || i}`} className="outstation-option-slide-card">
                  <div className="option-slide-icon">{opt.icon}</div>
                  <div className="option-slide-title">{opt.title}</div>
                  <p className="option-slide-desc">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="outstation-options-set" aria-hidden="true">
              {options.map((opt, i) => (
                <div key={`opt2-${opt.id || i}`} className="outstation-option-slide-card">
                  <div className="option-slide-icon">{opt.icon}</div>
                  <div className="option-slide-title">{opt.title}</div>
                  <p className="option-slide-desc">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .outstation-options-marquee-wrapper {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 10px 0 20px 0;
            mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          }
          .outstation-options-marquee-track {
            display: flex;
            width: max-content;
            animation: outstationOptionsMarquee 30s linear infinite;
          }
          .outstation-options-marquee-track:hover {
            animation-play-state: paused;
          }
          .outstation-options-set {
            display: flex;
            gap: 24px;
            padding-right: 24px;
          }
          .outstation-option-slide-card {
            width: 350px;
            flex-shrink: 0;
            padding: 26px 24px;
            border-radius: 18px;
            background: #FFFFFF;
            border: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: 0 8px 24px -10px rgba(15, 23, 42, 0.06);
            display: flex;
            flex-direction: column;
            justifyContent: flex-start;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: default;
          }
          .outstation-option-slide-card:hover {
            transform: translateY(-4px);
            border-color: #C5A059;
            box-shadow: 0 16px 32px -10px rgba(197, 160, 89, 0.22);
          }
          .option-slide-icon {
            font-size: 1.75rem;
            margin-bottom: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: rgba(197, 160, 89, 0.1);
          }
          .option-slide-title {
            font-size: 1.18rem;
            font-weight: 700;
            color: var(--color-charcoal-900);
            margin-bottom: 8px;
            letter-spacing: -0.01em;
          }
          .option-slide-desc {
            font-size: 0.88rem;
            line-height: 1.55;
            color: var(--color-charcoal-600);
            margin: 0;
          }
          @keyframes outstationOptionsMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @media (max-width: 640px) {
            .outstation-option-slide-card {
              width: 290px;
              padding: 20px 18px;
            }
          }
          .outstation-tariff-desktop {
            display: block;
          }
          .outstation-tariff-mobile {
            display: none;
          }
          @media (max-width: 768px) {
            .outstation-tariff-desktop {
              display: none !important;
            }
            .outstation-tariff-mobile {
              display: flex !important;
              flex-direction: column;
              gap: 12px;
            }
          }
        `}</style>
      </section>

      {/* 5. TRANSPARENT OUTSTATION TARIFF TABLE */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge={outstation?.tariffHeader?.badge || "Per-Km Tariff Guide"}
            badgeIcon={Award}
            title={outstation?.tariffHeader?.title || "Outstation Fleet Per-Km Tariff"}
            titleHighlight={outstation?.tariffHeader?.titleHighlight || "Breakdown"}
            description={outstation?.tariffHeader?.description || terms.billingNotes || "Daily minimum 300 Kms applies (400 Kms for 45/49 seater luxury buses). Garage to garage billing with zero hidden charges."}
            align="center"
          />

          {/* Desktop Table View */}
          <GlassCard variant="standard" className="outstation-tariff-desktop" style={{ maxWidth: '960px', margin: '0 auto', padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.1fr 0.9fr', background: '#12151C', color: '#C5A059', padding: '14px 20px', fontWeight: '700', fontSize: '0.82rem', textTransform: 'uppercase', alignItems: 'center' }}>
              <div>Vehicle Model & Class</div>
              <div>Min. Kms / Day</div>
              <div>Per Km Rate</div>
              <div>Driver Night Allowance</div>
              <div style={{ textAlign: 'right' }}>Action</div>
            </div>

            {(tariffs && tariffs.length > 0 ? tariffs : DEFAULT_OUTSTATION_TARIFFS).map((t, idx) => (
              <div
                key={t.id || idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1fr 1fr 1.1fr 0.9fr',
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  fontSize: '0.88rem',
                  background: idx % 2 === 1 ? 'rgba(197,160,89,0.04)' : 'transparent',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>{t.vehicle_variant}</div>
                <div style={{ color: 'var(--color-charcoal-600)' }}>
                  {t.minimum_km_per_day ? `${t.minimum_km_per_day} km/day` : '300 km/day'}
                </div>
                <div style={{ color: 'var(--accent-gold-primary)', fontWeight: '700' }}>
                  {formatCurrency(t.rate_per_km, ' / km')}
                </div>
                <div style={{ color: 'var(--color-charcoal-700)' }}>
                  {formatCurrency(t.driver_allowance, ' / day')}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => handleOpenTariffEnquiry(t)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      background: 'linear-gradient(135deg, #12151C 0%, #1E232E 100%)',
                      color: '#C5A059',
                      border: '1px solid #C5A059',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#C5A059';
                      e.currentTarget.style.color = '#12151C';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #12151C 0%, #1E232E 100%)';
                      e.currentTarget.style.color = '#C5A059';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>Enquire</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </GlassCard>

          {/* Mobile Clean Card View */}
          <div className="outstation-tariff-mobile">
            {(tariffs && tariffs.length > 0 ? tariffs : DEFAULT_OUTSTATION_TARIFFS).map((t, idx) => (
              <div
                key={t.id || idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid rgba(197, 160, 89, 0.25)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.98rem', color: 'var(--color-charcoal-900)', lineHeight: '1.25' }}>
                      {t.vehicle_variant}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '3px' }}>
                      Chauffeur Driven
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenTariffEnquiry(t)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      background: 'linear-gradient(135deg, #12151C 0%, #1E232E 100%)',
                      color: '#C5A059',
                      border: '1px solid #C5A059',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
                    }}
                  >
                    <span>Enquire</span>
                    <ChevronRight size={13} />
                  </button>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    background: 'rgba(197, 160, 89, 0.06)',
                    borderRadius: '10px',
                    padding: '10px 8px',
                    gap: '4px',
                    textAlign: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase', fontWeight: '600' }}>
                      Rate / Km
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--accent-gold-primary)', marginTop: '2px' }}>
                      {formatCurrency(t.rate_per_km, '/km')}
                    </div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase', fontWeight: '600' }}>
                      Min. / Day
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-charcoal-800)', marginTop: '2px' }}>
                      {t.minimum_km_per_day ? `${t.minimum_km_per_day} km` : '300 km'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-charcoal-500)', textTransform: 'uppercase', fontWeight: '600' }}>
                      Driver Bata
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-charcoal-800)', marginTop: '2px' }}>
                      {formatCurrency(t.driver_allowance, '/day')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct WhatsApp Route Enquiry Modal */}
      <WhatsAppBookingModal
        isOpen={Boolean(selectedRouteModal)}
        onClose={() => setSelectedRouteModal(null)}
        serviceType="outstation"
        context={{
          pickup: 'Bengaluru, Karnataka',
          drop: selectedRouteModal?.name || '',
          message: `Inquiring for Bangalore to ${selectedRouteModal?.name || ''} (${selectedRouteModal?.distance || ''}) chauffeur outstation trip. Base rate: ${selectedRouteModal?.rate || ''}.`
        }}
      />

      {/* Modal for direct per-row Outstation Tariff Enquiry */}
      <TariffEnquiryModal
        tariff={selectedTariffForModal}
        isOpen={isEnquiryModalOpen}
        onClose={() => {
          setIsEnquiryModalOpen(false);
          setSelectedTariffForModal(null);
        }}
      />

    </div>
  );
};
