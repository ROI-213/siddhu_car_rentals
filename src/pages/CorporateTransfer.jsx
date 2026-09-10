import React, { useState } from 'react';
import { Crown, Building2, ShieldCheck, Award, PhoneCall, MessageSquare, ChevronRight, CheckCircle2, Users, FileText, Calendar, MapPin, User, Mail, Download, Briefcase, Clock, FileCheck, Copy, Check, Car, Plane, Handshake, Receipt, Building, CalendarDays, UserCheck, TrendingUp, UsersRound, CarFront, PlaneLanding } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { Input } from '../components/common/Input';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { SITE_CONFIG } from '../config/site';

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
    fleetSize: '1-5',
    serviceType: '',
    startDate: '',
    billingCycle: 'monthly',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    setFormSubmitted(true);
  };

  const scrollToForm = () => {
    const el = document.getElementById('corporate-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const useCases = [
    {
      icon: PlaneLanding,
      title: 'Executive Airport Transfers',
      description: 'Dedicated VIP arrivals and departures for CXOs, board members, and visiting international delegates with flight tracking and meet-and-greet at Kempegowda International Airport.',
      vehicles: 'Mercedes S-Class, BMW 7-Series, Audi A8L'
    },
    {
      icon: UsersRound,
      title: 'Guest & VIP Movement',
      description: 'Chauffeur-driven luxury sedans and MPVs for visiting clients, investors, government officials, and VVIP guests with uniformed, NDA-bound chauffeurs.',
      vehicles: 'Toyota Vellfire, BMW 7-Series, Mercedes S-Class'
    },
    {
      icon: Building,
      title: 'Office & Tech Park Commutes',
      description: 'Scheduled daily pickups and drops for employees at tech parks (Manyata, Embassy, ITPL, Electronic City) with dedicated monthly fleet allocation and route optimisation.',
      vehicles: 'Toyota Innova Crysta, Honda Accord, Kia Carens'
    },
    {
      icon: CalendarDays,
      title: 'Event & Conference Transport',
      description: 'Convoys of matching sedans and MPVs for corporate offsites, tech summits, annual days, and client entertainment events with on-site dispatch coordination.',
      vehicles: 'Mixed fleet of 4–50 vehicles on demand'
    },
    {
      icon: Car,
      title: 'Monthly Fleet Rental',
      description: 'Long-term monthly vehicle assignments with fixed corporate tariffs, dedicated chauffeurs, 24/7 road support, and priority dispatch — no surge pricing.',
      vehicles: 'Any vehicle from our executive fleet'
    },
    {
      icon: Receipt,
      title: 'GST Billing & Invoicing',
      description: 'Itemised monthly invoices with GST, duty-slip reconciliation, 30-day net payment terms, and digital archiving for your finance team\'s compliance requirements.',
      vehicles: 'Applies to all monthly accounts'
    }
  ];

  const benefits = [
    { icon: ShieldCheck, title: 'NDA-Bound Chauffeurs', desc: 'All chauffeurs are police-verified, background-checked, and trained in corporate confidentiality protocols with signed NDAs.' },
    { icon: Clock, title: '99.8% Punctuality SLA', desc: 'Guaranteed on-time dispatch with live flight gate monitoring, traffic routing, and 15-minute advance placement at pickup points.' },
    { icon: Receipt, title: 'Monthly Consolidated GST Invoicing', desc: 'One consolidated invoice per month with itemised duty slips, GST input credit, 30-day credit terms, and digital delivery.' },
    { icon: UserCheck, title: 'Dedicated B2B Account Manager', desc: 'A named corporate concierge for instant dispatch, itinerary changes, escalation handling, and quarterly tariff reviews.' },
    { icon: TrendingUp, title: 'Scalable Fleet Allocation', desc: 'Start with 2 vehicles and scale to 50+ across multiple office locations. Add or remove vehicles on 30-day notice.' },
    { icon: CheckCircle2, title: 'Corporate Credit Terms', desc: 'Net-30 billing, custom PO-based invoicing, multi-location consolidation, and annual rate lock protection for long-term accounts.' }
  ];

  const howItWorks = [
    { step: '01', title: 'Submit Enquiry', desc: 'Fill in the corporate enquiry form below with your fleet requirements, office locations, and expected start date.' },
    { step: '02', title: 'Custom Tariff Proposal', desc: 'Our B2B Accounts Director shares a personalised monthly tariff, SLA agreement, and vehicle allocation plan within 4 hours.' },
    { step: '03', title: 'Agreement & Onboarding', desc: 'Sign the corporate mobility agreement, share billing details, and receive your dedicated account manager and fleet dispatch protocol.' },
    { step: '04', title: 'Live Fleet Dispatch', desc: 'Vehicles deployed with pre-briefed chauffeurs, digital duty slips, live tracking, and 24/7 priority support from day one.' }
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* 1. HERO */}
      <PageHero
        badge="B2B Corporate Mobility Solutions"
        badgeIcon={Building2}
        title="Executive Fleet Solutions for"
        titleHighlight="Modern Enterprises"
        description="Monthly corporate fleet rentals, executive airport VIP transfers, guest & VIP movement, event convoys, and GST-billed consolidated invoicing — purpose-built for HR, Admin, Travel Desks, and Facilities teams."
        breadcrumbs={['Services', 'Corporate Transfer']}
        image="/images/services_corporate_s_class_landscape.jpg"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '24px', alignItems: 'center' }}>
          <PremiumButton variant="gold" size="lg" pill icon={ChevronRight} iconPosition="right" onClick={scrollToForm}>
            Request B2B Corporate Quote
          </PremiumButton>

          <a
            href="/siddhu_car_rentals_corporate_profile.pdf"
            download="Siddhu_Car_Rentals_Corporate_Profile.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.95rem 1.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '9999px',
              background: 'rgba(197, 160, 89, 0.2)',
              color: '#FFFFFF',
              border: '1.5px solid #C5A059',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Download size={18} color="#C5A059" />
            <span>Download Corporate Profile (PDF)</span>
          </a>

          <a
            href="tel:+917625059665"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.95rem 1.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              textDecoration: 'none'
            }}
          >
            <PhoneCall size={18} color="#C5A059" />
            <span>Speak with B2B Desk</span>
          </a>
        </div>
      </PageHero>

      {/* 2. CORPORATE USE CASES */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="B2B Services Scope"
            badgeIcon={Briefcase}
            title="Built for Enterprise"
            titleHighlight="Mobility Requirements"
            description="Purpose-built for HR departments, Admin teams, Travel Desks, Facilities managers, and C-suite assistants across IT parks, corporate HQs, manufacturing campuses, and financial districts."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {useCases.map((uc, i) => (
              <GlassCard key={i} variant="interactive">
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197,160,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <uc.icon size={24} color="var(--accent-gold-primary)" />
                  </div>
                  <div>
                    <h3 className="text-h3" style={{ marginBottom: '6px', fontSize: '1.05rem' }}>{uc.title}</h3>
                    <p className="text-small" style={{ marginBottom: '10px', lineHeight: '1.6' }}>{uc.description}</p>
                    <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--accent-gold-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {uc.vehicles}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORPORATE BENEFITS */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Enterprise Account Benefits"
            badgeIcon={Award}
            title="Why Corporates Choose"
            titleHighlight="Siddhu Car Rentals"
            description="Compliant invoicing, verified personnel, dedicated account management, and guaranteed SLAs — built for enterprise procurement standards."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {benefits.map((b, i) => (
              <GlassCard key={i} variant="standard">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <b.icon size={20} color="#C5A059" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '4px' }}>{b.title}</div>
                    <p className="text-small" style={{ lineHeight: '1.6' }}>{b.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* VENDOR ONBOARDING BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '20px',
            padding: '32px',
            color: '#FFFFFF',
            border: '1px solid rgba(197, 160, 89, 0.4)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(197, 160, 89, 0.15)', color: '#E6CA85', padding: '4px 14px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  <Handshake size={13} />
                  Enterprise Vendor Onboarding
                </div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', color: '#FFFFFF', margin: '0 0 8px 0' }}>
                  Ready for Your Vendor Empanelment Process
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>
                  We are pre-equipped for vendor onboarding with all required documentation — GST registration, insurance certificates, police verification records, and driver NDA templates. Share your vendor empanelment form and we will complete it within 24 hours.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '16px', alignItems: 'center', fontSize: '0.84rem', color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ color: '#E6CA85' }}>GSTIN:</strong>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.88rem', letterSpacing: '0.04em' }}>29AAMFS1234F1Z5</span>
                    <button type="button" onClick={copyGstin} style={{ background: copiedGstin ? 'rgba(37,211,102,0.2)' : 'rgba(255,255,255,0.1)', border: copiedGstin ? '1px solid #25D366' : '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '2px 8px', color: copiedGstin ? '#25D366' : '#FFFFFF', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {copiedGstin ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedGstin ? 'Copied' : 'Copy'}</span>
                    </button>
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                  <span><strong>Billing:</strong> Monthly Consolidated / Net-30 Credit</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                  <span><strong>Fleet:</strong> 100% KA Yellow Board</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href="/siddhu_car_rentals_corporate_profile.pdf"
                  download="Siddhu_Car_Rentals_Corporate_Profile.pdf"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #C5A059 0%, #B38E47 100%)',
                    color: '#0F172A',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Download size={18} />
                  <span>Download Company Profile (PDF)</span>
                </a>
                <WhatsAppButton
                  message="Hello Siddhu Car Rentals, we would like to set up a Corporate B2B Account for our organization."
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <PhoneCall size={18} color="#C5A059" />
                  <span>Contact B2B Manager</span>
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="Simple Onboarding"
            badgeIcon={CheckCircle2}
            title="Four Steps to Your"
            titleHighlight="Corporate Account"
            description="From first enquiry to live fleet deployment — streamlined for busy procurement teams."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {howItWorks.map((step, i) => (
              <GlassCard key={i} variant="interactive" style={{ textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #C5A059 0%, #B38E47 100%)', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: '900', margin: '0 auto 16px auto', fontFamily: 'var(--font-ui)' }}>
                  {step.step}
                </div>
                <h4 className="text-h3" style={{ fontSize: '1rem', marginBottom: '8px' }}>{step.title}</h4>
                <p className="text-small" style={{ lineHeight: '1.6' }}>{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEDICATED CORPORATE ENQUIRY FORM */}
      <section className="section-padding" id="corporate-form">
        <div className="container">
          <SectionHeader
            badge="Enterprise Account Enquiry"
            badgeIcon={FileText}
            title="Corporate B2B Quote & Account"
            titleHighlight="Request"
            description="Tell us about your fleet requirements and we will prepare a custom monthly B2B tariff proposal within 4 hours."
            align="center"
          />

          <GlassCard variant="glowing" style={{ padding: '36px', maxWidth: '860px', margin: '0 auto' }}>
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 24px', background: 'rgba(37, 211, 102, 0.08)', borderRadius: '16px', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
                <CheckCircle2 size={56} color="#128C7E" style={{ margin: '0 auto 16px auto' }} />
                <h3 className="text-h2" style={{ color: '#128C7E', marginBottom: '8px' }}>Corporate Enquiry Received!</h3>
                <p className="text-body" style={{ maxWidth: '600px', margin: '0 auto 24px auto', lineHeight: '1.7' }}>
                  Thank you, <strong>{formData.contactPerson || 'valued partner'}</strong>. Our <strong>Corporate Accounts Director</strong> will connect with <strong>{formData.companyName || 'your organisation'}</strong> within <strong>4 business hours</strong> with a customised B2B tariff, SLA draft, and fleet allocation plan.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
                  <WhatsAppButton
                    message={`*Corporate B2B Enquiry - Siddhu Car Rentals*\n\n` +
                      `• *Company:* ${formData.companyName || 'N/A'}\n` +
                      `• *Contact:* ${formData.contactPerson || 'N/A'} (${formData.designation || 'N/A'})\n` +
                      `• *Phone:* ${formData.phone || 'N/A'}\n` +
                      `• *Email:* ${formData.email || 'N/A'}\n` +
                      `• *GSTIN:* ${formData.companyGstin || 'N/A'}\n` +
                      `• *Fleet Size:* ${formData.fleetSize || 'N/A'}\n` +
                      `• *Service Type:* ${formData.serviceType || 'N/A'}\n` +
                      `• *Start Date:* ${formData.startDate || 'Immediate'}\n` +
                      `• *Billing:* ${formData.billingCycle === 'monthly' ? 'Monthly' : 'Quarterly'}\n` +
                      `• *Notes:* ${formData.notes || 'None'}\n\n` +
                      `Please share your corporate contract proposal.`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                      borderRadius: '9999px', background: '#25D366', color: '#FFFFFF', fontWeight: '700',
                      fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(37,211,102,0.3)'
                    }}
                  >
                    <MessageSquare size={18} />
                    <span>Send via WhatsApp</span>
                  </WhatsAppButton>

                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ companyName: '', contactPerson: '', designation: '', phone: '', email: '', companyGstin: '', fleetSize: '1-5', serviceType: '', startDate: '', billingCycle: 'monthly', notes: '' });
                    }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                      borderRadius: '9999px', background: '#FFFFFF', color: 'var(--color-charcoal-800)',
                      fontWeight: '600', fontSize: '0.95rem', border: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer'
                    }}
                  >
                    <span>Submit Another Enquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Company Details */}
                <div style={{ padding: '16px 20px', background: 'rgba(15,23,42,0.03)', borderRadius: '12px', border: '1px solid rgba(15,23,42,0.06)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-primary)', marginBottom: '14px' }}>
                    <Building2 size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    Company Details
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <Input name="companyName" value={formData.companyName} onChange={handleInputChange} label="Company / Enterprise Name" icon={Building} placeholder="e.g. Infosys, Accenture, Flipkart" required />
                    <Input name="companyGstin" value={formData.companyGstin} onChange={handleInputChange} label="Company GSTIN (Optional)" icon={FileCheck} placeholder="29AABCN1234R1ZX" />
                  </div>
                </div>

                {/* Contact Person */}
                <div style={{ padding: '16px 20px', background: 'rgba(15,23,42,0.03)', borderRadius: '12px', border: '1px solid rgba(15,23,42,0.06)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-primary)', marginBottom: '14px' }}>
                    <User size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    Primary Contact Person
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <Input name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} label="Full Name" icon={User} placeholder="e.g. Priya Sundaram" required />
                    <Input name="designation" value={formData.designation} onChange={handleInputChange} label="Designation / Role" icon={Briefcase} placeholder="e.g. HR Manager, Admin Head, Travel Desk" />
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} label="Corporate Phone Number" icon={PhoneCall} placeholder="+91 98765 43210" required />
                    <Input name="email" value={formData.email} onChange={handleInputChange} label="Official Email ID" icon={Mail} type="email" placeholder="priya@company.com" required />
                  </div>
                </div>

                {/* Fleet Requirements */}
                <div style={{ padding: '16px 20px', background: 'rgba(15,23,42,0.03)', borderRadius: '12px', border: '1px solid rgba(15,23,42,0.06)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-primary)', marginBottom: '14px' }}>
                    <CarFront size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    Fleet & Service Requirements
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <Input name="fleetSize" value={formData.fleetSize} onChange={handleInputChange} label="Fleet Size Required" icon={Users} options={[
                      { value: '1-5', label: '1 – 5 Vehicles (Executive / VIP)' },
                      { value: '5-20', label: '5 – 20 Vehicles (Department / Medium Org)' },
                      { value: '20-50', label: '20 – 50 Vehicles (Large Campus / Event)' },
                      { value: '50+', label: '50+ Vehicles (Enterprise Annual Contract)' }
                    ]} />
                    <Input name="serviceType" value={formData.serviceType} onChange={handleInputChange} label="Primary Service Type" icon={Crown} options={[
                      { value: 'airport_vip', label: 'Executive Airport VIP Transfers' },
                      { value: 'monthly_rental', label: 'Monthly Corporate Fleet Rental' },
                      { value: 'event_convoy', label: 'Event / Conference Convoy Transport' },
                      { value: 'guest_vip', label: 'Guest / VVIP Movement & Hospitality' },
                      { value: 'employee_transport', label: 'Employee Office Commute (Tech Park)' },
                      { value: 'multi_service', label: 'Multi-Service Enterprise Agreement' }
                    ]} />
                    <Input name="startDate" value={formData.startDate} onChange={handleInputChange} label="Expected Start Date" icon={Calendar} type="date" />
                    <Input name="billingCycle" value={formData.billingCycle} onChange={handleInputChange} label="Preferred Billing Cycle" icon={Receipt} options={[
                      { value: 'monthly', label: 'Monthly Consolidated Invoicing' },
                      { value: 'quarterly', label: 'Quarterly Consolidated Invoicing' }
                    ]} />
                  </div>
                </div>

                {/* Notes */}
                <Input
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  label="Additional Requirements & Notes"
                  icon={FileText}
                  placeholder="e.g. 2 Mercedes S-Class + 4 Innova Crysta for 3-day tech summit, dedicated dispatch manager, GST invoice required..."
                />

                <PremiumButton variant="gold" size="lg" fullWidth pill icon={ChevronRight} iconPosition="right" style={{ marginTop: '12px' }}>
                  Submit Corporate Enquiry
                </PremiumButton>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

    </div>
  );
};
