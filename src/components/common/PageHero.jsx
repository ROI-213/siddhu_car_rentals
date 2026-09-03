import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Badge } from './Badge';

export const PageHero = ({
  badge = 'Luxury Chauffeur Mobility',
  badgeIcon,
  title,
  titleHighlight,
  description,
  breadcrumbs = [],
  image = '/images/hero_luxury_sedan.jpg',
  children
}) => {
  return (
    <section style={{
      position: 'relative',
      paddingTop: '80px',
      paddingBottom: '80px',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #12151C 0%, #1E232E 100%)',
      color: '#FFFFFF'
    }}>
      {/* Background Image Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.25,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(4px)'
      }} />

      {/* Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(197,160,89,0.2) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
            <span>Home</span>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={12} />
                <span style={{ color: idx === breadcrumbs.length - 1 ? '#C5A059' : 'inherit' }}>{crumb}</span>
              </React.Fragment>
            ))}
          </div>
        )}

        {badge && (
          <Badge variant="dark" icon={badgeIcon} style={{ marginBottom: '16px', borderColor: 'rgba(197, 160, 89, 0.4)', color: '#C5A059' }}>
            {badge}
          </Badge>
        )}

        <h1 className="text-display" style={{ color: '#FFFFFF', maxWidth: '850px', marginBottom: '20px' }}>
          {title}{' '}
          {titleHighlight && (
            <span style={{ color: '#C5A059' }}>{titleHighlight}</span>
          )}
        </h1>

        {description && (
          <p className="text-subtitle" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '680px', lineHeight: '1.7', marginBottom: '32px' }}>
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  );
};
