"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const MOCK_AUTH_KEY = 'cryptoDapperMockAuth';

export function useMockAuth() {
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
    // For mock purposes, registration is similar to login
    if (typeof window !== 'undefined') {
      localStorage.setItem(MOCK_AUTH_KEY, 'true');
    }
    setIsAuthenticated(true);
    router.push('/dashboard'); // Or a "welcome" page
  }, [router]);

  return { isAuthenticated, isLoading, login, logout, register };
}
