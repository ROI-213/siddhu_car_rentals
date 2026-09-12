import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Plane, MapPin, Compass, Briefcase, Crown, Sparkles, Users, Calendar, Clock,
  User, Phone, Mail, Car, Check, ChevronRight, ChevronLeft, ShieldCheck, X,
  CheckCircle2, RotateCw, Navigation, Building2, Luggage, Receipt, FileCheck
} from 'lucide-react';
import { fleetData } from '../../data/fleetData';
import { pricingService } from '../../services/pricingService';
import { SITE_CONFIG } from '../../config/site';
import { WhatsAppIcon } from '../common/WhatsAppEnquiryMenu';
import { searchLocalLocations, searchLocationsAsync } from '../../data/locationsData';
import './ServiceJourneyModal.css';

const SERVICES_CONFIG = [
  {
    id: 'airport',
    title: 'AIRPORT TRANSFER',
    headline: 'Airport VIP Chauffeur Transfer',
    subtitle: 'Kempegowda International Airport (BLR) • 24/7 Flight Tracking & VIP Meet-and-Greet',
    icon: Plane,
    badge: 'Airport Flat Rate'
  },
  {
    id: 'local',
    title: 'LOCAL RENTAL',
    headline: 'Bengaluru City Chauffeur Rental',
    subtitle: 'Hourly & Full-Day City Mobility with Dedicated Driver',
    icon: MapPin,
    badge: 'Hourly Packages'
  },
  {
    id: 'outstation',
    title: 'OUTSTATION TRIPS',
    headline: 'Outstation Interstate & Weekend Getaways',
    subtitle: 'Bengaluru to South India • Clean Yellow-Board Sedans, SUVs & MPVs',
    icon: Compass,
    badge: 'Transparent /km'
  },
  {
    id: 'corporate',
    title: 'CORPORATE TRAVEL',
    headline: 'Corporate Executive Mobility',
    subtitle: 'C-Suite Delegations, Tech Park Shuttles & B2B GST Invoicing',
    icon: Briefcase,
    badge: 'Corporate B2B Billing'
  },
  {
    id: 'luxury',
    title: 'LUXURY CARS',
    headline: 'Ultra-Luxury Flagship Chauffeur Service',
    subtitle: 'Mercedes S-Class, BMW 7-Series, Toyota Vellfire & Audi Q7',
    icon: Crown,
    badge: 'Flagship VIP'
  },
  {
    id: 'wedding',
    title: 'WEDDINGS & EVENTS',
    headline: 'Wedding & Ceremonial Event Fleet',
    subtitle: 'Floral Decorated Bridal Cars, Groom Entry Convoys & Guest Transportation',
    icon: Sparkles,
    badge: 'Decorated Fleet'
  },
  {
    id: 'group',
    title: 'GROUP TRAVEL',
    headline: 'Executive Group & Delegation Travel',
    subtitle: 'Force Travellers, HiAce VIP Commuters & Tourist Coaches',
    icon: Users,
    badge: 'High-Capacity Coaches'
  }
];

const POPULAR_OUTSTATION_DESTINATIONS = [
  'Mysuru (Mysore)',
  'Coorg (Madikeri)',
  'Chikmagalur',
  'Ooty & Nilgiris',
  'Hampi Heritage',
  'Wayanad',
  'Tirupati Balaji',
  'Pondicherry',
  'Sakleshpur Hills'
];

