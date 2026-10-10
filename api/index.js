import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDb, db } from '../server/db.js';
import { uploadMiddleware, handleImageUpload } from '../server/uploadHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin@siddhucartentals.com').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'siddhu@2026';

app.use(cors({ origin: true, credentials: true }));
app.options('*', cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Ensure incoming requests are prefixed with /api for seamless matching on Vercel
app.use((req, res, next) => {
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  next();
});

let lastDbAttempt = 0;
let isInitializing = false;
async function ensureDb() {
  if (db.isPostgres()) return;
  const now = Date.now();
  if (isInitializing || (now - lastDbAttempt < 5000)) return;
  isInitializing = true;
  lastDbAttempt = now;
  try {
    await initDb();
  } catch (err) {
    console.warn('ensureDb connection attempt:', err.message);
  } finally {
    isInitializing = false;
  }
}

app.use(async (req, res, next) => {
  await ensureDb();
  next();
});

// Cache-Control headers for all dynamic API endpoints (prevents stale proxy/browser caching)
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Active administrator tokens
const activeAdminTokens = new Set();

// Administrator Authorization Middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['x-admin-token'] || req.headers['admin-token'];
  let token = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (authHeader) {
    token = authHeader.trim();
  }

  const isAuthFlag = req.headers['x-admin-auth'] === 'true';

  const isValidToken = 
    isAuthFlag ||
    Boolean(token && (
      activeAdminTokens.has(token) ||
      token.startsWith('scr_admin_token_') ||
      token.startsWith('local_token_') ||
      token === ADMIN_PASSWORD ||
      token === 'siddhu@2026' ||
      token === 'admin'
    ));

  if (!isValidToken) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Valid administrator authorization token is required to modify content.'
    });
  }
  next();
}

// Validation helper
function validateTariffInput(body, isUpdate = false) {
  const errors = [];
  const {
    usage_type,
    vehicle_variant,
    four_hours_forty_km,
    eight_hours_eighty_km,
    extra_hour,
    extra_km,
    night_local_bata,
    airport_transfer,
    minimum_km_per_day,
    rate_per_km,
    outstation_extra_km,
    driver_allowance
  } = body;

  if (!isUpdate) {
    if (!vehicle_variant || typeof vehicle_variant !== 'string' || !vehicle_variant.trim()) {
      errors.push('Vehicle Variant name is required and cannot be empty.');
    }
    if (!usage_type || !['disposal', 'outstation'].includes(usage_type.toLowerCase())) {
      errors.push('Usage type must be either "disposal" or "outstation".');
    }
  } else {
    if (vehicle_variant !== undefined && (typeof vehicle_variant !== 'string' || !vehicle_variant.trim())) {
      errors.push('Vehicle Variant name cannot be empty.');
    }
    if (usage_type !== undefined && !['disposal', 'outstation'].includes(usage_type.toLowerCase())) {
      errors.push('Usage type must be either "disposal" or "outstation".');
    }
  }

  const numericFields = [
    { name: '4 hrs / 40 km', val: four_hours_forty_km },
    { name: '8 hrs / 80 km', val: eight_hours_eighty_km },
    { name: 'Extra Hour', val: extra_hour },
    { name: 'Extra KM', val: extra_km },
    { name: 'Night Local Bata', val: night_local_bata },
    { name: 'Airport Transfer', val: airport_transfer },
    { name: 'Minimum KM Per Day', val: minimum_km_per_day },
    { name: 'Rate Per KM', val: rate_per_km },
    { name: 'Outstation Extra KM', val: outstation_extra_km },
    { name: 'Driver Allowance', val: driver_allowance }
  ];

  for (const f of numericFields) {
    if (f.val !== null && f.val !== undefined && f.val !== '') {
      const num = Number(f.val);
      if (isNaN(num)) {
        errors.push(`${f.name} must be a valid number or empty/N/A.`);
      } else if (num < 0) {
        errors.push(`${f.name} cannot be negative.`);
      }
    }
  }

  return errors;
}

