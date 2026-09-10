import React from 'react';
import { SITE_CONFIG } from '../../config/site';
import { WhatsAppIcon } from './WhatsAppEnquiryMenu';

export const WhatsAppButton = ({
  message,
  children,
  className = '',
  style = {},
  ...props
}) => {
  const fullMessage = message || SITE_CONFIG.whatsapp.defaultMessage;
  const href = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(fullMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        ...style
      }}
      {...props}
    >
      {children || (
        <>
          <WhatsAppIcon size={18} />
          <span>WhatsApp</span>
        </>
      )}
    </a>
  );
};
