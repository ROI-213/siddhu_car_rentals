import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const ServiceCard = ({
  title,
  subtitle,
  description,
  icon: Icon,
  features = [],
  badge = null,
  onSelect
}) => {
  return (
    <GlassCard variant="interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(197,160,89,0.15) 0%, rgba(212,175,55,0.05) 100%)',
          border: '1px solid rgba(197, 160, 89, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(197,160,89,0.1)'
        }}>
          <Icon size={26} color="var(--accent-gold-primary)" />
        </div>
        {badge && (
          <span className="badge badge-gold">{badge}</span>
        )}
      </div>

      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold-primary)', fontWeight: '700', marginBottom: '4px' }}>
        {subtitle}
      </div>
      <h3 className="text-h3" style={{ marginBottom: '12px' }}>
        {title}
      </h3>
      <p className="text-small" style={{ lineHeight: '1.65', marginBottom: '20px', flex: 1 }}>
        {description}
      </p>

      {features.length > 0 && (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          {features.map((feat, idx) => (
            <li key={idx} style={{ fontSize: '0.84rem', color: 'var(--color-charcoal-700)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={14} color="var(--accent-gold-primary)" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onSelect}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--accent-gold-primary)',
          fontWeight: '700',
          fontSize: '0.9rem',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <span>Explore Service Details</span>
        <ChevronRight size={16} />
      </button>
    </GlassCard>
  );
};
