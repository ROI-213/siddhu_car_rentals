import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { WhatsAppBookingModal } from '../modals/WhatsAppBookingModal';

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

export const WhatsAppIcon = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path
      d="M17.472 14.382c-.3-.15-1.77-.874-2.044-.974-.275-.1-.475-.15-.675.15-.2.3-.774.974-.95 1.173-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.489-.892-.796-1.494-1.78-1.67-2.08-.174-.3-.018-.462.132-.611.136-.134.301-.35.451-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.506-.675-.515-.175-.009-.375-.011-.575-.011s-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.899 1.225 3.1.15.2 2.115 3.23 5.123 4.531.715.31 1.274.495 1.708.633.718.228 1.372.196 1.888.119.576-.086 1.77-.723 2.02-1.422.25-.7.25-1.3.175-1.423-.075-.123-.275-.198-.575-.348z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.848.502 3.58 1.377 5.071L2 22l5.074-1.332A9.957 9.957 0 0012.004 22c5.524 0 10.004-4.48 10.004-9.996C22.008 6.48 17.528 2 12.004 2zm0 18.293a8.27 8.27 0 01-4.218-1.157l-.302-.18-3.13.821.836-3.05-.197-.314a8.27 8.27 0 01-1.275-4.417c0-4.577 3.725-8.302 8.286-8.302 4.562 0 8.286 3.725 8.286 8.302 0 4.577-3.724 8.297-8.286 8.297z"
      fill={color}
    />
  </svg>
);

export const WhatsAppEnquiryMenu = ({ context = {}, buttonStyle, menuPlacement = 'bottom-end', triggerLabel, triggerIcon: TriggerIcon, iconSize = 18, children, className = '', ...restProps }) => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    const serviceObj = ENQUIRY_TYPES.find(t => t.id === typeId) || { id: typeId, label: typeId, icon: '💬' };
    setSelectedService(serviceObj);
    setIsModalOpen(true);
    setOpen(false);
  };

  const hasExplicitLabel = triggerLabel !== undefined;
  const label = hasExplicitLabel ? triggerLabel : 'WhatsApp';
  const Icon = TriggerIcon || WhatsAppIcon;
  const isFullWidth = buttonStyle?.width === '100%';

  return (
    <span style={{
      position: 'relative',
      display: isFullWidth ? 'flex' : 'inline-flex',
      width: isFullWidth ? '100%' : 'auto',
      flex: buttonStyle?.flex || 'initial'
    }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
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
        aria-label="Chat on WhatsApp"
        {...restProps}
      >
        {children || (
          <>
            <Icon size={iconSize} />
            {label && <span>{label}</span>}
          </>
        )}
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

      {isModalOpen && (
        <WhatsAppBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          serviceType={selectedService}
          context={context}
        />
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
