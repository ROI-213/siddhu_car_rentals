import React, { useState, useEffect } from 'react';
import {
  Star,
  PhoneCall,
  MapPin,
  MessageSquare,
  Clock,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { tariffApi } from '../../services/tariffApi';
import { testimonialsData as DEFAULT_TESTIMONIALS_DATA } from '../../data/testimonialsData';

export const DEFAULT_CONTACT_DATA = {
  hero: {
    badge: '24/7 Dispatch & Concierge',
    title: "We're Here to Drive",
    titleHighlight: 'Your Journey',
    description: 'Premium chauffeur-driven car rentals across Bengaluru. Airport transfers, outstation trips, corporate fleets & luxury rides — one call away, 24/7.',
    image: '/images/siddhu_white_car_bengaluru_road.jpg'
  },
  stats: [
    { value: '24/7', label: 'Always Available' },
    { value: '< 15 Min', label: 'Quote Response' },
    { value: '4.9 ★', label: 'Customer Rating' },
    { value: '20+ Vehicles', label: 'Ready Fleet' },
    { value: '100%', label: 'Verified Drivers' }
  ],
  dispatch: {
    primaryPhone: '+91 76250 59665',
    secondaryPhone: '+91 81472 04327',
    whatsappNumber: '917625059665',
    whatsappLabel: '+91 76250 59665 (Instant Quote)',
    officeAddress: '#314, 12th Main, 15th Cross, JP Nagar 5th Phase, Bengaluru – 560 078',
    gmapsQueryUrl: 'https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+JP+Nagar+5th+Phase+Bengaluru',
    gmapsEmbedUrl: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1ssiddhu+car+rentals+JP+Nagar+5th+Phase+Bengaluru',
    operatingHours: 'Open 24 hours / 7 days / 365 days a year'
  },
  trustPills: [
    { label: 'Verified Drivers', color: '#10B981' },
    { label: 'KA Yellow Board', color: '#3B82F6' },
    { label: 'GST Invoicing', color: '#8B5CF6' }
  ]
};

export const DEFAULT_REVIEWS_DATA = {
  hero: {
    badge: 'Client Feedback',
    title: 'What Our Clients',
    titleHighlight: 'Say About Us',
    description: 'Read genuine feedback from travellers who have experienced our chauffeur-driven fleet across Bengaluru and beyond.',
    image: '/images/hero_luxury_sedan.jpg'
  },
  googleReviewsCard: {
    badge: 'Google Reviews',
    title: 'See What Google Says',
    titleHighlight: 'About Us',
    description: 'Browse our Google Business Profile for unfiltered customer reviews and ratings from real journeys.',
    companyName: 'Siddhu Car Rentals',
    addressLine: 'JP Nagar, Bengaluru — Luxury Car Rentals & Chauffeur Services',
    ratingScore: '5.0',
    reviewCountLabel: 'See our rating on Google',
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=siddhu+car+rentals+JP+Nagar+Bengaluru',
    btnText: 'View All Google Reviews'
  },
  testimonialsList: DEFAULT_TESTIMONIALS_DATA
};

export const AdminReviewsContact = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('reviews'); // 'reviews' | 'contact'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Reviews CMS State
  const [reviewsData, setReviewsData] = useState(DEFAULT_REVIEWS_DATA);
  const [editingReview, setEditingReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewModalMode, setReviewModalMode] = useState('add');

  // Contact CMS State
  const [contactData, setContactData] = useState(DEFAULT_CONTACT_DATA);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [fetchedReviews, fetchedContact] = await Promise.all([
        tariffApi.getContent('testimonials_page'),
        tariffApi.getContent('contact_page')
      ]);

      if (fetchedReviews && typeof fetchedReviews === 'object') {
        setReviewsData({
          hero: { ...DEFAULT_REVIEWS_DATA.hero, ...(fetchedReviews.hero || {}) },
          googleReviewsCard: { ...DEFAULT_REVIEWS_DATA.googleReviewsCard, ...(fetchedReviews.googleReviewsCard || {}) },
          testimonialsList: Array.isArray(fetchedReviews.testimonialsList) ? fetchedReviews.testimonialsList : DEFAULT_TESTIMONIALS_DATA
        });
      }

      if (fetchedContact && typeof fetchedContact === 'object') {
        setContactData({
          hero: { ...DEFAULT_CONTACT_DATA.hero, ...(fetchedContact.hero || {}) },
          stats: Array.isArray(fetchedContact.stats) ? fetchedContact.stats : DEFAULT_CONTACT_DATA.stats,
          dispatch: { ...DEFAULT_CONTACT_DATA.dispatch, ...(fetchedContact.dispatch || {}) },
          trustPills: Array.isArray(fetchedContact.trustPills) ? fetchedContact.trustPills : DEFAULT_CONTACT_DATA.trustPills
        });
      }
    } catch (err) {
      console.warn('Error loading dynamic reviews and contact content:', err);
      if (showToast) showToast('Loaded cached default configurations.', 'info');
    } finally {
      setLoading(false);
    }
  };

  // --- SAVE HANDLERS ---
  const handleSaveReviews = async () => {
    setSaving(true);
    try {
      await tariffApi.saveContent('testimonials_page', reviewsData);
      window.dispatchEvent(new Event('scr_site_content_updated'));
      if (showToast) showToast('Reviews & Testimonials content saved successfully!', 'success');
    } catch (err) {
      console.error(err);
      if (showToast) showToast('Failed to save reviews content: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContact = async () => {
    setSaving(true);
    try {
      await tariffApi.saveContent('contact_page', contactData);
      window.dispatchEvent(new Event('scr_site_content_updated'));
      if (showToast) showToast('Contact page details & dispatch info saved successfully!', 'success');
    } catch (err) {
      console.error(err);
      if (showToast) showToast('Failed to save contact data: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // --- REVIEWS CRUD ---
  const handleOpenAddReview = () => {
    setReviewModalMode('add');
    setEditingReview({
      id: Date.now(),
      name: '',
      title: 'Corporate Traveler',
      company: '',
      category: 'corporate',
      categoryLabel: 'Corporate Mobility',
      rating: 5,
      date: 'September 2026',
      avatarBg: '#0F766E',
      isLocalGuide: false,
      review: ''
    });
    setIsReviewModalOpen(true);
  };

  const handleOpenEditReview = (item) => {
    setReviewModalMode('edit');
    setEditingReview({ ...item });
    setIsReviewModalOpen(true);
  };

  const handleDeleteReview = (id) => {
    if (!window.confirm('Are you sure you want to delete this customer review?')) return;
    const updated = reviewsData.testimonialsList.filter(r => r.id !== id);
    setReviewsData(prev => ({ ...prev, testimonialsList: updated }));
    if (showToast) showToast('Review deleted. Click Save Reviews to publish.', 'info');
  };

  const handleSaveReviewModal = (e) => {
    e.preventDefault();
    if (!editingReview.name.trim() || !editingReview.review.trim()) {
      alert('Please provide client name and review quote.');
      return;
    }

    let updatedList;
    if (reviewModalMode === 'add') {
      updatedList = [editingReview, ...reviewsData.testimonialsList];
    } else {
      updatedList = reviewsData.testimonialsList.map(r => r.id === editingReview.id ? editingReview : r);
    }

    setReviewsData(prev => ({ ...prev, testimonialsList: updatedList }));
    setIsReviewModalOpen(false);
    setEditingReview(null);
    if (showToast) showToast(`Review ${reviewModalMode === 'add' ? 'added' : 'updated'}. Click Save Reviews to publish!`, 'info');
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
        <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '3px solid #C5A059', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '14px', fontWeight: '600' }}>Loading Reviews & Contact CMS Data...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Header Card */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.4rem' }}>⭐</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              Reviews & Contact Page CMS
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0 }}>
            Live content manager for Client Feedback, Google Reviews, 24/7 Dispatch Desk, Address, and Interactive Phone Lines.
          </p>
        </div>

        {/* Global Save Button for Active Tab */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={activeTab === 'reviews' ? handleSaveReviews : handleSaveContact}
            disabled={saving}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.92rem',
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(16,185,129,0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <Save size={18} />
            <span>{saving ? 'Saving to Database...' : `Save ${activeTab === 'reviews' ? 'Reviews' : 'Contact'} Changes`}</span>
          </button>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid rgba(0,0,0,0.06)', paddingBottom: '12px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            background: activeTab === 'reviews' ? '#12151C' : '#F1F5F9',
            color: activeTab === 'reviews' ? '#C5A059' : '#475569',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <Star size={16} />
          <span>Reviews & Google Feedback ({reviewsData.testimonialsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            background: activeTab === 'contact' ? '#12151C' : '#F1F5F9',
            color: activeTab === 'contact' ? '#C5A059' : '#475569',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <PhoneCall size={16} />
          <span>Contact Page, Dispatch & Google Map</span>
        </button>
      </div>

      {/* TAB 1: REVIEWS CMS */}
      {activeTab === 'reviews' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Reviews Hero Editor */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Edit3 size={18} color="#C5A059" />
              <span>Reviews Page Hero Banner</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Badge Text</label>
                <input
                  type="text"
                  value={reviewsData.hero.badge || ''}
                  onChange={e => setReviewsData(prev => ({ ...prev, hero: { ...prev.hero, badge: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Hero Title</label>
                <input
                  type="text"
                  value={reviewsData.hero.title || ''}
                  onChange={e => setReviewsData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Title Highlight (Gold)</label>
                <input
                  type="text"
                  value={reviewsData.hero.titleHighlight || ''}
                  onChange={e => setReviewsData(prev => ({ ...prev, hero: { ...prev.hero, titleHighlight: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Hero Description</label>
                <textarea
                  rows={2}
                  value={reviewsData.hero.description || ''}
                  onChange={e => setReviewsData(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          </div>

          {/* Google Business Profile Card Editor */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem', color: '#1A73E8', fontWeight: '900' }}>G</span>
              <span>Google Reviews Feature Card</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Business Listing Name</label>
                <input
                  type="text"
                  value={reviewsData.googleReviewsCard?.companyName || ''}
                  onChange={e => setReviewsData(prev => ({ ...prev, googleReviewsCard: { ...prev.googleReviewsCard, companyName: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Address / Tagline Subtitle</label>
                <input
                  type="text"
                  value={reviewsData.googleReviewsCard?.addressLine || ''}
                  onChange={e => setReviewsData(prev => ({ ...prev, googleReviewsCard: { ...prev.googleReviewsCard, addressLine: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Button Text</label>
                <input
                  type="text"
                  value={reviewsData.googleReviewsCard?.btnText || ''}
                  onChange={e => setReviewsData(prev => ({ ...prev, googleReviewsCard: { ...prev.googleReviewsCard, btnText: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Google Maps Reviews URL</label>
                <input
                  type="text"
                  value={reviewsData.googleReviewsCard?.gmapsUrl || ''}
                  onChange={e => setReviewsData(prev => ({ ...prev, googleReviewsCard: { ...prev.googleReviewsCard, gmapsUrl: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          </div>

          {/* Testimonials List Manager */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  Client Reviews & Testimonials ({reviewsData.testimonialsList.length})
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '4px 0 0' }}>
                  Manage client feedback cards displayed across the Testimonials page with category tags and verified badges.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddReview}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#C5A059',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} />
                <span>Add New Review</span>
              </button>
            </div>

            {/* Testimonials Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569' }}>
                    <th style={{ padding: '12px 14px' }}>Client</th>
                    <th style={{ padding: '12px 14px' }}>Designation / Company</th>
                    <th style={{ padding: '12px 14px' }}>Category</th>
                    <th style={{ padding: '12px 14px' }}>Rating</th>
                    <th style={{ padding: '12px 14px' }}>Review Snippet</th>
                    <th style={{ padding: '12px 14px' }}>Date</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewsData.testimonialsList.map((item, idx) => (
                    <tr key={item.id || idx} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0F172A' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: item.avatarBg || '#0F766E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800' }}>
                            {item.name ? item.name.charAt(0) : 'U'}
                          </span>
                          <span>{item.name}</span>
                          {item.isLocalGuide && <span style={{ fontSize: '0.65rem', background: '#FEF3C7', color: '#92400E', padding: '2px 5px', borderRadius: '4px', fontWeight: '700' }}>Local Guide</span>}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#64748B' }}>
                        {item.title} {item.company ? `• ${item.company}` : ''}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '0.74rem', fontWeight: '700', background: 'rgba(37,99,235,0.08)', color: '#2563EB', textTransform: 'capitalize' }}>
                          {item.categoryLabel || item.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#F59E0B', fontWeight: '700' }}>
                        {'★'.repeat(item.rating || 5)}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#334155', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        "{item.review}"
                      </td>
                      <td style={{ padding: '12px 14px', color: '#94A3B8', fontSize: '0.8rem' }}>
                        {item.date}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenEditReview(item)}
                            title="Edit Review"
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', cursor: 'pointer' }}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(item.id)}
                            title="Delete Review"
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #FECACA', background: '#FEF2F2', color: '#EF4444', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTACT PAGE CMS */}
      {activeTab === 'contact' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Contact Hero Editor */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Edit3 size={18} color="#C5A059" />
              <span>Contact Page Hero Banner</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Hero Badge</label>
                <input
                  type="text"
                  value={contactData.hero?.badge || ''}
                  onChange={e => setContactData(prev => ({ ...prev, hero: { ...prev.hero, badge: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Hero Title Prefix</label>
                <input
                  type="text"
                  value={contactData.hero?.title || ''}
                  onChange={e => setContactData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Title Highlight (Gold)</label>
                <input
                  type="text"
                  value={contactData.hero?.titleHighlight || ''}
                  onChange={e => setContactData(prev => ({ ...prev, hero: { ...prev.hero, titleHighlight: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Hero Subtitle / Description</label>
                <textarea
                  rows={2}
                  value={contactData.hero?.description || ''}
                  onChange={e => setContactData(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          </div>

          {/* 24/7 Dispatch Desk & Phone Numbers */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneCall size={18} color="#C5A059" />
              <span>Direct Dispatch Lines & Concierge Desk</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Primary 24/7 Dispatch Phone</label>
                <input
                  type="text"
                  value={contactData.dispatch?.primaryPhone || ''}
                  onChange={e => setContactData(prev => ({ ...prev, dispatch: { ...prev.dispatch, primaryPhone: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: '700' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Secondary Alternate Phone</label>
                <input
                  type="text"
                  value={contactData.dispatch?.secondaryPhone || ''}
                  onChange={e => setContactData(prev => ({ ...prev, dispatch: { ...prev.dispatch, secondaryPhone: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: '700' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>WhatsApp Number (Digits only, with country code)</label>
                <input
                  type="text"
                  value={contactData.dispatch?.whatsappNumber || ''}
                  onChange={e => setContactData(prev => ({ ...prev, dispatch: { ...prev.dispatch, whatsappNumber: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Operating Hours Text</label>
                <input
                  type="text"
                  value={contactData.dispatch?.operatingHours || ''}
                  onChange={e => setContactData(prev => ({ ...prev, dispatch: { ...prev.dispatch, operatingHours: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          </div>

          {/* Office Address & Google Maps Embed */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#C5A059" />
              <span>Office Location & Google Maps Embed</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Headquarters Address</label>
                <textarea
                  rows={2}
                  value={contactData.dispatch?.officeAddress || ''}
                  onChange={e => setContactData(prev => ({ ...prev, dispatch: { ...prev.dispatch, officeAddress: e.target.value } }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Directions Search Link (Opens Google Maps)</label>
                  <input
                    type="text"
                    value={contactData.dispatch?.gmapsQueryUrl || ''}
                    onChange={e => setContactData(prev => ({ ...prev, dispatch: { ...prev.dispatch, gmapsQueryUrl: e.target.value } }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Google Maps iFrame Embed URL</label>
                  <input
                    type="text"
                    value={contactData.dispatch?.gmapsEmbedUrl || ''}
                    onChange={e => setContactData(prev => ({ ...prev, dispatch: { ...prev.dispatch, gmapsEmbedUrl: e.target.value } }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar Configuration */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#C5A059" />
              <span>Operational Stats Strip (Dark Bar)</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              {contactData.stats.map((stat, idx) => (
                <div key={idx} style={{ padding: '12px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#94A3B8', marginBottom: '4px' }}>Stat #{idx + 1} Value</label>
                  <input
                    type="text"
                    value={stat.value || ''}
                    onChange={e => {
                      const updated = [...contactData.stats];
                      updated[idx].value = e.target.value;
                      setContactData(prev => ({ ...prev, stats: updated }));
                    }}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}
                  />
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#94A3B8', marginBottom: '4px' }}>Label</label>
                  <input
                    type="text"
                    value={stat.label || ''}
                    onChange={e => {
                      const updated = [...contactData.stats];
                      updated[idx].label = e.target.value;
                      setContactData(prev => ({ ...prev, stats: updated }));
                    }}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODAL: ADD / EDIT REVIEW */}
      {isReviewModalOpen && editingReview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={20} color="#F59E0B" />
              <span>{reviewModalMode === 'add' ? 'Add Verified Client Review' : 'Edit Client Review'}</span>
            </h3>

            <form onSubmit={handleSaveReviewModal} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingReview.name}
                    onChange={e => setEditingReview(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Ramesh Chandra"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Star Rating (1 - 5)</label>
                  <select
                    value={editingReview.rating}
                    onChange={e => setEditingReview(prev => ({ ...prev, rating: parseInt(e.target.value, 10) }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Title / Designation</label>
                  <input
                    type="text"
                    value={editingReview.title}
                    onChange={e => setEditingReview(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Director, Frequent Flyer, Bride"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Company / City</label>
                  <input
                    type="text"
                    value={editingReview.company}
                    onChange={e => setEditingReview(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. Bengaluru, Infosys, Tech Capital"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Category Filter</label>
                  <select
                    value={editingReview.category}
                    onChange={e => {
                      const cat = e.target.value;
                      let label = 'Corporate Mobility';
                      if (cat === 'airport') label = 'Airport VIP Transfer';
                      if (cat === 'outstation') label = 'Outstation Travel';
                      if (cat === 'wedding') label = 'Wedding Convoy';
                      setEditingReview(prev => ({ ...prev, category: cat, categoryLabel: label }));
                    }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  >
                    <option value="corporate">Corporate Mobility</option>
                    <option value="airport">Airport VIP Transfers</option>
                    <option value="outstation">Outstation Tours</option>
                    <option value="wedding">Wedding Convoys</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Review Date</label>
                  <input
                    type="text"
                    value={editingReview.date}
                    onChange={e => setEditingReview(prev => ({ ...prev, date: e.target.value }))}
                    placeholder="e.g. September 2026"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Client Testimonial Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={editingReview.review}
                  onChange={e => setEditingReview(prev => ({ ...prev, review: e.target.value }))}
                  placeholder="Paste client testimonial text here..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
                <input
                  type="checkbox"
                  id="isLocalGuideCheck"
                  checked={Boolean(editingReview.isLocalGuide)}
                  onChange={e => setEditingReview(prev => ({ ...prev, isLocalGuide: e.target.checked }))}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="isLocalGuideCheck" style={{ fontSize: '0.88rem', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
                  Mark as Google "Local Guide" Contributor
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', borderRadius: '8px', border: 'none', background: '#0F172A', color: '#FFFFFF', fontWeight: '700', cursor: 'pointer' }}
                >
                  {reviewModalMode === 'add' ? 'Add Review' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
