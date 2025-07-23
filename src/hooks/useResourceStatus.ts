import { useState, useEffect, useCallback } from 'react';
import type { Resource, ResourceStatusCheckResult } from '@/types';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/utils/localStorage';

export const useResourceStatus = () => {
  const [statusCache, setStatusCache] = useState<Record<string, ResourceStatusCheckResult>>({});
  const [checkingResources, setCheckingResources] = useState<Set<string>>(new Set());

  useEffect(() => {
    const cachedStatus = getFromStorage(STORAGE_KEYS.RESOURCE_STATUS, {});
    setStatusCache(cachedStatus);
  }, []);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.RESOURCE_STATUS, statusCache);
  }, [statusCache]);

  const checkResourceStatus = useCallback(async (resource: Resource): Promise<ResourceStatusCheckResult> => {
    const result: ResourceStatusCheckResult = {
      resourceId: resource.id,
      status: 'checking'
    };

    setCheckingResources(prev => new Set([...prev, resource.id]));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const startTime = performance.now();

      let response;
      try {
        response = await fetch(resource.url, {
          method: 'HEAD',
          mode: 'cors',
          signal: controller.signal,
          cache: 'no-cache'
        });
      } catch (corsError) {
        response = await fetch(resource.url, {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal,
          cache: 'no-cache'
        });
      }

      clearTimeout(timeoutId);
      const responseTime = Math.round(performance.now() - startTime);

      if (response.type !== 'opaque') {
        if (response.ok) {
          result.status = 'online';
          result.responseTime = responseTime;
        } else if (response.status === 503) {
          result.status = 'online';
          result.responseTime = responseTime;
          result.error = 'Protected (Under Attack Mode or similar)';
        } else if (response.status === 403) {
          result.status = 'online';
          result.responseTime = responseTime;
          result.error = 'Access restricted (403)';
        } else if (response.status === 429) {
          result.status = 'online';
          result.responseTime = responseTime;
          result.error = 'Rate limited (429)';
        } else if (response.status >= 500) {
          result.status = 'offline';
          result.error = `Server error (${response.status})`;
        } else {
          result.status = 'offline';
          result.error = `Client error (${response.status})`;
        }
      } else {
        result.status = 'online';
        result.responseTime = responseTime;
      }

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          result.status = 'offline';
          result.error = 'Request timeout';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          result.status = 'offline';
          result.error = 'Network error or blocked';
        } else {
          result.status = 'unknown';
          result.error = error.message;
        }
      } else {
        result.status = 'unknown';
        result.error = 'Unknown error occurred';
      }
    } finally {
      setCheckingResources(prev => {
        const next = new Set(prev);
        next.delete(resource.id);
        return next;
      });
    }

    setStatusCache(prev => ({
      ...prev,
      [resource.id]: result
    }));

    return result;
  }, []);

  const batchCheckStatus = useCallback(async (resources: Resource[]): Promise<void> => {
    const promises = resources.map(resource => checkResourceStatus(resource));
    await Promise.allSettled(promises);
  }, [checkResourceStatus]);

  const getResourceStatus = useCallback((resourceId: string): ResourceStatusCheckResult | null => {
    return statusCache[resourceId] || null;
  }, [statusCache]);

  const isResourceOnline = useCallback((resourceId: string): boolean | null => {
    const status = getResourceStatus(resourceId);
    return status ? status.status === 'online' : null;
  }, [getResourceStatus]);

  const clearStatusCache = useCallback(() => {
    setStatusCache({});
    saveToStorage(STORAGE_KEYS.RESOURCE_STATUS, {});
  }, []);

  const isChecking = useCallback((resourceId: string): boolean => {
    return checkingResources.has(resourceId);
  }, [checkingResources]);

  return {
    checkResourceStatus,
    batchCheckStatus,
    getResourceStatus,
    isResourceOnline,
    clearStatusCache,
    isChecking,
    statusCache
  };
};