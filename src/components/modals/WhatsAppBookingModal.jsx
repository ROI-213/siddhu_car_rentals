import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Clock, User, Phone, MapPin, Users, FileText, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { WhatsAppIcon } from '../common/WhatsAppEnquiryMenu';
import { LocationAutocompleteInput } from '../common/LocationAutocompleteInput';

const getTodayDateStr = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const WhatsAppBookingModal = ({
  isOpen,
  onClose,
  serviceType,
  context = {}
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: context.pickup || '',
    drop: context.drop || '',
    date: context.date || '',
    time: context.time || '10:00',
    returnDate: context.returnDate || '',
    returnTime: context.returnTime || '18:00',
    passengers: context.passengers || '2',
    packageDuration: '8h',
    airportDirection: 'drop',
    notes: context.message || ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      // Pre-fill / sync formData whenever modal opens with new context
      setFormData(prev => ({
        ...prev,
        pickup: context.pickup !== undefined ? context.pickup : (prev.pickup || 'Bengaluru, Karnataka'),
        drop: context.drop !== undefined ? context.drop : prev.drop,
        date: context.date || prev.date || getTodayDateStr(),
        time: context.time || prev.time || '10:00',
        returnDate: context.returnDate || prev.returnDate || '',
        returnTime: context.returnTime || prev.returnTime || '18:00',
        passengers: context.passengers || prev.passengers || '2',
        packageDuration: context.packageDuration || prev.packageDuration || '8h',
        notes: context.message !== undefined ? context.message : prev.notes
      }));

      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose, context]);

  if (!isOpen) return null;

  const typeId = typeof serviceType === 'string'
    ? serviceType
    : (serviceType?.id || 'general');

  const typeLabels = {
    airport: 'Airport VIP Transfer',
    local: 'Local City Rental',
    outstation: 'Outstation Trip',
    luxury: 'Luxury Car Booking',
    corporate: 'Corporate Booking',
    wedding: 'Wedding / Event',
    general: 'General Enquiry'
  };

  const typeIcons = {
    airport: '✈️',
    local: '📍',
    outstation: '🛣️',
    luxury: '✨',
    corporate: '💼',
    wedding: '💒',
    general: '💬'
  };

  const typeLabel = (typeof serviceType === 'object' && serviceType?.label)
    ? serviceType.label
    : (typeLabels[typeId] || 'General Enquiry');

  const typeIcon = (typeof serviceType === 'object' && serviceType?.icon)
    ? serviceType.icon
    : (typeIcons[typeId] || '💬');

  const vehicleName = context.vehicleName || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (fieldName) => (e) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct professional WhatsApp message
    const lines = [];
    lines.push(`*NEW BOOKING ENQUIRY - SIDDHU CAR RENTALS*`);
    lines.push(`----------------------------------------`);
    lines.push(`🛎️ *Service:* ${typeLabel}`);
    if (vehicleName) {
      lines.push(`🚘 *Vehicle:* ${vehicleName}`);
    }
    lines.push(`👤 *Name:* ${formData.name}`);
    lines.push(`📱 *WhatsApp:* ${formData.phone}`);
    lines.push(`📍 *Pickup:* ${formData.pickup || 'To be shared'}`);

    if (formData.drop) {
      lines.push(`🎯 *Destination:* ${formData.drop}`);
    }

    if (typeId === 'airport') {
      lines.push(`✈️ *Transfer Type:* ${formData.airportDirection === 'drop' ? 'City to Airport Drop' : 'Airport to City Pickup'}`);
    } else if (typeId === 'local') {
      const durationMap = {
        '8h': '8 Hours / 80 Kms (Full Day)',
        '4h': '4 Hours / 40 Kms (Half Day)',
        '12h': '12 Hours / 120 Kms (Extended Day)'
      };
      lines.push(`⏱️ *Duration:* ${durationMap[formData.packageDuration] || formData.packageDuration}`);
    }

    if (formData.date) {
      lines.push(`📅 *Date:* ${formData.date} at ${formData.time || '10:00 AM'}`);
    }

    if (typeId === 'outstation' && formData.returnDate) {
      lines.push(`🔄 *Return:* ${formData.returnDate} at ${formData.returnTime || '06:00 PM'}`);
    }

    if (formData.passengers) {
      lines.push(`👥 *Passengers:* ${formData.passengers} Pax`);
    }

    if (formData.notes) {
      lines.push(`📝 *Special Request:* ${formData.notes}`);
    }

    lines.push(`----------------------------------------`);
    lines.push(`Please confirm availability and share the best quote. Thank you!`);

    const fullMessage = lines.join('\n');
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(fullMessage)}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(15, 23, 42, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflowY: 'auto'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          margin: 'auto'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '22px 28px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: '24px 24px 0 0',
          borderBottom: '1.5px solid rgba(197, 160, 89, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(37, 211, 102, 0.15)',
              border: '1px solid rgba(37, 211, 102, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              flexShrink: 0
            }}>
              {typeIcon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#25D366' }}>
                  WhatsApp Direct Enquiry
                </span>
                {vehicleName && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold-primary)', fontWeight: '700' }}>
                    • {vehicleName}
                  </span>
                )}
              </div>
              <h3 style={{
                margin: '2px 0 0',
                fontSize: '1.35rem',
                fontWeight: '800',
                color: '#FFFFFF',
                letterSpacing: '-0.01em'
              }}>
                {typeLabel}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body */}
        <div style={{ padding: '28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <CheckCircle2 size={54} color="#25D366" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                Redirecting to WhatsApp...
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto', lineHeight: '1.6' }}>
                Your enquiry details have been prepared. Please tap <strong>Send</strong> in WhatsApp to connect directly with our Bengaluru reservation manager!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Trust Badge Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                fontSize: '0.78rem',
                color: '#334155',
                fontWeight: '600'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#25D366" /> 100% Verified Chauffeurs
                </span>
                <span style={{ color: '#94A3B8' }}>•</span>
                <span>Transparent GST Billing</span>
                <span style={{ color: '#94A3B8' }}>•</span>
                <span>Instant 24/7 Response</span>
              </div>

              {/* Row 1: Name & Phone Number */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Your Full Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Kumar"
                      required
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px 0 42px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.92rem',
                        fontWeight: '600',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    WhatsApp Mobile Number <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px 0 42px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.92rem',
                        fontWeight: '600',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Pickup Location & Drop Location with Autocomplete Suggestions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <LocationAutocompleteInput
                  label="Pickup Location in Bengaluru"
                  placeholder="Type location (e.g. Ba, Airport, UB City...)"
                  value={formData.pickup}
                  onChange={handleLocationChange('pickup')}
                  name="pickup"
                  required
                />

                <LocationAutocompleteInput
                  label="Drop / Destination Location"
                  placeholder="Type destination (e.g. Airport, Coorg, Mysuru...)"
                  value={formData.drop}
                  onChange={handleLocationChange('drop')}
                  name="drop"
                  required={typeId === 'airport' || typeId === 'outstation'}
                />
              </div>

              {/* Row 3: Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Travel Date <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="date"
                      min={getTodayDateStr()}
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px 0 42px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.92rem',
                        fontWeight: '600',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Pickup Time
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Clock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px 0 42px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.92rem',
                        fontWeight: '600',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Passengers
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Users size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px 0 42px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.92rem',
                        fontWeight: '600',
                        outline: 'none',
                        background: '#FFFFFF',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="1">1 Passenger</option>
                      <option value="2">2 Passengers</option>
                      <option value="3">3 Passengers</option>
                      <option value="4">4 Passengers</option>
                      <option value="5">5 Passengers</option>
                      <option value="6">6 Passengers</option>
                      <option value="7+">7+ Passengers (Van / Bus)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contextual Fields based on Service Type */}
              {typeId === 'airport' && (
                <div style={{ display: 'flex', gap: '12px', padding: '12px 16px', background: '#F0F9FF', borderRadius: '12px', border: '1px solid #BAE6FD' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', color: '#0369A1' }}>
                    <input
                      type="radio"
                      name="airportDirection"
                      value="drop"
                      checked={formData.airportDirection === 'drop'}
                      onChange={handleChange}
                    />
                    City to Airport Drop
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', color: '#0369A1' }}>
                    <input
                      type="radio"
                      name="airportDirection"
                      value="pickup"
                      checked={formData.airportDirection === 'pickup'}
                      onChange={handleChange}
                    />
                    Airport to City Pickup
                  </label>
                </div>
              )}

              {typeId === 'outstation' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      Return Date (Optional)
                    </label>
                    <input
                      type="date"
                      min={formData.date || getTodayDateStr()}
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      Return Time
                    </label>
                    <input
                      type="time"
                      name="returnTime"
                      value={formData.returnTime}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Special Notes */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Special Notes / Luggage / Preferred Vehicle (Optional)
                </label>
                <div style={{ position: 'relative' }}>
                  <FileText size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94A3B8' }} />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={2}
                    placeholder="e.g. Flight number, need baby seat, English-speaking driver, corporate billing..."
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: '500',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  height: '52px',
                  borderRadius: '12px',
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
                <span>Submit & Continue on WhatsApp</span>
                <ChevronRight size={18} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#94A3B8' }}>
                Your request opens WhatsApp with a pre-filled summary. Zero spam guarantee.
              </div>

            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
