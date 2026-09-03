import React from 'react';
import { Crown, PhoneCall, MessageSquare, ChevronRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { PremiumButton } from './PremiumButton';

export const CTASection = ({
  title = "Experience Unmatched Luxury Mobility Today",
  description = "Book your Mercedes-Benz sedan, Innova Crysta, or BMW executive chauffeur in Bengaluru with 100% transparent pricing and instant WhatsApp booking.",
  onReserveClick
}) => {
  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden', padding: '60px 0' }}>
      <div className="container">
        <div
          className="glass-dark-card cta-banner-box"
          style={{
            padding: '56px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #090D16 0%, #151D2C 50%, #090D16 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '28px',
            boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(197, 160, 89, 0.25)'
          }}
        >
          {/* Ambient Gold Glow Backdrop */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '650px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(197,160,89,0.18) 0%, rgba(2,132,199,0.08) 50%, rgba(0,0,0,0) 75%)',
            pointerEvents: 'none'
          }} />

          {/* Crown Icon Badge */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #182030 0%, #26334A 100%)',
            border: '1.5px solid rgba(197, 160, 89, 0.6)',
            boxShadow: '0 8px 24px rgba(197, 160, 89, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            position: 'relative',
            zIndex: 2
          }}>
            <Crown size={30} color="#E5C07B" />
          </div>

          <h2
            style={{
              color: '#FFFFFF',
              maxWidth: '780px',
              margin: '0 auto 16px auto',
              fontFamily: 'var(--font-editorial, "Playfair Display", serif)',
              fontSize: 'clamp(2rem, 3.8vw, 2.85rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              letterSpacing: '-0.015em',
              textShadow: '0 2px 14px rgba(0,0,0,0.6)',
              position: 'relative',
              zIndex: 2
            }}
          >
            {title}
          </h2>

          <p
            style={{
              color: 'rgba(255, 255, 255, 0.82)',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
              maxWidth: '660px',
              margin: '0 auto 36px auto',
              lineHeight: '1.7',
              fontWeight: '400',
              position: 'relative',
              zIndex: 2
            }}
          >
            {description}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              position: 'relative',
              zIndex: 2
            }}
          >
            <button
              type="button"
              onClick={onReserveClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.95rem 2rem',
                fontSize: '1rem',
                fontWeight: '800',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(217, 119, 6, 0.45)',
                transition: 'all 0.25s ease'
              }}
            >
              <span>Reserve Vehicle Now</span>
              <ChevronRight size={18} />
            </button>

            <a
              href="https://wa.me/917625059665"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.95rem 2rem',
                fontSize: '1rem',
                fontWeight: '700',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.25s ease'
              }}
            >
              <MessageSquare size={18} />
              <span>WhatsApp Quick Book</span>
            </a>

            <a
              href="tel:+917625059665"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.95rem 2rem',
                fontSize: '1rem',
                fontWeight: '700',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease'
              }}
            >
              <PhoneCall size={18} color="#FBBF24" />
              <span>+91 76250 59665</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
