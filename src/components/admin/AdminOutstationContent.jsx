import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Navigation, 
  Clock, 
  Car, 
  Compass, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { tariffApi } from '../../services/tariffApi';
import { DEFAULT_OUTSTATION_CONTENT } from '../../data/defaultSiteContent';

export const AdminOutstationContent = ({ showToast }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('destinations'); // 'destinations', 'options', 'terms'
  const [outstationData, setOutstationData] = useState(DEFAULT_OUTSTATION_CONTENT);

  // Modals / sub-state
  const [editingDest, setEditingDest] = useState(null);
  const [isDestModalOpen, setIsDestModalOpen] = useState(false);

  useEffect(() => {
    loadOutstationData();
  }, []);

  const loadOutstationData = async () => {
    setLoading(true);
    try {
      const data = await tariffApi.getContent('outstation');
      if (data && typeof data === 'object') {
        setOutstationData({
          hero: { ...DEFAULT_OUTSTATION_CONTENT.hero, ...(data.hero || {}) },
          destinations: Array.isArray(data.destinations) ? data.destinations : DEFAULT_OUTSTATION_CONTENT.destinations,
          options: Array.isArray(data.options) ? data.options : DEFAULT_OUTSTATION_CONTENT.options,
          terms: { ...DEFAULT_OUTSTATION_CONTENT.terms, ...(data.terms || {}) }
        });
      } else {
        setOutstationData(DEFAULT_OUTSTATION_CONTENT);
      }
    } catch (err) {
      console.warn('Error loading outstation content:', err);
      showToast('Loaded local outstation baseline: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToPostgres = async (overrideData = null) => {
    const toSave = overrideData || outstationData;
    setSaving(true);
    try {
      const saved = await tariffApi.saveContent('outstation', toSave);
      showToast('✓ Outstation Travel CMS saved to PostgreSQL successfully!');
      window.dispatchEvent(new Event('scr_site_content_updated'));
      setOutstationData(saved);
    } catch (err) {
      showToast('Error saving to database: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset Outstation Travel content to official factory defaults?')) return;
    setOutstationData(DEFAULT_OUTSTATION_CONTENT);
    await handleSaveToPostgres(DEFAULT_OUTSTATION_CONTENT);
  };

  // --- Destination Handlers ---
  const handleOpenAddDest = () => {
    setEditingDest({
      id: 'dest-' + Date.now(),
      name: '',
      distance: '200 Kms',
      time: '4.0 Hours',
      rate: 'From ₹15/km',
      image: '/images/destinations/mysuru.jpg',
      alt: 'Scenic Outstation Route',
      highlight: 'Scenic Sightseeing & Sight Getaway'
    });
    setIsDestModalOpen(true);
  };

  const handleOpenEditDest = (dest) => {
    setEditingDest({ ...dest });
    setIsDestModalOpen(true);
  };

  const handleSaveDest = (e) => {
    e.preventDefault();
    if (!editingDest.name.trim()) {
      alert('Destination name is required.');
      return;
    }
    const exists = outstationData.destinations.some(d => d.id === editingDest.id);
    let updated;
    if (exists) {
      updated = outstationData.destinations.map(d => d.id === editingDest.id ? editingDest : d);
    } else {
      updated = [...outstationData.destinations, editingDest];
    }
    setOutstationData(prev => ({ ...prev, destinations: updated }));
    setIsDestModalOpen(false);
    setEditingDest(null);
  };

  const handleDeleteDest = (id) => {
    if (!window.confirm('Delete this outstation destination?')) return;
    setOutstationData(prev => ({ ...prev, destinations: prev.destinations.filter(d => d.id !== id) }));
  };

  // --- Travel Options Handlers ---
  const handleOptionChange = (idx, field, value) => {
    const updated = [...outstationData.options];
    updated[idx] = { ...updated[idx], [field]: value };
    setOutstationData(prev => ({ ...prev, options: updated }));
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-slate-500)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏳</div>
        <p>Loading Outstation CMS from PostgreSQL...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Header Card & Save Action */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.3rem' }}>🛣️</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              Outstation Travel Page CMS
            </h2>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: '800',
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#059669',
              textTransform: 'uppercase'
            }}>
              Live PostgreSQL
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '4px 0 0 0' }}>
            Manage highway corridor destinations, travel modes marquee, and general outstation booking guidelines.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: '#FFFFFF',
              color: '#DC2626',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={15} />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => handleSaveToPostgres()}
            disabled={saving}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #12151C 0%, #1E232E 100%)',
              color: '#C5A059',
              fontSize: '0.88rem',
              fontWeight: '700',
              cursor: saving ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
            }}
          >
            <Save size={16} />
            <span>{saving ? 'Saving to Database...' : 'Save Outstation to PostgreSQL'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: '#FFFFFF',
        padding: '8px',
        borderRadius: '14px',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        overflowX: 'auto'
      }}>
        {[
          { id: 'destinations', label: '🏔️ Popular Highway Destinations', count: outstationData.destinations.length },
          { id: 'options', label: '🛣️ Travel Options Marquee', count: outstationData.options.length },
          { id: 'terms', label: '📜 General Outstation Guidelines', count: null }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === tab.id ? '#12151C' : 'transparent',
              color: activeTab === tab.id ? '#C5A059' : '#64748B',
              fontSize: '0.86rem',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span style={{
                fontSize: '0.7rem',
                padding: '2px 7px',
                borderRadius: '999px',
                background: activeTab === tab.id ? 'rgba(197,160,89,0.25)' : 'rgba(0,0,0,0.06)',
                color: activeTab === tab.id ? '#C5A059' : '#64748B'
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── TAB 1: POPULAR HIGHWAY DESTINATIONS ───────────────────────────── */}
      {activeTab === 'destinations' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                Popular Outstation Destinations ({outstationData.destinations.length})
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0 0' }}>
                Featured destination cards rendered on the Outstation page with photo, driving distance, duration, and quote action.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddDest}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                borderRadius: '10px',
                border: 'none',
                background: '#C5A059',
                color: '#0F172A',
                fontSize: '0.84rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <Plus size={15} />
              <span>Add Destination</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {outstationData.destinations.map((dest, idx) => (
              <div key={dest.id || idx} style={{
                background: '#F8FAFC',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ height: '150px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/images/destinations/mysuru.jpg'; }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#FFFFFF',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: '700'
                  }}>
                    {dest.distance}
                  </span>
                </div>

                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-gold-primary)', marginBottom: '4px' }}>
                    Approx {dest.time} Drive
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>
                    {dest.name}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.5', margin: '0 0 12px 0', flex: 1 }}>
                    {dest.highlight}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
                    <div>
                      <span style={{ fontSize: '0.66rem', color: '#94A3B8', textTransform: 'uppercase' }}>Starting</span>
                      <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>{dest.rate}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEditDest(dest)}
                        style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', color: '#0284C7', cursor: 'pointer' }}
                        title="Edit Destination"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDest(dest.id)}
                        style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', color: '#EF4444', cursor: 'pointer' }}
                        title="Delete Destination"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: TRAVEL OPTIONS MARQUEE ─────────────────────────────────── */}
      {activeTab === 'options' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          {outstationData.options.map((opt, oIdx) => (
            <div key={opt.id || oIdx} style={{ background: '#FFFFFF', borderRadius: '14px', padding: '20px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ width: '50px' }}>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#64748B', marginBottom: '4px' }}>
                    Icon
                  </label>
                  <input
                    type="text"
                    value={opt.icon}
                    onChange={(e) => handleOptionChange(oIdx, 'icon', e.target.value)}
                    style={{ width: '100%', padding: '8px', textAlign: 'center', fontSize: '1.2rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#64748B', marginBottom: '4px' }}>
                    Mode Title #{oIdx + 1}
                  </label>
                  <input
                    type="text"
                    value={opt.title}
                    onChange={(e) => handleOptionChange(oIdx, 'title', e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#64748B', marginBottom: '4px' }}>
                  Description & Itinerary Highlights
                </label>
                <textarea
                  rows={3}
                  value={opt.desc}
                  onChange={(e) => handleOptionChange(oIdx, 'desc', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem', lineHeight: '1.5' }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 3: GENERAL TERMS & GUIDELINES ─────────────────────────────── */}
      {activeTab === 'terms' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
            Highway Travel Terms & Minimum Mileage Policy
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Standard Vehicle Daily Minimum (Sedans, SUVs, MPVs, Urbania)
              </label>
              <input
                type="text"
                value={outstationData.terms.minKmStandard}
                onChange={(e) => setOutstationData(prev => ({ ...prev, terms: { ...prev.terms, minKmStandard: e.target.value } }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Luxury Coach Daily Minimum (45 / 49 Seater Buses)
              </label>
              <input
                type="text"
                value={outstationData.terms.minKmBuses}
                onChange={(e) => setOutstationData(prev => ({ ...prev, terms: { ...prev.terms, minKmBuses: e.target.value } }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Garage-to-Garage Billing & Interstate Permit Note
              </label>
              <textarea
                rows={3}
                value={outstationData.terms.billingNotes}
                onChange={(e) => setOutstationData(prev => ({ ...prev, terms: { ...prev.terms, billingNotes: e.target.value } }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ADD / EDIT DESTINATION ─────────────────────────────────── */}
      {isDestModalOpen && editingDest && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '540px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
              {editingDest.name ? `Edit ${editingDest.name}` : 'Add Outstation Destination'}
            </h3>

            <form onSubmit={handleSaveDest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Destination Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mysuru (Mysore)"
                  value={editingDest.name}
                  onChange={(e) => setEditingDest(prev => ({ ...prev, name: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Distance
                  </label>
                  <input
                    type="text"
                    value={editingDest.distance}
                    onChange={(e) => setEditingDest(prev => ({ ...prev, distance: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    placeholder="140 Kms"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Travel Duration
                  </label>
                  <input
                    type="text"
                    value={editingDest.time}
                    onChange={(e) => setEditingDest(prev => ({ ...prev, time: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    placeholder="3.0 Hours"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Starting Rate
                  </label>
                  <input
                    type="text"
                    value={editingDest.rate}
                    onChange={(e) => setEditingDest(prev => ({ ...prev, rate: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    placeholder="From ₹15/km"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingDest.image}
                    onChange={(e) => setEditingDest(prev => ({ ...prev, image: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    placeholder="/images/destinations/mysuru.jpg"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Highlight Description
                </label>
                <input
                  type="text"
                  value={editingDest.highlight}
                  onChange={(e) => setEditingDest(prev => ({ ...prev, highlight: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  placeholder="Royal Palaces & Chamundi Hills"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsDestModalOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#64748B', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', background: '#C5A059', color: '#0F172A', fontWeight: '800', cursor: 'pointer' }}
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
