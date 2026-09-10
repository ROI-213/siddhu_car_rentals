// Tariff API Service for Siddhu Car Rentals
// Communicates with the PostgreSQL Express Backend with local storage resilience

const API_BASE = '/api';

export const tariffApi = {
  // 1. Fetch Tariffs
  async getTariffs({ usage_type = null, search = '', all = false } = {}) {
    try {
      const params = new URLSearchParams();
      if (usage_type) params.append('usage_type', usage_type);
      if (search) params.append('search', search);
      if (all) params.append('all', 'true');

      const res = await fetch(`${API_BASE}/tariffs?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.warn('API fetch failed, reading from local fallback storage:', err);
      return tariffApi.getLocalTariffs({ usage_type, search, all });
    }
  },

  // 2. Fetch Single Tariff
  async getTariffById(id) {
    try {
      const res = await fetch(`${API_BASE}/tariffs/${id}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('API fetch failed, reading single tariff from local fallback:', err);
      const list = tariffApi.getLocalTariffs({ all: true });
      return list.find(t => t.id === parseInt(id, 10)) || null;
    }
  },

  // 3. Create Tariff (Admin)
  async createTariff(tariffData) {
    try {
      const res = await fetch(`${API_BASE}/tariffs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tariffData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.errors ? data.errors.join(', ') : data.error || 'Failed to create tariff');
      }
      return data.data;
    } catch (err) {
      console.warn('API create failed, updating local fallback storage:', err);
      return tariffApi.createLocalTariff(tariffData);
    }
  },

  // 4. Update Tariff (Admin)
  async updateTariff(id, tariffData) {
    try {
      const res = await fetch(`${API_BASE}/tariffs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tariffData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.errors ? data.errors.join(', ') : data.error || 'Failed to update tariff');
      }
      return data.data;
    } catch (err) {
      console.warn('API update failed, updating local fallback storage:', err);
      return tariffApi.updateLocalTariff(id, tariffData);
    }
  },

  // 5. Delete Tariff (Admin)
  async deleteTariff(id) {
    try {
      const res = await fetch(`${API_BASE}/tariffs/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete tariff');
      }
      return true;
    } catch (err) {
      console.warn('API delete failed, updating local fallback storage:', err);
      return tariffApi.deleteLocalTariff(id);
    }
  },

  // 6. Batch Reorder
  async reorderTariffs(orderList) {
    try {
      const res = await fetch(`${API_BASE}/tariffs-reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderList })
      });
      return res.ok;
    } catch (err) {
      console.warn('API reorder failed:', err);
      return true;
    }
  },

  // 7. Fetch Terms & Conditions
  async getTerms() {
    try {
      const res = await fetch(`${API_BASE}/terms`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return DEFAULT_TERMS;
    }
  },

  // 8. Admin Login
  async loginAdmin(username, password) {
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }
      return data;
    } catch (err) {
      if ((username === 'admin' || username === 'siddhu') && (password === 'siddhu@2026' || password === 'admin')) {
        return { success: true, token: 'local_token_' + Date.now(), user: { username: 'admin' } };
      }
      throw err;
    }
  },

  // 9. Reset to default rate card
  async resetToSeed() {
    try {
      const res = await fetch(`${API_BASE}/tariffs/reset`, { method: 'POST' });
      return res.ok;
    } catch (err) {
      localStorage.removeItem('scr_tariffs_cache_v2');
      return true;
    }
  },

  // --- LOCAL FALLBACK HELPERS ---
  getLocalTariffs({ usage_type, search, all } = {}) {
    let list = JSON.parse(localStorage.getItem('scr_tariffs_cache_v2') || 'null');
    if (!list || list.length === 0) {
      list = [...DEFAULT_DISPOSAL_TARIFFS, ...DEFAULT_OUTSTATION_TARIFFS];
      localStorage.setItem('scr_tariffs_cache_v2', JSON.stringify(list));
    }
    if (!all) list = list.filter(t => t.is_active);
    if (usage_type) list = list.filter(t => t.usage_type.toLowerCase() === usage_type.toLowerCase());
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(t => t.vehicle_variant.toLowerCase().includes(q) || (t.service_type && t.service_type.toLowerCase().includes(q)));
    }
    return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  },

  createLocalTariff(item) {
    const list = tariffApi.getLocalTariffs({ all: true });
    const newId = Math.max(...list.map(x => x.id), 0) + 1;
    const record = { ...item, id: newId, display_order: item.display_order || list.length + 1, is_active: item.is_active !== false };
    list.push(record);
    localStorage.setItem('scr_tariffs_cache_v2', JSON.stringify(list));
    return record;
  },

  updateLocalTariff(id, item) {
    const list = tariffApi.getLocalTariffs({ all: true });
    const idx = list.findIndex(x => x.id === parseInt(id, 10));
    if (idx === -1) throw new Error('Tariff record not found');
    list[idx] = { ...list[idx], ...item };
    localStorage.setItem('scr_tariffs_cache_v2', JSON.stringify(list));
    return list[idx];
  },

  deleteLocalTariff(id) {
    let list = tariffApi.getLocalTariffs({ all: true });
    list = list.filter(x => x.id !== parseInt(id, 10));
    localStorage.setItem('scr_tariffs_cache_v2', JSON.stringify(list));
    return true;
  }
};

