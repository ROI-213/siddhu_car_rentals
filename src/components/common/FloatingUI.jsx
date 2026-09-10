import React from 'react';
import { MessageSquare, PhoneCall, ChevronRight, Calendar } from 'lucide-react';
import { WhatsAppEnquiryMenu } from './WhatsAppEnquiryMenu';
import { SITE_CONFIG } from '../../config/site';

export const FloatingUI = ({ onOpenEnquiry }) => {
  return (
    <>
      {/* Floating Action Cluster (Desktop & Mobile) */}
      <div style={{
        position: 'fixed',
        bottom: '88px',
        right: '24px',
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-end'
      }} className="floating-actions-desktop">

        {/* Call Button */}
        <a
          href={`tel:${SITE_CONFIG.whatsapp.phone}`}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#12151C',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            border: '1px solid rgba(197, 160, 89, 0.5)',
            textDecoration: 'none',
            transition: 'transform 0.2s ease'
          }}
          title="Call Dispatch (+91 76250 59665)"
          aria-label="Call Dispatch"
        >
          <PhoneCall size={22} color="#C5A059" />
        </a>

        {/* WhatsApp Button */}
        <WhatsAppEnquiryMenu context={{}} menuPlacement="bottom-end" triggerLabel="" triggerIcon={MessageSquare} />
      </div>

      {/* Mobile Bottom Sticky CTA Bar (Shown only on small screens < 768px) */}
      <div className="mobile-sticky-bar">
        <a
          href={`tel:${SITE_CONFIG.whatsapp.phone}`}
          style={{
            flex: 1,
            height: '46px',
            borderRadius: '10px',
            background: '#12151C',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          <PhoneCall size={16} color="#C5A059" />
          <span>Call Desk</span>
        </a>

        <WhatsAppEnquiryMenu context={{}} menuPlacement="top-end" triggerLabel="WhatsApp" triggerIcon={MessageSquare} />

        <button
          onClick={onOpenEnquiry}
          style={{
            flex: 1.2,
            height: '46px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <span>Get Quote</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        .mobile-sticky-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 10px 14px;
          background: rgba(248, 249, 250, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid rgba(197, 160, 89, 0.3);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
          gap: 8px;
        }

        @media (max-width: 767px) {
          .mobile-sticky-bar {
            display: flex !important;
          }
          .floating-actions-desktop {
            bottom: 74px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </>
  );
};
