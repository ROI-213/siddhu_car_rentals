import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Check } from 'lucide-react';
import './TransparentTariff.css';

const TARIFF_DATA = [
  { vehicle: "D'zire / Amaze / Indigo / Etios", billing: "Garage to Garage", base: 300, rate1: 15, rate2: 15, bata: 400 },
  { vehicle: "Innova / Ertiga / Kia Carens", billing: "Garage to Garage", base: 300, rate1: 19, rate2: 19, bata: 400 },
  { vehicle: "Innova Crysta", billing: "Garage to Garage", base: 300, rate1: 23, rate2: 23, bata: 500 },
  { vehicle: "Innova Hycross", billing: "Garage to Garage", base: 300, rate1: 28, rate2: 28, bata: 500 },
  { vehicle: "Tempo Traveller A/C", billing: "Garage to Garage", base: 300, rate1: 25, rate2: 25, bata: 500 },
  { vehicle: "Fortuner Old Model", billing: "Garage to Garage", base: 300, rate1: 60, rate2: 60, bata: 500 },
  { vehicle: "Camry / Accord / Fortuner Latest Model", billing: "Garage to Garage", base: 300, rate1: 60, rate2: 60, bata: 500 },
  { vehicle: "Urbania 12+1", billing: "Garage to Garage", base: 300, rate1: 45, rate2: 45, bata: 800 },
  { vehicle: "Urbania 16+1", billing: "Garage to Garage", base: 300, rate1: 45, rate2: 45, bata: 800 },
  { vehicle: "Toyota Commuter", billing: "Garage to Garage", base: 300, rate1: 90, rate2: 90, bata: 1000 },
  { vehicle: "Mercedes E-Class / BMW 5 Series / Audi A6", billing: "Garage to Garage", base: 300, rate1: 120, rate2: 120, bata: 1000 },
  { vehicle: "Audi Q7", billing: "Garage to Garage", base: 300, rate1: 140, rate2: 140, bata: 1000 },
  { vehicle: "Mercedes S-Class / BMW 7 Series / Audi A8", billing: "Garage to Garage", base: 300, rate1: 150, rate2: 150, bata: 1000 },
  { vehicle: "Mercedes S-Class / BMW 7 Series / Audi A8 Latest Model", billing: "Garage to Garage", base: 300, rate1: 250, rate2: 250, bata: 1000 },
  { vehicle: "Toyota Vellfire", billing: "Garage to Garage", base: 300, rate1: 250, rate2: 250, bata: 1000 },
  { vehicle: "Mini Bus 21 Seater AC", billing: "Garage to Garage", base: 300, rate1: 40, rate2: 40, bata: 800 },
  { vehicle: "Mini Bus 25 Seater AC", billing: "Garage to Garage", base: 300, rate1: 45, rate2: 45, bata: 800 },
  { vehicle: "32 Seater AC Bus", billing: "Garage to Garage", base: 300, rate1: 52, rate2: 52, bata: 1000 },
  { vehicle: "Bus 45 Seater AC", billing: "Garage to Garage", base: 400, rate1: 62, rate2: 62, bata: 1000 },
  { vehicle: "Bus 49 Seater AC", billing: "Garage to Garage", base: 400, rate1: 64, rate2: 64, bata: 1000 },
];

export const TransparentTariff = ({ onBook }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="tariff-section">
      <div className="tariff-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="tariff-header"
        >
          <h2 className="tariff-title">
            TRANSPARENT TARIFFS.<br />
            <span className="tariff-subtitle">NO SURPRISES.</span>
          </h2>
          <p className="tariff-desc">Exact pricing with zero hidden fees. What you see is what you pay.</p>
        </motion.div>

        <div className="tariff-table-wrapper desktop-only">
          <table className="tariff-table">
            <thead>
              <tr>
                <th>Vehicle Class</th>
                <th>Billing</th>
                <th>Base Fare</th>
                <th>Rate 1 (Local)</th>
                <th>Rate 2 (Outstation)</th>
                <th>Driver Bata</th>
              </tr>
            </thead>
            <tbody>
              {TARIFF_DATA.map((row, index) => (
                <motion.tr 
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => toggleExpand(index)}
                  className={`tariff-row ${hoveredIndex === index ? 'illuminated' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="vehicle-name">{row.vehicle}</td>
                  <td>{row.billing}</td>
                  <td>₹{row.base}</td>
                  <td>₹{row.rate1}/km</td>
                  <td>₹{row.rate2}/km</td>
                  <td>₹{row.bata}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tariff-cards-wrapper mobile-only">
          {TARIFF_DATA.map((row, index) => (
            <motion.div 
              key={index}
              className="tariff-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => toggleExpand(index)}
            >
              <div className="t-card-header">
                <h3>{row.vehicle}</h3>
                <span className="t-card-base">Base: ₹{row.base}</span>
              </div>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="t-card-details"
                  >
                    <div className="t-detail-row">
                      <span>Billing</span>
                      <span>{row.billing}</span>
                    </div>
                    <div className="t-detail-row">
                      <span>Rate (Local)</span>
                      <span>₹{row.rate1}/km</span>
                    </div>
                    <div className="t-detail-row">
                      <span>Rate (Outstation)</span>
                      <span>₹{row.rate2}/km</span>
                    </div>
                    <div className="t-detail-row">
                      <span>Driver Bata</span>
                      <span>₹{row.bata}</span>
                    </div>
                    <button className="t-card-book" onClick={(e) => { e.stopPropagation(); onBook(); }}>
                      Calculate Fare / Book Now
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
