import React, { useState, useRef, useEffect } from 'react';
import {
  Crown, PhoneCall, MessageSquare, ChevronRight, ShieldCheck, Clock, Award, Star,
  MapPin, Calendar, Users, Car, Sparkles, CheckCircle2, User, Mail, Navigation, FileText, Shield,
  RotateCw, LayoutGrid, ChevronLeft, Sliders, Menu, Circle, Check, X, Compass, Zap
} from 'lucide-react';
import './JourneyPlannerRefined.css';
import './BentoGrid.css';
import { OurServices } from '../components/home/OurServices';
import { CinematicHero } from '../components/home/CinematicHero';
import { CarRentalSearch } from '../components/home/CarRentalSearch';
import { ScrollStory } from '../components/home/ScrollStory';
import { GlassCard } from '../components/common/GlassCard';
import { fleetData } from '../data/fleetData';
import { pricingService } from '../services/pricingService';
import { PremiumButton } from '../components/common/PremiumButton';
import { Badge } from '../components/common/Badge';
import { SectionHeader } from '../components/common/SectionHeader';
import { Input } from '../components/common/Input';
import { VehicleCard } from '../components/cards/VehicleCard';
import { ServiceCard } from '../components/cards/ServiceCard';
import { TestimonialCard } from '../components/cards/TestimonialCard';
import { StatCard } from '../components/cards/StatCard';
import { SlideUp, FadeIn } from '../components/common/Motion';
import { CTASection } from '../components/common/CTASection';

