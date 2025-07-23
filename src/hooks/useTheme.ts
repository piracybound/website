import { useState, useEffect, useCallback } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/utils/localStorage';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = getFromStorage<string | null>(STORAGE_KEYS.THEME, null);

    if (savedTheme) {
      return savedTheme === 'dark';
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return true;
  });

  const applyTheme = useCallback((dark: boolean) => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('light-mode', !dark);

      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', dark ? '#000000' : '#f5f5f7');
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      saveToStorage(STORAGE_KEYS.THEME, newTheme ? 'dark' : 'light');
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode, applyTheme]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e: MediaQueryListEvent) => {
        const savedTheme = getFromStorage<string | null>(STORAGE_KEYS.THEME, null);
        if (!savedTheme) {
          setIsDarkMode(e.matches);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };
};