import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  X, 
  AlertCircle, 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Compass, 
  LogOut, 
  Save, 
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { PremiumButton } from '../components/common/PremiumButton';
import { tariffApi, formatCurrency } from '../services/tariffApi';

export const AdminTariff = ({ onNavigateToPublicTariff }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(sessionStorage.getItem('scr_admin_auth'));
  });
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab & Data
  const [activeTab, setActiveTab] = useState('disposal'); // 'disposal' | 'outstation'
  const [tariffs, setTariffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState(getInitialFormState('disposal'));
  const [formErrors, setFormErrors] = useState([]);

  // Delete Confirmation Modal
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadTariffs();
    }
  }, [isAuthenticated, activeTab]);

  function getInitialFormState(usageType) {
    return {
      location: 'BANGALORE',
      usage_type: usageType,
      vehicle_variant: '',
      service_type: 'Garage to Garage',
      four_hours_forty_km: '',
      eight_hours_eighty_km: '',
      extra_hour: '',
      extra_km: '',
      night_local_bata: '',
      airport_transfer: '',
      minimum_km_per_day: '',
      rate_per_km: '',
      outstation_extra_km: '',
      driver_allowance: '',
      is_active: true
    };
  }

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadTariffs = async () => {
    setLoading(true);
    try {
      const data = await tariffApi.getTariffs({ usage_type: activeTab, all: true });
      setTariffs(data);
    } catch (err) {
      showToast('Error loading tariffs: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Auth Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await tariffApi.loginAdmin(adminUsername, adminPassword);
      sessionStorage.setItem('scr_admin_auth', 'true');
      setIsAuthenticated(true);
      showToast('Welcome to Siddhu Car Rentals Admin Portal');
    } catch (err) {
      setAuthError(err.message || 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('scr_admin_auth');
    setIsAuthenticated(false);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentEditId(null);
    setFormData(getInitialFormState(activeTab));
    setFormErrors([]);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (tariff) => {
    setModalMode('edit');
    setCurrentEditId(tariff.id);
    setFormData({
      location: tariff.location || 'BANGALORE',
      usage_type: tariff.usage_type || activeTab,
      vehicle_variant: tariff.vehicle_variant || '',
      service_type: tariff.service_type || 'Garage to Garage',
      four_hours_forty_km: tariff.four_hours_forty_km ?? '',
      eight_hours_eighty_km: tariff.eight_hours_eighty_km ?? '',
      extra_hour: tariff.extra_hour ?? '',
      extra_km: tariff.extra_km ?? '',
      night_local_bata: tariff.night_local_bata ?? '',
      airport_transfer: tariff.airport_transfer ?? '',
      minimum_km_per_day: tariff.minimum_km_per_day ?? '',
      rate_per_km: tariff.rate_per_km ?? '',
      outstation_extra_km: tariff.outstation_extra_km ?? '',
      driver_allowance: tariff.driver_allowance ?? '',
      is_active: tariff.is_active !== false
    });
    setFormErrors([]);
    setIsModalOpen(true);
  };

  // Validate form client-side
  const validateForm = () => {
    const errors = [];
    if (!formData.vehicle_variant.trim()) {
      errors.push('Vehicle Variant name is required.');
    }

    const checkNonNegative = (val, name) => {
      if (val !== '' && val !== null && val !== undefined) {
        const n = Number(val);
        if (isNaN(n)) errors.push(`${name} must be a number.`);
        else if (n < 0) errors.push(`${name} cannot be negative.`);
      }
    };

    if (activeTab === 'disposal') {
      checkNonNegative(formData.four_hours_forty_km, '4 hrs / 40 km');
      checkNonNegative(formData.eight_hours_eighty_km, '8 hrs / 80 km');
      checkNonNegative(formData.extra_hour, 'Extra Hour');
      checkNonNegative(formData.extra_km, 'Extra KM');
      checkNonNegative(formData.night_local_bata, 'Night Local Bata');
      checkNonNegative(formData.airport_transfer, 'Airport Transfer');
    } else {
      checkNonNegative(formData.minimum_km_per_day, 'Minimum KM per Day');
      checkNonNegative(formData.rate_per_km, 'Rate / KM');
      checkNonNegative(formData.outstation_extra_km, 'Extra KM');
      checkNonNegative(formData.driver_allowance, 'Driver Allowance');
    }

    return errors;
  };

  // Save Modal Form
  const handleSaveForm = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (modalMode === 'add') {
        await tariffApi.createTariff({
          ...formData,
          usage_type: activeTab,
          display_order: tariffs.length + 1
        });
        showToast(`Vehicle tariff "${formData.vehicle_variant}" created successfully!`);
      } else {
        await tariffApi.updateTariff(currentEditId, formData);
        showToast(`Vehicle tariff "${formData.vehicle_variant}" updated successfully!`);
      }
      setIsModalOpen(false);
      loadTariffs();
    } catch (err) {
      setFormErrors([err.message || 'Failed to save tariff.']);
    }
  };

  // Toggle Active/Inactive
  const handleToggleActive = async (tariff) => {
    try {
      const updatedStatus = !tariff.is_active;
      await tariffApi.updateTariff(tariff.id, { is_active: updatedStatus });
      setTariffs(tariffs.map(t => t.id === tariff.id ? { ...t, is_active: updatedStatus } : t));
      showToast(`${tariff.vehicle_variant} is now ${updatedStatus ? 'Active' : 'Disabled'}`);
    } catch (err) {
      showToast('Failed to toggle status: ' + err.message, 'error');
    }
  };

  // Delete Action
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await tariffApi.deleteTariff(deleteTarget.id);
      showToast(`Tariff "${deleteTarget.vehicle_variant}" deleted.`);
      setDeleteTarget(null);
      loadTariffs();
    } catch (err) {
      showToast('Failed to delete tariff: ' + err.message, 'error');
    }
  };

  // Reorder Item (Up/Down)
  const handleMoveOrder = async (index, direction) => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= tariffs.length) return;

    const newList = [...tariffs];
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;

    // Update display orders
    const orderList = newList.map((item, idx) => ({ id: item.id, display_order: idx + 1 }));
    setTariffs(newList);

    try {
      await tariffApi.reorderTariffs(orderList);
      showToast('Order updated successfully');
    } catch (err) {
      showToast('Failed to persist order', 'error');
    }
  };

  // Reset to default seed
  const handleResetToSeed = async () => {
    if (window.confirm('Are you sure you want to reset all tariffs to the official factory rate card? This will restore original pricing.')) {
      try {
        await tariffApi.resetToSeed();
        showToast('All tariffs restored to default factory seed.');
        loadTariffs();
      } catch (err) {
        showToast('Failed to reset: ' + err.message, 'error');
      }
    }
  };

  const filteredTariffs = tariffs.filter(t => 
    t.vehicle_variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.service_type && t.service_type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--bg-foundation)' }}>
        <GlassCard variant="standard" style={{ maxWidth: '440px', width: '100%', padding: '36px', background: '#FFFFFF', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#12151C', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #C5A059' }}>
              <Lock size={28} color="#C5A059" />
            </div>
            <h2 className="text-h2" style={{ fontSize: '1.45rem', color: 'var(--color-slate-900)' }}>
              Admin Tariff Portal
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-slate-500)', marginTop: '4px' }}>
              Siddhu Car Rentals • PostgreSQL Rate Card Management
            </p>
          </div>

          {authError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#DC2626', fontSize: '0.85rem', marginBottom: '20px' }}>
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Admin Username
              </label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="admin"
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', outline: 'none', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', outline: 'none', fontSize: '0.9rem' }}
              />
            </div>

            <PremiumButton variant="gold" size="lg" fullWidth pill style={{ marginTop: '8px' }}>
              Sign In to Tariff Manager
            </PremiumButton>

            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.78rem', color: 'var(--color-slate-400)' }}>
              Protected Database Management Layer • Siddhu Car Rentals
            </div>
          </form>
        </GlassCard>
      </div>
    );
  }

  // --- MAIN ADMIN MANAGEMENT VIEW ---
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-foundation-alt)', paddingBottom: '60px' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 2000,
          background: toastMessage.type === 'error' ? '#DC2626' : '#12151C',
          color: '#FFFFFF',
          padding: '14px 20px',
          borderRadius: '12px',
          border: toastMessage.type === 'error' ? 'none' : '1px solid #C5A059',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.88rem',
          fontWeight: '600',
          animation: 'fadeIn 0.3s ease'
        }}>
          {toastMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} color="#C5A059" />}
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <div style={{ background: '#12151C', color: '#FFFFFF', padding: '16px 0', borderBottom: '1px solid rgba(197, 160, 89, 0.3)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(197, 160, 89, 0.2)', color: '#C5A059', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.08em' }}>
              ADMIN PANEL
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>
                Tariff Management System
              </h1>
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
                PostgreSQL Dynamic Pricing Control • Location: BANGALORE
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {onNavigateToPublicTariff && (
              <button
                onClick={onNavigateToPublicTariff}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Eye size={14} />
                <span>View Public Rate Card</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ marginTop: '32px' }}>
        
        {/* Controls, Category Tabs & Add Button */}
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
          gap: '20px',
          marginBottom: '24px'
        }}>
          
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-foundation-alt)', padding: '6px', borderRadius: '12px' }}>
            <button
              onClick={() => setActiveTab('disposal')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'disposal' ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : 'transparent',
                color: activeTab === 'disposal' ? '#FFFFFF' : 'var(--color-slate-700)',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Clock size={16} />
              <span>Disposal Tariff ({tariffs.filter(t => t.usage_type === 'disposal').length || (activeTab === 'disposal' ? tariffs.length : '')})</span>
            </button>
            <button
              onClick={() => setActiveTab('outstation')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'outstation' ? 'linear-gradient(135deg, #C5A059 0%, #B38E47 100%)' : 'transparent',
                color: activeTab === 'outstation' ? '#FFFFFF' : 'var(--color-slate-700)',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Compass size={16} />
              <span>Outstation Tariff ({tariffs.filter(t => t.usage_type === 'outstation').length || (activeTab === 'outstation' ? tariffs.length : '')})</span>
            </button>
          </div>

          {/* Search and Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-foundation-alt)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
              <Search size={16} color="var(--color-slate-400)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vehicle model..."
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.86rem', width: '180px' }}
              />
            </div>

            <button
              onClick={handleResetToSeed}
              title="Restore default factory seed tariffs"
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: '#FFFFFF',
                color: 'var(--color-slate-700)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                fontSize: '0.84rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RotateCcw size={15} />
              <span>Restore Factory Tariffs</span>
            </button>

            <PremiumButton variant="gold" size="md" icon={Plus} iconPosition="left" onClick={handleOpenAdd}>
              Add Vehicle Tariff
            </PremiumButton>
          </div>

        </div>

        {/* Data Table */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
          overflow: 'hidden'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <RefreshCw size={36} color="var(--accent-gold-primary)" className="spin-animation" style={{ margin: '0 auto 12px auto' }} />
              <p style={{ color: 'var(--color-slate-600)' }}>Loading database records...</p>
            </div>
          ) : filteredTariffs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: 'var(--color-slate-500)', fontSize: '0.95rem' }}>No tariff records found.</p>
              <button onClick={handleOpenAdd} style={{ marginTop: '12px', padding: '8px 16px', borderRadius: '8px', background: 'var(--accent-gold-primary)', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                Add First Tariff
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              {activeTab === 'disposal' ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1080px' }}>
                  <thead>
                    <tr style={{ background: '#1E232F', color: '#FFFFFF', borderBottom: '2px solid #C5A059' }}>
                      <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Order</th>
                      <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Vehicle Variant</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>4h / 40km</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>8h / 80km</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Extra Hr</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Extra KM</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Night Bata</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Airport</th>
                      <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTariffs.map((t, idx) => (
                      <tr
                        key={t.id}
                        style={{
                          borderBottom: '1px solid rgba(226, 232, 240, 0.7)',
                          background: idx % 2 === 0 ? '#FFFFFF' : 'rgba(250, 249, 246, 0.7)',
                          opacity: t.is_active ? 1 : 0.55
                        }}
                      >
                        {/* Order Controls */}
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-slate-400)', width: '22px' }}>{idx + 1}</span>
                            <button
                              onClick={() => handleMoveOrder(idx, 'up')}
                              disabled={idx === 0}
                              style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', color: idx === 0 ? '#CBD5E1' : 'var(--color-slate-700)', padding: '2px' }}
                              title="Move Up"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              onClick={() => handleMoveOrder(idx, 'down')}
                              disabled={idx === filteredTariffs.length - 1}
                              style={{ border: 'none', background: 'transparent', cursor: idx === filteredTariffs.length - 1 ? 'not-allowed' : 'pointer', color: idx === filteredTariffs.length - 1 ? '#CBD5E1' : 'var(--color-slate-700)', padding: '2px' }}
                              title="Move Down"
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        </td>

                        {/* Status Toggle */}
                        <td style={{ padding: '12px 16px' }}>
                          <button
                            onClick={() => handleToggleActive(t)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              border: 'none',
                              fontSize: '0.74rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              background: t.is_active ? 'rgba(22, 163, 74, 0.12)' : 'rgba(100, 116, 139, 0.12)',
                              color: t.is_active ? '#16A34A' : '#64748B',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            {t.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                            <span>{t.is_active ? 'Active' : 'Disabled'}</span>
                          </button>
                        </td>

                        {/* Vehicle Variant */}
                        <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--color-slate-900)', fontSize: '0.9rem' }}>
                          {t.vehicle_variant}
                        </td>

                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.88rem', color: t.four_hours_forty_km ? 'var(--color-slate-900)' : 'var(--color-slate-400)' }}>
                          {formatCurrency(t.four_hours_forty_km)}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-sky-primary)' }}>
                          {formatCurrency(t.eight_hours_eighty_km)}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.85rem' }}>
                          {formatCurrency(t.extra_hour)}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.85rem' }}>
                          {formatCurrency(t.extra_km)}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.85rem' }}>
                          {formatCurrency(t.night_local_bata)}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.9rem', fontWeight: '700', color: '#16A34A' }}>
                          {formatCurrency(t.airport_transfer)}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <button
                              onClick={() => handleOpenEdit(t)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '8px',
                                background: 'rgba(2, 132, 199, 0.1)',
                                color: 'var(--accent-sky-primary)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.78rem',
                                fontWeight: '600'
                              }}
                              title="Edit Tariff"
                            >
                              <Edit3 size={14} />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => setDeleteTarget(t)}
                              style={{
                                padding: '6px 8px',
                                borderRadius: '8px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#EF4444',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                              title="Delete Tariff"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '960px' }}>
                  <thead>
                    <tr style={{ background: '#1E232F', color: '#FFFFFF', borderBottom: '2px solid #C5A059' }}>
                      <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Order</th>
                      <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Vehicle Variant</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Min KM / Day</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Rate / KM</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Extra KM</th>
                      <th style={{ padding: '14px 12px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Driver Allowance</th>
                      <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTariffs.map((t, idx) => (
                      <tr
                        key={t.id}
                        style={{
                          borderBottom: '1px solid rgba(226, 232, 240, 0.7)',
                          background: idx % 2 === 0 ? '#FFFFFF' : 'rgba(250, 249, 246, 0.7)',
                          opacity: t.is_active ? 1 : 0.55
                        }}
                      >
                        {/* Order Controls */}
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-slate-400)', width: '22px' }}>{idx + 1}</span>
                            <button
                              onClick={() => handleMoveOrder(idx, 'up')}
                              disabled={idx === 0}
                              style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', color: idx === 0 ? '#CBD5E1' : 'var(--color-slate-700)', padding: '2px' }}
                              title="Move Up"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              onClick={() => handleMoveOrder(idx, 'down')}
                              disabled={idx === filteredTariffs.length - 1}
                              style={{ border: 'none', background: 'transparent', cursor: idx === filteredTariffs.length - 1 ? 'not-allowed' : 'pointer', color: idx === filteredTariffs.length - 1 ? '#CBD5E1' : 'var(--color-slate-700)', padding: '2px' }}
                              title="Move Down"
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        </td>

                        {/* Status Toggle */}
                        <td style={{ padding: '12px 16px' }}>
                          <button
                            onClick={() => handleToggleActive(t)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              border: 'none',
                              fontSize: '0.74rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              background: t.is_active ? 'rgba(22, 163, 74, 0.12)' : 'rgba(100, 116, 139, 0.12)',
                              color: t.is_active ? '#16A34A' : '#64748B',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            {t.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                            <span>{t.is_active ? 'Active' : 'Disabled'}</span>
                          </button>
                        </td>

                        {/* Vehicle Variant */}
                        <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--color-slate-900)', fontSize: '0.9rem' }}>
                          {t.vehicle_variant}
                        </td>

                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.88rem' }}>
                          {t.minimum_km_per_day ? `${t.minimum_km_per_day} KM` : 'N/A'}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.92rem', fontWeight: '700', color: 'var(--accent-gold-primary)' }}>
                          {formatCurrency(t.rate_per_km, ' / KM')}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.85rem' }}>
                          {formatCurrency(t.outstation_extra_km, ' / KM')}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontSize: '0.9rem', fontWeight: '700', color: '#0284C7' }}>
                          {formatCurrency(t.driver_allowance, ' / Day')}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <button
                              onClick={() => handleOpenEdit(t)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '8px',
                                background: 'rgba(197, 160, 89, 0.15)',
                                color: 'var(--accent-gold-primary)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.78rem',
                                fontWeight: '600'
                              }}
                              title="Edit Tariff"
                            >
                              <Edit3 size={14} />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => setDeleteTarget(t)}
                              style={{
                                padding: '6px 8px',
                                borderRadius: '8px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#EF4444',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                              title="Delete Tariff"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

      </div>

      {/* --- ADD / EDIT TARIFF MODAL --- */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(226, 232, 240, 0.9)'
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(226, 232, 240, 0.8)', paddingBottom: '16px' }}>
              <div>
                <h3 className="text-h3" style={{ color: 'var(--color-slate-900)', fontSize: '1.3rem' }}>
                  {modalMode === 'add' ? 'Add New Vehicle Tariff' : 'Edit Vehicle Tariff'}
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)' }}>
                  Category: {activeTab === 'disposal' ? 'Disposal / Local Tariff' : 'Outstation Tariff'} • Bangalore
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-slate-400)' }}
              >
                <X size={24} />
              </button>
            </div>

            {formErrors.length > 0 && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#DC2626', fontSize: '0.85rem' }}>
                  {formErrors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </div>
            )}

            <form onSubmit={handleSaveForm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Row 1: Variant & Service Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                    Vehicle Variant *
                  </label>
                  <input
                    type="text"
                    value={formData.vehicle_variant}
                    onChange={(e) => setFormData({ ...formData, vehicle_variant: e.target.value })}
                    placeholder="e.g. Innova Crysta / BMW 5 Series"
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                    Service Type
                  </label>
                  <input
                    type="text"
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    placeholder="Garage to Garage"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              {/* DISPOSAL SPECIFIC FIELDS */}
              {activeTab === 'disposal' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        4 hrs / 40 km Price (₹) <span style={{ color: 'var(--color-slate-400)', fontWeight: 'normal' }}>(Leave empty if N/A)</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.four_hours_forty_km}
                        onChange={(e) => setFormData({ ...formData, four_hours_forty_km: e.target.value })}
                        placeholder="e.g. 1900 or empty for N/A"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        8 hrs / 80 km Price (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.eight_hours_eighty_km}
                        onChange={(e) => setFormData({ ...formData, eight_hours_eighty_km: e.target.value })}
                        placeholder="e.g. 3200"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        Extra Hour Rate (₹/Hr)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.extra_hour}
                        onChange={(e) => setFormData({ ...formData, extra_hour: e.target.value })}
                        placeholder="e.g. 275"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        Extra KM Rate (₹/KM)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.extra_km}
                        onChange={(e) => setFormData({ ...formData, extra_km: e.target.value })}
                        placeholder="e.g. 23"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        Night Local Bata (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.night_local_bata}
                        onChange={(e) => setFormData({ ...formData, night_local_bata: e.target.value })}
                        placeholder="e.g. 300"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        Airport Transfer Price (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.airport_transfer}
                        onChange={(e) => setFormData({ ...formData, airport_transfer: e.target.value })}
                        placeholder="e.g. 2600"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* OUTSTATION SPECIFIC FIELDS */}
              {activeTab === 'outstation' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        Min. KM Per Day (KM)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.minimum_km_per_day}
                        onChange={(e) => setFormData({ ...formData, minimum_km_per_day: e.target.value })}
                        placeholder="e.g. 300"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        Rate / KM (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.rate_per_km}
                        onChange={(e) => setFormData({ ...formData, rate_per_km: e.target.value })}
                        placeholder="e.g. 23"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        Extra KM Rate (₹/KM)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.outstation_extra_km}
                        onChange={(e) => setFormData({ ...formData, outstation_extra_km: e.target.value })}
                        placeholder="e.g. 23"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-700)', marginBottom: '6px' }}>
                        Driver Allowance (₹/Day)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.driver_allowance}
                        onChange={(e) => setFormData({ ...formData, driver_allowance: e.target.value })}
                        placeholder="e.g. 500"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Active Toggle Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <input
                  type="checkbox"
                  id="modal_is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="modal_is_active" style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-slate-700)', cursor: 'pointer' }}>
                  Enable this tariff on public website
                </label>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '10px', background: 'var(--bg-foundation-alt)', color: 'var(--color-slate-700)', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <PremiumButton variant="gold" size="md" icon={Save} iconPosition="left">
                  {modalMode === 'add' ? 'Create Tariff Record' : 'Save Changes'}
                </PremiumButton>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION DIALOG --- */}
      {deleteTarget && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 3100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '440px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Trash2 size={26} />
            </div>
            <h3 className="text-h3" style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-slate-900)' }}>
              Confirm Tariff Deletion
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-slate-600)', marginBottom: '24px', lineHeight: '1.5' }}>
              Are you sure you want to delete <strong>"{deleteTarget.vehicle_variant}"</strong>? This will remove it from the PostgreSQL database and public rate card.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteTarget(null)}
                style={{ padding: '10px 18px', borderRadius: '10px', background: 'var(--bg-foundation-alt)', color: 'var(--color-slate-700)', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                style={{ padding: '10px 20px', borderRadius: '10px', background: '#DC2626', color: '#FFFFFF', border: 'none', fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
