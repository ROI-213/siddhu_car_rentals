import React, { useState } from 'react';
import {
  Crown, MapPin, PhoneCall, MessageSquare, Clock, CheckCircle2,
  User, Calendar, FileText, ChevronRight, Star, ShieldCheck, Zap,
  Building2, Navigation, Car, Headphones
} from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Input } from '../components/common/Input';
import { LocationAutocompleteInput } from '../components/common/LocationAutocompleteInput';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { WhatsAppIcon } from '../components/common/WhatsAppEnquiryMenu';
import { SITE_CONFIG } from '../config/site';
import './Contact.css';

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
        badgeIcon={Headphones}
        title="We're Here to Drive"
        titleHighlight="Your Journey"
        description="Premium chauffeur-driven car rentals across Bengaluru. Airport transfers, outstation trips, corporate fleets & luxury rides — one call away, 24/7."
        breadcrumbs={['Contact Us']}
        image="/images/siddhu_white_car_bengaluru_road.jpg"
      >
        <div className="contact-hero-actions">
          <a
            href="tel:+917625059665"
            className="contact-hero-btn-call"
          >
            <PhoneCall size={18} color="#C5A059" />
            <span>+91 76250 59665</span>
          </a>
          <WhatsAppButton
            message="Hello Siddhu Car Rentals, I would like to enquire about your car rental services."
            className="contact-hero-btn-wa"
          >
            <MessageSquare size={18} />
            <span>WhatsApp Now</span>
          </WhatsAppButton>
        </div>
      </PageHero>

      {/* 2. STATS BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderBottom: '1px solid rgba(197,160,89,0.3)' }}>
        <div className="container">
          <div className="contact-stats-grid">
            {[
              { icon: Clock, value: '24/7', label: 'Always Available' },
              { icon: Zap, value: '< 15 Min', label: 'Quote Response' },
              { icon: Star, value: '4.9 ★', label: 'Customer Rating' },
              { icon: Car, value: '20+ Vehicles', label: 'Ready Fleet' },
              { icon: ShieldCheck, value: '100%', label: 'Verified Drivers' },
            ].map((stat, i) => (
              <div key={i} className="contact-stat-item">
                <stat.icon size={20} color="#C5A059" />
                <div className="contact-stat-val">{stat.value}</div>
                <div className="contact-stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. ENQUIRY FORM */}
      <section className="section-padding" id="contact-form" style={{ background: '#FAFAF8' }}>
        <div className="container">
          <SectionHeader
            badge="Instant Quote"
            badgeIcon={FileText}
            title="Send Your Travel"
            titleHighlight="Requirements"
            description="Fill in the details below and our concierge desk will send a custom quote via WhatsApp within minutes."
            align="center"
          />

          <div className="contact-main-grid">

            {/* Form Card */}
            <GlassCard variant="glowing" className="contact-form-card">
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 18px', background: 'rgba(37,211,102,0.06)', borderRadius: '20px', border: '1px solid rgba(37,211,102,0.25)' }}>
                  <div style={{ width: '64px', height: '64px', background: 'rgba(37,211,102,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 size={34} color="#128C7E" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', color: '#128C7E', marginBottom: '10px' }}>Enquiry Sent!</h3>
                  <p style={{ fontSize: '0.92rem', color: '#475569', maxWidth: '460px', margin: '0 auto 24px', lineHeight: '1.65' }}>
                    Thank you, <strong>{formData.name || 'valued guest'}</strong>. Our dispatch team will WhatsApp you a quote within <strong>15 minutes</strong>.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <WhatsAppButton message={whatsappMessage} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '9999px', background: '#25D366', color: '#FFFFFF', fontWeight: '700', boxShadow: '0 4px 14px rgba(37,211,102,0.3)', fontSize: '0.9rem' }}>
                      <MessageSquare size={17} /><span>Chat on WhatsApp</span>
                    </WhatsAppButton>
                    <button type="button" onClick={resetForm} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '9999px', background: '#FFFFFF', color: '#334155', fontWeight: '600', border: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer', fontSize: '0.9rem' }}>
                      New Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                  {/* Trip Type */}
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', marginBottom: '10px' }}>Select Trip Type</div>
                    <div className="contact-trip-types">
                      {[
                        { id: 'local', label: 'Local' },
                        { id: 'airport', label: 'Airport' },
                        { id: 'outstation', label: 'Outstation' },
                        { id: 'corporate', label: 'Corporate' }
                      ].map(t => (
                        <button key={t.id} type="button" onClick={() => setTripType(t.id)} className="contact-trip-btn" style={{
                          borderColor: tripType === t.id ? '#C5A059' : 'rgba(0,0,0,0.1)',
                          fontWeight: tripType === t.id ? '700' : '500',
                          background: tripType === t.id ? 'rgba(197,160,89,0.08)' : '#FFFFFF',
                          color: tripType === t.id ? '#9A7B2C' : '#64748B',
                        }}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <Input label="Your Name" icon={User} placeholder="e.g. Ananth Sharma" value={formData.name} onChange={handleChange} name="name" required />
                    <Input label="Phone (WhatsApp)" icon={PhoneCall} type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} name="phone" required />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <LocationAutocompleteInput label="Pickup Location" placeholder="Area, airport, hotel, landmark..." value={formData.pickup} onChange={handleLocationChange('pickup')} name="pickup" required />
                    <LocationAutocompleteInput label="Destination" placeholder="Drop area, city, hotel..." value={formData.drop} onChange={handleLocationChange('drop')} name="drop" required />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
                    <Input label="Travel Date" icon={Calendar} type="date" value={formData.date} onChange={handleChange} name="date" required />
                    <Input label="Pickup Time" icon={Clock} type="time" value={formData.time} onChange={handleChange} name="time" required />
                  </div>

                  {tripType === 'outstation' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', padding: '14px 16px', background: 'rgba(197,160,89,0.05)', borderRadius: '12px', border: '1px solid rgba(197,160,89,0.2)' }}>
                      <Input label="Return Date" icon={Calendar} type="date" value={formData.returnDate} onChange={handleChange} name="returnDate" min={formData.date || undefined} />
                      <Input label="Return Time" icon={Clock} type="time" value={formData.returnTime} onChange={handleChange} name="returnTime" />
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <Input label="Vehicle / Category" icon={Crown} value={formData.vehicleType} onChange={handleChange} name="vehicleType" options={[
                      { value: 'sedan', label: 'Luxury Sedan (E-Class / Accord)' },
                      { value: 'premium-sedan', label: 'Premium Sedan (S-Class / 7-Series)' },
                      { value: 'suv', label: 'Luxury SUV (Fortuner / Q7)' },
                      { value: 'mpv', label: 'Executive MPV (Innova / Vellfire)' },
                      { value: 'coach', label: 'VIP Coach (Force Traveller / HiAce)' }
                    ]} />
                    <Input label="Special Requests (Optional)" icon={FileText} placeholder="e.g. child seat, flight number..." value={formData.notes} onChange={handleChange} name="notes" />
                  </div>

                  <button
                    type="submit"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      gap: '10px', width: '100%', padding: '14px 20px', borderRadius: '9999px',
                      border: 'none', background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontWeight: 700,
                      fontSize: '0.98rem', cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(37,211,102,0.3)', transition: 'all 0.22s ease', marginTop: '4px'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(37,211,102,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.3)'; }}
                  >
                    <WhatsAppIcon size={20} />
                    <span>Send Enquiry via WhatsApp</span>
                    <ChevronRight size={18} />
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.73rem', color: '#94A3B8', marginTop: '-4px' }}>
                    Instant response via WhatsApp. Direct line to S.M. Patil & the Siddhu Car Rentals team.
                  </p>
                </form>
              )}
            </GlassCard>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <GlassCard variant="standard" style={{ padding: '22px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <PhoneCall size={13} /> Direct Contact
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="tel:+917625059665" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 13px', borderRadius: '10px', background: 'rgba(197,160,89,0.06)', border: '1px solid rgba(197,160,89,0.18)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <PhoneCall size={17} color="#C5A059" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.66rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>24/7 Dispatch</div>
                      <div style={{ fontSize: '0.94rem', fontWeight: '800', color: '#0F172A' }}>+91 76250 59665</div>
                    </div>
                  </a>
                  <a href="tel:+918147204327" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 13px', borderRadius: '10px', background: 'rgba(15,23,42,0.03)', border: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(15,23,42,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <PhoneCall size={17} color="#64748B" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.66rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Alternate</div>
                      <div style={{ fontSize: '0.94rem', fontWeight: '800', color: '#0F172A' }}>+91 81472 04327</div>
                    </div>
                  </a>
                  <WhatsAppButton message="Hello Siddhu Car Rentals, I would like to enquire about your car rental services." style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 13px', borderRadius: '10px', background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.22)', textDecoration: 'none', cursor: 'pointer' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MessageSquare size={17} color="#25D366" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.66rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>WhatsApp</div>
                      <div style={{ fontSize: '0.94rem', fontWeight: '800', color: '#128C7E' }}>Instant Quote</div>
                    </div>
                  </WhatsAppButton>
                </div>
              </GlassCard>

              <GlassCard variant="standard" style={{ padding: '22px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} /> Office & Hours
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <Navigation size={15} color="#94A3B8" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                      #314, 12th Main, 15th Cross,<br />JP Nagar 5th Phase,<br />Bengaluru – 560 078
                    </p>
                  </div>
                  <a href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+JP+Nagar+5th+Phase+Bengaluru" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: '700', color: '#2563EB', textDecoration: 'none', padding: '6px 12px', borderRadius: '7px', background: 'rgba(37,99,235,0.07)', width: 'fit-content' }}>
                    <MapPin size={13} /> Get Directions
                  </a>
                  <div style={{ display: 'flex', gap: '9px', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <Clock size={14} color="#C5A059" />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>Open 24 hours</div>
                      <div style={{ fontSize: '0.71rem', color: '#94A3B8' }}>7 days · 365 days a year</div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="standard" style={{ padding: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { icon: ShieldCheck, label: 'Verified Drivers', color: '#10B981' },
                    { icon: Car, label: 'KA Yellow Board', color: '#3B82F6' },
                    { icon: Building2, label: 'GST Invoicing', color: '#8B5CF6' }
                  ].map((badge, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 4px', borderRadius: '10px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)', gap: '5px', textAlign: 'center' }}>
                      <badge.icon size={18} color={badge.color} />
                      <div style={{ fontSize: '0.66rem', fontWeight: '700', color: '#475569', lineHeight: 1.2 }}>{badge.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CONTACT INFO + MAP */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="Find Us"
            badgeIcon={MapPin}
            title="Our Office &"
            titleHighlight="Location"
            description="Visit us at JP Nagar, Bengaluru or reach out instantly via phone or WhatsApp."
            align="center"
          />

          <div className="contact-locations-grid">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} color="#C5A059" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 6px', fontSize: '0.94rem', fontWeight: '700', color: '#0F172A' }}>Office Address</h4>
                    <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: '1.6', margin: '0 0 8px' }}>#314, 12th Main, 15th Cross, JP Nagar 5th Phase, Bengaluru – 560 078</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+JP+Nagar+5th+Phase+Bengaluru" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: '700', color: '#2563EB', textDecoration: 'none', padding: '5px 12px', borderRadius: '7px', background: 'rgba(37,99,235,0.07)' }}>
                      <MapPin size={13} /> Get Directions
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PhoneCall size={22} color="#C5A059" />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 6px', fontSize: '0.94rem', fontWeight: '700', color: '#0F172A' }}>24/7 Dispatch Desk</h4>
                    <a href="tel:+917625059665" style={{ display: 'block', fontSize: '0.96rem', fontWeight: '700', color: '#0F172A', textDecoration: 'none', marginBottom: '2px' }}>+91 76250 59665</a>
                    <a href="tel:+918147204327" style={{ display: 'block', fontSize: '0.84rem', fontWeight: '600', color: '#64748B', textDecoration: 'none' }}>+91 81472 04327</a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(37,211,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare size={22} color="#25D366" />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 6px', fontSize: '0.94rem', fontWeight: '700', color: '#0F172A' }}>WhatsApp Enquiry</h4>
                    <WhatsAppButton message="Hello Siddhu Car Rentals, I would like to enquire about your car rental services." style={{ fontSize: '0.88rem', fontWeight: '700', color: '#25D366', background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}>
                      +91 76250 59665 (Instant Quote)
                    </WhatsAppButton>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="interactive">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} color="#C5A059" />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.94rem', fontWeight: '700', color: '#0F172A' }}>Operating Hours</h4>
                    <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0 }}>24 Hours / 7 Days / 365 Days</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <GlassCard variant="standard" className="contact-map-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0F172A' }}>📍 JP Nagar 5th Phase, Bengaluru</span>
                <a href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+JP+Nagar+5th+Phase+Bengaluru" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', fontWeight: '700', color: '#2563EB', textDecoration: 'none', padding: '4px 10px', borderRadius: '7px', background: 'rgba(37,99,235,0.07)' }}>
                  <MapPin size={13} /> Directions
                </a>
              </div>
              <iframe
                title="Siddhu Car Rentals Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.854673894723!2d77.5852!3d12.9077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156541f534bb%3A0x2db4fb6c18512dd4!2sJP%20Nagar%205th%20Phase%2C%20Bengaluru%2C%20Karnataka%20560078!5e0!3m2!1sen!2sin!4v1709900000000!5m2!1sen!2sin"
                className="contact-map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </GlassCard>
          </div>
        </div>
      </section>

    </div>
  );
};