export const Home = ({ onViewVehicleDetail, onNavigate }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [activeTripType, setActiveTripType] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fleetSliderRef = useRef(null);
  const [formStep, setFormStep] = useState(1);

  // Initial Load Animation Sequence Trigger
  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Smooth RequestAnimationFrame Mouse Parallax for Desktop
  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetX = Math.max(-1, Math.min(1, x));
      targetY = Math.max(-1, Math.min(1, y));
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setParallax({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    const heroEl = heroRef.current;
    if (heroEl && window.innerWidth > 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroEl.addEventListener('mousemove', handleMouseMove);
      heroEl.addEventListener('mouseleave', handleMouseLeave);
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollFleet = (direction) => {
    if (fleetSliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      fleetSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [showroomFilter, setShowroomFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    returnDate: '',
    returnTime: '',
    localPackage: '8h / 80km Full Day',
    airportTransferType: 'Airport Pickup',
    airportName: 'Kempegowda International Airport Bengaluru (BLR)',
    flightNumber: '',
    companyName: '',
    corporateServiceType: 'Executive Chauffeur Delegation',
    vehicle: 'mercedes_s',
    passengers: '1-2',
    message: ''
  });

  const plannerVehicles = [
    { id: 'mercedes_s', name: 'Mercedes-Benz S-Class S350d', subtitle: 'VIP Flagship Sedan', seats: '4+1 Seats', bags: '4 Bags', img: '/images/sclass_front.png', priceTag: 'Flagship VIP' },
    { id: 'bmw_730ld', name: 'BMW 730Ld xDrive', subtitle: 'Ultra VIP Flagship Sedan', seats: '4+1 Seats', bags: '3 Bags', img: '/images/bmw_front.jpg', priceTag: 'Ultra VIP' },
    { id: 'vellfire', name: 'Toyota Vellfire Executive Lounge', subtitle: 'Supreme VIP Luxury MPV', seats: '6+1 Seats', bags: '4 Bags', img: '/images/vellfire_front.jpg', priceTag: 'Supreme VIP' },
    { id: 'mercedes_e', name: 'Mercedes-Benz E-Class', subtitle: 'Luxury Executive Sedan', seats: '4+1 Seats', bags: '3 Bags', img: '/images/eclass_front.jpg', priceTag: 'Executive VIP' },
    { id: 'audi_q7', name: 'Audi Q7 Quattro SUV', subtitle: 'Executive Luxury 7-Seater', seats: '6+1 Seats', bags: '4 Bags', img: '/images/audi_q7_side.png', priceTag: 'Luxury SUV' },
    { id: 'honda_accord', name: 'Honda Accord Executive', subtitle: 'Executive Luxury Sedan', seats: '4+1 Seats', bags: '3 Bags', img: '/images/accord_front.jpg', priceTag: 'Executive Sedan' },
    { id: 'innova_crysta', name: 'Toyota Innova Crysta VIP', subtitle: 'Executive Captain MPV', seats: '6+1 Seats', bags: '5 Bags', img: '/images/crysta_front.png', priceTag: 'VIP MPV' },
    { id: 'innova_hycross', name: 'Toyota Innova Hycross Hybrid', subtitle: 'Hybrid Luxury MPV', seats: '6+1 Seats', bags: '5 Bags', img: '/images/hycross_front.jpg', priceTag: 'Hybrid MPV' },
    { id: 'toyota_commuter', name: 'Toyota HiAce Commuter VIP', subtitle: 'VIP Luxury Lounge Van', seats: '9+1 Seats', bags: '8 Bags', img: '/images/hiace_front.png', priceTag: 'VIP Lounge' },
    { id: 'traveller', name: 'Force Traveller Luxury AC', subtitle: 'VIP Group Coach', seats: '16+1 Seats', bags: '10 Bags', img: '/images/traveller_front.jpg', priceTag: 'VIP Group' },
    { id: 'mini_bus', name: 'Luxury Mini Bus (21-25 Seater)', subtitle: 'Corporate & Wedding', seats: '21-25 Seats', bags: '15 Bags', img: '/images/fleet/studio_mini_bus.jpg', priceTag: 'Group AC' },
    { id: 'large_bus', name: 'Luxury Large Bus (32-45 Seater)', subtitle: 'Large Event Transport', seats: '32-45 Seats', bags: '30 Bags', img: '/images/fleet/studio_large_bus.jpg', priceTag: 'Event Coach' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryChange = (tabKey) => {
    setActiveTripType(tabKey);
  };

  const nextStep = () => {
    if (formStep === 1) {
      if (!formData.name || !formData.mobile || !formData.email) {
        alert('Please fill out all contact details to continue.');
        return;
      }
    }
    if (formStep === 2) {
      if (activeTripType === 'Local') {
        if (!formData.pickup || !formData.date || !formData.time) {
          alert('Please specify your pickup point, travel date, and pickup time.');
          return;
        }
      } else if (activeTripType === 'Airport Transfer' || activeTripType === 'Airport') {
        if ((formData.airportTransferType === 'Airport Pickup' && !formData.drop) ||
            (formData.airportTransferType === 'Airport Drop' && !formData.pickup) ||
            !formData.date || !formData.time) {
          alert('Please enter your airport transfer address, date, and pickup time.');
          return;
        }
      } else if (activeTripType === 'Round Trip') {
        if (!formData.pickup || !formData.drop || !formData.date || !formData.time) {
          alert('Please fill out your pickup, destination, and departure details.');
          return;
        }
      } else {
        if (!formData.pickup || !formData.drop || !formData.date || !formData.time) {
          alert('Please fill out all journey details.');
          return;
        }
      }
    }
    setFormStep(prev => prev + 1);
  };

  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const scrollToEnquiry = () => {
    const element = document.getElementById('quick-enquiry');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFleet = () => {
    const element = document.getElementById('fleet-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroFormSubmit = (e) => {
    e.preventDefault();
    scrollToEnquiry();
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setFormData({
      name: '',
      mobile: '',
      email: '',
      pickup: '',
      drop: '',
      date: '',
      time: '',
      returnDate: '',
      returnTime: '',
      localPackage: '8h / 80km Full Day',
      airportTransferType: 'Airport Pickup',
      airportName: 'Kempegowda International Airport Bengaluru (BLR)',
      flightNumber: '',
      companyName: '',
      corporateServiceType: 'Executive Chauffeur Delegation',
      vehicle: 'mercedes_s',
      passengers: '1-2',
      message: ''
    });
    setFormStep(1);
    setTimeout(() => setEnquirySuccess(false), 7000);
  };

  return (
    <div style={{ overflowX: 'clip' }}>
      
      {/* ========================================================================= */}
      {/* 1. SIDDHU CAR RENTALS — ELEGANT ADVENTURE HERO SECTION (CINEMATIC TRAVEL) */}
      {/* ========================================================================= */}
      <CinematicHero onExploreFleet={scrollToFleet} onGetQuote={scrollToEnquiry} />

      <CarRentalSearch />



      {/* ========================================================================= */}
      {/* 2. SIDDHU CAR RENTALS — ADVANCED INTERACTIVE JOURNEY PLANNER             */}
      {/* ========================================================================= */}
      <section id="quick-enquiry" className="journey-planner-section">
        {/* Soft Ambient Light Glows */}
        <div className="planner-ambient-canvas">
  <div className="planner-landscape-bg"></div>
  <div className="planner-sun"></div>
  <div className="planner-leaves-left"></div>
          <div className="planner-orb orb-sky"></div>
          <div className="planner-orb orb-peach"></div>
          <div className="planner-orb orb-mint"></div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 20px' }}>
                 <div className="planner-top-composition">
  <div className="planner-top-left">
    <div className="planner-intro-block">
            <div className="planner-brand-badge">
              <Compass size={14} className="planner-badge-icon" />
              <span>SIDDHU JOURNEY PLANNER</span>
            </div>
            <h2 className="planner-main-title">
              Where will your journey take you?
            </h2>
            <p className="planner-subtext">
              Select your travel style, personalize your route, and experience seamless, chauffeur-driven mobility.
            </p>
          </div>

          
          {/* BENTO GRID TRIP TYPE NAVIGATION */}
          <div className="bento-trip-grid">
            {[
              { key: 'Local', label: 'LOCAL', desc: 'City & hourly rental', icon: Car, className: 'bento-local', img: '/images/bento_local_1788342319392.jpg' },
              { key: 'Outstation', label: 'OUTSTATION', desc: 'Intercity getaways', icon: Compass, className: 'bento-outstation', img: '/images/bento_outstation_1788342352892.jpg' },
              { key: 'Airport Transfer', label: 'AIRPORT', desc: 'Punctual flight pickup', icon: Navigation, className: 'bento-airport', img: '/images/bento_airport_1788342392328.jpg' },
              { key: 'Corporate', label: 'CORPORATE', desc: 'Executive mobility', icon: Crown, className: 'bento-corporate', img: '/images/bento_corporate_1788342425121.jpg' },
              { key: 'One Way', label: 'ONE WAY', desc: 'Point-to-point drop', icon: ChevronRight, className: 'bento-oneway', img: '/images/bento_oneway_1788342573486.jpg' },
              { key: 'Round Trip', label: 'ROUND TRIP', desc: 'Multi-day returns', icon: RotateCw, className: 'bento-roundtrip', img: '/images/bento_roundtrip_1788342622281.jpg' }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTripType === tab.key;
              return (
                <div
                  key={tab.key}
                  onClick={() => {
                    handleCategoryChange(tab.key);
                    setIsFormOpen(true);
                    setTimeout(() => {
                      document.getElementById('planner-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  }}
                  className={`bento-card ${tab.className} ${isActive ? 'active' : ''}`}
                >
                  <img src={tab.img} alt={tab.label} className="bento-bg-img" />
                  <div className="bento-overlay">
                    
                    <div className="bento-title">{tab.label}</div>
                    <div className="bento-desc">{tab.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

  </div>
  
</div>

                    {isFormOpen && (
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div id="planner-form-section" style={{ animation: "slideDown 0.5s ease-out" }}>
{/* 2. MAIN 4-STAGE JOURNEY WORKSPACE CARD */}
          {activeTripType && (
            <div className="journey-workspace-card">
            
            {/* 4-STAGE PROGRESS STEPPER */}
            <div className="journey-stepper-strip">
              {[
                { step: 1, label: 'CONTACT DETAILS', short: 'Contact' },
                { step: 2, label: 'ROUTE & SCHEDULE', short: 'Route' },
                { step: 3, label: 'SELECT VEHICLE', short: 'Vehicle' },
                { step: 4, label: 'CONFIRM QUOTE', short: 'Confirm' }
              ].map((s, idx) => {
                const isActive = formStep === s.step;
                const isCompleted = formStep > s.step;
                return (
                  <React.Fragment key={s.step}>
                    <div 
                      className={`stepper-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={() => isCompleted && setFormStep(s.step)}
                    >
                      <div className="node-number-circle">
                        {isCompleted ? <Check size={13} strokeWidth={3} /> : `0${s.step}`}
                      </div>
                      <span className="node-text">{s.label}</span>
                    </div>
                    {idx < 3 && (
                      <div className={`stepper-connector-line ${isCompleted ? 'filled' : ''}`}>
                        <div className="connector-pulse"></div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {enquirySuccess ? (
              <div className="journey-success-state">
                <div className="success-icon-badge">
                  <CheckCircle2 size={48} color="#059669" />
                </div>
                <h3 className="success-heading">Journey Enquiry Received!</h3>
                <p className="success-description">
                  Thank you, <strong>{formData.name || 'Valued Guest'}</strong>! Our 24/7 concierge desk is calculating your exact journey quote for <strong>{activeTripType.toUpperCase()}</strong> service. You will receive an instant confirmation via WhatsApp and SMS within 5 minutes.
                </p>
                <div className="success-action-row">
                  <button 
                    type="button" 
                    className="btn-success-reset"
                    onClick={() => {
                      setEnquirySuccess(false);
                      setFormStep(1);
                    }}
                  >
                    Plan Another Journey
                  </button>
                  <a 
                    href="https://wa.me/917625059665" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-success-whatsapp"
                  >
                    Instant WhatsApp Dispatch
                  </a>
                </div>
              </div>
            ) : (
              /* 2-COLUMN WORKSPACE: LEFT CONFIGURATOR + RIGHT LIVE SUMMARY */
              <div className="journey-grid-workspace">
                
                {/* LEFT COLUMN: INTERACTIVE STEP CONFIGURATOR */}
                <div className="planner-left-form-pane">
                  
                  {/* STEP 1: CONTACT DETAILS */}
                  {formStep === 1 && (
                    <div className="step-pane-content step-enter">
                      <div className="step-pane-header">
                        <span className="step-tag-pill">STEP 01</span>
                        <h3 className="step-pane-title">Who is travelling with us?</h3>
                        <p className="step-pane-sub">We'll send your chauffeur details, booking voucher, and instant quotation here.</p>
                      </div>

                      <div className="fields-stack">
                        <div className="custom-planner-input">
                          <label className="input-header-label">
                            <User size={13} className="label-icon" />
                            <span>YOUR FULL NAME</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Anand Sharma"
                            value={formData.name}
                            onChange={e => handleInputChange('name', e.target.value)}
                            className="styled-box-input"
                            required
                          />
                        </div>

                        <div className="custom-planner-input">
                          <label className="input-header-label">
                            <PhoneCall size={13} className="label-icon" />
                            <span>MOBILE NUMBER (WHATSAPP QUOTE)</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 76250 59665"
                            value={formData.mobile}
                            onChange={e => handleInputChange('mobile', e.target.value)}
                            className="styled-box-input"
                            required
                          />
                        </div>

                        <div className="custom-planner-input">
                          <label className="input-header-label">
                            <Mail size={13} className="label-icon" />
                            <span>EMAIL ADDRESS (INVOICE & ITINERARY)</span>
                          </label>
                          <input
                            type="email"
                            placeholder="anand@company.com"
                            value={formData.email}
                            onChange={e => handleInputChange('email', e.target.value)}
                            className="styled-box-input"
                            required
                          />
                        </div>
                      </div>

                      <div className="trust-privacy-strip">
                        <ShieldCheck size={14} color="#059669" />
                        <span>Strict privacy guaranteed. No spam, zero hidden fees.</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DYNAMIC ROUTE & SCHEDULE BASED ON CATEGORY */}
                  {formStep === 2 && (
                    <div className="step-pane-content step-enter">
                      <div className="step-pane-header">
                        <span className="step-tag-pill">STEP 02 • {activeTripType.toUpperCase()}</span>
                        <h3 className="step-pane-title">
                          {activeTripType === 'Local' && 'Local City Route & Rental Duration'}
                          {activeTripType === 'Outstation' && 'Outstation Route & Intercity Schedule'}
                          {(activeTripType === 'Airport Transfer' || activeTripType === 'Airport') && 'Kempegowda Airport VIP Transfer Details'}
                          {activeTripType === 'Corporate' && 'Corporate Delegation & Reporting Schedule'}
                          {activeTripType === 'One Way' && 'Point-to-Point One Way Drop Details'}
                          {activeTripType === 'Round Trip' && 'Round Trip Outstation & Return Schedule'}
                        </h3>
                        <p className="step-pane-sub">
                          {activeTripType === 'Local' && 'Select your local pickup point, city coverage, and rental duration package.'}
                          {activeTripType === 'Outstation' && 'Specify your origin city, outstation destination, and departure dates.'}
                          {(activeTripType === 'Airport Transfer' || activeTripType === 'Airport') && 'Choose airport pickup or drop, flight number, and address.'}
                          {activeTripType === 'Corporate' && 'Enter company details, executive pickup location, and schedule.'}
                          {activeTripType === 'One Way' && 'Direct one-way transit with no return commitment.'}
                          {activeTripType === 'Round Trip' && 'Complete round-trip itinerary with scheduled return date.'}
                        </p>
                      </div>

                      {/* --- LOCAL SPECIFIC FIELDS --- */}
                      {activeTripType === 'Local' && (
                        <div className="fields-stack">
                          <div className="interactive-route-box">
                            <div className="route-connector-track">
                              <div className="route-dot pickup-dot"></div>
                              <div className="route-animated-line">
                                <div className="route-pulse-traveler"></div>
                              </div>
                              <div className="route-dot drop-dot"></div>
                            </div>
                            <div className="route-inputs-col">
                              <div className="route-input-group">
                                <span className="route-sub-label">PICKUP POINT IN BENGALURU</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Indiranagar, JP Nagar, Koramangala..."
                                  value={formData.pickup}
                                  onChange={e => handleInputChange('pickup', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                              <div className="route-shortcuts-row">
                                {['Indiranagar', 'JP Nagar', 'Koramangala', 'Whitefield', 'Jayanagar'].map(loc => (
                                  <button key={loc} type="button" onClick={() => handleInputChange('pickup', loc)} className="route-shortcut-pill">
                                    + {loc}
                                  </button>
                                ))}
                              </div>
                              <div className="route-divider-rule"></div>
                              <div className="route-input-group">
                                <span className="route-sub-label">DESTINATION / LOCAL CITY COVERAGE</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Bengaluru City / Multiple Stops / Electronic City"
                                  value={formData.drop}
                                  onChange={e => handleInputChange('drop', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="custom-planner-input">
                            <label className="input-header-label">
                              <Clock size={13} className="label-icon" />
                              <span>LOCAL RENTAL PACKAGE / DURATION</span>
                            </label>
                            <div className="package-selector-row">
                              {[
                                { id: '4h / 40km Half Day', label: '4h / 40km', sub: 'Half Day Quick' },
                                { id: '8h / 80km Full Day', label: '8h / 80km', sub: 'Full Day (Standard)' },
                                { id: '12h / 120km Extended Day', label: '12h / 120km', sub: 'Extended Full Day' }
                              ].map(pkg => (
                                <button
                                  key={pkg.id}
                                  type="button"
                                  onClick={() => handleInputChange('localPackage', pkg.id)}
                                  className={`package-pill-btn ${formData.localPackage === pkg.id ? 'active' : ''}`}
                                >
                                  <strong>{pkg.label}</strong>
                                  <span>{pkg.sub}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="datetime-cards-row">
                            <div className="datetime-card">
                              <div className="card-top-tag"><Calendar size={13} className="dt-icon" /><span>TRAVEL DATE</span></div>
                              <input type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} className="dt-native-input" required />
                            </div>
                            <div className="datetime-card">
                              <div className="card-top-tag"><Clock size={13} className="dt-icon" /><span>PICKUP TIME</span></div>
                              <input type="time" value={formData.time} onChange={e => handleInputChange('time', e.target.value)} className="dt-native-input" required />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* --- OUTSTATION SPECIFIC FIELDS --- */}
                      {activeTripType === 'Outstation' && (
                        <div className="fields-stack">
                          <div className="interactive-route-box">
                            <div className="route-connector-track">
                              <div className="route-dot pickup-dot"></div>
                              <div className="route-animated-line"><div className="route-pulse-traveler"></div></div>
                              <div className="route-dot drop-dot"></div>
                            </div>
                            <div className="route-inputs-col">
                              <div className="route-input-group">
                                <span className="route-sub-label">ORIGIN PICKUP CITY / ADDRESS</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Bengaluru / Mysuru / Hubballi"
                                  value={formData.pickup}
                                  onChange={e => handleInputChange('pickup', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                              <div className="route-shortcuts-row">
                                {['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru'].map(loc => (
                                  <button key={loc} type="button" onClick={() => handleInputChange('pickup', loc)} className="route-shortcut-pill">
                                    + {loc}
                                  </button>
                                ))}
                              </div>
                              <div className="route-divider-rule"></div>
                              <div className="route-input-group">
                                <span className="route-sub-label">OUTSTATION DESTINATION CITY</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Coorg / Mysuru / Chikmagalur / Ooty / Kabini"
                                  value={formData.drop}
                                  onChange={e => handleInputChange('drop', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                              <div className="route-shortcuts-row">
                                {['Coorg', 'Mysuru', 'Chikmagalur', 'Ooty', 'Kabini', 'Wayanad'].map(loc => (
                                  <button key={loc} type="button" onClick={() => handleInputChange('drop', loc)} className="route-shortcut-pill">
                                    + {loc}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="datetime-cards-row">
                            <div className="datetime-card">
                              <div className="card-top-tag"><Calendar size={13} className="dt-icon" /><span>DEPARTURE DATE</span></div>
                              <input type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} className="dt-native-input" required />
                            </div>
                            <div className="datetime-card">
                              <div className="card-top-tag"><Clock size={13} className="dt-icon" /><span>DEPARTURE TIME</span></div>
                              <input type="time" value={formData.time} onChange={e => handleInputChange('time', e.target.value)} className="dt-native-input" required />
                            </div>
                          </div>

                          <div className="datetime-cards-row">
                            <div className="datetime-card">
                              <div className="card-top-tag"><Calendar size={13} className="dt-icon" /><span>RETURN DATE (OPTIONAL)</span></div>
                              <input type="date" value={formData.returnDate} onChange={e => handleInputChange('returnDate', e.target.value)} className="dt-native-input" />
                            </div>
                            <div className="datetime-card">
                              <div className="card-top-tag"><Clock size={13} className="dt-icon" /><span>RETURN TIME (OPTIONAL)</span></div>
                              <input type="time" value={formData.returnTime} onChange={e => handleInputChange('returnTime', e.target.value)} className="dt-native-input" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* --- AIRPORT SPECIFIC FIELDS --- */}
                      {(activeTripType === 'Airport Transfer' || activeTripType === 'Airport') && (
                        <div className="fields-stack">
                          <div className="custom-planner-input">
                            <label className="input-header-label">
                              <Navigation size={13} className="label-icon" />
                              <span>AIRPORT TRANSFER DIRECTION</span>
                            </label>
                            <div className="airport-toggle-group">
                              <button
                                type="button"
                                onClick={() => handleInputChange('airportTransferType', 'Airport Pickup')}
                                className={`airport-toggle-btn ${formData.airportTransferType === 'Airport Pickup' ? 'active' : ''}`}
                              >
                                🛬 Pickup from BLR Airport → City
                              </button>
                              <button
                                type="button"
                                onClick={() => handleInputChange('airportTransferType', 'Airport Drop')}
                                className={`airport-toggle-btn ${formData.airportTransferType === 'Airport Drop' ? 'active' : ''}`}
                              >
                                🛫 Drop to BLR Airport from City
                              </button>
                            </div>
                          </div>

                          <div className="interactive-route-box">
                            <div className="route-inputs-col">
                              <div className="route-input-group">
                                <span className="route-sub-label">
                                  {formData.airportTransferType === 'Airport Pickup' ? 'AIRPORT ORIGIN' : 'CITY PICKUP ADDRESS'}
                                </span>
                                <input
                                  type="text"
                                  placeholder={formData.airportTransferType === 'Airport Pickup' ? 'Kempegowda International Airport (BLR)' : 'e.g. Hotel / Residence in Indiranagar'}
                                  value={formData.airportTransferType === 'Airport Pickup' ? 'Kempegowda International Airport (BLR)' : formData.pickup}
                                  onChange={e => formData.airportTransferType !== 'Airport Pickup' && handleInputChange('pickup', e.target.value)}
                                  className="route-clean-input"
                                  readOnly={formData.airportTransferType === 'Airport Pickup'}
                                  required
                                />
                              </div>
                              <div className="route-divider-rule"></div>
                              <div className="route-input-group">
                                <span className="route-sub-label">
                                  {formData.airportTransferType === 'Airport Pickup' ? 'CITY DROP DESTINATION' : 'AIRPORT DESTINATION'}
                                </span>
                                <input
                                  type="text"
                                  placeholder={formData.airportTransferType === 'Airport Pickup' ? 'e.g. Hotel Taj West End / Residence in Koramangala' : 'Kempegowda International Airport (BLR)'}
                                  value={formData.airportTransferType === 'Airport Drop' ? 'Kempegowda International Airport (BLR)' : formData.drop}
                                  onChange={e => formData.airportTransferType !== 'Airport Drop' && handleInputChange('drop', e.target.value)}
                                  className="route-clean-input"
                                  readOnly={formData.airportTransferType === 'Airport Drop'}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="datetime-cards-row">
                            <div className="datetime-card">
                              <div className="card-top-tag"><Calendar size={13} className="dt-icon" /><span>FLIGHT / TRAVEL DATE</span></div>
                              <input type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} className="dt-native-input" required />
                            </div>
                            <div className="datetime-card">
                              <div className="card-top-tag"><Clock size={13} className="dt-icon" /><span>PICKUP / LANDING TIME</span></div>
                              <input type="time" value={formData.time} onChange={e => handleInputChange('time', e.target.value)} className="dt-native-input" required />
                            </div>
                          </div>

                          <div className="custom-planner-input">
                            <label className="input-header-label">
                              <FileText size={13} className="label-icon" />
                              <span>FLIGHT NUMBER (FOR LIVE FLIGHT TRACKING)</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 6E 2341 / AI 502 / EK 564"
                              value={formData.flightNumber}
                              onChange={e => handleInputChange('flightNumber', e.target.value)}
                              className="styled-box-input"
                            />
                          </div>
                        </div>
                      )}

                      {/* --- CORPORATE SPECIFIC FIELDS --- */}
                      {activeTripType === 'Corporate' && (
                        <div className="fields-stack">
                          <div className="custom-planner-input">
                            <label className="input-header-label">
                              <Crown size={13} className="label-icon" />
                              <span>COMPANY / ORGANIZATION NAME</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Infosys / Google / Microsoft / Corporate Desk"
                              value={formData.companyName}
                              onChange={e => handleInputChange('companyName', e.target.value)}
                              className="styled-box-input"
                            />
                          </div>

                          <div className="custom-planner-input">
                            <label className="input-header-label">
                              <Shield size={13} className="label-icon" />
                              <span>CORPORATE SERVICE TYPE</span>
                            </label>
                            <select
                              value={formData.corporateServiceType}
                              onChange={e => handleInputChange('corporateServiceType', e.target.value)}
                              className="styled-box-input"
                            >
                              <option value="Executive Chauffeur Delegation">Executive Chauffeur Delegation</option>
                              <option value="Airport VIP Client Transfer">Airport VIP Client Transfer</option>
                              <option value="Intercity Board Meeting Transit">Intercity Board Meeting Transit</option>
                              <option value="Monthly Corporate Transport Account">Monthly Corporate Transport Account</option>
                            </select>
                          </div>

                          <div className="interactive-route-box">
                            <div className="route-inputs-col">
                              <div className="route-input-group">
                                <span className="route-sub-label">OFFICE / TECH PARK PICKUP POINT</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Manyata Tech Park / UB City"
                                  value={formData.pickup}
                                  onChange={e => handleInputChange('pickup', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                              <div className="route-shortcuts-row">
                                {['Manyata Tech Park', 'UB City', 'Electronic City', 'Bagmane Tech Park', 'RMZ Ecospace'].map(loc => (
                                  <button key={loc} type="button" onClick={() => handleInputChange('pickup', loc)} className="route-shortcut-pill">
                                    + {loc}
                                  </button>
                                ))}
                              </div>
                              <div className="route-divider-rule"></div>
                              <div className="route-input-group">
                                <span className="route-sub-label">DESTINATION / MEETING VENUE</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Hotel Leela Palace / Client HQ"
                                  value={formData.drop}
                                  onChange={e => handleInputChange('drop', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="datetime-cards-row">
                            <div className="datetime-card">
                              <div className="card-top-tag"><Calendar size={13} className="dt-icon" /><span>TRAVEL DATE</span></div>
                              <input type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} className="dt-native-input" required />
                            </div>
                            <div className="datetime-card">
                              <div className="card-top-tag"><Clock size={13} className="dt-icon" /><span>REPORTING TIME</span></div>
                              <input type="time" value={formData.time} onChange={e => handleInputChange('time', e.target.value)} className="dt-native-input" required />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* --- ONE WAY SPECIFIC FIELDS --- */}
                      {activeTripType === 'One Way' && (
                        <div className="fields-stack">
                          <div className="interactive-route-box">
                            <div className="route-connector-track">
                              <div className="route-dot pickup-dot"></div>
                              <div className="route-animated-line"><div className="route-pulse-traveler"></div></div>
                              <div className="route-dot drop-dot"></div>
                            </div>
                            <div className="route-inputs-col">
                              <div className="route-input-group">
                                <span className="route-sub-label">ONE WAY PICKUP LOCATION</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Bengaluru / Kempegowda Airport"
                                  value={formData.pickup}
                                  onChange={e => handleInputChange('pickup', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                              <div className="route-shortcuts-row">
                                {['Bengaluru', 'Kempegowda Airport', 'Whitefield'].map(loc => (
                                  <button key={loc} type="button" onClick={() => handleInputChange('pickup', loc)} className="route-shortcut-pill">
                                    + {loc}
                                  </button>
                                ))}
                              </div>
                              <div className="route-divider-rule"></div>
                              <div className="route-input-group">
                                <span className="route-sub-label">ONE WAY DROP DESTINATION</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Mysuru / Hassan / Tumakuru / Hosur"
                                  value={formData.drop}
                                  onChange={e => handleInputChange('drop', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                              <div className="route-shortcuts-row">
                                {['Mysuru', 'Hassan', 'Tumakuru', 'Hosur', 'Salem'].map(loc => (
                                  <button key={loc} type="button" onClick={() => handleInputChange('drop', loc)} className="route-shortcut-pill">
                                    + {loc}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="datetime-cards-row">
                            <div className="datetime-card">
                              <div className="card-top-tag"><Calendar size={13} className="dt-icon" /><span>TRAVEL DATE</span></div>
                              <input type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} className="dt-native-input" required />
                            </div>
                            <div className="datetime-card">
                              <div className="card-top-tag"><Clock size={13} className="dt-icon" /><span>PICKUP TIME</span></div>
                              <input type="time" value={formData.time} onChange={e => handleInputChange('time', e.target.value)} className="dt-native-input" required />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* --- ROUND TRIP SPECIFIC FIELDS --- */}
                      {activeTripType === 'Round Trip' && (
                        <div className="fields-stack">
                          <div className="interactive-route-box">
                            <div className="route-connector-track">
                              <div className="route-dot pickup-dot"></div>
                              <div className="route-animated-line"><div className="route-pulse-traveler"></div></div>
                              <div className="route-dot drop-dot"></div>
                            </div>
                            <div className="route-inputs-col">
                              <div className="route-input-group">
                                <span className="route-sub-label">ORIGIN PICKUP LOCATION</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Bengaluru City"
                                  value={formData.pickup}
                                  onChange={e => handleInputChange('pickup', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                              <div className="route-divider-rule"></div>
                              <div className="route-input-group">
                                <span className="route-sub-label">OUTSTATION DESTINATION (ROUND TRIP)</span>
                                <input
                                  type="text"
                                  placeholder="e.g. Coorg / Mysuru / Ooty"
                                  value={formData.drop}
                                  onChange={e => handleInputChange('drop', e.target.value)}
                                  className="route-clean-input"
                                  required
                                />
                              </div>
                              <div className="route-shortcuts-row">
                                {['Coorg', 'Mysuru', 'Chikmagalur', 'Ooty', 'Kabini', 'Wayanad'].map(loc => (
                                  <button key={loc} type="button" onClick={() => handleInputChange('drop', loc)} className="route-shortcut-pill">
                                    + {loc}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="datetime-cards-row">
                            <div className="datetime-card">
                              <div className="card-top-tag"><Calendar size={13} className="dt-icon" /><span>DEPARTURE DATE</span></div>
                              <input type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} className="dt-native-input" required />
                            </div>
                            <div className="datetime-card">
                              <div className="card-top-tag"><Clock size={13} className="dt-icon" /><span>DEPARTURE TIME</span></div>
                              <input type="time" value={formData.time} onChange={e => handleInputChange('time', e.target.value)} className="dt-native-input" required />
                            </div>
                          </div>

                          <div className="datetime-cards-row">
                            <div className="datetime-card">
                              <div className="card-top-tag"><Calendar size={13} className="dt-icon" /><span>RETURN DATE</span></div>
                              <input type="date" value={formData.returnDate} onChange={e => handleInputChange('returnDate', e.target.value)} className="dt-native-input" required />
                            </div>
                            <div className="datetime-card">
                              <div className="card-top-tag"><Clock size={13} className="dt-icon" /><span>RETURN TIME</span></div>
                              <input type="time" value={formData.returnTime} onChange={e => handleInputChange('returnTime', e.target.value)} className="dt-native-input" required />
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* STEP 3: VEHICLE SELECTION */}
                  {formStep === 3 && (
                    <div className="step-pane-content step-enter">
                      <div className="step-pane-header">
                        <span className="step-tag-pill">STEP 03</span>
                        <h3 className="step-pane-title">Choose Your Vehicle Category</h3>
                        <p className="step-pane-sub">Select the fleet model matching your comfort and passenger needs.</p>
                      </div>

                      {/* VEHICLE SELECTOR GRID */}
                      <div className="fleet-choice-grid">
                        {plannerVehicles.map(car => (
                          <div
                            key={car.id}
                            onClick={() => handleInputChange('vehicle', car.id)}
                            className={`fleet-choice-card ${formData.vehicle === car.id ? 'selected' : ''}`}
                          >
                            <div className="choice-badge">{car.priceTag}</div>
                            <div className="choice-img-box">
                              <img src={car.img} alt={car.name} className="choice-car-pic" />
                            </div>
                            <div className="choice-info">
                              <span className="choice-model">{car.name}</span>
                              <div className="choice-meta">
                                <span>{car.seats}</span>
                                <span>•</span>
                                <span>{car.bags}</span>
                              </div>
                            </div>
                            <div className="choice-radio-indicator">
                              {formData.vehicle === car.id && <div className="choice-radio-dot"></div>}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* PASSENGER & NOTES ROW */}
                      <div className="passenger-notes-row">
                        <div className="custom-planner-input">
                          <label className="input-header-label">
                            <Users size={13} className="label-icon" />
                            <span>NUMBER OF PASSENGERS</span>
                          </label>
                          <select
                            value={formData.passengers}
                            onChange={e => handleInputChange('passengers', e.target.value)}
                            className="styled-box-input"
                          >
                            <option value="1-2">1 - 2 Passengers (Sedan / Luxury SUV)</option>
                            <option value="3-4">3 - 4 Passengers (Executive Sedan / MPV)</option>
                            <option value="5-7">5 - 7 Passengers (Innova Crysta / Fortuner / Q7)</option>
                            <option value="8+">8+ Group Travel (Force Urbania / Traveller)</option>
                          </select>
                        </div>

                        <div className="custom-planner-input">
                          <label className="input-header-label">
                            <FileText size={13} className="label-icon" />
                            <span>SPECIAL TRIP INSTRUCTIONS</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Child seat, extra boot space, English chauffeur..."
                            value={formData.message}
                            onChange={e => handleInputChange('message', e.target.value)}
                            className="styled-box-input"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: REVIEW & CONFIRMATION */}
                  {formStep === 4 && (
                    <div className="step-pane-content step-enter">
                      <div className="step-pane-header">
                        <span className="step-tag-pill">STEP 04 • {activeTripType.toUpperCase()}</span>
                        <h3 className="step-pane-title">Review & Confirm Journey</h3>
                        <p className="step-pane-sub">Verify your travel summary before requesting an instant dispatch quotation.</p>
                      </div>

                      <div className="final-review-card">
                        <div className="review-row">
                          <span className="review-label">Traveler Name:</span>
                          <span className="review-val">{formData.name || 'Not specified'}</span>
                        </div>
                        <div className="review-row">
                          <span className="review-label">Contact / WhatsApp:</span>
                          <span className="review-val">{formData.mobile || 'Not specified'}</span>
                        </div>
                        <div className="review-row">
                          <span className="review-label">Booking Category:</span>
                          <span className="review-val highlight">{activeTripType.toUpperCase()}</span>
                        </div>

                        {activeTripType === 'Corporate' && formData.companyName && (
                          <div className="review-row">
                            <span className="review-label">Company / Org:</span>
                            <span className="review-val">{formData.companyName}</span>
                          </div>
                        )}

                        <div className="review-row">
                          <span className="review-label">Pickup Location:</span>
                          <span className="review-val">
                            {(activeTripType === 'Airport Transfer' || activeTripType === 'Airport') && formData.airportTransferType === 'Airport Pickup'
                              ? 'Kempegowda International Airport (BLR)'
                              : formData.pickup || 'Not selected'}
                          </span>
                        </div>

                        <div className="review-row">
                          <span className="review-label">Destination:</span>
                          <span className="review-val">
                            {(activeTripType === 'Airport Transfer' || activeTripType === 'Airport') && formData.airportTransferType === 'Airport Drop'
                              ? 'Kempegowda International Airport (BLR)'
                              : formData.drop || 'Not selected'}
                          </span>
                        </div>

                        {activeTripType === 'Local' && (
                          <div className="review-row">
                            <span className="review-label">Rental Package:</span>
                            <span className="review-val">{formData.localPackage}</span>
                          </div>
                        )}

                        <div className="review-row">
                          <span className="review-label">Travel Date & Time:</span>
                          <span className="review-val">{formData.date ? formData.date : 'Not selected'} at {formData.time ? formData.time : 'Not selected'}</span>
                        </div>

                        {(activeTripType === 'Round Trip' || (activeTripType === 'Outstation' && formData.returnDate)) && (
                          <div className="review-row">
                            <span className="review-label">Return Schedule:</span>
                            <span className="review-val">{formData.returnDate} {formData.returnTime ? `at ${formData.returnTime}` : ''}</span>
                          </div>
                        )}

                        {(activeTripType === 'Airport Transfer' || activeTripType === 'Airport') && formData.flightNumber && (
                          <div className="review-row">
                            <span className="review-label">Flight Number:</span>
                            <span className="review-val">{formData.flightNumber}</span>
                          </div>
                        )}

                        <div className="review-row">
                          <span className="review-label">Selected Vehicle:</span>
                          <span className="review-val highlight">
                            {plannerVehicles.find(v => v.id === formData.vehicle)?.name || 'Mercedes-Benz S-Class S350d'}
                          </span>
                        </div>
                      </div>

                      <div className="instant-quote-notice">
                        <Sparkles size={16} color="#0284C7" />
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.82rem', color: '#0F172A' }}>Instant Transparent Pricing Guarantee</strong>
                          <span style={{ fontSize: '0.74rem', color: '#64748B' }}>Your chauffeur allocation and all-inclusive quote will be sent directly via WhatsApp & SMS.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WORKSPACE NAVIGATION ACTIONS */}
                  <div className="workspace-action-bar">
                    {formStep > 1 ? (
                      <button type="button" onClick={prevStep} className="btn-planner-back">
                        <ChevronLeft size={16} />
                        <span>Back</span>
                      </button>
                    ) : <div></div>}

                    {formStep < 4 ? (
                      <button type="button" onClick={nextStep} className="btn-planner-next">
                        <span>
                          {formStep === 1 ? 'Continue to Route' :
                           formStep === 2 ? 'Continue to Vehicle' :
                           'Review Journey'}
                        </span>
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button type="button" onClick={handleEnquirySubmit} className="btn-planner-submit">
                        <span>CONFIRM & GET INSTANT QUOTE</span>
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>

                </div>

                {/* RIGHT COLUMN: 100% DYNAMIC "YOUR JOURNEY OVERVIEW" PANEL */}
                <div className="planner-right-summary-pane">
                  <div className="summary-board-card">
                    {/* LIVE SELECTED VEHICLE PREVIEW CARD */}
                    {(() => {
                      const selectedCar = plannerVehicles.find(v => v.id === formData.vehicle) || plannerVehicles[0];
                      return (
                        <div className="summary-vehicle-preview">
                          <div className="preview-vehicle-image-wrap">
                            <img
                              src={selectedCar.img}
                              alt={selectedCar.name}
                              className="preview-car-image"
                            />
                          </div>
                          <div className="preview-vehicle-details">
                            <div className="preview-model-title">
                              {selectedCar.name}
                            </div>
                            <div className="preview-sub-title">
                              {selectedCar.subtitle} • {selectedCar.seats}
                            </div>
                            <div className="preview-specs-chips">
                              <span className="spec-chip">✓ AC Cabin</span>
                              <span className="spec-chip">✓ Verified Chauffeur</span>
                              <span className="spec-chip">✓ Sanitized</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* INCLUDED PREMIUM GUARANTEES */}
                    <div className="summary-guarantees-list">
                      <div className="guarantee-line">
                        <Check size={13} className="g-check" />
                        <span>Free flexible cancellation up to 4 hours before pickup</span>
                      </div>
                      <div className="guarantee-line">
                        <Check size={13} className="g-check" />
                        <span>24/7 dedicated dispatch & live tracking assistance</span>
                      </div>
                      <div className="guarantee-line">
                        <Check size={13} className="g-check" />
                        <span>Transparent billing with zero surprise surcharges</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}
          </div>
          )}
          </div>
          </div>
          )}

        {/* ========================================================= */}
        {/* STYLES: ADVANCED JOURNEY PLANNER SYSTEM                   */}
        {/* ========================================================= */}
        <style>{`
          .journey-planner-section {
            position: relative;
            background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%);
            padding: 80px 0 90px 0;
            overflow: hidden;
          }

          /* AMBIENT BACKGROUND GLOWS */
          .planner-ambient-canvas {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
          }
          .planner-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.45;
          }
          .planner-orb.orb-sky {
            top: 5%;
            left: -5%;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(186, 230, 253, 0.5) 0%, transparent 70%);
          }
          .planner-orb.orb-peach {
            top: 40%;
            right: -5%;
            width: 550px;
            height: 550px;
            background: radial-gradient(circle, rgba(254, 215, 170, 0.4) 0%, transparent 70%);
          }
          .planner-orb.orb-mint {
            bottom: 0;
            left: 30%;
            width: 450px;
            height: 450px;
            background: radial-gradient(circle, rgba(167, 243, 208, 0.35) 0%, transparent 70%);
          }

          /* INTRO HEADER */
          .planner-intro-block {
            text-align: center;
            max-width: 680px;
            margin: 0 auto 36px auto;
          }
          .planner-brand-badge {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            background: rgba(2, 132, 199, 0.08);
            border: 1px solid rgba(2, 132, 199, 0.2);
            color: #0284C7;
            font-size: 0.68rem;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            padding: 5px 14px;
            border-radius: 9999px;
            margin-bottom: 14px;
          }
          .planner-badge-icon {
            color: #0284C7;
          }
          .planner-main-title {
            font-family: var(--font-ui);
            font-weight: 900;
            font-size: clamp(2rem, 3.5vw, 2.8rem);
            color: #0F172A;
            line-height: 1.15;
            letter-spacing: -0.025em;
            margin: 0 0 10px 0;
          }
          .planner-subtext {
            font-size: 0.95rem;
            line-height: 1.6;
            color: #64748B;
            margin: 0;
          }

          /* 1. SEGMENTED TRIP TYPE NAVIGATION */
          .trip-segmented-nav {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;
            max-width: 1200px;
            margin: 0 auto 32px auto;
          }
          .trip-segment-card {
            background: #FFFFFF;
            border: 1px solid rgba(226, 232, 240, 0.9);
            border-radius: 16px;
            padding: 14px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 8px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          }
          .trip-segment-card:hover {
            border-color: rgba(2, 132, 199, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.08);
          }
          .trip-segment-card.active {
            background: #FFFFFF;
            border-color: #0284C7;
            box-shadow: 0 10px 25px -4px rgba(2, 132, 199, 0.18);
            transform: translateY(-3px);
          }
          .segment-icon-wrap {
            width: 32px;
            height: 32px;
            border-radius: 10px;
            background: #F8FAFC;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          }
          .trip-segment-card.active .segment-icon-wrap {
            background: #0284C7;
          }
          .segment-title {
            font-size: 0.76rem;
            font-weight: 800;
            letter-spacing: 0.06em;
            color: #0F172A;
            display: block;
          }
          .segment-desc {
            font-size: 0.62rem;
            color: #64748B;
            font-weight: 500;
            display: block;
            line-height: 1.3;
          }
          .segment-active-pill {
            position: absolute;
            bottom: 0;
            left: 20%;
            right: 20%;
            height: 3px;
            border-radius: 3px 3px 0 0;
          }

          /* 2. MAIN JOURNEY WORKSPACE CARD */
          .journey-workspace-card {
            background: #FFFFFF;
            border-radius: 28px;
            border: 1px solid rgba(226, 232, 240, 0.95);
            box-shadow: 0 24px 60px -15px rgba(15, 23, 42, 0.08), 0 4px 20px -4px rgba(0, 0, 0, 0.02);
            padding: 36px 44px;
            max-width: 1240px;
            margin: 0 auto;
          }

          /* 4-STAGE STEPPER STRIP */
          .journey-stepper-strip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 28px;
            border-bottom: 1px solid rgba(241, 245, 249, 0.95);
            margin-bottom: 32px;
          }
          .stepper-node {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: default;
            user-select: none;
          }
          .stepper-node.completed {
            cursor: pointer;
          }
          .node-number-circle {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #F1F5F9;
            color: #64748B;
            font-size: 0.76rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          .stepper-node.active .node-number-circle {
            background: #0284C7;
            color: #FFFFFF;
            box-shadow: 0 0 14px rgba(2, 132, 199, 0.45);
          }
          .stepper-node.completed .node-number-circle {
            background: #059669;
            color: #FFFFFF;
          }
          .node-text {
            font-size: 0.74rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            color: #94A3B8;
            transition: color 0.2s ease;
          }
          .stepper-node.active .node-text {
            color: #0F172A;
            font-weight: 900;
          }
          .stepper-node.completed .node-text {
            color: #059669;
          }
          .stepper-connector-line {
            flex: 1;
            height: 2px;
            background: #E2E8F0;
            margin: 0 16px;
            position: relative;
            border-radius: 2px;
          }
          .stepper-connector-line.filled {
            background: #059669;
          }

          /* 2-COLUMN WORKSPACE GRID */
          .journey-grid-workspace {
            display: grid;
            grid-template-columns: 1.18fr 0.82fr;
            gap: 44px;
            align-items: flex-start;
          }

          /* LEFT CONFIGURATOR PANE */
          .planner-left-form-pane {
            display: flex;
            flex-direction: column;
          }
          .step-pane-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .step-pane-content.step-enter {
            animation: fadeInStep 0.35s ease;
          }
          @keyframes fadeInStep {
            0% { opacity: 0; transform: translateY(8px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .step-tag-pill {
            display: inline-block;
            font-size: 0.62rem;
            font-weight: 800;
            letter-spacing: 0.12em;
            color: #0284C7;
            background: rgba(2, 132, 199, 0.08);
            padding: 2px 8px;
            border-radius: 4px;
            margin-bottom: 6px;
          }
          .step-pane-title {
            font-family: var(--font-ui);
            font-size: 1.35rem;
            font-weight: 800;
            color: #0F172A;
            margin: 0 0 4px 0;
          }
          .step-pane-sub {
            font-size: 0.82rem;
            color: #64748B;
            margin: 0;
          }

          /* STYLED INPUT FIELDS */
          .fields-stack {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .custom-planner-input {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .input-header-label {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.65rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            color: #475569;
          }
          .label-icon {
            color: #0284C7;
          }
          .styled-box-input {
            width: 100%;
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            padding: 12px 14px;
            font-size: 0.88rem;
            font-weight: 600;
            color: #0F172A;
            outline: none;
            transition: all 0.2s ease;
          }
          .styled-box-input:focus {
            background: #FFFFFF;
            border-color: #0284C7;
            box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
          }
          .trust-privacy-strip {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.74rem;
            color: #64748B;
            background: #F8FAFC;
            padding: 10px 14px;
            border-radius: 10px;
          }

          /* INTERACTIVE ROUTE BOX */
          .interactive-route-box {
            display: flex;
            gap: 16px;
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 18px;
            padding: 20px 18px;
          }
          .route-connector-track {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 10px;
          }
          .route-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }
          .route-dot.pickup-dot {
            background: #0284C7;
            box-shadow: 0 0 8px rgba(2, 132, 199, 0.6);
          }
          .route-dot.drop-dot {
            background: #EA580C;
            box-shadow: 0 0 8px rgba(234, 88, 12, 0.6);
          }
          .route-animated-line {
            width: 2px;
            height: 100px;
            background: linear-gradient(180deg, #0284C7 0%, #EA580C 100%);
            position: relative;
            margin: 4px 0;
            border-radius: 2px;
          }
          .route-pulse-traveler {
            position: absolute;
            top: 0;
            left: -3px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #FFFFFF;
            border: 2px solid #0284C7;
            animation: travelPulse 3s linear infinite;
          }
          @keyframes travelPulse {
            0% { top: 0%; border-color: #0284C7; }
            100% { top: 90%; border-color: #EA580C; }
          }
          .route-inputs-col {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .route-input-group {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .route-sub-label {
            font-size: 0.58rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: #64748B;
          }
          .route-clean-input {
            border: none;
            background: transparent;
            font-size: 0.95rem;
            font-weight: 700;
            color: #0F172A;
            outline: none;
            padding: 2px 0;
          }
          .route-shortcuts-row {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
          }
          .route-shortcut-pill {
            background: #FFFFFF;
            border: 1px solid #CBD5E1;
            border-radius: 9999px;
            padding: 3px 8px;
            font-size: 0.65rem;
            font-weight: 600;
            color: #475569;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .route-shortcut-pill:hover {
            border-color: #0284C7;
            color: #0284C7;
            background: rgba(2, 132, 199, 0.05);
          }
          .route-divider-rule {
            height: 1px;
            background: #E2E8F0;
            margin: 4px 0;
          }

          /* DATETIME CARDS */
          .datetime-cards-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .datetime-card {
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 14px;
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .card-top-tag {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.62rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            color: #64748B;
          }
          .dt-icon {
            color: #0284C7;
          }
          .dt-native-input {
            border: none;
            background: transparent;
            font-size: 0.88rem;
            font-weight: 700;
            color: #0F172A;
            outline: none;
          }

          /* FLEET CHOICE GRID */
          .fleet-choice-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .fleet-choice-card {
            background: #F8FAFC;
            border: 1.5px solid #E2E8F0;
            border-radius: 14px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            cursor: pointer;
            position: relative;
            transition: all 0.25s ease;
          }
          .fleet-choice-card:hover {
            border-color: #0284C7;
            transform: translateY(-2px);
          }
          .fleet-choice-card.selected {
            background: #FFFFFF;
            border-color: #0284C7;
            box-shadow: 0 8px 20px -4px rgba(2, 132, 199, 0.18);
          }
          .choice-badge {
            font-size: 0.55rem;
            font-weight: 800;
            letter-spacing: 0.06em;
            color: #0284C7;
            background: rgba(2, 132, 199, 0.08);
            padding: 2px 6px;
            border-radius: 4px;
            align-self: flex-start;
          }
          .choice-img-box {
            height: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .choice-car-pic {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
          .choice-model {
            font-size: 0.78rem;
            font-weight: 800;
            color: #0F172A;
            display: block;
          }
          .choice-meta {
            display: flex;
            gap: 6px;
            font-size: 0.64rem;
            color: #64748B;
            font-weight: 600;
          }
          .choice-radio-indicator {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 1.5px solid #CBD5E1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .fleet-choice-card.selected .choice-radio-indicator {
            border-color: #0284C7;
          }
          .choice-radio-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #0284C7;
          }
          .passenger-notes-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          /* STEP 4 REVIEW */
          .final-review-card {
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 14px;
            padding: 16px 18px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .review-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.8rem;
          }
          .review-label {
            color: #64748B;
            font-weight: 600;
          }
          .review-val {
            color: #0F172A;
            font-weight: 800;
          }
          .review-val.highlight {
            color: #0284C7;
          }
          .instant-quote-notice {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(2, 132, 199, 0.08);
            border: 1px solid rgba(2, 132, 199, 0.2);
            padding: 12px 14px;
            border-radius: 12px;
          }

          /* ACTION BAR */
          .workspace-action-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 28px;
            padding-top: 20px;
            border-top: 1px solid #F1F5F9;
          }
          .btn-planner-back {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: 1px solid #CBD5E1;
            color: #475569;
            padding: 10px 18px;
            border-radius: 12px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .btn-planner-back:hover {
            border-color: #0F172A;
            color: #0F172A;
          }
          .btn-planner-next {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #0284C7;
            color: #FFFFFF;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 0.84rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
          }
          .btn-planner-next:hover {
            background: #0369A1;
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(2, 132, 199, 0.45);
          }
          .btn-planner-submit {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #EA580C;
            color: #FFFFFF;
            border: none;
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 0.84rem;
            font-weight: 900;
            letter-spacing: 0.06em;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 6px 18px rgba(234, 88, 12, 0.4);
          }
          .btn-planner-submit:hover {
            background: #C2410C;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(234, 88, 12, 0.5);
          }

          /* RIGHT SUMMARY BOARD */
          .planner-right-summary-pane {
            display: flex;
            flex-direction: column;
          }
          .summary-board-card {
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 20px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 18px;
          }
          .summary-board-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .summary-small-eyebrow {
            font-size: 0.58rem;
            font-weight: 800;
            letter-spacing: 0.14em;
            color: #0284C7;
            display: block;
          }
          .summary-board-title {
            font-family: var(--font-ui);
            font-size: 1.1rem;
            font-weight: 800;
            color: #0F172A;
            margin: 2px 0 0 0;
          }
          .summary-trip-pill {
            font-size: 0.58rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            background: #FFFFFF;
            border: 1px solid #CBD5E1;
            padding: 3px 8px;
            border-radius: 9999px;
            color: #475569;
          }

          /* SUMMARY ROUTE DISPLAY */
          .summary-route-display {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 14px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .summary-route-node {
            display: flex;
            align-items: flex-start;
            gap: 10px;
          }
          .summary-node-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            margin-top: 4px;
          }
          .summary-node-dot.origin {
            background: #0284C7;
          }
          .summary-node-dot.destination {
            background: #EA580C;
          }
          .summary-node-info {
            display: flex;
            flex-direction: column;
          }
          .node-caption {
            font-size: 0.55rem;
            font-weight: 800;
            color: #94A3B8;
            letter-spacing: 0.08em;
          }
          .node-place {
            font-size: 0.85rem;
            font-weight: 800;
            color: #0F172A;
          }
          .summary-route-mid {
            display: flex;
            align-items: center;
            gap: 10px;
            padding-left: 4px;
          }
          .summary-dashed-line {
            width: 1px;
            height: 18px;
            background: repeating-linear-gradient(180deg, #CBD5E1, #CBD5E1 3px, transparent 3px, transparent 6px);
          }
          .summary-travel-tag {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.65rem;
            color: #059669;
            font-weight: 700;
            background: rgba(5, 150, 105, 0.08);
            padding: 2px 8px;
            border-radius: 4px;
          }

          /* SUMMARY SCHEDULE STRIP */
          .summary-schedule-strip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 10px;
            padding: 10px 14px;
          }
          .schedule-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.74rem;
            font-weight: 700;
            color: #334155;
          }
          .sched-icon {
            color: #0284C7;
          }
          .schedule-divider {
            width: 1px;
            height: 14px;
            background: #E2E8F0;
          }

          /* SUMMARY VEHICLE PREVIEW */
          .summary-vehicle-preview {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 14px;
            padding: 14px;
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .preview-vehicle-image-wrap {
            width: 90px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .preview-car-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
          .preview-model-title {
            font-size: 0.82rem;
            font-weight: 800;
            color: #0F172A;
            margin-bottom: 4px;
          }
          .preview-specs-chips {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .spec-chip {
            font-size: 0.62rem;
            font-weight: 600;
            color: #059669;
          }

          /* DYNAMIC JOURNEY OVERVIEW STYLES */
          .overview-placeholder {
            color: #94A3B8;
            font-style: italic;
            font-weight: 500;
          }
          .overview-category-block {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .overview-badge-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.68rem;
            font-weight: 800;
            color: #0284C7;
            background: rgba(2, 132, 199, 0.08);
            border: 1px solid rgba(2, 132, 199, 0.2);
            padding: 4px 10px;
            border-radius: 6px;
            align-self: flex-start;
          }
          .overview-badge-tag.corporate {
            color: #7C3AED;
            background: rgba(124, 58, 237, 0.08);
            border-color: rgba(124, 58, 237, 0.2);
          }
          .overview-company-line {
            padding-bottom: 8px;
            border-bottom: 1px dashed #E2E8F0;
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .company-name-text {
            font-size: 0.88rem;
            font-weight: 800;
            color: #0F172A;
          }
          .overview-route-flow {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 14px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .overview-meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .overview-meta-item {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 10px;
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .overview-meta-item.full-width {
            grid-column: span 2;
          }
          .overview-meta-label {
            font-size: 0.58rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            color: #94A3B8;
          }
          .overview-meta-val {
            font-size: 0.8rem;
            font-weight: 700;
            color: #0F172A;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .meta-icon {
            color: #0284C7;
            flex-shrink: 0;
          }
          .package-selector-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          .package-pill-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 10px 6px;
            border-radius: 12px;
            border: 1.5px solid #E2E8F0;
            background: #F8FAFC;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .package-pill-btn strong {
            font-size: 0.8rem;
            color: #0F172A;
          }
          .package-pill-btn span {
            font-size: 0.62rem;
            color: #64748B;
            margin-top: 2px;
          }
          .package-pill-btn.active {
            background: #FFFFFF;
            border-color: #0284C7;
            box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);
          }
          .package-pill-btn.active strong {
            color: #0284C7;
          }
          .airport-toggle-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .airport-toggle-btn {
            padding: 12px 14px;
            border-radius: 12px;
            border: 1.5px solid #E2E8F0;
            background: #F8FAFC;
            font-size: 0.78rem;
            font-weight: 700;
            color: #334155;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
          }
          .airport-toggle-btn.active {
            background: #0284C7;
            border-color: #0284C7;
            color: #FFFFFF;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
          }
          .preview-sub-title {
            font-size: 0.68rem;
            font-weight: 600;
            color: #64748B;
            margin-bottom: 6px;
          }

          /* GUARANTEES */
          .summary-guarantees-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding-top: 6px;
          }
          .guarantee-line {
            display: flex;
            align-items: flex-start;
            gap: 6px;
            font-size: 0.72rem;
            color: #475569;
            line-height: 1.4;
          }
          .g-check {
            color: #059669;
            flex-shrink: 0;
            margin-top: 1px;
          }

          /* SUCCESS STATE */
          .journey-success-state {
            text-align: center;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 14px;
          }
          .success-icon-badge {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: rgba(5, 150, 105, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .success-heading {
            font-family: var(--font-ui);
            font-size: 1.6rem;
            font-weight: 900;
            color: #059669;
            margin: 0;
          }
          .success-description {
            max-width: 520px;
            font-size: 0.92rem;
            color: #475569;
            line-height: 1.6;
            margin: 0;
          }
          .success-action-row {
            display: flex;
            gap: 14px;
            margin-top: 10px;
          }
          .btn-success-reset {
            background: #FFFFFF;
            border: 1px solid #CBD5E1;
            color: #0F172A;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
          }
          .btn-success-whatsapp {
            background: #25D366;
            color: #FFFFFF;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 0.82rem;
            font-weight: 700;
            text-decoration: none;
          }

          /* RESPONSIVE BREAKPOINTS */
          @media (max-width: 1024px) {
            .trip-segmented-nav {
              grid-template-columns: repeat(3, 1fr);
            }
            .journey-grid-workspace {
              grid-template-columns: 1fr;
              gap: 32px;
            }
            .journey-workspace-card {
              padding: 28px 24px;
            }
          }

          @media (max-width: 640px) {
            .trip-segmented-nav {
              grid-template-columns: repeat(2, 1fr);
            }
            .journey-stepper-strip .node-text {
              display: none;
            }
            .datetime-cards-row, .fleet-choice-grid, .passenger-notes-row, .package-selector-row, .airport-toggle-group, .overview-meta-grid {
              grid-template-columns: 1fr;
            }
            .journey-workspace-card {
              padding: 20px 16px;
            }
          }
        `}</style>
        </div>
      </section>



      <ScrollStory />


      {/* 4. FEATURED FLEET (Redesigned Showroom Slider & Interactive Showcase) */}
      <section className="section-padding" id="fleet-section" style={{ background: '#FAF9F6', overflow: 'hidden', position: 'relative' }}>
        <div className="container">
          
          {/* Header with Title & Slider Nav Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <Badge variant="gold" icon={Crown} style={{ marginBottom: '12px' }}>
                Executive Chauffeur Showroom
              </Badge>
              <h2 className="text-h1" style={{ color: 'var(--color-slate-900)', margin: 0 }}>
                Choose Your Perfect Ride
              </h2>
              <p className="text-subtitle" style={{ marginTop: '8px', margin: 0 }}>
                Karnataka's finest commercial yellow-board fleet, meticulously maintained with verified uniformed chauffeurs.
              </p>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="showroom-slider-controls" style={{ display: 'none' }}>
              <button
                onClick={() => scrollFleet('left')}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(203, 213, 225, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold-primary)';
                  e.currentTarget.style.background = '#F8FAFC';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.9)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                aria-label="Previous Vehicles"
              >
                <ChevronRight size={20} style={{ transform: 'rotate(180deg)', color: 'var(--color-slate-800)' }} />
              </button>
              <button
                onClick={() => scrollFleet('right')}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(203, 213, 225, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold-primary)';
                  e.currentTarget.style.background = '#F8FAFC';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.9)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                aria-label="Next Vehicles"
              >
                <ChevronRight size={20} color="var(--color-slate-800)" />
              </button>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '20px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {[
              { id: 'all', label: 'All Showroom Fleet' },
              { id: 'luxury', label: 'VIP Luxury Sedans' },
              { id: 'mpv', label: 'Executive MPVs' },
              { id: 'suv', label: 'Luxury SUVs' },
              { id: 'coach', label: 'VIP Vans & Coaches' }
            ].map(tab => {
              const active = showroomFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setShowroomFilter(tab.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    border: active ? '1.5px solid var(--accent-gold-primary)' : '1px solid rgba(203, 213, 225, 0.9)',
                    background: active ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' : '#FFFFFF',
                    color: active ? '#FDE047' : 'var(--color-slate-700)',
                    fontWeight: active ? '800' : '600',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: active ? '0 4px 14px rgba(15, 23, 42, 0.15)' : '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Showroom Horizontal Carousel Container */}
          <div
            ref={fleetSliderRef}
            className="fleet-scroll-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
                paddingBottom: '24px',
                paddingLeft: '4px',
                paddingRight: '4px'
              }}
            >
                        {fleetData
                .filter(v => showroomFilter === 'all' || v.categoryKey === showroomFilter)
                .slice(0, 6)
                .map(vehicle => {
                  const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
                  const priceStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km).replace('₹', '').trim() : 'Price on Request';
                  return (
                  <div
                    key={vehicle.id}
                    style={{ width: "100%", display: "flex", flexDirection: "column" }}
                    className="showroom-card-wrapper"
                  >
                    <VehicleCard
                      name={vehicle.name}
                      category={vehicle.category}
                      image={vehicle.image}
                      price={priceStr}
                      period="8h / 80km"
                      passengerCapacity={vehicle.passengerCapacity}
                      luggageCapacity={vehicle.luggageCapacity}
                      transmission={vehicle.transmission}
                      ac={vehicle.ac}
                      rating={vehicle.rating}
                      badgeText={vehicle.badgeText}
                      onReserve={scrollToEnquiry}
                      onExplore={() => onViewVehicleDetail && onViewVehicleDetail(vehicle)}
                    />
                  </div>
                );
                })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <button
                onClick={() => onNavigate && onNavigate('fleets')}
                style={{
                  padding: '16px 40px',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(15, 23, 42, 0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.2)';
                }}
              >
                View All Fleets
              </button>
            </div>

          {/* Showroom Bottom Bar: Counter & Quick Price List Link */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(226, 232, 240, 0.8)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--color-slate-600)', fontWeight: '600' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span>All 10 fleet vehicles are 100% verified Karnataka Commercial Yellow Board & Sanitized</span>
            </div>

            <a
              href="/fleets"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                color: '#FDE047',
                fontWeight: '800',
                fontSize: '0.84rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>Explore Complete Fleet Price List Table</span>
              <ChevronRight size={16} color="#FDE047" />
            </a>
          </div>

        </div>

        <style>{`
          .fleet-scroll-container::-webkit-scrollbar {
            height: 6px;
          }
          .fleet-scroll-container::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.02);
            border-radius: 9999px;
          }
          .fleet-scroll-container::-webkit-scrollbar-thumb {
            background: rgba(2, 132, 199, 0.15);
            border-radius: 9999px;
          }
          .fleet-scroll-container::-webkit-scrollbar-thumb:hover {
            background: rgba(2, 132, 199, 0.3);
          }
          @media (max-width: 767px) {
            .showroom-slider-controls {
              display: none !important;
            }
            .showroom-card-wrapper {
              flex: 0 0 calc(100vw - 48px) !important;
            }
          }
        `}</style>
      </section>



      {/* 5. OUR SERVICES */}

      <OurServices onNavigate={onNavigate} />


      {/* 6. POPULAR DESTINATIONS (Asymmetric Travel Catalog) */}
      <section className="section-padding" style={{ background: '#FAF9F6', overflow: 'hidden' }}>
        <div className="container">
          <SectionHeader
            badge="Outstation Luxury Routes"
            badgeIcon={MapPin}
            title="Where Will"
            titleHighlight="You Go Next?"
            description="Explore South India's iconic hill stations, heritage palaces, and coastal cities in maximum comfort."
            align="center"
          />

          {/* Staggered Editorial Collage Row */}
          <div className="destination-collage-grid" style={{ marginTop: '48px' }}>
            
            {/* Featured Hero: Hampi */}
            <div className="dest-collage-card hero-dest-card" onClick={scrollToEnquiry}>
              <img src="/images/destinations/hampi.jpg" alt="Hampi UNESCO Stone Heritage" className="dest-img" />
              <div className="dest-glass-label">
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-sky-primary)', fontWeight: '700', marginBottom: '2px' }}>
                  UNESCO Stone Heritage • 340 km
                </div>
                <h4 style={{ margin: 0, fontFamily: 'var(--font-editorial)', fontSize: '1.45rem', color: 'var(--color-slate-900)' }}>Hampi Ruins</h4>
              </div>
            </div>

            {/* Stacked Right Column: Mysuru & Coorg */}
            <div className="dest-right-stack">
              
              {/* Mysuru */}
              <div className="dest-collage-card stacked-dest-card" onClick={scrollToEnquiry}>
                <img src="/images/destinations/mysuru.jpg" alt="Mysuru Palace" className="dest-img" />
                <div className="dest-glass-label">
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-coral-primary)', fontWeight: '700', marginBottom: '2px' }}>
                    Palaces & Silk Heritage • 140 km
                  </div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: 'var(--color-slate-900)' }}>Mysuru</h4>
                </div>
              </div>

              {/* Coorg */}
              <div className="dest-collage-card stacked-dest-card" onClick={scrollToEnquiry}>
                <img src="/images/destinations/coorg.jpg" alt="Coorg Western Ghats" className="dest-img" />
                <div className="dest-glass-label">
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-mint-primary)', fontWeight: '700', marginBottom: '2px' }}>
                    Misty Coffee Valleys • 260 km
                  </div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: 'var(--color-slate-900)' }}>Coorg Hills</h4>
                </div>
              </div>

            </div>

          </div>

          {/* Catalog Carousel Header */}
          <div style={{ marginTop: '56px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.35rem', color: 'var(--color-slate-900)' }}>More Handpicked Journeys</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)', fontWeight: '600' }} className="carousel-swipe-hint">Swipe to explore →</span>
          </div>

          {/* Horizontal Scrolling Ribbon */}
          <div className="dest-scroll-ribbon">
            {[
              { name: 'Chikmagalur', desc: 'Coffee Estates & Peaks', dist: '240 km', img: '/images/destinations/chikmagalur.jpg', bg: '#F0F9FF', rate: '₹24/km', fare: '~₹5,760' },
              { name: 'Ooty', desc: 'Botanical Valleys & Lakes', dist: '270 km', img: '/images/destinations/ooty.jpg', bg: '#F5F3FF', rate: '₹24/km', fare: '~₹6,480' },
              { name: 'Hampi', desc: 'UNESCO Stone Heritage', dist: '340 km', img: '/images/destinations/hampi.jpg', bg: '#FDFBF7', rate: '₹24/km', fare: '~₹8,160' },
              { name: 'Mysuru', desc: 'Palaces & Silk Heritage', dist: '140 km', img: '/images/destinations/mysuru.jpg', bg: '#FFF7ED', rate: '₹24/km', fare: '~₹3,360' },
              { name: 'Coorg', desc: 'Misty Coffee Valleys', dist: '260 km', img: '/images/destinations/coorg.jpg', bg: '#F0FDF4', rate: '₹24/km', fare: '~₹6,240' }
            ].map((d, index) => (
              <div
                key={index}
                className="dest-ribbon-card"
                onClick={scrollToEnquiry}
                style={{ background: d.bg }}
              >
                <div className="dest-ribbon-img-wrapper">
                  <img src={d.img} alt={d.name} className="dest-img" />
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <h4 style={{ margin: 0, fontFamily: 'var(--font-editorial)', fontSize: '1.15rem', color: 'var(--color-slate-900)' }}>{d.name}</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-slate-500)', fontWeight: '700' }}>{d.dist}</span>
                  </div>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.78rem', color: 'var(--color-slate-600)' }}>{d.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div>
                      <div style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-slate-500)', fontWeight: '700' }}>Starting Rate</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-slate-900)' }}>{d.rate}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-slate-500)', fontWeight: '700' }}>One-Way Est.</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-sky-primary)' }}>{d.fare}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        <style>{`
          .destination-collage-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 24px;
            width: 100%;
          }
          
          .hero-dest-card {
            grid-column: 1 / 8;
            height: 480px;
          }
          
          .dest-right-stack {
            grid-column: 8 / 13;
            display: flex;
            flex-direction: column;
            gap: 24px;
            height: 480px;
          }
          
          .stacked-dest-card {
            height: 228px;
            width: 100%;
          }
          
          .dest-collage-card {
            border-radius: 24px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.95);
            background: #FFFFFF;
          }
          
          .dest-glass-label {
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            WebkitBackdropFilter: blur(12px);
            padding: 12px 20px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
            z-index: 10;
          }
          
          .dest-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .dest-collage-card:hover .dest-img,
          .dest-ribbon-card:hover .dest-img {
            transform: scale(1.04);
          }
          
          /* Horizontal Scroll Filmstrip Ribbon */
          .dest-scroll-ribbon {
            display: flex;
            gap: 20px;
            overflow-x: auto;
            padding-bottom: 16px;
            WebkitOverflowScrolling: touch;
            scrollbar-width: thin;
            msOverflowStyle: none;
          }
          
          .dest-scroll-ribbon::-webkit-scrollbar {
            height: 5px;
          }
          .dest-scroll-ribbon::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.01);
          }
          .dest-scroll-ribbon::-webkit-scrollbar-thumb {
            background: rgba(2, 132, 199, 0.1);
            border-radius: 999px;
          }
          
          .dest-ribbon-card {
            flex: 0 0 260px;
            border-radius: 18px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 6px 18px -10px rgba(15, 23, 42, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.95);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .dest-ribbon-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 32px -12px rgba(15, 23, 42, 0.08);
          }
          
          .dest-ribbon-img-wrapper {
            width: 100%;
            aspect-ratio: 16 / 11;
            overflow: hidden;
            background: #FFFFFF;
            border-bottom: 1px solid rgba(0,0,0,0.02);
          }
          
          @media (max-width: 1023px) {
            .destination-collage-grid {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }
            .hero-dest-card, .dest-right-stack, .stacked-dest-card {
              height: 280px !important;
              width: 100% !important;
            }
          }
          @media (max-width: 480px) {
            .carousel-swipe-hint {
              display: none !important;
            }
          }
        `}</style>
      </section>

      {/* 7. TESTIMONIALS (Editorial Quote Spread) */}
      <section className="section-padding" style={{ background: '#FAF9F6' }} id="testimonials-section">
        <div className="container">
          <div className="editorial-testimonials-grid">
            
            {/* Left: Section Header & Highlights */}
            <div className="testimonials-intro-panel">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(79, 70, 229, 0.08)', borderRadius: '999px', border: '1px solid rgba(79, 70, 229, 0.15)', marginBottom: '24px' }}>
                <Star size={14} color="var(--accent-indigo-primary)" />
                <span style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-indigo-primary)' }}>
                  Verified Client Experience
                </span>
              </div>
              
              <h2 className="text-display" style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: '1.15', color: 'var(--color-slate-900)', margin: '0 0 20px 0' }}>
                Trusted by Corporate Leaders &<br />
                <span style={{ color: 'var(--accent-indigo-primary)' }}>VIP Guests</span>
              </h2>

              <p style={{ fontSize: '0.95rem', color: 'var(--color-slate-600)', lineHeight: '1.7', margin: '0 0 32px 0', maxWidth: '420px' }}>
                See why executives across Manyata Tech Park, UB City, and Whitefield choose Siddhu Car Rentals for their critical transportation needs.
              </p>

              {/* Trust Metric Badge */}
              <div className="testimonials-trust-metric">
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-slate-900)', fontFamily: 'var(--font-editorial)', lineHeight: '1' }}>4.95 / 5</div>
                <div style={{ display: 'flex', gap: '2px', margin: '6px 0 4px 0' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--accent-gold-primary)" color="var(--accent-gold-primary)" />
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>Average rating based on 2,500+ VIP journeys</div>
              </div>
            </div>

            {/* Right: Asymmetric Staggered Cards */}
            <div className="testimonials-cards-panel">
              
              {/* Card 1: Large Featured Quote */}
              <div className="editorial-quote-card card-featured">
                <div className="quote-serif">“</div>
                <div style={{ zIndex: 2, position: 'relative' }}>
                  <p className="quote-text-large">
                    Siddhu Car Rentals handled our international board delegation with complete perfection. The Mercedes S-Class was pristine and the chauffeur was impeccably punctual.
                  </p>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div className="quote-author">Ananth Narayan</div>
                      <div className="quote-author-title">Managing Director • Global Tech Capital</div>
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-indigo-primary)', background: 'rgba(79,70,229,0.08)', padding: '4px 10px', borderRadius: '6px' }}>VIP Guest</span>
                  </div>
                </div>
              </div>

              {/* Staggered Row for Cards 2 & 3 */}
              
                {/* Marquee Row for Cards 2 & 3 */}
                <div className="testimonial-marquee-wrapper">
                  <div className="testimonial-marquee-track">
                    <div className="marquee-set">
                      {/* Card 2: Sky Blue Tint */}
                <div className="editorial-quote-card card-sub" style={{ background: '#F0F9FF', borderLeft: '3px solid var(--accent-sky-primary)' }}>
                  <p className="quote-text-small">
                    Our company relies on Siddhu Car Rentals for all Kempegowda Airport pick-ups. Never missed a single flight in 3 years. Unbeatable reliability.
                  </p>
                  <div style={{ marginTop: '16px' }}>
                    <div className="quote-author-sub">Priya Sundaram</div>
                    <div className="quote-author-title-sub">VP Operations • Infosys Partner Group</div>
                  </div>
                </div>

                {/* Card 3: Mint Green Tint */}
                <div className="editorial-quote-card card-sub" style={{ background: '#F0FDF4', borderLeft: '3px solid var(--accent-mint-primary)' }}>
                  <p className="quote-text-small">
                    Booked 5 Toyota Innova Crystas for a family wedding in Mysuru. Drivers were courteous, vehicles were clean, and pricing was completely transparent.
                  </p>
                  <div style={{ marginTop: '16px' }}>
                    <div className="quote-author-sub">Vikramaditya Rao</div>
                    <div className="quote-author-title-sub">Senior Counsel • Bengaluru High Court</div>
                  </div>
                </div>
                    </div>
                    <div className="marquee-set">
                      {/* Card 2: Sky Blue Tint */}
                <div className="editorial-quote-card card-sub" style={{ background: '#F0F9FF', borderLeft: '3px solid var(--accent-sky-primary)' }}>
                  <p className="quote-text-small">
                    Our company relies on Siddhu Car Rentals for all Kempegowda Airport pick-ups. Never missed a single flight in 3 years. Unbeatable reliability.
                  </p>
                  <div style={{ marginTop: '16px' }}>
                    <div className="quote-author-sub">Priya Sundaram</div>
                    <div className="quote-author-title-sub">VP Operations • Infosys Partner Group</div>
                  </div>
                </div>

                {/* Card 3: Mint Green Tint */}
                <div className="editorial-quote-card card-sub" style={{ background: '#F0FDF4', borderLeft: '3px solid var(--accent-mint-primary)' }}>
                  <p className="quote-text-small">
                    Booked 5 Toyota Innova Crystas for a family wedding in Mysuru. Drivers were courteous, vehicles were clean, and pricing was completely transparent.
                  </p>
                  <div style={{ marginTop: '16px' }}>
                    <div className="quote-author-sub">Vikramaditya Rao</div>
                    <div className="quote-author-title-sub">Senior Counsel • Bengaluru High Court</div>
                  </div>
                </div>
                    </div>
                  </div>
                </div></div>

          </div>
        </div>

        <style>{`
          .editorial-testimonials-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 48px;
            align-items: center;
          }
          
          .testimonials-intro-panel {
            grid-column: 1 / 6;
          }
          
          .testimonials-cards-panel {
            grid-column: 6 / 13;
            display: flex;
            flex-direction: column;
            gap: 24px;
            position: relative;
          }
          
          .testimonials-trust-metric {
            border-top: 1px solid rgba(0, 0, 0, 0.08);
            padding-top: 24px;
            margin-top: 32px;
          }
          
          /* Quote Cards */
          .editorial-quote-card {
            background: #FFFFFF;
            border-radius: 24px;
            padding: 32px;
            position: relative;
            box-shadow: 0 8px 24px -12px rgba(15, 23, 42, 0.04);
            border: 1px solid rgba(226, 232, 240, 0.6);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .editorial-quote-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 16px 32px -16px rgba(15, 23, 42, 0.08);
          }
          
          .quote-serif {
            position: absolute;
            top: -10px;
            left: 20px;
            font-family: var(--font-editorial);
            font-size: 8rem;
            font-weight: 800;
            color: rgba(79, 70, 229, 0.06);
            pointer-events: none;
            line-height: 1;
          }
          
          .quote-text-large {
            font-family: var(--font-editorial);
            font-style: italic;
            font-size: 1.25rem;
            line-height: 1.65;
            color: var(--color-slate-800);
            margin: 0 0 24px 0;
            letter-spacing: -0.01em;
          }
          
          .quote-author {
            font-weight: 700;
            color: var(--color-slate-900);
            font-size: 0.95rem;
          }
          
          .quote-author-title {
            font-size: 0.76rem;
            color: var(--color-slate-500);
            margin-top: 2px;
            fontWeight: 600;
          }
          
          /* Sub Row Staggered Cards */
          
            .testimonial-marquee-wrapper {
              overflow: hidden;
              width: 100%;
              position: relative;
            }
            .testimonial-marquee-track {
              display: flex;
              gap: 24px;
              width: max-content;
              animation: marqueeSlide 15s linear infinite;
            }
            .testimonial-marquee-track:hover {
              animation-play-state: paused;
            }
            .marquee-set {
              display: flex;
              gap: 24px;
            }
            .marquee-set > .editorial-quote-card {
              width: 340px;
              flex-shrink: 0;
            }
            @keyframes marqueeSlide {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 12px)); }
            }
          
          .card-sub {
            padding: 24px;
          }
          
          .quote-text-small {
            font-size: 0.85rem;
            line-height: 1.6;
            color: var(--color-slate-700);
            margin: 0;
          }
          
          .quote-author-sub {
            font-weight: 700;
            color: var(--color-slate-900);
            font-size: 0.85rem;
          }
          
          .quote-author-title-sub {
            font-size: 0.72rem;
            color: var(--color-slate-500);
            margin-top: 2px;
            fontWeight: 600;
          }
          
          @media (max-width: 1023px) {
            .editorial-testimonials-grid {
              display: flex;
              flex-direction: column;
              gap: 40px;
            }
            .testimonials-intro-panel, .testimonials-cards-panel {
              width: 100%;
              grid-column: unset;
            }
            .testimonial-marquee-wrapper {
                width: 100vw;
                position: relative;
                left: 50%;
                right: 50%;
                margin-left: -50vw;
                margin-right: -50vw;
                padding: 0 20px;
              }
          }
        `}</style>
      </section>

      {/* 8. LUXURY MOBILITY CTA BANNER */}
      <CTASection onReserveClick={scrollToEnquiry} />

      {/* 9. CONTACT PREVIEW */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionHeader
            badge="Get In Touch"
            badgeIcon={MapPin}
            title="Bengaluru Dispatch Headquarters &"
            titleHighlight="Concierge Desk"
            description="Reach out 24/7 for instant mobility dispatch, corporate agreements, or customized itineraries."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <GlassCard variant="standard" style={{ padding: '32px' }}>
              <h3 className="text-h3" style={{ marginBottom: '20px' }}>Contact Information</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <MapPin size={22} color="var(--accent-sky-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--color-slate-900)' }}>Headquarters Address</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-slate-600)', marginTop: '2px' }}>
                      #314, 12th Main, 15th Cross, JP Nagar 5th Phase, Bengaluru - 560078
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+%23314%2C+12th+Main%2C+15th+Cross%2C+JP+Nagar+5th+Phase%2C+Bengaluru+-+560078"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        color: 'var(--accent-sky-primary)',
                        marginTop: '6px',
                        textDecoration: 'none'
                      }}
                    >
                      <span>Get Directions on Google Maps</span>
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <PhoneCall size={22} color="var(--accent-sky-primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--color-slate-900)' }}>24/7 Dispatch Desk</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-slate-600)', marginTop: '2px' }}>
                      +91 76250 59665 / +91 81472 04327
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <MessageSquare size={22} color="#25D366" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--color-slate-900)' }}>WhatsApp Priority Desk</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-slate-600)', marginTop: '2px' }}>
                      +91 76250 59665 (Instant Reply)
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Mail size={22} color="var(--accent-sky-primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--color-slate-900)' }}>Corporate Email</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-slate-600)', marginTop: '2px' }}>
                      reservations@siddhucarrentals.com
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Google Map Glass Container */}
            <GlassCard variant="standard" style={{ padding: '12px', height: '100%', minHeight: '340px' }}>
              <iframe
                title="Siddhu Car Rentals Location Bengaluru"
                src="https://maps.google.com/maps?q=siddhu%20car%20rentals%20%23314%2C%2012th%20Main%2C%2015th%20Cross%2C%20JP%20Nagar%205th%20Phase%2C%20Bengaluru%20-%20560078&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </GlassCard>
          </div>
        </div>
      </section>

    </div>
  );
};




