
"use client";

import { useState, useEffect, useCallback } from 'react';

function getValueFromLocalStorage<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getValueFromLocalStorage(key, initialValue);
  });

  // This effect ensures that the state is updated if localStorage changes from another tab/window,
  // and initializes from localStorage on first client-side render.
  useEffect(() => {
    setStoredValue(getValueFromLocalStorage(key, initialValue));
  }, [key, initialValue]); // initialValue should be stable for this effect not to cause issues.

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        setStoredValue(currentStoredValue => {
          const valueToStore =
            value instanceof Function ? value(currentStoredValue) : value;
          
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
          return valueToStore;
        });
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key] // Now setValue only depends on `key`. `setStoredValue` is stable.
  );

  return [storedValue, setValue];
}
