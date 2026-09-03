-- Seed Data for Siddhu Car Rentals Tariffs & Terms

-- Clear existing data
TRUNCATE TABLE tariffs RESTART IDENTITY;
TRUNCATE TABLE terms_conditions RESTART IDENTITY;

-- 1. DISPOSAL TARIFFS (BANGALORE, Garage to Garage)
INSERT INTO tariffs (
    location, usage_type, vehicle_variant, service_type,
    four_hours_forty_km, eight_hours_eighty_km, extra_hour, extra_km,
    night_local_bata, airport_transfer, display_order, is_active
) VALUES
('BANGALORE', 'disposal', 'D''zire / Amaze / Indigo / Etios', 'Garage to Garage', 1300, 2200, 175, 15, 250, 1600, 1, TRUE),
('BANGALORE', 'disposal', 'Innova,Ertiga,Kia Carnes', 'Garage to Garage', 1800, 2900, 250, 19, 300, 2250, 2, TRUE),
('BANGALORE', 'disposal', 'Innova Crysta', 'Garage to Garage', 1900, 3200, 275, 23, 300, 2600, 3, TRUE),
('BANGALORE', 'disposal', 'Innova Hycross', 'Garage to Garage', 2500, 4100, 400, 28, 400, 3000, 4, TRUE),
('BANGALORE', 'disposal', 'Tempo Traveller A/C', 'Garage to Garage', NULL, 6000, 500, 25, 500, 5000, 5, TRUE),
('BANGALORE', 'disposal', 'Fortuner old model', 'Garage to Garage', 3000, 4500, 600, 60, 500, 5000, 6, TRUE),
('BANGALORE', 'disposal', 'Camry / Accord / Fortuner latest model', 'Garage to Garage', 3500, 6000, 600, 60, 500, 5000, 7, TRUE),
('BANGALORE', 'disposal', 'Urbania 12+1', 'Garage to Garage', NULL, 12000, 700, 45, 1000, 9000, 8, TRUE),
('BANGALORE', 'disposal', 'Urbania 16+1', 'Garage to Garage', NULL, 12000, 700, 45, 1000, 8000, 9, TRUE),
('BANGALORE', 'disposal', 'Toyato Commuter', 'Garage to Garage', 7500, 9000, 900, 90, 800, 9000, 10, TRUE),
('BANGALORE', 'disposal', 'Merc "E" Class / BMW 5" / Audi A6', 'Garage to Garage', 10000, 12000, 1200, 120, 500, 10000, 11, TRUE),
('BANGALORE', 'disposal', 'AUDI Q7', 'Garage to Garage', NULL, 14000, 1400, 140, 1000, 15000, 12, TRUE),
('BANGALORE', 'disposal', 'Merc "S" Class / BMW 7" / Audi A8', 'Garage to Garage', NULL, 15000, 1500, 150, 1000, 20000, 13, TRUE),
('BANGALORE', 'disposal', 'Merc "S" Class / BMW 7" / Audi A8 latest model', 'Garage to Garage', NULL, 22500, 2250, 250, 1000, 20000, 14, TRUE),
('BANGALORE', 'disposal', 'Toyota Vellfie', 'Garage to Garage', NULL, 22500, 2250, 250, 1000, 20000, 15, TRUE),
('BANGALORE', 'disposal', 'Mini Bus 21 Seater AC', 'Garage to Garage', NULL, 9000, 550, 40, 700, 9000, 16, TRUE),
('BANGALORE', 'disposal', 'Mini Bus 25 Seater AC', 'Garage to Garage', NULL, 10000, 550, 45, 700, 10000, 17, TRUE),
('BANGALORE', 'disposal', '32 Seater AC Bus', 'Garage to Garage', NULL, 11000, 600, 52, 1000, 11000, 18, TRUE),
('BANGALORE', 'disposal', 'Bus 45 Seater AC', 'Garage to Garage', NULL, 15000, 800, 62, 1000, 15000, 19, TRUE),
('BANGALORE', 'disposal', 'Bus 49 Seater AC', 'Garage to Garage', NULL, 16000, 800, 64, 1000, 16000, 20, TRUE);

