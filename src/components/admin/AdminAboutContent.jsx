import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Crown, 
  Users, 
  Award, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { tariffApi } from '../../services/tariffApi';
import { DEFAULT_ABOUT_CONTENT } from '../../data/defaultSiteContent';
import { ImageUploadField } from './ImageUploadField';

export const AdminAboutContent = ({ showToast }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'founder', 'stats'
  const [aboutData, setAboutData] = useState(DEFAULT_ABOUT_CONTENT);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    setLoading(true);
    try {
      const data = await tariffApi.getContent('about');
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setAboutData({
          ...DEFAULT_ABOUT_CONTENT,
          ...data,
          hero: { ...DEFAULT_ABOUT_CONTENT.hero, ...(data.hero || {}) },
          founder: { ...DEFAULT_ABOUT_CONTENT.founder, ...(data.founder || {}) },
          stats: Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : DEFAULT_ABOUT_CONTENT.stats
        });
      } else {
        setAboutData(DEFAULT_ABOUT_CONTENT);
      }
    } catch (err) {
      console.warn('Failed to load about CMS from DB, using fallback defaults:', err);
      setAboutData(DEFAULT_ABOUT_CONTENT);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToPostgres = async (overrideData) => {
    const dataToSave = overrideData || aboutData;
    setSaving(true);
    try {
      await tariffApi.saveContent('about', dataToSave);
      if (showToast) showToast('✓ About Page content published successfully to PostgreSQL & Live Site!');
    } catch (err) {
      if (showToast) showToast('Error publishing about content: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm('Reset About Us page to factory default content? Any custom text or images will be overwritten.')) {
      return;
    }
    setAboutData(DEFAULT_ABOUT_CONTENT);
    await handleSaveToPostgres(DEFAULT_ABOUT_CONTENT);
    if (showToast) showToast('✓ About Us content reset to official defaults.');
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-slate-500)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏳</div>
        <p>Loading About Us CMS content from PostgreSQL database...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Controls Header */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '20px 24px',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.25rem' }}>📖</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: 0 }}>
              About Us Page CMS Editor
            </h2>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', margin: 0 }}>
            Live content manager for Page Hero, S.M. Patil Founder Story & Photo, Company Legacy, and Trust Stats.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleResetToDefault}
            disabled={saving}
            style={{
              padding: '9px 14px',
              borderRadius: '10px',
              background: '#F1F5F9',
              color: 'var(--color-slate-600)',
              border: '1px solid #CBD5E1',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RotateCcw size={14} />
            <span>Reset to Factory Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => handleSaveToPostgres()}
            disabled={saving}
            style={{
              padding: '9px 20px',
              borderRadius: '10px',
              background: '#0284C7',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: saving ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
            }}
          >
            <Save size={15} />
            <span>{saving ? 'Publishing Changes...' : 'Save & Publish About Page'}</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: '#FFFFFF', padding: '8px', borderRadius: '14px', border: '1px solid rgba(226, 232, 240, 0.9)', flexWrap: 'wrap' }}>
        {[
          { id: 'hero', label: '👑 Hero & Banner', icon: Crown },
          { id: 'founder', label: '👤 Founder S.M. Patil & Story', icon: Users },
          { id: 'stats', label: '📊 Trust Stats & Numbers', icon: Award }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === tab.id ? '#12151C' : 'transparent',
              color: activeTab === tab.id ? '#C5A059' : 'var(--color-slate-600)',
              fontSize: '0.86rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB 1: HERO & BANNER ────────────────────────────────────────── */}
      {activeTab === 'hero' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
              About Page Hero Section
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Main introduction banner displayed at the top of the /about page.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Badge Tagline
              </label>
              <input
                type="text"
                value={aboutData.hero?.badge || ''}
                onChange={(e) => setAboutData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, badge: e.target.value }
                }))}
                placeholder="25+ Years of Dedicated Service"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Main Title Prefix
              </label>
              <input
                type="text"
                value={aboutData.hero?.title || ''}
                onChange={(e) => setAboutData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, title: e.target.value }
                }))}
                placeholder="Pioneering Executive Mobility & Chauffeur"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Title Highlight (Gold Accent)
              </label>
              <input
                type="text"
                value={aboutData.hero?.titleHighlight || ''}
                onChange={(e) => setAboutData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, titleHighlight: e.target.value }
                }))}
                placeholder="Standards in Bengaluru"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700', color: '#C5A059' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
              Supporting Description
            </label>
            <textarea
              rows={3}
              value={aboutData.hero?.description || ''}
              onChange={(e) => setAboutData(prev => ({
                ...prev,
                hero: { ...prev.hero, description: e.target.value }
              }))}
              placeholder="Founded over two decades ago to bridge the gap between ordinary taxi rentals..."
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', lineHeight: '1.5' }}
            />
          </div>

          <div>
            <ImageUploadField
              label="Hero Background Banner Photo"
              value={aboutData.hero?.image || ''}
              onChange={(url) => setAboutData(prev => ({
                ...prev,
                hero: { ...prev.hero, image: url }
              }))}
              placeholder="/images/hero_luxury_sedan.jpg or click Upload Image"
              helpText="Upload a high-resolution hero photo for the About page banner."
            />
          </div>
        </div>
      )}

      {/* ── TAB 2: FOUNDER S.M. PATIL & STORY ───────────────────────────── */}
      {activeTab === 'founder' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
              Founder Profile & "The Man Behind The Wheel" Section
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Controls the editorial founder profile, S.M. Patil portrait photo, personal quote, and company origin story.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Founder Full Name
              </label>
              <input
                type="text"
                value={aboutData.founder?.founderName || ''}
                onChange={(e) => setAboutData(prev => ({
                  ...prev,
                  founder: { ...prev.founder, founderName: e.target.value }
                }))}
                placeholder="S.M. Patil"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Founder Title / Role
              </label>
              <input
                type="text"
                value={aboutData.founder?.founderRole || ''}
                onChange={(e) => setAboutData(prev => ({
                  ...prev,
                  founder: { ...prev.founder, founderRole: e.target.value }
                }))}
                placeholder="Founder & Managing Director"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Legacy Badge Text
              </label>
              <input
                type="text"
                value={aboutData.founder?.founderLegacy || ''}
                onChange={(e) => setAboutData(prev => ({
                  ...prev,
                  founder: { ...prev.founder, founderLegacy: e.target.value }
                }))}
                placeholder="25+ Yrs Legacy"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>
          </div>

          <div>
            <ImageUploadField
              label="Founder Portrait Photograph (S.M. Patil)"
              value={aboutData.founder?.founderImage || ''}
              onChange={(url) => setAboutData(prev => ({
                ...prev,
                founder: { ...prev.founder, founderImage: url }
              }))}
              placeholder="/images/sm_patil_founder.jpg or click Upload Image"
              helpText="Upload a professional photo of S.M. Patil from your device."
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
              Personal Founder Quote (Highlighted Callout)
            </label>
            <textarea
              rows={3}
              value={aboutData.founder?.quote || ''}
              onChange={(e) => setAboutData(prev => ({
                ...prev,
                founder: { ...prev.founder, quote: e.target.value }
              }))}
              placeholder="People don't remember the car. They remember how you made them feel..."
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontStyle: 'italic' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
              Story Paragraph 1 (Origins)
            </label>
            <textarea
              rows={3}
              value={aboutData.founder?.storyP1 || ''}
              onChange={(e) => setAboutData(prev => ({
                ...prev,
                founder: { ...prev.founder, storyP1: e.target.value }
              }))}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
              Story Paragraph 2 (Growth & Promise)
            </label>
            <textarea
              rows={3}
              value={aboutData.founder?.storyP2 || ''}
              onChange={(e) => setAboutData(prev => ({
                ...prev,
                founder: { ...prev.founder, storyP2: e.target.value }
              }))}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
              Story Paragraph 3 (Fleet Standards Today)
            </label>
            <textarea
              rows={3}
              value={aboutData.founder?.storyP3 || ''}
              onChange={(e) => setAboutData(prev => ({
                ...prev,
                founder: { ...prev.founder, storyP3: e.target.value }
              }))}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
          </div>
        </div>
      )}

      {/* ── TAB 3: STATS & NUMBERS ──────────────────────────────────────── */}
      {activeTab === 'stats' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
              Trust Badges & Impact Numbers
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Featured metrics displayed across the About page showcasing commercial fleet authority.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {(aboutData.stats || []).map((stat, idx) => (
              <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0284C7', textTransform: 'uppercase' }}>
                  Stat Metric #{idx + 1}
                </span>
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                      Metric Highlight
                    </label>
                    <input
                      type="text"
                      value={stat.label || ''}
                      onChange={(e) => {
                        const updated = [...(aboutData.stats || [])];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setAboutData(prev => ({ ...prev, stats: updated }));
                      }}
                      placeholder="e.g. 25+ Years or 50,000+"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: '800', fontSize: '0.95rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                      Description Text
                    </label>
                    <input
                      type="text"
                      value={stat.desc || ''}
                      onChange={(e) => {
                        const updated = [...(aboutData.stats || [])];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setAboutData(prev => ({ ...prev, stats: updated }));
                      }}
                      placeholder="e.g. Completed Trips"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
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
