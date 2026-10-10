import React, { useState, useEffect, Component } from 'react';
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
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').trim().toLowerCase();
    if (hash === 'admin' || hash.startsWith('admin')) return 'admin';
    if (hash) return hash;

    // Support /admin, /admin/, /tariff, etc.
    const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '').trim();
    if (path === 'admin' || path.startsWith('admin')) return 'admin';
    if (path === 'tariff' || path === 'pricing') return 'tariff';
    return path || 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState(null);

  useEffect(() => {
    const onRouteSync = () => {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      if (hash) {
        setActivePage(hash);
        return;
      }
      const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '').trim();
      if (path === 'admin' || path.startsWith('admin')) {
        setActivePage('admin');
      } else if (path === 'tariff' || path === 'pricing') {
        setActivePage('tariff');
      } else if (!path) {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', onRouteSync);
    window.addEventListener('popstate', onRouteSync);
    return () => {
      window.removeEventListener('hashchange', onRouteSync);
      window.removeEventListener('popstate', onRouteSync);
    };
  }, []);

  // Live cross-device synchronization watcher (Requirement B)
  useEffect(() => {
    let lastVersion = 0;
    const checkSync = async () => {
      try {
        const res = await fetch('/api/sync/version', { headers: { 'Cache-Control': 'no-cache' } });
        if (res.ok) {
          const data = await res.json();
          if (data && data.version) {
            if (lastVersion && data.version > lastVersion) {
              window.dispatchEvent(new CustomEvent('scr_fleet_updated'));
              window.dispatchEvent(new CustomEvent('scr_site_content_updated'));
              window.dispatchEvent(new CustomEvent('scr_tariffs_updated'));
            }
            lastVersion = data.version;
          }
        }
      } catch (e) {}
    };

    checkSync();
    const interval = setInterval(checkSync, 8000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') checkSync();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

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
    window.location.hash = id === 'home' ? '' : id;
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

  const isAdminPage = activePage === 'admin';

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'clip' }}>
        {/* Floating Sticky Glass Navbar (Hidden on Admin Portal) */}
        {!isAdminPage && <Navbar activePage={activePage} onNavigate={handleNavigate} />}

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
        {activePage === 'tariff' && <Tariff />}
        {activePage === 'admin' && <AdminTariff onNavigateToPublicTariff={() => handleNavigate('tariff')} onExitAdmin={() => handleNavigate('home')} />}
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

        {/* Luxury Dark Executive Footer (Hidden on Admin Portal) */}
        {!isAdminPage && <Footer onNavigate={handleNavigate} />}

        {/* Global Floating Action UI (WhatsApp, Call, Mobile Sticky Bar - Hidden on Admin Portal) */}
        {!isAdminPage && <FloatingUI onOpenEnquiry={scrollToEnquiry} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
