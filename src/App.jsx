import React, { useState, Component } from 'react';
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
import { MercedesSClassPage } from './pages/vehicles/MercedesSClassPage';
import { BMW7SeriesPage } from './pages/vehicles/BMW7SeriesPage';
import { ToyotaVellfirePage } from './pages/vehicles/ToyotaVellfirePage';
import { DesignSystemShowcase } from './components/showcase/DesignSystemShowcase';
import { useSEO } from './hooks/useSEO';
import { getVehicleSEOConfig } from './hooks/useSEO';

// ── Global Error Boundary ─────────────────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('[Siddhu Car Rentals] Runtime Error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#0f172a', color: '#f1f5f9', fontFamily: 'sans-serif',
          padding: '40px 20px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#f59e0b' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '500px', marginBottom: '24px' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
            style={{
              background: '#d4af37', color: '#0f172a', border: 'none',
              padding: '12px 28px', borderRadius: '8px', fontWeight: '700',
              cursor: 'pointer', fontSize: '1rem'
            }}
          >
            Reload Page
          </button>
          <details style={{ marginTop: '24px', color: '#64748b', fontSize: '0.8rem', maxWidth: '600px', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>Error details</summary>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}


export function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState(null);

  const pageSEOKey = activePage === 'vehicle-detail' && selectedVehicle
    ? 'vehicle-detail'
    : activePage === 'mercedes-s-class' ? 'mercedes-s-class'
    : activePage === 'bmw-7-series' ? 'bmw-7-series'
    : activePage === 'toyota-vellfire' ? 'toyota-vellfire'
    : activePage;

  const seoConfig = selectedVehicle ? getVehicleSEOConfig(selectedVehicle.name) : null;
  useSEO(pageSEOKey, seoConfig?.title, seoConfig?.description);

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
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'clip' }}>
        {/* Floating Sticky Glass Navbar */}
        <Navbar activePage={activePage} onNavigate={handleNavigate} />

        <main style={{ flex: 1 }}>
          <ErrorBoundary>
        {activePage === 'showcase' && <DesignSystemShowcase />}
        {activePage === 'mercedes-s-class' && <MercedesSClassPage onNavigate={handleNavigate} onBackToFleet={() => handleNavigate('fleets')} />}
        {activePage === 'bmw-7-series' && <BMW7SeriesPage onNavigate={handleNavigate} onBackToFleet={() => handleNavigate('fleets')} />}
        {activePage === 'toyota-vellfire' && <ToyotaVellfirePage onNavigate={handleNavigate} onBackToFleet={() => handleNavigate('fleets')} />}
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
          </ErrorBoundary>
        </main>

        {/* Luxury Dark Executive Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Global Floating Action UI (WhatsApp, Call, Mobile Sticky Bar) */}
        <FloatingUI onOpenEnquiry={scrollToEnquiry} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
