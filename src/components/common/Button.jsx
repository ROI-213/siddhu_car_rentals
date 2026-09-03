import React from 'react';

export const Button = ({
  children,
  variant = 'gold', // 'gold', 'glass', 'dark', 'outline', 'ghost'
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
  let variantClass = 'btn-gold';
  if (variant === 'glass') variantClass = 'btn-glass';
  if (variant === 'dark') variantClass = 'btn-dark';
  if (variant === 'outline') variantClass = 'btn-outline';
  if (variant === 'ghost') variantClass = 'btn-ghost';

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
      style={{ width: fullWidth ? '100%' : 'auto', opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
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
