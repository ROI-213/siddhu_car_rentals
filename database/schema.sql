-- PostgreSQL Schema for Siddhu Car Rentals Tariff Management System

-- Drop existing tables if re-creating
DROP TABLE IF EXISTS tariffs;
DROP TABLE IF EXISTS terms_conditions;

-- Create Tariffs Table
CREATE TABLE IF NOT EXISTS tariffs (
    id SERIAL PRIMARY KEY,
    location VARCHAR(100) NOT NULL DEFAULT 'BANGALORE',
    usage_type VARCHAR(50) NOT NULL, -- 'disposal' or 'outstation'
    vehicle_variant VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) NOT NULL DEFAULT 'Garage to Garage',
    
    -- Disposal Pricing Fields (Nullable where N/A is valid)
    four_hours_forty_km INTEGER DEFAULT NULL,
    eight_hours_eighty_km INTEGER DEFAULT NULL,
    extra_hour INTEGER DEFAULT NULL,
    extra_km INTEGER DEFAULT NULL,
    night_local_bata INTEGER DEFAULT NULL,
    airport_transfer INTEGER DEFAULT NULL,
    
    -- Outstation Pricing Fields
    minimum_km_per_day INTEGER DEFAULT NULL,
    rate_per_km INTEGER DEFAULT NULL,
    outstation_extra_km INTEGER DEFAULT NULL,
    driver_allowance INTEGER DEFAULT NULL,
    
    -- Ordering & Status
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high-performance querying
CREATE INDEX IF NOT EXISTS idx_tariffs_usage_type ON tariffs(usage_type);
CREATE INDEX IF NOT EXISTS idx_tariffs_display_order ON tariffs(display_order);
CREATE INDEX IF NOT EXISTS idx_tariffs_is_active ON tariffs(is_active);

-- Create Terms and Conditions Table
CREATE TABLE IF NOT EXISTS terms_conditions (
    id SERIAL PRIMARY KEY,
    clause_key VARCHAR(10) NOT NULL, -- '(a)', '(b)', etc.
    clause_text TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
