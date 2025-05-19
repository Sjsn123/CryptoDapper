
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
  // GoogleAuthProvider, // Type is implicitly handled by googleProvider instance
  // OAuthProvider,    // Type is implicitly handled by appleProvider instance
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '@/lib/firebase'; // Ensured path is correct
import { useToast } from '@/hooks/use-toast'; // Ensured path is correct

interface AuthContextType {
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
      setIsLoading(false); // Set loading to false once auth state is determined

      const isAuthPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/auth');
      
      const protectedPaths = ['/dashboard', '/education', '/events'];
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      
      const isProtectedPage = protectedPaths.some(path => currentPath.startsWith(path));

      if (!currentUser && isProtectedPage) {
        router.replace('/auth/login');
      } else if (currentUser && isAuthPage) {
        router.replace('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleAuthError = useCallback((error: any, context: string) => {
    console.error(`${context} Error:`, error);
    let description = error.message || `Failed to perform action with ${context}.`;
    if (error.code) {
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                description = `You closed the ${context} sign-in window. Please try again.`;
                break;
            case 'auth/account-exists-with-different-credential':
                description = "An account already exists with this email using a different sign-in method. Try that method.";
                break;
            case 'auth/email-already-in-use':
                description = "This email address is already in use. Try logging in or use a different email.";
                break;
            case 'auth/wrong-password':
            case 'auth/user-not-found': 
            case 'auth/invalid-credential':
                description = "Invalid email or password. Please check your credentials and try again.";
                break;
            case 'auth/network-request-failed':
                description = "A network error occurred. Check your internet connection and try again.";
                break;
            case 'auth/requires-recent-login':
                description = "This action requires a recent login. Please log out and log back in to continue.";
                break;
            case 'auth/identity-toolkit-api-has-not-been-used-before-or-it-is-disabled':
                description = "Authentication service is not enabled for this project. Please enable it in your Firebase console (Identity Toolkit API).";
                break;
            case 'auth/requests-from-referer-are-blocked':
                 description = "Sign-in requests from this website are blocked. Check your API key's HTTP referrer restrictions in Google Cloud Console.";
                 break;
            default:
                // Use the default description if the code is not specifically handled
                break;
        }
    }
    toast({ variant: "destructive", title: `${context} Error`, description });
  }, [toast]);

  const handleAuthSuccess = useCallback((context: string, message?: string) => {
    toast({ title: `${context} Successful`, description: message || "Redirecting..." });
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
  }, [handleAuthError]);

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
    setIsLoading(true); 
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
