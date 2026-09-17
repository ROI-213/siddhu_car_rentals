import { useState, useEffect, useCallback } from 'react';
import { tariffApi } from '../services/tariffApi';
import { fleetData as defaultFleet } from '../data/fleetData';

export const useFleetData = () => {
  const [fleet, setFleet] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem('scr_fleet_cache') || 'null');
      return (Array.isArray(cached) && cached.length > 0) ? cached : defaultFleet;
    } catch {
      return defaultFleet;
    }
  });

  const [loading, setLoading] = useState(true);

  const fetchFleet = useCallback(async () => {
    try {
      const data = await tariffApi.getFleet();
      if (Array.isArray(data) && data.length > 0) {
        setFleet(data);
        localStorage.setItem('scr_fleet_cache', JSON.stringify(data));
      } else {
        const cached = JSON.parse(localStorage.getItem('scr_fleet_cache') || 'null');
        if (Array.isArray(cached) && cached.length > 0) {
          setFleet(cached);
        } else {
          setFleet(defaultFleet);
        }
      }
    } catch (err) {
      console.warn('Failed to load dynamic fleet from PostgreSQL, using cached/defaults:', err);
      const cached = JSON.parse(localStorage.getItem('scr_fleet_cache') || 'null');
      if (Array.isArray(cached) && cached.length > 0) {
        setFleet(cached);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFleet();

    const handleFleetUpdate = () => fetchFleet();
    window.addEventListener('scr_fleet_updated', handleFleetUpdate);
    return () => {
      window.removeEventListener('scr_fleet_updated', handleFleetUpdate);
    };
  }, [fetchFleet]);

  return { fleet, loading, refreshFleet: fetchFleet };
};
