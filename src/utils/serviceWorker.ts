import { useState, useEffect } from 'react';

const SW_URL = '/sw.js';
const SW_SCOPE = '/';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isInstalling: boolean;
  isUpdateAvailable: boolean;
  registration: ServiceWorkerRegistration | null;
}

class ServiceWorkerManager {
  private state: ServiceWorkerState = {
    isSupported: false,
    isRegistered: false,
    isInstalling: false,
    isUpdateAvailable: false,
    registration: null
  };

  private listeners: Array<(state: ServiceWorkerState) => void> = [];

  constructor() {
    this.state.isSupported = 'serviceWorker' in navigator;
  }

  subscribe(listener: (state: ServiceWorkerState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);

    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private updateState(updates: Partial<ServiceWorkerState>) {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener(this.state));
  }

  async register(): Promise<ServiceWorkerRegistration | null> {
    if (!this.state.isSupported) {
      console.log('[SW Manager] Service Workers not supported');
      return null;
    }

    try {
      console.log('[SW Manager] Registering service worker...');
      this.updateState({ isInstalling: true });

      const registration = await navigator.serviceWorker.register(SW_URL, {
        scope: SW_SCOPE
      });

      this.updateState({
        isRegistered: true,
        isInstalling: false,
        registration
      });

      this.setupUpdateListener(registration);

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[SW Manager] Controller changed, reloading page');
        window.location.reload();
      });

      console.log('[SW Manager] Service worker registered successfully');
      return registration;

    } catch (error) {
      console.error('[SW Manager] Service worker registration failed:', error);
      this.updateState({ isInstalling: false });
      return null;
    }
  }

  private setupUpdateListener(registration: ServiceWorkerRegistration) {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      console.log('[SW Manager] New service worker found');
      this.updateState({ isUpdateAvailable: true });

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('[SW Manager] New service worker installed');
          this.notifyUpdate();
        }
      });
    });
  }

  private notifyUpdate() {
    if (confirm('A new version is available. Would you like to update now?')) {
      this.skipWaiting();
    }
  }

  skipWaiting() {
    if (this.state.registration && this.state.registration.waiting) {
      this.state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  async unregister(): Promise<boolean> {
    if (!this.state.registration) {
      return false;
    }

    try {
      const success = await this.state.registration.unregister();
      if (success) {
        this.updateState({
          isRegistered: false,
          registration: null,
          isUpdateAvailable: false
        });
        console.log('[SW Manager] Service worker unregistered');
      }
      return success;
    } catch (error) {
      console.error('[SW Manager] Failed to unregister service worker:', error);
      return false;
    }
  }

  getState(): ServiceWorkerState {
    return { ...this.state };
  }

  isOffline(): boolean {
    return !navigator.onLine;
  }

  async preloadUrls(urls: string[]): Promise<void> {
    if (!this.state.registration || !this.state.registration.active) {
      console.warn('[SW Manager] No active service worker to preload URLs');
      return;
    }

    try {
      this.state.registration.active.postMessage({
        type: 'CACHE_URLS',
        urls
      });
      console.log('[SW Manager] Requested preloading of URLs:', urls);
    } catch (error) {
      console.error('[SW Manager] Failed to preload URLs:', error);
    }
  }

  async clearCaches(): Promise<void> {
    if (!('caches' in window)) {
      return;
    }

    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('[SW Manager] All caches cleared');
    } catch (error) {
      console.error('[SW Manager] Failed to clear caches:', error);
    }
  }
}

export const serviceWorkerManager = new ServiceWorkerManager();

export const initServiceWorker = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    await serviceWorkerManager.register();
  } else {
    console.log('[SW Manager] Service worker disabled in development mode');
  }
};

export const useServiceWorker = () => {
  const [state, setState] = useState<ServiceWorkerState>(serviceWorkerManager.getState());

  useEffect(() => {
    const unsubscribe = serviceWorkerManager.subscribe(setState);
    return unsubscribe;
  }, []);

  return {
    ...state,
    register: () => serviceWorkerManager.register(),
    unregister: () => serviceWorkerManager.unregister(),
    skipWaiting: () => serviceWorkerManager.skipWaiting(),
    preloadUrls: (urls: string[]) => serviceWorkerManager.preloadUrls(urls),
    clearCaches: () => serviceWorkerManager.clearCaches(),
    isOffline: serviceWorkerManager.isOffline()
  };
};

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};