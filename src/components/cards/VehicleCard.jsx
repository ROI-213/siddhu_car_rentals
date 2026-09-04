import React, { useState } from 'react';
import { Users, Briefcase, Disc, Wind, Star, ChevronRight, Eye, ShieldCheck } from 'lucide-react';

export const VehicleCard = ({
  name,
  category = 'Luxury Executive',
  image,
  price,
  period = '8h / 80km',
  passengerCapacity = 4,
  luggageCapacity = 3,
  transmission = 'Automatic',
  ac = 'Air Conditioned',
  rating = 5.0,
  badgeText = null,
  onReserve,
  onExplore
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Class styling accents
  const getAccent = () => {
    const n = (name || '').toLowerCase();
    const c = (category || '').toLowerCase();
    if (n.includes('s-class') || n.includes('bmw') || n.includes('vellfire') || c.includes('luxury') || c.includes('vip')) {
      return {
        tag: 'VIP Luxury Class',
        color: '#B45309',
        badgeBg: 'rgba(245, 158, 11, 0.12)',
        btnBg: 'linear-gradient(135deg, #C5A059 0%, #B38E47 100%)',
        btnHover: 'linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)',
        accentColor: '#C5A059'
      };
    }
    if (n.includes('fortuner') || n.includes('audi') || c.includes('suv')) {
      return {
        tag: 'Executive SUV',
        color: '#0369A1',
        badgeBg: 'rgba(2, 132, 199, 0.1)',
        btnBg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
        btnHover: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
        accentColor: '#0284C7'
      };
    }
    if (n.includes('urbania') || n.includes('traveller') || n.includes('commuter') || c.includes('coach') || c.includes('van')) {
      return {
        tag: 'VIP Delegation Coach',
        color: '#4338CA',
        badgeBg: 'rgba(99, 102, 241, 0.12)',
        btnBg: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
        btnHover: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        accentColor: '#4F46E5'
      };
    }
    return {
      tag: 'Executive Fleet',
      color: '#0F766E',
      badgeBg: 'rgba(13, 148, 136, 0.1)',
      btnBg: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
      btnHover: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
      accentColor: '#0F766E'
    };
  };

  const accent = getAccent();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#FFFFFF',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: isHovered 
          ? '0 20px 35px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(197, 160, 89, 0.35)'
          : '0 4px 20px -4px rgba(15, 23, 42, 0.05)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}
    >
      {/* 1. VEHICLE PHOTOGRAPH CONTAINER (Crisp 16:10 framing with subtle luxury vignette) */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/10',
        minHeight: '220px',
        maxHeight: '240px',
        overflow: 'hidden',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        minHeight: '260px',
        maxHeight: '320px'
      }}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center center',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>

      {/* 2. VEHICLE DETAILS BODY */}
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Tagline / Class Header */}
          <div style={{
            fontSize: '0.72rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: accent.color,
            marginBottom: '6px'
          }}>
            {accent.tag}
          </div>

          {/* Vehicle Name (Consistent 2-line height for clean horizontal alignment) */}
          <h3 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.2rem',
            fontWeight: '800',
            color: 'var(--color-slate-900)',
            margin: '0 0 14px 0',
            letterSpacing: '-0.01em',
            lineHeight: '1.3',
            minHeight: '3.1rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            {name}
          </h3>
        </div>

        {/* 3. TARIFF FOOTER & DUAL ACTION BUTTONS */}
        <div style={{
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          paddingTop: '14px',
          marginTop: '6px'
        }}>
          {/* Price Header Row */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--color-slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
                Official Package
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-slate-600)', fontWeight: '600' }}>
                Garage to Garage
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '1.4rem',
                fontWeight: '900',
                color: 'var(--color-slate-900)',
                fontFamily: 'var(--font-ui)'
              }}>
                ₹{price}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: '600', marginLeft: '3px' }}>
                /{period}
              </span>
            </div>
          </div>

          {/* Action Buttons (Dual Pill Layout) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px'
          }}>
            {/* Secondary CTA: Explore Specs & Gallery */}
            <button
              onClick={onExplore}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                height: '40px',
                borderRadius: '10px',
                background: '#FFFFFF',
                border: '1.5px solid rgba(203, 213, 225, 0.9)',
                color: 'var(--color-slate-800)',
                fontSize: '0.78rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.borderColor = '#94A3B8';
                e.currentTarget.style.color = '#0F172A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.9)';
                e.currentTarget.style.color = 'var(--color-slate-800)';
              }}
            >
              <Eye size={14} />
              <span>View Specs</span>
            </button>

            {/* Primary CTA: Book This Vehicle via WhatsApp */}
            <a
              href={`https://wa.me/917625059665?text=${encodeURIComponent(`Hello Siddhu Car Rentals, I would like to book the ${name} (${price ? `₹${price}/${period}` : 'Price on Request'}). Please share availability and booking details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                height: '40px',
                borderRadius: '10px',
                background: accent.btnBg,
                border: 'none',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.25s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = accent.btnHover;
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = accent.btnBg;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              <span>Book Now</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

