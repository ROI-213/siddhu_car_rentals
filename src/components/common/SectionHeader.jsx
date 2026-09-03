import React from 'react';
import { Badge } from './Badge';

export const SectionHeader = ({
  badge,
  badgeIcon,
  title,
  titleHighlight,
  description,
  align = 'center', // 'left', 'center', 'right'
  className = ''
}) => {
  const alignmentStyle = align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';
  const textAlign = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignmentStyle,
        textAlign: textAlign,
        maxWidth: align === 'center' ? '720px' : '100%',
        margin: align === 'center' ? '0 auto 48px auto' : '0 0 32px 0'
      }}
      className={className}
    >
      {badge && (
        <Badge variant="gold" icon={badgeIcon} style={{ marginBottom: '16px' }}>
          {badge}
        </Badge>
      )}

      {title && (
        <h2 className="text-h1" style={{ marginBottom: '16px' }}>
          {title}{' '}
          {titleHighlight && (
            <span style={{ color: 'var(--accent-gold-primary)' }}>{titleHighlight}</span>
          )}
        </h2>
      )}

      {description && (
        <p className="text-subtitle" style={{ lineHeight: '1.6' }}>
          {description}
        </p>
      )}
    </div>
  );
};
