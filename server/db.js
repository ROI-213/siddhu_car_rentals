import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const { Pool } = pg;

// Default Seed Data
const DEFAULT_DISPOSAL_TARIFFS = [
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

const DEFAULT_OUTSTATION_TARIFFS = [
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

const DEFAULT_TERMS = [
  { id: 1, clause_key: '(a)', clause_text: 'The time and kilometer will be from garage to garage.', display_order: 1, is_active: true },
  { id: 2, clause_key: '(b)', clause_text: 'Day means Calendar Day with 24hrs format.', display_order: 2, is_active: true },
  { id: 3, clause_key: '(c)', clause_text: 'Parking, Permit, Interstate taxes, entry fees, toll etc, will be charged on actuals.', display_order: 3, is_active: true },
  { id: 4, clause_key: '(d)', clause_text: 'Note: Local Driver Allowance will be extra, before 06 AM and After 10 PM.', display_order: 4, is_active: true },
  { id: 5, clause_key: '(e)', clause_text: 'Service Tax will be charged on gross billing as prevailing government rates.', display_order: 5, is_active: true },
  { id: 6, clause_key: '(f)', clause_text: 'GST of 5% will be charged on total Invoice.', display_order: 6, is_active: true },
  { id: 7, clause_key: '(g)', clause_text: 'Current price of Fuel -Diesel Rs 90.99, Petrol Rs.102.92.', display_order: 7, is_active: true },
  { id: 8, clause_key: '(h)', clause_text: 'Cheque to be released in favour of Siddhu Car Rentals.', display_order: 8, is_active: true }
];

// In-Memory / File Fallback Storage
const isVercel = Boolean(process.env.VERCEL);
const originalDataFilePath = path.join(rootDir, 'database', 'data.json');
const dataFilePath = isVercel
  ? path.join('/tmp', 'siddhu_data.json')
  : originalDataFilePath;

function loadLocalData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(raw);
    }
    // If on Vercel and /tmp doesn't have it yet, try copying from original
    if (isVercel && fs.existsSync(originalDataFilePath)) {
      const raw = fs.readFileSync(originalDataFilePath, 'utf8');
      const parsed = JSON.parse(raw);
      saveLocalData(parsed);
      return parsed;
    }
  } catch (err) {
    console.error('Error loading local data.json:', err.message);
  }
  const defaultData = {
    tariffs: [...DEFAULT_DISPOSAL_TARIFFS, ...DEFAULT_OUTSTATION_TARIFFS],
    terms: DEFAULT_TERMS,
    nextId: 41,
    site_content: {}
  };
  saveLocalData(defaultData);
  return defaultData;
}

function saveLocalData(data) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving local data.json:', err.message);
  }
}

// PostgreSQL Connection Setup
let pool = null;
let usePostgres = false;

const DEFAULT_DATABASE_URL = 'postgresql://siddh876:tInlqWg3BkGLd1Yg6qfd98cex@168.119.64.101:5432/siddh876';

