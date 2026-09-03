import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plane, MapPin, Briefcase, RefreshCw, ArrowRight, Calendar, LocateFixed, Loader2 } from 'lucide-react';
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
          // Reverse geocoding using Nominatim (free, no API key required)
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

  // Duplicate for seamless infinite marquee loop
  const col1Marquee = [...COL_1_IMAGES, ...COL_1_IMAGES];
  const col2Marquee = [...COL_2_IMAGES, ...COL_2_IMAGES];

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
                  className={`crs-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="crs-tab-icon" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* COMPACT HORIZONTAL SEARCH BAR */}
          <div className="crs-search-bar">
            {/* Pick-up Location */}
            <div className="crs-input-section location" ref={dropdownRef}>
              <MapPin className="crs-input-icon" />
              <input 
                type="text" 
                className="crs-input" 
                placeholder="Explore destinations"
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
                  <button className="crs-dropdown-item" onClick={handleCurrentLocation}>
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
              <input type="text" className="crs-input" placeholder="Pick-up date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}} />
            </div>

            {/* Return Date & Time */}
            <div className="crs-input-section date">
              <Calendar className="crs-input-icon" style={{ width: '14px', height: '14px' }} />
              <input type="text" className="crs-input" placeholder="Return date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}} />
            </div>

            {/* Search Button */}
            <button className="crs-search-btn">
              Search
            </button>
          </div>
          
          <div className="crs-options">
            <input type="checkbox" id="sameDropoff" defaultChecked style={{ accentColor: '#2C1E16' }} />
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
    </section>
  );
};

