import { pricingService } from '../../services/pricingService';
import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Calendar, Clock, MapPin, User, ChevronRight, ShieldCheck, Star } from 'lucide-react';
import { Input } from '../common/Input';
import { PremiumButton } from '../common/PremiumButton';
import { Badge } from '../common/Badge';

export const VehicleBookingModal = ({ vehicle, isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !vehicle) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: 'rgba(18, 21, 28, 0.8)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
        border: '1px solid var(--accent-gold-border)'
      }}>
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.06)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close modal"
        >
          <X size={20} color="var(--color-charcoal-900)" />
        </button>

        {/* Modal Vehicle Header Banner */}
        <div style={{ position: 'relative', width: '100%', height: '220px', background: '#12151C', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
          <img
            src={vehicle.image}
            alt={vehicle.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(18,21,28,0.95) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <Badge variant="gold" icon={Star}>{vehicle.rating || '4.9'} Verified Rating</Badge>
              <h2 className="text-h2" style={{ color: '#FFFFFF', marginTop: '6px' }}>{vehicle.name}</h2>
              <div style={{ fontSize: '0.85rem', color: '#C5A059', fontWeight: '600' }}>{vehicle.category}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Hourly Package</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF', fontFamily: 'var(--font-ui)' }}>
                ₹{priceStr.replace("₹", "")}<span style={{ fontSize: '0.85rem', fontWeight: '400', color: '#C5A059' }}>/hr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '28px' }}>
          
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <CheckCircle2 size={56} color="#128C7E" style={{ margin: '0 auto 16px auto' }} />
              <h3 className="text-h2" style={{ color: '#128C7E', marginBottom: '8px' }}>Reservation Request Sent!</h3>
              <p className="text-body" style={{ maxWidth: '480px', margin: '0 auto' }}>
                Thank you for reserving the <strong>{vehicle.name}</strong>. Our Bengaluru concierge desk is reviewing driver availability and sending your exact rate breakdown via WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Vehicle Quick Features */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '14px', background: 'var(--bg-foundation-alt)', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-charcoal-800)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--accent-gold-primary)" /> {vehicle.passengerCapacity || 4} Passenger Capacity
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-charcoal-800)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--accent-gold-primary)" /> {vehicle.luggageCapacity || 3} Luggage Bags
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--accent-gold-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--accent-gold-primary)" /> Uniformed Chauffeur Guaranteed
                </span>
              </div>

              {/* Form Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <Input label="Your Name" icon={User} placeholder="e.g. Vikramaditya" required />
                <Input label="WhatsApp Mobile Number" icon={Phone} placeholder="+91 76250 59665" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <Input label="Pickup Address in Bengaluru" icon={MapPin} placeholder="e.g. UB City / Airport / Hotel" required />
                <Input
                  label="Select Tariff Package"
                  icon={Clock}
                  options={[
                    { value: '8h', label: `Local Full Day — 8 Hours / 80 Kms (₹${priceStr})` },
                    { value: '4h', label: `Local Half Day — 4 Hours / 40 Kms` },
                    { value: 'airport', label: `Kempegowda Airport Flat VIP Transfer` },
                    { value: 'outstation', label: `Outstation Long Distance Journey` }
                  ]}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <Input label="Pickup Date" type="date" icon={Calendar} required />
                <Input label="Pickup Time" type="time" icon={Clock} required />
              </div>

              <PremiumButton variant="gold" size="lg" fullWidth pill icon={ChevronRight} iconPosition="right">
                Confirm & Request Booking
              </PremiumButton>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