export async function initDb() {
  if (pool && usePostgres) return;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || DEFAULT_DATABASE_URL;
  const useSsl = process.env.PGSSL === 'true';

  try {
    const config = {
      connectionString,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 8000,
      idleTimeoutMillis: 30000,
      max: 10
    };

    pool = new Pool(config);
    // Test connection
    const client = await pool.connect();
    console.log('✓ Successfully connected to PostgreSQL Database at 168.119.64.101');
    usePostgres = true;

    // Ensure site_content table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        section_key VARCHAR(100) PRIMARY KEY,
        content_data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure tariffs table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS tariffs (
        id SERIAL PRIMARY KEY,
        location VARCHAR(100) NOT NULL DEFAULT 'BANGALORE',
        usage_type VARCHAR(50) NOT NULL,
        vehicle_variant VARCHAR(255) NOT NULL,
        service_type VARCHAR(100) NOT NULL DEFAULT 'Garage to Garage',
        four_hours_forty_km INTEGER DEFAULT NULL,
        eight_hours_eighty_km INTEGER DEFAULT NULL,
        extra_hour INTEGER DEFAULT NULL,
        extra_km INTEGER DEFAULT NULL,
        night_local_bata INTEGER DEFAULT NULL,
        airport_transfer INTEGER DEFAULT NULL,
        minimum_km_per_day INTEGER DEFAULT NULL,
        rate_per_km INTEGER DEFAULT NULL,
        outstation_extra_km INTEGER DEFAULT NULL,
        driver_allowance INTEGER DEFAULT NULL,
        display_order INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure terms_conditions table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS terms_conditions (
        id SERIAL PRIMARY KEY,
        clause_key VARCHAR(10) NOT NULL,
        clause_text TEXT NOT NULL,
        display_order INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if tariffs table is empty, if so populate from seed
    const countRes = await client.query('SELECT COUNT(*) FROM tariffs');
    if (parseInt(countRes.rows[0].count, 10) === 0) {
      for (const t of DEFAULT_DISPOSAL_TARIFFS) {
        await client.query(`
          INSERT INTO tariffs (location, usage_type, vehicle_variant, service_type, four_hours_forty_km, eight_hours_eighty_km, extra_hour, extra_km, night_local_bata, airport_transfer, display_order, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, [t.location, t.usage_type, t.vehicle_variant, t.service_type, t.four_hours_forty_km, t.eight_hours_eighty_km, t.extra_hour, t.extra_km, t.night_local_bata, t.airport_transfer, t.display_order, t.is_active]);
      }
      for (const t of DEFAULT_OUTSTATION_TARIFFS) {
        await client.query(`
          INSERT INTO tariffs (location, usage_type, vehicle_variant, service_type, minimum_km_per_day, rate_per_km, outstation_extra_km, driver_allowance, display_order, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [t.location, t.usage_type, t.vehicle_variant, t.service_type, t.minimum_km_per_day, t.rate_per_km, t.outstation_extra_km, t.driver_allowance, t.display_order, t.is_active]);
      }
      console.log('✓ PostgreSQL seed tariffs inserted.');
    }

    client.release();
  } catch (err) {
    console.warn('⚠️ PostgreSQL connection failed, switching to persistent local storage mode:', err.message);
    usePostgres = false;
  }
}

// Database Abstraction Methods
export const db = {
  isPostgres: () => usePostgres,

  async getTariffs({ usage_type, location, search, includeInactive = false } = {}) {
    if (usePostgres) {
      let query = 'SELECT * FROM tariffs WHERE 1=1';
      const params = [];

      if (!includeInactive) {
        query += ' AND is_active = TRUE';
      }
      if (usage_type) {
        params.push(usage_type.toLowerCase());
        query += ` AND LOWER(usage_type) = $${params.length}`;
      }
      if (location) {
        params.push(`%${location}%`);
        query += ` AND location ILIKE $${params.length}`;
      }
      if (search) {
        params.push(`%${search}%`);
        query += ` AND (vehicle_variant ILIKE $${params.length} OR service_type ILIKE $${params.length})`;
      }

      query += ' ORDER BY display_order ASC, id ASC';
      const result = await pool.query(query, params);
      return result.rows;
    } else {
      const data = loadLocalData();
      let list = data.tariffs;
      if (!includeInactive) list = list.filter(t => t.is_active);
      if (usage_type) list = list.filter(t => t.usage_type.toLowerCase() === usage_type.toLowerCase());
      if (location) list = list.filter(t => t.location.toLowerCase().includes(location.toLowerCase()));
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(t => t.vehicle_variant.toLowerCase().includes(q) || (t.service_type && t.service_type.toLowerCase().includes(q)));
      }
      return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    }
  },

  async getTariffById(id) {
    if (usePostgres) {
      const result = await pool.query('SELECT * FROM tariffs WHERE id = $1', [id]);
      return result.rows[0] || null;
    } else {
      const data = loadLocalData();
      return data.tariffs.find(t => t.id === parseInt(id, 10)) || null;
    }
  },

  async createTariff(tariffData) {
    const {
      location = 'BANGALORE',
      usage_type,
      vehicle_variant,
      service_type = 'Garage to Garage',
      four_hours_forty_km = null,
      eight_hours_eighty_km = null,
      extra_hour = null,
      extra_km = null,
      night_local_bata = null,
      airport_transfer = null,
      minimum_km_per_day = null,
      rate_per_km = null,
      outstation_extra_km = null,
      driver_allowance = null,
      display_order = 0,
      is_active = true
    } = tariffData;

    if (usePostgres) {
      const query = `
        INSERT INTO tariffs (
          location, usage_type, vehicle_variant, service_type,
          four_hours_forty_km, eight_hours_eighty_km, extra_hour, extra_km,
          night_local_bata, airport_transfer,
          minimum_km_per_day, rate_per_km, outstation_extra_km, driver_allowance,
          display_order, is_active, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, CURRENT_TIMESTAMP
        ) RETURNING *;
      `;
      const safeDisplayOrder = (display_order === null || display_order === undefined || isNaN(display_order)) ? 0 : parseInt(display_order, 10);
      const values = [
        location, usage_type, vehicle_variant, service_type,
        four_hours_forty_km, eight_hours_eighty_km, extra_hour, extra_km,
        night_local_bata, airport_transfer,
        minimum_km_per_day, rate_per_km, outstation_extra_km, driver_allowance,
        safeDisplayOrder, is_active
      ];
      const result = await pool.query(query, values);
      return result.rows[0];
    } else {
      const data = loadLocalData();
      const newId = data.nextId || (Math.max(...data.tariffs.map(t => t.id), 0) + 1);
      const newRecord = {
        id: newId,
        location,
        usage_type,
        vehicle_variant,
        service_type,
        four_hours_forty_km,
        eight_hours_eighty_km,
        extra_hour,
        extra_km,
        night_local_bata,
        airport_transfer,
        minimum_km_per_day,
        rate_per_km,
        outstation_extra_km,
        driver_allowance,
        display_order: display_order || data.tariffs.length + 1,
        is_active,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      data.tariffs.push(newRecord);
      data.nextId = newId + 1;
      saveLocalData(data);
      return newRecord;
    }
  },

  async updateTariff(id, tariffData) {
    if (usePostgres) {
      const fields = [];
      const values = [];
      let idx = 1;

      for (const [key, value] of Object.entries(tariffData)) {
        if (key === 'id' || key === 'created_at') continue;
        fields.push(`${key} = $${idx}`);
        values.push(value);
        idx++;
      }

      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);

      const query = `UPDATE tariffs SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *;`;
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } else {
      const data = loadLocalData();
      const index = data.tariffs.findIndex(t => t.id === parseInt(id, 10));
      if (index === -1) return null;
      data.tariffs[index] = {
        ...data.tariffs[index],
        ...tariffData,
        updated_at: new Date().toISOString()
      };
      saveLocalData(data);
      return data.tariffs[index];
    }
  },

  async deleteTariff(id) {
    if (usePostgres) {
      const result = await pool.query('DELETE FROM tariffs WHERE id = $1 RETURNING *;', [id]);
      return result.rowCount > 0;
    } else {
      const data = loadLocalData();
      const initialLen = data.tariffs.length;
      data.tariffs = data.tariffs.filter(t => t.id !== parseInt(id, 10));
      saveLocalData(data);
      return data.tariffs.length < initialLen;
    }
  },

  async reorderTariffs(orderList) {
    // orderList is array of { id, display_order }
    if (usePostgres) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        for (const item of orderList) {
          await client.query('UPDATE tariffs SET display_order = $1 WHERE id = $2', [item.display_order, item.id]);
        }
        await client.query('COMMIT');
        return true;
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } else {
      const data = loadLocalData();
      for (const item of orderList) {
        const t = data.tariffs.find(x => x.id === parseInt(item.id, 10));
        if (t) t.display_order = item.display_order;
      }
      saveLocalData(data);
      return true;
    }
  },

  async getTerms() {
    if (usePostgres) {
      const result = await pool.query('SELECT * FROM terms_conditions WHERE is_active = TRUE ORDER BY display_order ASC');
      return result.rows;
    } else {
      const data = loadLocalData();
      return (data.terms || DEFAULT_TERMS).filter(t => t.is_active).sort((a, b) => a.display_order - b.display_order);
    }
  },

  async resetSeed() {
    if (usePostgres) {
      const seedSqlPath = path.join(rootDir, 'database', 'seed.sql');
      const seedSql = fs.readFileSync(seedSqlPath, 'utf8');
      await pool.query(seedSql);
      return true;
    } else {
      const defaultData = {
        tariffs: [...DEFAULT_DISPOSAL_TARIFFS, ...DEFAULT_OUTSTATION_TARIFFS],
        terms: DEFAULT_TERMS,
        nextId: 41
      };
      saveLocalData(defaultData);
      return true;
    }
  },

  async getContent(key) {
    if (usePostgres) {
      const res = await pool.query('SELECT content_data FROM site_content WHERE section_key = $1', [key]);
      return res.rows[0]?.content_data || null;
    } else {
      const data = loadLocalData();
      return (data.site_content && data.site_content[key]) || null;
    }
  },

  async setContent(key, contentData) {
    if (usePostgres) {
      const query = `
        INSERT INTO site_content (section_key, content_data, updated_at)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        ON CONFLICT (section_key)
        DO UPDATE SET content_data = $2, updated_at = CURRENT_TIMESTAMP
        RETURNING content_data;
      `;
      const res = await pool.query(query, [key, JSON.stringify(contentData)]);
      return res.rows[0]?.content_data || contentData;
    } else {
      const data = loadLocalData();
      if (!data.site_content) data.site_content = {};
      data.site_content[key] = contentData;
      saveLocalData(data);
      return contentData;
    }
  },

  async getAllContent() {
    if (usePostgres) {
      const res = await pool.query('SELECT section_key, content_data FROM site_content');
      const map = {};
      for (const row of res.rows) {
        map[row.section_key] = row.content_data;
      }
      return map;
    } else {
      const data = loadLocalData();
      return data.site_content || {};
    }
  }
};
