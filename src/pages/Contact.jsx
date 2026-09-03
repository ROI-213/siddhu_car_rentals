import React, { useState } from 'react';
import { Crown, MapPin, PhoneCall, MessageSquare, Mail, Clock, CheckCircle2, User, Calendar, FileText, ChevronRight } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { Input } from '../components/common/Input';

export const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 7000);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <PageHero
        badge="24/7 Dispatch & Concierge"
        badgeIcon={PhoneCall}
        title="Contact Siddhu Car Rentals Headquarters"
        titleHighlight="in Bengaluru"
        description="Our concierge dispatch team is available 24/7 for instant chauffeur bookings, corporate tariff agreements, or custom outstation travel planning."
        breadcrumbs={['Contact Us']}
        image="/images/hero_luxury_sedan.jpg"
      />

      {/* 2. CONTACT DETAILS GRID & MAP */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            {/* Left Column: Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={24} color="var(--accent-gold-primary)" />
                  </div>
                  <div>
                    <h4 className="text-h4" style={{ marginBottom: '4px' }}>Headquarters Address</h4>
                    <p className="text-small" style={{ lineHeight: '1.6' }}>
                      #314, 12th Main, 15th Cross, JP Nagar 5th Phase, Bengaluru - 560078
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PhoneCall size={24} color="var(--accent-gold-primary)" />
                  </div>
                  <div>
                    <h4 className="text-h4" style={{ marginBottom: '4px' }}>24/7 Dispatch Desk</h4>
                    <p className="text-small" style={{ lineHeight: '1.6' }}>
                      +91 76250 59665 / +91 81472 04327
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37,211,102,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare size={24} color="#25D366" />
                  </div>
                  <div>
                    <h4 className="text-h4" style={{ marginBottom: '4px' }}>WhatsApp Priority Desk</h4>
                    <p className="text-small" style={{ lineHeight: '1.6' }}>
                      +91 76250 59665 (Instant Tariff & Booking Concierge)
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={24} color="var(--accent-gold-primary)" />
                  </div>
                  <div>
                    <h4 className="text-h4" style={{ marginBottom: '4px' }}>Email Concierge</h4>
                    <p className="text-small" style={{ lineHeight: '1.6' }}>
                      reservations@siddhucarrentals.com / b2b@siddhucarrentals.com
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={24} color="var(--accent-gold-primary)" />
                  </div>
                  <div>
                    <h4 className="text-h4" style={{ marginBottom: '4px' }}>Working Hours</h4>
                    <p className="text-small" style={{ lineHeight: '1.6' }}>
                      24 Hours / 7 Days a Week / 365 Days a Year
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Right Column: Google Maps Container */}
            <GlassCard variant="standard" style={{ padding: '16px', height: '100%', minHeight: '460px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} color="var(--accent-sky-primary)" />
                  <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--color-slate-900)' }}>
                    JP Nagar 5th Phase Headquarters
                  </span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+%23314%2C+12th+Main%2C+15th+Cross%2C+JP+Nagar+5th+Phase%2C+Bengaluru+-+560078"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: 'var(--accent-sky-primary)',
                    textDecoration: 'none',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(2, 132, 199, 0.08)'
                  }}
                >
                  <span>Open in Google Maps</span>
                  <ChevronRight size={14} />
                </a>
              </div>

              <iframe
                title="Siddhu Car Rentals Location Map Bengaluru"
                src="https://maps.google.com/maps?q=siddhu%20car%20rentals%20%23314%2C%2012th%20Main%2C%2015th%20Cross%2C%20JP%20Nagar%205th%20Phase%2C%20Bengaluru%20-%20560078&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '14px', minHeight: '380px', flex: 1 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </GlassCard>

          </div>
        </div>
      </section>

      {/* 3. ENQUIRY FORM SECTION */}
      <section className="section-padding" id="contact-form">
        <div className="container">
          <SectionHeader
            badge="Direct Concierge Enquiry"
            badgeIcon={Mail}
            title="Send Us a Message or Booking"
            titleHighlight="Enquiry"
            description="Our dispatch manager will reply within 10 minutes."
            align="center"
          />

          <GlassCard variant="glowing" style={{ padding: '36px', maxWidth: '720px', margin: '0 auto' }}>
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(37, 211, 102, 0.08)', borderRadius: '16px', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
                <CheckCircle2 size={54} color="#128C7E" style={{ margin: '0 auto 16px auto' }} />
                <h3 className="text-h2" style={{ color: '#128C7E', marginBottom: '8px' }}>Enquiry Sent Successfully!</h3>
                <p className="text-body" style={{ maxWidth: '480px', margin: '0 auto' }}>
                  Thank you for reaching out to Siddhu Car Rentals. Our Bengaluru concierge desk is processing your message and will call or WhatsApp you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <Input label="Your Name" icon={User} placeholder="e.g. Ananth Narayan" required />
                  <Input label="Phone Number (WhatsApp)" icon={PhoneCall} placeholder="+91 98765 43210" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <Input label="Email Address" icon={Mail} type="email" placeholder="ananth@company.com" required />
                  <Input
                    label="Service Requirement"
                    icon={Crown}
                    options={[
                      { value: 'airport', label: 'Kempegowda Airport VIP Transfer' },
                      { value: 'local', label: 'Local City Hourly Rental' },
                      { value: 'outstation', label: 'Outstation Intercity Trip' },
                      { value: 'corporate', label: 'Corporate B2B Contract' },
                      { value: 'wedding', label: 'Wedding Luxury Convoy' }
                    ]}
                  />
                </div>

                <Input label="Preferred Travel Date" type="date" icon={Calendar} required />

                <Input label="Your Message / Travel Details" icon={FileText} placeholder="e.g. Looking for Mercedes S-Class pickup from Kempegowda T2 on 18th August..." required />

                <PremiumButton variant="gold" size="lg" fullWidth pill icon={ChevronRight} iconPosition="right" style={{ marginTop: '8px' }}>
                  Send Enquiry Now
                </PremiumButton>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

    </div>
  );
};
