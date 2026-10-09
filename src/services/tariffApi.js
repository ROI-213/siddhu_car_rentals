// Tariff API Service for Siddhu Car Rentals
// PostgreSQL Express Backend is the Single Source of Truth

const API_BASE = '/api';

export function getAdminToken() {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem('scr_admin_token') || 
         localStorage.getItem('scr_admin_token') || 
         '';
}

export function getAuthHeaders() {
  const token = getAdminToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['x-admin-token'] = token;
  }
  return headers;
}

export const tariffApi = {
  // 1. Fetch Tariffs from PostgreSQL (Single Source of Truth)
  async getTariffs({ usage_type = null, search = '', all = false } = {}) {
    try {
      const params = new URLSearchParams();
      if (usage_type) params.append('usage_type', usage_type);
      if (search) params.append('search', search);
      if (all) params.append('all', 'true');

      const res = await fetch(`${API_BASE}/tariffs?${params.toString()}`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (!isJson) throw new Error('Non-JSON response from server');
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        let result = data.data;

        // Apply filters
        if (!all) result = result.filter(t => t.is_active);
        if (usage_type) result = result.filter(t => t.usage_type && t.usage_type.toLowerCase() === usage_type.toLowerCase());
        if (search) {
          const q = search.toLowerCase();
          result = result.filter(t => 
            (t.vehicle_variant && t.vehicle_variant.toLowerCase().includes(q)) || 
            (t.service_type && t.service_type.toLowerCase().includes(q))
          );
        }

        const sorted = result.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

        // Update local offline backup
        try {
          if (all) {
            localStorage.setItem('scr_tariffs_cache_v5', JSON.stringify(sorted));
          }
        } catch (e) {}

        return sorted;
      }
      return tariffApi.getLocalTariffs({ usage_type, search, all });
    } catch (err) {
      console.warn('API fetch failed, reading from local fallback storage:', err);
      return tariffApi.getLocalTariffs({ usage_type, search, all });
    }
  },

  // 2. Fetch Single Tariff
  async getTariffById(id) {
    try {
      const res = await fetch(`${API_BASE}/tariffs/${id}`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('API fetch failed, reading single tariff from local fallback:', err);
      const list = tariffApi.getLocalTariffs({ all: true });
      return list.find(t => String(t.id) === String(id) || t.id === parseInt(id, 10)) || null;
    }
  },

  // 3. Create Tariff (Admin) - Throws immediately if DB operation fails
  async createTariff(tariffData) {
    const res = await fetch(`${API_BASE}/tariffs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tariffData)
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      const errMsg = (data && data.errors && data.errors.join(', ')) || 
                     (data && data.error) || 
                     `Failed to create tariff (status ${res.status})`;
      throw new Error(errMsg);
    }
    const finalData = data.data;
    if (finalData && finalData.id) {
      tariffApi.updateLocalTariff(finalData.id, finalData);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scr_tariffs_updated', { detail: { action: 'create', data: finalData } }));
    }
    return finalData;
  },

  // 4. Update Tariff (Admin) - Throws immediately if DB operation fails
  async updateTariff(id, tariffData) {
    const res = await fetch(`${API_BASE}/tariffs/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(tariffData)
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      const errMsg = (data && data.errors && data.errors.join(', ')) || 
                     (data && data.error) || 
                     `Failed to update tariff (status ${res.status})`;
      throw new Error(errMsg);
    }
    const finalData = data.data;
    if (finalData) {
      tariffApi.updateLocalTariff(id, finalData);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scr_tariffs_updated', { detail: { action: 'update', id, data: finalData } }));
    }
    return finalData;
  },

  // 5. Delete Tariff (Admin) - Throws immediately if DB operation fails
  async deleteTariff(id) {
    const res = await fetch(`${API_BASE}/tariffs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      const errMsg = (data && data.error) || `Failed to delete tariff (status ${res.status})`;
      throw new Error(errMsg);
    }
    tariffApi.deleteLocalTariff(id);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scr_tariffs_updated', { detail: { action: 'delete', id } }));
    }
    return true;
  },

  // 6. Batch Reorder (Admin)
  async reorderTariffs(orderList) {
    const res = await fetch(`${API_BASE}/tariffs-reorder`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ orderList })
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      throw new Error((data && data.error) || 'Failed to reorder tariffs in database');
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scr_tariffs_updated'));
    }
    return true;
  },

  // 7. Fetch Terms & Conditions
  async getTerms() {
    try {
      const res = await fetch(`${API_BASE}/terms`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (!isJson) throw new Error('Non-JSON response from server');
      const data = await res.json();
      return (data && Array.isArray(data.data) && data.data.length > 0) ? data.data : DEFAULT_TERMS;
    } catch (err) {
      return DEFAULT_TERMS;
    }
  },

  // 8. Admin Login with Session Token Tracking
  async loginAdmin(username, password) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.success && data.token) {
          sessionStorage.setItem('scr_admin_auth', 'true');
          sessionStorage.setItem('scr_admin_token', data.token);
          localStorage.setItem('scr_admin_auth', 'true');
          localStorage.setItem('scr_admin_token', data.token);
          return data;
        }
      }
    } catch (err) {
      console.warn('API login endpoint check failed, checking credentials:', err);
    }

    // Direct fallback verification for offline / disconnected dev
    const validUsernames = [
      'admin@siddhucartentals.com',
      'admin@siddhucarrentals.com',
      'admin',
      'siddhu'
    ];
    if (validUsernames.includes(cleanUser) && (cleanPass === 'siddhu@2026' || cleanPass === 'admin')) {
      const token = 'scr_admin_token_' + Date.now();
      const authData = { success: true, token, user: { username: cleanUser, role: 'administrator' } };
      sessionStorage.setItem('scr_admin_auth', 'true');
      sessionStorage.setItem('scr_admin_token', token);
      localStorage.setItem('scr_admin_auth', 'true');
      localStorage.setItem('scr_admin_token', token);
      return authData;
    }

    throw new Error('Invalid admin username or password.');
  },

  // 9. Reset to default rate card
  async resetToSeed() {
    const res = await fetch(`${API_BASE}/tariffs/reset`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      throw new Error((data && data.error) || 'Failed to reset tariffs in database');
    }
    localStorage.removeItem('scr_tariffs_cache_v5');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scr_tariffs_updated'));
    }
    return true;
  },

  // 10. Fetch Dynamic Site Content (Hero, Contact, Testimonials, Destinations, etc.)
  async getContent(key = null) {
    try {
      const url = key ? `${API_BASE}/content?key=${encodeURIComponent(key)}` : `${API_BASE}/content`;
      const res = await fetch(url, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (!isJson) throw new Error('Non-JSON response from server');
      const json = await res.json();

      if (json && json.data !== undefined) {
        // Cache copy for offline
        try {
          const cache = JSON.parse(localStorage.getItem('scr_site_content_cache') || '{}');
          if (key) {
            cache[key] = json.data;
          } else if (typeof json.data === 'object' && json.data !== null) {
            Object.assign(cache, json.data);
          }
          localStorage.setItem('scr_site_content_cache', JSON.stringify(cache));
        } catch (e) {}
        return json.data;
      }
      const localCache = JSON.parse(localStorage.getItem('scr_site_content_cache') || '{}');
      return key ? (localCache[key] || null) : localCache;
    } catch (err) {
      console.warn('API getContent fallback to local cache:', err);
      const localCache = JSON.parse(localStorage.getItem('scr_site_content_cache') || '{}');
      return key ? (localCache[key] || null) : localCache;
    }
  },

  // 11. Save Dynamic Site Content (Admin) - Throws if database write fails
  async saveContent(key, data) {
    const res = await fetch(`${API_BASE}/content/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json || !json.success) {
      throw new Error((json && json.error) || `Failed to save content for "${key}" to database`);
    }

    const savedData = json.data || data;
    try {
      const cache = JSON.parse(localStorage.getItem('scr_site_content_cache') || '{}');
      cache[key] = savedData;
      localStorage.setItem('scr_site_content_cache', JSON.stringify(cache));
      if (key === 'fleet') {
        localStorage.setItem('scr_fleet_cache', JSON.stringify(savedData));
      }
    } catch (e) {}

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scr_site_content_updated', { detail: { key, data: savedData } }));
      if (key === 'fleet') {
        window.dispatchEvent(new CustomEvent('scr_fleet_updated', { detail: savedData }));
      }
    }

    return savedData;
  },

  // 12. Fetch Dynamic Fleet from PostgreSQL (Single Source of Truth)
  async getFleet() {
    try {
      const res = await fetch(`${API_BASE}/fleet`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
          try {
            localStorage.setItem('scr_fleet_cache', JSON.stringify(json.data));
          } catch (e) {}
          return json.data;
        }
      }
      // Fallback to getContent('fleet')
      const contentFleet = await this.getContent('fleet');
      if (Array.isArray(contentFleet) && contentFleet.length > 0) {
        try {
          localStorage.setItem('scr_fleet_cache', JSON.stringify(contentFleet));
        } catch (e) {}
        return contentFleet;
      }
      const cached = JSON.parse(localStorage.getItem('scr_fleet_cache') || 'null');
      return (Array.isArray(cached) && cached.length > 0) ? cached : null;
    } catch (err) {
      console.warn('getFleet error, reading local cache:', err);
      const cached = JSON.parse(localStorage.getItem('scr_fleet_cache') || 'null');
      return (Array.isArray(cached) && cached.length > 0) ? cached : null;
    }
  },

  // 13. Save Dynamic Fleet (Admin) - Throws if database write fails
  async saveFleet(fleetList) {
    const res = await fetch(`${API_BASE}/fleet`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(fleetList)
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json || !json.success) {
      throw new Error((json && json.error) || 'Failed to save fleet to database');
    }

    const saved = json.data || fleetList;
    try {
      localStorage.setItem('scr_fleet_cache', JSON.stringify(saved));
      const cache = JSON.parse(localStorage.getItem('scr_site_content_cache') || '{}');
      cache['fleet'] = saved;
      localStorage.setItem('scr_site_content_cache', JSON.stringify(cache));
    } catch (e) {}

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scr_fleet_updated', { detail: saved }));
      window.dispatchEvent(new CustomEvent('scr_site_content_updated', { detail: { key: 'fleet', data: saved } }));
    }

    return saved;
  },

  // --- LOCAL FALLBACK HELPERS ---
  getLocalTariffs({ usage_type, search, all } = {}) {
    let list = JSON.parse(localStorage.getItem('scr_tariffs_cache_v5') || 'null');
    if (!list || list.length === 0) {
      list = [...DEFAULT_DISPOSAL_TARIFFS, ...DEFAULT_OUTSTATION_TARIFFS];
      localStorage.setItem('scr_tariffs_cache_v5', JSON.stringify(list));
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
    const now = Date.now();
    const record = { 
      ...item, 
      id: newId, 
      display_order: item.display_order || list.length + 1, 
      is_active: item.is_active !== false,
      _is_custom: true,
      _updated_at: now
    };
    list.push(record);
    try {
      localStorage.setItem('scr_tariffs_cache_v5', JSON.stringify(list));
    } catch (e) {}
    return record;
  },

  updateLocalTariff(id, item) {
    const list = tariffApi.getLocalTariffs({ all: true });
    const idStr = String(id);
    const idNum = parseInt(id, 10);
    const idx = list.findIndex(x => String(x.id) === idStr || (!isNaN(idNum) && x.id === idNum));
    const now = Date.now();
    const updatedRecord = {
      ...(idx !== -1 ? list[idx] : {}),
      ...item,
      id: idx !== -1 ? list[idx].id : (isNaN(idNum) ? id : idNum),
      _updated_at: now
    };
    if (idx === -1) {
      list.push(updatedRecord);
    } else {
      list[idx] = updatedRecord;
    }
    try {
      localStorage.setItem('scr_tariffs_cache_v5', JSON.stringify(list));
    } catch (e) {
      console.warn('Cache write error:', e);
    }
    return updatedRecord;
  },

  deleteLocalTariff(id) {
    let list = tariffApi.getLocalTariffs({ all: true });
    const idStr = String(id);
    const idNum = parseInt(id, 10);
    list = list.filter(x => String(x.id) !== idStr && (isNaN(idNum) || x.id !== idNum));
    try {
      localStorage.setItem('scr_tariffs_cache_v5', JSON.stringify(list));
    } catch (e) {
      console.warn('Cache write error:', e);
    }
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

// Official Bangalore Car Rental Tariff - Disposal (Local)
export const DEFAULT_DISPOSAL_TARIFFS = [
  { id: 1, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: "D'zire / Amaze / Indigo / Etios", service_type: 'Garage to Garage', four_hours_forty_km: 1300, eight_hours_eighty_km: 2200, extra_hour: 175, extra_km: 15, night_local_bata: 250, airport_transfer: 1600, display_order: 1, is_active: true },
  { id: 2, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Innova,Ertiga,Kia Carnes', service_type: 'Garage to Garage', four_hours_forty_km: 1800, eight_hours_eighty_km: 2900, extra_hour: 250, extra_km: 19, night_local_bata: 300, airport_transfer: 2250, display_order: 2, is_active: true },
  { id: 3, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Innova Crysta', service_type: 'Garage to Garage', four_hours_forty_km: 1900, eight_hours_eighty_km: 3200, extra_hour: 275, extra_km: 23, night_local_bata: 300, airport_transfer: 2600, display_order: 3, is_active: true },
  { id: 4, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Innova Hycross', service_type: 'Garage to Garage', four_hours_forty_km: 2500, eight_hours_eighty_km: 4100, extra_hour: 400, extra_km: 28, night_local_bata: 400, airport_transfer: 3000, display_order: 4, is_active: true },
  { id: 5, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Tempo Traveller A/C', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 6000, extra_hour: 500, extra_km: 25, night_local_bata: 500, airport_transfer: 5000, display_order: 5, is_active: true },
  { id: 6, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Fortuner old model', service_type: 'Garage to Garage', four_hours_forty_km: 3000, eight_hours_eighty_km: 4500, extra_hour: 600, extra_km: 60, night_local_bata: 500, airport_transfer: 5000, display_order: 6, is_active: true },
  { id: 7, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Camry / Accord / Fortuner latest model', service_type: 'Garage to Garage', four_hours_forty_km: 3500, eight_hours_eighty_km: 6000, extra_hour: 600, extra_km: 60, night_local_bata: 500, airport_transfer: 5000, display_order: 7, is_active: true },
  { id: 8, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Urbania 12+1', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 12000, extra_hour: 700, extra_km: 45, night_local_bata: 1000, airport_transfer: 9000, display_order: 8, is_active: true },
  { id: 9, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Urbania 16+1', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 12000, extra_hour: 700, extra_km: 45, night_local_bata: 1000, airport_transfer: 8000, display_order: 9, is_active: true },
  { id: 10, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Toyato Commuter', service_type: 'Garage to Garage', four_hours_forty_km: 7500, eight_hours_eighty_km: 9000, extra_hour: 900, extra_km: 90, night_local_bata: 800, airport_transfer: 9000, display_order: 10, is_active: true },
  { id: 11, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Merc "E" Class / BMW 5" / Audi A6', service_type: 'Garage to Garage', four_hours_forty_km: 10000, eight_hours_eighty_km: 12000, extra_hour: 1200, extra_km: 120, night_local_bata: 500, airport_transfer: 10000, display_order: 11, is_active: true },
  { id: 12, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'AUDI Q7', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 14000, extra_hour: 1400, extra_km: 140, night_local_bata: 1000, airport_transfer: 15000, display_order: 12, is_active: true },
  { id: 13, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Merc "S" Class / BMW 7" / Audi A8', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 15000, extra_hour: 1500, extra_km: 150, night_local_bata: 1000, airport_transfer: 20000, display_order: 13, is_active: true },
  { id: 14, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Merc "S" Class / BMW 7" / Audi A8 latest model', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 22500, extra_hour: 2250, extra_km: 250, night_local_bata: 1000, airport_transfer: 20000, display_order: 14, is_active: true },
  { id: 15, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Toyota Vellfie', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 22500, extra_hour: 2250, extra_km: 250, night_local_bata: 1000, airport_transfer: 20000, display_order: 15, is_active: true },
  { id: 16, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Mini Bus 21 Seater AC', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 9000, extra_hour: 550, extra_km: 40, night_local_bata: 700, airport_transfer: 9000, display_order: 16, is_active: true },
  { id: 17, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Mini Bus 25 Seater AC', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 10000, extra_hour: 550, extra_km: 45, night_local_bata: 700, airport_transfer: 10000, display_order: 17, is_active: true },
  { id: 18, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: '32 Seater AC Bus', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 11000, extra_hour: 600, extra_km: 52, night_local_bata: 1000, airport_transfer: 11000, display_order: 18, is_active: true },
  { id: 19, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Bus 45 Seater AC', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 15000, extra_hour: 800, extra_km: 62, night_local_bata: 1000, airport_transfer: 15000, display_order: 19, is_active: true },
  { id: 20, location: 'BANGALORE', usage_type: 'disposal', vehicle_variant: 'Bus 49 Seater AC', service_type: 'Garage to Garage', four_hours_forty_km: null, eight_hours_eighty_km: 16000, extra_hour: 800, extra_km: 64, night_local_bata: 1000, airport_transfer: 16000, display_order: 20, is_active: true }
];

// Official Bangalore Car Rental Tariff - Outstation
export const DEFAULT_OUTSTATION_TARIFFS = [
  { id: 21, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: "D'zire / Amaze / Indigo / Etios", service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 15, outstation_extra_km: 15, driver_allowance: 400, display_order: 1, is_active: true },
  { id: 22, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Innova,Ertiga,Kia Carnes', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 19, outstation_extra_km: 19, driver_allowance: 400, display_order: 2, is_active: true },
  { id: 23, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Innova Crysta', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 23, outstation_extra_km: 23, driver_allowance: 500, display_order: 3, is_active: true },
  { id: 24, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Innova Hycross', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 28, outstation_extra_km: 28, driver_allowance: 500, display_order: 4, is_active: true },
  { id: 25, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Tempo Traveller A/C', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 25, outstation_extra_km: 25, driver_allowance: 500, display_order: 5, is_active: true },
  { id: 26, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Fortuner old model', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 60, outstation_extra_km: 60, driver_allowance: 500, display_order: 6, is_active: true },
  { id: 27, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Camry / Accord / Fortuner latest model', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 60, outstation_extra_km: 60, driver_allowance: 500, display_order: 7, is_active: true },
  { id: 28, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Urbania 12+1', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 45, outstation_extra_km: 45, driver_allowance: 800, display_order: 8, is_active: true },
  { id: 29, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Urbania 16+1', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 45, outstation_extra_km: 45, driver_allowance: 800, display_order: 9, is_active: true },
  { id: 30, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Toyato Commuter', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 90, outstation_extra_km: 90, driver_allowance: 1000, display_order: 10, is_active: true },
  { id: 31, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Merc "E" Class / BMW 5" / Audi A6', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 120, outstation_extra_km: 120, driver_allowance: 1000, display_order: 11, is_active: true },
  { id: 32, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'AUDI Q7', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 140, outstation_extra_km: 140, driver_allowance: 1000, display_order: 12, is_active: true },
  { id: 33, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Merc "S" Class / BMW 7" / Audi A8', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 150, outstation_extra_km: 150, driver_allowance: 1000, display_order: 13, is_active: true },
  { id: 34, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Merc "S" Class / BMW 7" / Audi A8 latest model', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 250, outstation_extra_km: 250, driver_allowance: 1000, display_order: 14, is_active: true },
  { id: 35, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Toyota Vellfie', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 250, outstation_extra_km: 250, driver_allowance: 1000, display_order: 15, is_active: true },
  { id: 36, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Mini Bus 21 Seater AC', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 40, outstation_extra_km: 40, driver_allowance: 800, display_order: 16, is_active: true },
  { id: 37, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Mini Bus 25 Seater AC', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 45, outstation_extra_km: 45, driver_allowance: 800, display_order: 17, is_active: true },
  { id: 38, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: '32 Seater AC Bus', service_type: 'Garage to Garage', minimum_km_per_day: 300, rate_per_km: 52, outstation_extra_km: 52, driver_allowance: 1000, display_order: 18, is_active: true },
  { id: 39, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Bus 45 Seater AC', service_type: 'Garage to Garage', minimum_km_per_day: 400, rate_per_km: 62, outstation_extra_km: 62, driver_allowance: 1000, display_order: 19, is_active: true },
  { id: 40, location: 'BANGALORE', usage_type: 'outstation', vehicle_variant: 'Bus 49 Seater AC', service_type: 'Garage to Garage', minimum_km_per_day: 400, rate_per_km: 64, outstation_extra_km: 64, driver_allowance: 1000, display_order: 20, is_active: true }
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
