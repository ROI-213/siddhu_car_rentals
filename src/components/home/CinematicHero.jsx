import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import './CinematicHero.css';

export const CinematicHero = ({ onExploreFleet, onGetQuote, heroContent = {} }) => {
  const {
    routePill = "BENGALURU & BEYOND",
    titleLine1 = "PREMIUM CHAUFFEUR-DRIVEN",
    titleLine2 = "CAR RENTALS IN BANGALORE",
    sublineBadge = "Self-Drive Not Available • Verified Chauffeurs • All Premium Cars",
    supportingText = "Premium car rentals with professional chauffeurs for airport transfers, local trips, outstation travel, corporate bookings, and special events across Bangalore and South India.",
    btnExploreText = "EXPLORE FLEET",
    btnQuoteText = "GET QUOTE",
    backgroundImage = "/images/siddhu_adventure_hero.jpg"
  } = heroContent;

  const { scrollY } = useScroll();
  
  // Subtle atmospheric movement for the background
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '15%']);
  
  // Vehicle entrance animation and scroll transformations
  const vehicleX = useTransform(scrollY, [0, 500], ['0%', '20%']);
  const vehicleScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="cinematic-hero-wrapper">
      <motion.div 
        className="cinematic-scenic-backdrop"
        style={{ y: backgroundY }}
      >
        <img 
          src={backgroundImage} 
          alt="Premium luxury transportation scene" 
          className="cinematic-bg-img"
        />
        <div className="cinematic-scenic-veil"></div>
      </motion.div>

      <div className="cinematic-content-grid">
        <motion.div 
          className="cinematic-left-pane"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="cinematic-route-pill">
            <MapPin size={13} className="route-icon" />
            <span>{routePill}</span>
          </div>

          <h1 className="cinematic-main-heading">
            {titleLine1}<br />
            <span className="heading-subline">{titleLine2}</span>
          </h1>

          <h2 style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: '700',
            color: '#C5A059',
            letterSpacing: '0.04em',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-ui)'
          }}>
            {sublineBadge}
          </h2>

          <p className="cinematic-supporting-text">
            {supportingText}
          </p>

          <motion.div 
            className="cinematic-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="cinematic-btn-primary" onClick={onExploreFleet}>
              <span>{btnExploreText}</span>
              <ChevronRight size={16} className="btn-arrow" />
            </button>
            <button className="cinematic-btn-secondary" onClick={onGetQuote}>
              <span>{btnQuoteText}</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="cinematic-right-pane"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 50, 
            damping: 20, 
            mass: 1.5,
            delay: 0.4
          }}
          style={{ x: vehicleX, scale: vehicleScale }}
        >
        </motion.div>
      </div>
    </section>
  );
};
