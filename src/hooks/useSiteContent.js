import { useState, useEffect, useCallback } from 'react';
import { tariffApi } from '../services/tariffApi';
import { DEFAULT_SITE_CONTENT, DEFAULT_ABOUT_CONTENT, DEFAULT_LOCAL_CONTENT } from '../data/defaultSiteContent';

export const useSiteContent = () => {
  const [content, setContent] = useState(() => {
    // Try reading from cache first for instantaneous render
    try {
      const cached = JSON.parse(localStorage.getItem('scr_site_content_cache') || '{}');
      return {
        hero: { ...DEFAULT_SITE_CONTENT.hero, ...(cached.hero || {}) },
        contact: { ...DEFAULT_SITE_CONTENT.contact, ...(cached.contact || {}) },
        testimonials: { ...DEFAULT_SITE_CONTENT.testimonials, ...(cached.testimonials || {}) },
        destinations: { ...DEFAULT_SITE_CONTENT.destinations, ...(cached.destinations || {}) },
        services: cached.services && Array.isArray(cached.services) ? cached.services : DEFAULT_SITE_CONTENT.services,
        story: cached.story && Array.isArray(cached.story) ? cached.story : DEFAULT_SITE_CONTENT.story,
        corporate: {
          ...DEFAULT_SITE_CONTENT.corporate,
          ...(cached.corporate || {}),
          rateCard: Array.isArray(cached?.corporate?.rateCard) && cached.corporate.rateCard.length > 0
            ? cached.corporate.rateCard
            : DEFAULT_SITE_CONTENT.corporate.rateCard,
          tiers: Array.isArray(cached?.corporate?.tiers) && cached.corporate.tiers.length > 0
            ? cached.corporate.tiers
            : DEFAULT_SITE_CONTENT.corporate.tiers
        },
        outstation: { ...DEFAULT_SITE_CONTENT.outstation, ...(cached.outstation || {}) },
        about: {
          ...DEFAULT_SITE_CONTENT.about,
          ...(cached.about || {}),
          hero: { ...DEFAULT_SITE_CONTENT.about?.hero, ...(cached?.about?.hero || {}) },
          founder: { ...DEFAULT_SITE_CONTENT.about?.founder, ...(cached?.about?.founder || {}) },
          stats: Array.isArray(cached?.about?.stats) && cached.about.stats.length > 0
            ? cached.about.stats
            : DEFAULT_SITE_CONTENT.about?.stats
        },
        local: {
          ...DEFAULT_SITE_CONTENT.local,
          ...(cached.local || {}),
          packages: Array.isArray(cached?.local?.packages) && cached.local.packages.length > 0
            ? cached.local.packages
            : DEFAULT_SITE_CONTENT.local?.packages,
          scenarios: Array.isArray(cached?.local?.scenarios) && cached.local.scenarios.length > 0
            ? cached.local.scenarios
            : DEFAULT_SITE_CONTENT.local?.scenarios
        }
      };
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const all = await tariffApi.getContent();
      if (all && typeof all === 'object') {
        const merged = {
          hero: { ...DEFAULT_SITE_CONTENT.hero, ...(all.hero || {}) },
          contact: { ...DEFAULT_SITE_CONTENT.contact, ...(all.contact || {}) },
          testimonials: {
            featured: all?.testimonials?.featured || DEFAULT_SITE_CONTENT.testimonials.featured,
            list: Array.isArray(all?.testimonials?.list) ? all.testimonials.list : DEFAULT_SITE_CONTENT.testimonials.list
          },
          destinations: {
            heroItems: Array.isArray(all?.destinations?.heroItems) ? all.destinations.heroItems : DEFAULT_SITE_CONTENT.destinations.heroItems,
            ribbonItems: Array.isArray(all?.destinations?.ribbonItems) ? all.destinations.ribbonItems : DEFAULT_SITE_CONTENT.destinations.ribbonItems
          },
          services: Array.isArray(all?.services) ? all.services : DEFAULT_SITE_CONTENT.services,
          story: Array.isArray(all?.story) ? all.story : DEFAULT_SITE_CONTENT.story,
          corporate: {
            ...DEFAULT_SITE_CONTENT.corporate,
            ...(all.corporate || {}),
            rateCard: Array.isArray(all?.corporate?.rateCard) ? all.corporate.rateCard : DEFAULT_SITE_CONTENT.corporate.rateCard,
            tiers: Array.isArray(all?.corporate?.tiers) ? all.corporate.tiers : DEFAULT_SITE_CONTENT.corporate.tiers
          },
          outstation: {
            ...DEFAULT_SITE_CONTENT.outstation,
            ...(all.outstation || {})
          },
          about: {
            ...DEFAULT_SITE_CONTENT.about,
            ...(all.about || {}),
            hero: { ...DEFAULT_SITE_CONTENT.about?.hero, ...(all.about?.hero || {}) },
            founder: { ...DEFAULT_SITE_CONTENT.about?.founder, ...(all.about?.founder || {}) },
            stats: Array.isArray(all?.about?.stats) ? all.about.stats : DEFAULT_SITE_CONTENT.about?.stats
          },
          local: {
            ...DEFAULT_SITE_CONTENT.local,
            ...(all.local || {}),
            hero: { ...DEFAULT_SITE_CONTENT.local?.hero, ...(all.local?.hero || {}) },
            packagesHeader: { ...DEFAULT_SITE_CONTENT.local?.packagesHeader, ...(all.local?.packagesHeader || {}) },
            packages: Array.isArray(all?.local?.packages) ? all.local.packages : DEFAULT_SITE_CONTENT.local?.packages,
            scenariosHeader: { ...DEFAULT_SITE_CONTENT.local?.scenariosHeader, ...(all.local?.scenariosHeader || {}) },
            scenarios: Array.isArray(all?.local?.scenarios) ? all.local.scenarios : DEFAULT_SITE_CONTENT.local?.scenarios
          }
        };

        setContent(merged);
        localStorage.setItem('scr_site_content_cache', JSON.stringify(merged));
      }
    } catch (err) {
      console.warn('Failed to load dynamic site content, using cached/defaults:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();

    const handleCustomUpdate = (e) => {
      const key = e?.detail?.key;
      const data = e?.detail?.data;
      if (key && data) {
        setContent(prev => {
          if (key === 'corporate') {
            return {
              ...prev,
              corporate: {
                ...DEFAULT_SITE_CONTENT.corporate,
                ...data,
                rateCard: Array.isArray(data.rateCard) ? data.rateCard : (prev.corporate?.rateCard || DEFAULT_SITE_CONTENT.corporate.rateCard),
                tiers: Array.isArray(data.tiers) ? data.tiers : (prev.corporate?.tiers || DEFAULT_SITE_CONTENT.corporate.tiers)
              }
            };
          }
          if (key === 'outstation') {
            return {
              ...prev,
              outstation: {
                ...DEFAULT_SITE_CONTENT.outstation,
                ...data,
                tariffHeader: data.tariffHeader || prev.outstation?.tariffHeader,
                destinations: Array.isArray(data.destinations) ? data.destinations : prev.outstation?.destinations,
                options: Array.isArray(data.options) ? data.options : prev.outstation?.options,
                terms: data.terms || prev.outstation?.terms
              }
            };
          }
          if (key === 'about') {
            return {
              ...prev,
              about: {
                ...DEFAULT_SITE_CONTENT.about,
                ...data,
                hero: { ...DEFAULT_SITE_CONTENT.about?.hero, ...(data.hero || {}) },
                founder: { ...DEFAULT_SITE_CONTENT.about?.founder, ...(data.founder || {}) },
                stats: Array.isArray(data.stats) ? data.stats : (prev.about?.stats || DEFAULT_ABOUT_CONTENT?.stats || [])
              }
            };
          }
          if (key === 'local') {
            return {
              ...prev,
              local: {
                ...DEFAULT_SITE_CONTENT.local,
                ...data,
                hero: { ...DEFAULT_SITE_CONTENT.local?.hero, ...(data.hero || {}) },
                packagesHeader: { ...DEFAULT_SITE_CONTENT.local?.packagesHeader, ...(data.packagesHeader || {}) },
                packages: Array.isArray(data.packages) ? data.packages : (prev.local?.packages || DEFAULT_LOCAL_CONTENT?.packages || []),
                scenariosHeader: { ...DEFAULT_SITE_CONTENT.local?.scenariosHeader, ...(data.scenariosHeader || {}) },
                scenarios: Array.isArray(data.scenarios) ? data.scenarios : (prev.local?.scenarios || DEFAULT_LOCAL_CONTENT?.scenarios || [])
              }
            };
          }
          return {
            ...prev,
            [key]: typeof data === 'object' && !Array.isArray(data)
              ? { ...(prev[key] || {}), ...data }
              : data
          };
        });
      }
      fetchContent();
    };

    window.addEventListener('scr_site_content_updated', handleCustomUpdate);
    window.addEventListener('storage', handleCustomUpdate);
    return () => {
      window.removeEventListener('scr_site_content_updated', handleCustomUpdate);
      window.removeEventListener('storage', handleCustomUpdate);
    };
  }, [fetchContent]);

  return { content, loading, refreshContent: fetchContent };
};
