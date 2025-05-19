
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
  RecaptchaVerifier,
  signInWithPhoneNumber as firebaseSignInWithPhoneNumber,
  type ConfirmationResult,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase.ts';
import { useToast } from '@/hooks/use-toast.ts';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<User | null>;
  logInWithEmail: (email: string, password: string) => Promise<User | null>;
  sendPasswordReset: (email: string) => Promise<void>;
  requestOtpForPhoneNumber: (phoneNumber: string, recaptchaContainerId: string) => Promise<ConfirmationResult | null>;
  verifyOtpAndSignIn: (otpCode: string) => Promise<User | null>; // Placeholder for now
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Store confirmationResult outside the provider to persist across re-renders of the provider itself,
// or consider using a ref if it needs to be tied to the component lifecycle more directly.
// For simplicity here, a module-level variable. A more robust solution might use React context or a state management library.
let phoneAuthConfirmationResult: ConfirmationResult | null = null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);

      const isAuthPage =
        typeof window !== 'undefined' && window.location.pathname.startsWith('/auth');
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
    console.error(`${context} Error:`, error, error.code);
    let description = error.message || `Failed to ${context}.`;
    // Customize messages based on error.code
    switch (error.code) {
        case 'auth/popup-closed-by-user':
          description = `You closed the ${context} window. Please try again.`;
          break;
        case 'auth/account-exists-with-different-credential':
          description = 'An account already exists with this email using a different sign-in method. Try that method.';
          break;
        case 'auth/email-already-in-use':
          description = 'This email address is already in use. Try logging in or use a different email.';
          break;
        case 'auth/wrong-password':
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
          description = 'Invalid credentials. Please check and try again.';
          break;
        case 'auth/network-request-failed':
          description = 'A network error occurred. Check your internet connection and try again.';
          break;
        case 'auth/requires-recent-login':
          description = 'This action requires a recent login. Please log out and log back in.';
          break;
        case 'auth/invalid-phone-number':
          description = 'The phone number is not valid. Please enter a valid number with country code (e.g., +1xxxxxxxxxx).';
          break;
        case 'auth/missing-phone-number':
          description = 'Please enter a phone number.';
          break;
        case 'auth/captcha-check-failed':
             description = 'reCAPTCHA verification failed. Please try again.';
             break;
        case 'auth/too-many-requests':
            description = 'Too many requests. Please try again later.';
            break;
        default:
          // Use default description for other errors
          break;
      }
    toast({ variant: 'destructive', title: `${context} Error`, description });
  }, [toast]);

  const handleAuthSuccess = useCallback((context: string, message?: string) => {
    toast({ title: `${context} Successful`, description: message || 'Redirecting...' });
  }, [toast]);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // Success handled by onAuthStateChanged
    } catch (error) {
      handleAuthError(error, "Google Sign-In");
    }
    // setIsLoading(false); // isLoading should be managed by onAuthStateChanged
  }, [handleAuthError]);

  const signUpWithEmail = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      handleAuthSuccess('Registration', 'Welcome! Your account has been created.');
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
      handleAuthSuccess('Login');
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
      toast({
        title: 'Password Reset Email Sent',
        description: 'If an account exists for this email, a reset link has been sent.',
      });
    } catch (error) {
      handleAuthError(error, "Password Reset");
    } finally {
      setIsLoading(false);
    }
  };

  const requestOtpForPhoneNumber = useCallback(async (phoneNumber: string, recaptchaContainerId: string): Promise<ConfirmationResult | null> => {
    setIsLoading(true);
    try {
      // Ensure a fresh verifier for each attempt or manage existing one
      const appVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, Firebase can now send OTP.
          // console.log("reCAPTCHA challenge successful:", response);
        },
        'expired-callback': () => {
          toast({ variant: "destructive", title: "reCAPTCHA Expired", description: "Please try sending the OTP again." });
        }
      });
      
      const confirmation = await firebaseSignInWithPhoneNumber(auth, phoneNumber, appVerifier);
      phoneAuthConfirmationResult = confirmation; // Store for later use
      toast({ title: "OTP Sent", description: `Verification code sent to ${phoneNumber}. (OTP input UI is next step)` });
      setIsLoading(false);
      return confirmation;
    } catch (error: any) {
      // If there is an error with the reCAPTCHA verifier object itself.
      if (window.grecaptcha && (window as any).grecaptcha.enterprise) {
        (window as any).grecaptcha.enterprise.reset();
      } else if (window.grecaptcha) {
        (window as any).grecaptcha.reset();
      }
      
      handleAuthError(error, "Send OTP");
      setIsLoading(false);
      return null;
    }
  }, [auth, handleAuthError, toast]);

  const verifyOtpAndSignIn = useCallback(async (otpCode: string): Promise<User | null> => {
    if (!phoneAuthConfirmationResult) {
      toast({ variant: "destructive", title: "Error", description: "No OTP request found. Please request an OTP first." });
      return null;
    }
    setIsLoading(true);
    try {
      const userCredential = await phoneAuthConfirmationResult.confirm(otpCode);
      handleAuthSuccess('Phone Sign-In');
      phoneAuthConfirmationResult = null; // Clear after use
      return userCredential.user;
    } catch (error) {
      handleAuthError(error, "Verify OTP");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthError, handleAuthSuccess, toast]);


  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await firebaseSignOut(auth);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      phoneAuthConfirmationResult = null; // Clear on logout
    } catch (error) {
      handleAuthError(error, "Logout");
    } finally {
      setIsLoading(false); // Set to false even on error
    }
  }, [toast, handleAuthError]);

  const authContextValue: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signUpWithEmail,
    logInWithEmail,
    sendPasswordReset,
    requestOtpForPhoneNumber,
    verifyOtpAndSignIn,
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
