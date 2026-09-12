import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  MapPin, Navigation, Calendar, Clock, User, Phone, X, 
  CheckCircle2, ShieldCheck, ChevronRight, Car, Sparkles, Check
} from 'lucide-react';
import { LocationAutocompleteInput } from '../common/LocationAutocompleteInput';
import { SITE_CONFIG } from '../../config/site';
import { WhatsAppIcon } from '../common/WhatsAppEnquiryMenu';
import { formatCurrency } from '../../services/tariffApi';

const getTodayDateStr = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const TariffEnquiryModal = ({ tariff, isOpen, onClose }) => {
  const isOutstation = tariff?.usage_type === 'outstation';

  // State
  const [packageType, setPackageType] = useState(() => {
    if (isOutstation) return 'outstation_roundtrip';
    if (tariff?.eight_hours_eighty_km) return 'local_8h';
    if (tariff?.four_hours_forty_km) return 'local_4h';
    return 'airport_transfer';
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    drop: '',
    date: getTodayDateStr(),
    time: '09:30',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync when tariff prop changes
  useEffect(() => {
    if (tariff) {
      if (tariff.usage_type === 'outstation') {
        setPackageType('outstation_roundtrip');
      } else {
        setPackageType(tariff.eight_hours_eighty_km ? 'local_8h' : 'airport_transfer');
      }
      setSubmitted(false);
    }
  }, [tariff]);

  // Lock body scroll when modal is open
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

  if (!isOpen || !tariff) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getPackagePriceDisplay = (pkg) => {
    if (pkg === 'local_8h') {
      return tariff.eight_hours_eighty_km ? formatCurrency(tariff.eight_hours_eighty_km) : null;
    }
    if (pkg === 'local_4h') {
      return tariff.four_hours_forty_km ? formatCurrency(tariff.four_hours_forty_km) : null;
    }
    if (pkg === 'airport_transfer') {
      return tariff.airport_transfer ? formatCurrency(tariff.airport_transfer) : null;
    }
    if (pkg === 'outstation_roundtrip' || pkg === 'outstation_oneway') {
      return tariff.rate_per_km ? `₹${tariff.rate_per_km}/km` : null;
    }
    return null;
  };

  const packageOptions = isOutstation ? [
    {
      id: 'outstation_roundtrip',
      title: 'Round Trip Return',
      desc: `${tariff.minimum_km_per_day || 300} km/day min`,
      rate: `₹${tariff.rate_per_km || 23}/km`
    },
    {
      id: 'outstation_oneway',
      title: 'One-Way Drop',
      desc: 'Interstate / Intercity transit',
      rate: `₹${tariff.rate_per_km || 23}/km`
    },
    {
      id: 'outstation_multicity',
      title: 'Multi-City Tour',
      desc: 'Karnataka & South India',
      rate: `₹${tariff.rate_per_km || 23}/km`
    }
  ] : [
    {
      id: 'local_8h',
      title: '8 Hours / 80 Kms',
      desc: 'Full Day City Disposal',
      rate: tariff.eight_hours_eighty_km ? formatCurrency(tariff.eight_hours_eighty_km) : 'On Request'
    },
    ...(tariff.four_hours_forty_km ? [{
      id: 'local_4h',
      title: '4 Hours / 40 Kms',
      desc: 'Half Day Quick Mobility',
      rate: formatCurrency(tariff.four_hours_forty_km)
    }] : []),
    ...(tariff.airport_transfer ? [{
      id: 'airport_transfer',
      title: 'Airport Transfer',
      desc: 'Kempegowda BLR Airport Flat',
      rate: formatCurrency(tariff.airport_transfer)
    }] : []),
    {
      id: 'local_12h',
      title: '12 Hours / 120 Kms',
      desc: 'Extended Day / Delegation',
      rate: tariff.eight_hours_eighty_km ? `₹${Math.round(tariff.eight_hours_eighty_km * 1.45)}` : 'On Request'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter your full name.');
      return;
    }
    const cleanPhone = (formData.phone || '').replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile / WhatsApp number.');
      return;
    }
    if (!formData.pickup.trim()) {
      alert('Please provide a pickup location.');
      return;
    }

    const selectedPkg = packageOptions.find(p => p.id === packageType) || packageOptions[0];

    // Build WhatsApp message lines
    const lines = [
      `*TARIFF ENQUIRY - SIDDHU CAR RENTALS BANGALORE*`,
      `----------------------------------------`,
      `🚘 *Vehicle Variant:* ${tariff.vehicle_variant}`,
      `📌 *Service Category:* ${isOutstation ? 'Outstation Travel' : 'Local City Disposal'}`,
      `⏱️ *Package / Mode:* ${selectedPkg.title} (${selectedPkg.rate})`,
      `📍 *Pickup Location:* ${formData.pickup}`,
    ];

    if (formData.drop.trim()) {
      lines.push(`🎯 *Destination / Drop:* ${formData.drop}`);
    }

    lines.push(
      `📅 *Pickup Date:* ${formData.date}`,
      `⏰ *Pickup Time:* ${formData.time}`,
      `----------------------------------------`,
      `👤 *Guest Name:* ${formData.name}`,
      `📱 *Mobile / WhatsApp:* ${formData.phone}`
    );

    if (formData.notes.trim()) {
      lines.push(`📝 *Special Instructions:* ${formData.notes}`);
    }

    // Rate breakdown summary
    if (isOutstation) {
      lines.push(
        `----------------------------------------`,
        `💰 *Tariff Card Basis:* Min ${tariff.minimum_km_per_day || 300} km/day @ ₹${tariff.rate_per_km}/km • Driver Bata: ₹${tariff.driver_allowance || 500}/day`
      );
    } else {
      lines.push(
        `----------------------------------------`,
        `💰 *Tariff Card Basis:* Extra Hr: ₹${tariff.extra_hour || 0}/hr • Extra KM: ₹${tariff.extra_km || 0}/km • Night Bata: ₹${tariff.night_local_bata || 300}`
      );
    }

    lines.push(`----------------------------------------`, `Please share final quote and confirm chauffeur availability.`);

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://api.whatsapp.com/send?phone=${SITE_CONFIG?.whatsapp?.phone || '917625059665'}&text=${message}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);
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
        padding: '24px 16px',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        overflowY: 'auto'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto',
          background: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          margin: 'auto'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '22px 26px 18px',
          background: '#12151C',
          borderRadius: '20px 20px 0 0',
          borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(197, 160, 89, 0.2)',
                color: '#F59E0B',
                padding: '3px 9px',
                borderRadius: '6px',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                {isOutstation ? '🛣️ OUTSTATION HIGHWAY TARIFF' : '📍 BENGALURU LOCAL DISPOSAL'}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>• Official Rate Card</span>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
              fontWeight: '800',
              color: '#FFFFFF',
              margin: '0 0 4px',
              lineHeight: 1.25
            }}>
              {tariff.vehicle_variant}
            </h2>

            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8' }}>
              Garage to Garage • Professional Uniformed Chauffeur
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EF4444';
              e.currentTarget.style.borderColor = '#EF4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 26px 28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#DCFCE7',
                color: '#15803D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                Enquiry Sent to WhatsApp!
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', maxWidth: '420px', margin: '0 auto 24px', lineHeight: 1.5 }}>
                Your enquiry for <strong>{tariff.vehicle_variant}</strong> has been prepared. If WhatsApp did not open automatically, click the button below.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    background: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <WhatsAppIcon size={18} /> Re-open WhatsApp
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    background: '#F1F5F9',
                    color: '#334155',
                    border: '1px solid #CBD5E1',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Package Selection Pills */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  color: '#475569',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '8px'
                }}>
                  <Clock size={13} color="#F59E0B" />
                  <span>Choose Rental Package / Trip Type *</span>
                </label>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                  gap: '10px'
                }}>
                  {packageOptions.map((pkg) => {
                    const isSelected = packageType === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setPackageType(pkg.id)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid #F59E0B' : '1px solid #E2E8F0',
                          background: isSelected ? '#FEF3C7' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: isSelected ? '0 4px 12px rgba(245, 158, 11, 0.15)' : 'none'
                        }}
                      >
                        <div style={{ fontSize: '0.82rem', fontWeight: '800', color: isSelected ? '#92400E' : '#1E293B', marginBottom: '2px' }}>
                          {pkg.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: isSelected ? '#B45309' : '#64748B', marginBottom: '4px' }}>
                          {pkg.desc}
                        </div>
                        <div style={{ fontSize: '0.92rem', fontWeight: '800', color: isSelected ? '#B45309' : '#0F172A' }}>
                          {pkg.rate}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Locations Row with Autocomplete */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                <LocationAutocompleteInput
                  label="Pickup Location *"
                  placeholder="e.g. Bangalore, Banashankari, Airport..."
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleInputChange}
                  required
                />
                <LocationAutocompleteInput
                  label={isOutstation ? "Destination / Outstation City *" : "Drop / Destination Location"}
                  placeholder={isOutstation ? "e.g. Mysuru Palace, Coorg, Ooty, Hampi..." : "e.g. Kempegowda Airport T1 / Hotel..."}
                  name="drop"
                  value={formData.drop}
                  onChange={handleInputChange}
                  icon={Navigation}
                  required={isOutstation}
                />
              </div>

              {/* Date & Time Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.74rem',
                    fontWeight: '800',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '6px'
                  }}>
                    <Calendar size={13} color="#F59E0B" />
                    <span>Pickup Date *</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={getTodayDateStr()}
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '11px 13px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      background: '#F8FAFC',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.74rem',
                    fontWeight: '800',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '6px'
                  }}>
                    <Clock size={13} color="#F59E0B" />
                    <span>Pickup Time *</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '11px 13px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      background: '#F8FAFC',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Guest Details Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.74rem',
                    fontWeight: '800',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '6px'
                  }}>
                    <User size={13} color="#F59E0B" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Anand Sharma"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '11px 13px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      background: '#F8FAFC',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.74rem',
                    fontWeight: '800',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '6px'
                  }}>
                    <Phone size={13} color="#F59E0B" />
                    <span>Mobile / WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '11px 13px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      background: '#F8FAFC',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Official Tariff Card Box */}
              <div style={{
                background: '#FDFBF7',
                borderRadius: '14px',
                padding: '14px 16px',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#92400E' }}>
                    Official Tariff Card Breakdown
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: '700' }}>
                    ✓ 100% Transparent • Zero Hidden Costs
                  </div>
                </div>

                {isOutstation ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', fontSize: '0.8rem', color: '#334155' }}>
                    <div>Min. KM / Day: <strong>{tariff.minimum_km_per_day || 300} km</strong></div>
                    <div>Rate / KM: <strong>₹{tariff.rate_per_km}/km</strong></div>
                    <div>Driver Allowance: <strong>₹{tariff.driver_allowance}/day</strong></div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', fontSize: '0.8rem', color: '#334155' }}>
                    <div>8h / 80km: <strong>{formatCurrency(tariff.eight_hours_eighty_km)}</strong></div>
                    <div>Extra Hour: <strong>₹{tariff.extra_hour}/hr</strong></div>
                    <div>Extra KM: <strong>₹{tariff.extra_km}/km</strong></div>
                    <div>Night Local Bata: <strong>₹{tariff.night_local_bata}</strong></div>
                  </div>
                )}
                <div style={{ fontSize: '0.7rem', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: '6px', marginTop: '2px' }}>
                  * Garage to garage calculation. Toll, state permit & GST (5%) charged on actuals.
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  style={{
                    flex: '1 1 240px',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 26px rgba(37, 211, 102, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.3)';
                  }}
                >
                  <WhatsAppIcon size={20} />
                  <span>Confirm Enquiry via WhatsApp</span>
                  <ChevronRight size={16} />
                </button>

                <a
                  href={`tel:${SITE_CONFIG?.contact?.phone || SITE_CONFIG?.company?.phone || SITE_CONFIG?.whatsapp?.phone || '917625059665'}`}
                  style={{
                    padding: '14px 20px',
                    borderRadius: '12px',
                    background: '#12151C',
                    color: '#C5A059',
                    border: '1px solid #C5A059',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Phone size={15} />
                  <span>Call 24/7 Desk</span>
                </a>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
