import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export const LegalModal = ({ isOpen, type, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <ShieldCheck size={28} color="#C5A059" />
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.8rem', margin: 0, color: 'var(--color-charcoal-900)' }}>
                Privacy Policy
              </h2>
            </div>
            <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '16px' }}>
              Last updated: September 2026. Siddhu Car Rentals is committed to safeguarding your privacy and protecting the confidential personal & corporate data entrusted to us.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--color-slate-700)', fontSize: '0.88rem', lineHeight: '1.7' }}>
              <div>
                <h4 style={{ color: 'var(--color-slate-900)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px' }}>
                  1. Information We Collect
                </h4>
                <p>We collect information necessary to fulfill chauffeur reservations, including full name, mobile number, email address, corporate entity name, pickup/drop addresses, flight numbers, and GSTIN (for B2B corporate billing).</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-slate-900)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px' }}>
                  2. Purpose & Use of Information
                </h4>
                <p>Your details are strictly used for chauffeur dispatch, real-time flight tracking, sending trip confirmations, dispatching duty slips, and generating official GST-compliant tax invoices. We do not sell, rent, or trade customer contact details with third-party advertising networks.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-slate-900)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px' }}>
                  3. Executive Confidentiality (NDA Compliance)
                </h4>
                <p>All Siddhu Car Rentals chauffeurs undergo rigorous background checks and sign strict confidentiality commitments. Conversations, routes, documents, and passenger movements remain completely private and confidential.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-slate-900)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px' }}>
                  4. Data Security & Storage
                </h4>
                <p>All digital reservation logs and billing data are stored in secure encrypted environments. Only authorized operations personnel can access dispatch coordinates.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-slate-900)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px' }}>
                  5. Contact Privacy Concierge
                </h4>
                <p>For inquiries or data modification requests, contact our privacy officer at <a href="mailto:reservations@siddhucarrentals.com" style={{ color: '#C5A059', fontWeight: '700' }}>reservations@siddhucarrentals.com</a> or call +91 76250 59665.</p>
              </div>
            </div>
          </>
        );

      case 'cancellation':
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <AlertCircle size={28} color="#C5A059" />
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.8rem', margin: 0, color: 'var(--color-charcoal-900)' }}>
                Cancellation & Refund Policy
              </h2>
            </div>
            <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '16px' }}>
              We understand plans can change unexpectedly. Our cancellation policy is structured to offer maximum flexibility for corporate clients and VIP travelers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--color-slate-700)', fontSize: '0.88rem', lineHeight: '1.7' }}>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
                <h4 style={{ color: 'var(--color-slate-900)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px' }}>
                  Local City & Airport Transfers
                </h4>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Free Cancellation:</strong> Up to 3 hours prior to scheduled garage departure time. Zero cancellation fee charged.</li>
                  <li><strong>Late Cancellation (within 3 hours):</strong> 50% of the base package rate applies to compensate the allocated chauffeur.</li>
                  <li><strong>Chauffeur on Arrival / No-Show:</strong> Full minimum base slab charge applicable once the vehicle arrives at pickup location.</li>
                </ul>
              </div>

              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
                <h4 style={{ color: 'var(--color-slate-900)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px' }}>
                  Outstation & Multi-Day Journeys
                </h4>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Free Cancellation:</strong> Up to 12 hours prior to journey reporting time. 100% refund of advance payment.</li>
                  <li><strong>Cancellation within 6-12 hours:</strong> 1-day minimum package charge (300 km base).</li>
                </ul>
              </div>

              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
                <h4 style={{ color: 'var(--color-slate-900)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px' }}>
                  Flight Delays & Rescheduling
                </h4>
                <p style={{ margin: 0 }}>
                  For Kempegowda International Airport arrivals, flight delays are monitored live by our dispatch team. <strong>No delay charges apply for flight time changes</strong>, provided flight details were shared during reservation.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--color-slate-900)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px' }}>
                  Refund Processing
                </h4>
                <p>Eligible refunds are credited back to the original source account or corporate ledger within 3-5 business days.</p>
              </div>
            </div>
          </>
        );

      case 'terms':
      default:
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <FileText size={28} color="#C5A059" />
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.8rem', margin: 0, color: 'var(--color-charcoal-900)' }}>
                Standard Terms & Conditions
              </h2>
            </div>
            <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '16px' }}>
              All bookings and chauffeur services operated by Siddhu Car Rentals (Bengaluru) are subject to the following standard operating tariff clauses:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--color-slate-700)', fontSize: '0.88rem', lineHeight: '1.7' }}>
              <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
                <strong>(a) Garage to Garage:</strong> The calculation of time and kilometer is strictly counted from garage departure to garage return.
              </div>
              <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
                <strong>(b) Calendar Day:</strong> Day means Calendar Day within a 24-hour cycle format.
              </div>
              <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
                <strong>(c) Tolls & Parking:</strong> Parking fees, toll plaza tariffs, state border entry permits, and entry fees will be billed on actual receipt basis.
              </div>
              <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
                <strong>(d) Night Driver Allowance:</strong> Local driver night bata will be charged extra for duties starting before 06:00 AM or extending past 10:00 PM.
              </div>
              <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
                <strong>(e) Taxes:</strong> Taxes will be charged on gross billing as per prevailing Government of India rates.
              </div>
              <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
                <strong>(f) GST Compliance:</strong> GST of 5% will be charged on total taxable invoice amount. Official corporate GST invoices issued.
              </div>
              <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
                <strong>(g) Fuel Benchmark:</strong> Tariffs are benchmarked against prevailing fuel rates (Diesel ₹90.99/L, Petrol ₹102.92/L).
              </div>
              <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #C5A059' }}>
                <strong>(h) Payment Release:</strong> All bank transfers, NEFT/RTGS, or cheques must be released strictly in favour of <strong>"Siddhu Car Rentals"</strong>.
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '85vh',
        overflowY: 'auto',
        background: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        padding: '32px'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#F1F5F9',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-slate-600)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E2E8F0';
            e.currentTarget.style.color = '#0F172A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.color = 'var(--color-slate-600)';
          }}
        >
          <X size={18} />
        </button>

        {renderContent()}

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(226, 232, 240, 0.9)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px',
              borderRadius: '9999px',
              background: '#0F172A',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.88rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
