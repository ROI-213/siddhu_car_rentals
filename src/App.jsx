import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingUI } from './components/common/FloatingUI';
import { Home } from './pages/Home';
import { Fleet } from './pages/Fleet';
import { VehicleDetail } from './pages/VehicleDetail';
import { Outstation } from './pages/Outstation';
import { LocalTransfer } from './pages/LocalTransfer';
import { CorporateTransfer } from './pages/CorporateTransfer';
import { About } from './pages/About';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { Tariff } from './pages/Tariff';
import { AdminTariff } from './pages/AdminTariff';
import { DesignSystemShowcase } from './components/showcase/DesignSystemShowcase';

export function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleNavigate = (id) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewVehicleDetail = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActivePage('vehicle-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectForEnquiry = (vehicleId) => {
    setActivePage('home');
    setTimeout(() => {
      const el = document.getElementById('quick-enquiry');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToEnquiry = () => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const e = document.getElementById('quick-enquiry');
        if (e) e.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('quick-enquiry');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'clip' }}>
      {/* Floating Sticky Glass Navbar */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      <main style={{ flex: 1 }}>
        {activePage === 'showcase' && <DesignSystemShowcase />}
        {activePage === 'fleets' && (
          <Fleet
            onViewVehicleDetail={handleViewVehicleDetail}
            onBookVehicle={handleSelectForEnquiry}
          />
        )}
        {activePage === 'vehicle-detail' && (
          <VehicleDetail
            vehicle={selectedVehicle}
            onBackToFleet={() => handleNavigate('fleets')}
            onSelectForEnquiry={handleSelectForEnquiry}
          />
        )}
        {activePage === 'outstation' && <Outstation onEnquireClick={scrollToEnquiry} />}
        {activePage === 'local' && <LocalTransfer />}
        {activePage === 'corporate' && <CorporateTransfer />}
        {activePage === 'about' && <About onReserveClick={scrollToEnquiry} />}
        {activePage === 'tariff' && <Tariff onSelectVehicleForBooking={(variant) => handleSelectForEnquiry(variant)} />}
        {activePage === 'admin' && <AdminTariff onNavigateToPublicTariff={() => handleNavigate('tariff')} />}
        {activePage === 'testimonials' && <Testimonials onReserveClick={scrollToEnquiry} />}
        {activePage === 'contact' && <Contact />}
        
        {activePage === 'home' && (
          <Home
            onViewVehicleDetail={handleViewVehicleDetail}
            onNavigate={e => handleNavigate(e)}
          />
        )}
      </main>

      {/* Luxury Dark Executive Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Floating Action UI (WhatsApp, Call, Mobile Sticky Bar) */}
      <FloatingUI onOpenEnquiry={scrollToEnquiry} />
    </div>
  );
}

export default App;
