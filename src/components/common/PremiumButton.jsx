import React from 'react';

export const PremiumButton = ({
  children,
  variant = 'gold', // 'gold', 'glass', 'dark', 'outline', 'ghost', 'whatsapp'
  size = 'md', // 'sm', 'md', 'lg'
  pill = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  ...props
}) => {
  let variantStyle = {};
  let variantClass = `btn-${variant}`;

  if (variant === 'whatsapp') {
    variantClass = '';
    variantStyle = {
      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
    };
  }

  let sizeClass = '';
  if (size === 'sm') sizeClass = 'btn-sm';
  if (size === 'lg') sizeClass = 'btn-lg';

  const classes = [
    'btn',
    variantClass,
    sizeClass,
    pill ? 'btn-pill' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      style={{
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...variantStyle
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </button>
  );
};
