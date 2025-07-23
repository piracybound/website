export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Error saving to localStorage (${key}):`, error);
    return false;
  }
};

export const STORAGE_KEYS = {
  THEME: 'piracybound_theme',
  SEARCH_HISTORY: 'piracybound_search_history',
  RESOURCE_STATUS: 'piracybound_resource_status',
} as const;