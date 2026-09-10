import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Car, Phone, User, CheckCircle2, ChevronRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Input } from './Input';
import { LocationAutocompleteInput } from './LocationAutocompleteInput';
import { WhatsAppIcon } from './WhatsAppEnquiryMenu';
import { SITE_CONFIG } from '../../config/site';

export const EnquiryForm = ({ title = "Reserve Executive Mobility", subtitle = "Instant Fare Estimate & Guaranteed Vehicle Dispatch" }) => {
  const [tripType, setTripType] = useState('local');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    packageDuration: '8h',
    date: '',
    vehicle: 'mercedes_s',
    name: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const vehicleLabels = {
      mercedes_s: 'Mercedes-Benz S-Class (VIP Luxury)',
      innova_crysta: 'Toyota Innova Crysta (7-Seater)',
      bmw_5: 'BMW 5 Series (Executive)',
      fortuner: 'Toyota Fortuner Legender (SUV)',
      audi_a6: 'Audi A6 (Luxury Sedan)'
    };

    const lines = [
      `*NEW BOOKING ENQUIRY - SIDDHU CAR RENTALS*`,
      `----------------------------------------`,
      `🛎️ *Trip Type:* ${tripType.toUpperCase()}`,
      `🚘 *Vehicle:* ${vehicleLabels[formData.vehicle] || formData.vehicle}`,
      `👤 *Name:* ${formData.name}`,
      `📱 *WhatsApp:* ${formData.phone}`,
      `📍 *Pickup:* ${formData.pickup || 'Bengaluru'}`,
      formData.destination ? `🎯 *Destination:* ${formData.destination}` : null,
      formData.date ? `📅 *Date:* ${formData.date}` : null,
      `----------------------------------------`,
      `Please confirm vehicle availability and send exact quote.`
    ].filter(Boolean);

    const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <GlassCard variant="glowing" style={{ padding: '32px', maxWidth: '640px', width: '100%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold-primary)', fontWeight: '700' }}>
          {subtitle}
        </div>
        <h3 className="text-h2" style={{ fontSize: '1.75rem', marginTop: '4px' }}>
          {title}
        </h3>
      </div>

      {/* Trip Type Tabs */}
      <div style={{ display: 'flex', gap: '8px', padding: '4px', background: 'rgba(0,0,0,0.04)', borderRadius: '10px', marginBottom: '24px' }}>
        {[
          { id: 'local', label: 'Local Hourly' },
          { id: 'airport', label: 'Airport VIP' },
          { id: 'outstation', label: 'Outstation' },
          { id: 'corporate', label: 'Corporate' }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTripType(t.id)}
            style={{
              flex: 1,
              padding: '8px 4px',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.82rem',
              fontWeight: tripType === t.id ? '700' : '500',
              background: tripType === t.id ? '#FFFFFF' : 'transparent',
              color: tripType === t.id ? 'var(--accent-gold-primary)' : 'var(--color-charcoal-700)',
              boxShadow: tripType === t.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', background: 'rgba(37, 211, 102, 0.08)', borderRadius: '12px', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
          <CheckCircle2 size={48} color="#128C7E" style={{ margin: '0 auto 16px auto' }} />
          <h4 className="text-h3" style={{ color: '#128C7E', marginBottom: '8px' }}>Enquiry Sent via WhatsApp!</h4>
          <p className="text-small">
            Thank you, {formData.name || 'valued client'}. Our luxury dispatch concierge has received your request and will respond within minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <LocationAutocompleteInput
              label="Pickup Location in Bengaluru"
              placeholder="Type location (e.g. Ba, Airport, UB City...)"
              value={formData.pickup}
              onChange={handleLocationChange('pickup')}
              name="pickup"
              required
            />
            {tripType === 'outstation' ? (
              <LocationAutocompleteInput
                label="Destination City"
                placeholder="Type destination (e.g. Mysuru, Coorg, Ooty...)"
                value={formData.destination}
                onChange={handleLocationChange('destination')}
                name="destination"
                required
              />
            ) : (
              <Input
                label={tripType === 'airport' ? 'Airport Transfer Direction' : 'Package Duration'}
                name="packageDuration"
                value={formData.packageDuration}
                onChange={handleChange}
                icon={tripType === 'airport' ? MapPin : Clock}
                options={
                  tripType === 'local'
                    ? [
                        { value: '8h', label: '8 Hours / 80 Kms (Standard)' },
                        { value: '4h', label: '4 Hours / 40 Kms (Half Day)' },
                        { value: '12h', label: '12 Hours / 120 Kms (Full Day)' }
                      ]
                    : [
                        { value: 'airport_drop', label: 'City to Kempegowda Airport Drop' },
                        { value: 'airport_pickup', label: 'Kempegowda Airport to City Pickup' }
                      ]
                }
              />
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <Input
              label="Travel Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              icon={Calendar}
              required
            />
            <Input
              label="Preferred Luxury Vehicle"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              icon={Car}
              options={[
                { value: 'mercedes_s', label: 'Mercedes-Benz S-Class (VIP Luxury)' },
                { value: 'innova_crysta', label: 'Toyota Innova Crysta (7-Seater)' },
                { value: 'bmw_5', label: 'BMW 5 Series (Executive)' },
                { value: 'fortuner', label: 'Toyota Fortuner Legender (SUV)' },
                { value: 'audi_a6', label: 'Audi A6 (Luxury Sedan)' }
              ]}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <Input
              label="Your Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              icon={User}
              placeholder="e.g. Rajesh Kumar"
              required
            />
            <Input
              label="Mobile Number (WhatsApp)"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              icon={Phone}
              placeholder="+91 76250 59665"
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              height: '52px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: '800',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)',
              transition: 'all 0.2s ease',
              marginTop: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.4)';
            }}
          >
            <WhatsAppIcon size={22} />
            <span>Submit Enquiry via WhatsApp</span>
            <ChevronRight size={18} />
          </button>
        </form>
      )}
    </GlassCard>
  );
};
