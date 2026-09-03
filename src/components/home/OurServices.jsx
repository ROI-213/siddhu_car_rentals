import React from 'react';
import { Plane, MapPin, Briefcase, RefreshCw, ArrowRight, ShieldCheck, Clock, User } from 'lucide-react';
import './OurServices.css';

const SERVICES = [
  {
    id: 'airport',
    title: 'AIRPORT TRANSFER',
    subtitle: 'On-time pickups. Stress-free arrivals.',
    icon: Plane,
    image: '/images/services_airport_final.jpg',
    path: '/local'
  },
  {
    id: 'local',
    title: 'LOCAL RENTALS',
    subtitle: 'Drive around the city in comfort.',
    icon: MapPin,
    image: '/images/services_local_final.jpg',
    path: '/local'
  },
  {
    id: 'corporate',
    title: 'CORPORATE TRANSFER',
    subtitle: 'Reliable travel for you and your business.',
    icon: Briefcase,
    image: '/images/services_corporate_final.jpg',
    path: '/corporate'
  },
  {
    id: 'roundtrip',
    title: 'ROUND TRIP',
    subtitle: 'Go there and back with complete ease.',
    icon: RefreshCw,
    image: '/images/services_roundtrip_final.jpg',
    path: '/outstation'
  },
  {
    id: 'oneway',
    title: 'ONE WAY',
    subtitle: 'One destination. Total convenience.',
    icon: ArrowRight,
    image: '/images/services_oneway_final.jpg',
    path: '/outstation'
  }
];

export const OurServices = ({ onNavigate }) => {
  return (
    <section className="our-services-section">
      <div className="os-container">
        
        {/* Header */}
        <div className="os-header">
          <div className="os-eyebrow">
            <span className="os-line"></span>
            OUR SERVICES
            <span className="os-line"></span>
          </div>
          <h2 className="os-title">Premium Journeys. Crafted for Every Need.</h2>
          <div className="os-divider">
            <span className="os-line"></span>
            <div className="os-star"></div>
            <span className="os-line"></span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="os-grid">
          
          {/* Top Row: 3 Cards */}
          <div className="os-row os-row-top">
            {SERVICES.slice(0, 3).map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="os-card" onClick={() => onNavigate && onNavigate(service.path)}>
                  <div className="os-image-box">
                    <img src={service.image} alt={service.title} />
                    <div className="os-chevron-overlay"></div>
                    <div className="os-hex-icon">
                      <Icon size={20} className="os-icon" />
                    </div>
                  </div>
                  <div className="os-card-content">
                    <div className="os-card-text">
                      <h3 className="os-card-title">{service.title}</h3>
                      <p className="os-card-subtitle">{service.subtitle}</p>
                      <div className="os-card-goldline"></div>
                    </div>
                    <div className="os-card-action">
                      Book Now &rarr;
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="os-row os-row-bottom">
            {SERVICES.slice(3, 5).map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="os-card" onClick={() => onNavigate && onNavigate(service.path)}>
                  <div className="os-image-box">
                    <img src={service.image} alt={service.title} />
                    <div className="os-chevron-overlay"></div>
                    <div className="os-hex-icon">
                      <Icon size={20} className="os-icon" />
                    </div>
                  </div>
                  <div className="os-card-content">
                    <div className="os-card-text">
                      <h3 className="os-card-title">{service.title}</h3>
                      <p className="os-card-subtitle">{service.subtitle}</p>
                      <div className="os-card-goldline"></div>
                    </div>
                    <div className="os-card-action">
                      Book Now &rarr;
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Features */}
        <div className="os-features">
          <div className="os-feature">
            <ShieldCheck size={22} className="os-feature-icon" />
            <span>Safe & Secure Travel</span>
          </div>
          <div className="os-feature-divider"></div>
          <div className="os-feature">
            <Clock size={22} className="os-feature-icon" />
            <span>24/7 Availability</span>
          </div>
          <div className="os-feature-divider"></div>
          <div className="os-feature">
            <User size={22} className="os-feature-icon" />
            <span>Professional Chauffeurs</span>
          </div>
        </div>

      </div>
    </section>
  );
};
