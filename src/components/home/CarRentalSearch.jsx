import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plane, MapPin, Briefcase, RefreshCw, ArrowRight, Calendar, LocateFixed, Loader2, Star, Users, ShieldCheck, MessageSquare, Sparkles, X, ChevronRight, PhoneCall, ArrowLeftRight, Compass, Clock, Crown, FileText } from 'lucide-react';
import { fleetData } from '../../data/fleetData';
import { pricingService } from '../../services/pricingService';
import { VehicleBookingModal } from '../modals/VehicleBookingModal';
import { WhatsAppEnquiryMenu, WhatsAppIcon } from '../common/WhatsAppEnquiryMenu';
import { SITE_CONFIG } from '../../config/site';
import './CarRentalSearch.css';

// ── Trip types matching the spec ──────────────────────────────────────────────
const TABS = [
  { id: 'airport',  label: 'Airport Transfer', icon: Plane },
  { id: 'local',    label: 'Local Rental',     icon: MapPin },
  { id: 'oneway',   label: 'One Way',          icon: ArrowRight },
  { id: 'roundtrip',label: 'Round Trip',        icon: RefreshCw },
  { id: 'outstation',label: 'Outstation',       icon: Compass },
];

const COL_1_IMAGES = [
  { src: '/images/destinations/bangalore_palace.jpg', arClass: 'ar-tall', alt: 'Bangalore Palace' },
  { src: '/images/destinations/mysuru.jpg',           arClass: 'ar-square', alt: 'Mysore Palace' },
  { src: '/images/destinations/hampi.jpg',            arClass: 'ar-tall', alt: 'Hampi UNESCO Heritage' },
  { src: '/images/destinations/ub_city.jpg',          arClass: 'ar-wide', alt: 'UB City Bangalore' },
];

const COL_2_IMAGES = [
  { src: '/images/destinations/lalbagh_glass_house.jpg', arClass: 'ar-square', alt: 'Lalbagh Botanical Garden' },
  { src: '/images/destinations/chikmagalur.jpg',         arClass: 'ar-tall', alt: 'Chikmagalur Coffee Estates' },
  { src: '/images/destinations/nandi_hills.jpg',         arClass: 'ar-square', alt: 'Nandi Hills Sunrise' },
  { src: '/images/destinations/coorg.jpg',               arClass: 'ar-tall', alt: 'Coorg Coffee Valleys' },
];

