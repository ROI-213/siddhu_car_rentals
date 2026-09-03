import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import './CinematicHero.css';

export const CinematicHero = ({ onExploreFleet, onGetQuote }) => {
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
          src="/images/siddhu_adventure_hero.jpg" 
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
            <span>BENGALURU & BEYOND</span>
          </div>

          <h1 className="cinematic-main-heading">
            YOUR JOURNEY.<br />
            <span className="heading-subline">OUR DRIVE.</span>
          </h1>

          <p className="cinematic-supporting-text">
            Premium cars, professional chauffeurs and seamless travel experiences across Bengaluru and beyond.
          </p>

          <motion.div 
            className="cinematic-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="cinematic-btn-primary" onClick={onExploreFleet}>
              <span>EXPLORE FLEET</span>
              <ChevronRight size={16} className="btn-arrow" />
            </button>
            <button className="cinematic-btn-secondary" onClick={onGetQuote}>
              <span>GET QUOTE</span>
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
