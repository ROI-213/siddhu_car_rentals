import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Layers,
  Award,
  Globe,
  Compass
} from 'lucide-react';
import { tariffApi } from '../../services/tariffApi';
import { DEFAULT_SITE_CONTENT } from '../../data/defaultSiteContent';

export const AdminHomeContent = ({ activeSubTab, onSubTabChange, showToast }) => {
  const [content, setContent] = useState(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);

  // Form states for each section
  const [heroForm, setHeroForm] = useState(DEFAULT_SITE_CONTENT.hero);
  const [contactForm, setContactForm] = useState(DEFAULT_SITE_CONTENT.contact);
  const [testimonialsForm, setTestimonialsForm] = useState(DEFAULT_SITE_CONTENT.testimonials);
  const [destinationsForm, setDestinationsForm] = useState(DEFAULT_SITE_CONTENT.destinations);
  const [servicesForm, setServicesForm] = useState(DEFAULT_SITE_CONTENT.services);
  const [storyForm, setStoryForm] = useState(DEFAULT_SITE_CONTENT.story);

  // Modals / sub-editors
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  const [editingDestination, setEditingDestination] = useState(null);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);

  // Load content from API
  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    setLoading(true);
    try {
      const data = await tariffApi.getContent();
      if (data && typeof data === 'object') {
        const h = { ...DEFAULT_SITE_CONTENT.hero, ...(data.hero || {}) };
        const c = { ...DEFAULT_SITE_CONTENT.contact, ...(data.contact || {}) };
        const t = {
          featured: (data.testimonials && data.testimonials.featured) || DEFAULT_SITE_CONTENT.testimonials.featured,
          list: (data.testimonials && Array.isArray(data.testimonials.list)) ? data.testimonials.list : DEFAULT_SITE_CONTENT.testimonials.list
        };
        const d = {
          heroItems: (data.destinations && Array.isArray(data.destinations.heroItems)) ? data.destinations.heroItems : DEFAULT_SITE_CONTENT.destinations.heroItems,
          ribbonItems: (data.destinations && Array.isArray(data.destinations.ribbonItems)) ? data.destinations.ribbonItems : DEFAULT_SITE_CONTENT.destinations.ribbonItems
        };
        const s = (data.services && Array.isArray(data.services)) ? data.services : DEFAULT_SITE_CONTENT.services;
        const st = (data.story && Array.isArray(data.story)) ? data.story : DEFAULT_SITE_CONTENT.story;

        setContent({ hero: h, contact: c, testimonials: t, destinations: d, services: s, story: st });
        setHeroForm(h);
        setContactForm(c);
        setTestimonialsForm(t);
        setDestinationsForm(d);
        setServicesForm(s);
        setStoryForm(st);
      }
    } catch (err) {
      showToast('Notice: Loaded cached/default content: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (sectionKey, formData) => {
    setSavingKey(sectionKey);
    try {
      const saved = await tariffApi.saveContent(sectionKey, formData);
      showToast(`✓ "${sectionKey.toUpperCase()}" section saved to PostgreSQL successfully!`);
      window.dispatchEvent(new Event('scr_site_content_updated'));
      setContent(prev => ({ ...prev, [sectionKey]: saved }));
    } catch (err) {
      showToast(`Error saving "${sectionKey}": ` + err.message, 'error');
    } finally {
      setSavingKey(null);
    }
  };

  const handleResetSection = async (sectionKey) => {
    if (!window.confirm(`Are you sure you want to reset the "${sectionKey.toUpperCase()}" section to factory defaults?`)) {
      return;
    }
    const defaultData = DEFAULT_SITE_CONTENT[sectionKey];
    if (sectionKey === 'hero') setHeroForm(defaultData);
    if (sectionKey === 'contact') setContactForm(defaultData);
    if (sectionKey === 'testimonials') setTestimonialsForm(defaultData);
    if (sectionKey === 'destinations') setDestinationsForm(defaultData);
    if (sectionKey === 'services') setServicesForm(defaultData);
    if (sectionKey === 'story') setStoryForm(defaultData);

    await handleSaveSection(sectionKey, defaultData);
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-slate-500)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏳</div>
        <p>Loading home page content from PostgreSQL...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Sub-navigation pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        background: '#FFFFFF',
        padding: '12px 16px',
        borderRadius: '14px',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
      }}>
        {[
          { id: 'hero', label: '🏠 Hero & Banner' },
          { id: 'contact', label: '🏢 Contact & HQ' },
          { id: 'testimonials', label: '💬 Testimonials' },
          { id: 'destinations', label: '📍 Destinations' },
          { id: 'services', label: '🛠️ Services Bento' },
          { id: 'story', label: '🛡️ Why Choose Us' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSubTabChange(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeSubTab === tab.id ? '#0284C7' : 'transparent',
              color: activeSubTab === tab.id ? '#FFFFFF' : 'var(--color-slate-700)',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. HERO & BANNER EDITOR */}
      {activeSubTab === 'hero' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: '0 0 4px 0' }}>
                Hero & Banner Content
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', margin: 0 }}>
                Controls the main headline, guarantee badge, and call-to-action buttons.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleResetSection('hero')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  color: 'var(--color-slate-600)',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>
              <button
                type="button"
                disabled={savingKey === 'hero'}
                onClick={() => handleSaveSection('hero', heroForm)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={15} />
                <span>{savingKey === 'hero' ? 'Saving...' : 'Save Hero Changes'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Route Pill Tagline
              </label>
              <input
                type="text"
                value={heroForm.routePill || ''}
                onChange={(e) => setHeroForm({ ...heroForm, routePill: e.target.value })}
                placeholder="e.g. BENGALURU & BEYOND"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Subline Badge / Guarantee
              </label>
              <input
                type="text"
                value={heroForm.sublineBadge || ''}
                onChange={(e) => setHeroForm({ ...heroForm, sublineBadge: e.target.value })}
                placeholder="e.g. Self-Drive Not Available • Verified Chauffeurs • All Premium Cars"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Main Headline (Line 1)
              </label>
              <input
                type="text"
                value={heroForm.titleLine1 || ''}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                placeholder="e.g. PREMIUM CHAUFFEUR-DRIVEN"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Main Headline (Line 2 Highlight)
              </label>
              <input
                type="text"
                value={heroForm.titleLine2 || ''}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                placeholder="e.g. CAR RENTALS IN BANGALORE"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Supporting Description Text
              </label>
              <textarea
                rows={3}
                value={heroForm.supportingText || ''}
                onChange={(e) => setHeroForm({ ...heroForm, supportingText: e.target.value })}
                placeholder="Describe your premium rental proposition..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={heroForm.btnExploreText || ''}
                onChange={(e) => setHeroForm({ ...heroForm, btnExploreText: e.target.value })}
                placeholder="e.g. EXPLORE FLEET"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={heroForm.btnQuoteText || ''}
                onChange={(e) => setHeroForm({ ...heroForm, btnQuoteText: e.target.value })}
                placeholder="e.g. GET QUOTE"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Hero Background Image URL / Path
              </label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={heroForm.backgroundImage || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, backgroundImage: e.target.value })}
                  placeholder="/images/siddhu_adventure_hero.jpg"
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
                {heroForm.backgroundImage && (
                  <img
                    src={heroForm.backgroundImage}
                    alt="Preview"
                    style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CONTACT & HEADQUARTERS EDITOR */}
      {activeSubTab === 'contact' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: '0 0 4px 0' }}>
                Contact & Headquarters Information
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', margin: 0 }}>
                Update phones, WhatsApp dispatch numbers, corporate email, office address, and Google Maps embed.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleResetSection('contact')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  color: 'var(--color-slate-600)',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>
              <button
                type="button"
                disabled={savingKey === 'contact'}
                onClick={() => handleSaveSection('contact', contactForm)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={15} />
                <span>{savingKey === 'contact' ? 'Saving...' : 'Save Contact Changes'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Primary 24/7 Phone Number
              </label>
              <input
                type="text"
                value={contactForm.phonePrimary || ''}
                onChange={(e) => setContactForm({ ...contactForm, phonePrimary: e.target.value })}
                placeholder="+91 76250 59665"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Secondary Phone Number
              </label>
              <input
                type="text"
                value={contactForm.phoneSecondary || ''}
                onChange={(e) => setContactForm({ ...contactForm, phoneSecondary: e.target.value })}
                placeholder="+91 81472 04327"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                WhatsApp Dispatch Desk Number
              </label>
              <input
                type="text"
                value={contactForm.whatsappNumber || ''}
                onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                placeholder="+91 76250 59665"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Corporate Email Address
              </label>
              <input
                type="email"
                value={contactForm.email || ''}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="reservations@siddhucarrentals.com"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Headquarters Physical Address
              </label>
              <textarea
                rows={2}
                value={contactForm.address || ''}
                onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                placeholder="#314, 12th Main, 15th Cross, JP Nagar 5th Phase, Bengaluru - 560078"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Google Maps Embed Iframe URL
              </label>
              <input
                type="text"
                value={contactForm.gmapsEmbedUrl || ''}
                onChange={(e) => setContactForm({ ...contactForm, gmapsEmbedUrl: e.target.value })}
                placeholder="https://www.google.com/maps/embed?..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. TESTIMONIALS EDITOR */}
      {activeSubTab === 'testimonials' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: '0 0 4px 0' }}>
                Verified Client Testimonials
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', margin: 0 }}>
                Manage the featured VIP quote card and all marquee scrolling testimonials.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleResetSection('testimonials')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  color: 'var(--color-slate-600)',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>
              <button
                type="button"
                disabled={savingKey === 'testimonials'}
                onClick={() => handleSaveSection('testimonials', testimonialsForm)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={15} />
                <span>{savingKey === 'testimonials' ? 'Saving...' : 'Save All Testimonials'}</span>
              </button>
            </div>
          </div>

          {/* Featured Testimonial Editor */}
          <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Star size={18} color="#F59E0B" fill="#F59E0B" />
              <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'var(--color-slate-800)' }}>
                Featured VIP Quote Card (Main Left Highlight)
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                  Quote Text
                </label>
                <textarea
                  rows={3}
                  value={testimonialsForm.featured?.quote || ''}
                  onChange={(e) => setTestimonialsForm({
                    ...testimonialsForm,
                    featured: { ...testimonialsForm.featured, quote: e.target.value }
                  })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                  Author Full Name
                </label>
                <input
                  type="text"
                  value={testimonialsForm.featured?.name || ''}
                  onChange={(e) => setTestimonialsForm({
                    ...testimonialsForm,
                    featured: { ...testimonialsForm.featured, name: e.target.value }
                  })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={testimonialsForm.featured?.role || ''}
                  onChange={(e) => setTestimonialsForm({
                    ...testimonialsForm,
                    featured: { ...testimonialsForm.featured, role: e.target.value }
                  })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                  Company Name
                </label>
                <input
                  type="text"
                  value={testimonialsForm.featured?.company || ''}
                  onChange={(e) => setTestimonialsForm({
                    ...testimonialsForm,
                    featured: { ...testimonialsForm.featured, company: e.target.value }
                  })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                  VIP Badge Tag
                </label>
                <input
                  type="text"
                  value={testimonialsForm.featured?.badge || 'VIP Guest'}
                  onChange={(e) => setTestimonialsForm({
                    ...testimonialsForm,
                    featured: { ...testimonialsForm.featured, badge: e.target.value }
                  })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>
            </div>
          </div>

          {/* Marquee Testimonials List */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'var(--color-slate-800)' }}>
                Client Review Cards ({testimonialsForm.list?.length || 0})
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingTestimonial({
                    id: Date.now(),
                    name: '',
                    role: 'Corporate Guest',
                    company: '',
                    review: '',
                    rating: 5,
                    bg: '#F8FAFC',
                    borderLeft: '#0284C7'
                  });
                  setIsTestimonialModalOpen(true);
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(2, 132, 199, 0.1)',
                  color: '#0284C7',
                  border: '1px solid rgba(2, 132, 199, 0.25)',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={15} />
                <span>Add New Testimonial</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {(testimonialsForm.list || []).map((item, index) => (
                <div
                  key={item.id || index}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: item.bg || '#F8FAFC',
                    borderLeft: `4px solid ${item.borderLeft || '#0284C7'}`,
                    borderTop: '1px solid #E2E8F0',
                    borderRight: '1px solid #E2E8F0',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTestimonial(item);
                            setIsTestimonialModalOpen(true);
                          }}
                          style={{ padding: '4px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#0284C7' }}
                          title="Edit"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete review by ${item.name}?`)) {
                              setTestimonialsForm({
                                ...testimonialsForm,
                                list: testimonialsForm.list.filter(t => t.id !== item.id)
                              });
                            }
                          }}
                          style={{ padding: '4px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444' }}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-slate-700)', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                      "{item.review}"
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--color-slate-900)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)' }}>
                      {item.role}{item.company ? ` • ${item.company}` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Edit Modal */}
          {isTestimonialModalOpen && editingTestimonial && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3000,
              padding: '20px'
            }}>
              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', maxWidth: '500px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '800' }}>
                  {testimonialsForm.list?.some(t => t.id === editingTestimonial.id) ? 'Edit Review' : 'Add New Review'}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Client Name</label>
                    <input
                      type="text"
                      value={editingTestimonial.name || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Role / Travel Purpose</label>
                    <input
                      type="text"
                      value={editingTestimonial.role || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                      placeholder="e.g. Corporate Traveler, Family Vacation to Coorg"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Company (Optional)</label>
                    <input
                      type="text"
                      value={editingTestimonial.company || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Review Text</label>
                    <textarea
                      rows={3}
                      value={editingTestimonial.review || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, review: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Star Rating (1-5)</label>
                    <select
                      value={editingTestimonial.rating || 5}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    >
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★☆</option>
                      <option value={3}>3 Stars ★★★☆☆</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setIsTestimonialModalOpen(false)}
                    style={{ padding: '8px 14px', borderRadius: '8px', background: '#F1F5F9', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!editingTestimonial.name || !editingTestimonial.review) {
                        alert('Please fill out client name and review text.');
                        return;
                      }
                      const existingIndex = testimonialsForm.list?.findIndex(t => t.id === editingTestimonial.id);
                      let updatedList = [...(testimonialsForm.list || [])];
                      if (existingIndex >= 0) {
                        updatedList[existingIndex] = editingTestimonial;
                      } else {
                        updatedList.push(editingTestimonial);
                      }
                      setTestimonialsForm({ ...testimonialsForm, list: updatedList });
                      setIsTestimonialModalOpen(false);
                    }}
                    style={{ padding: '8px 18px', borderRadius: '8px', background: '#0284C7', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontWeight: '700' }}
                  >
                    Save Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. DESTINATIONS EDITOR */}
      {activeSubTab === 'destinations' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: '0 0 4px 0' }}>
                Curated Outstation Destinations
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', margin: 0 }}>
                Manage the 3 top collage cards (Mysore, Airport, Coorg) and horizontal ribbon destinations.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleResetSection('destinations')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  color: 'var(--color-slate-600)',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>
              <button
                type="button"
                disabled={savingKey === 'destinations'}
                onClick={() => handleSaveSection('destinations', destinationsForm)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={15} />
                <span>{savingKey === 'destinations' ? 'Saving...' : 'Save All Destinations'}</span>
              </button>
            </div>
          </div>

          {/* Featured 3 Collage Cards */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: '0 0 14px 0', color: 'var(--color-slate-800)' }}>
              Top 3 Hero Collage Cards
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {(destinationsForm.heroItems || []).map((item, idx) => (
                <div key={item.id || idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={item.img} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...destinationsForm.heroItems];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setDestinationsForm({ ...destinationsForm, heroItems: updated });
                        }}
                        style={{ width: '100%', fontWeight: '700', fontSize: '0.9rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>Tagline & Distance:</span>
                      <input
                        type="text"
                        value={item.tag || ''}
                        onChange={(e) => {
                          const updated = [...destinationsForm.heroItems];
                          updated[idx] = { ...updated[idx], tag: e.target.value };
                          setDestinationsForm({ ...destinationsForm, heroItems: updated });
                        }}
                        style={{ width: '100%', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px' }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>Description Subtitle:</span>
                      <input
                        type="text"
                        value={item.desc || ''}
                        onChange={(e) => {
                          const updated = [...destinationsForm.heroItems];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          setDestinationsForm({ ...destinationsForm, heroItems: updated });
                        }}
                        style={{ width: '100%', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px' }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>Image Path:</span>
                      <input
                        type="text"
                        value={item.img || ''}
                        onChange={(e) => {
                          const updated = [...destinationsForm.heroItems];
                          updated[idx] = { ...updated[idx], img: e.target.value };
                          setDestinationsForm({ ...destinationsForm, heroItems: updated });
                        }}
                        style={{ width: '100%', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ribbon Catalog Destinations */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'var(--color-slate-800)' }}>
                Handpicked Journeys Ribbon ({destinationsForm.ribbonItems?.length || 0})
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingDestination({
                    id: 'custom-' + Date.now(),
                    name: '',
                    desc: '',
                    dist: '250 km',
                    img: '/images/destinations/hampi.jpg',
                    alt: '',
                    bg: '#FDFBF7',
                    rate: 'From ₹15/km',
                    fare: '300 km/day min',
                    type: 'outstation'
                  });
                  setIsDestinationModalOpen(true);
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(2, 132, 199, 0.1)',
                  color: '#0284C7',
                  border: '1px solid rgba(2, 132, 199, 0.25)',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={15} />
                <span>Add Ribbon Route</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {(destinationsForm.ribbonItems || []).map((item, idx) => (
                <div key={item.id || idx} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <img src={item.img} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-slate-900)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)' }}>{item.dist} • {item.rate}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingDestination(item);
                          setIsDestinationModalOpen(true);
                        }}
                        style={{ padding: '4px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#0284C7' }}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete destination ${item.name}?`)) {
                            setDestinationsForm({
                              ...destinationsForm,
                              ribbonItems: destinationsForm.ribbonItems.filter((_, i) => i !== idx)
                            });
                          }
                        }}
                        style={{ padding: '4px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ribbon Destination Modal */}
          {isDestinationModalOpen && editingDestination && (
            <div style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 3000, padding: '20px'
            }}>
              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', maxWidth: '480px', width: '100%' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '800' }}>
                  {destinationsForm.ribbonItems?.some(d => d.name === editingDestination.name) ? 'Edit Destination' : 'Add New Destination'}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Destination Name</label>
                    <input
                      type="text"
                      value={editingDestination.name || ''}
                      onChange={(e) => setEditingDestination({ ...editingDestination, name: e.target.value })}
                      placeholder="e.g. Ooty & Nilgiris"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Distance from Bangalore</label>
                    <input
                      type="text"
                      value={editingDestination.dist || ''}
                      onChange={(e) => setEditingDestination({ ...editingDestination, dist: e.target.value })}
                      placeholder="e.g. 270 km"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Subtitle / Scenery Highlight</label>
                    <input
                      type="text"
                      value={editingDestination.desc || ''}
                      onChange={(e) => setEditingDestination({ ...editingDestination, desc: e.target.value })}
                      placeholder="e.g. Botanical Valleys & Pine Lakes"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Image Path / URL</label>
                    <input
                      type="text"
                      value={editingDestination.img || ''}
                      onChange={(e) => setEditingDestination({ ...editingDestination, img: e.target.value })}
                      placeholder="/images/destinations/ooty.jpg"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Estimated Rate</label>
                    <input
                      type="text"
                      value={editingDestination.rate || ''}
                      onChange={(e) => setEditingDestination({ ...editingDestination, rate: e.target.value })}
                      placeholder="e.g. From ₹15/km"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setIsDestinationModalOpen(false)}
                    style={{ padding: '8px 14px', borderRadius: '8px', background: '#F1F5F9', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!editingDestination.name) {
                        alert('Please specify a destination name.');
                        return;
                      }
                      const existingIndex = destinationsForm.ribbonItems?.findIndex(d => d.name === editingDestination.name || (d.id && d.id === editingDestination.id));
                      let updated = [...(destinationsForm.ribbonItems || [])];
                      if (existingIndex >= 0) {
                        updated[existingIndex] = editingDestination;
                      } else {
                        updated.push(editingDestination);
                      }
                      setDestinationsForm({ ...destinationsForm, ribbonItems: updated });
                      setIsDestinationModalOpen(false);
                    }}
                    style={{ padding: '8px 18px', borderRadius: '8px', background: '#0284C7', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontWeight: '700' }}
                  >
                    Save Route
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. SERVICES BENTO EDITOR */}
      {activeSubTab === 'services' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: '0 0 4px 0' }}>
                Services Bento Grid Cards
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', margin: 0 }}>
                Edit titles, subtitles, images, and routes for the 7 core service offerings.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleResetSection('services')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  color: 'var(--color-slate-600)',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>
              <button
                type="button"
                disabled={savingKey === 'services'}
                onClick={() => handleSaveSection('services', servicesForm)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={15} />
                <span>{savingKey === 'services' ? 'Saving...' : 'Save Services'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {(servicesForm || []).map((service, idx) => (
              <div key={service.id || idx} style={{ background: '#F8FAFC', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                  <img src={service.image} alt={service.title} style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-slate-500)', fontWeight: '700', textTransform: 'uppercase' }}>Service Title</label>
                    <input
                      type="text"
                      value={service.title || ''}
                      onChange={(e) => {
                        const updated = [...servicesForm];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setServicesForm(updated);
                      }}
                      style={{ width: '100%', fontWeight: '700', fontSize: '0.9rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>Subtitle / Description</label>
                    <textarea
                      rows={2}
                      value={service.subtitle || ''}
                      onChange={(e) => {
                        const updated = [...servicesForm];
                        updated[idx] = { ...updated[idx], subtitle: e.target.value };
                        setServicesForm(updated);
                      }}
                      style={{ width: '100%', fontSize: '0.82rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>Image Path</label>
                    <input
                      type="text"
                      value={service.image || ''}
                      onChange={(e) => {
                        const updated = [...servicesForm];
                        updated[idx] = { ...updated[idx], image: e.target.value };
                        setServicesForm(updated);
                      }}
                      style={{ width: '100%', fontSize: '0.82rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>Page Navigation Link</label>
                    <input
                      type="text"
                      value={service.path || ''}
                      onChange={(e) => {
                        const updated = [...servicesForm];
                        updated[idx] = { ...updated[idx], path: e.target.value };
                        setServicesForm(updated);
                      }}
                      placeholder="/local, /outstation, /corporate, /fleet"
                      style={{ width: '100%', fontSize: '0.82rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. WHY CHOOSE US STORY CARDS */}
      {activeSubTab === 'story' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: '0 0 4px 0' }}>
                Why Choose Us Story Cards (Pillars of Excellence)
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', margin: 0 }}>
                Controls the 6 scrolling feature story cards highlighting driver training, safety, and punctuality.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleResetSection('story')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  color: 'var(--color-slate-600)',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>
              <button
                type="button"
                disabled={savingKey === 'story'}
                onClick={() => handleSaveSection('story', storyForm)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={15} />
                <span>{savingKey === 'story' ? 'Saving...' : 'Save Story Cards'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {(storyForm || []).map((card, idx) => (
              <div key={card.id || idx} style={{ background: '#F8FAFC', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0284C7' }}>Card {card.id || `0${idx + 1}`}</span>
                  <input
                    type="text"
                    value={card.label || ''}
                    onChange={(e) => {
                      const updated = [...storyForm];
                      updated[idx] = { ...updated[idx], label: e.target.value };
                      setStoryForm(updated);
                    }}
                    placeholder="CATEGORY LABEL"
                    style={{ fontWeight: '700', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px', textTransform: 'uppercase' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>Headline (use newline \n for line breaks)</label>
                    <textarea
                      rows={2}
                      value={card.title || ''}
                      onChange={(e) => {
                        const updated = [...storyForm];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setStoryForm(updated);
                      }}
                      style={{ width: '100%', fontWeight: '700', fontSize: '0.85rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>Description</label>
                    <textarea
                      rows={2}
                      value={card.desc || ''}
                      onChange={(e) => {
                        const updated = [...storyForm];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setStoryForm(updated);
                      }}
                      style={{ width: '100%', fontSize: '0.82rem', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
