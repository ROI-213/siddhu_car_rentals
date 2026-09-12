import React, { useState } from 'react';
import { Users, Briefcase, Disc, Wind, Star, ChevronRight, Eye, ShieldCheck } from 'lucide-react';
import { WhatsAppEnquiryMenu, WhatsAppIcon } from '../common/WhatsAppEnquiryMenu';

export const VehicleCard = ({
  name,
  category = 'Luxury Executive',
  image,
  price,
  period = '8h / 80km',
  passengerCapacity = 4,
  passengerDisplay,
  luggageCapacity = 3,
  luggageDisplay,
  categoryKey = '',
  categoryLabel,
  chauffeurIncluded = true,
  bestFor = '',
  bestSuitedFor = null,
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
    const c = (categoryKey || category || '').toLowerCase();
    if (c === 'luxury' || n.includes('s-class') || n.includes('7-series') || n.includes('vellfire') || n.includes('a8')) {
      return {
        tag: categoryLabel || 'Luxury Flagship',
        color: '#B45309',
        badgeBg: 'rgba(245, 158, 11, 0.12)',
        btnBg: 'linear-gradient(135deg, #C5A059 0%, #B38E47 100%)',
        btnHover: 'linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)',
        accentColor: '#C5A059'
      };
    }
    if (c === 'premium' || n.includes('e-class') || n.includes('5 series') || n.includes('q7') || n.includes('camry')) {
      return {
        tag: categoryLabel || 'Premium Luxury',
        color: '#0369A1',
        badgeBg: 'rgba(2, 132, 199, 0.1)',
        btnBg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
        btnHover: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
        accentColor: '#0284C7'
      };
    }
    if (c === 'group' || n.includes('commuter') || n.includes('traveller') || n.includes('bus')) {
      return {
        tag: categoryLabel || 'Group Travel',
        color: '#4338CA',
        badgeBg: 'rgba(99, 102, 241, 0.12)',
        btnBg: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
        btnHover: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        accentColor: '#4F46E5'
      };
    }
    return {
      tag: categoryLabel || 'Executive Fleet',
      color: '#0F766E',
      badgeBg: 'rgba(13, 148, 136, 0.1)',
      btnBg: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
      btnHover: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
      accentColor: '#0F766E'
    };
  };

  const accent = getAccent();
  const displayPassengers = passengerDisplay || `${passengerCapacity} Passengers + Chauffeur`;
  const displayLuggage = luggageDisplay || `${luggageCapacity} Bags`;
  const suitedText = Array.isArray(bestSuitedFor) && bestSuitedFor.length > 0 
    ? bestSuitedFor.slice(0, 3).join(' • ') 
    : (bestFor || 'Airport • Corporate • Outstation');

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="vehicle-card-root"
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
      {/* 1. VEHICLE PHOTOGRAPH CONTAINER */}
      <div className="vehicle-card-img-box" style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/10',
        overflow: 'hidden',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        minHeight: '200px',
        maxHeight: '280px'
      }}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="vehicle-card-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center center',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        {/* Category Tag Top Left */}
        <div className="vehicle-card-badge" style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '0.70rem',
          fontWeight: '800',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: accent.color,
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(4px)'
        }}>
          {accent.tag}
        </div>
      </div>

      {/* 2. VEHICLE DETAILS BODY */}
      <div className="vehicle-card-body" style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Vehicle Name */}
          <h3 className="vehicle-card-title" style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.15rem',
            fontWeight: '800',
            color: 'var(--color-slate-900)',
            margin: '0 0 12px 0',
            letterSpacing: '-0.01em',
            lineHeight: '1.3',
            minHeight: '3.0rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            {name}
          </h3>

          {/* Useful Specs Pills */}
          <div className="vehicle-card-specs" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '10px'
          }}>
            {/* Passenger Capacity */}
            <span className="vehicle-spec-pill" style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              color: 'var(--color-slate-800)',
              background: '#F1F5F9',
              padding: '4px 9px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Users size={12} color="#0284C7" />
              <span className="spec-text-full">{displayPassengers}</span>
              <span className="spec-text-short">{passengerCapacity} Seats</span>
            </span>

            {/* Luggage Capacity */}
            <span className="vehicle-spec-pill" style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              color: 'var(--color-slate-800)',
              background: '#F1F5F9',
              padding: '4px 9px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Briefcase size={12} color="#64748B" />
              <span className="spec-text-full">{displayLuggage}</span>
              <span className="spec-text-short">{luggageCapacity} Bags</span>
            </span>

            {/* Chauffeur Included Tag */}
            <span className="vehicle-spec-pill chauffeur-pill" style={{
              fontSize: '0.70rem',
              fontWeight: '700',
              color: '#15803D',
              background: 'rgba(22, 163, 74, 0.1)',
              padding: '4px 9px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <ShieldCheck size={12} color="#15803D" />
              <span className="spec-text-full">Chauffeur Included</span>
              <span className="spec-text-short">Chauffeur</span>
            </span>
          </div>

          {/* Best Suited For Row */}
          <div className="vehicle-card-suited" style={{
            fontSize: '0.71rem',
            color: 'var(--color-slate-600)',
            lineHeight: '1.4',
            marginBottom: '12px',
            background: 'rgba(15, 23, 42, 0.02)',
            padding: '6px 10px',
            borderRadius: '6px',
            borderLeft: `3px solid ${accent.accentColor}`
          }}>
            <span style={{ fontWeight: '700', color: 'var(--color-slate-800)' }}>Best Suited For: </span>
            {suitedText}
          </div>
        </div>

        {/* 3. TARIFF FOOTER & DUAL ACTION BUTTONS */}
        <div className="vehicle-card-footer" style={{
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          paddingTop: '14px',
          marginTop: '6px'
        }}>
          {/* Price Header Row */}
          <div className="vehicle-price-row" style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <div className="vehicle-price-label-box">
              <div className="vehicle-price-label" style={{ fontSize: '0.68rem', color: 'var(--color-slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
                Official Package
              </div>
              <div className="vehicle-price-sub" style={{ fontSize: '0.74rem', color: 'var(--color-slate-600)', fontWeight: '600' }}>
                Garage to Garage
              </div>
            </div>
            <div className="vehicle-price-val-box" style={{ textAlign: 'right' }}>
              <span className="vehicle-price-num" style={{
                fontSize: '1.4rem',
                fontWeight: '900',
                color: 'var(--color-slate-900)',
                fontFamily: 'var(--font-ui)'
              }}>
                ₹{price}
              </span>
              <span className="vehicle-price-period" style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: '600', marginLeft: '3px' }}>
                /{period}
              </span>
            </div>
          </div>

          {/* Action Buttons (Dual Pill Layout) */}
          <div className="vehicle-card-actions" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px'
          }}>
            {/* Secondary CTA: Explore Specs & Gallery */}
            <button
              onClick={onExplore}
              className="vehicle-specs-btn"
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
              <Eye size={13} />
              <span className="vc-btn-full">View Specs</span>
              <span className="vc-btn-short">Specs</span>
            </button>

            {/* Primary CTA: Get Quote */}
            <WhatsAppEnquiryMenu
              context={{ vehicleName: name, vehicleCategory: category, price: price }}
              menuPlacement="bottom-end"
              className="vehicle-quote-btn"
              iconSize={13}
              buttonStyle={{
                width: '100%',
                height: '40px',
                borderRadius: '10px',
                background: '#25D366',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(37, 211, 102, 0.25)',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#20BA5A';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(37, 211, 102, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#25D366';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(37, 211, 102, 0.25)';
              }}
            >
              <WhatsAppIcon size={13} />
              <span className="vc-btn-full">Get Quote</span>
              <span className="vc-btn-short">Quote</span>
            </WhatsAppEnquiryMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

