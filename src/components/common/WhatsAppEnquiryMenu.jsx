import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

export const ENQUIRY_TYPES = [
  { id: 'airport',    label: 'Airport Transfer',   icon: '✈️' },
  { id: 'local',      label: 'Local Rental',       icon: '📍' },
  { id: 'outstation', label: 'Outstation Trip',    icon: '🛣️' },
  { id: 'luxury',     label: 'Luxury Car Booking', icon: '✨' },
  { id: 'corporate',  label: 'Corporate Booking',  icon: '💼' },
  { id: 'wedding',    label: 'Wedding / Event',    icon: '💒' },
  { id: 'general',    label: 'General Enquiry',    icon: '💬' },
];

const BASE_MESSAGE = 'Hi, I\'d like to {type}. Please share availability and rates.';

function buildMessage(enquiryType, context = {}) {
  const typeLabel = ENQUIRY_TYPES.find(t => t.id === enquiryType)?.label || enquiryType;
  let msg = BASE_MESSAGE.replace('{type}', typeLabel);

  const lines = [];
  if (context.vehicleName)   lines.push(`Vehicle: ${context.vehicleName}`);
  if (context.tripType)      lines.push(`Service: ${context.tripType}`);
  if (context.pickup)        lines.push(`Pickup: ${context.pickup}`);
  if (context.drop)          lines.push(`Drop: ${context.drop}`);
  if (context.date) {
    let dateStr = `Date: ${context.date}`;
    if (context.time) dateStr += ` at ${context.time}`;
    lines.push(dateStr);
  }
  if (context.returnDate) {
    let retStr = `Return: ${context.returnDate}`;
    if (context.returnTime) retStr += ` at ${context.returnTime}`;
    lines.push(retStr);
  }
  if (context.passengers)   lines.push(`Passengers: ${context.passengers}`);
  if (context.message)      lines.push(`Note: ${context.message}`);

  if (lines.length > 0) {
    msg += '\n\n' + lines.join('\n');
  }

  return msg;
}

export const WhatsAppEnquiryMenu = ({ context = {}, buttonStyle, menuPlacement = 'bottom-end', triggerLabel, triggerIcon: TriggerIcon }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          triggerRef.current && !triggerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (typeId) => {
    const msg = buildMessage(typeId, context);
    const url = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  const label = triggerLabel || 'WhatsApp';
  const Icon = TriggerIcon || MessageSquare;

  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(prev => !prev)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: 'inherit',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          padding: '4px',
          ...buttonStyle
        }}
        title="Chat on WhatsApp"
      >
        <Icon size={16} />
        <span>{label}</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          className="wa-enquiry-menu"
          style={{
            position: 'absolute',
            bottom: menuPlacement === 'bottom-end' ? 'calc(100% + 8px)' : 'auto',
            top: menuPlacement === 'top-end' ? 'calc(100% + 8px)' : 'auto',
            right: 0,
            background: '#FFFFFF',
            borderRadius: '14px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
            zIndex: 9999,
            minWidth: '240px',
            padding: '6px',
            animation: 'waMenuIn 0.18s ease-out',
          }}
        >
          <div style={{
            padding: '8px 12px 6px',
            fontSize: '0.65rem',
            fontWeight: '800',
            letterSpacing: '0.08em',
            color: '#64748B',
            textTransform: 'uppercase',
          }}>
            What do you want to book?
          </div>
          {ENQUIRY_TYPES.map(type => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleSelect(type.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                border: 'none',
                background: 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: '600',
                color: '#0F172A',
                textAlign: 'left',
                transition: 'background 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F0FDF4'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>{type.icon}</span>
              <span>{type.label}</span>
              <span style={{ marginLeft: 'auto', color: '#25D366', fontSize: '0.7rem' }}>›</span>
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes waMenuIn {
          from { opacity: 0; transform: translateY(6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </span>
  );
};

export { buildMessage };
