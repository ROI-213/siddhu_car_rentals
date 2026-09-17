import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Save, 
  RotateCcw, 
  Check, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  Users,
  Briefcase,
  Sparkles,
  Layers,
  Crown,
  ShieldCheck
} from 'lucide-react';
import { tariffApi } from '../../services/tariffApi';
import { fleetData as defaultFleet, FLEET_CATEGORIES } from '../../data/fleetData';

export const AdminFleetManager = ({ showToast }) => {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentEditVehicle, setCurrentEditVehicle] = useState(null);
  const [formData, setFormData] = useState(getInitialVehicleForm());
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadFleet();
  }, []);

  function getInitialVehicleForm() {
    return {
      id: '',
      name: '',
      modelYear: '2024–2025 Executive',
      category: 'Luxury Executive Sedans',
      categoryKey: 'executive',
      categoryLabel: 'Executive',
      passengerCapacity: 4,
      passengerDisplay: '4 Passengers + Chauffeur',
      seatCategory: '3-4',
      luggageCapacity: 3,
      luggageDisplay: '3 Large Bags / Suitcases',
      chauffeurIncluded: true,
      bestFor: 'VIP Airport Transfers, Corporate Visits, Weddings',
      image: '/images/sclass_front.png',
      gallery: ['/images/sclass_front.png'],
      rating: 5,
      transmission: 'Automatic',
      fuelType: 'Diesel / Petrol',
      ac: 'Automatic Climate Control',
      badgeText: 'Executive VIP',
      regPlate: 'KA Commercial VIP',
      description: 'Chauffeur-driven luxury car rental with professional English-speaking driver in Bangalore.',
      amenities: ['Uniformed Chauffeur', 'Bottled Mineral Water', 'Sanitized Cabin', 'Air Conditioning'],
      isActive: true
    };
  }

  const loadFleet = async () => {
    setLoading(true);
    try {
      const data = await tariffApi.getFleet();
      if (Array.isArray(data) && data.length > 0) {
        setFleet(data);
      } else {
        setFleet(defaultFleet);
      }
    } catch (err) {
      showToast('Loaded local fallback fleet: ' + err.message, 'error');
      setFleet(defaultFleet);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFleetToDb = async (updatedList) => {
    const listToSave = updatedList || fleet;
    setSaving(true);
    try {
      await tariffApi.saveFleet(listToSave);
      showToast(`✓ Fleet saved to PostgreSQL (${listToSave.length} vehicles live)`);
      window.dispatchEvent(new Event('scr_fleet_updated'));
    } catch (err) {
      showToast('Error saving fleet: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm('Are you sure you want to reset the fleet to factory defaults (24 original vehicles)? Any custom vehicle additions will be replaced.')) {
      return;
    }
    setFleet(defaultFleet);
    await handleSaveFleetToDb(defaultFleet);
    showToast('✓ Fleet reset to factory defaults.');
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setModalMode('add');
    const newForm = getInitialVehicleForm();
    newForm.id = 'vehicle-' + Date.now();
    setFormData(newForm);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (vehicle) => {
    setModalMode('edit');
    setCurrentEditVehicle(vehicle);
    setFormData({
      ...getInitialVehicleForm(),
      ...vehicle,
      amenities: Array.isArray(vehicle.amenities) ? vehicle.amenities : [],
      gallery: Array.isArray(vehicle.gallery) ? vehicle.gallery : [vehicle.image]
    });
    setIsModalOpen(true);
  };

  // Toggle Active/Inactive
  const handleToggleActive = async (vehicleId, e) => {
    e.stopPropagation();
    const updated = fleet.map(v => {
      if (v.id === vehicleId) {
        return { ...v, isActive: v.isActive !== false ? false : true };
      }
      return v;
    });
    setFleet(updated);
    await handleSaveFleetToDb(updated);
  };

  // Delete vehicle
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const updated = fleet.filter(v => v.id !== deleteTarget.id);
    setFleet(updated);
    setDeleteTarget(null);
    await handleSaveFleetToDb(updated);
    showToast(`✓ Vehicle "${deleteTarget.name}" deleted.`);
  };

  // Save Modal Form
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a vehicle name.');
      return;
    }

    let updatedFleet;
    if (modalMode === 'add') {
      const newVehicle = {
        ...formData,
        id: formData.id || ('car-' + Date.now()),
        categoryLabel: FLEET_CATEGORIES.find(c => c.id === formData.categoryKey)?.label || 'Executive'
      };
      updatedFleet = [newVehicle, ...fleet];
    } else {
      updatedFleet = fleet.map(v => {
        if (v.id === formData.id) {
          return {
            ...formData,
            categoryLabel: FLEET_CATEGORIES.find(c => c.id === formData.categoryKey)?.label || v.categoryLabel
          };
        }
        return v;
      });
    }

    setFleet(updatedFleet);
    setIsModalOpen(false);
    await handleSaveFleetToDb(updatedFleet);
  };

  // Filter vehicles
  const filteredVehicles = fleet.filter(v => {
    const matchesCategory = activeCategory === 'all' || v.categoryKey === activeCategory;
    const matchesSearch = !searchQuery || 
      (v.name && v.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (v.regPlate && v.regPlate.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (v.badgeText && v.badgeText.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (v.category && v.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (catKey) => {
    if (catKey === 'all') return fleet.length;
    return fleet.filter(v => v.categoryKey === catKey).length;
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-slate-500)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏳</div>
        <p>Loading fleet vehicles from PostgreSQL database...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Controls Bar */}
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: '0 0 4px 0' }}>
            Fleet & Vehicle Showroom Manager
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', margin: 0 }}>
            Manage all 24 commercial cars, vans, travellers & luxury buses displayed across your site.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleResetToDefault}
            style={{
              padding: '9px 14px',
              borderRadius: '10px',
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
            <span>Reset to Factory Fleet</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            style={{
              padding: '9px 18px',
              borderRadius: '10px',
              background: '#0284C7',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
            }}
          >
            <Plus size={16} />
            <span>Add New Vehicle</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px 20px',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Fleet' },
            { id: 'luxury', label: '👑 Luxury' },
            { id: 'premium', label: '🌟 Premium' },
            { id: 'executive', label: '💼 Executive' },
            { id: 'group', label: '🚐 Group Travel' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                background: activeCategory === cat.id ? '#12151C' : '#F1F5F9',
                color: activeCategory === cat.id ? '#C5A059' : 'var(--color-slate-700)',
                fontWeight: '700',
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label} ({getCategoryCount(cat.id)})
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', padding: '8px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', minWidth: '260px' }}>
          <Search size={16} color="var(--color-slate-400)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, plate, seats..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.86rem', width: '100%' }}
          />
        </div>
      </div>

      {/* Vehicle Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {filteredVehicles.map((vehicle) => {
          const isHidden = vehicle.isActive === false;
          return (
            <div
              key={vehicle.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: isHidden ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                {/* Image Header with Badge */}
                <div style={{ position: 'relative', height: '180px', background: '#F8FAFC', overflow: 'hidden' }}>
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/sclass_front.png';
                    }}
                  />
                  
                  {/* Category & Badge */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                    <span style={{
                      background: 'rgba(18, 21, 28, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: '#C5A059',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {vehicle.badgeText || vehicle.categoryLabel || 'Fleet'}
                    </span>
                    {isHidden && (
                      <span style={{ background: '#DC2626', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: '800', padding: '3px 8px', borderRadius: '6px' }}>
                        Hidden on Site
                      </span>
                    )}
                  </div>

                  {/* Reg Plate Pill */}
                  {vehicle.regPlate && (
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '12px',
                      background: '#FFD700',
                      color: '#000000',
                      fontWeight: '800',
                      fontSize: '0.7rem',
                      letterSpacing: '0.06em',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1px solid #000'
                    }}>
                      {vehicle.regPlate}
                    </div>
                  )}
                </div>

                {/* Details Body */}
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: '0 0 4px 0' }}>
                    {vehicle.name}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: '600', marginBottom: '12px' }}>
                    {vehicle.modelYear || '2024–2025 Model'} • {vehicle.category}
                  </div>

                  {/* Specs Pill row */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px', fontSize: '0.76rem', color: 'var(--color-slate-700)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={14} color="#0284C7" />
                      <span>{vehicle.passengerDisplay || `${vehicle.passengerCapacity} Pax`}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Briefcase size={14} color="#0284C7" />
                      <span>{vehicle.luggageDisplay || `${vehicle.luggageCapacity} Bags`}</span>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-slate-600)',
                    lineHeight: '1.45',
                    margin: '0 0 12px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {vehicle.description}
                  </p>

                  {/* Amenities tags */}
                  {Array.isArray(vehicle.amenities) && vehicle.amenities.length > 0 && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {vehicle.amenities.slice(0, 3).map((a, i) => (
                        <span key={i} style={{ fontSize: '0.68rem', background: '#F1F5F9', color: 'var(--color-slate-600)', padding: '2px 6px', borderRadius: '4px' }}>
                          {a}
                        </span>
                      ))}
                      {vehicle.amenities.length > 3 && (
                        <span style={{ fontSize: '0.68rem', color: '#0284C7', fontWeight: '700' }}>
                          +{vehicle.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{
                padding: '12px 16px',
                borderTop: '1px solid #E2E8F0',
                background: '#FAFAFA',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button
                  type="button"
                  onClick={(e) => handleToggleActive(vehicle.id, e)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.74rem',
                    fontWeight: '700',
                    background: 'none',
                    border: 'none',
                    color: isHidden ? '#DC2626' : '#059669',
                    cursor: 'pointer'
                  }}
                  title={isHidden ? 'Click to show on public site' : 'Click to hide from public site'}
                >
                  {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{isHidden ? 'Hidden' : 'Visible'}</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(vehicle)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: 'rgba(2, 132, 199, 0.1)',
                      color: '#0284C7',
                      border: '1px solid rgba(2, 132, 199, 0.2)',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(vehicle)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#DC2626',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Delete vehicle"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* --- ADD / EDIT VEHICLE MODAL --- */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '750px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-slate-900)', margin: '0 0 2px 0' }}>
                  {modalMode === 'add' ? 'Add New Fleet Vehicle' : `Edit Vehicle: ${formData.name}`}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                  Updates will immediately reflect in the Showroom and customer portal.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-slate-400)' }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Vehicle Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mercedes-Benz S-Class S350d"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Fleet Category *
                  </label>
                  <select
                    value={formData.categoryKey || 'executive'}
                    onChange={(e) => {
                      const catKey = e.target.value;
                      const catObj = FLEET_CATEGORIES.find(c => c.id === catKey);
                      setFormData({
                        ...formData,
                        categoryKey: catKey,
                        categoryLabel: catObj ? catObj.label : 'Executive',
                        category: catKey === 'luxury' ? 'Ultra Luxury VIP Sedans' : (catKey === 'premium' ? 'Luxury Executive Sedans' : (catKey === 'group' ? 'VIP Group Travel & Coaches' : 'Executive Sedans, SUVs & MPVs'))
                      });
                    }}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  >
                    <option value="luxury">👑 Luxury (Flagships & VIP Lounges)</option>
                    <option value="premium">🌟 Premium (High-End German & SUVs)</option>
                    <option value="executive">💼 Executive (Corporate Sedans & MPVs)</option>
                    <option value="group">🚐 Group Travel (Vans, Travellers & Buses)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Registration Plate Number
                  </label>
                  <input
                    type="text"
                    value={formData.regPlate || ''}
                    onChange={(e) => setFormData({ ...formData, regPlate: e.target.value })}
                    placeholder="e.g. KA 05 AG 4488"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Model Year / Trim
                  </label>
                  <input
                    type="text"
                    value={formData.modelYear || ''}
                    onChange={(e) => setFormData({ ...formData, modelYear: e.target.value })}
                    placeholder="e.g. 2024–2025 Executive Lounge"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Badge Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.badgeText || ''}
                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                    placeholder="e.g. Flagship VIP / Supreme VIP"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Transmission
                  </label>
                  <input
                    type="text"
                    value={formData.transmission || ''}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    placeholder="e.g. 9G-TRONIC Automatic"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Passenger Seating Display
                  </label>
                  <input
                    type="text"
                    value={formData.passengerDisplay || ''}
                    onChange={(e) => setFormData({ ...formData, passengerDisplay: e.target.value })}
                    placeholder="e.g. 4 Passengers + Chauffeur"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Luggage Capacity Display
                  </label>
                  <input
                    type="text"
                    value={formData.luggageDisplay || ''}
                    onChange={(e) => setFormData({ ...formData, luggageDisplay: e.target.value })}
                    placeholder="e.g. 4 Large Bags / Suitcases"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Fuel Type
                  </label>
                  <input
                    type="text"
                    value={formData.fuelType || ''}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    placeholder="e.g. Hybrid Petrol / Diesel Turbo"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Air Conditioning
                  </label>
                  <input
                    type="text"
                    value={formData.ac || ''}
                    onChange={(e) => setFormData({ ...formData, ac: e.target.value })}
                    placeholder="e.g. 4-Zone Executive Climate Control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              {/* Main Image */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                  Main Image URL / Path *
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    required
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/sclass_front.png"
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                  Vehicle Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of cabin comfort, amenities, and chauffeur hospitality..."
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', resize: 'vertical' }}
                />
              </div>

              {/* Recommended For */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                  Best Suited For
                </label>
                <input
                  type="text"
                  value={formData.bestFor || ''}
                  onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
                  placeholder="e.g. VIP Airport Transfers, Luxury Weddings, C-Suite Corporate"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              {/* Amenities (comma separated) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                  Amenities (comma-separated list)
                </label>
                <input
                  type="text"
                  value={Array.isArray(formData.amenities) ? formData.amenities.join(', ') : ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    amenities: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Executive Rear Lounge, Bottled Mineral Water, White Glove Uniformed Chauffeur"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              {/* Active Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  id="isActiveCheck"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="isActiveCheck" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-slate-800)', cursor: 'pointer' }}>
                  Visible on Public Website & Fleet Showroom
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#F1F5F9',
                    color: 'var(--color-slate-600)',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    background: '#0284C7',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Save size={15} />
                  <span>{saving ? 'Saving...' : (modalMode === 'add' ? 'Add Vehicle to Fleet' : 'Save Vehicle Changes')}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteTarget && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 3100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '440px', width: '100%', padding: '28px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Trash2 size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-slate-900)' }}>
              Confirm Vehicle Deletion
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-slate-600)', marginBottom: '24px', lineHeight: '1.5' }}>
              Are you sure you want to delete <strong>"{deleteTarget.name}"</strong>? It will be removed from PostgreSQL and the customer showroom.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                style={{ padding: '10px 18px', borderRadius: '10px', background: '#F1F5F9', color: 'var(--color-slate-700)', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
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
