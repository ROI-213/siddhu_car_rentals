import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  PhoneCall, 
  DollarSign, 
  Car, 
  Layers, 
  ShieldCheck, 
  Download, 
  ChevronRight,
  Sparkles,
  PlaneLanding,
  UsersRound,
  CalendarDays,
  Receipt,
  UserCheck
} from 'lucide-react';
import { tariffApi } from '../../services/tariffApi';
import { DEFAULT_CORPORATE_CONTENT } from '../../data/defaultSiteContent';

export const AdminCorporateContent = ({ showToast }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('rateCard'); // 'rateCard', 'pillars', 'tiers', 'vendor', 'onboarding'
  const [corpData, setCorpData] = useState(DEFAULT_CORPORATE_CONTENT);

  // Modals / sub-state
  const [editingRateRow, setEditingRateRow] = useState(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);

  const [editingTier, setEditingTier] = useState(null);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);

  useEffect(() => {
    loadCorporateData();
  }, []);

  const loadCorporateData = async () => {
    setLoading(true);
    try {
      const data = await tariffApi.getContent('corporate');
      if (data && typeof data === 'object') {
        setCorpData({
          hero: { ...DEFAULT_CORPORATE_CONTENT.hero, ...(data.hero || {}) },
          brochure: { ...DEFAULT_CORPORATE_CONTENT.brochure, ...(data.brochure || {}) },
          rateCard: Array.isArray(data.rateCard) ? data.rateCard : DEFAULT_CORPORATE_CONTENT.rateCard,
          commercialTerms: data.commercialTerms || DEFAULT_CORPORATE_CONTENT.commercialTerms,
          pillars: Array.isArray(data.pillars) ? data.pillars : DEFAULT_CORPORATE_CONTENT.pillars,
          tiers: Array.isArray(data.tiers) ? data.tiers : DEFAULT_CORPORATE_CONTENT.tiers,
          vendor: { ...DEFAULT_CORPORATE_CONTENT.vendor, ...(data.vendor || {}) },
          onboardingSteps: Array.isArray(data.onboardingSteps) ? data.onboardingSteps : DEFAULT_CORPORATE_CONTENT.onboardingSteps
        });
      } else {
        setCorpData(DEFAULT_CORPORATE_CONTENT);
      }
    } catch (err) {
      console.warn('Error loading corporate content:', err);
      showToast('Loaded local corporate baseline: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToPostgres = async (overrideData = null) => {
    const toSave = overrideData || corpData;
    setSaving(true);
    try {
      const saved = await tariffApi.saveContent('corporate', toSave);
      showToast('✓ Corporate Mobility CMS saved to PostgreSQL successfully!');
      window.dispatchEvent(new Event('scr_site_content_updated'));
      setCorpData(saved);
    } catch (err) {
      showToast('Error saving to database: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset the Corporate Mobility page to official factory defaults?')) return;
    setCorpData(DEFAULT_CORPORATE_CONTENT);
    await handleSaveToPostgres(DEFAULT_CORPORATE_CONTENT);
  };

  // --- Rate Card Handlers ---
  const handleOpenAddRate = () => {
    setEditingRateRow({
      id: 'rate-' + Date.now(),
      category: '',
      models: '',
      local8h80k: '₹3,000',
      extraKm: '₹18 / km',
      extraHr: '₹200 / hr',
      airportTransfer: '₹2,000',
      monthlyRetainer: '₹60,000 / month'
    });
    setIsRateModalOpen(true);
  };

  const handleOpenEditRate = (row) => {
    setEditingRateRow({ ...row });
    setIsRateModalOpen(true);
  };

  const handleSaveRateRow = (e) => {
    e.preventDefault();
    if (!editingRateRow.category.trim()) {
      alert('Vehicle category is required.');
      return;
    }
    const exists = corpData.rateCard.some(r => r.id === editingRateRow.id);
    let updated;
    if (exists) {
      updated = corpData.rateCard.map(r => r.id === editingRateRow.id ? editingRateRow : r);
    } else {
      updated = [...corpData.rateCard, editingRateRow];
    }
    setCorpData(prev => ({ ...prev, rateCard: updated }));
    setIsRateModalOpen(false);
    setEditingRateRow(null);
  };

  const handleDeleteRateRow = (id) => {
    if (!window.confirm('Delete this corporate rate row?')) return;
    setCorpData(prev => ({ ...prev, rateCard: prev.rateCard.filter(r => r.id !== id) }));
  };

  // --- Pillar Handlers ---
  const handlePillarChange = (idx, field, value) => {
    const updated = [...corpData.pillars];
    updated[idx] = { ...updated[idx], [field]: value };
    setCorpData(prev => ({ ...prev, pillars: updated }));
  };

  const handlePillarPointChange = (pillarIdx, pointIdx, value) => {
    const updated = [...corpData.pillars];
    const points = [...updated[pillarIdx].points];
    points[pointIdx] = value;
    updated[pillarIdx].points = points;
    setCorpData(prev => ({ ...prev, pillars: updated }));
  };

  const handleAddPillarPoint = (pillarIdx) => {
    const updated = [...corpData.pillars];
    updated[pillarIdx].points = [...updated[pillarIdx].points, 'New SLA specification point'];
    setCorpData(prev => ({ ...prev, pillars: updated }));
  };

  const handleDeletePillarPoint = (pillarIdx, pointIdx) => {
    const updated = [...corpData.pillars];
    updated[pillarIdx].points = updated[pillarIdx].points.filter((_, i) => i !== pointIdx);
    setCorpData(prev => ({ ...prev, pillars: updated }));
  };

  // --- Tier Matrix Handlers ---
  const handleOpenEditTier = (tier) => {
    setEditingTier({ ...tier, featuresStr: (tier.features || []).join(', ') });
    setIsTierModalOpen(true);
  };

  const handleSaveTier = (e) => {
    e.preventDefault();
    const feats = (editingTier.featuresStr || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const updated = corpData.tiers.map(t => 
      t.id === editingTier.id ? { ...editingTier, features: feats } : t
    );
    setCorpData(prev => ({ ...prev, tiers: updated }));
    setIsTierModalOpen(false);
    setEditingTier(null);
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-slate-500)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏳</div>
        <p>Loading Corporate CMS from PostgreSQL...</p>
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
            <span style={{ fontSize: '1.3rem' }}>🏢</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              Corporate Mobility Page CMS
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
            Edit corporate tariffs, enterprise verticals, executive vehicle tiers, RFP vendor details, and onboarding protocols.
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
            <span>{saving ? 'Saving to Database...' : 'Save Corporate to PostgreSQL'}</span>
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
          { id: 'rateCard', label: '💵 Corporate Rate Card', count: corpData.rateCard.length },
          { id: 'pillars', label: '🏛️ 6 Mobility Verticals', count: corpData.pillars.length },
          { id: 'tiers', label: '🚗 Vehicle Tiers Matrix', count: corpData.tiers.length },
          { id: 'vendor', label: '📑 Vendor & Brochure', count: null },
          { id: 'onboarding', label: '🚀 4-Step Onboarding', count: corpData.onboardingSteps.length }
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

      {/* ── TAB 1: CORPORATE RATE CARD ────────────────────────────────────── */}
      {activeTab === 'rateCard' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                2026 Corporate Tariff Guide & Benchmarks
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0 0' }}>
                Displayed directly on the public Corporate page table for HR, Travel Desks, and Procurement.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddRate}
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
              <span>Add Vehicle Category</span>
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>Category</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>Models</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>Local 8h/80k</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>Extra Km / Hr</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>Airport</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>Monthly Retainer</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {corpData.rateCard.map((row, idx) => (
                  <tr key={row.id || idx} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                    <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0F172A' }}>{row.category}</td>
                    <td style={{ padding: '12px 14px', color: '#475569', fontSize: '0.8rem' }}>{row.models}</td>
                    <td style={{ padding: '12px 14px', fontWeight: '700', color: 'var(--accent-gold-primary)' }}>{row.local8h80k}</td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>{row.extraKm} • {row.extraHr}</td>
                    <td style={{ padding: '12px 14px', color: '#0284C7', fontWeight: '600' }}>{row.airportTransfer}</td>
                    <td style={{ padding: '12px 14px', color: '#10B981', fontWeight: '600' }}>{row.monthlyRetainer}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEditRate(row)}
                        style={{ background: 'none', border: 'none', color: '#0284C7', cursor: 'pointer', marginRight: '8px' }}
                        title="Edit Row"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRateRow(row.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                        title="Delete Row"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Commercial Invoicing Terms Note */}
          <div style={{ marginTop: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
              Commercial Invoicing Terms & Footnote:
            </label>
            <textarea
              rows={3}
              value={corpData.commercialTerms}
              onChange={(e) => setCorpData(prev => ({ ...prev, commercialTerms: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '0.84rem',
                fontFamily: 'inherit',
                lineHeight: '1.5'
              }}
            />
          </div>
        </div>
      )}

      {/* ── TAB 2: PILLARS & VERTICALS ────────────────────────────────────── */}
      {activeTab === 'pillars' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {corpData.pillars.map((pillar, pIdx) => (
            <div key={pillar.id || pIdx} style={{ background: '#FFFFFF', borderRadius: '14px', padding: '20px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>
                    Vertical #{pIdx + 1} Title
                  </label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => handlePillarChange(pIdx, 'title', e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>
                    Headline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={pillar.headline}
                    onChange={(e) => handlePillarChange(pIdx, 'headline', e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              {/* Bullet Points */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748B' }}>
                    Key Commitments & Protocol Points ({pillar.points.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddPillarPoint(pIdx)}
                    style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus size={13} />
                    <span>Add Point</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {pillar.points.map((pt, ptIdx) => (
                    <div key={ptIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => handlePillarPointChange(pIdx, ptIdx, e.target.value)}
                        style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.82rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeletePillarPoint(pIdx, ptIdx)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                        title="Delete point"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 3: VEHICLE TIERS MATRIX ───────────────────────────────────── */}
      {activeTab === 'tiers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {corpData.tiers.map((tier, idx) => (
            <div key={tier.id || idx} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '22px', border: '1px solid rgba(226, 232, 240, 0.9)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '800', background: 'rgba(197,160,89,0.15)', color: '#8C6D2B', padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                  {tier.badge}
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenEditTier(tier)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#0284C7', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  <Edit3 size={14} />
                  <span>Edit Tier</span>
                </button>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>{tier.tier}</h4>
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '600', marginBottom: '8px' }}>{tier.capacity}</div>
              <div style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--accent-gold-primary)', marginBottom: '10px' }}>{tier.models}</div>
              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.5', flex: 1, marginBottom: '14px' }}>{tier.bestFor}</p>

              <div style={{ padding: '10px 12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Amenities ({tier.features.length}):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {tier.features.map((f, fIdx) => (
                    <span key={fIdx} style={{ fontSize: '0.72rem', background: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', color: '#334155' }}>
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 4: VENDOR & BROCHURE ───────────────────────────────────────── */}
      {activeTab === 'vendor' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', marginBottom: '18px' }}>
            Enterprise Procurement & Vendor Empanelment Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Official GSTIN (1-Click Copy Badge on Public Page)
              </label>
              <input
                type="text"
                value={corpData.vendor.gstin}
                onChange={(e) => setCorpData(prev => ({ ...prev, vendor: { ...prev.vendor, gstin: e.target.value } }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontFamily: 'monospace', fontWeight: '700' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Billing Terms Tag
              </label>
              <input
                type="text"
                value={corpData.vendor.billingTerms}
                onChange={(e) => setCorpData(prev => ({ ...prev, vendor: { ...prev.vendor, billingTerms: e.target.value } }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Corporate Helpline Phone
              </label>
              <input
                type="text"
                value={corpData.brochure.phone}
                onChange={(e) => setCorpData(prev => ({ ...prev, brochure: { ...prev.brochure, phone: e.target.value } }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Downloadable PDF Brochure Path
              </label>
              <input
                type="text"
                value={corpData.vendor.pdfUrl || corpData.brochure.pdfUrl}
                onChange={(e) => setCorpData(prev => ({
                  ...prev,
                  vendor: { ...prev.vendor, pdfUrl: e.target.value },
                  brochure: { ...prev.brochure, pdfUrl: e.target.value }
                }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>
                Vendor Empanelment Description
              </label>
              <textarea
                rows={3}
                value={corpData.vendor.description}
                onChange={(e) => setCorpData(prev => ({ ...prev, vendor: { ...prev.vendor, description: e.target.value } }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 5: ONBOARDING STEPS ───────────────────────────────────────── */}
      {activeTab === 'onboarding' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {corpData.onboardingSteps.map((step, sIdx) => (
            <div key={step.step || sIdx} style={{ background: '#FFFFFF', borderRadius: '14px', padding: '20px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#12151C', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', marginBottom: '12px' }}>
                {step.step}
              </div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>
                Step Title
              </label>
              <input
                type="text"
                value={step.title}
                onChange={(e) => {
                  const updated = [...corpData.onboardingSteps];
                  updated[sIdx].title = e.target.value;
                  setCorpData(prev => ({ ...prev, onboardingSteps: updated }));
                }}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: '700', fontSize: '0.86rem', marginBottom: '10px' }}
              />

              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>
                Description
              </label>
              <textarea
                rows={3}
                value={step.desc}
                onChange={(e) => {
                  const updated = [...corpData.onboardingSteps];
                  updated[sIdx].desc = e.target.value;
                  setCorpData(prev => ({ ...prev, onboardingSteps: updated }));
                }}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem', lineHeight: '1.4' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL: ADD / EDIT RATE ROW ───────────────────────────────────── */}
      {isRateModalOpen && editingRateRow && (
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
            maxWidth: '560px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
              {editingRateRow.category ? `Edit ${editingRateRow.category}` : 'Add Corporate Vehicle Category'}
            </h3>

            <form onSubmit={handleSaveRateRow} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Premium Corporate MPV"
                  value={editingRateRow.category}
                  onChange={(e) => setEditingRateRow(prev => ({ ...prev, category: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontWeight: '700' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Vehicle Models Included *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Toyota Innova Crysta 2.4 VX (Captain Seats)"
                  value={editingRateRow.models}
                  onChange={(e) => setEditingRateRow(prev => ({ ...prev, models: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Local 8h / 80km
                  </label>
                  <input
                    type="text"
                    value={editingRateRow.local8h80k}
                    onChange={(e) => setEditingRateRow(prev => ({ ...prev, local8h80k: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Airport Transfer Flat
                  </label>
                  <input
                    type="text"
                    value={editingRateRow.airportTransfer}
                    onChange={(e) => setEditingRateRow(prev => ({ ...prev, airportTransfer: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Extra Km Rate
                  </label>
                  <input
                    type="text"
                    value={editingRateRow.extraKm}
                    onChange={(e) => setEditingRateRow(prev => ({ ...prev, extraKm: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                    Extra Hour Rate
                  </label>
                  <input
                    type="text"
                    value={editingRateRow.extraHr}
                    onChange={(e) => setEditingRateRow(prev => ({ ...prev, extraHr: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Monthly Retainer Benchmark
                </label>
                <input
                  type="text"
                  value={editingRateRow.monthlyRetainer}
                  onChange={(e) => setEditingRateRow(prev => ({ ...prev, monthlyRetainer: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsRateModalOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#64748B', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', background: '#C5A059', color: '#0F172A', fontWeight: '800', cursor: 'pointer' }}
                >
                  Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: EDIT TIER ─────────────────────────────────────────────── */}
      {isTierModalOpen && editingTier && (
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
              Edit Tier: {editingTier.tier}
            </h3>

            <form onSubmit={handleSaveTier} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Badge Text
                </label>
                <input
                  type="text"
                  value={editingTier.badge}
                  onChange={(e) => setEditingTier(prev => ({ ...prev, badge: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Models
                </label>
                <input
                  type="text"
                  value={editingTier.models}
                  onChange={(e) => setEditingTier(prev => ({ ...prev, models: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Passenger & Luggage Capacity
                </label>
                <input
                  type="text"
                  value={editingTier.capacity}
                  onChange={(e) => setEditingTier(prev => ({ ...prev, capacity: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Recommended Use (Best For)
                </label>
                <textarea
                  rows={2}
                  value={editingTier.bestFor}
                  onChange={(e) => setEditingTier(prev => ({ ...prev, bestFor: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
                  Features & Amenities (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editingTier.featuresStr}
                  onChange={(e) => setEditingTier(prev => ({ ...prev, featuresStr: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  placeholder="e.g. Nappa Leather, Privacy Glass, Laptop Charging"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsTierModalOpen(false)}
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