-- 2. OUTSTATION TARIFFS (BANGALORE, Garage to Garage)
INSERT INTO tariffs (
    location, usage_type, vehicle_variant, service_type,
    minimum_km_per_day, rate_per_km, outstation_extra_km, driver_allowance,
    display_order, is_active
) VALUES
('BANGALORE', 'outstation', 'D''zire / Amaze / Indigo / Etios', 'Garage to Garage', 300, 15, 15, 400, 1, TRUE),
('BANGALORE', 'outstation', 'Innova,Ertiga,Kia Carnes', 'Garage to Garage', 300, 19, 19, 400, 2, TRUE),
('BANGALORE', 'outstation', 'Innova Crysta', 'Garage to Garage', 300, 23, 23, 500, 3, TRUE),
('BANGALORE', 'outstation', 'Innova Hycross', 'Garage to Garage', 300, 28, 28, 500, 4, TRUE),
('BANGALORE', 'outstation', 'Tempo Traveller A/C', 'Garage to Garage', 300, 25, 25, 500, 5, TRUE),
('BANGALORE', 'outstation', 'Fortuner old model', 'Garage to Garage', 300, 60, 60, 500, 6, TRUE),
('BANGALORE', 'outstation', 'Camry / Accord / Fortuner latest model', 'Garage to Garage', 300, 60, 60, 500, 7, TRUE),
('BANGALORE', 'outstation', 'Urbania 12+1', 'Garage to Garage', 300, 45, 45, 800, 8, TRUE),
('BANGALORE', 'outstation', 'Urbania 16+1', 'Garage to Garage', 300, 45, 45, 800, 9, TRUE),
('BANGALORE', 'outstation', 'Toyato Commuter', 'Garage to Garage', 300, 90, 90, 1000, 10, TRUE),
('BANGALORE', 'outstation', 'Merc "E" Class / BMW 5" / Audi A6', 'Garage to Garage', 300, 120, 120, 1000, 11, TRUE),
('BANGALORE', 'outstation', 'AUDI Q7', 'Garage to Garage', 300, 140, 140, 1000, 12, TRUE),
('BANGALORE', 'outstation', 'Merc "S" Class / BMW 7" / Audi A8', 'Garage to Garage', 300, 150, 150, 1000, 13, TRUE),
('BANGALORE', 'outstation', 'Merc "S" Class / BMW 7" / Audi A8 latest model', 'Garage to Garage', 300, 250, 250, 1000, 14, TRUE),
('BANGALORE', 'outstation', 'Toyota Vellfie', 'Garage to Garage', 300, 250, 250, 1000, 15, TRUE),
('BANGALORE', 'outstation', 'Mini Bus 21 Seater AC', 'Garage to Garage', 300, 40, 40, 800, 16, TRUE),
('BANGALORE', 'outstation', 'Mini Bus 25 Seater AC', 'Garage to Garage', 300, 45, 45, 800, 17, TRUE),
('BANGALORE', 'outstation', '32 Seater AC Bus', 'Garage to Garage', 300, 52, 52, 1000, 18, TRUE),
('BANGALORE', 'outstation', 'Bus 45 Seater AC', 'Garage to Garage', 400, 62, 62, 1000, 19, TRUE),
('BANGALORE', 'outstation', 'Bus 49 Seater AC', 'Garage to Garage', 400, 64, 64, 1000, 20, TRUE);

-- 3. TERMS AND CONDITIONS
INSERT INTO terms_conditions (clause_key, clause_text, display_order, is_active) VALUES
('(a)', 'The time and kilometer will be from garage to garage.', 1, TRUE),
('(b)', 'Day means Calendar Day with 24hrs format.', 2, TRUE),
('(c)', 'Parking, Permit, Interstate taxes, entry fees, toll etc, will be charged on actuals.', 3, TRUE),
('(d)', 'Note: Local Driver Allowance will be extra, before 06 AM and After 10 PM.', 4, TRUE),
('(e)', 'Service Tax will be charged on gross billing as prevailing government rates.', 5, TRUE),
('(f)', 'GST of 5% will be charged on total Invoice.', 6, TRUE),
('(g)', 'Current price of Fuel -Diesel Rs 90.99, Petrol Rs.102.92.', 7, TRUE),
('(h)', 'Cheque to be released in favour of Siddhu Car Rentals.', 8, TRUE);