const getTodayDateStr = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SjmLocationAutocomplete = ({
  value = '',
  onChange,
  placeholder = 'Type area, landmark, airport, hotel...',
  name = 'location'
}) => {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isFocused && !isOpen) return;

    const trimmed = (query || '').trim();

    if (!trimmed) {
      // Default top suggestions when focused with empty query
      const popular = searchLocalLocations('Bangalore', 6);
      setSuggestions(popular);
      setIsLoading(false);
      return;
    }

    // 1. Instant curated local search (0ms)
    const localMatches = searchLocalLocations(trimmed, 8);
    setSuggestions(localMatches);

    // 2. Debounced asynchronous search for broader cities/addresses
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (localMatches.length < 5 && trimmed.length >= 3) {
      setIsLoading(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const asyncResults = await searchLocationsAsync(trimmed, 8);
          if (asyncResults && asyncResults.length > 0) {
            setSuggestions(asyncResults);
          }
        } catch (err) {
          // ignore network error
        } finally {
          setIsLoading(false);
        }
      }, 200);
    } else {
      setIsLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query, isFocused, isOpen]);

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setQuery(newVal);
    onChange(newVal);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleSelectLocation = (loc) => {
    setQuery(loc.name);
    onChange(loc.name);
    setIsOpen(false);
    setActiveIndex(-1);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleClear = () => {
    setQuery('');
    onChange('');
    setSuggestions([]);
    setIsOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown') setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelectLocation(suggestions[activeIndex]);
      } else if (suggestions.length > 0) {
        e.preventDefault();
        handleSelectLocation(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="sjm-input"
          style={{
            paddingRight: query ? '34px' : '14px',
            borderColor: isFocused ? '#F59E0B' : '#CBD5E1',
            boxShadow: isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.15)' : 'none'
          }}
        />

        {/* Clear button / Loader */}
        <div style={{ position: 'absolute', right: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isLoading && (
            <div style={{ width: '14px', height: '14px', border: '2px solid #F59E0B', borderTopColor: 'transparent', borderRadius: '50%', animation: 'sjmSpin 0.8s linear infinite' }} />
          )}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              style={{
                border: 'none',
                background: '#E2E8F0',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#475569',
                padding: 0
              }}
              title="Clear location"
            >
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Autocomplete Suggestions Popup */}
      {isOpen && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.16)',
            zIndex: 9999999,
            maxHeight: '270px',
            overflowY: 'auto',
            padding: '6px'
          }}
        >
          <div
            style={{
              padding: '6px 10px 4px',
              fontSize: '0.66rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            <span>Verified Locations</span>
            <span style={{ fontSize: '0.64rem', color: '#D97706' }}>Instant Autocomplete</span>
          </div>

          {suggestions.map((loc, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <div
                key={idx}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent blur before select
                  handleSelectLocation(loc);
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  background: isSelected ? '#FEF3C7' : 'transparent',
                  borderLeft: isSelected ? '3px solid #F59E0B' : '3px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>
                  {loc.icon || '📍'}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {loc.name}
                  </div>
                  {loc.subtext && (
                    <div style={{ fontSize: '0.72rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>
                      {loc.subtext}
                    </div>
                  )}
                </div>
                {loc.category && (
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: loc.category === 'airport' ? '#E0F2FE' : loc.category === 'hotel' ? '#FDF2F8' : '#F1F5F9',
                      color: loc.category === 'airport' ? '#0369A1' : loc.category === 'hotel' ? '#BE185D' : '#475569',
                      flexShrink: 0
                    }}
                  >
                    {loc.category}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ServiceJourneyModal = ({
  isOpen,
  onClose,
  initialServiceId = 'airport',
  initialContext = {}
}) => {
  const [activeServiceId, setActiveServiceId] = useState(initialServiceId || 'airport');
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [lastWaUrl, setLastWaUrl] = useState('');
  const stripRef = useRef(null);

  // Auto-scroll the active chip into view inside the strip if needed
  useEffect(() => {
    if (stripRef.current && isOpen) {
      const activeEl = stripRef.current.querySelector('.sjm-service-chip.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeServiceId, isOpen]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickup: 'Bengaluru, Karnataka',
    drop: '',
    date: getTodayDateStr(),
    time: '09:00',
    returnDate: '',
    returnTime: '18:00',
    airportDirection: 'pickup', // pickup or drop
    flightNumber: '',
    terminal: 'Terminal 1',
    localPackage: '8h_80km',
    outstationTripType: 'roundtrip', // roundtrip or oneway
    companyName: '',
    designation: '',
    gstNumber: '',
    corporateScope: 'monthly_fleet',
    corporateFleetCount: '1-3',
    corporateBilling: 'monthly_credit',
    weddingDecor: true,
    eventType: 'Wedding Ceremony',
    passengerCount: '4',
    selectedVehicleId: 'innova-crysta',
    specialNotes: ''
  });

  // Sync state when modal opens or initialService changes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialServiceId) {
        setActiveServiceId(initialServiceId);
      }
      setCurrentStep(1);
      setSubmitted(false);

      // Pre-fill defaults based on service
      if (initialServiceId === 'airport') {
        setFormData(prev => ({
          ...prev,
          pickup: 'Kempegowda International Airport (BLR)',
          drop: 'Hotel Taj West End / Bengaluru City',
          selectedVehicleId: 'innova-crysta'
        }));
      } else if (initialServiceId === 'luxury') {
        setFormData(prev => ({
          ...prev,
          selectedVehicleId: 'mercedes-s-class'
        }));
      } else if (initialServiceId === 'group') {
        setFormData(prev => ({
          ...prev,
          selectedVehicleId: 'traveller'
        }));
      }

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
  }, [isOpen, initialServiceId, onClose]);

  // Handle service switch
  const handleServiceChange = (serviceId) => {
    setActiveServiceId(serviceId);
    if (serviceId === 'airport') {
      setFormData(prev => ({
        ...prev,
        pickup: prev.airportDirection === 'pickup' ? 'Kempegowda International Airport (BLR)' : 'Bengaluru City',
        drop: prev.airportDirection === 'pickup' ? 'Bengaluru City' : 'Kempegowda International Airport (BLR)',
        selectedVehicleId: prev.selectedVehicleId.includes('traveller') || prev.selectedVehicleId.includes('bus') ? 'innova-crysta' : prev.selectedVehicleId
      }));
    } else if (serviceId === 'luxury') {
      setFormData(prev => ({
        ...prev,
        selectedVehicleId: 'mercedes-s-class'
      }));
    } else if (serviceId === 'group') {
      setFormData(prev => ({
        ...prev,
        selectedVehicleId: 'traveller'
      }));
    } else if (serviceId === 'outstation') {
      setFormData(prev => ({
        ...prev,
        drop: prev.drop.includes('Airport') ? 'Mysuru (Mysore)' : (prev.drop || 'Mysuru (Mysore)')
      }));
    }
  };

  // Filter fleet based on selected service
  const filteredFleet = useMemo(() => {
    if (activeServiceId === 'luxury') {
      return fleetData.filter(v => 
        v.categoryKey === 'luxury' || 
        v.id === 'mercedes-e-class' || 
        v.id === 'bmw-5-series' || 
        v.id === 'audi-q7'
      );
    }
    if (activeServiceId === 'group') {
      return fleetData.filter(v => v.categoryKey === 'group');
    }
    if (activeServiceId === 'wedding') {
      return fleetData.filter(v => 
        v.categoryKey === 'luxury' || 
        v.id === 'mercedes-e-class' || 
        v.id === 'bmw-5-series' || 
        v.id === 'toyota-fortuner' || 
        v.id === 'innova-crysta'
      );
    }
    if (activeServiceId === 'corporate') {
      return fleetData.filter(v => 
        v.id === 'mercedes-e-class' || 
        v.id === 'toyota-camry' || 
        v.id === 'innova-hycross' || 
        v.id === 'innova-crysta' || 
        v.id === 'sedan-dzire' ||
        v.id === 'toyota-fortuner'
      );
    }
    // Airport, Local, Outstation
    return fleetData.filter(v => 
      v.id === 'sedan-dzire' || 
      v.id === 'innova-crysta' || 
      v.id === 'innova-hycross' || 
      v.id === 'toyota-fortuner' || 
      v.id === 'toyota-camry' || 
      v.id === 'mercedes-e-class' || 
      v.id === 'mercedes-s-class' || 
      v.id === 'toyota-vellfire' || 
      v.id === 'traveller'
    );
  }, [activeServiceId]);

  // Selected vehicle object
  const selectedVehicle = useMemo(() => {
    return fleetData.find(v => v.id === formData.selectedVehicleId) || filteredFleet[0] || fleetData[0];
  }, [formData.selectedVehicleId, filteredFleet]);

  // Calculate pricing display for selected vehicle
  const getVehicleTariffBadge = (vehicle) => {
    if (!vehicle) return 'Custom Quote';
    if (activeServiceId === 'airport') {
      const price = pricingService.getAirportTransferPrice(vehicle.id);
      return price ? `Flat ${pricingService.formatPrice(price)}` : 'Tariff on Request';
    }
    if (activeServiceId === 'local' || activeServiceId === 'corporate') {
      const t = pricingService.getLocalTariff(vehicle.id);
      const p = formData.localPackage === '4h_40km' ? t?.four_hours_forty_km : t?.eight_hours_eighty_km;
      return p ? `${pricingService.formatPrice(p)} (${formData.localPackage === '4h_40km' ? '4h/40km' : '8h/80km'})` : 'Tariff on Request';
    }
    // Outstation
    const t = pricingService.getOutstationTariff(vehicle.id);
    return t?.rate_per_km ? `${pricingService.formatPrice(t.rate_per_km)}/km` : 'Rate on Request';
  };

  const currentService = SERVICES_CONFIG.find(s => s.id === activeServiceId) || SERVICES_CONFIG[0];

  // Validation
  const validateStep1 = () => {
    if (!formData.name.trim()) {
      alert('Please provide your full name.');
      return false;
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.pickup.trim()) {
      alert('Please enter a pickup address or landmark.');
      return false;
    }
    if (activeServiceId !== 'local' && !formData.drop.trim()) {
      alert('Please enter your destination / drop location.');
      return false;
    }
    return true;
  };

  // Submit directly to WhatsApp
  const handleConfirmWhatsApp = () => {
    const lines = [
      `*NEW JOURNEY ENQUIRY - SIDDHU CAR RENTALS*`,
      `----------------------------------------`,
      `🛎️ *Service Type:* ${currentService.title}`,
      `🚘 *Selected Fleet:* ${selectedVehicle?.name || 'Executive Fleet'}`,
      `💰 *Estimated Tariff:* ${getVehicleTariffBadge(selectedVehicle)}`,
      `👤 *Guest Name:* ${formData.name}`,
      `📱 *Mobile / WhatsApp:* ${formData.phone}`,
    ];

    if (formData.email) {
      lines.push(`✉️ *Email:* ${formData.email}`);
    }

    if (activeServiceId === 'airport') {
      lines.push(`✈️ *Transfer Direction:* ${formData.airportDirection === 'pickup' ? 'Airport Pickup (To City)' : 'Airport Drop (To Airport)'}`);
      lines.push(`📍 *Pickup:* ${formData.pickup}`);
      lines.push(`🎯 *Drop:* ${formData.drop}`);
      if (formData.flightNumber) lines.push(`🛫 *Flight Number:* ${formData.flightNumber}`);
      if (formData.terminal) lines.push(`🏢 *Terminal:* ${formData.terminal}`);
    } else if (activeServiceId === 'local') {
      lines.push(`⏱️ *Rental Package:* ${formData.localPackage === '4h_40km' ? '4 Hours / 40 Kms' : formData.localPackage === '12h_120km' ? '12 Hours / 120 Kms' : '8 Hours / 80 Kms (Full Day)'}`);
      lines.push(`📍 *Pickup Area:* ${formData.pickup}`);
    } else if (activeServiceId === 'outstation') {
      lines.push(`🛣️ *Trip Mode:* ${formData.outstationTripType === 'roundtrip' ? 'Round Trip Return' : 'One-Way Drop'}`);
      lines.push(`📍 *Pickup:* ${formData.pickup}`);
      lines.push(`🎯 *Destination:* ${formData.drop}`);
      if (formData.outstationTripType === 'roundtrip' && formData.returnDate) {
        lines.push(`🔄 *Return Date:* ${formData.returnDate} at ${formData.returnTime}`);
      }
    } else {
      lines.push(`📍 *Pickup:* ${formData.pickup}`);
      lines.push(`🎯 *Drop / Venue:* ${formData.drop || 'Bengaluru'}`);
    }

    if (formData.date) {
      lines.push(`📅 *Travel Date:* ${formData.date} at ${formData.time}`);
    }

    if (activeServiceId === 'corporate') {
      lines.push(`🏢 *Company Name:* ${formData.companyName || 'N/A'}`);
      if (formData.designation) lines.push(`💼 *Designation / Role:* ${formData.designation}`);
      if (formData.gstNumber) lines.push(`📄 *GSTIN:* ${formData.gstNumber}`);
      if (formData.corporateScope) lines.push(`📋 *Corporate Scope:* ${formData.corporateScope}`);
      if (formData.corporateFleetCount) lines.push(`🔢 *Fleet Size Required:* ${formData.corporateFleetCount} Vehicles`);
      if (formData.corporateBilling) lines.push(`💳 *Billing Preference:* ${formData.corporateBilling}`);
    }

    if (activeServiceId === 'wedding') {
      lines.push(`💍 *Event Type:* ${formData.eventType}`);
      lines.push(`🌹 *Floral Decoration:* ${formData.weddingDecor ? 'Yes, Fresh Floral Ribbon Styling Required' : 'Standard Car (No Decoration)'}`);
    }

    if (activeServiceId === 'group') {
      lines.push(`👥 *Estimated Passengers:* ${formData.passengerCount} Pax`);
    }

    if (formData.specialNotes) {
      lines.push(`📝 *Special Instructions:* ${formData.specialNotes}`);
    }

    lines.push(`----------------------------------------`);
    lines.push(`Please verify vehicle availability and confirm chauffeur dispatch. Thank you!`);

    const fullMessage = lines.join('\n');
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(fullMessage)}`;

    setLastWaUrl(waUrl);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="sjm-backdrop" onClick={onClose}>
      <div className="sjm-modal-window" onClick={e => e.stopPropagation()}>
        
        {/* Ambient Glowing Blobs */}
        <div className="sjm-ambient-orb sjm-orb-gold"></div>

        {/* Modal Header */}
        <div className="sjm-header">
          <div>
            <div className="sjm-brand-pill">
              <Crown size={13} />
              <span>WHERE WILL YOUR JOURNEY TAKE YOU? • SIDDHU CONCIERGE</span>
            </div>
            <h3 className="sjm-title">
              Craft Your Journey &bull; <span className="sjm-title-highlight">{currentService.headline}</span>
            </h3>
            <p className="sjm-subtitle">
              {currentService.subtitle}
            </p>
          </div>
          <button className="sjm-close-btn" onClick={onClose} aria-label="Close enquiry suite">
            <X size={20} />
          </button>
        </div>

        {/* Top Service Navigation Strip */}
        <div className="sjm-service-strip" ref={stripRef}>
          {SERVICES_CONFIG.map(serv => {
            const Icon = serv.icon;
            const isActive = serv.id === activeServiceId;
            return (
              <button
                key={serv.id}
                type="button"
                className={`sjm-service-chip ${isActive ? 'active' : ''}`}
                onClick={() => handleServiceChange(serv.id)}
              >
                <Icon size={14} />
                <span>{serv.title}</span>
              </button>
            );
          })}
        </div>

        {/* Stepper Progress Bar */}
        <div className="sjm-stepper">
          {[
            { num: 1, label: 'Contact Details' },
            { num: 2, label: 'Route & Schedule' },
            { num: 3, label: 'Select Vehicle' },
            { num: 4, label: 'Confirm Quote' }
          ].map((s, idx) => {
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <React.Fragment key={s.num}>
                <div
                  className={`sjm-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed clickable' : ''}`}
                  onClick={() => isCompleted && setCurrentStep(s.num)}
                >
                  <div className="sjm-step-circle">
                    {isCompleted ? <Check size={14} strokeWidth={3} /> : `0${s.num}`}
                  </div>
                  <span className="sjm-step-label">{s.label}</span>
                </div>
                {idx < 3 && (
                  <div className={`sjm-step-divider ${isCompleted ? 'filled' : ''}`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="sjm-body">
          {submitted ? (
            /* Success State */
            <div className="sjm-success-state">
              <div className="sjm-success-icon">
                <CheckCircle2 size={44} />
              </div>
              <h4 className="sjm-success-title">Enquiry Sent to WhatsApp!</h4>
              <p className="sjm-success-desc">
                Thank you, <strong>{formData.name}</strong>! Your chauffeur booking enquiry for <strong>{currentService.headline}</strong> ({selectedVehicle?.name}) has been routed to our 24/7 dispatch desk.
              </p>
              <div className="sjm-success-actions">
                <button
                  type="button"
                  className="sjm-btn-back"
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                >
                  Book Another Journey
                </button>
                <a
                  href={lastWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sjm-btn-whatsapp"
                >
                  <WhatsAppIcon size={18} color="#FFFFFF" />
                  <span>Open WhatsApp Conversation</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: CONTACT DETAILS */}
              {currentStep === 1 && (
                <div>
                  <h4 className="sjm-section-title">Step 01 &bull; Who is travelling with us?</h4>
                  <p className="sjm-section-desc">
                    Enter your contact details so our concierge can transmit your chauffeur assignment, driver live tracking, and digital voucher.
                  </p>

                  <div className="sjm-grid-2">
                    <div className="sjm-field-group">
                      <label className="sjm-label">
                        <User size={13} color="#F59E0B" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        className="sjm-input"
                        placeholder="e.g. Vikramaditya Rao"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        autoFocus
                      />
                    </div>

                    <div className="sjm-field-group">
                      <label className="sjm-label">
                        <Phone size={13} color="#F59E0B" />
                        <span>WhatsApp / Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        className="sjm-input"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="sjm-field-group">
                      <label className="sjm-label">
                        <Mail size={13} color="#F59E0B" />
                        <span>Email Address (Optional)</span>
                      </label>
                      <input
                        type="email"
                        className="sjm-input"
                        placeholder="e.g. vikram@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    {activeServiceId === 'corporate' && (
                      <>
                        <div className="sjm-field-group">
                          <label className="sjm-label">
                            <Building2 size={13} color="#F59E0B" />
                            <span>Company / Organization Name *</span>
                          </label>
                          <input
                            type="text"
                            className="sjm-input"
                            placeholder="e.g. Infosys / Wipro / Accenture"
                            value={formData.companyName}
                            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                          />
                        </div>

                        <div className="sjm-field-group">
                          <label className="sjm-label">
                            <Briefcase size={13} color="#F59E0B" />
                            <span>Department / Designation</span>
                          </label>
                          <input
                            type="text"
                            className="sjm-input"
                            placeholder="e.g. Head of HR / Travel Desk / Facilities"
                            value={formData.designation}
                            onChange={e => setFormData({ ...formData, designation: e.target.value })}
                          />
                        </div>

                        <div className="sjm-field-group">
                          <label className="sjm-label">
                            <FileCheck size={13} color="#F59E0B" />
                            <span>Company GSTIN (Optional)</span>
                          </label>
                          <input
                            type="text"
                            className="sjm-input"
                            placeholder="e.g. 29AABCN1234R1ZX"
                            value={formData.gstNumber}
                            onChange={e => setFormData({ ...formData, gstNumber: e.target.value })}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: ROUTE & SCHEDULE */}
              {currentStep === 2 && (
                <div>
                  <h4 className="sjm-section-title">Step 02 &bull; Route, Schedule & Preferences</h4>
                  <p className="sjm-section-desc">
                    Tell us where and when your journey begins. We calculate exact tariffs with zero surge pricing.
                  </p>

                  {/* Airport specific controls */}
                  {activeServiceId === 'airport' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label className="sjm-label" style={{ marginBottom: '8px' }}>
                        <Plane size={13} color="#F59E0B" />
                        <span>Transfer Direction</span>
                      </label>
                      <div className="sjm-pills-row">
                        <button
                          type="button"
                          className={`sjm-pill-btn ${formData.airportDirection === 'pickup' ? 'active' : ''}`}
                          onClick={() => setFormData({
                            ...formData,
                            airportDirection: 'pickup',
                            pickup: 'Kempegowda International Airport (BLR)',
                            drop: 'Bengaluru City'
                          })}
                        >
                          🛬 Airport Pickup (Flight Arrival &bull; T1/T2 to City)
                        </button>
                        <button
                          type="button"
                          className={`sjm-pill-btn ${formData.airportDirection === 'drop' ? 'active' : ''}`}
                          onClick={() => setFormData({
                            ...formData,
                            airportDirection: 'drop',
                            pickup: 'Bengaluru City (Hotel / Residence)',
                            drop: 'Kempegowda International Airport (BLR)'
                          })}
                        >
                          🛫 Airport Drop (City to Airport Terminal)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Local Rental specific package controls */}
                  {activeServiceId === 'local' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label className="sjm-label" style={{ marginBottom: '8px' }}>
                        <Clock size={13} color="#F59E0B" />
                        <span>Select City Rental Package</span>
                      </label>
                      <div className="sjm-pills-row">
                        <button
                          type="button"
                          className={`sjm-pill-btn ${formData.localPackage === '4h_40km' ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, localPackage: '4h_40km' })}
                        >
                          4 Hours / 40 Kms (Half Day)
                        </button>
                        <button
                          type="button"
                          className={`sjm-pill-btn ${formData.localPackage === '8h_80km' ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, localPackage: '8h_80km' })}
                        >
                          ⭐ 8 Hours / 80 Kms (Full Day - Most Popular)
                        </button>
                        <button
                          type="button"
                          className={`sjm-pill-btn ${formData.localPackage === '12h_120km' ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, localPackage: '12h_120km' })}
                        >
                          12 Hours / 120 Kms (Extended Day)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Outstation trip type & popular destinations */}
                  {activeServiceId === 'outstation' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label className="sjm-label" style={{ marginBottom: '8px' }}>
                        <RotateCw size={13} color="#F59E0B" />
                        <span>Trip Format & Popular South India Destinations</span>
                      </label>
                      <div className="sjm-pills-row" style={{ marginBottom: '12px' }}>
                        <button
                          type="button"
                          className={`sjm-pill-btn ${formData.outstationTripType === 'roundtrip' ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, outstationTripType: 'roundtrip' })}
                        >
                          🔄 Round Trip Return
                        </button>
                        <button
                          type="button"
                          className={`sjm-pill-btn ${formData.outstationTripType === 'oneway' ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, outstationTripType: 'oneway' })}
                        >
                          ➡️ One-Way Drop
                        </button>
                      </div>

                      <div className="sjm-pills-row">
                        {POPULAR_OUTSTATION_DESTINATIONS.map(dest => (
                          <button
                            key={dest}
                            type="button"
                            className={`sjm-pill-btn ${formData.drop === dest ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, drop: dest })}
                          >
                            📍 {dest}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Corporate Mobility Requirements */}
                  {activeServiceId === 'corporate' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label className="sjm-label" style={{ marginBottom: '8px' }}>
                        <Briefcase size={13} color="#F59E0B" />
                        <span>Corporate Requirement Scope</span>
                      </label>
                      <div className="sjm-pills-row" style={{ marginBottom: '12px', flexWrap: 'wrap' }}>
                        {[
                          { id: 'monthly_fleet', label: '🚗 Monthly Fleet Retainer' },
                          { id: 'airport_vip', label: '✈️ Executive Airport VIP' },
                          { id: 'board_delegation', label: '👑 Board & VIP Movement' },
                          { id: 'event_convoy', label: '🎪 Summit / Event Convoy' },
                          { id: 'tech_park', label: '🏢 Tech Park Commute' }
                        ].map(opt => (
                          <button
                            key={opt.id}
                            type="button"
                            className={`sjm-pill-btn ${formData.corporateScope === opt.id ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, corporateScope: opt.id })}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>

                      <div className="sjm-grid-2" style={{ marginTop: '10px' }}>
                        <div className="sjm-field-group">
                          <label className="sjm-label">
                            <Users size={13} color="#F59E0B" />
                            <span>Fleet Size Needed</span>
                          </label>
                          <select
                            className="sjm-input"
                            value={formData.corporateFleetCount || '1-3'}
                            onChange={e => setFormData({ ...formData, corporateFleetCount: e.target.value })}
                          >
                            <option value="1-3">1 – 3 Vehicles (Executive / Dedicated)</option>
                            <option value="4-10">4 – 10 Vehicles (Medium Fleet)</option>
                            <option value="11-25">11 – 25 Vehicles (Large Campus / Events)</option>
                            <option value="25+">25+ Vehicles (Annual Master Agreement)</option>
                          </select>
                        </div>

                        <div className="sjm-field-group">
                          <label className="sjm-label">
                            <Receipt size={13} color="#F59E0B" />
                            <span>Billing Preference</span>
                          </label>
                          <select
                            className="sjm-input"
                            value={formData.corporateBilling || 'monthly_credit'}
                            onChange={e => setFormData({ ...formData, corporateBilling: e.target.value })}
                          >
                            <option value="monthly_credit">Monthly Consolidated (Net-30 Credit)</option>
                            <option value="bi_weekly">Bi-Weekly Invoicing</option>
                            <option value="po_basis">Trip-Wise PO Invoicing</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wedding car decor toggle */}
                  {activeServiceId === 'wedding' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label className="sjm-label" style={{ marginBottom: '8px' }}>
                        <Sparkles size={13} color="#F59E0B" />
                        <span>Bridal Styling & Floral Ribbon Decoration</span>
                      </label>
                      <div className="sjm-pills-row">
                        <button
                          type="button"
                          className={`sjm-pill-btn ${formData.weddingDecor ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, weddingDecor: true })}
                        >
                          🌹 Fresh Floral Ribbon Styling Included
                        </button>
                        <button
                          type="button"
                          className={`sjm-pill-btn ${!formData.weddingDecor ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, weddingDecor: false })}
                        >
                          🚗 Elegant Plain Car (Without Florals)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Group passenger count */}
                  {activeServiceId === 'group' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label className="sjm-label" style={{ marginBottom: '8px' }}>
                        <Users size={13} color="#F59E0B" />
                        <span>Approximate Passenger Group Size</span>
                      </label>
                      <div className="sjm-pills-row">
                        {['8-12 Pax', '13-17 Pax', '18-25 Pax', '26-49 Pax'].map(cnt => (
                          <button
                            key={cnt}
                            type="button"
                            className={`sjm-pill-btn ${formData.passengerCount === cnt ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, passengerCount: cnt })}
                          >
                            👥 {cnt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pickup & Drop Inputs with Autocomplete */}
                  <div className="sjm-grid-2">
                    <div className="sjm-field-group">
                      <label className="sjm-label">
                        <MapPin size={13} color="#F59E0B" />
                        <span>Pickup Location *</span>
                      </label>
                      <SjmLocationAutocomplete
                        value={formData.pickup}
                        onChange={(val) => setFormData(prev => ({ ...prev, pickup: val }))}
                        placeholder="e.g. Bangalore, Banashankari, Airport..."
                        name="pickup"
                      />
                    </div>

                    {activeServiceId !== 'local' && (
                      <div className="sjm-field-group">
                        <label className="sjm-label">
                          <Navigation size={13} color="#F59E0B" />
                          <span>Destination / Drop Address *</span>
                        </label>
                        <SjmLocationAutocomplete
                          value={formData.drop}
                          onChange={(val) => setFormData(prev => ({ ...prev, drop: val }))}
                          placeholder="e.g. Kempegowda Airport T1 / Mysuru Palace"
                          name="drop"
                        />
                      </div>
                    )}

                    <div className="sjm-field-group">
                      <label className="sjm-label">
                        <Calendar size={13} color="#F59E0B" />
                        <span>Pickup Date *</span>
                      </label>
                      <input
                        type="date"
                        className="sjm-input"
                        min={getTodayDateStr()}
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>

                    <div className="sjm-field-group">
                      <label className="sjm-label">
                        <Clock size={13} color="#F59E0B" />
                        <span>Pickup Time *</span>
                      </label>
                      <input
                        type="time"
                        className="sjm-input"
                        value={formData.time}
                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>

                    {/* Flight number if airport */}
                    {activeServiceId === 'airport' && (
                      <div className="sjm-field-group">
                        <label className="sjm-label">
                          <Plane size={13} color="#F59E0B" />
                          <span>Flight Number (For delay tracking)</span>
                        </label>
                        <input
                          type="text"
                          className="sjm-input"
                          placeholder="e.g. 6E-2145 / AI-506"
                          value={formData.flightNumber}
                          onChange={e => setFormData({ ...formData, flightNumber: e.target.value })}
                        />
                      </div>
                    )}

                    {/* Return date if outstation roundtrip */}
                    {activeServiceId === 'outstation' && formData.outstationTripType === 'roundtrip' && (
                      <div className="sjm-field-group">
                        <label className="sjm-label">
                          <Calendar size={13} color="#F59E0B" />
                          <span>Return Date</span>
                        </label>
                        <input
                          type="date"
                          className="sjm-input"
                          min={formData.date || getTodayDateStr()}
                          value={formData.returnDate}
                          onChange={e => setFormData({ ...formData, returnDate: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: SELECT FLEET VEHICLE */}
              {currentStep === 3 && (
                <div>
                  <h4 className="sjm-section-title">Step 03 &bull; Choose from Siddhu Verified Fleet</h4>
                  <p className="sjm-section-desc">
                    All vehicles are sanitized, yellow-board commercial registered, air-conditioned, and chauffeured by uniformed captains.
                  </p>

                  <div className="sjm-fleet-grid">
                    {filteredFleet.map(veh => {
                      const isSelected = veh.id === formData.selectedVehicleId;
                      const tariffBadge = getVehicleTariffBadge(veh);
                      return (
                        <div
                          key={veh.id}
                          className={`sjm-vehicle-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, selectedVehicleId: veh.id })}
                        >
                          <div className="sjm-card-img-box">
                            <span className="sjm-badge-tag">{veh.badgeText || veh.categoryLabel}</span>
                            {isSelected && (
                              <div className="sjm-selected-check">
                                <Check size={14} strokeWidth={3} />
                              </div>
                            )}
                            <img src={veh.image} alt={veh.name} className="sjm-card-img" />
                          </div>

                          <div className="sjm-card-info">
                            <div>
                              <div className="sjm-card-title">{veh.name}</div>
                              <div className="sjm-card-cat">{veh.category}</div>
                              <div className="sjm-card-meta">
                                <span><User size={12} /> {veh.passengerDisplay || `${veh.passengerCapacity} Seats`}</span>
                                <span><Luggage size={12} /> {veh.luggageDisplay || `${veh.luggageCapacity || 3} Bags`}</span>
                                <span><Car size={12} /> AC</span>
                              </div>
                            </div>

                            <div className="sjm-card-price-row">
                              <span className="sjm-price-label">Estimated Rate</span>
                              <span className="sjm-price-val">{tariffBadge}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: CONFIRM QUOTE & SUMMARY */}
              {currentStep === 4 && (
                <div>
                  <h4 className="sjm-section-title">Step 04 &bull; Review Your Journey & Confirm</h4>
                  <p className="sjm-section-desc">
                    Verify your itinerary and selected vehicle. Clicking "Submit to WhatsApp Concierge" will instantly connect you with dispatch.
                  </p>

                  <div className="sjm-confirm-grid">
                    {/* Journey Details Summary */}
                    <div className="sjm-summary-card">
                      <div className="sjm-summary-card-header">
                        <Compass size={16} />
                        <span>Travel Itinerary</span>
                      </div>

                      <div className="sjm-summary-item">
                        <span className="sjm-summary-label">Service Type</span>
                        <span className="sjm-summary-val">{currentService.title}</span>
                      </div>

                      <div className="sjm-summary-item">
                        <span className="sjm-summary-label">Guest Name</span>
                        <span className="sjm-summary-val">{formData.name}</span>
                      </div>

                      <div className="sjm-summary-item">
                        <span className="sjm-summary-label">WhatsApp Contact</span>
                        <span className="sjm-summary-val">{formData.phone}</span>
                      </div>

                      <div className="sjm-summary-item">
                        <span className="sjm-summary-label">Pickup Location</span>
                        <span className="sjm-summary-val">{formData.pickup}</span>
                      </div>

                      {activeServiceId !== 'local' && (
                        <div className="sjm-summary-item">
                          <span className="sjm-summary-label">Destination</span>
                          <span className="sjm-summary-val">{formData.drop}</span>
                        </div>
                      )}

                      <div className="sjm-summary-item">
                        <span className="sjm-summary-label">Date & Time</span>
                        <span className="sjm-summary-val">{formData.date} at {formData.time}</span>
                      </div>

                      {activeServiceId === 'airport' && formData.flightNumber && (
                        <div className="sjm-summary-item">
                          <span className="sjm-summary-label">Flight Number</span>
                          <span className="sjm-summary-val">{formData.flightNumber}</span>
                        </div>
                      )}

                      {activeServiceId === 'local' && (
                        <div className="sjm-summary-item">
                          <span className="sjm-summary-label">Package Duration</span>
                          <span className="sjm-summary-val">{formData.localPackage === '4h_40km' ? '4 Hours / 40 Kms' : formData.localPackage === '12h_120km' ? '12 Hours / 120 Kms' : '8 Hours / 80 Kms Full Day'}</span>
                        </div>
                      )}
                    </div>

                    {/* Selected Vehicle & Inclusions Summary */}
                    <div className="sjm-summary-card">
                      <div className="sjm-summary-card-header">
                        <Car size={16} />
                        <span>Selected Fleet & Inclusions</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #E2E8F0' }}>
                        <img
                          src={selectedVehicle?.image}
                          alt={selectedVehicle?.name}
                          style={{ width: '80px', height: '52px', objectFit: 'contain', background: '#F8FAFC', borderRadius: '8px', padding: '4px', border: '1px solid #E2E8F0' }}
                        />
                        <div>
                          <div style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.96rem' }}>
                            {selectedVehicle?.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#B45309', fontWeight: '700' }}>
                            {getVehicleTariffBadge(selectedVehicle)}
                          </div>
                        </div>
                      </div>

                      <div className="sjm-inclusions-list">
                        <div className="sjm-inclusion">
                          <ShieldCheck size={16} color="#10B981" />
                          <span>Uniformed, Police-Verified English-Speaking Chauffeur</span>
                        </div>
                        <div className="sjm-inclusion">
                          <ShieldCheck size={16} color="#10B981" />
                          <span>Complimentary Mineral Water Bottles & Mints</span>
                        </div>
                        <div className="sjm-inclusion">
                          <ShieldCheck size={16} color="#10B981" />
                          <span>Zero Hidden Costs & Guaranteed Sanitized AC Cabin</span>
                        </div>
                        <div className="sjm-inclusion">
                          <ShieldCheck size={16} color="#10B981" />
                          <span>Live GPS Fleet Tracking & 24/7 Concierge Support</span>
                        </div>
                      </div>

                      <div style={{ marginTop: '16px' }}>
                        <label className="sjm-label" style={{ marginBottom: '6px' }}>
                          <span>Additional Notes / Special Instructions</span>
                        </label>
                        <input
                          type="text"
                          className="sjm-input"
                          placeholder="e.g. Need child seat / VIP luggage / Extra water"
                          value={formData.specialNotes}
                          onChange={e => setFormData({ ...formData, specialNotes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Action Footer */}
        {!submitted && (
          <div className="sjm-footer">
            <div className="sjm-footer-info">
              <span className="sjm-footer-pill">Current Selection:</span>
              <span className="sjm-footer-car">{currentService.title} &bull; {selectedVehicle?.name}</span>
            </div>

            <div className="sjm-footer-actions">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="sjm-btn-back"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  className="sjm-btn-continue"
                  onClick={() => {
                    if (currentStep === 1 && !validateStep1()) return;
                    if (currentStep === 2 && !validateStep2()) return;
                    setCurrentStep(prev => prev + 1);
                  }}
                >
                  <span>Continue</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="sjm-btn-whatsapp"
                  onClick={handleConfirmWhatsApp}
                >
                  <WhatsAppIcon size={18} color="#FFFFFF" />
                  <span>Submit Enquiry to WhatsApp Concierge</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
};
