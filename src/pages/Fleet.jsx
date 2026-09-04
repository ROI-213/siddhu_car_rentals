import React, { useState } from 'react';
import { Crown, Car, Users, Briefcase, Disc, Wind, ShieldCheck, Star, PhoneCall, MessageSquare, ChevronRight, CheckCircle2, Clock, Filter, Eye, LayoutGrid, Table as TableIcon, FileText } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PremiumButton } from '../components/common/PremiumButton';
import { VehicleBookingModal } from '../components/modals/VehicleBookingModal';
import { fleetData } from '../data/fleetData';
import { pricingService } from '../services/pricingService';

export const Fleet = ({ onViewVehicleDetail, onBookVehicle }) => {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [seatFilter, setSeatFilter] = useState('all');
  const [transmissionFilter, setTransmissionFilter] = useState('all');
  const [fuelFilter, setFuelFilter] = useState('all');
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState(null);

  const getTheme = (key, name) => {
    const n = name.toLowerCase();
    const c = key ? key.toLowerCase() : '';
    
    if (c.includes('luxury') || n.includes('benz') || n.includes('audi') || n.includes('bmw') || n.includes('merc')) {
      return {
        bg: '#FDFBF7',
        borderLeft: '4px solid #C5A059',
        accent: '#C5A059',
        softAccent: 'rgba(197, 160, 89, 0.15)',
        badgeVariant: 'gold',
        btnVariant: 'gold'
      };
    }
    if (c.includes('suv') || n.includes('fortuner') || n.includes('q7')) {
      return {
        bg: '#F8FAFC',
        borderLeft: '4px solid #1E293B',
        accent: '#0284C7',
        softAccent: 'rgba(2, 132, 199, 0.1)',
        badgeVariant: 'sky',
        btnVariant: 'sky'
      };
    }
    if (c.includes('sedan')) {
      return {
        bg: '#F8FAFC',
        borderLeft: '4px solid var(--accent-sky-primary)',
        accent: 'var(--accent-sky-primary)',
        softAccent: 'var(--accent-sky-soft)',
        badgeVariant: 'sky',
        btnVariant: 'sky'
      };
    }
    if (c.includes('mpv')) {
      return {
        bg: '#F0FDF4',
        borderLeft: '4px solid var(--accent-mint-primary)',
        accent: 'var(--accent-mint-primary)',
        softAccent: 'var(--accent-mint-soft)',
        badgeVariant: 'mint',
        btnVariant: 'mint'
      };
    }
    // Coach / Traveller
    return {
      bg: '#FDFBF7',
      borderLeft: '4px solid var(--accent-gold-primary)',
      accent: 'var(--accent-gold-primary)',
      softAccent: 'var(--accent-gold-soft)',
      badgeVariant: 'gold',
      btnVariant: 'gold'
    };
  };

  const filteredFleet = fleetData.filter(v => {
    if (categoryFilter !== 'all' && v.categoryKey !== categoryFilter) return false;
    if (seatFilter !== 'all' && v.seatCategory !== seatFilter) return false;
    if (transmissionFilter !== 'all' && !v.transmission.toLowerCase().includes(transmissionFilter.toLowerCase())) return false;
    if (fuelFilter !== 'all' && !v.fuelType.toLowerCase().includes(fuelFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* 1. FLEET PAGE HERO */}
      <PageHero
        badge="Executive Chauffeur Fleet"
        badgeIcon={Crown}
        title="Explore Our Complete Fleet &"
        titleHighlight="Pricing List"
        description="Browse Karnataka's premier fleet by vehicle type, passenger seating, transmission, and full transparent price breakdown with verified uniformed chauffeurs."
        breadcrumbs={['Fleets & Price List']}
        image="/images/s_class_building_front.png"
      />

      {/* 2. VIEW TOGGLE & FILTER BAR */}
      <section style={{ padding: '24px 0', background: 'var(--bg-foundation-alt)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container">
          
          {/* Top Bar with View Switcher & Price List Shortcut */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-gold-primary)' }}>
              <Filter size={16} /> Filter Fleet Vehicles
            </div>

            {/* View Mode Toggle: Showroom Cards vs Full Price List Table */}
            <div style={{ display: 'inline-flex', background: '#FFFFFF', padding: '4px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <button
                onClick={() => setViewMode('cards')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'cards' ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : 'transparent',
                  color: viewMode === 'cards' ? '#FFFFFF' : 'var(--color-slate-700)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <LayoutGrid size={15} />
                <span>Showroom Cards</span>
              </button>

              <button
                onClick={() => setViewMode('table')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'table' ? 'linear-gradient(135deg, #C5A059 0%, #B38E47 100%)' : 'transparent',
                  color: viewMode === 'table' ? '#FFFFFF' : 'var(--color-slate-700)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <TableIcon size={15} />
                <span>Fleet Price List Table</span>
              </button>
            </div>
          </div>

          <GlassCard variant="standard" style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Category Filter */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-charcoal-700)', display: 'block', marginBottom: '4px' }}>Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                >
                  <option value="all">All Vehicle Categories ({fleetData.length})</option>
                  <option value="luxury">Mercedes-Benz & Luxury Sedans</option>
                  <option value="suv">Luxury SUVs (Fortuner & Audi Q7)</option>
                  <option value="mpv">Executive MPVs (Vellfire & Innova)</option>
                  <option value="coach">VIP Vans & Coaches</option>
                </select>
              </div>

              {/* Seating Capacity Filter */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-charcoal-700)', display: 'block', marginBottom: '4px' }}>Seating Capacity</label>
                <select
                  value={seatFilter}
                  onChange={(e) => setSeatFilter(e.target.value)}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                >
                  <option value="all">All Seats</option>
                  <option value="3-4">3 - 4 Executive Seats</option>
                  <option value="5-7">5 - 7 Passenger Seats</option>
                  <option value="8-12">8 - 16 Group Seats</option>
                </select>
              </div>

              {/* Transmission Filter */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-charcoal-700)', display: 'block', marginBottom: '4px' }}>Transmission</label>
                <select
                  value={transmissionFilter}
                  onChange={(e) => setTransmissionFilter(e.target.value)}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                >
                  <option value="all">All Transmissions</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-charcoal-700)', display: 'block', marginBottom: '4px' }}>Fuel Type</label>
                <select
                  value={fuelFilter}
                  onChange={(e) => setFuelFilter(e.target.value)}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                >
                  <option value="all">All Fuel Types</option>
                  <option value="diesel">Diesel Turbo</option>
                  <option value="petrol">Petrol / Hybrid</option>
                </select>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 3. FLEET LISTING: CARDS OR FULL PRICE LIST TABLE */}
      <section className="section-padding">
        <div className="container">
          {filteredFleet.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h3 className="text-h3">No vehicles match the selected filter criteria</h3>
              <p className="text-small" style={{ margin: '8px 0 16px 0' }}>Try resetting your filter parameters to view our complete fleet.</p>
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setSeatFilter('all');
                  setTransmissionFilter('all');
                  setFuelFilter('all');
                }}
                className="btn btn-gold btn-pill"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* ========================================================= */
            /* VIEW MODE: COMPLETE FLEET PRICE LIST TABLE               */
            /* ========================================================= */
            <GlassCard variant="standard" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
              <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #090D16 0%, #151D2A 100%)', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.4rem', color: '#FFFFFF', margin: 0 }}>
                    Official Fleet Price List & Rate Breakdown
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#C5A059', marginTop: '4px' }}>
                    Bengaluru Garage to Garage • 100% Transparent Billing • KA Yellow Board Fleet
                  </div>
                </div>
                <div style={{ fontSize: '0.78rem', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
                  Showing {filteredFleet.length} Fleet Models
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '2px solid rgba(226, 232, 240, 0.9)', color: 'var(--color-slate-700)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      <th style={{ padding: '16px 20px' }}>Vehicle Model & Class</th>
                      <th style={{ padding: '16px 14px' }}>Seating</th>
                      <th style={{ padding: '16px 14px' }}>4h / 40km</th>
                      <th style={{ padding: '16px 14px' }}>8h / 80km</th>
                      <th style={{ padding: '16px 14px' }}>Extra Hr / Km</th>
                      <th style={{ padding: '16px 14px' }}>Airport Flat</th>
                      <th style={{ padding: '16px 14px' }}>Outstation Rate</th>
                      <th style={{ padding: '16px 20px', textAlign: 'right' }}>Booking Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFleet.map((vehicle, idx) => {
                      const theme = getTheme(vehicle.categoryKey, vehicle.name);
                  const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
                  const outstationTariff = pricingService.getOutstationTariff(vehicle.id) || {};
                  const halfDayStr = localTariff.four_hours_forty_km ? pricingService.formatPrice(localTariff.four_hours_forty_km) : "Not Available";
                  const fullDayStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : "Not Available";
                  const extraHrKmStr = (localTariff.extra_hour && localTariff.extra_km) ? `${pricingService.formatPrice(localTariff.extra_hour)}/hr | ${pricingService.formatPrice(localTariff.extra_km)}/km` : "N/A";
                  const airportStr = localTariff.airport_transfer ? pricingService.formatPrice(localTariff.airport_transfer) : "N/A";
                  const outstationStr = outstationTariff.rate_per_km ? `${pricingService.formatPrice(outstationTariff.rate_per_km)}/km` : "Price on Request";

                      return (
                        <tr
                          key={vehicle.id}
                          style={{
                            borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
                            background: idx % 2 === 0 ? '#FFFFFF' : '#FDFBF7',
                            transition: 'background 0.2s ease'
                          }}
                        >
                          {/* Vehicle Details */}
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                style={{ width: '64px', height: '42px', objectFit: 'contain', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}
                              />
                              <div>
                                <div style={{ fontWeight: '800', color: 'var(--color-slate-900)', fontSize: '0.94rem' }}>
                                  {vehicle.name}
                                </div>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '2px' }}>
                                  <span style={{ fontSize: '0.72rem', color: theme.accent, fontWeight: '700' }}>
                                    {vehicle.category}
                                  </span>
                                  <span style={{ fontSize: '0.66rem', background: '#FEF08A', color: '#854D0E', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                    {vehicle.regPlate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Seating */}
                          <td style={{ padding: '16px 14px', fontWeight: '600', color: 'var(--color-slate-700)' }}>
                            {vehicle.passengerCapacity}+1 Seats
                          </td>

                          {/* 4h / 40km */}
                          <td style={{ padding: '16px 14px', fontWeight: '700', color: 'var(--color-slate-900)' }}>
                            {halfDayStr}
                          </td>

                          {/* 8h / 80km */}
                          <td style={{ padding: '16px 14px', fontWeight: '800', color: '#0284C7', fontSize: '0.98rem' }}>
                            {fullDayStr}
                          </td>

                          {/* Extra Hr / Km */}
                          <td style={{ padding: '16px 14px', fontSize: '0.82rem', color: 'var(--color-slate-600)' }}>
                            {extraHrKmStr}
                          </td>

                          {/* Airport Flat */}
                          <td style={{ padding: '16px 14px', fontWeight: '700', color: '#10B981' }}>
                            {airportStr}
                          </td>

                          {/* Outstation Rate */}
                          <td style={{ padding: '16px 14px', fontWeight: '700', color: '#D97706' }}>
                            {outstationStr}
                          </td>

                          {/* Action Button */}
                          <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                            <PremiumButton
                              variant={theme.btnVariant}
                              size="sm"
                              pill
                              icon={ChevronRight}
                              iconPosition="right"
                              onClick={() => setSelectedVehicleForModal(vehicle)}
                            >
                              Book Now
                            </PremiumButton>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          ) : (
            /* ========================================================= */
            /* VIEW MODE: SHOWROOM CARDS                                */
            /* ========================================================= */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {filteredFleet.map((vehicle) => {
                const theme = getTheme(vehicle.categoryKey, vehicle.name);
                  const localTariff = pricingService.getLocalTariff(vehicle.id) || {};
                  const outstationTariff = pricingService.getOutstationTariff(vehicle.id) || {};
                  const halfDayStr = localTariff.four_hours_forty_km ? pricingService.formatPrice(localTariff.four_hours_forty_km) : "Not Available";
                  const fullDayStr = localTariff.eight_hours_eighty_km ? pricingService.formatPrice(localTariff.eight_hours_eighty_km) : "Not Available";
                  const extraHrKmStr = (localTariff.extra_hour && localTariff.extra_km) ? `${pricingService.formatPrice(localTariff.extra_hour)}/hr | ${pricingService.formatPrice(localTariff.extra_km)}/km` : "N/A";
                  const airportStr = localTariff.airport_transfer ? pricingService.formatPrice(localTariff.airport_transfer) : "N/A";
                  const outstationStr = outstationTariff.rate_per_km ? `${pricingService.formatPrice(outstationTariff.rate_per_km)}/km` : "Price on Request";

                return (
                  <GlassCard
                    key={vehicle.id}
                    variant="standard"
                    style={{
                      padding: '32px',
                      background: theme.bg,
                      borderLeft: theme.borderLeft,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      boxShadow: '0 8px 24px -12px rgba(15, 23, 42, 0.04)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
                      
                      {/* Vehicle Photo & Badge */}
                      <div>
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', background: '#FFFFFF', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                          <img src={vehicle.image} alt={vehicle.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          
                          {/* Yellow Board & Badge Top Row */}
                          

                          
                          
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {vehicle.amenities.slice(0, 4).map((item, idx) => (
                            <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--color-slate-700)', background: '#FFFFFF', padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(226, 232, 240, 0.9)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Specifications & Tariffs */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: theme.accent, fontWeight: '700' }}>
                                {vehicle.category}
                              </span>
                              <span style={{
                                background: '#FEF08A',
                                color: '#854D0E',
                                fontSize: '0.68rem',
                                fontWeight: '700',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                border: '1px solid #FDE047'
                              }}>
                                Yellow Board Taxi
                              </span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)', fontWeight: '600' }}>{vehicle.modelYear}</div>
                          </div>

                          <h3 className="text-h2" style={{ fontSize: '1.85rem', marginTop: '4px', marginBottom: '12px', fontFamily: 'var(--font-editorial)' }}>
                            {vehicle.name}
                          </h3>

                          <p className="text-small" style={{ marginBottom: '20px', lineHeight: '1.6', color: 'var(--color-slate-600)' }}>
                            {vehicle.description}
                          </p>

                          {/* Specs Grid */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '12px', background: 'rgba(255,255,255,0.6)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)', marginBottom: '20px', textAlign: 'center' }}>
                            <div>
                              <Users size={15} color={theme.accent} style={{ margin: '0 auto 4px auto' }} />
                              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-slate-800)' }}>{vehicle.passengerCapacity}+1 Seats</div>
                            </div>
                            <div>
                              <Briefcase size={15} color={theme.accent} style={{ margin: '0 auto 4px auto' }} />
                              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-slate-800)' }}>{vehicle.luggageCapacity} Bags</div>
                            </div>
                            <div>
                              <Disc size={15} color={theme.accent} style={{ margin: '0 auto 4px auto' }} />
                              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-slate-800)' }}>{vehicle.transmission}</div>
                            </div>
                            <div>
                              <Wind size={15} color={theme.accent} style={{ margin: '0 auto 4px auto' }} />
                              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-slate-800)' }}>{vehicle.ac}</div>
                            </div>
                          </div>

                          {/* Rates Summary Row */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.7)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                            <div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--color-slate-500)', textTransform: 'uppercase', fontWeight: '600' }}>Local Flat (8h/80km)</div>
                              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-slate-900)' }}>{fullDayStr}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '0.7rem', color: 'var(--color-slate-500)', textTransform: 'uppercase', fontWeight: '600' }}>Outstation Rate</div>
                              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: theme.accent }}>{outstationStr}</div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                          <button
                            onClick={() => onViewVehicleDetail && onViewVehicleDetail(vehicle)}
                            className="btn btn-glass btn-pill"
                            style={{ fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Eye size={15} />
                            <span>Explore Details</span>
                          </button>

                          <PremiumButton
                            variant={theme.btnVariant}
                            size="md"
                            pill
                            icon={ChevronRight}
                            iconPosition="right"
                            onClick={() => setSelectedVehicleForModal(vehicle)}
                          >
                            Book This Vehicle
                          </PremiumButton>
                        </div>

                      </div>

                    </div>
                  </GlassCard>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <VehicleBookingModal
        vehicle={selectedVehicleForModal}
        isOpen={Boolean(selectedVehicleForModal)}
        onClose={() => setSelectedVehicleForModal(null)}
      />

    </div>
  );
};



