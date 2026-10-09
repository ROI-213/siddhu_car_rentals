// Live Global Synchronization Service for Siddhu Car Rentals
// Polls /api/sync/version every 20s and on tab focus/visibility to automatically
// synchronize changes across all visitors, devices, and sessions without full page reload.

class SyncService {
  constructor() {
    this.currentVersion = null;
    this.intervalId = null;
    this.isPolling = false;
    this.pollIntervalMs = 20000; // 20 seconds
  }

  async checkVersion() {
    if (typeof window === 'undefined') return;

    try {
      const res = await fetch('/api/sync/version', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) return;

      const data = await res.json();
      if (!data || !data.success) return;

      const serverVersion = data.version;

      if (this.currentVersion === null) {
        // First sync check on page load
        this.currentVersion = serverVersion;
        return;
      }

      if (serverVersion !== this.currentVersion) {
        console.log(`[SyncService] Database updated (v${this.currentVersion} -> v${serverVersion}). Synchronizing views...`);
        this.currentVersion = serverVersion;

        // Dispatch global update events so all components and hooks instantly refetch fresh PostgreSQL data
        window.dispatchEvent(new CustomEvent('scr_tariffs_updated', { detail: { action: 'sync', version: serverVersion } }));
        window.dispatchEvent(new CustomEvent('scr_fleet_updated', { detail: { action: 'sync', version: serverVersion } }));
        window.dispatchEvent(new CustomEvent('scr_site_content_updated', { detail: { action: 'sync', version: serverVersion } }));
      }
    } catch (err) {
      // Silently catch network hiccups during polling
    }
  }

  start() {
    if (typeof window === 'undefined' || this.isPolling) return;
    this.isPolling = true;

    // Initial check
    this.checkVersion();

    // Regular polling interval (20s)
    this.intervalId = setInterval(() => {
      this.checkVersion();
    }, this.pollIntervalMs);

    // Re-check instantly when user switches back to this tab
    this.handleVisibility = () => {
      if (typeof document !== 'undefined' && !document.hidden) {
        this.checkVersion();
      }
    };
    this.handleFocus = () => {
      this.checkVersion();
    };

    document.addEventListener('visibilitychange', this.handleVisibility);
    window.addEventListener('focus', this.handleFocus);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPolling = false;
    if (this.handleVisibility) {
      document.removeEventListener('visibilitychange', this.handleVisibility);
    }
    if (this.handleFocus) {
      window.removeEventListener('focus', this.handleFocus);
    }
  }
}

export const syncService = new SyncService();
