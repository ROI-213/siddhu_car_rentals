import React, { useState } from 'react';
import { Plane, MapPin, Briefcase, RefreshCw, ArrowRight, ShieldCheck, Clock, User, Car, Users } from 'lucide-react';
import { ServiceJourneyModal } from '../modals/ServiceJourneyModal';
import './OurServices.css';

const SERVICES = [
  {
    id: 'airport',
    title: 'AIRPORT TRANSFER',
    subtitle: 'Punctual pickups & drop-offs at Kempegowda International Airport.',
    icon: Plane,
    image: '/images/services_airport_final.jpg',
    path: '/local'
  },
  {
    id: 'local',
    title: 'LOCAL RENTAL',
    subtitle: 'Hourly & full-day car rentals within Bangalore.',
    icon: MapPin,
    image: '/images/services_local_final.jpg',
    path: '/local'
  },
  {
    id: 'outstation',
    title: 'OUTSTATION TRIPS',
    subtitle: 'One-way & round-trip travel to Mysore, Coorg, Hampi & beyond.',
    icon: RefreshCw,
    image: '/images/services_roundtrip_final.jpg',
    path: '/outstation'
  },
  {
    id: 'corporate',
    title: 'CORPORATE TRAVEL',
    subtitle: 'Dedicated fleet & billing for business & employee commutes.',
    icon: Briefcase,
    image: '/images/services_corporate_final.jpg',
    path: '/corporate'
  },
  {
    id: 'luxury',
    title: 'LUXURY CARS',
    subtitle: 'Premium sedans & SUVs with chauffeur for executive travel.',
    icon: Car,
    image: '/images/services_luxury_final.jpg',
    path: '/fleet'
  },
  {
    id: 'wedding',
    title: 'WEDDINGS & EVENTS',
    subtitle: 'Decorated cars for weddings, engagements & special occasions.',
    icon: Users,
    image: '/images/services_wedding_final.jpg',
    path: '/local'
  },
  {
    id: 'group',
    title: 'GROUP TRAVEL',
    subtitle: 'Tempo travellers & mini buses for group outings & tours.',
    icon: Users,
    image: '/images/services_group_final.jpg',
    path: '/local'
  }
];

export const OurServices = ({ onNavigate }) => {
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = (service, e) => {
    if (e) e.stopPropagation();
    setSelectedServiceId(service.id);
    setIsModalOpen(true);
  };

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

        {/* Grid Layout: Two - Three - Two (2 - 3 - 2) Style */}
        <div className="os-grid">

          {/* Row 1: 2 Cards */}
          <div className="os-row os-row-2 os-row-top">
            {SERVICES.slice(0, 2).map((service) => (
              <div key={service.id} className="os-card os-card-2" onClick={(e) => handleBookNow(service, e)}>
                <div className="os-image-box">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className="os-card-content">
                  <div className="os-card-body">
                    <h3 className="os-card-title">{service.title}</h3>
                    <p className="os-card-subtitle">{service.subtitle}</p>
                  </div>
                  <div className="os-card-footer">
                    <div className="os-card-action">
                      <span className="os-action-text-full">Book Now</span>
                      <span className="os-action-text-short">Book</span>
                      <ArrowRight size={14} className="os-card-action-icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: 3 Cards */}
          <div className="os-row os-row-3 os-row-middle">
            {SERVICES.slice(2, 5).map((service) => (
              <div key={service.id} className="os-card os-card-3" onClick={(e) => handleBookNow(service, e)}>
                <div className="os-image-box">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className="os-card-content">
                  <div className="os-card-body">
                    <h3 className="os-card-title">{service.title}</h3>
                    <p className="os-card-subtitle">{service.subtitle}</p>
                  </div>
                  <div className="os-card-footer">
                    <div className="os-card-action">
                      <span className="os-action-text-full">Book Now</span>
                      <span className="os-action-text-short">Book</span>
                      <ArrowRight size={14} className="os-card-action-icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: 2 Cards */}
          <div className="os-row os-row-2 os-row-bottom">
            {SERVICES.slice(5, 7).map((service) => (
              <div key={service.id} className="os-card os-card-2" onClick={(e) => handleBookNow(service, e)}>
                <div className="os-image-box">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className="os-card-content">
                  <div className="os-card-body">
                    <h3 className="os-card-title">{service.title}</h3>
                    <p className="os-card-subtitle">{service.subtitle}</p>
                  </div>
                  <div className="os-card-footer">
                    <div className="os-card-action">
                      <span className="os-action-text-full">Book Now</span>
                      <span className="os-action-text-short">Book</span>
                      <ArrowRight size={14} className="os-card-action-icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Dedicated Executive Service Journey Enquiry Suite */}
        <ServiceJourneyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialServiceId={selectedServiceId}
        />

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
