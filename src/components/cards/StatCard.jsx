import React from 'react';
import { GlassCard } from '../common/GlassCard';

export const StatCard = ({
  value,
  label,
  sublabel = null,
  icon: Icon
}) => {
  return (
    <GlassCard variant="standard" style={{ textAlign: 'center', padding: '24px' }}>
      {Icon && (
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'rgba(197, 160, 89, 0.12)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px'
        }}>
          <Icon size={24} color="var(--accent-gold-primary)" />
        </div>
      )}
      <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '2.25rem', fontWeight: '800', color: 'var(--color-charcoal-900)', lineHeight: '1.1', marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--color-charcoal-800)' }}>
        {label}
      </div>
      {sublabel && (
        <div style={{ fontSize: '0.78rem', color: 'var(--color-charcoal-500)', marginTop: '2px' }}>
          {sublabel}
        </div>
      )}
    </GlassCard>
  );
};
