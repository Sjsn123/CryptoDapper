
// This file is deprecated and replaced by src/hooks/use-auth.ts
// You can safely delete this file.
// Keeping it temporarily to avoid breaking imports if any were missed,
// but it should no longer be used.

"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const MOCK_AUTH_KEY = 'cryptoDapperMockAuth_DEPRECATED'; // Renamed to avoid conflict

export function useMockAuth() {
  console.warn("useMockAuth is deprecated. Use useAuth instead.");
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = typeof window !== 'undefined' && localStorage.getItem(MOCK_AUTH_KEY) === 'true';
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(MOCK_AUTH_KEY, 'true');
    }
    setIsAuthenticated(true);
    router.push('/dashboard');
  }, [router]);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(MOCK_AUTH_KEY);
    }
    setIsAuthenticated(false);
    router.push('/auth/login');
  }, [router]);

  const register = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(MOCK_AUTH_KEY, 'true');
    }
    setIsAuthenticated(true);
    router.push('/dashboard');
  }, [router]);

  return { isAuthenticated, isLoading, login, logout, register };
}