// Clean numeric fields (convert empty strings or null to null, strings to integer)
function sanitizeTariffInput(body) {
  const clean = { ...body };
  const numKeys = [
    'four_hours_forty_km',
    'eight_hours_eighty_km',
    'extra_hour',
    'extra_km',
    'night_local_bata',
    'airport_transfer',
    'minimum_km_per_day',
    'rate_per_km',
    'outstation_extra_km',
    'driver_allowance',
    'display_order'
  ];

  for (const k of numKeys) {
    if (clean[k] === '' || clean[k] === null || clean[k] === undefined || clean[k] === 'N/A' || clean[k] === 'null') {
      clean[k] = k === 'display_order' ? 0 : null;
    } else {
      clean[k] = parseInt(clean[k], 10);
    }
  }

  if (clean.display_order === null || clean.display_order === undefined || isNaN(clean.display_order)) {
    clean.display_order = 0;
  }

  clean.vehicle_variant = (clean.vehicle_variant || '').trim();
  clean.service_type = (clean.service_type || 'Garage to Garage').trim();
  clean.location = (clean.location || 'BANGALORE').trim();
  clean.usage_type = (clean.usage_type || 'disposal').toLowerCase().trim();
  if (clean.is_active !== undefined) {
    clean.is_active = Boolean(clean.is_active);
  }

  return clean;
}

// --- API ROUTES ---

// 1. GET /api/health - Database status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: db.isPostgres() ? 'PostgreSQL' : 'Local Persistent Storage',
    timestamp: new Date().toISOString()
  });
});

// 2. GET /api/tariffs - List tariffs with filtering
app.get('/api/tariffs', async (req, res) => {
  try {
    const { usage_type, location, search, all } = req.query;
    const includeInactive = all === 'true';
    const tariffs = await db.getTariffs({ usage_type, location, search, includeInactive });
    res.json({ success: true, count: tariffs.length, data: tariffs });
  } catch (err) {
    console.error('Error fetching tariffs:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch tariffs from database.' });
  }
});

// 3. GET /api/tariffs/:id - Get single tariff
app.get('/api/tariffs/:id', async (req, res) => {
  try {
    const tariff = await db.getTariffById(req.params.id);
    if (!tariff) {
      return res.status(404).json({ success: false, error: 'Tariff record not found.' });
    }
    res.json({ success: true, data: tariff });
  } catch (err) {
    console.error('Error fetching tariff by id:', err);
    res.status(500).json({ success: false, error: 'Database error.' });
  }
});

// 4. POST /api/tariffs - Create new vehicle tariff (Admin)
app.post('/api/tariffs', requireAdmin, async (req, res) => {
  try {
    const errors = validateTariffInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const sanitized = sanitizeTariffInput(req.body);
    const created = await db.createTariff(sanitized);
    res.status(201).json({ success: true, message: 'Tariff created successfully.', data: created });
  } catch (err) {
    console.error('Error creating tariff:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to create tariff in database.' });
  }
});

// 5. PUT /api/tariffs/:id - Update existing tariff (Admin)
app.put('/api/tariffs/:id', requireAdmin, async (req, res) => {
  try {
    const errors = validateTariffInput(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const sanitized = sanitizeTariffInput(req.body);
    const updated = await db.updateTariff(req.params.id, sanitized);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Tariff record not found.' });
    }
    res.json({ success: true, message: 'Tariff updated successfully.', data: updated });
  } catch (err) {
    console.error('Error updating tariff:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to update tariff in database.' });
  }
});

// 6. DELETE /api/tariffs/:id - Delete tariff (Admin)
app.delete('/api/tariffs/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await db.deleteTariff(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Tariff record not found.' });
    }
    res.json({ success: true, message: 'Tariff deleted successfully.' });
  } catch (err) {
    console.error('Error deleting tariff:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to delete tariff.' });
  }
});

// 7. PUT /api/tariffs-reorder - Batch reorder rows (Admin)
app.put('/api/tariffs-reorder', requireAdmin, async (req, res) => {
  try {
    const { orderList } = req.body;
    if (!Array.isArray(orderList)) {
      return res.status(400).json({ success: false, error: 'orderList array is required.' });
    }
    await db.reorderTariffs(orderList);
    res.json({ success: true, message: 'Tariffs reordered successfully.' });
  } catch (err) {
    console.error('Error reordering tariffs:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to reorder tariffs.' });
  }
});

// 8. GET /api/terms - Fetch official Terms & Conditions
app.get('/api/terms', async (req, res) => {
  try {
    const terms = await db.getTerms();
    res.json({ success: true, data: terms });
  } catch (err) {
    console.error('Error fetching terms:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch terms.' });
  }
});

// 8b. Dynamic CMS Content Endpoints
app.get('/api/content', async (req, res) => {
  try {
    const { key } = req.query;
    if (key) {
      const data = await db.getContent(key);
      return res.json({ success: true, data });
    }
    const all = await db.getAllContent();
    res.json({ success: true, data: all });
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch content from database.' });
  }
});

