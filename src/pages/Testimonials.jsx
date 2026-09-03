import React, { useState } from 'react';
import { Crown, Star, Quote, CheckCircle, ShieldCheck, Filter } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { CTASection } from '../components/common/CTASection';

export const Testimonials = ({ onReserveClick }) => {
  const [filterCategory, setFilterCategory] = useState('all');

  const testimonialsData = [
    {
      id: 1,
      name: 'Ananth Narayan',
      title: 'Managing Director',
      company: 'Global Tech Capital',
      category: 'corporate',
      categoryLabel: 'Corporate Mobility',
      rating: 5,
      date: 'August 2026',
      review: 'Siddhu Car Rentals handled our 4-day corporate tech summit in Manyata Tech Park with 12 luxury vehicles flawlessly. Punctuality and vehicle hygiene were 10/10. Highly recommended for enterprise mobility in Bengaluru.'
    },
    {
      id: 2,
      name: 'Eleanor Vance',
      title: 'Managing Partner',
      company: 'Sequoia Capital UK',
      category: 'airport',
      categoryLabel: 'Airport VIP Transfer',
      rating: 5,
      date: 'July 2026',
      review: 'The Mercedes S-Class for our airport pickup at Kempegowda Terminal 2 was immaculate. The chauffeur held a clean name placard at arrival and drove smoothly to UB City. Unbeatable service.'
    },
    {
      id: 3,
      name: 'Dr. Sandeep Rao',
      title: 'Senior Consultant Surgeon',
      company: 'Manipal Hospitals',
      category: 'outstation',
      categoryLabel: 'Outstation Travel',
      rating: 5,
      date: 'June 2026',
      review: 'Rented a Toyota Innova Crysta VIP for a 5-day family vacation to Coorg and Chikmagalur. The driver knew all the best scenic spots and drove with extreme care on winding hill roads.'
    },
    {
      id: 4,
      name: 'Vikramaditya Rao',
      title: 'Senior Counsel',
      company: 'Bengaluru High Court',
      category: 'wedding',
      categoryLabel: 'Wedding Convoy',
      rating: 5,
      date: 'May 2026',
      review: 'Booked 6 matching white luxury sedans for my daughter’s wedding in Mysuru Palace. All vehicles arrived 30 minutes early, pristine condition, and chauffeurs in formal suits.'
    },
    {
      id: 5,
      name: 'Priya Sundaram',
      title: 'VP Operations',
      company: 'Infosys Partner Group',
      category: 'corporate',
      categoryLabel: 'Corporate Mobility',
      rating: 5,
      date: 'August 2026',
      review: 'Our company has used Siddhu Car Rentals for corporate executive monthly transfers for over 3 years. Itemised GST billing is always accurate and customer support is available 24/7.'
    },
    {
      id: 6,
      name: 'Marcus Brody',
      title: 'Head of APAC Logistics',
      company: 'Boeing Defense India',
      category: 'airport',
      categoryLabel: 'Airport VIP Transfer',
      rating: 5,
      date: 'July 2026',
      review: 'Never missed a single flight connection in Bengaluru thanks to Siddhu Car Rentals. Drivers monitor flight delays automatically so you never get charged for terminal waiting time.'
    }
  ];

  const filteredTestimonials = filterCategory === 'all'
    ? testimonialsData
    : testimonialsData.filter(t => t.category === filterCategory);

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <PageHero
        badge="Verified Client Feedback"
        badgeIcon={Star}
        title="Executive Reviews & Verified Client"
        titleHighlight="Endorsements"
        description="Discover why C-level executives, corporate partners, and luxury travellers consistently rate Siddhu Car Rentals 4.9 out of 5 stars."
        breadcrumbs={['Testimonials']}
        image="/images/hero_luxury_sedan.jpg"
      />

      {/* 2. RATING SUMMARY BREAKDOWN CARD */}
      <section style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <GlassCard variant="dark" style={{ padding: '32px', textAlign: 'center', background: 'rgba(18, 21, 28, 0.95)', border: '1px solid rgba(197, 160, 89, 0.4)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '3.5rem', fontWeight: '800', color: '#C5A059', lineHeight: '1' }}>4.9</div>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '6px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#C5A059" color="#C5A059" />
                  ))}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Based on 1,200+ Verified Client Reviews</div>
              </div>

              <div style={{ height: '60px', width: '1px', background: 'rgba(255,255,255,0.15)', display: 'none' }} className="divider-desktop" />

              <div style={{ textAlign: 'left', maxWidth: '440px' }}>
                <div style={{ fontWeight: '700', color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '4px' }}>
                  100% Verified Executive Satisfaction
                </div>
                <p className="text-small" style={{ color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                  Every review is gathered from post-journey digital duty slips and corporate account feedback surveys across Bengaluru.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 3. CATEGORY FILTER TABS & TESTIMONIAL GRID */}
      <section className="section-padding">
        <div className="container">
          
          {/* Category Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
            {[
              { id: 'all', label: 'All Reviews (6)' },
              { id: 'corporate', label: 'Corporate Mobility' },
              { id: 'airport', label: 'Airport VIP Transfers' },
              { id: 'outstation', label: 'Outstation Journeys' },
              { id: 'wedding', label: 'Wedding Convoys' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`btn btn-pill ${filterCategory === tab.id ? 'btn-gold' : 'btn-glass'}`}
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid-showcase">
            {filteredTestimonials.map(item => (
              <GlassCard key={item.id} variant="standard" style={{ display: 'flex', flexDirection: 'column', padding: '28px', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#C5A059" color="#C5A059" />
                    ))}
                  </div>
                  <Badge variant="gold">{item.categoryLabel}</Badge>
                </div>

                <p className="text-body" style={{ fontStyle: 'italic', lineHeight: '1.7', marginBottom: '24px', flex: 1 }}>
                  "{item.review}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #12151C 0%, #2D3445 100%)',
                      color: '#C5A059',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-editorial)'
                    }}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{item.name}</span>
                        <CheckCircle size={14} color="#C5A059" />
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-charcoal-500)' }}>
                        {item.title}, {item.company}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--color-charcoal-500)', fontWeight: '600' }}>
                    {item.date}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <CTASection onReserveClick={onReserveClick} />

    </div>
  );
};
