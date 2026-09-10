import React, { useState } from 'react';
import { Crown, Star, Quote, CheckCircle, ShieldCheck, Filter } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { CTASection } from '../components/common/CTASection';

export const Testimonials = ({ onReserveClick }) => {
  const [filterCategory, setFilterCategory] = useState('all');

  // NOTE: Replace these with genuine customer reviews. Remove specific company names
  // that cannot be independently verified, or replace with names you have written consent to use.
  const testimonialsData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Regular Corporate Client',
      company: 'Bengaluru',
      category: 'corporate',
      categoryLabel: 'Corporate Mobility',
      rating: 5,
      date: 'August 2026',
      review: 'We have been using Siddhu Car Rentals for our office commute fleet for over 2 years. The punctuality and professionalism of the chauffeurs is consistently excellent. Monthly GST invoicing is always accurate and delivered on time.'
    },
    {
      id: 2,
      name: 'Sneha Reddy',
      title: 'Frequent Traveller',
      company: 'Bengaluru',
      category: 'airport',
      categoryLabel: 'Airport VIP Transfer',
      rating: 5,
      date: 'July 2026',
      review: 'I use Siddhu Car Rentals for all my airport transfers. The Mercedes S-Class is always immaculate, the chauffeur arrives early with a name placard, and the ride to the city is smooth and stress-free. Highly recommended for frequent flyers.'
    },
    {
      id: 3,
      name: 'Arun Menon',
      title: 'Family Traveller',
      company: 'Kerala',
      category: 'outstation',
      categoryLabel: 'Outstation Travel',
      rating: 5,
      date: 'June 2026',
      review: 'Booked an Innova Crysta VIP for a 6-day family trip from Bengaluru to Coorg and Wayanad. The driver was punctual, knew all the scenic routes, and was very careful on the ghat sections. Great value for the service.'
    },
    {
      id: 4,
      name: 'Deepika Sharma',
      title: 'Bride',
      company: 'Bengaluru',
      category: 'wedding',
      categoryLabel: 'Wedding Convoy',
      rating: 5,
      date: 'May 2026',
      review: 'We booked 8 vehicles for our wedding — a mix of luxury sedans and Innova Crystas. Every vehicle arrived on time, spotlessly clean, with well-dressed chauffeurs. Our guests were impressed with the professionalism.'
    }
  ];

  const filteredTestimonials = filterCategory === 'all'
    ? testimonialsData
    : testimonialsData.filter(t => t.category === filterCategory);

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* 1. HERO SECTION */}
      <PageHero
        badge="Client Feedback"
        badgeIcon={Star}
        title="What Our Clients"
        titleHighlight="Say About Us"
        description="Read genuine feedback from travellers who have experienced our chauffeur-driven fleet across Bengaluru and beyond."
        breadcrumbs={['Testimonials']}
        image="/images/hero_luxury_sedan.jpg"
      />

      {/* 2. GOOGLE REVIEWS SECTION */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="Google Reviews"
            badgeIcon={Star}
            title="See What Google Says"
            titleHighlight="About Us"
            description="Browse our Google Business Profile for unfiltered customer reviews and ratings from real journeys."
            align="center"
          />

          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(203, 213, 225, 0.8)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Google-style mini embed area */}
            <div style={{ padding: '40px 32px', textAlign: 'center' }}>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '3rem', fontWeight: '900', color: '#1A73E8', fontFamily: 'var(--font-editorial)' }}>G</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-slate-900)', marginBottom: '8px' }}>
                Siddhu Car Rentals
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-slate-500)', marginBottom: '16px' }}>
                JP Nagar, Bengaluru — Luxury Car Rentals & Chauffeur Services
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FABB05">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-slate-900)' }}>See our rating</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--color-slate-500)' }}>on Google</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+JP+Nagar+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  background: '#1A73E8',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1557B0'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1A73E8'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                View All Google Reviews
              </a>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-slate-400)', marginTop: '12px' }}>
                Opens Google Maps — see all customer reviews and ratings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLIENT TESTIMONIALS */}
      <section className="section-padding">
        <div className="container">

          <SectionHeader
            badge="Client Feedback"
            badgeIcon={Quote}
            title="Genuine Client"
            titleHighlight="Experiences"
            description="Feedback from travellers who have experienced our chauffeur-driven fleet."
            align="center"
          />

          {/* Category Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
            {[
              { id: 'all', label: 'All Reviews (4)' },
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
                      <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)', fontSize: '0.92rem' }}>
                        <span>{item.name}</span>
                        <CheckCircle size={14} color="#C5A059" style={{ marginLeft: '4px' }} />
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

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)', fontStyle: 'italic' }}>
              Have a journey with us? Share your experience on <a href="https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+JP+Nagar+Bengaluru" target="_blank" rel="noopener noreferrer" style={{ color: '#1A73E8', textDecoration: 'none', fontWeight: '600' }}>Google Reviews</a>.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <CTASection onReserveClick={onReserveClick} />

    </div>
  );
};