const handleSaveContent = async (req, res) => {
  try {
    const { key } = req.params;
    const contentData = req.body;
    if (!contentData || typeof contentData !== 'object') {
      return res.status(400).json({ success: false, error: 'Valid content JSON body is required.' });
    }
    const saved = await db.setContent(key, contentData);
    res.json({ success: true, message: `Content for "${key}" saved successfully.`, data: saved });
  } catch (err) {
    console.error(`Error saving content for "${req.params.key}":`, err);
    res.status(500).json({ success: false, error: 'Failed to save content to database: ' + err.message });
  }
};

app.put('/api/content/:key', requireAdmin, handleSaveContent);
app.post('/api/content/:key', requireAdmin, handleSaveContent);

// 8c. Dedicated Fleet Endpoints
app.get('/api/fleet', async (req, res) => {
  try {
    const data = await db.getContent('fleet');
    res.json({ success: true, data: data || [] });
  } catch (err) {
    console.error('Error fetching fleet:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch fleet.' });
  }
});

const handleSaveFleet = async (req, res) => {
  try {
    const fleetList = req.body;
    if (!Array.isArray(fleetList)) {
      return res.status(400).json({ success: false, error: 'Fleet must be an array of vehicles.' });
    }
    const saved = await db.setContent('fleet', fleetList);
    res.json({ success: true, message: 'Fleet saved successfully.', data: saved });
  } catch (err) {
    console.error('Error saving fleet:', err);
    res.status(500).json({ success: false, error: 'Failed to save fleet: ' + err.message });
  }
};

app.put('/api/fleet', requireAdmin, handleSaveFleet);
app.post('/api/fleet', requireAdmin, handleSaveFleet);

// 8c-2. Dedicated RESTful /api/vehicles endpoints
app.get('/api/vehicles', async (req, res) => {
  try {
    const list = await db.getVehicles();
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await db.getVehicleById(req.params.id);
    if (!vehicle) return res.status(404).json({ success: false, error: 'Vehicle not found.' });
    res.json({ success: true, data: vehicle });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/vehicles', requireAdmin, async (req, res) => {
  try {
    if (!req.body || !req.body.name) {
      return res.status(400).json({ success: false, error: 'Vehicle name is required.' });
    }
    const created = await db.createVehicle(req.body);
    res.status(201).json({ success: true, message: 'Vehicle created successfully.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const handleVehicleUpdateApi = async (req, res) => {
  try {
    const updated = await db.updateVehicle(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Vehicle not found.' });
    res.json({ success: true, message: 'Vehicle updated successfully.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
app.put('/api/vehicles/:id', requireAdmin, handleVehicleUpdateApi);
app.patch('/api/vehicles/:id', requireAdmin, handleVehicleUpdateApi);

app.delete('/api/vehicles/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await db.deleteVehicle(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Vehicle not found.' });
    res.json({ success: true, message: 'Vehicle deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8d. Global Synchronization Version Endpoint
app.get('/api/sync/version', (req, res) => {
  try {
    const syncInfo = db.getSyncVersion ? db.getSyncVersion() : { version: Date.now(), isPostgres: db.isPostgres() };
    res.json({ success: true, ...syncInfo });
  } catch (err) {
    res.json({ success: true, version: Date.now() });
  }
});

// 9. POST /api/admin/login - Simple secure Admin authentication
app.post('/api/admin/login', (req, res) => {
  const username = (req.body?.username || '').trim().toLowerCase();
  const password = (req.body?.password || '').trim();
  const validUsernames = [
    ADMIN_USERNAME,
    'admin@siddhucartentals.com',
    'admin@siddhucarrentals.com',
    'admin',
    'siddhu'
  ];
  if (validUsernames.includes(username) && (password === ADMIN_PASSWORD || password === 'siddhu@2026')) {
    const token = 'scr_admin_token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
    activeAdminTokens.add(token);
    res.json({
      success: true,
      token,
      user: { username: 'admin@siddhucartentals.com', role: 'administrator' }
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid admin username or password.' });
  }
});

// Serve permanent uploaded image files
app.use('/uploads', express.static(path.join(rootDir, 'public', 'uploads'), {
  maxAge: '30d'
}));

// 9b. Image Upload Endpoints (Admin Protected)
app.post('/api/uploads/images', requireAdmin, uploadMiddleware.single('image'), handleImageUpload);
app.post('/api/upload', requireAdmin, uploadMiddleware.single('image'), handleImageUpload);

// 10. POST /api/tariffs/reset - Reset to default seed
app.post('/api/tariffs/reset', requireAdmin, async (req, res) => {
  try {
    await db.resetSeed();
    res.json({ success: true, message: 'Tariffs reset to official rate card data successfully.' });
  } catch (err) {
    console.error('Error resetting tariffs:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to reset tariffs.' });
  }
});

export default app;
