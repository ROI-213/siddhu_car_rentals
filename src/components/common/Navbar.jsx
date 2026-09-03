import React, { useState, useEffect } from 'react';
import { Crown, PhoneCall, MessageSquare, Menu, X, ChevronRight, Sparkles } from 'lucide-react';
import { PremiumButton } from './PremiumButton';

export const Navbar = ({ activePage = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Fleets', id: 'fleets' },
    { label: 'Pricing', id: 'tariff' },
    { label: 'Outstation', id: 'outstation' },
    { label: 'Local', id: 'local' },
    { label: 'Corporate', id: 'corporate' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    if (onNavigate) onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 10,
        left: 0,
        right: 0,
        margin: '10px 20px',
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 1000,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.96)'
          : 'rgba(250, 249, 246, 0.90)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(226, 232, 240, 0.6)',
        boxShadow: isScrolled
          ? '0 10px 30px -10px rgba(15, 23, 42, 0.1)'
          : '0 4px 20px rgba(15, 23, 42, 0.05)'
      }}
    >
      {/* Top Dispatch Strip */}
      <div style={{
        background: 'linear-gradient(90deg, #0284C7 0%, #0369A1 100%)',
        color: '#FFFFFF',
        fontSize: '0.75rem',
        padding: '5px 0',
        fontWeight: '500'
      }}>
        <div className="container" style={{ maxWidth: '1440px', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={13} color="#FFFFFF" />
            <span>Bengaluru’s Premier Luxury Chauffeur Service — Kempegowda Airport & Corporate Fleets</span>
          </div>
          <div style={{ display: 'none', gap: '20px', alignItems: 'center' }} className="nav-top-right">
            <a href="tel:+917625059665" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
              📞 Dispatch: +91 76250 59665 / 81472 04327
            </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+%23314%2C+12th+Main%2C+15th+Cross%2C+JP+Nagar+5th+Phase%2C+Bengaluru+-+560078"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#FFFFFF', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              title="View on Google Maps"
            >
              <span>📍 JP Nagar 5th Phase, Bengaluru</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div 
        className="container" 
        style={{ 
          maxWidth: '1440px',
          padding: '0 20px',
          height: isScrolled ? '70px' : '82px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '12px',
          transition: 'height 0.3s ease' 
        }}
      >
        
        {/* LEFT: Official Brand Logo Lockup */}
        <div
          onClick={() => handleNavClick('home')}
          className="navbar-brand-lockup"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            cursor: 'pointer', 
            flexShrink: 0,
            userSelect: 'none',
            padding: '2px 0'
          }}
        >
          {/* Luxury Obsidian Gold Medallion Plaque */}
          <div style={{
            height: isScrolled ? '44px' : '52px',
            width: isScrolled ? '54px' : '64px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #090D16 0%, #151D2A 100%)',
            border: '1px solid rgba(197, 160, 89, 0.5)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(197, 160, 89, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            flexShrink: 0,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <img 
              src="/images/siddhu_logo_transparent.png" 
              alt="Siddhu Car Rentals" 
              style={{ 
                height: '100%', 
                width: '100%', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 1px 4px rgba(255, 215, 0, 0.35))'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="brand-text-block">
            <span style={{ 
              fontFamily: 'var(--font-editorial, "Playfair Display", serif)', 
              fontWeight: '900', 
              fontSize: isScrolled ? '0.98rem' : '1.1rem', 
              letterSpacing: '0.03em',
              color: '#0F172A',
              lineHeight: '1.1',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease'
            }}>
              SIDDHU <span style={{ color: '#0284C7' }}>CAR RENTALS</span>
            </span>
            <span style={{ 
              fontSize: '0.6rem', 
              fontWeight: '800', 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase', 
              color: '#64748B',
              marginTop: '2px',
              whiteSpace: 'nowrap'
            }}>
              Bengaluru Luxury Chauffeur
            </span>
          </div>
        </div>

        {/* CENTER: Navigation Links */}
        <nav className="nav-center-links">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-btn-link ${isActive ? 'active' : ''}`}
              >
                <span>{item.label}</span>
                {isActive && <span className="nav-btn-active-bar" />}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Action Cluster (Call, WhatsApp, Get Quote) */}
        <div className="nav-right-actions">
          <a
            href="tel:+917625059665"
            className="nav-action-call"
            title="Call Dispatch Desk"
          >
            <PhoneCall size={14} color="var(--accent-sky-primary)" />
            <span className="action-text">Call</span>
          </a>

          <a
            href="https://wa.me/917625059665?text=Hello%20Siddhu%20Car%20Rentals,%20I%20would%20like%20to%20enquire%20about%20luxury%20car%20booking%20and%20tariffs."
            target="_blank"
            rel="noopener noreferrer"
            className="nav-action-wa"
            title="Chat on WhatsApp"
          >
            <MessageSquare size={14} />
            <span className="action-text">WhatsApp</span>
          </a>

          <PremiumButton variant="sky" size="sm" pill icon={ChevronRight} iconPosition="right" onClick={() => handleNavClick('contact')}>
            <span style={{ whiteSpace: 'nowrap' }}>Get Quote</span>
          </PremiumButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-hamburger-btn"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} color="var(--color-slate-900)" /> : <Menu size={22} color="var(--color-slate-900)" />}
        </button>
      </div>

      {/* 100% Light Mobile Full-Screen Navigation Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '110px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(250, 249, 246, 0.98)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          zIndex: 999,
          padding: '24px 20px 40px 20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--accent-sky-border)'
        }}>
          
          {/* Ambient Background Shape */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.08) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-sky-primary)', fontWeight: '700', marginBottom: '10px' }}>
              Explore Services & Fleets
            </div>
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '14px 16px',
                    minHeight: '48px',
                    borderRadius: '12px',
                    background: isActive ? 'rgba(2, 132, 199, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                    border: isActive ? '1px solid var(--accent-sky-primary)' : '1px solid rgba(226,232,240,0.8)',
                    color: isActive ? 'var(--accent-sky-primary)' : 'var(--color-slate-900)',
                    fontFamily: isActive ? 'var(--font-editorial)' : 'var(--font-ui)',
                    fontSize: '1.05rem',
                    fontWeight: isActive ? '700' : '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={18} opacity={isActive ? 1 : 0.4} />
                </button>
              );
            })}

            {/* Admin Management Link in Mobile Menu */}
            <button
              onClick={() => handleNavClick('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(197, 160, 89, 0.1)',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                color: '#C5A059',
                fontSize: '0.92rem',
                fontWeight: '700',
                cursor: 'pointer',
                textAlign: 'left',
                marginTop: '8px'
              }}
            >
              <span>⚙️ Admin Tariff Portal</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Sticky Bottom Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '28px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <a
                href="tel:+917625059665"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--color-slate-900)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                <PhoneCall size={16} color="var(--accent-sky-primary)" />
                <span>Call</span>
              </a>
              <a
                href="https://wa.me/917625059665"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                <MessageSquare size={16} />
                <span>WhatsApp</span>
              </a>
            </div>

            <PremiumButton variant="sky" size="lg" fullWidth pill icon={ChevronRight} iconPosition="right" onClick={() => handleNavClick('contact')}>
              Get Quote
            </PremiumButton>
          </div>
        </div>
      )}

      <style>{`
        .nav-center-links {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1.1vw, 16px);
          flex: 1;
          justify-content: center;
          margin: 0 10px;
          min-width: 0;
        }
        .nav-btn-link {
          background: none;
          border: none;
          font-family: var(--font-ui);
          font-size: clamp(0.78rem, 0.88vw, 0.86rem);
          font-weight: 500;
          color: var(--color-slate-700);
          cursor: pointer;
          padding: 6px 3px;
          position: relative;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .nav-btn-link:hover {
          color: var(--accent-sky-primary);
        }
        .nav-btn-link.active {
          color: var(--accent-sky-primary);
          font-weight: 700;
        }
        .nav-btn-active-bar {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2.5px;
          background-color: var(--accent-sky-primary);
          border-radius: 2px;
        }
        .nav-right-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .nav-action-call {
          display: flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-slate-800);
          padding: 7px 12px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.95);
          border: 1px solid var(--border-glass-subtle);
          box-shadow: 0 2px 6px rgba(0,0,0,0.03);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .nav-action-call:hover {
          border-color: var(--accent-sky-primary);
          color: var(--accent-sky-primary);
          transform: translateY(-1px);
        }
        .nav-action-wa {
          display: flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          color: #FFFFFF;
          padding: 7px 14px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .nav-action-wa:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        }
        .mobile-hamburger-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid var(--border-glass-subtle);
          cursor: pointer;
        }

        /* RESPONSIVE NAVBAR BREAKPOINTS */
        @media (min-width: 1380px) {
          .nav-top-right { display: flex !important; }
        }
        @media (min-width: 1080px) and (max-width: 1280px) {
          .nav-center-links { gap: 8px; margin: 0 6px; }
          .nav-btn-link { font-size: 0.78rem; padding: 4px 2px; }
          .nav-action-call { padding: 7px 9px; }
          .nav-action-call .action-text { display: none; }
          .nav-action-wa { padding: 7px 10px; }
        }
        @media (max-width: 1079px) {
          .nav-center-links { display: none !important; }
          .nav-right-actions { display: none !important; }
          .mobile-hamburger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
