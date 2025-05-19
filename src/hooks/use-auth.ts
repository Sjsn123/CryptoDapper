
"use client";

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

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
      setIsLoading(false);
      if (!currentUser && (window.location.pathname.startsWith('/dashboard') || window.location.pathname.startsWith('/education') || window.location.pathname.startsWith('/events')) ) {
        router.replace('/auth/login');
      } else if (currentUser && (window.location.pathname.startsWith('/auth'))) {
        router.replace('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleAuthSuccess = useCallback((firebaseUser: User) => {
    setUser(firebaseUser);
    router.push('/dashboard');
    toast({ title: "Success", description: "Successfully signed in." });
  }, [router, toast]);

  const handleAuthError = useCallback((error: any, context: string) => {
    console.error(`${context} Error:`, error);
    let description = error.message || `Failed to sign in with ${context}.`;
    if (error.code === 'auth/popup-closed-by-user') {
        description = `You closed the ${context} sign-in window.`;
    } else if (error.code === 'auth/account-exists-with-different-credential') {
        description = "An account already exists with the same email address using a different sign-in method.";
    }
    toast({ variant: "destructive", title: "Authentication Error", description });
  }, [toast]);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        handleAuthSuccess(result.user);
      }
    } catch (error) {
      handleAuthError(error, "Google");
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthSuccess, handleAuthError]);

  const signInWithApple = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, appleProvider);
      if (result.user) {
        handleAuthSuccess(result.user);
      }
    } catch (error: any) {
        handleAuthError(error, "Apple");
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthSuccess, handleAuthError]);
  
  const signUpWithEmail = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle setting user, but we can provide immediate feedback.
      toast({ title: "Registration Successful", description: "Welcome! Your account has been created." });
      // handleAuthSuccess will redirect to dashboard.
      handleAuthSuccess(userCredential.user); 
      return userCredential.user;
    } catch (error) {
      handleAuthError(error, "Email Sign Up");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logInWithEmail = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess(userCredential.user);
      return userCredential.user;
    } catch (error) {
      handleAuthError(error, "Email Login");
      return null;
    } finally {
      setIsLoading(false);
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
      setUser(null); 
      router.push('/auth/login');
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
    } catch (error) {
      handleAuthError(error, "Logout");
    } finally {
      setIsLoading(false);
    }
  }, [router, toast, handleAuthError]); 

  const authContextValue: AuthContextType = { 
    user, 
    isLoading, 
    signInWithGoogle, 
    signInWithApple, 
    signUpWithEmail, 
    logInWithEmail, 
    sendPasswordReset, 
    logout 
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
