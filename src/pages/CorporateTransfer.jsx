import React, { useState } from 'react';
import { Crown, Building2, ShieldCheck, Award, PhoneCall, MessageSquare, ChevronRight, CheckCircle2, Users, FileText, Calendar, MapPin, User, Mail } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { Input } from '../components/common/Input';

export const CorporateTransfer = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 7000);
  };

  const scrollToForm = () => {
    const el = document.getElementById('corporate-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <PageHero
        badge="Corporate Mobility Solutions"
        badgeIcon={Building2}
        title="B2B Executive Transportation & Monthly"
        titleHighlight="Corporate Tariffs"
        description="Streamlined mobility agreements for technology parks, corporate headquarters, visiting board delegates, and C-suite executives in Bengaluru."
        breadcrumbs={['Services', 'Corporate Transfer']}
        image="/images/services_corporate_s_class_landscape.jpg"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
          <PremiumButton variant="gold" size="lg" pill icon={ChevronRight} iconPosition="right" onClick={scrollToForm}>
            Request B2B Corporate Quote
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
            <span>Speak with B2B Desk</span>
          </a>
        </div>
      </PageHero>

      {/* 2. CORPORATE SERVICES SCOPE */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="B2B Services Scope"
            badgeIcon={Crown}
            title="Comprehensive Corporate Mobility"
            titleHighlight="Services"
            description="Designed to elevate corporate logistics for enterprises, tech MNCs, and consulting firms."
            align="center"
          />

          <div className="grid-showcase">
            <GlassCard variant="interactive">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Users size={24} color="var(--accent-gold-primary)" />
              </div>
              <h3 className="text-h3" style={{ marginBottom: '8px' }}>Executive & Board Mobility</h3>
              <p className="text-small">
                Dedicated Mercedes-Benz S-Class and BMW 5 Series sedans for visiting board members, C-level executives, and key clients.
              </p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Building2 size={24} color="var(--accent-gold-primary)" />
              </div>
              <h3 className="text-h3" style={{ marginBottom: '8px' }}>Employee & Delegate Transportation</h3>
              <p className="text-small">
                Fleet management for tech park transfers, office commutes, inter-office meetings, and visiting international teams.
              </p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Crown size={24} color="var(--accent-gold-primary)" />
              </div>
              <h3 className="text-h3" style={{ marginBottom: '8px' }}>Conference & Event Convoys</h3>
              <p className="text-small">
                Matching fleets of Innova Crystas and luxury sedans coordinated by a dedicated on-site dispatch manager for annual tech summits.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 3. CORPORATE B2B BENEFITS */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Why Enterprise Clients Partner With Us"
            badgeIcon={Award}
            title="Key Corporate Mobility"
            titleHighlight="Benefits"
            description="Built to meet strict enterprise compliance, SLA punctuality, and accounting standards."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <GlassCard variant="standard">
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '6px' }}>
                ✓ Uniformed Professional Chauffeurs
              </div>
              <p className="text-small">Police-verified, English-speaking chauffeurs trained in executive NDA confidentiality and defensive driving.</p>
            </GlassCard>

            <GlassCard variant="standard">
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '6px' }}>
                ✓ 99.8% Punctuality & Flight Tracking
              </div>
              <p className="text-small">Live flight gate monitoring for airport arrivals with 15-minute advance pickup placement guaranteed.</p>
            </GlassCard>

            <GlassCard variant="standard">
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '6px' }}>
                ✓ Itemised Monthly GST Invoicing
              </div>
              <p className="text-small">Simplified monthly billing with itemised duty slips, GST credit receipts, and digital logbook records.</p>
            </GlassCard>

            <GlassCard variant="standard">
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '6px' }}>
                ✓ Dedicated Account Manager
              </div>
              <p className="text-small">Single point of contact concierge desk for instant vehicle swaps, itinerary changes, and last-minute requests.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. DEDICATED CORPORATE REQUEST FORM */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }} id="corporate-form">
        <div className="container">
          <SectionHeader
            badge="Enterprise Agreement Request"
            badgeIcon={FileText}
            title="Corporate B2B Quote & Account"
            titleHighlight="Enquiry"
            description="Submit your enterprise mobility specifications for customized monthly tariffs."
            align="center"
          />

          <GlassCard variant="glowing" style={{ padding: '36px', maxWidth: '840px', margin: '0 auto' }}>
            
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(37, 211, 102, 0.08)', borderRadius: '16px', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
                <CheckCircle2 size={54} color="#128C7E" style={{ margin: '0 auto 16px auto' }} />
                <h3 className="text-h2" style={{ color: '#128C7E', marginBottom: '8px' }}>Corporate Request Received!</h3>
                <p className="text-body" style={{ maxWidth: '520px', margin: '0 auto' }}>
                  Thank you for your interest. Our Corporate Accounts Director will contact your office within 2 hours to present customized B2B tariff options.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <Input label="Company / Enterprise Name" icon={Building2} placeholder="e.g. Accenture / Infosys / Startup" required />
                  <Input label="Contact Person Name" icon={User} placeholder="e.g. Priya Sundaram (HR / Admin)" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <Input label="Corporate Phone Number" icon={PhoneCall} placeholder="+91 76250 59665" required />
                  <Input label="Official Corporate Email" icon={Mail} type="email" placeholder="priya@company.com" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <Input
                    label="Number of Employees / Delegates"
                    icon={Users}
                    options={[
                      { value: '1-5', label: '1 - 5 Executives (VIP Board)' },
                      { value: '5-20', label: '5 - 20 Employees (Medium Delegation)' },
                      { value: '20-50', label: '20 - 50 Employees (Tech Summit)' },
                      { value: '50+', label: '50+ Monthly Enterprise Contract' }
                    ]}
                  />
                  <Input label="Primary Office / Pickup Location" icon={MapPin} placeholder="e.g. Manyata Tech Park, Outer Ring Road" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <Input label="Expected Start Date" type="date" icon={Calendar} required />
                  <Input
                    label="Primary Service Requirement"
                    icon={Crown}
                    options={[
                      { value: 'airport_corpo', label: 'Executive Airport VIP Transfers' },
                      { value: 'monthly_contract', label: 'Monthly Corporate Fleet Rental' },
                      { value: 'conference', label: 'Corporate Event / Tech Summit Convoy' },
                      { value: 'spot_booking', label: 'Spot Corporate Chauffeur Duty' }
                    ]}
                  />
                </div>

                <Input label="Vehicle Requirement & Special Notes" icon={FileText} placeholder="e.g. 2 Mercedes S-Class + 4 Innova Crystas required for 3 days summit..." />

                <PremiumButton variant="gold" size="lg" fullWidth pill icon={ChevronRight} iconPosition="right" style={{ marginTop: '12px' }}>
                  Request Corporate B2B Quote
                </PremiumButton>
              </form>
            )}

          </GlassCard>
        </div>
      </section>

    </div>
  );
};
