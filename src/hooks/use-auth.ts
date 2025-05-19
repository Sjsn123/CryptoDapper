
"use client";

import React, { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider, // Kept for clarity
  OAuthProvider // Kept for clarity
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<User | null>;
  logInWithEmail: (email: string, password: string) => Promise<User | null>;
  sendPasswordReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);

      const isAuthPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/auth');
      const isProtectedPage = typeof window !== 'undefined'
        !isAuthPage &&
        !['/', '/privacy-policy', '/terms-of-use', '/about', '/contact'].includes(window.location.pathname) &&
        (window.location.pathname.startsWith('/dashboard') ||
         window.location.pathname.startsWith('/education') ||
         window.location.pathname.startsWith('/events'));

 if (!currentUser && isProtectedPage) {
 router.replace('/auth/login');
      } else if (currentUser && isAuthPage) {
        router.replace('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]); // router is a dependency

  const handleAuthError = useCallback((error: any, context: string) => {
    console.error(`${context} Error:`, error);
    let description = error.message || `Failed to perform action with ${context}.`;
    if (error.code === 'auth/popup-closed-by-user') {
      description = `You closed the ${context} sign-in window. Please try again.`;
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      description = "An account already exists with this email address using a different sign-in method. Try signing in with that method.";
    } else if (error.code === 'auth/email-already-in-use') {
      description = "This email address is already in use. Try logging in or use a different email.";
    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      description = "Invalid email or password. Please check your credentials and try again.";
    } else if (error.code === 'auth/network-request-failed') {
      description = "A network error occurred. Check your internet connection and try again.";
    }
    toast({ variant: "destructive", title: `${context} Error`, description });
  }, [toast]);

  const handleAuthSuccess = useCallback((context: string, message?: string) => {
    toast({ title: `${context} Successful`, description: message || "Redirecting..." });
    // Navigation is handled by onAuthStateChanged effect
  }, [toast]);


  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // handleAuthSuccess("Google Sign-In"); // Success handled by onAuthStateChanged
    } catch (error) {
      handleAuthError(error, "Google Sign-In");
    } finally {
       // setIsLoading(false); // onAuthStateChanged will set this
    }
  }, [handleAuthError]); // handleAuthSuccess removed as it's better handled by onAuthStateChanged

  const signInWithApple = useCallback(async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, appleProvider);
      // handleAuthSuccess("Apple Sign-In");
    } catch (error: any) {
      handleAuthError(error, "Apple Sign-In");
    } finally {
      // setIsLoading(false);
    }
  }, [handleAuthError]);

  const signUpWithEmail = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      handleAuthSuccess("Registration", "Welcome! Your account has been created.");
      return userCredential.user;
    } catch (error) {
      handleAuthError(error, "Email Sign Up");
      return null;
    } finally {
      // setIsLoading(false);
    }
  };

  const logInWithEmail = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess("Login");
      return userCredential.user;
    } catch (error) {
      handleAuthError(error, "Email Login");
      return null;
    } finally {
      // setIsLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    setIsLoading(true); // Keep this for distinct UI feedback
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: "Password Reset Email Sent", description: "If an account exists for this email, a reset link has been sent." });
    } catch (error) {
      handleAuthError(error, "Password Reset");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await firebaseSignOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      // Navigation to /auth/login is handled by onAuthStateChanged
    } catch (error) {
      handleAuthError(error, "Logout");
    } finally {
      // setIsLoading(false);
    }
  }, [toast, handleAuthError]);

  const authContextValue: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithApple,
    signUpWithEmail,
    logInWithEmail,
    sendPasswordReset,
    logout,
  };

 return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
