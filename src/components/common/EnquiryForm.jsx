import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Car, Phone, User, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Input } from './Input';
import { LocationAutocompleteInput } from './LocationAutocompleteInput';
import { WhatsAppIcon } from './WhatsAppEnquiryMenu';
import { SITE_CONFIG } from '../../config/site';
import { DEFAULT_OUTSTATION_TARIFFS } from '../../services/tariffApi';

const getVehicleCategory = (variant) => {
  const v = (variant || '').toLowerCase();
  if (v.includes('bus')) return 'buses';
  if (v.includes('tempo') || v.includes('urbania') || v.includes('commuter')) return 'vans';
  if (v.includes('merc') || v.includes('bmw') || v.includes('audi') || v.includes('camry') || v.includes('fortuner') || v.includes('vellfi')) return 'luxury';
  return 'sedan_mpv';
};

export const EnquiryForm = ({ 
  title = "Reserve Executive Mobility", 
  subtitle = "Instant Fare Estimate & Guaranteed Vehicle Dispatch",
  defaultTripType = 'local',
  fixedTripType = null
}) => {
  const isFixedOutstation = fixedTripType === 'outstation';
  const isFixedLocal = fixedTripType === 'local';
  
  const [tripType, setTripType] = useState(fixedTripType || defaultTripType);
  const [outstationJourneyType, setOutstationJourneyType] = useState('roundtrip'); // 'roundtrip' | 'oneway' | 'multicity'
  const [selectedOutstationId, setSelectedOutstationId] = useState(23); // Innova Crysta default
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    packageDuration: '8h',
    date: '',
    returnDate: '',
    vehicle: 'innova_crysta',
    name: '',
    phone: ''
  });

  const activeOutstationVehicle = DEFAULT_OUTSTATION_TARIFFS.find(v => v.id === selectedOutstationId) || DEFAULT_OUTSTATION_TARIFFS[2];

  const filteredOutstationVehicles = DEFAULT_OUTSTATION_TARIFFS.filter(v => {
    if (selectedCategory === 'all') return true;
    return getVehicleCategory(v.vehicle_variant) === selectedCategory;
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
      innova_crysta: 'Toyota Innova Crysta (7-Seater VIP)',
      innova_hycross: 'Toyota Innova Hycross Hybrid',
      fortuner: 'Toyota Fortuner Legender (SUV)',
      dzire_etios: 'Sedan (Dzire / Etios / Amaze)',
      urbania_16: 'Force Urbania Luxury Van (16+1)',
      tempo_12: 'Tempo Traveller A/C (12-Seater)',
      bmw_5: 'BMW 5 Series / Merc E-Class / Audi A6',
      audi_a6: 'Audi A6 (Luxury Sedan)',
      bus_32: '32 Seater A/C Bus'
    };

    const outstationJourneyLabels = {
      roundtrip: 'Round Trip (Return) - Min 300 km/day',
      oneway: 'One-Way Intercity Drop',
      multicity: 'Multi-City Tour'
    };

    const isOutstationActive = isFixedOutstation || tripType === 'outstation';

    const lines = [
      `*${isOutstationActive ? 'OUTSTATION HIGHWAY' : 'NEW BOOKING'} ENQUIRY - SIDDHU CAR RENTALS*`,
      `----------------------------------------`,
      isOutstationActive
        ? `🛣️ *Journey Type:* ${outstationJourneyLabels[outstationJourneyType] || 'Outstation Trip'}`
        : `🛎️ *Trip Type:* ${tripType.toUpperCase()}`,
      `🚘 *Vehicle Variant:* ${isOutstationActive ? activeOutstationVehicle.vehicle_variant : (vehicleLabels[formData.vehicle] || formData.vehicle)}`,
      isOutstationActive
        ? `💰 *Official Tariff Rate:* ₹${activeOutstationVehicle.rate_per_km}/km (Min ${activeOutstationVehicle.minimum_km_per_day} km/day • Driver Bata ₹${activeOutstationVehicle.driver_allowance}/day)`
        : null,
      `----------------------------------------`,
      `👤 *Guest Name:* ${formData.name}`,
      `📱 *WhatsApp:* ${formData.phone}`,
      `📍 *Pickup Location:* ${formData.pickup || 'Bengaluru'}`,
      (formData.destination || isOutstationActive) ? `🎯 *Destination / Route:* ${formData.destination}` : null,
      formData.date ? `📅 *Departure Date:* ${formData.date}` : null,
      isOutstationActive && outstationJourneyType !== 'oneway' && formData.returnDate
        ? `🔄 *Return Date:* ${formData.returnDate}`
        : null,
      tripType === 'local' && !isFixedOutstation ? `⏱️ *Package:* ${formData.packageDuration}` : null,
      `----------------------------------------`,
      isOutstationActive
        ? `Please confirm vehicle availability and driver details.`
        : `Please confirm vehicle availability and send exact quote.`
    ].filter(Boolean);

    const waPhone = SITE_CONFIG?.whatsapp?.phone || '917625059665';
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <GlassCard variant="glowing" style={{ padding: '32px', maxWidth: (isFixedOutstation || tripType === 'outstation') ? '820px' : '640px', width: '100%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold-primary)', fontWeight: '700' }}>
          {subtitle}
        </div>
        <h3 className="text-h2" style={{ fontSize: '1.75rem', marginTop: '4px' }}>
          {title}
        </h3>
      </div>

      {/* Trip Type Tabs or Outstation Mode Selector */}
      {fixedTripType ? (
        fixedTripType === 'outstation' ? (
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-charcoal-700)', marginBottom: '8px' }}>
              Select Outstation Journey Mode
            </label>
            <div style={{ display: 'flex', gap: '8px', padding: '4px', background: 'rgba(0,0,0,0.04)', borderRadius: '10px' }}>
              {[
                { id: 'roundtrip', label: '🔄 Round Trip (Return)' },
                { id: 'oneway', label: '🔀 One-Way Drop' },
                { id: 'multicity', label: '🗺️ Multi-City Tour' }
              ].map(mode => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setOutstationJourneyType(mode.id)}
                  style={{
                    flex: 1,
                    padding: '9px 6px',
                    border: 'none',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.82rem',
                    fontWeight: outstationJourneyType === mode.id ? '700' : '500',
                    background: outstationJourneyType === mode.id ? '#FFFFFF' : 'transparent',
                    color: outstationJourneyType === mode.id ? 'var(--accent-gold-primary)' : 'var(--color-charcoal-700)',
                    boxShadow: outstationJourneyType === mode.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-500)', marginTop: '6px', textAlign: 'center' }}>
              {outstationJourneyType === 'roundtrip' && '✨ Standard outstation package with 300 km/day minimum. Chauffeur remains with you.'}
              {outstationJourneyType === 'oneway' && '✨ Point-to-point drop to any destination city across Karnataka and South India.'}
              {outstationJourneyType === 'multicity' && '✨ Custom multi-stop itinerary across hill stations, heritage sites, and major cities.'}
            </div>
          </div>
        ) : null
      ) : (
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
      )}

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
            {isFixedOutstation || tripType === 'outstation' ? (
              <LocationAutocompleteInput
                label="Destination City / Highway Route"
                placeholder="Type destination (e.g. Mysuru, Coorg, Ooty, Chikmagalur...)"
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

          {/* Date Row */}
          <div style={{ display: 'grid', gridTemplateColumns: (isFixedOutstation || tripType === 'outstation') && outstationJourneyType !== 'oneway' ? '1fr 1fr' : '1fr', gap: '16px' }}>
            <Input
              label={(isFixedOutstation || tripType === 'outstation') ? "Departure Date" : "Travel Date"}
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              icon={Calendar}
              required
            />
            {(isFixedOutstation || tripType === 'outstation') && outstationJourneyType !== 'oneway' && (
              <Input
                label="Return Date"
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                icon={Calendar}
                required
              />
            )}
          </div>

          {/* Vehicle Selection: Dedicated Interactive Grid for Outstation */}
          {(isFixedOutstation || tripType === 'outstation') ? (
            <div style={{ marginTop: '6px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-charcoal-800)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Car size={16} color="var(--accent-gold-primary)" />
                  <span>Select Outstation Vehicle ({filteredOutstationVehicles.length} available) *</span>
                </label>
                <span style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> Official Per-Km Rates (300 km/day min)
                </span>
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
                {[
                  { id: 'all', label: 'All Fleet (20)' },
                  { id: 'sedan_mpv', label: 'Sedans & MPVs (4)' },
                  { id: 'luxury', label: 'Luxury & SUVs (7)' },
                  { id: 'vans', label: 'Vans & Travellers (4)' },
                  { id: 'buses', label: 'Coaches & Buses (5)' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      border: selectedCategory === cat.id ? '1px solid #C5A059' : '1px solid rgba(0,0,0,0.08)',
                      background: selectedCategory === cat.id ? '#12151C' : '#FFFFFF',
                      color: selectedCategory === cat.id ? '#C5A059' : 'var(--color-charcoal-700)',
                      fontSize: '0.76rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* 20 Vehicles Grid */}
              <div 
                style={{ 
                  maxHeight: '290px', 
                  overflowY: 'auto', 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                  gap: '10px',
                  padding: '4px',
                  marginTop: '6px',
                  borderRadius: '12px'
                }}
              >
                {filteredOutstationVehicles.map((v) => {
                  const isSelected = selectedOutstationId === v.id;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedOutstationId(v.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #C5A059' : '1px solid rgba(0,0,0,0.09)',
                        background: isSelected ? 'linear-gradient(135deg, rgba(197,160,89,0.14) 0%, rgba(255,255,255,0.98) 100%)' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        boxShadow: isSelected ? '0 4px 14px rgba(197,160,89,0.25)' : '0 1px 3px rgba(0,0,0,0.03)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.88rem', color: isSelected ? '#12151C' : 'var(--color-charcoal-900)', lineHeight: '1.3' }}>
                          {v.vehicle_variant}
                        </div>
                        <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-gold-primary)' }}>
                            ₹{v.rate_per_km}<span style={{ fontSize: '0.72rem', fontWeight: '600' }}>/km</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: 'var(--color-charcoal-600)', paddingTop: '4px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                        <span>Min. {v.minimum_km_per_day} km/day • Bata ₹{v.driver_allowance}/day</span>
                        {isSelected && (
                          <span style={{ color: '#16A34A', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem' }}>
                            <CheckCircle2 size={13} /> Selected
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Vehicle Banner Confirmation */}
              {activeOutstationVehicle && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: '#12151C',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontSize: '0.84rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Car size={16} color="#C5A059" />
                    <div>
                      <span style={{ color: '#94A3B8' }}>Selected: </span>
                      <strong style={{ color: '#FFFFFF' }}>{activeOutstationVehicle.vehicle_variant}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
                    <span style={{ color: '#C5A059', fontWeight: '800', fontSize: '0.95rem' }}>₹{activeOutstationVehicle.rate_per_km}/km</span>
                    <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>(Min {activeOutstationVehicle.minimum_km_per_day} km/day • Driver ₹{activeOutstationVehicle.driver_allowance}/day)</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
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
          )}

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
