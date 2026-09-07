import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plane, MapPin, Briefcase, RefreshCw, ArrowRight, Calendar, LocateFixed, Loader2, Star, Users, ShieldCheck, MessageSquare, Sparkles, X, ChevronRight, PhoneCall } from 'lucide-react';
import { fleetData } from '../../data/fleetData';
import { pricingService } from '../../services/pricingService';
import { VehicleBookingModal } from '../modals/VehicleBookingModal';
import './CarRentalSearch.css';

const TABS = [
  { id: 'airport', label: 'Airport Transfer', icon: Plane },
  { id: 'local', label: 'Local Rental', icon: MapPin },
  { id: 'corporate', label: 'Corporate Transfer', icon: Briefcase },
  { id: 'roundtrip', label: 'Round Trip', icon: RefreshCw },
  { id: 'oneway', label: 'One Way', icon: ArrowRight },
];

const COL_1_IMAGES = [
  { src: '/images/destinations/bangalore_palace.jpg', arClass: 'ar-tall' },
  { src: '/images/destinations/mysuru.jpg', arClass: 'ar-square' },
  { src: '/images/destinations/hampi.jpg', arClass: 'ar-tall' },
  { src: '/images/destinations/ub_city.jpg', arClass: 'ar-wide' },
];

const COL_2_IMAGES = [
  { src: '/images/destinations/lalbagh_glass_house.jpg', arClass: 'ar-square' },
  { src: '/images/destinations/chikmagalur.jpg', arClass: 'ar-tall' },
  { src: '/images/destinations/nandi_hills.jpg', arClass: 'ar-square' },
  { src: '/images/destinations/coorg.jpg', arClass: 'ar-tall' },
];

