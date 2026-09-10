import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { pricingService } from '../../services/pricingService';
import { SITE_CONFIG } from '../../config/site';
import { X, CheckCircle2, Phone, Calendar, Clock, MapPin, User, ChevronRight, ShieldCheck, Star } from 'lucide-react';
import { Input } from '../common/Input';
import { PremiumButton } from '../common/PremiumButton';
import { Badge } from '../common/Badge';
import { LocationAutocompleteInput } from '../common/LocationAutocompleteInput';
import { WhatsAppIcon } from '../common/WhatsAppEnquiryMenu';

export const VehicleBookingModal = ({ vehicle, isOpen, onClose, initialLocation = '', initialDate = '', initialPackage = '' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: initialLocation || '',
    drop: '',
    packageType: initialPackage === 'airport' ? 'airport' : initialPackage === 'outstation' ? 'outstation' : '8h',
    date: initialDate || '',
    time: '10:00'
  });

  useEffect(() => {
    if (initialLocation) {
      setFormData(prev => ({ ...prev, pickup: initialLocation }));
    }
    if (initialDate) {
      setFormData(prev => ({ ...prev, date: initialDate }));
    }
  }, [initialLocation, initialDate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  const localTariff = vehicle ? (pricingService.getLocalTariff(vehicle.id) || {}) : {};
  const priceStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : 'Price on Request';

  if (!isOpen || !vehicle) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (fieldName) => (e) => {
    setFormData(prev => ({ ...prev, [fieldName]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      `*VEHICLE RESERVATION ENQUIRY - SIDDHU CAR RENTALS*`,
      `----------------------------------------`,
      `🚘 *Vehicle:* ${vehicle.name} (${vehicle.category || 'VIP Luxury'})`,
      `👤 *Customer Name:* ${formData.name}`,
      `📱 *WhatsApp Phone:* ${formData.phone}`,
      `📍 *Pickup Location:* ${formData.pickup || 'Bengaluru'}`,
      formData.drop ? `🎯 *Destination:* ${formData.drop}` : null,
      `⏱️ *Package:* ${formData.packageType === 'airport' ? 'Airport VIP Transfer' : formData.packageType === 'outstation' ? 'Outstation Trip' : formData.packageType === '4h' ? 'Local 4h / 40km' : 'Local 8h / 80km'}`,
      formData.date ? `📅 *Date:* ${formData.date} at ${formData.time || '10:00 AM'}` : null,
      `----------------------------------------`,
      `Please confirm vehicle availability and reservation quote.`
    ].filter(Boolean);

    const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: 'rgba(18, 21, 28, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        overflowY: 'auto'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
          border: '1px solid var(--accent-gold-border)',
          margin: 'auto'
        }}
      >
        {/* Modal Top Header Bar: Title, Category, Pricing & Close Button */}
        <div style={{
          position: 'relative',
          padding: '24px 28px 20px',
          background: '#12151C',
          borderRadius: '24px 24px 0 0',
          borderBottom: '1px solid rgba(197, 160, 89, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '20px'
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <Badge variant="gold" icon={Star}>{vehicle.rating || '4.9'} Verified Rating</Badge>
              <span style={{ fontSize: '0.82rem', color: '#C5A059', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {vehicle.category}
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.2rem, 2.8vw, 1.65rem)',
              fontWeight: '800',
              color: '#FFFFFF',
              margin: 0,
              lineHeight: 1.25,
              fontFamily: 'var(--font-editorial)'
            }}>
              {vehicle.name}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Hourly Package
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#C5A059', fontFamily: 'var(--font-ui)', lineHeight: 1.1 }}>
                ₹{priceStr.replace("₹", "")}<span style={{ fontSize: '0.8rem', fontWeight: '400', color: 'rgba(255,255,255,0.7)' }}>/hr</span>
              </div>
            </div>

            {/* Modal Close Button */}
            <button
              onClick={onClose}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Close modal"
            >
              <X size={20} color="#FFFFFF" />
            </button>
          </div>
        </div>

        {/* Dedicated Vehicle Showcase: Full, Uncropped, Studio Lighting */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          background: 'radial-gradient(ellipse at 50% 60%, #222735 0%, #0E1117 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 24px',
          overflow: 'hidden'
        }}>
          <img
            src={vehicle.image}
            alt={vehicle.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 16px 28px rgba(0,0,0,0.65))',
              transition: 'transform 0.3s ease'
            }}
          />
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
                  <ShieldCheck size={16} color="var(--accent-gold-primary)" /> {vehicle.passengerDisplay || `${vehicle.passengerCapacity || 4} Passengers + Chauffeur`}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-charcoal-800)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--accent-gold-primary)" /> {vehicle.luggageDisplay || `${vehicle.luggageCapacity || 3} Bags / Luggage`}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--accent-gold-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--accent-gold-primary)" /> Uniformed Chauffeur Included
                </span>
              </div>

              {/* Form Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <Input
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={User}
                  placeholder="e.g. Vikramaditya"
                  required
                />
                <Input
                  label="WhatsApp Mobile Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={Phone}
                  placeholder="+91 76250 59665"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <LocationAutocompleteInput
                  label="Pickup Location in Bengaluru"
                  placeholder="Type location (e.g. Ba, Airport, UB City...)"
                  value={formData.pickup}
                  onChange={handleLocationChange('pickup')}
                  name="pickup"
                  required
                />

                <LocationAutocompleteInput
                  label="Destination / Drop Location"
                  placeholder="Type destination (e.g. Airport, Coorg, Mysuru...)"
                  value={formData.drop}
                  onChange={handleLocationChange('drop')}
                  name="drop"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <Input
                  label="Select Tariff Package"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  icon={Clock}
                  options={[
                    { value: '8h', label: `Local Full Day — 8 Hours / 80 Kms (₹${priceStr})` },
                    { value: '4h', label: `Local Half Day — 4 Hours / 40 Kms` },
                    { value: 'airport', label: `Kempegowda Airport Flat VIP Transfer` },
                    { value: 'outstation', label: `Outstation Long Distance Journey` }
                  ]}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Input
                    label="Pickup Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    icon={Calendar}
                    required
                  />
                  <Input
                    label="Pickup Time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    icon={Clock}
                    required
                  />
                </div>
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
                  marginTop: '6px'
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
                <span>Confirm & Request via WhatsApp</span>
                <ChevronRight size={18} />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
};
