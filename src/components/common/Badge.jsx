import React from 'react';

export const Badge = ({
  children,
  variant = 'gold', // 'gold', 'glass', 'dark'
  icon: Icon,
  className = '',
  style = {}
}) => {
  let variantClass = 'badge-gold';
  if (variant === 'glass') variantClass = 'badge-glass';
  if (variant === 'dark') variantClass = 'badge-dark';

  return (
    <span className={`badge ${variantClass} ${className}`} style={style}>
      {Icon && <Icon size={12} />}
      <span>{children}</span>
    </span>
  );
};
