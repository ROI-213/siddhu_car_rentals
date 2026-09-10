import React, { useState } from 'react';
import { Crown, MapPin, PhoneCall, MessageSquare, Mail, Clock, CheckCircle2, User, Calendar, FileText, ChevronRight } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { Input } from '../components/common/Input';
import { LocationAutocompleteInput } from '../components/common/LocationAutocompleteInput';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { WhatsAppIcon } from '../components/common/WhatsAppEnquiryMenu';
import { SITE_CONFIG } from '../config/site';

export const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [tripType, setTripType] = useState('local');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    returnDate: '',
    returnTime: '',
    vehicleType: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', pickup: '', drop: '', date: '', time: '', returnDate: '', returnTime: '', vehicleType: '', notes: '' });
    setTripType('local');
  };

  const whatsappMessage = `*New Enquiry - Siddhu Car Rentals*\n\n` +
    `• *Name:* ${formData.name || 'N/A'}\n` +
    `• *Phone:* ${formData.phone || 'N/A'}\n` +
    `• *Trip Type:* ${tripType}\n` +
    `• *Pickup:* ${formData.pickup || 'N/A'}\n` +
    `• *Destination:* ${formData.drop || 'N/A'}\n` +
    `• *Date:* ${formData.date || 'N/A'} at ${formData.time || 'N/A'}\n` +
    (tripType === 'outstation' ? `• *Return:* ${formData.returnDate || 'N/A'} at ${formData.returnTime || 'N/A'}\n` : '') +
    `• *Vehicle:* ${formData.vehicleType || 'N/A'}\n` +
    `• *Notes:* ${formData.notes || 'None'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 7000);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* 1. HERO */}
      <PageHero
        badge="24/7 Dispatch & Concierge"
        badgeIcon={PhoneCall}
        title="Book Your Chauffeur"
        titleHighlight="in Bengaluru"
        description="Instant quote, guaranteed vehicle dispatch, and 24/7 concierge support for airport transfers, local rentals, outstation trips, and corporate fleets."
        breadcrumbs={['Contact Us']}
        image="/images/hero_luxury_sedan.jpg"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '24px', alignItems: 'center' }}>
          <a
            href="tel:+917625059665"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.95rem 1.75rem', fontSize: '1.05rem', fontWeight: '700',
              borderRadius: '9999px', background: '#FFFFFF', color: '#0F172A',
              border: 'none', textDecoration: 'none'
            }}
          >
            <PhoneCall size={18} color="#0284C7" />
            <span>+91 76250 59665</span>
          </a>
          <WhatsAppButton
            message="Hello Siddhu Car Rentals, I would like to enquire about your car rental services."
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.95rem 1.75rem', fontSize: '1.05rem', fontWeight: '700',
              borderRadius: '9999px', background: '#25D366', color: '#FFFFFF',
              border: 'none', textDecoration: 'none'
            }}
          >
            <MessageSquare size={18} />
            <span>WhatsApp Now</span>
          </WhatsAppButton>
        </div>
      </PageHero>

      {/* 2. CONTACT DETAILS & MAP */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

            {/* Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} color="var(--accent-gold-primary)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 className="text-h4" style={{ marginBottom: '6px', fontSize: '0.95rem' }}>Office Address</h4>
                    <p className="text-small" style={{ lineHeight: '1.6', marginBottom: '8px' }}>
                      #314, 12th Main, 15th Cross, JP Nagar 5th Phase, Bengaluru - 560078
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+%23314%2C+12th+Main%2C+15th+Cross%2C+JP+Nagar+5th+Phase%2C+Bengaluru+-+560078"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '0.82rem', fontWeight: '700', color: '#0284C7',
                        textDecoration: 'none', padding: '6px 14px', borderRadius: '8px',
                        background: 'rgba(2,132,199,0.08)'
                      }}
                    >
                      <MapPin size={14} />
                      Get Directions
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PhoneCall size={22} color="var(--accent-gold-primary)" />
                  </div>
                  <div>
                    <h4 className="text-h4" style={{ marginBottom: '4px', fontSize: '0.95rem' }}>24/7 Dispatch Desk</h4>
                    <a href="tel:+917625059665" style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-slate-900)', textDecoration: 'none', display: 'block', marginBottom: '2px' }}>
                      +91 76250 59665
                    </a>
                    <a href="tel:+918147204327" style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-slate-600)', textDecoration: 'none', display: 'block' }}>
                      +91 81472 04327
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(37,211,102,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare size={22} color="#25D366" />
                  </div>
                  <div>
                    <h4 className="text-h4" style={{ marginBottom: '4px', fontSize: '0.95rem' }}>WhatsApp Enquiry</h4>
                    <WhatsAppButton message="Hello Siddhu Car Rentals, I would like to enquire about your car rental services." style={{ fontSize: '0.88rem', fontWeight: '700', color: '#25D366', background: 'none', border: 'none', padding: 0, textDecoration: 'underline' }}>
                      +91 76250 59665 (Instant Quote)
                    </WhatsAppButton>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} color="var(--accent-gold-primary)" />
                  </div>
                  <div>
                    <h4 className="text-h4" style={{ marginBottom: '4px', fontSize: '0.95rem' }}>Operating Hours</h4>
                    <p className="text-small" style={{ lineHeight: '1.6' }}>24 Hours / 7 Days / 365 Days</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Map */}
            <GlassCard variant="standard" style={{ padding: '16px', minHeight: '460px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--color-slate-900)' }}>Our Office — JP Nagar 5th Phase</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+%23314%2C+12th+Main%2C+15th+Cross%2C+JP+Nagar+5th+Phase%2C+Bengaluru+-+560078"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '700', color: '#0284C7', textDecoration: 'none', padding: '4px 10px', borderRadius: '8px', background: 'rgba(2,132,199,0.08)' }}
                >
                  <MapPin size={14} />
                  Get Directions
                </a>
              </div>
              <iframe
                title="Siddhu Car Rentals Location"
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

      {/* 3. QUICK ENQUIRY FORM */}
      <section className="section-padding" id="contact-form">
        <div className="container">
          <SectionHeader
            badge="Quick Enquiry"
            badgeIcon={FileText}
            title="Send Us Your Travel"
            titleHighlight="Requirements"
            description="Fill in the details below and our concierge desk will send you a custom quote via WhatsApp within minutes."
            align="center"
          />

          <GlassCard variant="glowing" style={{ padding: '36px', maxWidth: '760px', margin: '0 auto' }}>
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(37,211,102,0.08)', borderRadius: '16px', border: '1px solid rgba(37,211,102,0.3)' }}>
                <CheckCircle2 size={56} color="#128C7E" style={{ margin: '0 auto 16px' }} />
                <h3 className="text-h2" style={{ color: '#128C7E', marginBottom: '8px' }}>Enquiry Sent!</h3>
                <p className="text-body" style={{ maxWidth: '500px', margin: '0 auto 20px', lineHeight: '1.6' }}>
                  Thank you, <strong>{formData.name || 'valued guest'}</strong>. Our dispatch desk will WhatsApp you a custom quote shortly.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                  <WhatsAppButton message={whatsappMessage} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '9999px', background: '#25D366', color: '#FFFFFF', fontWeight: '700', boxShadow: '0 4px 14px rgba(37,211,102,0.3)' }}>
                    <MessageSquare size={18} />
                    <span>Send via WhatsApp</span>
                  </WhatsAppButton>
                  <button type="button" onClick={resetForm} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '9999px', background: '#FFFFFF', color: 'var(--color-charcoal-800)', fontWeight: '600', border: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer' }}>
                    New Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Trip Type Tabs */}
                <div style={{ display: 'flex', gap: '6px', padding: '4px', background: 'rgba(0,0,0,0.04)', borderRadius: '10px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'local', label: 'Local' },
                    { id: 'airport', label: 'Airport' },
                    { id: 'outstation', label: 'Outstation' },
                    { id: 'corporate', label: 'Corporate' }
                  ].map(t => (
                    <button key={t.id} type="button" onClick={() => setTripType(t.id)} style={{
                      flex: 1, padding: '10px 8px', border: 'none', borderRadius: '8px',
                      fontFamily: 'var(--font-ui)', fontSize: '0.82rem', fontWeight: tripType === t.id ? '700' : '500',
                      background: tripType === t.id ? '#FFFFFF' : 'transparent',
                      color: tripType === t.id ? 'var(--accent-gold-primary)' : 'var(--color-charcoal-700)',
                      boxShadow: tripType === t.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none', cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap'
                    }}>
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Row 1: Name + Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <Input label="Your Name" icon={User} placeholder="e.g. Ananth Sharma" value={formData.name} onChange={handleChange} name="name" required />
                  <Input label="Phone Number (WhatsApp)" icon={PhoneCall} type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} name="phone" required />
                </div>

                {/* Row 2: Pickup + Destination with Autocomplete */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <LocationAutocompleteInput
                    label="Pickup Location"
                    placeholder="Type area, airport, hotel (e.g. Banashankari, Airport)..."
                    value={formData.pickup}
                    onChange={handleLocationChange('pickup')}
                    name="pickup"
                    required
                  />
                  <LocationAutocompleteInput
                    label="Destination"
                    placeholder="Type destination, hotel, city (e.g. Bangalore, Mysuru)..."
                    value={formData.drop}
                    onChange={handleLocationChange('drop')}
                    name="drop"
                    required
                  />
                </div>

                {/* Row 3: Date + Time */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                  <Input label="Travel Date" icon={Calendar} type="date" value={formData.date} onChange={handleChange} name="date" required />
                  <Input label="Pickup Time" icon={Clock} type="time" value={formData.time} onChange={handleChange} name="time" required />
                </div>

                {/* Return Date/Time — Outstation only */}
                {tripType === 'outstation' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', padding: '14px 16px', background: 'rgba(2,132,199,0.04)', borderRadius: '10px', border: '1px solid rgba(2,132,199,0.12)' }}>
                    <Input label="Return Date" icon={Calendar} type="date" value={formData.returnDate} onChange={handleChange} name="returnDate" min={formData.date || undefined} />
                    <Input label="Return Time" icon={Clock} type="time" value={formData.returnTime} onChange={handleChange} name="returnTime" />
                  </div>
                )}

                {/* Row 4: Vehicle Type + Notes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <Input label="Vehicle / Category" icon={Crown} value={formData.vehicleType} onChange={handleChange} name="vehicleType" options={[
                    { value: 'sedan', label: 'Luxury Sedan (E-Class / Accord)' },
                    { value: 'premium-sedan', label: 'Premium Sedan (S-Class / 7-Series)' },
                    { value: 'suv', label: 'Luxury SUV (Fortuner / Q7)' },
                    { value: 'mpv', label: 'Executive MPV (Innova / Vellfire)' },
                    { value: 'coach', label: 'VIP Van / Coach (Traveller / HiAce)' }
                  ]} />
                  <Input label="Special Requests (Optional)" icon={FileText} placeholder="e.g. child seat, flight number, extra luggage..." value={formData.notes} onChange={handleChange} name="notes" />
                </div>

                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '14px 24px',
                    borderRadius: '9999px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
                    transition: 'all 0.2s ease',
                    marginTop: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(37,211,102,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.3)';
                  }}
                >
                  <WhatsAppIcon size={20} />
                  <span>Send Enquiry via WhatsApp</span>
                  <ChevronRight size={18} />
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
                  Instant response via WhatsApp. Direct connection to S.M. Patil & the Siddhu Car Rentals team.
                </p>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

    </div>
  );
};
