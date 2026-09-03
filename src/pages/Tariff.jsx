import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  MapPin, 
  Calendar, 
  Search, 
  ChevronRight, 
  Car, 
  Clock, 
  ShieldCheck, 
  PhoneCall, 
  MessageSquare, 
  CheckCircle2, 
  Filter, 
  Plane, 
  Compass, 
  ArrowUpDown,
  RefreshCw,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { SectionHeader } from '../components/common/SectionHeader';
import { tariffApi, formatCurrency } from '../services/tariffApi';

export const Tariff = ({ onSelectVehicleForBooking }) => {
  const [activeCategory, setActiveCategory] = useState('disposal'); // 'disposal' | 'outstation'
  const [tariffs, setTariffs] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  useEffect(() => {
    fetchTariffsAndTerms();
  }, [activeCategory]);

  const fetchTariffsAndTerms = async () => {
    setLoading(true);
    try {
      const [tariffsData, termsData] = await Promise.all([
        tariffApi.getTariffs({ usage_type: activeCategory, all: false }),
        tariffApi.getTerms()
      ]);
      setTariffs(tariffsData);
      setTerms(termsData);
    } catch (err) {
      console.error('Error fetching tariff data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Capacity categorization helper for filter
  const filterByCapacity = (variant) => {
    const v = variant.toLowerCase();
    if (capacityFilter === 'sedan') {
      return v.includes('zire') || v.includes('amaze') || v.includes('indigo') || v.includes('etios') || v.includes('camry') || v.includes('accord') || v.includes('class') || v.includes('5"') || v.includes('7"') || v.includes('a6') || v.includes('a8');
    }
    if (capacityFilter === 'suv') {
      return v.includes('innova') || v.includes('ertiga') || v.includes('carnes') || v.includes('crysta') || v.includes('hycross') || v.includes('fortuner') || v.includes('q7') || v.includes('vellfie');
    }
    if (capacityFilter === 'tempo_bus') {
      return v.includes('traveller') || v.includes('urbania') || v.includes('commuter') || v.includes('bus');
    }
    return true;
  };

  const filteredTariffs = tariffs.filter(t => {
    const matchesSearch = 
      t.vehicle_variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.service_type && t.service_type.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCapacity = filterByCapacity(t.vehicle_variant);
    return matchesSearch && matchesCapacity;
  });

  const handleBookVehicle = (variant) => {
    if (onSelectVehicleForBooking) {
      onSelectVehicleForBooking(variant);
    } else {
      window.location.href = `https://wa.me/917625059665?text=Hello%20Siddhu%20Car%20Rentals,%20I%20would%20like%20to%20enquire%20about%20tariff%20and%20booking%20for%20${encodeURIComponent(variant)}%20(${activeCategory.toUpperCase()}%20Bangalore).`;
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO BANNER */}
      <PageHero
        badge="Official Rate Card • FY 2026"
        badgeIcon={FileText}
        title="Complete Fleet Price List & Rates"
        titleHighlight="in Bengaluru"
        description="Explore Bengaluru's most competitive, all-inclusive luxury car rental and fleet pricing. Guaranteed pristine fleet, verified chauffeurs, and 100% transparent pricing."
        breadcrumbs={['Fleet Pricing & Rate Card']}
        image="/images/indian_hotel_driveway.jpg"
      />

      {/* 2. MAIN FLEET PRICE LIST SECTION */}
      <section className="section-padding" style={{ background: 'var(--bg-foundation)' }}>
        <div className="container">
          
          {/* Header & Meta Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', marginBottom: '36px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  padding: '6px 14px', 
                  borderRadius: '9999px', 
                  background: 'rgba(2, 132, 199, 0.1)', 
                  color: 'var(--accent-sky-primary)', 
                  fontWeight: '700', 
                  fontSize: '0.85rem' 
                }}>
                  <MapPin size={15} /> Location: BANGALORE
                </span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  padding: '6px 14px', 
                  borderRadius: '9999px', 
                  background: 'rgba(197, 160, 89, 0.12)', 
                  color: 'var(--accent-gold-primary)', 
                  fontWeight: '700', 
                  fontSize: '0.85rem' 
                }}>
                  <ShieldCheck size={15} /> Service: Garage to Garage
                </span>
              </div>
              <h2 className="text-h2" style={{ color: 'var(--color-slate-900)' }}>
                {activeCategory === 'disposal' ? '1. LOCAL CITY FLEET PRICE LIST' : '2. OUTSTATION HIGHWAY FLEET RATES'}
              </h2>
              <p className="text-body" style={{ color: 'var(--color-slate-600)', marginTop: '4px' }}>
                {activeCategory === 'disposal' 
                  ? 'City hourly packages (4 Hrs/40 Kms, 8 Hrs/80 Kms, Airport transfers & Night Bata).' 
                  : 'Intercity outstation journeys with minimum kilometer slabs and driver allowances.'}
              </p>
            </div>

            {/* Category Switcher Tabs */}
            <div style={{ 
              display: 'inline-flex', 
              background: '#FFFFFF', 
              padding: '6px', 
              borderRadius: '16px', 
              border: '1px solid rgba(226, 232, 240, 0.9)', 
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)' 
            }}>
              <button
                onClick={() => setActiveCategory('disposal')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeCategory === 'disposal' ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : 'transparent',
                  color: activeCategory === 'disposal' ? '#FFFFFF' : 'var(--color-slate-700)',
                  fontWeight: '700',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <Clock size={17} />
                <span>Local City Packages</span>
              </button>
              <button
                onClick={() => setActiveCategory('outstation')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeCategory === 'outstation' ? 'linear-gradient(135deg, #C5A059 0%, #B38E47 100%)' : 'transparent',
                  color: activeCategory === 'outstation' ? '#FFFFFF' : 'var(--color-slate-700)',
                  fontWeight: '700',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <Compass size={17} />
                <span>Outstation Highway Rates</span>
              </button>
            </div>
          </div>

          {/* Search, Capacity Filter & View Switcher Bar */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px 20px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '28px'
          }}>
            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 280px', minWidth: '240px', background: 'var(--bg-foundation-alt)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
              <Search size={18} color="var(--color-slate-400)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vehicle model (e.g. Innova, Urbania, Mercedes, Fortuner)..."
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--color-slate-900)' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-slate-400)', fontSize: '0.8rem' }}>
                  ✕
                </button>
              )}
            </div>

            {/* Capacity Filter Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <SlidersHorizontal size={14} /> Filter:
              </span>
              {[
                { id: 'all', label: 'All Fleet' },
                { id: 'sedan', label: 'Sedans & Luxury' },
                { id: 'suv', label: 'SUVs & MPVs' },
                { id: 'tempo_bus', label: 'Travellers & Buses' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCapacityFilter(tab.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: capacityFilter === tab.id ? '700' : '500',
                    border: '1px solid',
                    borderColor: capacityFilter === tab.id ? 'var(--accent-sky-primary)' : 'rgba(226, 232, 240, 0.8)',
                    background: capacityFilter === tab.id ? 'rgba(2, 132, 199, 0.1)' : '#FFFFFF',
                    color: capacityFilter === tab.id ? 'var(--accent-sky-primary)' : 'var(--color-slate-700)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle (Mobile / Desktop) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-foundation-alt)', padding: '4px', borderRadius: '10px' }}>
              <button
                onClick={() => setViewMode('table')}
                title="Table View"
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'table' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'table' ? 'var(--accent-sky-primary)' : 'var(--color-slate-500)',
                  boxShadow: viewMode === 'table' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                <TableIcon size={16} />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                title="Card View"
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'cards' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'cards' ? 'var(--accent-sky-primary)' : 'var(--color-slate-500)',
                  boxShadow: viewMode === 'cards' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

          {/* 3. TARIFF CONTENT AREA */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <RefreshCw size={36} color="var(--accent-sky-primary)" className="spin-animation" style={{ margin: '0 auto 16px auto' }} />
              <p style={{ color: 'var(--color-slate-600)', fontWeight: '600' }}>Fetching live tariff data from PostgreSQL database...</p>
            </div>
          ) : filteredTariffs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
              <Car size={42} color="var(--color-slate-300)" style={{ margin: '0 auto 12px auto' }} />
              <h3 className="text-h3" style={{ color: 'var(--color-slate-800)' }}>No vehicles found matching "{searchQuery}"</h3>
              <p style={{ color: 'var(--color-slate-500)', marginTop: '6px' }}>Try adjusting your search query or category filter.</p>
              <button onClick={() => { setSearchQuery(''); setCapacityFilter('all'); }} style={{ marginTop: '16px', padding: '8px 18px', borderRadius: '8px', background: 'var(--accent-sky-primary)', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* TABLE VIEW (Horizontally scrollable for responsiveness) */}
              {viewMode === 'table' && (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  marginBottom: '40px'
                }}>
                  <div style={{ overflowX: 'auto' }}>
                    {activeCategory === 'disposal' ? (
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '940px' }}>
                        <thead>
                          <tr style={{ background: '#12151C', color: '#FFFFFF', borderBottom: '2px solid #C5A059' }}>
                            <th style={{ padding: '16px 20px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>#</th>
                            <th style={{ padding: '16px 20px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Vehicle Variant</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Service Type</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>4 hrs / 40 km</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>8 hrs / 80 km</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>Extra Hour</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>Extra KM</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>Night Local Bata</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>Airport Transfer</th>
                            <th style={{ padding: '16px 20px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTariffs.map((t, idx) => (
                            <tr
                              key={t.id || idx}
                              style={{
                                borderBottom: '1px solid rgba(226, 232, 240, 0.7)',
                                background: idx % 2 === 0 ? '#FFFFFF' : 'rgba(250, 249, 246, 0.6)',
                                transition: 'background-color 0.2s ease'
                              }}
                              className="tariff-table-row"
                            >
                              <td style={{ padding: '16px 20px', fontSize: '0.88rem', color: 'var(--color-slate-400)', fontWeight: '600' }}>
                                {idx + 1}
                              </td>
                              <td style={{ padding: '16px 20px', fontSize: '0.94rem', fontWeight: '700', color: 'var(--color-slate-900)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5A059' }} />
                                  <span>{t.vehicle_variant}</span>
                                </div>
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.85rem', color: 'var(--color-slate-600)' }}>
                                {t.service_type || 'Garage to Garage'}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.92rem', fontWeight: '600', color: t.four_hours_forty_km ? 'var(--color-slate-900)' : 'var(--color-slate-400)', textAlign: 'right' }}>
                                {formatCurrency(t.four_hours_forty_km)}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.95rem', fontWeight: '700', color: 'var(--accent-sky-primary)', textAlign: 'right' }}>
                                {formatCurrency(t.eight_hours_eighty_km)}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.88rem', color: 'var(--color-slate-700)', textAlign: 'right' }}>
                                {formatCurrency(t.extra_hour, ' / Hr')}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.88rem', color: 'var(--color-slate-700)', textAlign: 'right' }}>
                                {formatCurrency(t.extra_km, ' / KM')}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.88rem', color: 'var(--color-slate-700)', textAlign: 'right' }}>
                                {formatCurrency(t.night_local_bata)}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.92rem', fontWeight: '700', color: '#16A34A', textAlign: 'right' }}>
                                {formatCurrency(t.airport_transfer)}
                              </td>
                              <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                <button
                                  onClick={() => handleBookVehicle(t.vehicle_variant)}
                                  style={{
                                    padding: '6px 14px',
                                    borderRadius: '8px',
                                    background: '#12151C',
                                    color: '#C5A059',
                                    border: '1px solid #C5A059',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s ease',
                                    whiteSpace: 'nowrap'
                                  }}
                                  onMouseEnter={(e) => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.color = '#FFFFFF'; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.background = '#12151C'; e.currentTarget.style.color = '#C5A059'; }}
                                >
                                  <span>Enquire</span>
                                  <ChevronRight size={13} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '820px' }}>
                        <thead>
                          <tr style={{ background: '#12151C', color: '#FFFFFF', borderBottom: '2px solid #C5A059' }}>
                            <th style={{ padding: '16px 20px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>#</th>
                            <th style={{ padding: '16px 20px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Vehicle Variant</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Service Type</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>Min. KM Per Day</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>Rate / KM</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>Extra KM</th>
                            <th style={{ padding: '16px 16px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right' }}>Driver Allowance</th>
                            <th style={{ padding: '16px 20px', fontSize: '0.84rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTariffs.map((t, idx) => (
                            <tr
                              key={t.id || idx}
                              style={{
                                borderBottom: '1px solid rgba(226, 232, 240, 0.7)',
                                background: idx % 2 === 0 ? '#FFFFFF' : 'rgba(250, 249, 246, 0.6)',
                                transition: 'background-color 0.2s ease'
                              }}
                              className="tariff-table-row"
                            >
                              <td style={{ padding: '16px 20px', fontSize: '0.88rem', color: 'var(--color-slate-400)', fontWeight: '600' }}>
                                {idx + 1}
                              </td>
                              <td style={{ padding: '16px 20px', fontSize: '0.94rem', fontWeight: '700', color: 'var(--color-slate-900)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5A059' }} />
                                  <span>{t.vehicle_variant}</span>
                                </div>
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.85rem', color: 'var(--color-slate-600)' }}>
                                {t.service_type || 'Garage to Garage'}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.92rem', fontWeight: '600', color: 'var(--color-slate-900)', textAlign: 'right' }}>
                                {t.minimum_km_per_day ? `${t.minimum_km_per_day} KM` : 'N/A'}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.95rem', fontWeight: '700', color: 'var(--accent-gold-primary)', textAlign: 'right' }}>
                                {formatCurrency(t.rate_per_km, ' / KM')}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.88rem', color: 'var(--color-slate-700)', textAlign: 'right' }}>
                                {formatCurrency(t.outstation_extra_km, ' / KM')}
                              </td>
                              <td style={{ padding: '16px 16px', fontSize: '0.92rem', fontWeight: '700', color: '#0284C7', textAlign: 'right' }}>
                                {formatCurrency(t.driver_allowance, ' / Day')}
                              </td>
                              <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                <button
                                  onClick={() => handleBookVehicle(t.vehicle_variant)}
                                  style={{
                                    padding: '6px 14px',
                                    borderRadius: '8px',
                                    background: '#12151C',
                                    color: '#C5A059',
                                    border: '1px solid #C5A059',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s ease',
                                    whiteSpace: 'nowrap'
                                  }}
                                  onMouseEnter={(e) => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.color = '#FFFFFF'; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.background = '#12151C'; e.currentTarget.style.color = '#C5A059'; }}
                                >
                                  <span>Enquire</span>
                                  <ChevronRight size={13} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* CARD VIEW (Great on mobile or grid layout) */}
              {viewMode === 'cards' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px',
                  marginBottom: '40px'
                }}>
                  {filteredTariffs.map((t, idx) => (
                    <GlassCard key={t.id || idx} variant="interactive" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#C5A059', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Variant #{idx + 1}
                          </span>
                          <span style={{ fontSize: '0.72rem', background: 'rgba(2, 132, 199, 0.08)', color: 'var(--accent-sky-primary)', padding: '3px 8px', borderRadius: '6px', fontWeight: '600' }}>
                            {t.service_type || 'Garage to Garage'}
                          </span>
                        </div>

                        <h3 className="text-h3" style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--color-slate-900)' }}>
                          {t.vehicle_variant}
                        </h3>

                        {activeCategory === 'disposal' ? (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px', background: 'var(--bg-foundation-alt)', padding: '14px', borderRadius: '12px' }}>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>4 hrs / 40 km</span>
                              <strong style={{ fontSize: '0.95rem', color: t.four_hours_forty_km ? 'var(--color-slate-900)' : 'var(--color-slate-400)' }}>
                                {formatCurrency(t.four_hours_forty_km)}
                              </strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>8 hrs / 80 km</span>
                              <strong style={{ fontSize: '1rem', color: 'var(--accent-sky-primary)' }}>
                                {formatCurrency(t.eight_hours_eighty_km)}
                              </strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>Extra Hour</span>
                              <strong style={{ fontSize: '0.88rem', color: 'var(--color-slate-700)' }}>
                                {formatCurrency(t.extra_hour, '/hr')}
                              </strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>Extra KM</span>
                              <strong style={{ fontSize: '0.88rem', color: 'var(--color-slate-700)' }}>
                                {formatCurrency(t.extra_km, '/km')}
                              </strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>Night Local Bata</span>
                              <strong style={{ fontSize: '0.88rem', color: 'var(--color-slate-700)' }}>
                                {formatCurrency(t.night_local_bata)}
                              </strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>Airport Transfer</span>
                              <strong style={{ fontSize: '0.95rem', color: '#16A34A' }}>
                                {formatCurrency(t.airport_transfer)}
                              </strong>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px', background: 'var(--bg-foundation-alt)', padding: '14px', borderRadius: '12px' }}>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>Min KM Per Day</span>
                              <strong style={{ fontSize: '0.95rem', color: 'var(--color-slate-900)' }}>
                                {t.minimum_km_per_day ? `${t.minimum_km_per_day} KM` : 'N/A'}
                              </strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>Rate / KM</span>
                              <strong style={{ fontSize: '1.05rem', color: 'var(--accent-gold-primary)' }}>
                                {formatCurrency(t.rate_per_km, ' / KM')}
                              </strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>Extra KM</span>
                              <strong style={{ fontSize: '0.88rem', color: 'var(--color-slate-700)' }}>
                                {formatCurrency(t.outstation_extra_km, ' / KM')}
                              </strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)', display: 'block' }}>Driver Allowance</span>
                              <strong style={{ fontSize: '0.95rem', color: '#0284C7' }}>
                                {formatCurrency(t.driver_allowance, ' / Day')}
                              </strong>
                            </div>
                          </div>
                        )}
                      </div>

                      <PremiumButton
                        variant="dark"
                        size="sm"
                        fullWidth
                        icon={ChevronRight}
                        iconPosition="right"
                        onClick={() => handleBookVehicle(t.vehicle_variant)}
                      >
                        Reserve & Get Quote
                      </PremiumButton>
                    </GlassCard>
                  ))}
                </div>
              )}
            </>
          )}

          {/* 4. TERMS AND CONDITIONS SECTION */}
          <div style={{ marginTop: '48px' }}>
            <SectionHeader
              badge="Official Rental Policies"
              badgeIcon={FileText}
              title="Terms & Conditions"
              titleHighlight="Bangalore Operations"
              description="Standard terms applicable to all corporate, retail, disposal, and outstation bookings."
              align="left"
            />

            <GlassCard variant="standard" style={{ padding: '32px 36px', background: '#FFFFFF', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {terms.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(197, 160, 89, 0.15)',
                      color: 'var(--accent-gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {item.clause_key}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-slate-700)', lineHeight: '1.6' }}>
                      {item.clause_text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Assurance Banner */}
              <div style={{
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(226, 232, 240, 0.8)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#16A34A" />
                  <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-slate-800)' }}>
                    All vehicles sanitized, GPS-enabled with courteous verified chauffeurs.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href="tel:+917625059665"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: '#12151C',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: '0.84rem',
                      fontWeight: '600'
                    }}
                  >
                    <PhoneCall size={14} color="#C5A059" />
                    <span>Call 7625059665</span>
                  </a>
                  <a
                    href="https://wa.me/917625059665"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: '0.84rem',
                      fontWeight: '600'
                    }}
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp Booking</span>
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

        </div>
      </section>

      <style>{`
        .tariff-table-row:hover {
          background-color: rgba(2, 132, 199, 0.04) !important;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>

    </div>
  );
};
