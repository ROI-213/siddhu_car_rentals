import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Crown, Award, ShieldCheck, Clock, Users, Star, Car, CheckCircle2, HeartHandshake, Sparkles, Building2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';

// Fleet car images strictly excluding tempo travellers and buses
const ABOUT_CAR_SLIDES = [
  {
    name: "Mercedes-Benz S-Class S350d",
    badge: "Flagship VIP",
    category: "Ultra Luxury Sedans",
    src: "/images/sclass_front.png",
    fit: "contain"
  },
  {
    name: "Mercedes-Benz S-Class Chauffeur Service",
    badge: "VIP Chauffeur",
    category: "Ultra Luxury VIP",
    src: "/images/fleet/mercedes_s_class_chauffeur.jpg",
    fit: "cover"
  },
  {
    name: "Toyota Vellfire Executive Lounge",
    badge: "Supreme VIP Lounge",
    category: "Ultra Luxury MPVs",
    src: "/images/vellfire_front.jpg",
    fit: "cover"
  },
  {
    name: "Toyota Vellfire VIP Lounge Edition",
    badge: "Captain Ottoman Seats",
    category: "Ultra Luxury MPVs",
    src: "/images/fleet/vellfire_front_quarter.png",
    fit: "contain"
  },
  {
    name: "BMW 730Ld xDrive (7 Series)",
    badge: "Ultra VIP Flagship",
    category: "Luxury Flagship Sedans",
    src: "/images/bmw_front.jpg",
    fit: "cover"
  },
  {
    name: "Mercedes-Benz E-Class Executive",
    badge: "VIP Luxury",
    category: "Premium German Sedans",
    src: "/images/eclass_front.jpg",
    fit: "cover"
  },
  {
    name: "BMW 5 Series Luxury Line",
    badge: "German Executive",
    category: "Premium Sedans",
    src: "/images/fleet/bmw_5_series_white_front.jpg",
    fit: "cover"
  },
  {
    name: "Audi Q7 Quattro Luxury SUV",
    badge: "Luxury SUV",
    category: "Premium 7-Seater SUV",
    src: "/images/audi_q7_front.jpg",
    fit: "cover"
  },
  {
    name: "Toyota Camry Hybrid Luxury Sedan",
    badge: "C-Suite Executive",
    category: "Executive Hybrid Sedans",
    src: "/images/fleet/camry_hybrid_white_front.jpg",
    fit: "cover"
  },
  {
    name: "Toyota Fortuner 4x4 Luxury SUV",
    badge: "Executive SUV",
    category: "All-Terrain Executive SUV",
    src: "/images/fortuner_front.jpg",
    fit: "cover"
  },
  {
    name: "Honda Accord Executive Sedan",
    badge: "Executive Choice",
    category: "Premium Corporate Sedans",
    src: "/images/accord_front.jpg",
    fit: "cover"
  },
  {
    name: "Toyota Innova Hycross Hybrid",
    badge: "Hybrid Luxury",
    category: "Executive MPVs",
    src: "/images/hycross_front.jpg",
    fit: "cover"
  },
  {
    name: "Toyota Innova Crysta VIP",
    badge: "Executive Choice",
    category: "Executive MPVs",
    src: "/images/crysta_front.png",
    fit: "contain"
  },
  {
    name: "Toyota Innova Crysta Luxury Edition",
    badge: "Premium Outstation",
    category: "Executive MPVs",
    src: "/images/innova_crysta_luxury.jpg",
    fit: "cover"
  },
  {
    name: "Toyota Innova (Classic VIP)",
    badge: "Corporate Favorite",
    category: "Family & Corporate MPVs",
    src: "/images/fleet/innova_white_front.jpg",
    fit: "cover"
  },
  {
    name: "Kia Carens Luxury Plus",
    badge: "Modern Executive",
    category: "Compact Executive MPVs",
    src: "/images/fleet/kia_carens_white_front.jpg",
    fit: "cover"
  },
  {
    name: "Maruti Suzuki Ertiga Smart Hybrid",
    badge: "City & Outstation",
    category: "Smart Hybrid MPVs",
    src: "/images/fleet/ertiga_white_front.jpg",
    fit: "cover"
  },
  {
    name: "Maruti Suzuki Dzire Executive",
    badge: "Economy Executive",
    category: "Compact Sedans",
    src: "/images/fleet/dzire_fleet.jpg",
    fit: "cover"
  },
  {
    name: "Siddhu Verified Fleet on Bengaluru Road",
    badge: "On-Road Verified",
    category: "Commercial Yellow-Board Fleet",
    src: "/images/siddhu_white_car_bengaluru_road.jpg",
    fit: "cover"
  }
];

const AboutFleetSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ABOUT_CAR_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ABOUT_CAR_SLIDES.length) % ABOUT_CAR_SLIDES.length);
  }, []);

  // Continuous auto-sliding (every 2.8 seconds)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  const currentSlide = ABOUT_CAR_SLIDES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.25)',
        border: '1px solid rgba(0,0,0,0.1)',
        minHeight: '340px',
        aspectRatio: '4/3',
        background: '#0B111E',
        userSelect: 'none'
      }}
    >
      {/* Horizontal Sliding Track */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)',
          willChange: 'transform'
        }}
      >
        {ABOUT_CAR_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            style={{
              flex: '0 0 100%',
              width: '100%',
              height: '100%',
              position: 'relative',
              background: slide.fit === 'contain' ? 'radial-gradient(ellipse at center, #1E293B 0%, #0B111E 100%)' : '#0B111E'
            }}
          >
            <img
              src={slide.src}
              alt={slide.name}
              loading={idx < 3 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: slide.fit,
                display: 'block',
                padding: slide.fit === 'contain' ? '28px' : '0'
              }}
            />
          </div>
        ))}
      </div>

      {/* Top Left Fleet Badge */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: 'var(--accent-gold-primary)',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        <Car size={14} />
        <span>SIDDHU VERIFIED FLEET</span>
      </div>

      {/* Top Right Slide Counter */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#FFFFFF',
          padding: '4px 12px',
          borderRadius: '9999px',
          fontSize: '0.72rem',
          fontWeight: '700',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        {currentIndex + 1} / {ABOUT_CAR_SLIDES.length}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous car"
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 4,
          transition: 'all 0.2s ease',
          opacity: isHovered ? 1 : 0.7
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--accent-gold-primary)';
          e.currentTarget.style.color = '#000000';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(15, 23, 42, 0.75)';
          e.currentTarget.style.color = '#FFFFFF';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next car"
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 4,
          transition: 'all 0.2s ease',
          opacity: isHovered ? 1 : 0.7
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--accent-gold-primary)';
          e.currentTarget.style.color = '#000000';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(15, 23, 42, 0.75)';
          e.currentTarget.style.color = '#FFFFFF';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Bottom Gradient Overlay with Vehicle Details */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(11, 17, 30, 0.95) 0%, rgba(11, 17, 30, 0.7) 60%, transparent 100%)',
          padding: '40px 20px 16px',
          zIndex: 3,
          color: '#FFFFFF',
          pointerEvents: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span
            style={{
              background: 'var(--accent-gold-primary)',
              color: '#000000',
              fontSize: '0.68rem',
              fontWeight: '800',
              padding: '2px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {currentSlide.badge}
          </span>
          <span style={{ fontSize: '0.76rem', color: '#CBD5E1', fontWeight: '600' }}>
            {currentSlide.category}
          </span>
        </div>
        <div
          style={{
            fontSize: '1.08rem',
            fontWeight: '800',
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {currentSlide.name}
        </div>
      </div>

      {/* Slide Progress Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '4px',
          zIndex: 4,
          alignItems: 'center'
        }}
      >
        {ABOUT_CAR_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              width: currentIndex === idx ? '16px' : '5px',
              height: '5px',
              borderRadius: '9999px',
              background: currentIndex === idx ? 'var(--accent-gold-primary)' : 'rgba(255, 255, 255, 0.35)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const About = ({ onReserveClick }) => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <PageHero
        badge="25+ Years of Dedicated Service"
        badgeIcon={Crown}
        title="Pioneering Executive Mobility & Chauffeur"
        titleHighlight="Standards in Bengaluru"
        description="Founded over two decades ago to bridge the gap between ordinary taxi rentals and international C-suite corporate transportation across Karnataka and South India."
        breadcrumbs={['About Us']}
        image="/images/hero_luxury_sedan.jpg"
      />

      {/* 3. THE MAN BEHIND THE WHEEL - S.M. PATIL (BALANCED 50/50 EDITORIAL LAYOUT) */}
      <section className="section-padding" style={{ position: 'relative', background: '#FFFFFF' }}>
        <div className="container">
          <div className="founder-story-card">
            
            {/* FIRST: Founder Photo (Balanced Full Height) */}
            <div className="founder-photo-column">
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '-12px',
                right: '12px',
                bottom: '12px',
                borderRadius: '30px',
                border: '2px solid var(--accent-gold-primary)',
                opacity: 0.35,
                zIndex: 0,
                pointerEvents: 'none'
              }} />

              <div className="founder-photo-frame">
                <img
                  src="/images/sm_patil_founder.jpg"
                  alt="S.M. Patil - The Man Behind The Wheel"
                  className="founder-photo-img"
                />

                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  border: '1px solid rgba(197, 160, 89, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}>
                  <div>
                    <div style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '800' }}>
                      S.M. Patil
                    </div>
                    <div style={{ color: 'var(--accent-gold-primary)', fontSize: '0.8rem', fontWeight: '600' }}>
                      Founder & Managing Director
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(197, 160, 89, 0.2)',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    color: '#F8FAFC',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    whiteSpace: 'nowrap'
                  }}>
                    25+ Yrs Legacy
                  </div>
                </div>
              </div>
            </div>

            {/* THEN: Content & Story Column (Balanced Vertical Layout) */}
            <div className="founder-content-column">
              <div>
                <Badge variant="gold" icon={Crown} style={{ marginBottom: '16px' }}>
                  Founder & Visionary
                </Badge>

                <h2 style={{
                  fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)',
                  fontWeight: '900',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.15',
                  marginBottom: '10px',
                  textTransform: 'uppercase'
                }}>
                  THE MAN BEHIND <span style={{ color: 'var(--accent-gold-primary)' }}>THE WHEEL</span>
                </h2>

                <div style={{
                  width: '60px',
                  height: '4px',
                  background: 'var(--accent-gold-primary)',
                  marginBottom: '20px',
                  borderRadius: '2px'
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#4A4A4A', fontSize: '1rem', lineHeight: '1.75' }}>
                  <p style={{ margin: 0 }}>
                    Every great transportation business starts the same way, with one person willing to show up, on time, no matter what. For <strong>Siddhu Car Rentals</strong>, that person was <strong>S.M. Patil</strong>.
                  </p>

                  <p style={{ margin: 0 }}>
                    Over two decades ago, S.M. Patil started this journey with nothing but a single car and an unshakeable belief: &ldquo;If you take care of people the way you'd want to be taken care of, the rest follows&rdquo;. There was no fleet, no office, no brand name yet, just one man, one car, and a simple promise that every ride would be on time, every single time.
                  </p>

                  <p style={{ margin: 0 }}>
                    That promise became the foundation of everything Siddhu Car Rentals is today. Over the years, one car grew into a full fleet — from dependable sedans to premium Mercedes-Benz, BMW, and Audi vehicles. But the values behind the wheel never changed. Punctuality wasn't a policy. It was personal.
                  </p>

                  <div style={{
                    margin: '6px 0',
                    padding: '18px 22px',
                    background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.12) 0%, rgba(250, 247, 242, 0.95) 100%)',
                    borderLeft: '4px solid var(--accent-gold-primary)',
                    borderRadius: '0 14px 14px 0',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                  }}>
                    <p style={{
                      fontSize: '1.05rem',
                      fontStyle: 'italic',
                      fontWeight: '600',
                      color: '#1E293B',
                      lineHeight: '1.65',
                      margin: 0
                    }}>
                      &ldquo;People don't remember the car. They remember how you made them feel. That's what I learned in twenty five years behind this business and it's what I still tell every driver who works with us&rdquo;.
                    </p>
                  </div>

                  <p style={{ margin: 0 }}>
                    What sets Siddhu Car Rentals apart, even now, is something you won't find written into any company handbook: S.M. Patil still personally knows most of his regular clients by name. Not because a system tells him to, but because that's simply who he is. To him, a client isn't a booking number. They're someone he's built trust with, ride after ride, year after year.
                  </p>

                  <p style={{ margin: 0 }}>
                    That's the difference between a rental service and a relationship. When you choose Siddhu Car Rentals, you're not just hiring a car and a driver, you're stepping into a legacy built on two decades of reliability, care, and the kind of personal attention that turns first-time riders into family.
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div style={{
                marginTop: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                borderTop: '1px solid rgba(197, 160, 89, 0.25)',
                paddingTop: '18px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--accent-gold-primary)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1E293B' }}>1st Car to Full Fleet</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--accent-gold-primary)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1E293B' }}>Clients Known by Name</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--accent-gold-primary)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1E293B' }}>Punctuality is Personal</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY & HISTORY (PREMIUM EDITORIAL LAYOUT) */}
      <section className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ 
            background: 'linear-gradient(145deg, #ffffff, #FDFBF7)', 
            borderRadius: '40px', 
            padding: '48px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(197, 160, 89, 0.15)',
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '64px', 
            alignItems: 'center' 
          }}>
            
            {/* Story Text */}
            <div style={{ paddingRight: '12px' }}>
              <Badge variant="gold" icon={Sparkles} style={{ marginBottom: '24px' }}>Our Heritage</Badge>
              <h2 style={{ 
                fontSize: '2.8rem', 
                fontWeight: '800', 
                lineHeight: '1.2', 
                color: '#1A1A1A', 
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Born in Bengaluru’s<br/>
                <span style={{ color: 'var(--accent-gold-primary)' }}>Silicon Valley Boom.</span>
              </h2>
              
              <div style={{ 
                width: '60px', 
                height: '4px', 
                background: 'var(--accent-gold-primary)', 
                marginBottom: '28px',
                borderRadius: '2px'
              }}></div>

              <p className="text-body" style={{ fontSize: '1.1rem', color: '#4A4A4A', lineHeight: '1.8', marginBottom: '20px' }}>
                Siddhu Car Rentals was established with a clear mandate: to completely redefine executive travel in Bengaluru. As the city expanded into India's technology capital, corporate founders, international board delegates, and high-net-worth individuals required mobility that matched stringent global standards.
              </p>
              
              <p className="text-body" style={{ fontSize: '1.1rem', color: '#4A4A4A', lineHeight: '1.8' }}>
                Starting with a select fleet of executive sedans, we built our undisputed reputation on surgical punctuality, pristine vehicle hygiene, and uniformed, English-speaking chauffeurs trained in executive NDA etiquette.
              </p>
            </div>

            {/* Story Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                top: '-20px', 
                right: '-20px', 
                bottom: '20px', 
                left: '20px', 
                border: '2px solid var(--accent-gold-primary)', 
                borderRadius: '32px',
                zIndex: 0,
                opacity: 0.3
              }}></div>
              <div style={{ 
                position: 'relative',
                zIndex: 1,
                borderRadius: '32px', 
                overflow: 'hidden', 
                boxShadow: '0 24px 48px rgba(0,0,0,0.15)', 
                border: '1px solid rgba(255,255,255,0.4)', 
                height: '450px' 
              }}>
                <img 
                  src="/images/sclass_chauffeur.png" 
                  alt="Premium Mercedes S-Class Chauffeur Service" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.02)' }} 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. OUR MISSION & VISION (ALTERNATING LAYOUT) */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            
            {/* Vision Image / Continuous Fleet Showcase Slider */}
            <AboutFleetSlider />

            {/* Mission & Vision Text */}
            <div>
              <Badge variant="gold" icon={Crown} style={{ marginBottom: '16px' }}>Mission & Vision</Badge>
              <h2 className="text-h1" style={{ marginBottom: '20px' }}>
                Uncompromising Quality in Every Journey
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <GlassCard variant="standard">
                  <h4 className="text-h4" style={{ color: 'var(--accent-gold-primary)', marginBottom: '6px' }}>🎯 Our Mission</h4>
                  <p className="text-small" style={{ lineHeight: '1.65' }}>
                    To provide dependable, safe, and luxurious chauffeur-driven mobility with transparent tariffs, zero cancellation penalties, and 24/7 dedicated concierge dispatch.
                  </p>
                </GlassCard>

                <GlassCard variant="standard">
                  <h4 className="text-h4" style={{ color: 'var(--accent-gold-primary)', marginBottom: '6px' }}>🌟 Our Vision</h4>
                  <p className="text-small" style={{ lineHeight: '1.65' }}>
                    To be recognized as South India’s premier executive mobility and diplomatic chauffeur service, setting benchmark standards for fleet safety and client satisfaction.
                  </p>
                </GlassCard>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SAFETY & RELIABILITY PROTOCOLS */}
      <section className="section-padding">
        <div className="container">
          <SectionHeader
            badge="Sanitisation & Safety Commitment"
            badgeIcon={ShieldCheck}
            title="Our 5-Point Safety & Quality"
            titleHighlight="Commitment"
            description="How we ensure every passenger experiences complete peace of mind."
            align="center"
          />

          <div className="grid-showcase">
            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                👮‍♂️ Police-Verified Uniformed Drivers
              </div>
              <p className="text-small">Every driver undergoes background verification, medical eye tests, and defensive driving certification.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                🧼 Daily Interior Sanitisation
              </div>
              <p className="text-small">Cabins are deep vacuumed, leather seats conditioned, and surfaces disinfected before every client pickup.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                ⏱️ Punctuality Guarantee
              </div>
              <p className="text-small">Chauffeurs arrive 15 minutes before the scheduled time. Flight arrival tracking avoids delay penalties.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                📡 Live GPS Speed Monitoring
              </div>
              <p className="text-small">Real-time telematics track speed limits and route progress for highway safety across outstation journeys.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                💳 Transparent GST Tariffs
              </div>
              <p className="text-small">Clear itemised billing with zero surge pricing, zero hidden charges, and official corporate GST invoices.</p>
            </GlassCard>

            <GlassCard variant="interactive">
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-charcoal-900)', marginBottom: '8px' }}>
                📞 24/7 Dispatch Desk Support
              </div>
              <p className="text-small">Human concierge assistance available round-the-clock for flight changes, route tweaks, or instant fleet dispatch.</p>
            </GlassCard>
          </div>
        </div>
      </section>

    </div>
  );
};
