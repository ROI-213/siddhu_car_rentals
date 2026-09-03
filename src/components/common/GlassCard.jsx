import React from 'react';

export const GlassCard = ({
  children,
  variant = 'standard', // 'standard', 'interactive', 'glowing', 'dark'
  className = '',
  style = {},
  onClick,
  ...props
}) => {
  let variantClass = 'glass-card';
  if (variant === 'interactive') variantClass = 'glass-card-interactive';
  if (variant === 'glowing') variantClass = 'glass-glowing-border';
  if (variant === 'dark') variantClass = 'glass-dark-card';

  return (
    <div
      className={`${variantClass} ${className}`}
      style={{ padding: '24px', ...style }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
