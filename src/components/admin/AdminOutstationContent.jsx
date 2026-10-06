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
  Sparkles,
  Award,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { tariffApi, formatCurrency } from '../../services/tariffApi';
import { DEFAULT_OUTSTATION_CONTENT } from '../../data/defaultSiteContent';
import { ImageUploadField } from './ImageUploadField';

export const AdminOutstationContent = ({ showToast }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('destinations'); // 'destinations', 'tariff_breakdown', 'options', 'terms'
  const [outstationData, setOutstationData] = useState(DEFAULT_OUTSTATION_CONTENT);

  // Tariffs state
  const [outstationTariffs, setOutstationTariffs] = useState([]);
  const [editingTariff, setEditingTariff] = useState(null);
  const [isTariffModalOpen, setIsTariffModalOpen] = useState(false);
  const [tariffSaving, setTariffSaving] = useState(false);

  // Destinations modal state
  const [editingDest, setEditingDest] = useState(null);
  const [isDestModalOpen, setIsDestModalOpen] = useState(false);

  useEffect(() => {
    loadOutstationData();
    loadTariffs();

    const handleTariffsUpdated = () => {
      loadTariffs();
    };
    window.addEventListener('scr_tariffs_updated', handleTariffsUpdated);
    window.addEventListener('storage', handleTariffsUpdated);
    return () => {
      window.removeEventListener('scr_tariffs_updated', handleTariffsUpdated);
      window.removeEventListener('storage', handleTariffsUpdated);
    };
  }, []);

  const loadTariffs = async () => {
    try {
      const list = await tariffApi.getTariffs({ usage_type: 'outstation', all: true });
      if (Array.isArray(list) && list.length > 0) {
        setOutstationTariffs(list);
      } else {
        setOutstationTariffs(tariffApi.getLocalTariffs({ usage_type: 'outstation', all: true }));
      }
    } catch (err) {
      console.warn('Error loading outstation tariffs:', err);
      setOutstationTariffs(tariffApi.getLocalTariffs({ usage_type: 'outstation', all: true }));
    }
  };

  const loadOutstationData = async () => {
    setLoading(true);
    try {
      const data = await tariffApi.getContent('outstation');
      if (data && typeof data === 'object') {
        setOutstationData({
          hero: { ...DEFAULT_OUTSTATION_CONTENT.hero, ...(data.hero || {}) },
          destinations: Array.isArray(data.destinations) ? data.destinations : DEFAULT_OUTSTATION_CONTENT.destinations,
          options: Array.isArray(data.options) ? data.options : DEFAULT_OUTSTATION_CONTENT.options,
          terms: { ...DEFAULT_OUTSTATION_CONTENT.terms, ...(data.terms || {}) },
          tariffHeader: { ...DEFAULT_OUTSTATION_CONTENT.tariffHeader, ...(data.tariffHeader || {}) }
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

  // --- Tariff Handlers ---
  const handleOpenAddTariff = () => {
    setEditingTariff({
      vehicle_variant: '',
      minimum_km_per_day: 300,
      rate_per_km: 20,
      outstation_extra_km: 20,
      driver_allowance: 500,
      display_order: outstationTariffs.length + 1,
      is_active: true,
      service_type: 'Garage to Garage',
      location: 'BANGALORE',
      usage_type: 'outstation'
    });
    setIsTariffModalOpen(true);
  };

  const handleOpenEditTariff = (tariff) => {
    setEditingTariff({ ...tariff });
    setIsTariffModalOpen(true);
  };

  const handleSaveTariff = async (e) => {
    e.preventDefault();
    if (!editingTariff.vehicle_variant?.trim()) {
      alert('Vehicle model & class name is required.');
      return;
    }
    setTariffSaving(true);
    try {
      const payload = {
        ...editingTariff,
        vehicle_variant: editingTariff.vehicle_variant.trim(),
        minimum_km_per_day: Number(editingTariff.minimum_km_per_day) || 300,
        rate_per_km: Number(editingTariff.rate_per_km) || 0,
        outstation_extra_km: Number(editingTariff.outstation_extra_km) || Number(editingTariff.rate_per_km) || 0,
        driver_allowance: Number(editingTariff.driver_allowance) || 0,
        display_order: Number(editingTariff.display_order) || 1,
        is_active: editingTariff.is_active !== false,
        usage_type: 'outstation',
        location: editingTariff.location || 'BANGALORE',
        service_type: editingTariff.service_type || 'Garage to Garage'
      };

      if (editingTariff.id) {
        await tariffApi.updateTariff(editingTariff.id, payload);
        showToast(`✓ Updated tariff for ${payload.vehicle_variant}`);
      } else {
        await tariffApi.createTariff(payload);
        showToast(`✓ Added new outstation vehicle: ${payload.vehicle_variant}`);
      }
      setIsTariffModalOpen(false);
      setEditingTariff(null);
      await loadTariffs();
    } catch (err) {
      showToast('Error saving tariff: ' + err.message, 'error');
    } finally {
      setTariffSaving(false);
    }
  };

  const handleDeleteTariff = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name || 'this vehicle'}" from Outstation Tariffs?`)) return;
    try {
      await tariffApi.deleteTariff(id);
      showToast(`✓ Deleted outstation vehicle tariff`);
      await loadTariffs();
    } catch (err) {
      showToast('Error deleting tariff: ' + err.message, 'error');
    }
  };

  const handleToggleTariffActive = async (tariff) => {
    try {
      const updated = { ...tariff, is_active: !tariff.is_active };
      await tariffApi.updateTariff(tariff.id, updated);
      showToast(`✓ Vehicle "${tariff.vehicle_variant}" is now ${updated.is_active ? 'Active' : 'Hidden'}`);
      await loadTariffs();
    } catch (err) {
      showToast('Error toggling status: ' + err.message, 'error');
    }
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
          { id: 'tariff_breakdown', label: '🚘 Outstation Fleet Tariff Breakdown', count: outstationTariffs.length },
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

      {/* ── TAB 2: OUTSTATION FLEET PER-KM TARIFF BREAKDOWN ────────────────── */}
      {activeTab === 'tariff_breakdown' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Section A: Header & Billing Note Editor */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="#C5A059" />
                  <span>Section Header & Mileage Policy Banner</span>
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '3px 0 0 0' }}>
                  Controls the title, badge, and billing rules note displayed right above the Outstation tariff breakdown table.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleSaveToPostgres()}
                disabled={saving}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#12151C',
                  color: '#C5A059',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: saving ? 'wait' : 'pointer'
                }}
              >
                <Save size={14} />
                <span>Save Header Changes</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                  Section Badge Label
                </label>
                <input
                  type="text"
                  value={outstationData.tariffHeader?.badge || ''}
                  onChange={(e) => setOutstationData(prev => ({
                    ...prev,
                    tariffHeader: { ...(prev.tariffHeader || DEFAULT_OUTSTATION_CONTENT.tariffHeader), badge: e.target.value }
                  }))}
                  placeholder="Per-Km Tariff Guide"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                  Section Main Title
                </label>
                <input
                  type="text"
                  value={outstationData.tariffHeader?.title || ''}
                  onChange={(e) => setOutstationData(prev => ({
                    ...prev,
                    tariffHeader: { ...(prev.tariffHeader || DEFAULT_OUTSTATION_CONTENT.tariffHeader), title: e.target.value }
                  }))}
                  placeholder="Outstation Fleet Per-Km Tariff"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                  Title Highlight Text (Gold Accent)
                </label>
                <input
                  type="text"
                  value={outstationData.tariffHeader?.titleHighlight || ''}
                  onChange={(e) => setOutstationData(prev => ({
                    ...prev,
                    tariffHeader: { ...(prev.tariffHeader || DEFAULT_OUTSTATION_CONTENT.tariffHeader), titleHighlight: e.target.value }
                  }))}
                  placeholder="Breakdown"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700', color: '#C5A059' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                  Billing Rule & Minimum Km Paragraph
                </label>
                <textarea
                  rows={2}
                  value={outstationData.tariffHeader?.description || ''}
                  onChange={(e) => setOutstationData(prev => ({
                    ...prev,
                    tariffHeader: { ...(prev.tariffHeader || DEFAULT_OUTSTATION_CONTENT.tariffHeader), description: e.target.value }
                  }))}
                  placeholder="Daily minimum 300 Kms applies (400 Kms for 45/49 seater luxury buses). Garage to garage billing with zero hidden charges."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.84rem', lineHeight: '1.5' }}
                />
              </div>
            </div>
          </div>

          {/* Section B: Vehicle Rates Breakdown Matrix */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Outstation Fleet Vehicles ({outstationTariffs.length})
                  </h3>
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', padding: '2px 8px', borderRadius: '999px', background: 'rgba(197,160,89,0.15)', color: '#C5A059' }}>
                    {outstationTariffs.filter(t => t.is_active !== false).length} Active Live
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0 0' }}>
                  Edit per-km rates, daily minimum kilometers, extra km pricing, and driver night batta. Reflects immediately on /outstation and booking calculators.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddTariff}
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
                <span>Add Outstation Vehicle</span>
              </button>
            </div>

            {/* Matrix Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ background: '#12151C', color: '#C5A059', borderBottom: '1px solid #1E232E' }}>
                    <th style={{ padding: '12px 16px', fontWeight: '700' }}>Vehicle Model & Class</th>
                    <th style={{ padding: '12px 16px', fontWeight: '700' }}>Min. Kms / Day</th>
                    <th style={{ padding: '12px 16px', fontWeight: '700' }}>Per Km Rate</th>
                    <th style={{ padding: '12px 16px', fontWeight: '700' }}>Extra Km Rate</th>
                    <th style={{ padding: '12px 16px', fontWeight: '700' }}>Driver Night Allowance</th>
                    <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Status</th>
                    <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {outstationTariffs.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '36px', textAlign: 'center', color: '#64748B' }}>
                        No outstation tariffs found. Click "Add Outstation Vehicle" to add your first fleet tariff.
                      </td>
                    </tr>
                  ) : (
                    outstationTariffs.map((t, idx) => (
                      <tr 
                        key={t.id || idx}
                        style={{
                          borderBottom: '1px solid #E2E8F0',
                          background: t.is_active === false ? '#F8FAFC' : (idx % 2 === 1 ? 'rgba(197, 160, 89, 0.03)' : '#FFFFFF'),
                          opacity: t.is_active === false ? 0.65 : 1
                        }}
                      >
                        <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0F172A' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Car size={16} color="#64748B" />
                            <span>{t.vehicle_variant}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#334155' }}>
                          {t.minimum_km_per_day ? `${t.minimum_km_per_day} km/day` : '300 km/day'}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: '700', color: '#C5A059' }}>
                          {formatCurrency(t.rate_per_km, ' / km')}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#475569' }}>
                          {formatCurrency(t.outstation_extra_km || t.rate_per_km, ' / km')}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#334155' }}>
                          {formatCurrency(t.driver_allowance, ' / day')}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleTariffActive(t)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              border: 'none',
                              fontSize: '0.72rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              background: t.is_active !== false ? 'rgba(16, 185, 129, 0.12)' : 'rgba(100, 116, 139, 0.12)',
                              color: t.is_active !== false ? '#059669' : '#64748B'
                            }}
                            title="Click to toggle visibility"
                          >
                            {t.is_active !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                            <span>{t.is_active !== false ? 'Active' : 'Hidden'}</span>
                          </button>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEditTariff(t)}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #CBD5E1',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                color: '#0284C7',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.76rem',
                                fontWeight: '700'
                              }}
                              title="Edit Tariff"
                            >
                              <Edit3 size={13} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTariff(t.id, t.vehicle_variant)}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #CBD5E1',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                color: '#EF4444',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.76rem',
                                fontWeight: '700'
                              }}
                              title="Delete Tariff"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
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
              </div>

              <div>
                <ImageUploadField
                  label="Destination Scenic Image"
                  value={editingDest.image || ''}
                  onChange={(url) => setEditingDest(prev => ({ ...prev, image: url }))}
                  placeholder="/images/destinations/mysuru.jpg or https://..."
                  helpText="Upload a high-quality destination photo from your computer or phone."
                />
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

      {/* ── MODAL: ADD / EDIT OUTSTATION TARIFF ───────────────────────────── */}
      {isTariffModalOpen && editingTariff && (
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
            maxWidth: '520px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <Car size={20} color="#C5A059" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                {editingTariff.id ? `Edit ${editingTariff.vehicle_variant}` : 'Add Outstation Vehicle Tariff'}
              </h3>
            </div>

            <form onSubmit={handleSaveTariff} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Vehicle Model & Class *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Innova Crysta / Innova Hycross"
                  value={editingTariff.vehicle_variant || ''}
                  onChange={(e) => setEditingTariff(prev => ({ ...prev, vehicle_variant: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Min. Kms Per Day
                  </label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={editingTariff.minimum_km_per_day || 300}
                    onChange={(e) => setEditingTariff(prev => ({ ...prev, minimum_km_per_day: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
                  />
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Usually 300 (or 400 for large buses)</span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Per Km Rate (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={editingTariff.rate_per_km || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingTariff(prev => ({ 
                        ...prev, 
                        rate_per_km: val,
                        outstation_extra_km: prev.outstation_extra_km === prev.rate_per_km || !prev.outstation_extra_km ? val : prev.outstation_extra_km 
                      }));
                    }}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700', color: '#059669' }}
                  />
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>e.g. 23 (for ₹23 / km)</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Extra Km Rate (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={editingTariff.outstation_extra_km || editingTariff.rate_per_km || ''}
                    onChange={(e) => setEditingTariff(prev => ({ ...prev, outstation_extra_km: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Driver Night Allowance (₹ / day)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={editingTariff.driver_allowance || ''}
                    onChange={(e) => setEditingTariff(prev => ({ ...prev, driver_allowance: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>e.g. ₹400 or ₹500</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
                <input
                  type="checkbox"
                  id="tariff_is_active"
                  checked={editingTariff.is_active !== false}
                  onChange={(e) => setEditingTariff(prev => ({ ...prev, is_active: e.target.checked }))}
                  style={{ width: '18px', height: '18px', accentColor: '#C5A059', cursor: 'pointer' }}
                />
                <label htmlFor="tariff_is_active" style={{ fontSize: '0.84rem', fontWeight: '700', color: '#1E293B', cursor: 'pointer' }}>
                  Active on Public Website (/outstation & /tariff)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsTariffModalOpen(false);
                    setEditingTariff(null);
                  }}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#64748B', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={tariffSaving}
                  style={{ padding: '9px 22px', borderRadius: '8px', border: 'none', background: '#C5A059', color: '#0F172A', fontWeight: '800', cursor: tariffSaving ? 'wait' : 'pointer' }}
                >
                  {tariffSaving ? 'Saving...' : 'Save Vehicle Tariff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
