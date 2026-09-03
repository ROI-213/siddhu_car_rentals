import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDb, db } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'siddhu@2026';

app.use(cors());
app.use(express.json());

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
      clean[k] = null;
    } else {
      clean[k] = parseInt(clean[k], 10);
    }
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
app.post('/api/tariffs', async (req, res) => {
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
    res.status(500).json({ success: false, error: 'Failed to create tariff in database.' });
  }
});

// 5. PUT /api/tariffs/:id - Update existing tariff (Admin)
app.put('/api/tariffs/:id', async (req, res) => {
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
    res.status(500).json({ success: false, error: 'Failed to update tariff in database.' });
  }
});

// 6. DELETE /api/tariffs/:id - Delete tariff (Admin)
app.delete('/api/tariffs/:id', async (req, res) => {
  try {
    const deleted = await db.deleteTariff(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Tariff record not found.' });
    }
    res.json({ success: true, message: 'Tariff deleted successfully.' });
  } catch (err) {
    console.error('Error deleting tariff:', err);
    res.status(500).json({ success: false, error: 'Failed to delete tariff.' });
  }
});

// 7. PUT /api/tariffs/reorder - Batch reorder rows
app.put('/api/tariffs-reorder', async (req, res) => {
  try {
    const { orderList } = req.body;
    if (!Array.isArray(orderList)) {
      return res.status(400).json({ success: false, error: 'orderList array is required.' });
    }
    await db.reorderTariffs(orderList);
    res.json({ success: true, message: 'Tariffs reordered successfully.' });
  } catch (err) {
    console.error('Error reordering tariffs:', err);
    res.status(500).json({ success: false, error: 'Failed to reorder tariffs.' });
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

// 9. POST /api/admin/login - Simple secure Admin authentication
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if ((username === 'admin' || username === 'siddhu') && password === ADMIN_PASSWORD) {
    res.json({
      success: true,
      token: 'scr_admin_token_' + Date.now(),
      user: { username: 'admin', role: 'administrator' }
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid admin username or password.' });
  }
});

// 10. POST /api/tariffs/reset - Reset to default seed
app.post('/api/tariffs/reset', async (req, res) => {
  try {
    await db.resetSeed();
    res.json({ success: true, message: 'Tariffs reset to official rate card data successfully.' });
  } catch (err) {
    console.error('Error resetting tariffs:', err);
    res.status(500).json({ success: false, error: 'Failed to reset tariffs.' });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootDir, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(rootDir, 'dist', 'index.html'));
  });
}

// Start Server
async function start() {
  await initDb();
  app.listen(PORT, () => {
    console.log(` Siddhu Car Rentals Backend running at http://localhost:${PORT}`);
  });
}

start();
