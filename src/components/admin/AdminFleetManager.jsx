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
import { pricingService } from '../../services/pricingService';

const COMMON_VEHICLE_IMAGES = [
  { label: 'Mercedes S-Class', path: '/images/sclass_front.png' },
  { label: 'Toyota Fortuner', path: '/images/fortuner.png' },
  { label: 'Innova Crysta', path: '/images/crysta.png' },
  { label: 'Innova Hycross', path: '/images/hycross.png' },
  { label: 'Toyota Camry', path: '/images/camry.png' },
  { label: 'Dzire / Sedan', path: '/images/sedan.png' },
  { label: 'Force Urbania', path: '/images/urbania.png' },
  { label: 'Tempo Traveller', path: '/images/tempo.png' },
  { label: 'Luxury Coach Bus', path: '/images/luxury_bus.png' },
];

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
      isActive: true,
      // Tariffs and Pricing
      eight_hours_eighty_km: 2900,
      four_hours_forty_km: 1800,
      extra_hour: 250,
      extra_km: 19,
      airport_transfer: 2250,
      rate_per_km: 19,
      driver_allowance: 400
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
    const localT = pricingService.getLocalTariff(vehicle) || {};
    const outT = pricingService.getOutstationTariff(vehicle) || {};

    setFormData({
      ...getInitialVehicleForm(),
      ...vehicle,
      eight_hours_eighty_km: vehicle.eight_hours_eighty_km !== undefined && vehicle.eight_hours_eighty_km !== null
        ? vehicle.eight_hours_eighty_km
        : (localT.eight_hours_eighty_km ?? ''),
      four_hours_forty_km: vehicle.four_hours_forty_km !== undefined && vehicle.four_hours_forty_km !== null
        ? vehicle.four_hours_forty_km
        : (localT.four_hours_forty_km ?? ''),
      extra_hour: vehicle.extra_hour !== undefined && vehicle.extra_hour !== null
        ? vehicle.extra_hour
        : (localT.extra_hour ?? ''),
      extra_km: vehicle.extra_km !== undefined && vehicle.extra_km !== null
        ? vehicle.extra_km
        : (localT.extra_km ?? ''),
      airport_transfer: vehicle.airport_transfer !== undefined && vehicle.airport_transfer !== null
        ? vehicle.airport_transfer
        : (localT.airport_transfer ?? ''),
      rate_per_km: vehicle.rate_per_km !== undefined && vehicle.rate_per_km !== null
        ? vehicle.rate_per_km
        : (outT.rate_per_km ?? ''),
      driver_allowance: vehicle.driver_allowance !== undefined && vehicle.driver_allowance !== null
        ? vehicle.driver_allowance
        : (outT.driver_allowance ?? 400),
      amenities: Array.isArray(vehicle.amenities) ? vehicle.amenities : [],
      gallery: Array.isArray(vehicle.gallery) && vehicle.gallery.length > 0 ? vehicle.gallery : (vehicle.image ? [vehicle.image] : [])
    });
    setIsModalOpen(true);
  };

  const handleAddGalleryItem = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [...(Array.isArray(prev.gallery) ? prev.gallery : []), '']
    }));
  };

  const handleGalleryItemChange = (index, val) => {
    setFormData(prev => {
      const list = [...(Array.isArray(prev.gallery) ? prev.gallery : [])];
      list[index] = val;
      return { ...prev, gallery: list };
    });
  };

  const handleRemoveGalleryItem = (index) => {
    setFormData(prev => {
      const list = (Array.isArray(prev.gallery) ? prev.gallery : []).filter((_, i) => i !== index);
      return { ...prev, gallery: list.length > 0 ? list : [prev.image || '/images/sclass_front.png'] };
    });
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

    const cleanedData = {
      ...formData,
      eight_hours_eighty_km: formData.eight_hours_eighty_km !== '' && formData.eight_hours_eighty_km !== null && !isNaN(formData.eight_hours_eighty_km)
        ? Number(formData.eight_hours_eighty_km)
        : null,
      four_hours_forty_km: formData.four_hours_forty_km !== '' && formData.four_hours_forty_km !== null && !isNaN(formData.four_hours_forty_km)
        ? Number(formData.four_hours_forty_km)
        : null,
      extra_hour: formData.extra_hour !== '' && formData.extra_hour !== null && !isNaN(formData.extra_hour)
        ? Number(formData.extra_hour)
        : null,
      extra_km: formData.extra_km !== '' && formData.extra_km !== null && !isNaN(formData.extra_km)
        ? Number(formData.extra_km)
        : null,
      airport_transfer: formData.airport_transfer !== '' && formData.airport_transfer !== null && !isNaN(formData.airport_transfer)
        ? Number(formData.airport_transfer)
        : null,
      rate_per_km: formData.rate_per_km !== '' && formData.rate_per_km !== null && !isNaN(formData.rate_per_km)
        ? Number(formData.rate_per_km)
        : null,
      driver_allowance: formData.driver_allowance !== '' && formData.driver_allowance !== null && !isNaN(formData.driver_allowance)
        ? Number(formData.driver_allowance)
        : null,
      gallery: Array.isArray(formData.gallery) && formData.gallery.length > 0
        ? formData.gallery.filter(Boolean)
        : (formData.image ? [formData.image] : [])
    };

    let updatedFleet;
    if (modalMode === 'add') {
      const newVehicle = {
        ...cleanedData,
        id: cleanedData.id || ('car-' + Date.now()),
        categoryLabel: FLEET_CATEGORIES.find(c => c.id === cleanedData.categoryKey)?.label || 'Executive'
      };
      updatedFleet = [newVehicle, ...fleet];
    } else {
      updatedFleet = fleet.map(v => {
        if (v.id === cleanedData.id) {
          return {
            ...cleanedData,
            categoryLabel: FLEET_CATEGORIES.find(c => c.id === cleanedData.categoryKey)?.label || v.categoryLabel
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

                  {/* Gallery Photos Count Pill */}
                  {Array.isArray(vehicle.gallery) && vehicle.gallery.length > 1 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      background: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      fontWeight: '700',
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <ImageIcon size={11} />
                      <span>{vehicle.gallery.length} Photos</span>
                    </div>
                  )}

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

                  {/* Tariffs & Pricing Summary */}
                  {(() => {
                    const localT = pricingService.getLocalTariff(vehicle) || {};
                    const outT = pricingService.getOutstationTariff(vehicle) || {};
                    const local8h = vehicle.eight_hours_eighty_km || localT.eight_hours_eighty_km;
                    const airport = vehicle.airport_transfer || localT.airport_transfer;
                    const outKm = vehicle.rate_per_km || outT.rate_per_km;

                    return (
                      <div style={{
                        marginTop: '12px',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-slate-500)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Showroom Tariffs
                          </span>
                          <span style={{ fontSize: '0.88rem', fontWeight: '900', color: '#0284C7' }}>
                            {local8h ? pricingService.formatPrice(local8h) : 'On Request'}
                            <span style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--color-slate-400)' }}> /8h 80km</span>
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.74rem', paddingTop: '6px', borderTop: '1px dashed #E2E8F0' }}>
                          <div style={{ color: 'var(--color-slate-600)' }}>
                            ✈️ Airport: <strong style={{ color: '#0F172A' }}>{airport ? pricingService.formatPrice(airport) : 'N/A'}</strong>
                          </div>
                          <div style={{ color: 'var(--color-slate-600)', textAlign: 'right' }}>
                            🛣️ Outstation: <strong style={{ color: '#D97706' }}>{outKm ? `${pricingService.formatPrice(outKm)}/km` : 'N/A'}</strong>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
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

              {/* ========================================================================= */}
              {/* VEHICLE PHOTOS & GALLERY MANAGEMENT                                       */}
              {/* ========================================================================= */}
              <div style={{
                background: '#F8FAFC',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ImageIcon size={18} color="#0284C7" />
                    <span style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--color-slate-800)' }}>
                      Vehicle Photos & Showroom Gallery
                    </span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)' }}>
                    Add main showroom image & multiple gallery photos
                  </span>
                </div>

                {/* Main Showroom Image */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                    Main Showroom Image URL / Path *
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="text"
                      required
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/sclass_front.png or https://..."
                      style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem', background: '#FFFFFF' }}
                    />
                    {formData.image && (
                      <div style={{ position: 'relative', width: '64px', height: '46px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #0284C7', flexShrink: 0 }}>
                        <img
                          src={formData.image}
                          alt="Main Preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Quick Preset Selector */}
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-slate-500)', marginBottom: '4px' }}>
                      Quick image presets (Click to select):
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {COMMON_VEHICLE_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: preset.path })}
                          style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: formData.image === preset.path ? '#0284C7' : '#FFFFFF',
                            color: formData.image === preset.path ? '#FFFFFF' : 'var(--color-slate-700)',
                            border: '1px solid #CBD5E1',
                            fontSize: '0.72rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Multiple Gallery Images */}
                <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-slate-700)' }}>
                      Vehicle Detail Gallery Photos ({Array.isArray(formData.gallery) ? formData.gallery.length : 0})
                    </label>
                    <button
                      type="button"
                      onClick={handleAddGalleryItem}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: '#0284C7',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.74rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Plus size={13} />
                      <span>Add Gallery Photo</span>
                    </button>
                  </div>

                  {Array.isArray(formData.gallery) && formData.gallery.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {formData.gallery.map((imgUrl, gIdx) => (
                        <div key={gIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: '#FFFFFF', padding: '6px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--color-slate-400)', minWidth: '20px' }}>
                            #{gIdx + 1}
                          </span>
                          <input
                            type="text"
                            value={imgUrl}
                            onChange={(e) => handleGalleryItemChange(gIdx, e.target.value)}
                            placeholder={`Gallery Photo URL #${gIdx + 1} (e.g. /images/sclass_interior.png)`}
                            style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                          />
                          {imgUrl && (
                            <img
                              src={imgUrl}
                              alt={`Thumb ${gIdx + 1}`}
                              style={{ width: '42px', height: '32px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryItem(gIdx)}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              background: '#FEE2E2',
                              color: '#DC2626',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            title="Remove photo"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontStyle: 'italic', padding: '6px 0' }}>
                      No additional gallery photos yet. Click "Add Gallery Photo" above to add vehicle interior/side angles.
                    </div>
                  )}
                </div>
              </div>

              {/* ========================================================================= */}
              {/* VEHICLE PRICING & TARIFFS MANAGEMENT (DIRECT EDIT)                        */}
              {/* ========================================================================= */}
              <div style={{
                background: '#F0F9FF',
                borderRadius: '14px',
                border: '1px solid #BAE6FD',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.1rem' }}>💳</span>
                    <div>
                      <h4 style={{ fontSize: '0.94rem', fontWeight: '800', color: '#0369A1', margin: 0 }}>
                        Vehicle Tariffs & Pricing (Direct Edit)
                      </h4>
                      <span style={{ fontSize: '0.74rem', color: '#0284C7' }}>
                        Custom prices entered here immediately override standard rate tables on the showroom, vehicle detail, and booking form.
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {/* 8h / 80km Full Day */}
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E0F2FE' }}>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '800', color: '#0369A1', marginBottom: '4px' }}>
                      Local 8h / 80km Full Day (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.eight_hours_eighty_km !== undefined ? formData.eight_hours_eighty_km : ''}
                      onChange={(e) => setFormData({ ...formData, eight_hours_eighty_km: e.target.value })}
                      placeholder="e.g. 2900"
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}
                    />
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-slate-500)' }}>Primary showroom price</span>
                  </div>

                  {/* 4h / 40km Half Day */}
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E0F2FE' }}>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '800', color: '#0369A1', marginBottom: '4px' }}>
                      Local 4h / 40km Half Day (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.four_hours_forty_km !== undefined ? formData.four_hours_forty_km : ''}
                      onChange={(e) => setFormData({ ...formData, four_hours_forty_km: e.target.value })}
                      placeholder="e.g. 1800"
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}
                    />
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-slate-500)' }}>Leave empty if N/A</span>
                  </div>

                  {/* Airport Transfer */}
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E0F2FE' }}>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '800', color: '#0369A1', marginBottom: '4px' }}>
                      Airport Flat VIP Transfer (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.airport_transfer !== undefined ? formData.airport_transfer : ''}
                      onChange={(e) => setFormData({ ...formData, airport_transfer: e.target.value })}
                      placeholder="e.g. 2250"
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}
                    />
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-slate-500)' }}>Fixed pickup/drop</span>
                  </div>

                  {/* Outstation Rate / Km */}
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #B45309', marginBottom: '4px' }}>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '800', color: '#B45309', marginBottom: '4px' }}>
                      Outstation Rate / Km (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.rate_per_km !== undefined ? formData.rate_per_km : ''}
                      onChange={(e) => setFormData({ ...formData, rate_per_km: e.target.value })}
                      placeholder="e.g. 19"
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700', color: '#B45309' }}
                    />
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-slate-500)' }}>Min 300km/day standard</span>
                  </div>

                  {/* Extra Hour Charge */}
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E0F2FE' }}>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                      Extra Hour Charge (₹ / hr)
                    </label>
                    <input
                      type="number"
                      value={formData.extra_hour !== undefined ? formData.extra_hour : ''}
                      onChange={(e) => setFormData({ ...formData, extra_hour: e.target.value })}
                      placeholder="e.g. 250"
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* Extra Km Charge */}
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E0F2FE' }}>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                      Extra Distance (₹ / km)
                    </label>
                    <input
                      type="number"
                      value={formData.extra_km !== undefined ? formData.extra_km : ''}
                      onChange={(e) => setFormData({ ...formData, extra_km: e.target.value })}
                      placeholder="e.g. 19"
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* Driver Allowance / Day */}
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E0F2FE' }}>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: 'var(--color-slate-700)', marginBottom: '4px' }}>
                      Outstation Driver Allowance (₹ / day)
                    </label>
                    <input
                      type="number"
                      value={formData.driver_allowance !== undefined ? formData.driver_allowance : ''}
                      onChange={(e) => setFormData({ ...formData, driver_allowance: e.target.value })}
                      placeholder="e.g. 400"
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                    />
                  </div>
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
