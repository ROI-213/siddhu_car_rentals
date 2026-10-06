import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Award, 
  Building2, 
  Image as ImageIcon 
} from 'lucide-react';
import { tariffApi } from '../../services/tariffApi';
import { DEFAULT_LOCAL_CONTENT } from '../../data/defaultSiteContent';
import { ImageUploadField } from './ImageUploadField';

export const AdminLocalContent = ({ showToast }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('packages'); // 'packages', 'hero', 'scenarios'
  const [localData, setLocalData] = useState(DEFAULT_LOCAL_CONTENT);

  // Modal editing states
  const [editingPackage, setEditingPackage] = useState(null);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingScenario, setEditingScenario] = useState(null);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);

  useEffect(() => {
    loadLocalData();
  }, []);

  const loadLocalData = async () => {
    setLoading(true);
    try {
      const data = await tariffApi.getContent('local');
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setLocalData({
          ...DEFAULT_LOCAL_CONTENT,
          ...data,
          hero: { ...DEFAULT_LOCAL_CONTENT.hero, ...(data.hero || {}) },
          packagesHeader: { ...DEFAULT_LOCAL_CONTENT.packagesHeader, ...(data.packagesHeader || {}) },
          packages: Array.isArray(data.packages) && data.packages.length > 0 ? data.packages : DEFAULT_LOCAL_CONTENT.packages,
          scenariosHeader: { ...DEFAULT_LOCAL_CONTENT.scenariosHeader, ...(data.scenariosHeader || {}) },
          scenarios: Array.isArray(data.scenarios) && data.scenarios.length > 0 ? data.scenarios : DEFAULT_LOCAL_CONTENT.scenarios
        });
      } else {
        setLocalData(DEFAULT_LOCAL_CONTENT);
      }
    } catch (err) {
      console.warn('Failed to load local CMS content from DB:', err);
      setLocalData(DEFAULT_LOCAL_CONTENT);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToPostgres = async (overrideData) => {
    const dataToSave = overrideData || localData;
    setSaving(true);
    try {
      await tariffApi.saveContent('local', dataToSave);
      if (showToast) showToast('✓ Local Page content published successfully to PostgreSQL & Live Site!');
    } catch (err) {
      if (showToast) showToast('Error publishing local content: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm('Reset Local City Transfer page to factory default rate card content? Any custom text or rates will be reset to official frontend values (₹1,900 / ₹3,200 / ₹4,300).')) {
      return;
    }
    setLocalData(DEFAULT_LOCAL_CONTENT);
    await handleSaveToPostgres(DEFAULT_LOCAL_CONTENT);
    if (showToast) showToast('✓ Local Transfer content reset to official frontend defaults.');
  };

  // Package modal handlers
  const handleSavePackageModal = () => {
    if (!editingPackage.name) {
      alert('Package name is required');
      return;
    }
    const currentList = localData.packages || [];
    const exists = currentList.find(p => p.id === editingPackage.id);
    let updatedList;
    if (exists) {
      updatedList = currentList.map(p => p.id === editingPackage.id ? editingPackage : p);
    } else {
      updatedList = [...currentList, { ...editingPackage, id: editingPackage.id || 'pkg-' + Date.now() }];
    }
    const updatedData = { ...localData, packages: updatedList };
    setLocalData(updatedData);
    setIsPackageModalOpen(false);
    setEditingPackage(null);
    handleSaveToPostgres(updatedData);
  };

  const handleDeletePackage = (id) => {
    if (!window.confirm('Are you sure you want to remove this hourly package?')) return;
    const updatedList = (localData.packages || []).filter(p => p.id !== id);
    const updatedData = { ...localData, packages: updatedList };
    setLocalData(updatedData);
    handleSaveToPostgres(updatedData);
  };

  // Scenario modal handlers
  const handleSaveScenarioModal = () => {
    if (!editingScenario.title) {
      alert('Scenario title is required');
      return;
    }
    const currentList = localData.scenarios || [];
    const exists = currentList.find(s => s.id === editingScenario.id);
    let updatedList;
    if (exists) {
      updatedList = currentList.map(s => s.id === editingScenario.id ? editingScenario : s);
    } else {
      updatedList = [...currentList, { ...editingScenario, id: editingScenario.id || 'scn-' + Date.now() }];
    }
    const updatedData = { ...localData, scenarios: updatedList };
    setLocalData(updatedData);
    setIsScenarioModalOpen(false);
    setEditingScenario(null);
    handleSaveToPostgres(updatedData);
  };

  const handleDeleteScenario = (id) => {
    if (!window.confirm('Are you sure you want to remove this service scenario?')) return;
    const updatedList = (localData.scenarios || []).filter(s => s.id !== id);
    const updatedData = { ...localData, scenarios: updatedList };
    setLocalData(updatedData);
    handleSaveToPostgres(updatedData);
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-slate-500)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏳</div>
        <p>Loading Local Transfer CMS content from PostgreSQL database...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Header */}
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
            <span style={{ fontSize: '1.25rem' }}>📍</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: 0 }}>
              Local City Transfer Page CMS Editor
            </h2>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', margin: 0 }}>
            Manage the hero banner, hourly rental package cards (4h: ₹1,900, 8h: ₹3,200, 12h: ₹4,300), extra rates, and city mobility scenarios for the /local page.
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
            <span>Reset to Official Defaults</span>
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
            <span>{saving ? 'Publishing Changes...' : 'Save & Publish Local Page'}</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: '#FFFFFF', padding: '8px', borderRadius: '14px', border: '1px solid rgba(226, 232, 240, 0.9)', flexWrap: 'wrap' }}>
        {[
          { id: 'packages', label: '⏱️ Hourly Packages (4h/8h/12h)', icon: Award },
          { id: 'hero', label: '👑 Hero & Banner', icon: Clock },
          { id: 'scenarios', label: '🏢 City Mobility Scenarios', icon: Building2 }
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

      {/* ── TAB 1: HOURLY PACKAGES ───────────────────────────────────────── */}
      {activeTab === 'packages' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
                Hourly Rental Package Cards
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Configurable hourly packages (Half day, Full day, Extended day) matching frontend rates (₹1,900 / ₹3,200 / ₹4,300).
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingPackage({
                  id: 'pkg-' + Date.now(),
                  badge: 'Custom Package',
                  name: '6 Hours / 60 Kms',
                  desc: 'Flexible package for city appointments and shopping.',
                  vehicleName: 'Innova Crysta VIP Rate',
                  basePrice: '₹2,600',
                  extraHourRate: '₹275/hr',
                  extraKmRate: '₹23/km'
                });
                setIsPackageModalOpen(true);
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#12151C',
                color: '#C5A059',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={14} />
              <span>Add New Package Card</span>
            </button>
          </div>

          {/* Section Header Controls */}
          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                Section Badge
              </label>
              <input
                type="text"
                value={localData.packagesHeader?.badge || ''}
                onChange={(e) => setLocalData(prev => ({
                  ...prev,
                  packagesHeader: { ...prev.packagesHeader, badge: e.target.value }
                }))}
                style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                Section Title
              </label>
              <input
                type="text"
                value={localData.packagesHeader?.title || ''}
                onChange={(e) => setLocalData(prev => ({
                  ...prev,
                  packagesHeader: { ...prev.packagesHeader, title: e.target.value }
                }))}
                style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                Section Title Highlight
              </label>
              <input
                type="text"
                value={localData.packagesHeader?.titleHighlight || ''}
                onChange={(e) => setLocalData(prev => ({
                  ...prev,
                  packagesHeader: { ...prev.packagesHeader, titleHighlight: e.target.value }
                }))}
                style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem', color: '#C5A059', fontWeight: '700' }}
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {(localData.packages || []).map((pkg, idx) => (
              <div 
                key={pkg.id || idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #CBD5E1',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: '800', background: 'rgba(197, 160, 89, 0.15)', color: '#92400E', padding: '3px 8px', borderRadius: '4px' }}>
                      {pkg.badge || 'Package'}
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPackage({ ...pkg });
                          setIsPackageModalOpen(true);
                        }}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePackage(pkg.id)}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#DC2626', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>
                    {pkg.name}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 14px 0', lineHeight: '1.4' }}>
                    {pkg.desc}
                  </p>

                  <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>
                      {pkg.vehicleName || 'Innova Crysta VIP Rate'}
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', margin: '2px 0' }}>
                      {pkg.basePrice}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#C5A059', fontWeight: '700' }}>
                      Extra: {pkg.extraHourRate} • {pkg.extraKmRate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: HERO & BANNER ────────────────────────────────────────── */}
      {activeTab === 'hero' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
              Local City Transfer Hero Banner
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Top banner displayed when visitors click "Local" on the navigation bar.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Badge Tagline
              </label>
              <input
                type="text"
                value={localData.hero?.badge || ''}
                onChange={(e) => setLocalData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, badge: e.target.value }
                }))}
                placeholder="Hourly Car Rental with Driver"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Title Prefix
              </label>
              <input
                type="text"
                value={localData.hero?.title || ''}
                onChange={(e) => setLocalData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, title: e.target.value }
                }))}
                placeholder="Local City Transfers & Hourly"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Title Highlight (Gold Accent)
              </label>
              <input
                type="text"
                value={localData.hero?.titleHighlight || ''}
                onChange={(e) => setLocalData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, titleHighlight: e.target.value }
                }))}
                placeholder="Rental Packages"
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
              value={localData.hero?.description || ''}
              onChange={(e) => setLocalData(prev => ({
                ...prev,
                hero: { ...prev.hero, description: e.target.value }
              }))}
              placeholder="Chauffeur-driven cars for business meetings, IT park visits, shopping, airport transfers, and events across Bengaluru. Fixed packages, no surge pricing."
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', lineHeight: '1.5' }}
            />
          </div>

          <div>
            <ImageUploadField
              label="Hero Background Banner Photo"
              value={localData.hero?.image || ''}
              onChange={(url) => setLocalData(prev => ({
                ...prev,
                hero: { ...prev.hero, image: url }
              }))}
              placeholder="/images/services_local_vellfire.jpg or click Upload Image"
              helpText="Upload a high-resolution hero photo for the Local Transfer banner."
            />
          </div>
        </div>
      )}

      {/* ── TAB 3: MOBILITY SCENARIOS ───────────────────────────────────── */}
      {activeTab === 'scenarios' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
                Local City Mobility Scenarios
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Showcase scenarios such as Tech Park Corporate travel, Point-to-Point hotel drops, and Shopping trips.
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingScenario({
                  id: 'scn-' + Date.now(),
                  icon: '✨',
                  title: 'Special VIP Mobility',
                  desc: 'Luxury concierge travel tailored for delegates and family events.'
                });
                setIsScenarioModalOpen(true);
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#12151C',
                color: '#C5A059',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={14} />
              <span>Add New Scenario</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {(localData.scenarios || []).map((scn, idx) => (
              <div
                key={scn.id || idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #CBD5E1',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{scn.icon || '🏢'}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingScenario({ ...scn });
                          setIsScenarioModalOpen(true);
                        }}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteScenario(scn.id)}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#DC2626', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>
                    {scn.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0, lineHeight: '1.5' }}>
                    {scn.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL: EDIT PACKAGE ────────────────────────────────────────── */}
      {isPackageModalOpen && editingPackage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '520px',
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#FFFFFF', zIndex: 10 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                {editingPackage.id ? 'Edit Hourly Package' : 'Add Hourly Package'}
              </h3>
              <button 
                type="button" 
                onClick={() => setIsPackageModalOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                  Badge Label (e.g. Half Day, Most Popular)
                </label>
                <input
                  type="text"
                  value={editingPackage.badge || ''}
                  onChange={(e) => setEditingPackage(prev => ({ ...prev, badge: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                  Package Duration & Kilometers (e.g. 8 Hours / 80 Kms)
                </label>
                <input
                  type="text"
                  value={editingPackage.name || ''}
                  onChange={(e) => setEditingPackage(prev => ({ ...prev, name: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingPackage.desc || ''}
                  onChange={(e) => setEditingPackage(prev => ({ ...prev, desc: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                    Vehicle Tag / Model
                  </label>
                  <input
                    type="text"
                    value={editingPackage.vehicleName || ''}
                    onChange={(e) => setEditingPackage(prev => ({ ...prev, vehicleName: e.target.value }))}
                    placeholder="Innova Crysta VIP Rate"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                    Base Package Price (e.g. ₹1,900 / ₹3,200)
                  </label>
                  <input
                    type="text"
                    value={editingPackage.basePrice || ''}
                    onChange={(e) => setEditingPackage(prev => ({ ...prev, basePrice: e.target.value }))}
                    placeholder="₹3,200"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                    Extra Hour Rate
                  </label>
                  <input
                    type="text"
                    value={editingPackage.extraHourRate || ''}
                    onChange={(e) => setEditingPackage(prev => ({ ...prev, extraHourRate: e.target.value }))}
                    placeholder="₹275/hr"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                    Extra Km Rate
                  </label>
                  <input
                    type="text"
                    value={editingPackage.extraKmRate || ''}
                    onChange={(e) => setEditingPackage(prev => ({ ...prev, extraKmRate: e.target.value }))}
                    placeholder="₹23/km"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '10px', position: 'sticky', bottom: 0, background: '#FFFFFF', zIndex: 10 }}>
              <button
                type="button"
                onClick={() => setIsPackageModalOpen(false)}
                style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', fontWeight: '600' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePackageModal}
                style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFFFFF', cursor: 'pointer', fontWeight: '700' }}
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: EDIT SCENARIO ───────────────────────────────────────── */}
      {isScenarioModalOpen && editingScenario && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ padding: '20px 24px', borderTop: 'none', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#FFFFFF', zIndex: 10 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                {editingScenario.id ? 'Edit City Mobility Scenario' : 'Add City Mobility Scenario'}
              </h3>
              <button 
                type="button" 
                onClick={() => setIsScenarioModalOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                    Icon Emoji
                  </label>
                  <input
                    type="text"
                    value={editingScenario.icon || ''}
                    onChange={(e) => setEditingScenario(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="🏢"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1.2rem', textAlign: 'center' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                    Scenario Title
                  </label>
                  <input
                    type="text"
                    value={editingScenario.title || ''}
                    onChange={(e) => setEditingScenario(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Tech Park & Corporate Travel"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                  Scenario Description
                </label>
                <textarea
                  rows={3}
                  value={editingScenario.desc || ''}
                  onChange={(e) => setEditingScenario(prev => ({ ...prev, desc: e.target.value }))}
                  placeholder="Punctual chauffeurs for Manyata Tech Park, Bagmane Tech Park, Prestige Tech Park, and Electronic City meetings."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', lineHeight: '1.5' }}
                />
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '10px', position: 'sticky', bottom: 0, background: '#FFFFFF', zIndex: 10 }}>
              <button
                type="button"
                onClick={() => setIsScenarioModalOpen(false)}
                style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', fontWeight: '600' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveScenarioModal}
                style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFFFFF', cursor: 'pointer', fontWeight: '700' }}
              >
                Save Scenario
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
