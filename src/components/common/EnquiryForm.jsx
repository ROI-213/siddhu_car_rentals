import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Car, Phone, User, CheckCircle2, ChevronRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Input } from './Input';
import { PremiumButton } from './PremiumButton';

export const EnquiryForm = ({ title = "Reserve Executive Mobility", subtitle = "Instant Fare Estimate & Guaranteed Vehicle Dispatch" }) => {
  const [tripType, setTripType] = useState('local');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <GlassCard variant="glowing" style={{ padding: '32px', maxWidth: '640px', width: '100%', margin: '0 auto' }}>
      <div style={{ textAlignment: 'center', marginBottom: '24px' }}>
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
          { id: 'wedding', label: 'Corporate' }
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
        <div style={{ textAlignment: 'center', padding: '32px 16px', background: 'rgba(37, 211, 102, 0.08)', borderRadius: '12px', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
          <CheckCircle2 size={48} color="#128C7E" style={{ margin: '0 auto 16px auto' }} />
          <h4 className="text-h3" style={{ color: '#128C7E', marginBottom: '8px' }}>Enquiry Received Successfully!</h4>
          <p className="text-small">
            Our luxury dispatch manager will call you within 10 minutes to confirm vehicle availability and send exact quote via WhatsApp.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <Input
              label="Pickup Location in Bengaluru"
              icon={MapPin}
              placeholder="e.g. UB City, Indiranagar, Airport"
              required
            />
            <Input
              label={tripType === 'outstation' ? 'Destination City' : 'Package Duration'}
              icon={tripType === 'outstation' ? MapPin : Clock}
              options={
                tripType === 'local'
                  ? [
                      { value: '8h', label: '8 Hours / 80 Kms (Standard)' },
                      { value: '4h', label: '4 Hours / 40 Kms (Half Day)' },
                      { value: '12h', label: '12 Hours / 120 Kms (Full Day)' }
                    ]
                  : tripType === 'airport'
                  ? [
                      { value: 'airport_drop', label: 'City to Kempegowda Airport Drop' },
                      { value: 'airport_pickup', label: 'Kempegowda Airport to City Pickup' }
                    ]
                  : [
                      { value: 'mysore', label: 'Mysuru (One Way / Round Trip)' },
                      { value: 'coorg', label: 'Coorg / Madikeri' },
                      { value: 'chikkamagaluru', label: 'Chikkamagaluru' },
                      { value: 'chennai', label: 'Chennai / Puducherry' }
                    ]
              }
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <Input
              label="Travel Date"
              type="date"
              icon={Calendar}
              required
            />
            <Input
              label="Preferred Luxury Vehicle"
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
              icon={User}
              placeholder="e.g. Rajesh Kumar"
              required
            />
            <Input
              label="Mobile Number (WhatsApp)"
              icon={Phone}
              placeholder="+91 76250 59665"
              required
            />
          </div>

          <PremiumButton variant="gold" size="lg" fullWidth pill icon={ChevronRight} iconPosition="right" style={{ marginTop: '8px' }}>
            Request Guaranteed Quote
          </PremiumButton>
        </form>
      )}
    </GlassCard>
  );
};