// Rich static database mapping to user's suggested categories
const LOCATIONS_DB = [
  // Local Areas
  { name: 'Rajajinagar', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Rajarajeshwari Nagar', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Rajajinagar Industrial Area', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Malleshwaram', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Indiranagar', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Koramangala', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Jayanagar', subtitle: 'Bengaluru, Karnataka' },
  { name: 'JP Nagar', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Basavanagudi', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Whitefield', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Yelahanka', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Hebbal', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Electronic City', subtitle: 'Bengaluru, Karnataka' },
  { name: 'HSR Layout', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Marathahalli', subtitle: 'Bengaluru, Karnataka' },
  { name: 'Banashankari', subtitle: 'Bengaluru, Karnataka' },
  // Transport
  { name: 'Kempegowda International Airport (BLR)', subtitle: 'Devanahalli, Bengaluru' },
  { name: 'Bangalore City Railway Station (SBC)', subtitle: 'Majestic, Bengaluru' },
  { name: 'Yeshwanthpur Railway Station', subtitle: 'Yeswanthpur, Bengaluru' },
  { name: 'KR Puram Railway Station', subtitle: 'KR Puram, Bengaluru' },
  // Tourist destinations
  { name: 'Bangalore Palace', subtitle: 'Vasanth Nagar, Bengaluru' },
  { name: 'Lalbagh Botanical Garden', subtitle: 'Mavalli, Bengaluru' },
  { name: 'Cubbon Park', subtitle: 'Kasturba Road, Bengaluru' },
  { name: 'Vidhana Soudha', subtitle: 'Ambedkar Veedhi, Bengaluru' },
  { name: 'ISKCON Temple', subtitle: 'Rajajinagar, Bengaluru' },
  { name: 'Wonderla', subtitle: 'Mysore Road, Bengaluru' },
  { name: 'Nandi Hills', subtitle: 'Chikkaballapur, Karnataka' },
  // Major Destinations
  { name: 'Mysuru', subtitle: 'Karnataka' },
  { name: 'Coorg', subtitle: 'Karnataka' },
  { name: 'Chikmagalur', subtitle: 'Karnataka' },
  { name: 'Hampi', subtitle: 'Karnataka' },
  { name: 'Ooty', subtitle: 'Tamil Nadu' },
  { name: 'Wayanad', subtitle: 'Kerala' },
  { name: 'Kabini', subtitle: 'Karnataka' },
  { name: 'Goa', subtitle: 'India' },
  { name: 'Hyderabad', subtitle: 'Telangana' },
  { name: 'Chennai', subtitle: 'Tamil Nadu' },
  { name: 'Kerala', subtitle: 'India' }
];

export const CarRentalSearch = () => {
  const [activeTab, setActiveTab] = useState('airport');
  
  // Destination Autocomplete State
  const [locationQuery, setLocationQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  
  // Dates & Options State
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [sameDropoff, setSameDropoff] = useState(true);

  // Search Results State
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultCategoryFilter, setResultCategoryFilter] = useState('all');
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState(null);
  
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter locations based on query
  const searchResults = useMemo(() => {
    if (locationQuery.length < 2) return [];
    
    const query = locationQuery.toLowerCase();
    
    // Exact matches or starts with (higher priority)
    const exact = LOCATIONS_DB.filter(loc => loc.name.toLowerCase().startsWith(query));
    
    // Fuzzy/includes matches (lower priority)
    const fuzzy = LOCATIONS_DB.filter(loc => 
      !loc.name.toLowerCase().startsWith(query) && 
      (loc.name.toLowerCase().includes(query) || loc.subtitle.toLowerCase().includes(query))
    );
    
    return [...exact, ...fuzzy];
  }, [locationQuery]);

  const handleSelectLocation = (locationName) => {
    setLocationQuery(locationName);
    setIsDropdownOpen(false);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    setLocationError('');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await response.json();
          
          let locationName = "Current Location";
          if (data && data.address) {
            const { suburb, neighbourhood, town, city } = data.address;
            const primary = suburb || neighbourhood || town || city;
            const secondary = data.address.state || data.address.country;
            if (primary) {
              locationName = `${primary}${secondary ? `, ${secondary}` : ''}`;
            }
          }
          
          handleSelectLocation(locationName);
        } catch (error) {
          setLocationError("Failed to detect area name");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        setLocationError("Location permission denied or unavailable");
      },
      { timeout: 10000 }
    );
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      setTimeout(() => {
        const el = document.getElementById('crs-search-results');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 350);
  };

  // Duplicate for seamless infinite marquee loop
  const col1Marquee = [...COL_1_IMAGES, ...COL_1_IMAGES];
  const col2Marquee = [...COL_2_IMAGES, ...COL_2_IMAGES];

  // Helper to compute tariff info for a vehicle based on activeTab
  const getVehicleTariffInfo = (vehicle) => {
    if (activeTab === 'airport') {
      const p = pricingService.getAirportTransferPrice(vehicle.id);
      return {
        price: p ? pricingService.formatPrice(p) : 'Price on Request',
        label: 'Flat Airport VIP Transfer',
        rawPrice: p
      };
    }
    if (activeTab === 'local') {
      const t = pricingService.getLocalTariff(vehicle.id);
      const p = t?.eight_hours_eighty_km;
      return {
        price: p ? pricingService.formatPrice(p) : 'Price on Request',
        label: '8h / 80km Full Day Local Package',
        rawPrice: p
      };
    }
    if (activeTab === 'corporate') {
      const t = pricingService.getLocalTariff(vehicle.id);
      const p = t?.eight_hours_eighty_km;
      return {
        price: p ? pricingService.formatPrice(p) : 'Price on Request',
        label: 'Daily Corporate B2B Billing',
        rawPrice: p
      };
    }
    // Outstation, Roundtrip, Oneway
    const t = pricingService.getOutstationTariff(vehicle.id);
    const p = t?.rate_per_km;
    return {
      price: p ? `₹${p}/km` : 'Price on Request',
      label: `Outstation (${t?.minimum_km_per_day || 300} km/day min)`,
      rawPrice: p
    };
  };

  const filteredVehicles = useMemo(() => {
    return fleetData.filter(v => {
      if (resultCategoryFilter === 'sedans') {
        return v.seatCategory === '3-4' || v.category.toLowerCase().includes('sedan');
      }
      if (resultCategoryFilter === 'suvs') {
        return v.category.toLowerCase().includes('mpv') || v.category.toLowerCase().includes('suv');
      }
      if (resultCategoryFilter === 'luxury') {
        return v.categoryKey === 'luxury' || (v.badgeText && v.badgeText.includes('VIP'));
      }
      if (resultCategoryFilter === 'buses') {
        return v.category.toLowerCase().includes('bus') || v.category.toLowerCase().includes('traveller') || v.category.toLowerCase().includes('urbania');
      }
      return true;
    });
  }, [resultCategoryFilter]);

  const activeTabLabel = TABS.find(t => t.id === activeTab)?.label || 'Car Rental';

  const getWhatsAppLink = (vehicle) => {
    const tariffInfo = getVehicleTariffInfo(vehicle);
    const msg = 
      `*Vehicle Booking Enquiry - Siddhu Car Rentals*\n\n` +
      `• *Vehicle:* ${vehicle.name}\n` +
      `• *Service:* ${activeTabLabel}\n` +
      `• *Estimated Rate:* ${tariffInfo.price}\n` +
      `• *Pickup Location:* ${locationQuery || 'Bengaluru City'}\n` +
      `• *Pickup Date:* ${pickupDate || 'Immediate'}\n` +
      (returnDate ? `• *Return Date:* ${returnDate}\n` : '') +
      `\nPlease confirm vehicle availability and driver details.`;
    return `https://wa.me/917625059665?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="car-rental-search-section">
      <div className="crs-container" id="quick-enquiry">
        
        {/* LEFT SIDE - SEARCH PANEL */}
        <div className="crs-left-panel">
          <h2 className="crs-headline">Find the perfect car for your journey.</h2>
          
          <div className="crs-tabs">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`crs-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                >
                  <Icon className="crs-tab-icon" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* COMPACT HORIZONTAL SEARCH BAR */}
          <form onSubmit={handleSearch} className="crs-search-bar">
            {/* Pick-up Location */}
            <div className="crs-input-section location" ref={dropdownRef}>
              <MapPin className="crs-input-icon" />
              <input 
                type="text" 
                className="crs-input" 
                placeholder="Explore destinations or areas"
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
              
              {/* COMPACT DESTINATION DROPDOWN */}
              {isDropdownOpen && (
                <div className="crs-dropdown">
                  {/* Current Location Action */}
                  <button type="button" className="crs-dropdown-item" onClick={handleCurrentLocation}>
                    {isLocating ? (
                      <Loader2 className="crs-dropdown-icon crs-spinner" size={18} />
                    ) : (
                      <LocateFixed className="crs-dropdown-icon crs-dropdown-current-icon" size={18} />
                    )}
                    <div className="crs-dropdown-text">
                      <span className="crs-dropdown-title" style={{ color: '#3B82F6' }}>
                        {isLocating ? 'Detecting location...' : 'Use my current location'}
                      </span>
                      {locationError && <span className="crs-dropdown-error">{locationError}</span>}
                    </div>
                  </button>

                  {/* Search Results */}
                  {locationQuery.length >= 2 && searchResults.length > 0 && (
                    searchResults.map((loc, idx) => (
                      <button 
                        key={idx} 
                        type="button"
                        className="crs-dropdown-item"
                        onClick={() => handleSelectLocation(loc.name)}
                      >
                        <MapPin className="crs-dropdown-icon" size={18} />
                        <div className="crs-dropdown-text">
                          <span className="crs-dropdown-title">{loc.name}</span>
                          <span className="crs-dropdown-subtitle">{loc.subtitle}</span>
                        </div>
                      </button>
                    ))
                  )}

                  {/* No Results State */}
                  {locationQuery.length >= 2 && searchResults.length === 0 && (
                    <div className="crs-dropdown-item" style={{ cursor: 'default' }}>
                      <div className="crs-dropdown-text">
                        <span className="crs-dropdown-subtitle" style={{ textAlign: 'center' }}>No locations found</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pick-up Date & Time */}
            <div className="crs-input-section date">
              <Calendar className="crs-input-icon" style={{ width: '14px', height: '14px' }} />
              <input 
                type={pickupDate ? 'date' : 'text'} 
                className="crs-input" 
                placeholder="Pick-up date" 
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                onFocus={(e) => (e.target.type = 'date')} 
                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }} 
              />
            </div>

            {/* Return Date & Time */}
            <div className="crs-input-section date">
              <Calendar className="crs-input-icon" style={{ width: '14px', height: '14px' }} />
              <input 
                type={returnDate ? 'date' : 'text'} 
                className="crs-input" 
                placeholder="Return date" 
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                onFocus={(e) => (e.target.type = 'date')} 
                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }} 
              />
            </div>

            {/* Search Button */}
            <button type="submit" className="crs-search-btn" disabled={isSearching}>
              {isSearching ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Loader2 className="crs-spinner" size={16} />
                  <span>Searching...</span>
                </span>
              ) : (
                <span>Search</span>
              )}
            </button>
          </form>
          
          <div className="crs-options">
            <input 
              type="checkbox" 
              id="sameDropoff" 
              checked={sameDropoff} 
              onChange={(e) => setSameDropoff(e.target.checked)}
              style={{ accentColor: '#2C1E16' }} 
            />
            <label htmlFor="sameDropoff">Same drop-off</label>
          </div>
        </div>

        {/* RIGHT SIDE - COMPACT IMAGE COLLAGE */}
        <div className="crs-right-panel">
          <div className="crs-collage-wrapper">
            
            {/* Column 1 */}
            <div className="crs-marquee-col col-1">
              {col1Marquee.map((img, index) => (
                <div key={index} className={`crs-image-card ${img.arClass}`}>
                  <img src={img.src} alt="Destination" loading="lazy" />
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="crs-marquee-col col-2">
              {col2Marquee.map((img, index) => (
                <div key={index} className={`crs-image-card ${img.arClass}`}>
                  <img src={img.src} alt="Destination" loading="lazy" />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* SEARCH RESULTS SECTION */}
      {showResults && (
        <div id="crs-search-results" className="crs-results-wrapper">
          <div className="crs-results-header">
            <div>
              <div className="crs-results-badge">
                <Sparkles size={13} />
                <span>Available Luxury Vehicles</span>
              </div>
              <h3 className="crs-results-title">
                Matching Fleet for {activeTabLabel}
              </h3>
              <p className="crs-results-sub">
                <span>📍 Location: <strong>{locationQuery || 'Bengaluru Central'}</strong></span>
                <span>•</span>
                <span>📅 Schedule: <strong>{pickupDate || 'Immediate Pickup'}</strong> {returnDate ? `to ${returnDate}` : ''}</span>
                <span>•</span>
                <span style={{ color: '#16A34A', fontWeight: '700' }}>✓ 100% Verified Chauffeurs</span>
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div className="crs-results-filter-bar">
                {[
                  { id: 'all', label: `All (${fleetData.length})` },
                  { id: 'sedans', label: 'Sedans' },
                  { id: 'suvs', label: 'SUVs & MPVs' },
                  { id: 'luxury', label: 'VIP Flagship' },
                  { id: 'buses', label: 'Coaches & Vans' }
                ].map(f => (
                  <button
                    key={f.id}
                    type="button"
                    className={`crs-filter-pill ${resultCategoryFilter === f.id ? 'active' : ''}`}
                    onClick={() => setResultCategoryFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="crs-close-btn"
                onClick={() => setShowResults(false)}
                title="Close Search Results"
              >
                <X size={14} />
                <span>Close Results</span>
              </button>
            </div>
          </div>

          {/* Vehicles Grid */}
          <div className="crs-vehicles-grid">
            {filteredVehicles.map((vehicle) => {
              const tariffInfo = getVehicleTariffInfo(vehicle);
              const whatsappUrl = getWhatsAppLink(vehicle);

              return (
                <div key={vehicle.id} className="crs-vehicle-card">
                  <div className="crs-card-img-wrap">
                    <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
                    {vehicle.badgeText && (
                      <span className="crs-card-badge">{vehicle.badgeText}</span>
                    )}
                  </div>

                  <div className="crs-card-body">
                    <div>
                      <h4 className="crs-card-title">{vehicle.name}</h4>
                      <div className="crs-card-category">{vehicle.category}</div>

                      <div className="crs-card-specs">
                        <span className="crs-spec-tag">
                          <Users size={12} />
                          <span>{vehicle.passengerCapacity || 4} Seats</span>
                        </span>
                        <span className="crs-spec-tag">
                          <Briefcase size={12} />
                          <span>{vehicle.luggageCapacity || 3} Bags</span>
                        </span>
                        <span className="crs-spec-tag">
                          <ShieldCheck size={12} />
                          <span>Chauffeur</span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="crs-card-pricing">
                        <div>
                          <div className="crs-price-label">{tariffInfo.label}</div>
                          <div className="crs-price-value">{tariffInfo.price}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.72rem', background: 'rgba(37, 211, 102, 0.12)', color: '#128C7E', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                            Instant Dispatch
                          </span>
                        </div>
                      </div>

                      <div className="crs-card-actions">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="crs-btn-whatsapp"
                          title="Instant WhatsApp Booking"
                        >
                          <MessageSquare size={16} />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          className="crs-btn-reserve"
                          onClick={() => setSelectedVehicleForModal(vehicle)}
                        >
                          <span>Reserve Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Booking Modal */}
      {selectedVehicleForModal && (
        <VehicleBookingModal
          vehicle={selectedVehicleForModal}
          isOpen={Boolean(selectedVehicleForModal)}
          onClose={() => setSelectedVehicleForModal(null)}
          initialLocation={locationQuery}
          initialDate={pickupDate}
          initialPackage={activeTab}
        />
      )}
    </section>
  );
};

