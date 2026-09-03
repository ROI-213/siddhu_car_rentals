import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const TestimonialCard = ({
  quote,
  author,
  title,
  company,
  rating = 5,
  verified = true
}) => {
  return (
    <GlassCard variant="standard" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '28px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={16} fill="#C5A059" color="#C5A059" />
          ))}
        </div>
        <Quote size={28} color="rgba(197, 160, 89, 0.25)" />
      </div>

      <p className="text-body" style={{ fontStyle: 'italic', lineHeight: '1.7', marginBottom: '24px', flex: 1 }}>
        "{quote}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #12151C 0%, #2D3445 100%)',
          color: '#C5A059',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-editorial)',
          border: '1px solid rgba(197, 160, 89, 0.4)'
        }}>
          {author.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{author}</span>
            {verified && <CheckCircle size={14} color="#C5A059" />}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>
            {title}{company ? `, ${company}` : ''}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
