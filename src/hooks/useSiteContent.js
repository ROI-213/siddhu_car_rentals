import { useState, useEffect, useCallback } from 'react';
import { tariffApi } from '../services/tariffApi';
import { DEFAULT_SITE_CONTENT } from '../data/defaultSiteContent';

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
        corporate: { ...DEFAULT_SITE_CONTENT.corporate, ...(cached.corporate || {}) },
        outstation: { ...DEFAULT_SITE_CONTENT.outstation, ...(cached.outstation || {}) }
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
            featured: (all.testimonials && all.testimonials.featured) || DEFAULT_SITE_CONTENT.testimonials.featured,
            list: (all.testimonials && Array.isArray(all.testimonials.list)) ? all.testimonials.list : DEFAULT_SITE_CONTENT.testimonials.list
          },
          destinations: {
            heroItems: (all.destinations && Array.isArray(all.destinations.heroItems)) ? all.destinations.heroItems : DEFAULT_SITE_CONTENT.destinations.heroItems,
            ribbonItems: (all.destinations && Array.isArray(all.destinations.ribbonItems)) ? all.destinations.ribbonItems : DEFAULT_SITE_CONTENT.destinations.ribbonItems
          },
          services: (all.services && Array.isArray(all.services)) ? all.services : DEFAULT_SITE_CONTENT.services,
          story: (all.story && Array.isArray(all.story)) ? all.story : DEFAULT_SITE_CONTENT.story,
          corporate: { ...DEFAULT_SITE_CONTENT.corporate, ...(all.corporate || {}) },
          outstation: { ...DEFAULT_SITE_CONTENT.outstation, ...(all.outstation || {}) }
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

    const handleCustomUpdate = () => fetchContent();
    window.addEventListener('scr_site_content_updated', handleCustomUpdate);
    return () => {
      window.removeEventListener('scr_site_content_updated', handleCustomUpdate);
    };
  }, [fetchContent]);

  return { content, loading, refreshContent: fetchContent };
};
