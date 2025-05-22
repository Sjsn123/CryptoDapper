
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
  sendEmailVerification,
  type AuthProvider as FirebaseAuthProvider,
  // RecaptchaVerifier, // No longer used
  // signInWithPhoneNumber, // No longer used
  // type ConfirmationResult // No longer used
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase.ts';
import { useToast } from '@/hooks/use-toast.ts';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  // phoneAuthConfirmationResult: ConfirmationResult | null; // No longer used
  // setPhoneAuthConfirmationResult: React.Dispatch<React.SetStateAction<ConfirmationResult | null>>; // No longer used
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<User | null>;
  logInWithEmail: (email: string, password: string) => Promise<User | null>;
  sendPasswordReset: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  // requestOtpForPhoneNumber: (phoneNumber: string, recaptchaContainerId: string) => Promise<boolean>; // No longer used
  // verifyOtpAndSignIn: (otp: string) => Promise<void>; // No longer used
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [phoneAuthConfirmationResult, setPhoneAuthConfirmationResult] = useState<ConfirmationResult | null>(null); // No longer used
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
      const isAuthPage =
        typeof window !== 'undefined' && (window.location.pathname.startsWith('/auth/login') || window.location.pathname.startsWith('/auth/register'));
      
      // Define protected paths more broadly
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
        case 'auth/user-not-found': // Bundled with invalid-credential in recent Firebase versions
        case 'auth/invalid-credential':
          description = 'Invalid credentials. Please check and try again.';
          break;
        case 'auth/network-request-failed':
          description = 'A network error occurred. Check your internet connection and try again.';
          break;
        case 'auth/requires-recent-login':
          description = 'This action requires a recent login. Please log out and log back in.';
          break;
        case 'auth/unauthorized-domain':
            description = `This domain is not authorized for OAuth operations for your Firebase project. Check the Firebase console. Current domain: ${typeof window !== 'undefined' ? window.location.hostname : 'Unknown'}`;
            break;
        case 'auth/operation-not-allowed':
            description = `The ${context} method is not enabled. Please enable it in your Firebase console under Authentication -> Sign-in method.`;
            break;
        case 'auth/too-many-requests':
            description = 'Too many requests. Please try again later.';
            break;
        case 'auth/missing-phone-number':
            description = 'Phone number is missing. Please enter a valid phone number.';
            break;
        case 'auth/invalid-phone-number':
            description = 'The phone number is invalid. Please enter it in E.164 format (e.g., +12223334444).';
            break;
        case 'auth/quota-exceeded':
             description = 'SMS quota exceeded for this project. Please try again later or check project billing.';
            break;
        case 'auth/user-disabled':
            description = 'This user account has been disabled.';
            break;
        case 'auth/invalid-verification-code':
            description = 'Invalid OTP. Please try again.';
            break;
        case 'auth/session-expired':
            description = 'The OTP has expired. Please request a new one.';
            break;
        case 'auth/missing-recaptcha-token':
        case 'auth/invalid-recaptcha-token':
        case 'auth/app-not-verified':
            description = 'reCAPTCHA verification failed. Please ensure reCAPTCHA is set up correctly and try again.';
            break;
        case 'auth/captcha-check-failed':
            description = 'reCAPTCHA check failed, possibly due to an invalid site key or domain not being whitelisted for reCAPTCHA. Please try again.';
            break;
        case 'auth/billing-not-enabled':
            description = 'Phone authentication requires billing to be enabled for this project. Please update your Firebase project settings.';
            break;
        default:
          // For other errors, use the default description
          break;
      }
    toast({ variant: 'destructive', title: `${context} Error`, description });
  }, [toast]);

  const handleAuthSuccess = useCallback((context: string, message?: string) => {
    toast({ title: `${context} Successful`, description: message || 'Redirecting...' });
  }, [toast]);

  const signInWithGoogle = useCallback(async () => {
    // setIsLoading(true); // isLoading is managed by the broader auth state
    try {
      await signInWithPopup(auth, googleProvider); // Removed unnecessary cast
      handleAuthSuccess('Google Sign-In');
      router.replace('/dashboard');
    } catch (error: any) {
      handleAuthError(error, "Google Sign-In");
    }
  }, [handleAuthError, handleAuthSuccess, router]);


  const signUpWithEmail = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Send verification email upon successful registration
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        handleAuthSuccess('Registration', 'Account created! A verification email has been sent.');
      } else {
        handleAuthSuccess('Registration', 'Account created!');
      }
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
  }, [handleAuthError, toast]);


  const logout = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      // setUser(null); // onAuthStateChanged will handle this
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.replace('/auth/login');
    } catch (error) {
      handleAuthError(error, "Logout");
    }
  }, [toast, handleAuthError, router]);

  const authContextValue: AuthContextType = {
    user,
    isLoading,
    // phoneAuthConfirmationResult, // No longer used
    // setPhoneAuthConfirmationResult, // No longer used
    signInWithGoogle,
    signUpWithEmail,
    logInWithEmail,
    sendPasswordReset,
    sendVerificationEmail,
    // requestOtpForPhoneNumber, // No longer used
    // verifyOtpAndSignIn, // No longer used
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
