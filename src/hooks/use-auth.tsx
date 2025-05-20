
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
  sendEmailVerification, // Import sendEmailVerification
  type ConfirmationResult,
  type AuthProvider as FirebaseAuthProvider, // Renamed to avoid conflict with our AuthProvider
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
  sendVerificationEmail: () => Promise<void>; // Added this
  requestOtpForPhoneNumber: (phoneNumber: string, recaptchaContainerId: string) => Promise<ConfirmationResult | null>;
  verifyOtpAndSignIn: (otpCode: string) => Promise<User | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
        typeof window !== 'undefined' && (window.location.pathname.startsWith('/auth/login') || window.location.pathname.startsWith('/auth/register') || window.location.pathname.startsWith('/auth/recover'));
      const protectedPaths = ['/dashboard', '/education', '/events', '/profile'];
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
    console.error(`${context} Error:`, error, error.code, error.message);
    let description = `Failed to ${context}. ${error.message || ''}`;
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
        case 'auth/unauthorized-domain':
            description = 'This domain is not authorized for OAuth operations for your Firebase project. Check the Firebase console.';
            break;
        case 'auth/operation-not-allowed':
            description = `The ${context} method is not enabled. Please enable it in your Firebase console under Authentication -> Sign-in method.`;
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
    try {
      await signInWithPopup(auth, googleProvider as FirebaseAuthProvider);
      handleAuthSuccess('Google Sign-In');
      router.replace('/dashboard');
    } catch (error) {
      handleAuthError(error, "Google Sign-In");
    }
  }, [handleAuthError, handleAuthSuccess, router]);

  const signUpWithEmail = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      toast({ title: 'Registration Successful', description: 'Account created! A verification email has been sent to your email address.' });
      router.replace('/dashboard');
      return userCredential.user;
    } catch (error) {
      handleAuthError(error, "Email Sign Up");
      return null;
    }
  };

  const logInWithEmail = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess('Login');
      router.replace('/dashboard');
      return userCredential.user;
    } catch (error) {
      handleAuthError(error, "Email Login");
      return null;
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: 'Password Reset Email Sent',
        description: 'If an account exists for this email, a reset link has been sent.',
      });
    } catch (error) {
      handleAuthError(error, "Password Reset");
    }
  };
  
  const sendVerificationEmail = useCallback(async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        toast({
          title: 'Verification Email Sent',
          description: 'Please check your inbox to verify your email address.',
        });
      } catch (error) {
        handleAuthError(error, "Send Verification Email");
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No user is currently signed in.',
      });
    }
  }, [auth, handleAuthError, toast]);

  const requestOtpForPhoneNumber = useCallback(async (phoneNumber: string, recaptchaContainerId: string): Promise<ConfirmationResult | null> => {
    try {
      const appVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
        'size': 'invisible',
        'callback': (response: any) => {},
        'expired-callback': () => {
          toast({ variant: "destructive", title: "reCAPTCHA Expired", description: "Please try sending the OTP again." });
        }
      });
      
      const confirmation = await firebaseSignInWithPhoneNumber(auth, phoneNumber, appVerifier);
      phoneAuthConfirmationResult = confirmation;
      toast({ title: "OTP Sent", description: `Verification code sent to ${phoneNumber}. (OTP input UI is next step)` });
      return confirmation;
    } catch (error: any) {
      if (window.grecaptcha && (window as any).grecaptcha.enterprise) {
        (window as any).grecaptcha.enterprise.reset();
      } else if (window.grecaptcha) {
        (window as any).grecaptcha.reset();
      }
      handleAuthError(error, "Send OTP");
      return null;
    }
  }, [auth, handleAuthError, toast]);

  const verifyOtpAndSignIn = useCallback(async (otpCode: string): Promise<User | null> => {
    if (!phoneAuthConfirmationResult) {
      toast({ variant: "destructive", title: "Error", description: "No OTP request found. Please request an OTP first." });
      return null;
    }
    try {
      const userCredential = await phoneAuthConfirmationResult.confirm(otpCode);
      handleAuthSuccess('Phone Sign-In');
      router.replace('/dashboard');
      phoneAuthConfirmationResult = null;
      return userCredential.user;
    } catch (error) {
      handleAuthError(error, "Verify OTP");
      return null;
    }
  }, [handleAuthError, handleAuthSuccess, toast, router]);


  const logout = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      phoneAuthConfirmationResult = null;
      router.replace('/auth/login'); // Ensure redirect to login after logout
    } catch (error) {
      handleAuthError(error, "Logout");
    }
  }, [toast, handleAuthError, router]);

  const authContextValue: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signUpWithEmail,
    logInWithEmail,
    sendPasswordReset,
    sendVerificationEmail, // Export new function
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