// ── Expanded location database ───────────────────────────────────────────────
const LOCATIONS_DB = [
  // ── Bangalore Local Areas ──
  { name: 'Rajajinagar',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Rajarajeshwari Nagar',           subtitle: 'Bengaluru, Karnataka' },
  { name: 'Rajajinagar Industrial Area',    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Malleshwaram',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Indiranagar',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Koramangala',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Koramangala 1st Block',          subtitle: 'Bengaluru, Karnataka' },
  { name: 'Koramangala 4th Block',          subtitle: 'Bengaluru, Karnataka' },
  { name: 'Koramangala 7th Block',          subtitle: 'Bengaluru, Karnataka' },
  { name: 'Jayanagar',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'JP Nagar',                       subtitle: 'Bengaluru, Karnataka' },
  { name: 'Basavanagudi',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Whitefield',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Whitefield ITPL',                subtitle: 'Bengaluru, Karnataka' },
  { name: 'Yelahanka',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'Hebbal',                         subtitle: 'Bengaluru, Karnataka' },
  { name: 'Electronic City',                subtitle: 'Bengaluru, Karnataka' },
  { name: 'Electronic City Phase 1',        subtitle: 'Bengaluru, Karnataka' },
  { name: 'Electronic City Phase 2',        subtitle: 'Bengaluru, Karnataka' },
  { name: 'HSR Layout',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Marathahalli',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Banashankari',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Banashankari 1st Stage',         subtitle: 'Bengaluru, Karnataka' },
  { name: 'Banashankari 3rd Stage',         subtitle: 'Bengaluru, Karnataka' },
  { name: 'Banaswadi',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'Bannerghatta Road',              subtitle: 'Bengaluru, Karnataka' },
  { name: 'Bannerghatta National Park',     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Jayanagar 4th Block',            subtitle: 'Bengaluru, Karnataka' },
  { name: 'Jayanagar 9th Block',            subtitle: 'Bengaluru, Karnataka' },
  { name: 'Madiwala',                       subtitle: 'Bengaluru, Karnataka' },
  { name: 'BTM Layout',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'BTM Layout Stage 1',             subtitle: 'Bengaluru, Karnataka' },
  { name: 'BTM Layout Stage 2',             subtitle: 'Bengaluru, Karnataka' },
  { name: 'Silk Board',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Bellandur',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'Sarjapur',                       subtitle: 'Bengaluru, Karnataka' },
  { name: 'Sarjapur Road',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Outer Ring Road (ORR)',          subtitle: 'Bengaluru, Karnataka' },
  { name: 'Cox Town',                       subtitle: 'Bengaluru, Karnataka' },
  { name: 'Richmond Town',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Vasanth Nagar',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Frazer Town',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Prestige Ozone',                 subtitle: 'Whitefield, Bengaluru' },
  { name: 'Manyata Tech Park',              subtitle: 'Hebbal, Bengaluru' },
  { name: 'Bagmane Tech Park',              subtitle: 'CV Raman Nagar, Bengaluru' },
  { name: 'Electronic City - Infosys',      subtitle: 'Bengaluru, Karnataka' },
  { name: 'RMZ Ecospace',                   subtitle: 'Bellandur, Bengaluru' },
  { name: 'UB City',                        subtitle: 'Bengaluru, Karnataka' },
  { name: 'Embassy GolfLinks',              subtitle: 'Bengaluru, Karnataka' },
  { name: 'Prestige Tech Park',             subtitle: 'Marathahalli, Bengaluru' },
  { name: 'International Tech Park (ITPL)', subtitle: 'Whitefield, Bengaluru' },
  { name: 'Doddanekundi',                   subtitle: 'Marathahalli, Bengaluru' },
  { name: 'Kundalahalli',                   subtitle: 'Marathahalli, Bengaluru' },
  { name: 'Brookefield',                    subtitle: 'Whitefield, Bengaluru' },
  { name: 'Vidyaranyapura',                 subtitle: 'Bengaluru, Karnataka' },
  { name: 'Jalahalli',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'Peenya',                         subtitle: 'Bengaluru, Karnataka' },
  { name: 'Nagarbhavi',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Vijayanagar',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Attiguppe',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'Rajarajeshwari Nagar',           subtitle: 'Bengaluru, Karnataka' },
  { name: 'Kengeri',                        subtitle: 'Bengaluru, Karnataka' },
  { name: 'Uttarahalli',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Jakkur',                         subtitle: 'Bengaluru, Karnataka' },
  { name: 'Hegde Nagar',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Kalyan Nagar',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Baiyappanahalli',                subtitle: 'Bengaluru, Karnataka' },
  { name: 'CV Raman Nagar',                 subtitle: 'Bengaluru, Karnataka' },
  { name: 'Austin Town',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Pulikeshi Nagar',                subtitle: 'Bengaluru, Karnataka' },
  { name: 'Shivaji Nagar',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Sadananda Nagar',                subtitle: 'Bengaluru, Karnataka' },
  { name: 'Domlur',                         subtitle: 'Bengaluru, Karnataka' },
  { name: 'Ejipura',                        subtitle: 'Bengaluru, Karnataka' },
  { name: 'St. John\'s Church Road',        subtitle: 'Bengaluru, Karnataka' },
  { name: 'Sadashiv Nagar',                 subtitle: 'Bengaluru, Karnataka' },
  { name: 'Seshadripuram',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Basaveshwara Nagar',             subtitle: 'Bengaluru, Karnataka' },
  { name: 'Laggere',                        subtitle: 'Bengaluru, Karnataka' },
  { name: 'Nandini Layout',                 subtitle: 'Bengaluru, Karnataka' },
  { name: 'Mathikere',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'BEL Layout',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'R.T. Nagar',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Kammanahalli',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Benson Town',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Cooke Town',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Williams Town',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Langford Gardens',               subtitle: 'Bengaluru, Karnataka' },
  { name: 'Race Course Road',               subtitle: 'Bengaluru, Karnataka' },
  { name: 'Cunningham Road',                subtitle: 'Bengaluru, Karnataka' },
  { name: 'Residency Road',                 subtitle: 'Bengaluru, Karnataka' },
  { name: 'MG Road',                        subtitle: 'Bengaluru, Karnataka' },
  { name: 'Brigade Road',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Church Street',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Commercial Street',              subtitle: 'Bengaluru, Karnataka' },
  { name: 'Koramangala 5th Block',          subtitle: 'Bengaluru, Karnataka' },
  { name: 'Koramangala 6th Block',          subtitle: 'Bengaluru, Karnataka' },
  { name: 'Koramangala 8th Block',          subtitle: 'Bengaluru, Karnataka' },
  { name: 'Chickpet',                       subtitle: 'Bengaluru, Karnataka' },
  { name: 'KR Market',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'Upparpet',                       subtitle: 'Bengaluru, Karnataka' },
  { name: 'Majestic',                       subtitle: 'Bengaluru, Karnataka' },
  { name: 'Shantinagar',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Wilson Garden',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Lavelle Road',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Richmond Town',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Langford Town',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Neelasandra',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Agrahara Layout',                subtitle: 'Bengaluru, Karnataka' },
  { name: 'Devanahalli',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Bagalur',                        subtitle: 'Bengaluru, Karnataka' },
  { name: 'Yelahanka New Town',             subtitle: 'Bengaluru, Karnataka' },
  { name: 'Puttenahalli',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'JP Nagar 7th Phase',             subtitle: 'Bengaluru, Karnataka' },
  { name: 'Arekere',                        subtitle: 'Bengaluru, Karnataka' },
  { name: 'Gottigere',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'Anekal',                         subtitle: 'Bengaluru, Karnataka' },
  { name: 'Hosur Road',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Hosakote',                       subtitle: 'Bengaluru, Karnataka' },
  { name: 'KR Puram',                       subtitle: 'Bengaluru, Karnataka' },
  { name: 'Mahadevapura',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Hoodi',                          subtitle: 'Bengaluru, Karnataka' },
  { name: 'Garudachar Palya',               subtitle: 'Bengaluru, Karnataka' },
  { name: 'Thubarahalli',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'Varthur',                        subtitle: 'Bengaluru, Karnataka' },
  { name: 'HAL Airport Road',               subtitle: 'Bengaluru, Karnataka' },
  { name: 'Old Airport Road',               subtitle: 'Bengaluru, Karnataka' },
  { name: 'Windmill Road',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Sankey Road',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Palace Road',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Seshadripuram',                  subtitle: 'Bengaluru, Karnataka' },
  { name: 'Raj Bhavan Road',                subtitle: 'Bengaluru, Karnataka' },
  { name: 'Nandidurga Road',                subtitle: 'Bengaluru, Karnataka' },
  { name: 'Ashok Nagar',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Chamarajpet',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Gandhi Nagar',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'N.R. Colony',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Banaswadi',                      subtitle: 'Bengaluru, Karnataka' },
  { name: 'Banaswadi Main Road',            subtitle: 'Bengaluru, Karnataka' },
  { name: 'HBR Layout',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Kalyan Nagar',                   subtitle: 'Bengaluru, Karnataka' },
  { name: 'HRBR Layout',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Thanisandra',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Thanisandra Main Road',          subtitle: 'Bengaluru, Karnataka' },
  { name: 'Jakkur Lake',                    subtitle: 'Bengaluru, Karnataka' },
  { name: 'Chikkajala',                     subtitle: 'Bengaluru, Karnataka' },
  { name: 'Airport Toll Gate',              subtitle: 'Devanahalli, Bengaluru' },

  // ── Airports ──
  { name: 'Kempegowda International Airport (BLR)', subtitle: 'Devanahalli, Bengaluru' },
  { name: 'HAL Airport (VOBZ)',                     subtitle: 'Bengaluru, Karnataka' },

  // ── Railway Stations ──
  { name: 'Bangalore City Railway Station (SBC)',   subtitle: 'Majestic, Bengaluru' },
  { name: 'Yeshwanthpur Railway Station',            subtitle: 'Yeswanthpur, Bengaluru' },
  { name: 'KR Puram Railway Station',                subtitle: 'KR Puram, Bengaluru' },
  { name: 'Krishnarajapuram Railway Station',        subtitle: 'KR Puram, Bengaluru' },
  { name: 'Mysore Junction (MYS)',                   subtitle: 'Mysuru, Karnataka' },
  { name: 'Hubballi Junction (UBL)',                 subtitle: 'Hubballi, Karnataka' },
  { name: 'Coimbatore Junction (CBE)',               subtitle: 'Coimbatore, Tamil Nadu' },
  { name: 'Chennai Central (MAS)',                   subtitle: 'Chennai, Tamil Nadu' },
  { name: 'Pune Junction (PUNE)',                    subtitle: 'Pune, Maharashtra' },
  { name: 'Goa - Madgaon Station (MAO)',             subtitle: 'Margao, Goa' },

  // ── Landmarks / Hotels / Tourist Spots ──
  { name: 'Bangalore Palace',              subtitle: 'Vasanth Nagar, Bengaluru' },
  { name: 'Lalbagh Botanical Garden',      subtitle: 'Mavalli, Bengaluru' },
  { name: 'Cubbon Park',                   subtitle: 'Kasturba Road, Bengaluru' },
  { name: 'Vidhana Soudha',                subtitle: 'Ambedkar Veedhi, Bengaluru' },
  { name: 'ISKCON Temple',                 subtitle: 'Rajajinagar, Bengaluru' },
  { name: 'Wonderla',                      subtitle: 'Mysore Road, Bengaluru' },
  { name: 'Nandi Hills',                   subtitle: 'Chikkaballapur, Karnataka' },
  { name: 'Tippu\'s Summer Palace',        subtitle: 'Albert Victor Road, Bengaluru' },
  { name: 'Lumbini Gardens',               subtitle: 'Hebbal, Bengaluru' },
  { name: 'Snow City',                     subtitle: 'Jayanagar, Bengaluru' },
  { name: 'Innovative Film City',          subtitle: 'Bidadi, Bengaluru' },
  { name: 'Devanahalli Fort',              subtitle: 'Devanahalli, Bengaluru' },
  { name: 'Mekedatu',                      subtitle: 'Ramanagara, Karnataka' },
  { name: 'Savandurga',                    subtitle: 'Ramanagara, Karnataka' },
  { name: 'Bilikal Rangaswamy Betta',      subtitle: 'Kanakapura, Karnataka' },
  { name: 'Anjaneya Swamy Temple - Nandi Hills', subtitle: 'Chikkaballapur, Karnataka' },

  // ── Hotels & Premium Properties ──
  { name: 'Taj West End',                  subtitle: 'Race Course Road, Bengaluru' },
  { name: 'ITC Grand Chola',               subtitle: 'Old Airport Road, Bengaluru' },
  { name: 'Leela Palace Bengaluru',        subtitle: 'Old Airport Road, Bengaluru' },
  { name: 'The Ritz-Carlton Bengaluru',    subtitle: 'UB City, Bengaluru' },
  { name: 'Trident Hotel',                 subtitle: 'Old Airport Road, Bengaluru' },
  { name: 'Marriott Hotel Bengaluru',      subtitle: 'MG Road, Bengaluru' },
  { name: 'Sheraton Grand Bengaluru',      subtitle: 'Rajajinagar, Bengaluru' },
  { name: 'The Oberoi Bengaluru',          subtitle: 'Cubbon Park, Bengaluru' },
  { name: 'JW Marriott Bengaluru',         subtitle: 'Precinct 3, Marathahalli' },
  { name: 'Vivanta Bengaluru',             subtitle: 'Residency Road, Bengaluru' },
  { name: 'Radisson Blu Atria Bengaluru',  subtitle: 'Richmond Road, Bengaluru' },
  { name: 'Prestige Ozone',                subtitle: 'Whitefield, Bengaluru' },
  { name: 'Hyatt Regency Bengaluru',       subtitle: 'Old Airport Road, Bengaluru' },
  { name: 'Hilton Bengaluru Embassy GolfLinks', subtitle: 'Benson Town, Bengaluru' },
  { name: 'Fairfield by Marriott Bengaluru', subtitle: 'Rajajinagar, Bengaluru' },
  { name: 'Taj MG Road Bengaluru',         subtitle: 'MG Road, Bengaluru' },
  { name: 'Four Seasons Hotel Bengaluru',  subtitle: 'Old Airport Road, Bengaluru' },
  { name: 'St. Regis Bengaluru',           subtitle: 'Old Airport Road, Bengaluru' },
  { name: 'The Leela Bhartiya City',       subtitle: 'Hebbal, Bengaluru' },
  { name: 'The Chancery Pavilion',         subtitle: 'Residency Road, Bengaluru' },
  { name: 'Hotel Empire',                  subtitle: 'Gandhinagar, Bengaluru' },
  { name: 'Hotel Shanthi Sagar',           subtitle: 'Rajajinagar, Bengaluru' },
  { name: 'Taj West End',                  subtitle: 'Race Course Road, Bengaluru' },
  { name: 'Woodrose Club',                 subtitle: 'Jayanagar, Bengaluru' },
  { name: 'Bharath Petroleum Rest House',  subtitle: 'Whitefield, Bengaluru' },
  { name: 'Club Mahindra Derby',            subtitle: 'Old Madras Road, Bengaluru' },
  { name: 'Jayamahal Palace Hotel',         subtitle: 'Jayamahal, Bengaluru' },
  { name: 'The Windmills of Your Mind',     subtitle: 'Whitefield, Bengaluru' },

  // ── Bangalore Suburbs / Extended Areas ──
  { name: 'Bidadi',                         subtitle: 'Ramanagara, Karnataka' },
  { name: 'Ramanagara',                     subtitle: 'Karnataka' },
  { name: 'Magadi',                         subtitle: 'Ramanagara, Karnataka' },
  { name: 'Nelamangala',                    subtitle: 'Bengaluru Rural, Karnataka' },
  { name: 'Dobbaspet',                      subtitle: 'Tumakuru, Karnataka' },
  { name: 'Tumakuru',                       subtitle: 'Karnataka' },
  { name: 'Dodballapur',                    subtitle: 'Bengaluru Rural, Karnataka' },
  { name: 'Hoskote',                        subtitle: 'Bengaluru Rural, Karnataka' },
  { name: 'Anekal',                         subtitle: 'Bengaluru Urban, Karnataka' },
  { name: 'Chikkaballapur',                 subtitle: 'Karnataka' },
  { name: 'Kolar',                          subtitle: 'Karnataka' },
  { name: 'Sidlaghatta',                    subtitle: 'Chikkaballapur, Karnataka' },
  { name: 'Chintamani',                     subtitle: 'Chikkaballapur, Karnataka' },
  { name: 'Gauribidanur',                   subtitle: 'Chikkaballapur, Karnataka' },
  { name: 'Bagepalli',                      subtitle: 'Chikkaballapur, Karnataka' },

  // ── Outstation – Karnataka ──
  { name: 'Mysuru',                         subtitle: 'Karnataka' },
  { name: 'Mysore Palace',                  subtitle: 'Mysuru, Karnataka' },
  { name: 'Chamundi Hills',                 subtitle: 'Mysuru, Karnataka' },
  { name: 'Srirangapatna',                  subtitle: 'Mandya, Karnataka' },
  { name: 'Shivanasamudra Falls',           subtitle: 'Mandya, Karnataka' },
  { name: 'Coorg',                          subtitle: 'Karnataka' },
  { name: 'Madikeri',                       subtitle: 'Coorg, Karnataka' },
  { name: 'Abbey Falls',                    subtitle: 'Coorg, Karnataka' },
  { name: 'Dubare Elephant Camp',           subtitle: 'Coorg, Karnataka' },
  { name: 'Chikmagalur',                    subtitle: 'Karnataka' },
  { name: 'Mullayanagiri',                  subtitle: 'Chikmagalur, Karnataka' },
  { name: 'Baba Budangiri',                 subtitle: 'Chikmagalur, Karnataka' },
  { name: 'Hampi',                          subtitle: 'Karnataka' },
  { name: 'Virupaksha Temple',              subtitle: 'Hampi, Karnataka' },
  { name: 'Pattadakal',                     subtitle: 'Bagalkot, Karnataka' },
  { name: 'Aihole',                         subtitle: 'Bagalkot, Karnataka' },
  { name: 'Badami',                         subtitle: 'Bagalkot, Karnataka' },
  { name: 'Ooty',                           subtitle: 'Tamil Nadu' },
  { name: 'Wayanad',                        subtitle: 'Kerala' },
  { name: 'Kabini',                         subtitle: 'Karnataka' },
  { name: 'Nagarhole National Park',        subtitle: 'Kodagu, Karnataka' },
  { name: 'Bandipur National Park',         subtitle: 'Chamarajanagar, Karnataka' },
  { name: 'Biligiriranga Hills (BR Hills)', subtitle: 'Chamarajanagar, Karnataka' },
  { name: 'Kolli Hills',                    subtitle: 'Namakkal, Tamil Nadu' },
  { name: 'Kudremukh',                      subtitle: 'Chikkamagaluru, Karnataka' },
  { name: 'Agumbe',                         subtitle: 'Shivamogga, Karnataka' },
  { name: 'Jog Falls',                      subtitle: 'Shivamogga, Karnataka' },
  { name: 'Murudeshwar',                    subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Gokarna',                        subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Dandeli',                        subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Siddapura',                      subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Sirsi',                          subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Shivamogga',                     subtitle: 'Karnataka' },
  { name: 'Hubballi',                       subtitle: 'Karnataka' },
  { name: 'Belgaum',                        subtitle: 'Karnataka' },
  { name: 'Belur',                          subtitle: 'Hassan, Karnataka' },
  { name: 'Halebidu',                       subtitle: 'Hassan, Karnataka' },
  { name: 'Shravanabelagola',               subtitle: 'Hassan, Karnataka' },
  { name: 'Hassan',                         subtitle: 'Karnataka' },
  { name: 'Madurai',                        subtitle: 'Tamil Nadu' },
  { name: 'Rameswaram',                     subtitle: 'Tamil Nadu' },
  { name: 'Kodaikanal',                     subtitle: 'Tamil Nadu' },
  { name: 'Kanyakumari',                    subtitle: 'Tamil Nadu' },
  { name: 'Pondicherry',                    subtitle: 'Puducherry' },
  { name: 'Pune',                           subtitle: 'Maharashtra' },
  { name: 'Mumbai',                         subtitle: 'Maharashtra' },
  { name: 'Goa',                            subtitle: 'India' },
  { name: 'Goa - North Goa',                subtitle: 'Goa, India' },
  { name: 'Goa - South Goa',                subtitle: 'Goa, India' },
  { name: 'Hyderabad',                      subtitle: 'Telangana' },
  { name: 'Chennai',                        subtitle: 'Tamil Nadu' },
  { name: 'Coimbatore',                     subtitle: 'Tamil Nadu' },
  { name: 'Salem',                          subtitle: 'Tamil Nadu' },
  { name: 'Hosur',                          subtitle: 'Tamil Nadu' },
  { name: 'Vellore',                        subtitle: 'Tamil Nadu' },
  { name: 'Tirupati',                       subtitle: 'Andhra Pradesh' },
  { name: 'Vijayawada',                     subtitle: 'Andhra Pradesh' },
  { name: 'Kochi',                          subtitle: 'Kerala' },
  { name: 'Kerala',                         subtitle: 'India' },
  { name: 'Kerala - Munnar',                subtitle: 'Kerala, India' },
  { name: 'Kerala - Alleppey',              subtitle: 'Kerala, India' },
  { name: 'Kerala - Thekkady',              subtitle: 'Kerala, India' },
  { name: 'Nagpur',                         subtitle: 'Maharashtra' },
  { name: 'Gokarna',                        subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Manipal',                        subtitle: 'Udupi, Karnataka' },
  { name: 'Udupi',                          subtitle: 'Karnataka' },
  { name: 'Chitradurga',                    subtitle: 'Karnataka' },
  { name: 'Davanagere',                     subtitle: 'Karnataka' },
  { name: 'Chitradurga Fort',               subtitle: 'Chitradurga, Karnataka' },
  { name: 'Kollur Mookambika Temple',       subtitle: 'Udupi, Karnataka' },
  { name: 'Sringeri',                       subtitle: 'Chikkamagaluru, Karnataka' },
  { name: 'Horanadu',                       subtitle: 'Chikkamagaluru, Karnataka' },
  { name: 'Kukke Subramanya Temple',        subtitle: 'Dakshina Kannada, Karnataka' },
  { name: 'Dharmasthala',                   subtitle: 'Dakshina Kannada, Karnataka' },
  { name: 'Udupi Sri Krishna Temple',       subtitle: 'Udupi, Karnataka' },
  { name: 'Bhagamandala',                   subtitle: 'Kodagu, Karnataka' },
  { name: 'Talakaveri',                     subtitle: 'Kodagu, Karnataka' },
  { name: 'Mandya',                         subtitle: 'Karnataka' },
  { name: 'Maddur',                         subtitle: 'Mandya, Karnataka' },
  { name: 'Malavalli',                      subtitle: 'Mandya, Karnataka' },
  { name: 'T Narsipura',                    subtitle: 'Mysuru, Karnataka' },
  { name: 'Bannur',                         subtitle: 'Mysuru, Karnataka' },
  { name: 'Kollegal',                       subtitle: 'Chamarajanagar, Karnataka' },
  { name: 'Yelandur',                       subtitle: 'Chamarajanagar, Karnataka' },
  { name: 'Gundlupet',                      subtitle: 'Chamarajanagar, Karnataka' },
  { name: 'Nanjangud',                      subtitle: 'Mysuru, Karnataka' },
  { name: 'Hunsur',                         subtitle: 'Mysuru, Karnataka' },
  { name: 'Periyapatna',                    subtitle: 'Mysuru, Karnataka' },
  { name: 'Bylakuppe',                      subtitle: 'Mysuru, Karnataka' },
  { name: 'Bhadravathi',                    subtitle: 'Shivamogga, Karnataka' },
  { name: 'Honnavar',                       subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Karwar',                         subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Ankola',                         subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Kumta',                          subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Sirsi',                          subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Yellapur',                       subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Siddapur',                       subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Kundapura',                      subtitle: 'Udupi, Karnataka' },
  { name: 'Brahmavar',                      subtitle: 'Udupi, Karnataka' },
  { name: 'Udupi',                          subtitle: 'Karnataka' },
  { name: 'Manipal',                        subtitle: 'Udupi, Karnataka' },
  { name: 'Karkala',                        subtitle: 'Udupi, Karnataka' },
  { name: 'Moodabidri',                     subtitle: 'Dakshina Kannada, Karnataka' },
  { name: 'Mangaluru',                      subtitle: 'Karnataka' },
  { name: 'Mangalore International Airport (IXE)', subtitle: 'Mangaluru, Karnataka' },
  { name: 'Beluru',                         subtitle: 'Hassan, Karnataka' },
  { name: 'Halebeedu',                      subtitle: 'Hassan, Karnataka' },
  { name: 'Sravanabelagola',                subtitle: 'Hassan, Karnataka' },
  { name: 'Hassan',                         subtitle: 'Karnataka' },
  { name: 'Arkalgud',                       subtitle: 'Hassan, Karnataka' },
  { name: 'Channarayapatna',                subtitle: 'Hassan, Karnataka' },
  { name: 'Belur',                          subtitle: 'Hassan, Karnataka' },
  { name: 'Alur',                           subtitle: 'Hassan, Karnataka' },
  { name: 'Holenarasipura',                 subtitle: 'Hassan, Karnataka' },
  { name: 'Tiptur',                         subtitle: 'Tumakuru, Karnataka' },
  { name: 'Turuvekere',                     subtitle: 'Tumakuru, Karnataka' },
  { name: 'Kunigal',                        subtitle: 'Tumakuru, Karnataka' },
  { name: 'Pavagada',                       subtitle: 'Tumakuru, Karnataka' },
  { name: 'Madhugiri',                      subtitle: 'Tumakuru, Karnataka' },
  { name: 'Koratagere',                     subtitle: 'Tumakuru, Karnataka' },
  { name: 'Gubbi',                          subtitle: 'Tumakuru, Karnataka' },
  { name: 'Sira',                           subtitle: 'Tumakuru, Karnataka' },
  { name: 'Nagamangala',                    subtitle: 'Mandya, Karnataka' },
  { name: 'Pandavapura',                    subtitle: 'Mandya, Karnataka' },
  { name: 'Maddur',                         subtitle: 'Mandya, Karnataka' },
  { name: 'Srirangapatna',                  subtitle: 'Mandya, Karnataka' },
  { name: 'Krishna Raja Sagara (KRS)',      subtitle: 'Mandya, Karnataka' },
  { name: 'Lalitha Mahal Palace',           subtitle: 'Mysuru, Karnataka' },
  { name: 'Mysuru Zoo',                     subtitle: 'Mysuru, Karnataka' },
  { name: 'Ranganathittu Bird Sanctuary',   subtitle: 'Mysuru, Karnataka' },
  { name: 'Bylakuppe Golden Temple',        subtitle: 'Mysuru, Karnataka' },
  { name: 'Bekal Fort',                     subtitle: 'Kerala, India' },
  { name: 'Hampi Bazaar',                   subtitle: 'Hampi, Karnataka' },
  { name: 'Hospet',                         subtitle: 'Vijayanagara, Karnataka' },
  { name: 'Koppal',                         subtitle: 'Karnataka' },
  { name: 'Raichur',                        subtitle: 'Karnataka' },
  { name: 'Yadgir',                         subtitle: 'Karnataka' },
  { name: 'Bidar',                          subtitle: 'Karnataka' },
  { name: 'Kalaburagi',                     subtitle: 'Karnataka' },
  { name: 'Bhatkal',                        subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Honnavar Beach',                 subtitle: 'Uttara Kannada, Karnataka' },
  { name: 'Ullal Beach',                    subtitle: 'Dakshina Kannada, Karnataka' },
  { name: 'Panambur Beach',                 subtitle: 'Mangaluru, Karnataka' },
  { name: 'Tannirbhavi Beach',              subtitle: 'Mangaluru, Karnataka' },
  { name: 'Mangaladevi Temple',             subtitle: 'Mangaluru, Karnataka' },
  { name: 'Kadri Manjunath Temple',         subtitle: 'Mangaluru, Karnataka' },
];

// ── Category tags for dropdown grouping ──────────────────────────────────────
const LOCATION_TAGS = {};
LOCATIONS_DB.forEach(loc => {
  const n = loc.name.toLowerCase();
  if (n.includes('airport'))                              LOCATION_TAGS[loc.name] = 'Airport';
  else if (n.includes('railway') || n.includes('station') || n.includes('junction')) LOCATION_TAGS[loc.name] = 'Railway';
  else if (n.includes('hotel') || n.includes('palace') || n.includes('oberoi') || n.includes('taj') || n.includes('marriott') || n.includes('ritz') || n.includes('hilton') || n.includes('hyatt') || n.includes('leela') || n.includes('vivanta') || n.includes('fairfield') || n.includes('trident') || n.includes('sheraton') || n.includes('four seasons') || n.includes('regis') || n.includes('club') || n.includes('pavilion')) LOCATION_TAGS[loc.name] = 'Hotel';
  else if (n.includes('park') || n.includes('fort') || n.includes('falls') || n.includes('hills') || n.includes('temple') || n.includes('beach') || n.includes('garden') || n.includes('palace')) LOCATION_TAGS[loc.name] = 'Landmark';
  else if (loc.subtitle.includes('Bengaluru') || loc.subtitle.includes('Bangalore')) LOCATION_TAGS[loc.name] = 'Bengaluru';
  else LOCATION_TAGS[loc.name] = 'Destination';
});

const TAG_ORDER = ['Bengaluru', 'Airport', 'Railway', 'Hotel', 'Landmark', 'Destination'];
const TAG_COLORS = {
  Bengaluru:   { bg: '#DBEAFE', text: '#1E40AF' },
  Airport:     { bg: '#FEF3C7', text: '#92400E' },
  Railway:     { bg: '#D1FAE5', text: '#065F46' },
  Hotel:       { bg: '#FCE7F3', text: '#9D174D' },
  Landmark:    { bg: '#EDE9FE', text: '#5B21B6' },
  Destination: { bg: '#F1F5F9', text: '#334155' },
};

// ── Reusable autocomplete field ──────────────────────────────────────────────
function LocationAutocomplete({
  value,
  onChange,
  placeholder,
  icon: Icon,
  onCurrentLocation,
  isLocating,
  disabled,
  dropdownWidth,
  minQueryLength = 2,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = useMemo(() => {
    if (value.trim().length < minQueryLength) return [];
    const q = value.toLowerCase();
    const starts  = LOCATIONS_DB.filter(l => l.name.toLowerCase().startsWith(q));
    const includes = LOCATIONS_DB.filter(l =>
      !l.name.toLowerCase().startsWith(q) &&
      (l.name.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q))
    );
    return [...starts, ...includes].slice(0, 20);
  }, [value, minQueryLength]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="crs-input-section location" ref={ref} style={{ position: 'relative' }}>
      <Icon className="crs-input-icon" size={18} />
      <input
        type="text"
        className="crs-input"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={e => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
      />
      {value && !disabled && (
        <button
          type="button"
          className="crs-clear-btn"
          onClick={() => { onChange(''); setOpen(true); }}
          aria-label="Clear"
        >
          <X size={13} />
        </button>
      )}
      {open && !disabled && (
        <div className="crs-dropdown" style={{ minWidth: dropdownWidth || '340px' }}>
          {onCurrentLocation && (
            <button type="button" className="crs-dropdown-item" onClick={() => { onCurrentLocation(); setOpen(false); }}>
              {isLocating ? (
                <Loader2 size={18} className="crs-dropdown-icon crs-spinner" />
              ) : (
                <LocateFixed size={18} className="crs-dropdown-icon crs-dropdown-current-icon" />
              )}
              <div className="crs-dropdown-text">
                <span className="crs-dropdown-title" style={{ color: '#0284C7' }}>
                  {isLocating ? 'Detecting location…' : 'Use my current location'}
                </span>
              </div>
            </button>
          )}
          {filtered.length > 0 ? (
            filtered.map((loc, idx) => {
              const tag = LOCATION_TAGS[loc.name] || 'Other';
              const tc = TAG_COLORS[tag] || TAG_COLORS.Destination;
              return (
                <button key={idx} type="button" className="crs-dropdown-item" onClick={() => { onChange(loc.name); setOpen(false); }}>
                  <MapPin className="crs-dropdown-icon" size={16} />
                  <div className="crs-dropdown-text">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="crs-dropdown-title">{loc.name}</span>
                      <span className="crs-location-tag" style={{ background: tc.bg, color: tc.text }}>{tag}</span>
                    </div>
                    <span className="crs-dropdown-subtitle">{loc.subtitle}</span>
                  </div>
                </button>
              );
            })
          ) : (
            value.trim().length >= minQueryLength && (
              <div className="crs-dropdown-item" style={{ cursor: 'default' }}>
                <div className="crs-dropdown-text">
                  <span className="crs-dropdown-subtitle" style={{ textAlign: 'center' }}>No locations found — press Search to browse all vehicles</span>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

// ── Date helpers ─────────────────────────────────────────────────────────────
const todayStr = () => {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
};

export const CarRentalSearch = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('airport');

  // Location state
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Dates & times
  const today = useMemo(() => todayStr(), []);
  const [pickupDate, setPickupDate] = useState(today);
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');

  // Search results
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultCategoryFilter, setResultCategoryFilter] = useState('all');
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState(null);

  // Whether destination is required (airport: yes if One Way / Round Trip, else no)
  const showDestination = activeTab === 'oneway' || activeTab === 'roundtrip' || activeTab === 'outstation';
  const showReturnDate = activeTab === 'roundtrip' || activeTab === 'outstation';
  const showTime = true; // all trip types need time

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          let name = 'Current Location';
          if (data?.address) {
            const { suburb, neighbourhood, town, city } = data.address;
            const primary = suburb || neighbourhood || town || city;
            if (primary) name = primary;
          }
          setPickupLocation(name);
        } catch {
          setLocationError('Failed to detect location');
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        setLocationError('Location permission denied');
      },
      { timeout: 10000 }
    );
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      setTimeout(() => {
        document.getElementById('crs-search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 350);
  };

  const duplicateMarquee = (arr) => [...arr, ...arr];
  const col1Marquee = useMemo(() => duplicateMarquee(COL_1_IMAGES), []);
  const col2Marquee = useMemo(() => duplicateMarquee(COL_2_IMAGES), []);

  const getVehicleTariffInfo = (vehicle) => {
    if (activeTab === 'airport') {
      const p = pricingService.getAirportTransferPrice(vehicle.id);
      return { price: p ? pricingService.formatPrice(p) : 'Price on Request', label: 'Flat Airport VIP Transfer', rawPrice: p };
    }
    if (activeTab === 'local') {
      const t = pricingService.getLocalTariff(vehicle.id);
      const p = t?.eight_hours_eighty_km;
      return { price: p ? pricingService.formatPrice(p) : 'Price on Request', label: '8h / 80km Full Day Local Package', rawPrice: p };
    }
    if (activeTab === 'corporate') {
      const t = pricingService.getLocalTariff(vehicle.id);
      const p = t?.eight_hours_eighty_km;
      return { price: p ? pricingService.formatPrice(p) : 'Price on Request', label: 'Daily Corporate B2B Billing', rawPrice: p };
    }
    // outstation, roundtrip, oneway
    const t = pricingService.getOutstationTariff(vehicle.id);
    const p = t?.rate_per_km;
    return { price: p ? `₹${p}/km` : 'Price on Request', label: `Outstation (${t?.minimum_km_per_day || 300} km/day min)`, rawPrice: p };
  };

  const filteredVehicles = useMemo(() => fleetData.filter(v => {
    if (resultCategoryFilter === 'sedans')  return v.seatCategory === '3-4' || v.category.toLowerCase().includes('sedan');
    if (resultCategoryFilter === 'suvs')    return v.category.toLowerCase().includes('mpv') || v.category.toLowerCase().includes('suv');
    if (resultCategoryFilter === 'luxury')  return v.categoryKey === 'luxury' || (v.badgeText && v.badgeText.includes('VIP'));
    if (resultCategoryFilter === 'buses')   return v.category.toLowerCase().includes('bus') || v.category.toLowerCase().includes('traveller') || v.category.toLowerCase().includes('urbania');
    return true;
  }), [resultCategoryFilter]);

  const activeTabLabel = TABS.find(t => t.id === activeTab)?.label || 'Car Rental';

  return (
    <section className="car-rental-search-section">
      <div className="crs-container" id="quick-enquiry">
        {/* ── LEFT – Feature Highlights & Trust Pillars ───────────────────── */}
        <div className="crs-left-panel">
          <div className="crs-header-compact">
            <div className="crs-feature-badge">
              <ShieldCheck size={13} />
              <span>Bengaluru Luxury Chauffeur Specialists</span>
            </div>
            <h2 className="crs-headline">
              Exceptional Journeys, Backed by Uncompromised Luxury.
            </h2>
          </div>

          <div className="crs-trust-grid">
            <div className="crs-trust-item">
              <ShieldCheck size={16} color="#C5A059" className="crs-trust-icon" />
              <span className="crs-trust-title">100% Verified Chauffeurs</span>
            </div>

            <div className="crs-trust-item">
              <Clock size={16} color="#0284C7" className="crs-trust-icon" />
              <span className="crs-trust-title">24/7 Guaranteed Dispatch</span>
            </div>

            <div className="crs-trust-item">
              <FileText size={16} color="#059669" className="crs-trust-icon" />
              <span className="crs-trust-title">Transparent GST Billing</span>
            </div>

            <div className="crs-trust-item">
              <Crown size={16} color="#D97706" className="crs-trust-icon" />
              <span className="crs-trust-title">Flagship Luxury Fleet</span>
            </div>
          </div>

          <div className="crs-cta-cluster">
            <WhatsAppEnquiryMenu
              context={{ tripType: 'Concierge Booking' }}
              triggerLabel="WhatsApp Concierge"
              triggerIcon={WhatsAppIcon}
              iconSize={15}
              buttonStyle={{
                background: '#25D366',
                color: '#FFFFFF',
                borderRadius: '999px',
                padding: '8px 18px',
                fontSize: '0.84rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.28)',
                transition: 'transform 0.2s ease'
              }}
            />

            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="crs-btn-call"
            >
              <PhoneCall size={14} color="#0F172A" />
              <span>Call: +91 76250 59665</span>
            </a>

            <button
              type="button"
              className="crs-btn-explore"
              onClick={() => {
                const el = document.getElementById('fleet-section') || document.getElementById('journey-planner');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (onNavigate) onNavigate('fleets');
              }}
            >
              <span>Explore Fleet</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* ── RIGHT – Image Collage ────────────────────────────────────────── */}
        <div className="crs-right-panel">
          <div className="crs-collage-wrapper">
            <div className="crs-marquee-col col-1">
              {col1Marquee.map((img, i) => (
                <div
                  key={i}
                  className={`crs-image-card ${img.arClass}`}
                  onClick={() => onNavigate && onNavigate('outstation')}
                  style={{ cursor: onNavigate ? 'pointer' : 'default' }}
                  title={`Outstation to ${img.alt}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
            <div className="crs-marquee-col col-2">
              {col2Marquee.map((img, i) => (
                <div
                  key={i}
                  className={`crs-image-card ${img.arClass}`}
                  onClick={() => onNavigate && onNavigate('outstation')}
                  style={{ cursor: onNavigate ? 'pointer' : 'default' }}
                  title={`Outstation to ${img.alt}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Results ────────────────────────────────────────────────── */}
      {showResults && (
        <div id="crs-search-results" className="crs-results-wrapper">
          <div className="crs-results-header">
            <div>
              <div className="crs-results-badge">
                <Sparkles size={13} />
                <span>Available Luxury Vehicles</span>
              </div>
              <h3 className="crs-results-title">
                Matching Fleet for {activeTabLabel}
              </h3>
              <p className="crs-results-sub">
                <span>Pickup: <strong>{pickupLocation || 'Bengaluru City'}</strong></span>
                {showDestination && dropLocation && (
                  <> <span>•</span> <span>Drop: <strong>{dropLocation}</strong></span></>
                )}
                <span>•</span>
                <span>Date: <strong>{pickupDate || 'Immediate'}</strong>{pickupTime ? ` at ${pickupTime}` : ''}</span>
                {showReturnDate && returnDate && (
                  <> <span>•</span> <span>Return: <strong>{returnDate}{returnTime ? ` at ${returnTime}` : ''}</strong></span></>
                )}
                <span>•</span>
                <span style={{ color: '#16A34A', fontWeight: '700' }}>100% Verified Chauffeurs</span>
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div className="crs-results-filter-bar">
                {[
                  { id: 'all',    label: `All (${fleetData.length})` },
                  { id: 'sedans', label: 'Sedans' },
                  { id: 'suvs',   label: 'SUVs & MPVs' },
                  { id: 'luxury', label: 'VIP Flagship' },
                  { id: 'buses',  label: 'Coaches & Vans' },
                ].map(f => (
                  <button key={f.id} type="button"
                    className={`crs-filter-pill ${resultCategoryFilter === f.id ? 'active' : ''}`}
                    onClick={() => setResultCategoryFilter(f.id)}
                  >{f.label}</button>
                ))}
              </div>
              <button type="button" className="crs-close-btn" onClick={() => setShowResults(false)} title="Close">
                <X size={14} /><span>Close</span>
              </button>
            </div>
          </div>

          <div className="crs-vehicles-grid">
            {filteredVehicles.map(vehicle => {
              const tariffInfo = getVehicleTariffInfo(vehicle);
              return (
                <div key={vehicle.id} className="crs-vehicle-card">
                  <div className="crs-card-img-wrap">
                    <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
                    {vehicle.badgeText && <span className="crs-card-badge">{vehicle.badgeText}</span>}
                  </div>
                  <div className="crs-card-body">
                    <div>
                      <h4 className="crs-card-title">{vehicle.name}</h4>
                      <div className="crs-card-category">{vehicle.category}</div>
                      <div className="crs-card-specs">
                        <span className="crs-spec-tag"><Users size={12} />{vehicle.passengerCapacity || 4} Seats</span>
                        <span className="crs-spec-tag"><ShieldCheck size={12} />Chauffeur</span>
                      </div>
                    </div>
                    <div>
                      <div className="crs-card-pricing">
                        <div>
                          <div className="crs-price-label">{tariffInfo.label}</div>
                          <div className="crs-price-value">{tariffInfo.price}</div>
                        </div>
                        <span className="crs-dispatch-tag">Instant Dispatch</span>
                      </div>
                      <div className="crs-card-actions">
                        <WhatsAppEnquiryMenu
                          context={{
                            vehicleName: vehicle.name,
                            tripType: activeTabLabel,
                            pickup: pickupLocation,
                            drop: showDestination ? dropLocation : undefined,
                            date: pickupDate,
                            time: pickupTime,
                            returnDate: showReturnDate ? returnDate : undefined,
                            returnTime: showReturnDate ? returnTime : undefined,
                          }}
                          menuPlacement="top-end"
                          triggerLabel="WhatsApp"
                          triggerIcon={WhatsAppIcon}
                          iconSize={15}
                          buttonStyle={{
                            flex: 1,
                            background: '#25D366',
                            color: '#FFFFFF',
                            borderRadius: '999px',
                            padding: '9px 12px',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                            fontFamily: 'inherit'
                          }}
                        />
                        <button type="button" className="crs-btn-reserve"
                          onClick={() => setSelectedVehicleForModal(vehicle)}>
                          <span>Reserve Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Booking modal */}
      {selectedVehicleForModal && (
        <VehicleBookingModal
          vehicle={selectedVehicleForModal}
          isOpen={Boolean(selectedVehicleForModal)}
          onClose={() => setSelectedVehicleForModal(null)}
          initialLocation={pickupLocation}
          initialDate={pickupDate}
          initialPackage={activeTab}
        />
      )}
    </section>
  );
};