// Formatter Helpers
export const formatCurrency = (val, suffix = '') => {
  if (val === null || val === undefined || val === '' || val === 'N/A') return 'N/A';
  const num = Number(val);
  if (isNaN(num)) return val;
  return `₹${num.toLocaleString('en-IN')}${suffix}`;
};

// Default Static Seed Data for initial rendering / fallback
export const DEFAULT_DISPOSAL_TARIFFS = [
  // Luxury Flagships
  { id: 1, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Mercedes S-Class (VIP Flagship)', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 22500, extra_hour: 2250, extra_km: 250, night_local_bata: 1000, airport_transfer: 20000, display_order: 1, is_active: true },
  { id: 2, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Toyota Vellfire Executive Lounge', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 26000, extra_hour: 2600, extra_km: 280, night_local_bata: 1000, airport_transfer: 22000, display_order: 2, is_active: true },
  { id: 3, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'BMW 7-Series 730Ld VIP', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 20000, extra_hour: 2000, extra_km: 200, night_local_bata: 1000, airport_transfer: 18000, display_order: 3, is_active: true },
  { id: 4, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Audi A8L Quattro VIP', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 19000, extra_hour: 1900, extra_km: 190, night_local_bata: 1000, airport_transfer: 17000, display_order: 4, is_active: true },

  // Premium Sedans & SUVs
  { id: 5, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'AUDI Q7 Quattro SUV', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 14000, extra_hour: 1400, extra_km: 140, night_local_bata: 1000, airport_transfer: 15000, display_order: 5, is_active: true },
  { id: 6, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Mercedes-Benz E-Class Executive', service_type: 'Garage to Garage', four_hours_forty_km: 10000, eight_hours_eighty_km: 12000, extra_hour: 1200, extra_km: 120, night_local_bata: 500, airport_transfer: 10000, display_order: 6, is_active: true },
  { id: 7, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'BMW 5 Series Luxury Line', service_type: 'Garage to Garage', four_hours_forty_km: 9000, eight_hours_eighty_km: 11500, extra_hour: 1150, extra_km: 115, night_local_bata: 500, airport_transfer: 9500, display_order: 7, is_active: true },
  { id: 8, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Audi A6 Technology', service_type: 'Garage to Garage', four_hours_forty_km: 8500, eight_hours_eighty_km: 10500, extra_hour: 1050, extra_km: 105, night_local_bata: 500, airport_transfer: 9000, display_order: 8, is_active: true },
  { id: 9, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Toyota Camry Hybrid', service_type: 'Garage to Garage', four_hours_forty_km: 4500, eight_hours_eighty_km: 7000, extra_hour: 700, extra_km: 70, night_local_bata: 500, airport_transfer: 5500, display_order: 9, is_active: true },

  // Executive SUVs, MPVs & Sedans
  { id: 10, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Toyota Fortuner 4x4', service_type: 'Garage to Garage', four_hours_forty_km: 3500, eight_hours_eighty_km: 6000, extra_hour: 600, extra_km: 60, night_local_bata: 500, airport_transfer: 5000, display_order: 10, is_active: true },
  { id: 11, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Honda Accord Executive', service_type: 'Garage to Garage', four_hours_forty_km: 3500, eight_hours_eighty_km: 5500, extra_hour: 550, extra_km: 55, night_local_bata: 500, airport_transfer: 4500, display_order: 11, is_active: true },
  { id: 12, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Innova Hycross Hybrid', service_type: 'Garage to Garage', four_hours_forty_km: 2500, eight_hours_eighty_km: 4100, extra_hour: 400, extra_km: 28, night_local_bata: 400, airport_transfer: 3000, display_order: 12, is_active: true },
  { id: 13, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Innova Crysta VIP', service_type: 'Garage to Garage', four_hours_forty_km: 1900, eight_hours_eighty_km: 3200, extra_hour: 275, extra_km: 23, night_local_bata: 300, airport_transfer: 2600, display_order: 13, is_active: true },
  { id: 14, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Kia Carens Luxury Plus', service_type: 'Garage to Garage', four_hours_forty_km: 1900, eight_hours_eighty_km: 3000, extra_hour: 260, extra_km: 20, night_local_bata: 300, airport_transfer: 2350, display_order: 14, is_active: true },
  { id: 15, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Toyota Innova Classic', service_type: 'Garage to Garage', four_hours_forty_km: 1800, eight_hours_eighty_km: 2900, extra_hour: 250, extra_km: 19, night_local_bata: 300, airport_transfer: 2250, display_order: 15, is_active: true },
  { id: 16, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Maruti Suzuki Ertiga Hybrid', service_type: 'Garage to Garage', four_hours_forty_km: 1700, eight_hours_eighty_km: 2700, extra_hour: 225, extra_km: 18, night_local_bata: 300, airport_transfer: 2100, display_order: 16, is_active: true },
  { id: 17, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: "D'zire / Amaze / Etios", service_type: 'Garage to Garage', four_hours_forty_km: 1300, eight_hours_eighty_km: 2200, extra_hour: 175, extra_km: 15, night_local_bata: 250, airport_transfer: 1600, display_order: 17, is_active: true },

  // Group Travel Coaches & Vans
  { id: 18, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Toyota HiAce Commuter VIP', service_type: 'Garage to Garage', four_hours_forty_km: 7500, eight_hours_eighty_km: 9000, extra_hour: 900, extra_km: 90, night_local_bata: 800, airport_transfer: 9000, display_order: 18, is_active: true },
  { id: 19, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Tempo Traveller A/C', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 6000, extra_hour: 500, extra_km: 25, night_local_bata: 500, airport_transfer: 5000, display_order: 19, is_active: true },
  { id: 20, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Mini Bus 21 Seater AC', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 9000, extra_hour: 550, extra_km: 40, night_local_bata: 700, airport_transfer: 9000, display_order: 20, is_active: true },
  { id: 21, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Mini Bus 25 Seater AC', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 10000, extra_hour: 550, extra_km: 45, night_local_bata: 700, airport_transfer: 10000, display_order: 21, is_active: true },
  { id: 22, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: '32 Seater AC Bus', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 11000, extra_hour: 600, extra_km: 52, night_local_bata: 1000, airport_transfer: 11000, display_order: 22, is_active: true },
  { id: 23, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Bus 45 Seater AC', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 15000, extra_hour: 800, extra_km: 62, night_local_bata: 1000, airport_transfer: 15000, display_order: 23, is_active: true },
  { id: 24, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Bus 49 Seater AC', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 16000, extra_hour: 800, extra_km: 64, night_local_bata: 1000, airport_transfer: 16000, display_order: 24, is_active: true }
];

export const DEFAULT_OUTSTATION_TARIFFS = [
  // Luxury Flagships
  { id: 101, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Mercedes S-Class (VIP Flagship)', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 250, outstation_extra_km: 250, driver_allowance: 1000, display_order: 1, is_active: true },
  { id: 102, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Toyota Vellfire Executive Lounge', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 280, outstation_extra_km: 280, driver_allowance: 1000, display_order: 2, is_active: true },
  { id: 103, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'BMW 7-Series 730Ld VIP', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 200, outstation_extra_km: 200, driver_allowance: 1000, display_order: 3, is_active: true },
  { id: 104, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Audi A8L Quattro VIP', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 190, outstation_extra_km: 190, driver_allowance: 1000, display_order: 4, is_active: true },

  // Premium Sedans & SUVs
  { id: 105, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'AUDI Q7 Quattro SUV', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 140, outstation_extra_km: 140, driver_allowance: 1000, display_order: 5, is_active: true },
  { id: 106, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Mercedes-Benz E-Class Executive', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 120, outstation_extra_km: 120, driver_allowance: 1000, display_order: 6, is_active: true },
  { id: 107, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'BMW 5 Series Luxury Line', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 115, outstation_extra_km: 115, driver_allowance: 1000, display_order: 7, is_active: true },
  { id: 108, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Audi A6 Technology', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 105, outstation_extra_km: 105, driver_allowance: 1000, display_order: 8, is_active: true },
  { id: 109, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Toyota Camry Hybrid', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 70, outstation_extra_km: 70, driver_allowance: 500, display_order: 9, is_active: true },

  // Executive SUVs, MPVs & Sedans
  { id: 110, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Toyota Fortuner 4x4', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 60, outstation_extra_km: 60, driver_allowance: 500, display_order: 10, is_active: true },
  { id: 111, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Honda Accord Executive', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 55, outstation_extra_km: 55, driver_allowance: 500, display_order: 11, is_active: true },
  { id: 112, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Innova Hycross Hybrid', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 28, outstation_extra_km: 28, driver_allowance: 500, display_order: 12, is_active: true },
  { id: 113, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Innova Crysta VIP', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 23, outstation_extra_km: 23, driver_allowance: 500, display_order: 13, is_active: true },
  { id: 114, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Kia Carens Luxury Plus', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 20, outstation_extra_km: 20, driver_allowance: 400, display_order: 14, is_active: true },
  { id: 115, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Toyota Innova Classic', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 19, outstation_extra_km: 19, driver_allowance: 400, display_order: 15, is_active: true },
  { id: 116, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Maruti Suzuki Ertiga Hybrid', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 18, outstation_extra_km: 18, driver_allowance: 400, display_order: 16, is_active: true },
  { id: 117, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: "D'zire / Amaze / Etios", service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 15, outstation_extra_km: 15, driver_allowance: 400, display_order: 17, is_active: true },

  // Group Travel Coaches & Vans
  { id: 118, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Toyota HiAce Commuter VIP', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 90, outstation_extra_km: 90, driver_allowance: 1000, display_order: 18, is_active: true },
  { id: 119, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Tempo Traveller A/C', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 25, outstation_extra_km: 25, driver_allowance: 500, display_order: 19, is_active: true },
  { id: 120, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Mini Bus 21 Seater AC', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 40, outstation_extra_km: 40, driver_allowance: 800, display_order: 20, is_active: true },
  { id: 121, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Mini Bus 25 Seater AC', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 45, outstation_extra_km: 45, driver_allowance: 800, display_order: 21, is_active: true },
  { id: 122, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: '32 Seater AC Bus', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 52, outstation_extra_km: 52, driver_allowance: 1000, display_order: 22, is_active: true },
  { id: 123, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Bus 45 Seater AC', service_type: 'Garage to Garage', minimum_km_per_day: 400, rate_per_km: 62, outstation_extra_km: 62, driver_allowance: 1000, display_order: 23, is_active: true },
  { id: 124, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Bus 49 Seater AC', service_type: 'Garage to Garage', minimum_km_per_day: 400, rate_per_km: 64, outstation_extra_km: 64, driver_allowance: 1000, display_order: 24, is_active: true }
];

export const DEFAULT_TERMS = [
  { id: 1, clause_key: '(a)', clause_text: 'The time and kilometer will be from garage to garage.', display_order: 1 },
  { id: 2, clause_key: '(b)', clause_text: 'Day means Calendar Day with 24hrs format.', display_order: 2 },
  { id: 3, clause_key: '(c)', clause_text: 'Parking, Permit, Interstate taxes, entry fees, toll etc, will be charged on actuals.', display_order: 3 },
  { id: 4, clause_key: '(d)', clause_text: 'Note: Local Driver Allowance will be extra, before 06 AM and After 10 PM.', display_order: 4 },
  { id: 5, clause_key: '(e)', clause_text: 'Service Tax will be charged on gross billing as prevailing government rates.', display_order: 5 },
  { id: 6, clause_key: '(f)', clause_text: 'GST of 5% will be charged on total Invoice.', display_order: 6 },
  { id: 7, clause_key: '(g)', clause_text: 'Current price of Fuel -Diesel Rs 90.99, Petrol Rs.102.92.', display_order: 7 },
  { id: 8, clause_key: '(h)', clause_text: 'Cheque to be released in favour of Siddhu Car Rentals.', display_order: 8 }
];
