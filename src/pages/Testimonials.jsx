import React, { useState } from 'react';
import { Crown, Star, Quote, CheckCircle, ShieldCheck, Filter } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { CTASection } from '../components/common/CTASection';

const GoogleIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
  </svg>
);

import { testimonialsData } from '../data/testimonialsData';

export const Testimonials = ({ onReserveClick }) => {
  const [filterCategory, setFilterCategory] = useState('all');

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
              { id: 'all', label: `All Reviews (${testimonialsData.length})` },
              { id: 'corporate', label: 'Corporate Mobility' },
              { id: 'airport', label: 'Airport VIP Transfers' },
              { id: 'outstation', label: 'Outstation Tours' },
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
              <GlassCard key={item.id} variant="standard" style={{ display: 'flex', flexDirection: 'column', padding: '26px', height: '100%', borderRadius: '22px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#FABB05" color="#FABB05" />
                    ))}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(26, 115, 232, 0.08)', borderRadius: '999px', border: '1px solid rgba(26, 115, 232, 0.2)' }}>
                    <GoogleIcon size={13} />
                    <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#1A73E8' }}>{item.categoryLabel || 'Google Verified'}</span>
                  </div>
                </div>

                <p className="text-body" style={{ lineHeight: '1.7', color: '#1E293B', marginBottom: '22px', flex: 1, fontSize: '0.94rem' }}>
                  "{item.review}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: item.avatarBg || '#0F766E',
                      color: '#FFFFFF',
                      fontWeight: '800',
                      fontSize: '1.05rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>{item.name}</span>
                        <CheckCircle size={14} color="#1A73E8" />
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-charcoal-500)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span>{item.title}{item.company ? ` • ${item.company}` : ''}</span>
                        {item.isLocalGuide && (
                          <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '0.65rem', fontWeight: '800', padding: '1px 6px', borderRadius: '4px' }}>
                            Local Guide
                          </span>
                        )}
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
