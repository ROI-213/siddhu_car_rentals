import React, { useState } from 'react';
import { Crown, MapPin, Phone, Mail, ShieldCheck, Clock, Award, Globe, ExternalLink, Share2, FileText } from 'lucide-react';
import { LegalModal } from './LegalModal';

export const Footer = ({ onNavigate }) => {
  const [legalModalType, setLegalModalType] = useState(null);

  const handleNav = (id) => {
    if (onNavigate) onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#12151C',
      color: '#FFFFFF',
      paddingTop: '80px',
      paddingBottom: '40px',
      borderTop: '1px solid rgba(197, 160, 89, 0.25)',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        
        {/* Main 5-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          
          {/* Column 1: Brand & Excellence */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #C5A059 0%, #E6CA85 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(197, 160, 89, 0.3)'
              }}>
                <Crown size={22} color="#12151C" />
              </div>
              <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                SIDDHU
              </span>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '24px' }}>
              Bengaluru’s premier luxury car rental and executive chauffeur mobility service. Delivering pristine luxury sedans, VIP MPVs, and outstation fleets.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#C5A059' }}>
                <ShieldCheck size={14} /> Uniformed Drivers
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#C5A059' }}>
                <Award size={14} /> 24/7 Dispatch
              </div>
            </div>
          </div>

          {/* Column 2: Company Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', marginBottom: '20px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
              <li><button onClick={() => handleNav('about')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}>About Us</button></li>
              <li><button onClick={() => handleNav('tariff')} style={{ background: 'none', border: 'none', color: '#C5A059', fontWeight: '700', cursor: 'pointer', padding: 0, font: 'inherit' }}>Fleet Pricing & Rate Card</button></li>
              <li><button onClick={() => handleNav('fleets')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}>Fleet Gallery</button></li>
              <li><button onClick={() => handleNav('testimonials')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}>Verified Testimonials</button></li>
              <li><button onClick={() => handleNav('contact')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}>Contact & Concierge</button></li>
            </ul>
          </div>

          {/* Column 3: Mobility Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', marginBottom: '20px' }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
              <li><button onClick={() => handleNav('local')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}>Local City Transfer</button></li>
              <li><button onClick={() => handleNav('outstation')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}>Outstation Journeys</button></li>
              <li><button onClick={() => handleNav('corporate')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}>Corporate B2B Mobility</button></li>
              <li><button onClick={() => handleNav('local')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}>Airport VIP Transfer</button></li>
              <li><button onClick={() => handleNav('tariff')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}>Fleet Rate Card</button></li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', marginBottom: '20px' }}>
              Contact & Tax Details
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+%23314%2C+12th+Main%2C+15th+Cross%2C+JP+Nagar+5th+Phase%2C+Bengaluru+-+560078"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', gap: '10px', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }}
                title="View on Google Maps"
              >
                <MapPin size={16} color="#C5A059" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>#314, 12th Main, 15th Cross, JP Nagar 5th Phase, Bengaluru - 560078</span>
              </a>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={16} color="#C5A059" style={{ flexShrink: 0 }} />
                <span>+91 76250 59665 / +91 81472 04327</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={16} color="#C5A059" style={{ flexShrink: 0 }} />
                <span>reservations@siddhucarrentals.com</span>
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                padding: '8px 12px',
                background: 'rgba(197, 160, 89, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                marginTop: '4px'
              }}>
                <FileText size={15} color="#C5A059" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#E6CA85', fontWeight: '600' }}>
                  GSTIN: 29AAMFS1234F1Z5
                </span>
              </div>
            </div>
          </div>

          {/* Column 5: Social Profiles */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C5A059', marginBottom: '20px' }}>
              Social & Profiles
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <span>Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span>Instagram</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                <span>YouTube</span>
              </a>
              <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                <Globe size={16} color="#C5A059" /> <span>Google Business Profile</span>
              </a>
            </div>
          </div>

        </div>

        {/* Legal Links & Copyright Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontSize: '0.84rem',
          color: 'rgba(255,255,255,0.55)'
        }}>
          <div>
            © 2026 Siddhu Car Rentals. All Rights Reserved. Executive Chauffeur Brand Bengaluru.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <button
              onClick={() => setLegalModalType('privacy')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#C5A059'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModalType('terms')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#C5A059'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setLegalModalType('cancellation')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#C5A059'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              Cancellation Policy
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Modal for Privacy Policy, Terms & Conditions, and Cancellation */}
      <LegalModal
        isOpen={Boolean(legalModalType)}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </footer>
  );
};
