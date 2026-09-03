const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Fleet.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The file currently starts with:
// impconst filteredFleet = fleetData.filter(v => {

// Let's replace everything up to `const filteredFleet` with the correct imports and component start!
const goodTop = `import React, { useState } from 'react';
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

  `;

content = content.replace(/^.*const filteredFleet/s, goodTop + 'const filteredFleet');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Fleet.jsx top');
