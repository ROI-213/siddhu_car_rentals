import React, { useState } from 'react';
import {
  Crown, Building2, ShieldCheck, Award, PhoneCall, MessageSquare, ChevronRight,
  CheckCircle2, Users, FileText, Calendar, MapPin, User, Mail, Download, Briefcase,
  Clock, FileCheck, Copy, Check, Car, Plane, Handshake, Receipt, Building,
  CalendarDays, UserCheck, TrendingUp, UsersRound, CarFront, PlaneLanding, Sparkles,
  Printer, ArrowDownToLine, Shield, Compass, FileSpreadsheet, CheckSquare
} from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Input } from '../components/common/Input';
import { LocationAutocompleteInput } from '../components/common/LocationAutocompleteInput';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { WhatsAppIcon } from '../components/common/WhatsAppEnquiryMenu';
import { SITE_CONFIG } from '../config/site';
import './CorporateTransfer.css';

export const CorporateTransfer = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedGstin, setCopiedGstin] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    phone: '',
    email: '',
    companyGstin: '',
    location: '',
    fleetSize: '1-3',
    serviceType: 'monthly_rental',
    vehicleCategory: 'innova_crysta',
    shiftPackage: '8h_80km',
    startDate: '',
    billingCycle: 'monthly_credit',
    complianceNeeds: ['nda_chauffeur', 'gst_billing'],
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    setFormData(prev => ({ ...prev, location: e.target.value }));
  };

  const handleComplianceToggle = (item) => {
    setFormData(prev => {
      const exists = prev.complianceNeeds.includes(item);
      return {
        ...prev,
        complianceNeeds: exists
          ? prev.complianceNeeds.filter(i => i !== item)
          : [...prev.complianceNeeds, item]
      };
    });
  };

  const copyGstin = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('29AAMFS1234F1Z5');
      setCopiedGstin(true);
      setTimeout(() => setCopiedGstin(false), 2500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const complianceLabels = {
      nda_chauffeur: 'NDA Signed Chauffeur',
      gst_billing: 'Monthly GST Invoicing (Net-30)',
      placard_airport: 'Airport Placard Meet & Greet',
      english_speaking: 'English-Speaking Chauffeur',
      wifi_amenities: 'Executive In-Cab Amenities'
    };

    const selectedCompliance = formData.complianceNeeds
      .map(k => complianceLabels[k] || k)
      .join(', ');

    const corporateMsg =
      `*New Corporate Fleet & Account Request*\n` +
      `----------------------------------------\n` +
      `🏢 *Company / Enterprise:* ${formData.companyName || 'N/A'}\n` +
      `👤 *Primary Contact:* ${formData.contactPerson || 'N/A'}${formData.designation ? ` (${formData.designation})` : ''}\n` +
      `📞 *Phone:* ${formData.phone || 'N/A'}\n` +
      `✉️ *Official Email:* ${formData.email || 'N/A'}\n` +
      `📍 *Office / Pickup Hub:* ${formData.location || 'Bengaluru'}\n` +
      `📋 *Service Scope:* ${formData.serviceType || 'Corporate Fleet Rental'}\n` +
      `🚗 *Fleet Category:* ${formData.vehicleCategory || 'Executive Fleet'}\n` +
      `🔢 *Number of Vehicles:* ${formData.fleetSize || 'N/A'}\n` +
      `⏱️ *Daily / Monthly Package:* ${formData.shiftPackage || 'Standard 8h/80km'}\n` +
      `📅 *Expected Start Date:* ${formData.startDate || 'Immediate'}\n` +
      `💳 *Billing & Credit Terms:* ${formData.billingCycle || 'Monthly Consolidated (Net-30)'}\n` +
      (formData.companyGstin ? `📄 *Company GSTIN:* ${formData.companyGstin}\n` : '') +
      (selectedCompliance ? `🛡️ *Compliance Required:* ${selectedCompliance}\n` : '') +
      `📝 *Special Requirements / Notes:* ${formData.notes || 'None'}\n` +
      `----------------------------------------\n` +
      `Please connect our travel desk with our dedicated corporate account manager and share a customized commercial proposal within 4 hours.`;

    const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(corporateMsg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setFormSubmitted(true);
  };

  const scrollToForm = () => {
    const el = document.getElementById('corporate-enquiry-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRateCard = () => {
    const el = document.getElementById('corporate-rate-card');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Corporate Rate Card Data
  const rateCardData = [
    {
      category: 'Executive Sedan',
      models: 'Maruti Suzuki Dzire / Toyota Etios (Commercial KA Yellow Board)',
      local8h80k: '₹2,200',
      extraKm: '₹14 / km',
      extraHr: '₹150 / hr',
      airportTransfer: '₹1,400',
      monthlyRetainer: '₹48,000 / month (2500 km / 26 days)'
    },
    {
      category: 'Premium Corporate MPV',
      models: 'Toyota Innova Crysta 2.4 VX (Captain Seats, Dual AC)',
      local8h80k: '₹3,400',
      extraKm: '₹19 / km',
      extraHr: '₹250 / hr',
      airportTransfer: '₹2,400',
      monthlyRetainer: '₹72,000 / month (2500 km / 26 days)'
    },
    {
      category: 'Luxury Business Sedan',
      models: 'Mercedes-Benz E-Class / Honda Accord Executive',
      local8h80k: '₹8,500',
      extraKm: '₹65 / km',
      extraHr: '₹600 / hr',
      airportTransfer: '₹6,500',
      monthlyRetainer: 'Custom Retainer Contract'
    },
    {
      category: 'Ultra Luxury VIP Flagship',
      models: 'Mercedes-Benz S-Class S350d / BMW 7-Series / Toyota Vellfire',
      local8h80k: '₹16,000',
      extraKm: '₹120 / km',
      extraHr: '₹1,200 / hr',
      airportTransfer: '₹12,000',
      monthlyRetainer: 'Dedicated Retainer Available'
    },
    {
      category: 'Premium SUV',
      models: 'Toyota Fortuner 4x4 / Audi Q7 Quattro',
      local8h80k: '₹6,500',
      extraKm: '₹45 / km',
      extraHr: '₹500 / hr',
      airportTransfer: '₹4,800',
      monthlyRetainer: 'Custom Retainer Contract'
    },
    {
      category: 'Executive VIP Van & Coach',
      models: 'Force Urbania VIP (12+1) / Force Traveller Luxury (16+1)',
      local8h80k: '₹5,500',
      extraKm: '₹28 / km',
      extraHr: '₹350 / hr',
      airportTransfer: '₹4,200',
      monthlyRetainer: '₹95,000 / month (Route Shuttles)'
    }
  ];

  // 6 Corporate Pillars
  const corporatePillars = [
    {
      icon: Car,
      title: 'Monthly & Long-Term Fleet Retainers',
      headline: 'Dedicated Chauffeur & Vehicle Assigned to Your Campus',
      points: [
        'Dedicated vehicle stationed exclusively at your office or executive residence',
        'Police-verified, uniformed chauffeur assigned permanently to your account',
        'Fixed flat monthly commercial billing — zero surge pricing during peak hours or rains',
        'Guaranteed immediate replacement vehicle deployed within 60 minutes for servicing or repair',
        'Flexible Dry Lease or Wet Lease options with comprehensive insurance and fuel management'
      ]
    },
    {
      icon: PlaneLanding,
      title: 'Executive Airport VIP Transfers',
      headline: 'Seamless Kempegowda International Airport (BLR) Protocol',
      points: [
        'Real-time flight gate tracking at Kempegowda Airport Terminal 1 and Terminal 2',
        'Chauffeur placed 15 minutes prior to scheduled flight landing at Arrivals',
        'Personalized acrylic or digital corporate placard meet-and-greet in arrival lounge',
        'Chauffeur name, phone, and vehicle registration shared 2 hours before flight touchdown',
        'Direct kerbside boarding assistance and luggage handling for delegates and CXOs'
      ]
    },
    {
      icon: UsersRound,
      title: 'Guest & VIP Delegation Movement',
      headline: 'Discretion, Etiquette & Confidentiality for Global Leaders',
      points: [
        'Uniformed chauffeurs trained in executive protocol, etiquette, and defensive driving',
        'Strict confidentiality with signed Non-Disclosure Agreements (NDAs) for board discussions',
        'Pristine interior sanitization with daily English business newspapers, tissues, and packaged water',
        'Priority dispatch for international investor visits, board meetings, and foreign audit teams',
        'Multi-lingual drivers with working knowledge of English, Kannada, and Hindi'
      ]
    },
    {
      icon: CalendarDays,
      title: 'Event & Conference Transportation',
      headline: 'Synchronized Fleet Convoys from 5 to 50+ Vehicles',
      points: [
        'Large-scale convoy movements for corporate offsites, tech summits, annual days, and AGMs',
        'Dedicated on-site Dispatch Marshal stationed at your venue to coordinate live vehicle movement',
        'Homogenous matching luxury fleet (all-white or all-silver Innova Crystas and Mercedes sedans)',
        'Real-time GPS tracking link shared directly with your organizing committee and security desk',
        'Digital trip sheets with single consolidated event billing for simplified accounting'
      ]
    },
    {
      icon: Receipt,
      title: 'Compliant GST Invoicing & Credit Terms',
      headline: '30-Day Net Credit Terms Built for Enterprise Procurement',
      points: [
        'Single consolidated monthly tax invoice with complete GST input tax credit (ITC) eligibility (SAC 996601)',
        'Itemized duty slip reconciliation with start/end odometer readings, trip times, and passenger signatures',
        'Standard 30-day net credit terms for empanelled corporate accounts',
        'Custom PO (Purchase Order) and Cost Center tagging for frictionless internal finance clearance',
        'Complete vendor empanelment package (GSTIN, PAN, MSME, Police Verifications, Commercial Taxi Permits)'
      ]
    },
    {
      icon: UserCheck,
      title: 'Dedicated Corporate Account Concierge',
      headline: 'Single Point of Contact for All Travel & Fleet Operations',
      points: [
        'Named Senior Corporate Account Director for your enterprise: S.M. Patil (+91 76250 59665)',
        '24/7 dedicated enterprise dispatch desk for immediate itinerary amendments or midnight runs',
        'Quarterly fleet utilization reviews with rate lock protection for long-term retainers',
        'Direct WhatsApp enterprise group for HR, Admin, and Facilities teams for 60-second response',
        'Documented SLA commitments: 99.8% on-time dispatch and zero unfulfilled booking guarantee'
      ]
    }
  ];

  // Vehicle Categories Matrix
  const vehicleTiers = [
    {
      tier: 'C-Suite & Board Sedans',
      badge: 'Flagship Luxury',
      models: 'Mercedes-Benz S-Class S350d • BMW 7-Series • Mercedes E-Class',
      capacity: '3–4 Passengers • 3 Suitcases',
      bestFor: 'Board members, Managing Directors, keynote guests, and CXO airport arrivals.',
      features: ['Ventilated Nappa Leather', 'Acoustic Privacy Glass', 'Daily Business Papers & Water', 'Rear Workspace Charging']
    },
    {
      tier: 'Executive MPVs & Luxury SUVs',
      badge: 'Enterprise Favorite',
      models: 'Toyota Innova Crysta 2.4 VX • Toyota Vellfire VIP Lounge • Audi Q7 Quattro',
      capacity: '6–7 Passengers • 5 Suitcases',
      bestFor: 'Visiting client delegations, tech park route audits, and executive team transit.',
      features: ['Reclining Captain Chairs', 'Tri-Zone Climate Control', 'High Ground Clearance', 'Ample Laptop Workspace']
    },
    {
      tier: 'VIP Coaches & Executive Shuttles',
      badge: 'Group Delegation',
      models: 'Force Urbania VIP (12+1) • Force Traveller Luxury (16+1) • Toyota HiAce Commuter',
      capacity: '12–16 Passengers • 12+ Suitcases',
      bestFor: 'Corporate tech summit shuttles, project teams, offsite retreats, and airport delegation transfers.',
      features: ['Individual AC Vents', 'Pushback Ergonomic Seats', 'PA Microphone for Briefs', 'Dedicated Luggage Boot']
    },
    {
      tier: 'Daily Campus & Tech Park Commuters',
      badge: 'Cost-Effective Mobility',
      models: 'Toyota Innova Crysta • Kia Carens • Maruti Suzuki Dzire Executive',
      capacity: '4–6 Passengers • 3 Suitcases',
      bestFor: 'Daily scheduled employee commute, IT park shuttles, and inter-office departmental travel.',
      features: ['100% KA Commercial Board', 'GPS Live Monitored', 'Punctuality SLA 99.8%', 'Sanitized Daily']
    }
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* 1. HERO SECTION */}
      <PageHero
        badge="Corporate Enterprise Mobility Solutions"
        badgeIcon={Building2}
        title="Executive Fleet Solutions for"
        titleHighlight="Modern Enterprises"
        description="Dedicated monthly corporate fleet rentals, executive airport VIP transfers, guest & VIP movement, event convoys, and GST-billed consolidated invoicing — purpose-built for HR, Admin, Travel Desks, and Facilities teams across Bengaluru."
        breadcrumbs={['Services', 'Corporate Accounts']}
        image="/images/services_corporate_s_class_landscape.jpg"
      />

      {/* 2. ENTERPRISE DOWNLOADABLE RATE CARD & HR / PROCUREMENT QUICK BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0B1120 0%, #1E293B 100%)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
        padding: '20px 0'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(197, 160, 89, 0.15)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <FileCheck size={24} color="#C5A059" />
              </div>
              <div>
                <div style={{ fontSize: '0.96rem', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                  2026 Corporate Mobility Brochure & Rate Card Available for Download
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', marginTop: '2px' }}>
                  Includes complete tariff guide, GSTIN compliance documents, SLA terms, and fleet specifications for HR & Travel Desks.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a
                href="/siddhu_car_rentals_corporate_profile.pdf"
                download="Siddhu_Car_Rentals_Corporate_Profile.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '999px',
                  background: '#C5A059',
                  color: '#0F172A',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                <ArrowDownToLine size={16} />
                <span>Download PDF Guide</span>
              </a>
              <a
                href="tel:+917625059665"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  border: '1px solid rgba(255,255,255,0.2)',
                  textDecoration: 'none'
                }}
              >
                <PhoneCall size={15} color="#C5A059" />
                <span>Corporate Desk: +91 76250 59665</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DEDICATED CORPORATE ENQUIRY FLOW (Separate from Tourist Booking) */}
      <section className="section-padding" id="corporate-enquiry-form" style={{ background: '#FAFAF8' }}>
        <div className="container">
          <SectionHeader
            badge="Dedicated Corporate Enquiry"
            badgeIcon={Briefcase}
            title="Enterprise Fleet Quote &"
            titleHighlight="Account Request"
            description="Dedicated onboarding flow for HR heads, Admin teams, Travel Desks, and Facilities managers. Receive a customized monthly tariff and SLA proposal within 4 hours."
            align="center"
          />

          <GlassCard variant="glowing" style={{ padding: '36px', maxWidth: '920px', margin: '0 auto' }}>
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', background: 'rgba(37, 211, 102, 0.08)', borderRadius: '18px', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
                <CheckCircle2 size={60} color="#128C7E" style={{ margin: '0 auto 16px auto' }} />
                <h3 className="text-h2" style={{ color: '#128C7E', marginBottom: '8px' }}>Corporate Account Request Received!</h3>
                <p className="text-body" style={{ maxWidth: '640px', margin: '0 auto 24px auto', lineHeight: '1.7', fontSize: '0.98rem' }}>
                  Thank you, <strong>{formData.contactPerson || 'valued partner'}</strong>. Our <strong>Senior Corporate Accounts Director (S.M. Patil)</strong> will connect with <strong>{formData.companyName || 'your organization'}</strong> within <strong>4 business hours</strong> with a customized commercial proposal, SLA agreement, and fleet allocation schedule.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
                  <WhatsAppButton
                    message={`*Corporate Fleet Account Request - Siddhu Car Rentals*\n\n` +
                      `• *Company:* ${formData.companyName || 'N/A'}\n` +
                      `• *Contact Person:* ${formData.contactPerson || 'N/A'}${formData.designation ? ` (${formData.designation})` : ''}\n` +
                      `• *Phone:* ${formData.phone || 'N/A'}\n` +
                      `• *Email:* ${formData.email || 'N/A'}\n` +
                      `• *Location:* ${formData.location || 'Bengaluru'}\n` +
                      `• *Service:* ${formData.serviceType || 'Corporate Rental'}\n` +
                      `• *Fleet Size:* ${formData.fleetSize || 'N/A'}\n` +
                      `• *Start Date:* ${formData.startDate || 'Immediate'}\n` +
                      `• *Billing Cycle:* ${formData.billingCycle || 'Monthly'}\n\n` +
                      `Please share your corporate contract proposal.`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                      borderRadius: '9999px', background: '#25D366', color: '#FFFFFF', fontWeight: '700',
                      fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(37,211,102,0.3)'
                    }}
                  >
                    <MessageSquare size={18} />
                    <span>Connect on WhatsApp</span>
                  </WhatsAppButton>

                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        companyName: '', contactPerson: '', designation: '', phone: '', email: '',
                        companyGstin: '', location: '', fleetSize: '1-3', serviceType: 'monthly_rental',
                        vehicleCategory: 'innova_crysta', shiftPackage: '8h_80km', startDate: '',
                        billingCycle: 'monthly_credit', complianceNeeds: ['nda_chauffeur', 'gst_billing'], notes: ''
                      });
                    }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                      borderRadius: '9999px', background: '#FFFFFF', color: 'var(--color-charcoal-800)',
                      fontWeight: '600', fontSize: '0.95rem', border: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer'
                    }}
                  >
                    <span>Submit Another Corporate Request</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

                {/* Section 1: Company / Enterprise Details */}
                <div style={{ padding: '20px', background: 'rgba(15,23,42,0.03)', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.06)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={16} />
                    <span>1. Company & Location Information</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      label="Company / Enterprise Name"
                      icon={Building}
                      placeholder="e.g. Infosys, Wipro, Accenture, Flipkart"
                      required
                    />
                    <Input
                      name="companyGstin"
                      value={formData.companyGstin}
                      onChange={handleInputChange}
                      label="Company GSTIN (For Invoicing & ITC Credit)"
                      icon={FileCheck}
                      placeholder="29AABCN1234R1ZX"
                    />
                    <div style={{ gridColumn: '1 / -1' }}>
                      <LocationAutocompleteInput
                        label="Primary Office / Tech Park Hub (Bengaluru or Outstation)"
                        placeholder="e.g. Manyata Tech Park, ITPL Whitefield, Electronic City Phase 1, Embassy GolfLinks, UB City..."
                        value={formData.location}
                        onChange={handleLocationChange}
                        name="location"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Authorized Requester / Contact Details */}
                <div style={{ padding: '20px', background: 'rgba(15,23,42,0.03)', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.06)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={16} />
                    <span>2. Authorized Contact Person</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <Input
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      label="Full Name"
                      icon={User}
                      placeholder="e.g. Priya Sundaram"
                      required
                    />
                    <Input
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      label="Department / Designation"
                      icon={Briefcase}
                      placeholder="e.g. Head of HR, Facilities Manager, Travel Desk"
                      required
                    />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      label="Corporate Mobile / WhatsApp"
                      icon={PhoneCall}
                      placeholder="+91 98765 43210"
                      required
                    />
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      label="Official Corporate Email ID"
                      icon={Mail}
                      type="email"
                      placeholder="priya@enterprise.com"
                      required
                    />
                  </div>
                </div>

                {/* Section 3: Fleet & Service Requirements */}
                <div style={{ padding: '20px', background: 'rgba(15,23,42,0.03)', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.06)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CarFront size={16} />
                    <span>3. Mobility Scope & Fleet Requirements</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
                    <Input
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      label="Primary Service Requirement"
                      icon={Crown}
                      options={[
                        { value: 'monthly_rental', label: 'Monthly Corporate Fleet Retainer (Dedicated Chauffeur)' },
                        { value: 'airport_vip', label: 'Executive Airport VIP Transfers (Kempegowda BLR)' },
                        { value: 'guest_vip', label: 'Board Member & VVIP Guest Movement (Confidential)' },
                        { value: 'employee_transport', label: 'Tech Park Daily Commute & Office Shuttles' },
                        { value: 'event_convoy', label: 'Conference / Tech Summit Convoy Transportation' },
                        { value: 'multi_service', label: 'Comprehensive Enterprise Master Agreement (All Services)' }
                      ]}
                    />

                    <Input
                      name="vehicleCategory"
                      value={formData.vehicleCategory}
                      onChange={handleInputChange}
                      label="Preferred Vehicle Category"
                      icon={Car}
                      options={[
                        { value: 'innova_crysta', label: 'Executive MPV (Toyota Innova Crysta)' },
                        { value: 'executive_sedan', label: 'Executive Sedan (Dzire / Etios / Accord)' },
                        { value: 'luxury_sedan', label: 'Flagship Luxury Sedan (Mercedes S-Class / BMW 7)' },
                        { value: 'luxury_suv', label: 'Luxury SUV (Toyota Fortuner / Audi Q7)' },
                        { value: 'vip_coach', label: 'Executive Van / Coach (Force Urbania / Traveller)' },
                        { value: 'mixed_fleet', label: 'Mixed Enterprise Fleet (Sedans + MPVs + Vans)' }
                      ]}
                    />

                    <Input
                      name="fleetSize"
                      value={formData.fleetSize}
                      onChange={handleInputChange}
                      label="Number of Vehicles Required"
                      icon={Users}
                      options={[
                        { value: '1-3', label: '1 – 3 Vehicles (Executive / Dedicated)' },
                        { value: '4-10', label: '4 – 10 Vehicles (Medium Department)' },
                        { value: '11-25', label: '11 – 25 Vehicles (Large Campus / Events)' },
                        { value: '25+', label: '25+ Vehicles (Full Enterprise Retainer)' }
                      ]}
                    />

                    <Input
                      name="shiftPackage"
                      value={formData.shiftPackage}
                      onChange={handleInputChange}
                      label="Shift Package / Daily Usage"
                      icon={Clock}
                      options={[
                        { value: '8h_80km', label: '8 Hours / 80 Kms per Day' },
                        { value: '12h_120km', label: '12 Hours / 120 Kms per Day' },
                        { value: 'monthly_2500km', label: 'Monthly Retainer (2,500 Kms / 26 Days)' },
                        { value: 'point_to_point', label: 'Point-to-Point & Airport Transfers' },
                        { value: 'custom_event', label: 'Custom Multi-Day Event Schedule' }
                      ]}
                    />

                    <Input
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      label="Expected Commencement Date"
                      icon={Calendar}
                      type="date"
                    />

                    <Input
                      name="billingCycle"
                      value={formData.billingCycle}
                      onChange={handleInputChange}
                      label="Billing & Payment Terms"
                      icon={Receipt}
                      options={[
                        { value: 'monthly_credit', label: 'Monthly Consolidated Invoice (Net-30 Credit)' },
                        { value: 'bi_weekly', label: 'Bi-Weekly Consolidated Invoice' },
                        { value: 'po_basis', label: 'Trip-Wise PO / Cost-Center Billing' }
                      ]}
                    />
                  </div>

                  {/* Compliance & Custom Corporate Checkboxes */}
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '10px' }}>
                      Corporate Protocol & Compliance Preferences:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {[
                        { id: 'nda_chauffeur', label: 'NDA-Signed Chauffeur' },
                        { id: 'gst_billing', label: 'Monthly GST Input Credit (ITC)' },
                        { id: 'placard_airport', label: 'Airport Placard Meet & Greet' },
                        { id: 'english_speaking', label: 'English-Speaking Chauffeur' },
                        { id: 'wifi_amenities', label: 'In-Cab Executive Amenities (Water/Papers)' }
                      ].map(item => {
                        const isChecked = formData.complianceNeeds.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleComplianceToggle(item.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 14px',
                              borderRadius: '999px',
                              fontSize: '0.78rem',
                              fontWeight: '600',
                              border: isChecked ? '1px solid #C5A059' : '1px solid #E2E8F0',
                              background: isChecked ? 'rgba(197,160,89,0.12)' : '#FFFFFF',
                              color: isChecked ? '#8C6D2B' : '#64748B',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {isChecked ? <CheckCircle2 size={14} color="#C5A059" /> : <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1px solid #CBD5E1' }} />}
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Section 4: Notes */}
                <Input
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  label="Special Fleet Instructions or RFP Details"
                  icon={FileText}
                  placeholder="e.g., Require 4 Innova Crystas for 3-day Manyata tech summit, dedicated fleet coordinator on site, specific reporting times..."
                />

                {/* Submit button */}
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '16px 24px',
                    borderRadius: '9999px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
                    transition: 'all 0.2s ease',
                    marginTop: '4px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(37,211,102,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.3)';
                  }}
                >
                  <WhatsAppIcon size={20} />
                  <span>Submit Corporate Request to Enterprise Desk</span>
                  <ChevronRight size={18} />
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#64748B' }}>
                  Direct line to <strong>S.M. Patil (Corporate Accounts Director)</strong>. 100% Commercial KA Yellow-Board Vehicles.
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

      {/* 4. CORPORATE VEHICLE REQUIREMENTS MATRIX */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Enterprise Fleet Tiers"
            badgeIcon={CarFront}
            title="Corporate Vehicle"
            titleHighlight="Requirements & Matrix"
            description="Purpose-selected luxury sedans, premium MPVs, and executive coaches tailored for Bengaluru enterprises."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {vehicleTiers.map((vt, i) => (
              <GlassCard key={i} variant="interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: '#8C6D2B',
                    background: 'rgba(197,160,89,0.14)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}>
                    {vt.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B' }}>
                    {vt.capacity}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: '#0F172A', marginBottom: '6px' }}>
                  {vt.tier}
                </h3>

                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-gold-primary)', marginBottom: '10px' }}>
                  {vt.models}
                </div>

                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>
                  {vt.bestFor}
                </p>

                <div style={{
                  padding: '12px 14px',
                  background: 'rgba(15,23,42,0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(15,23,42,0.06)'
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '6px', letterSpacing: '0.06em' }}>
                    Executive Amenities:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {vt.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#334155', fontWeight: '600' }}>
                        <CheckCircle2 size={13} color="#10B981" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 6 CORE CORPORATE PILLARS */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="Corporate Services Scope"
            badgeIcon={Briefcase}
            title="Complete Enterprise"
            titleHighlight="Mobility Verticals"
            description="Purpose-built solutions addressing every tier of corporate ground transportation across Bengaluru."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {corporatePillars.map((pillar, idx) => (
              <GlassCard key={idx} variant="interactive" style={{ padding: '26px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(197,160,89,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <pillar.icon size={24} color="var(--accent-gold-primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
                      {pillar.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-gold-primary)' }}>
                      {pillar.headline}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.83rem', color: '#475569', lineHeight: '1.55' }}>
                      <CheckCircle2 size={15} color="#C5A059" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE 2026 CORPORATE RATE CARD (Requirement 26) */}
      <section className="section-padding" id="corporate-rate-card">
        <div className="container">
          <SectionHeader
            badge="Transparent Enterprise Tariffs"
            badgeIcon={Receipt}
            title="2026 Corporate Tariff Guide &"
            titleHighlight="Rate Card"
            description="Transparent commercial rates for HR, Procurement, and Travel Desks. All vehicles 100% KA Yellow Board with professional chauffeurs."
            align="center"
          />

          <GlassCard variant="standard" style={{ padding: '28px', overflowX: 'auto' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              gap: '12px'
            }}>
              <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A' }}>
                Standard Corporate Tariffs (Exclusive of 5% GST & Tolls)
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="/siddhu_car_rentals_corporate_profile.pdf"
                  download="Siddhu_Car_Rentals_Corporate_Profile.pdf"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'rgba(197, 160, 89, 0.12)',
                    color: '#8C6D2B',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    border: '1px solid rgba(197, 160, 89, 0.3)'
                  }}
                >
                  <Download size={14} />
                  <span>Download PDF Rate Sheet</span>
                </a>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '760px',
                textAlign: 'left',
                fontSize: '0.85rem'
              }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '14px 16px', fontWeight: '800', color: '#0F172A' }}>Vehicle Category</th>
                    <th style={{ padding: '14px 16px', fontWeight: '800', color: '#0F172A' }}>Models Included</th>
                    <th style={{ padding: '14px 16px', fontWeight: '800', color: '#0F172A' }}>Local (8h / 80km)</th>
                    <th style={{ padding: '14px 16px', fontWeight: '800', color: '#0F172A' }}>Extra Km / Hr</th>
                    <th style={{ padding: '14px 16px', fontWeight: '800', color: '#0F172A' }}>Airport (BLR)</th>
                    <th style={{ padding: '14px 16px', fontWeight: '800', color: '#0F172A' }}>Monthly Retainer Guide</th>
                  </tr>
                </thead>
                <tbody>
                  {rateCardData.map((row, idx) => (
                    <tr key={idx} style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA'
                    }}>
                      <td style={{ padding: '14px 16px', fontWeight: '700', color: '#0F172A' }}>
                        {row.category}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#475569', fontSize: '0.82rem' }}>
                        {row.models}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--accent-gold-primary)' }}>
                        {row.local8h80k}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#334155' }}>
                        {row.extraKm} • {row.extraHr}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: '600', color: '#0284C7' }}>
                        {row.airportTransfer}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#10B981', fontWeight: '600', fontSize: '0.82rem' }}>
                        {row.monthlyRetainer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: '#F8FAFC',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: '#64748B',
              lineHeight: '1.6'
            }}>
              <strong>Commercial Invoicing Terms:</strong> Rates quoted above are standard benchmarks. Volume discounts apply for fleets of 3+ vehicles. Tolls, parking, and interstate permits billed at actuals. 5% GST applicable with full Input Tax Credit (ITC) pass-through on GSTIN invoices. 30-day net credit available upon company empanelment.
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 7. VENDOR ONBOARDING & COMPLIANCE SECTION */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <div className="corp-vendor-card">
            <div className="corp-vendor-flex">
              <div className="corp-vendor-content">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(197, 160, 89, 0.15)', color: '#E6CA85', padding: '4px 14px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  <Handshake size={13} />
                  <span>Enterprise Vendor Empanelment</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.6rem', color: '#FFFFFF', margin: '0 0 10px 0' }}>
                  Ready for Your Organization's Procurement Process
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.65', margin: 0 }}>
                  We are pre-equipped for enterprise vendor onboarding with all required documentation — GST registration, PAN, commercial insurance certificates, driver police verification records, and NDA templates. Share your vendor empanelment form and we will complete it within 24 hours.
                </p>

                <div className="corp-vendor-meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ color: '#E6CA85' }}>GSTIN:</strong>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.88rem', letterSpacing: '0.04em' }}>29AAMFS1234F1Z5</span>
                    <button
                      type="button"
                      onClick={copyGstin}
                      style={{
                        background: copiedGstin ? 'rgba(37,211,102,0.2)' : 'rgba(255,255,255,0.1)',
                        border: copiedGstin ? '1px solid #25D366' : '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        color: copiedGstin ? '#25D366' : '#FFFFFF',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {copiedGstin ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedGstin ? 'Copied' : 'Copy'}</span>
                    </button>
                  </span>
                  <span className="corp-meta-sep" style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                  <span><strong>Billing:</strong> Monthly Consolidated / Net-30 Credit</span>
                  <span className="corp-meta-sep" style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                  <span><strong>Fleet:</strong> 100% KA Commercial Yellow Board</span>
                </div>
              </div>

              <div className="corp-vendor-actions">
                <a
                  href="/siddhu_car_rentals_corporate_profile.pdf"
                  download="Siddhu_Car_Rentals_Corporate_Profile.pdf"
                  className="corp-btn-download"
                >
                  <Download size={18} />
                  <span>Download Company Profile (PDF)</span>
                </a>
                <WhatsAppButton
                  message="Hello Siddhu Car Rentals, we would like to set up a Corporate Account for our organization."
                  className="corp-btn-desk"
                >
                  <PhoneCall size={18} color="#C5A059" />
                  <span>Contact Corporate Desk</span>
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 4-STEP STREAMLINED ONBOARDING */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Simple Onboarding"
            badgeIcon={CheckCircle2}
            title="Four Steps to Your"
            titleHighlight="Corporate Account"
            description="From first enquiry to live fleet deployment — streamlined for busy procurement and admin teams."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Submit Requirement', desc: 'Fill in the corporate enquiry form above with your fleet requirements, office locations, and expected start date.' },
              { step: '02', title: 'Commercial Proposal', desc: 'Our Senior Corporate Accounts Director shares a personalized monthly tariff, SLA agreement, and vehicle allocation plan within 4 hours.' },
              { step: '03', title: 'Vendor Empanelment', desc: 'Sign the corporate mobility agreement, exchange billing GST details, and set up Net-30 credit terms.' },
              { step: '04', title: 'Live Fleet Deployment', desc: 'Vehicles deployed with pre-briefed uniformed chauffeurs, digital duty slips, live tracking, and 24/7 dedicated dispatch support.' }
            ].map((s, i) => (
              <GlassCard key={i} variant="interactive" style={{ textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #C5A059 0%, #B38E47 100%)', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: '900', margin: '0 auto 16px auto', fontFamily: 'var(--font-ui)' }}>
                  {s.step}
                </div>
                <h4 className="text-h3" style={{ fontSize: '1.02rem', marginBottom: '8px' }}>{s.title}</h4>
                <p className="text-small" style={{ lineHeight: '1.6' }}>{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
