
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider, type AuthProvider as FirebaseAuthProvider } from 'firebase/auth';
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// IMPORTANT: This configuration now uses values directly provided by the user.
// The below code will be availbale to you when you create a project in firebase to use the firebase authentication.
const firebaseConfig = {
  apiKey: "Enter your API key", // User confirmed this key
  authDomain: "Enter the auth domain",
  projectId: "Enter the project Ido",
  storageBucket: "Enter the storage bucket domain", // Corrected format
  messagingSenderId: "Enter the sender ID", // From user
  appId: "Enter the app id", // From user
  measurementId: "Enter the measurement id" // Retained from previous, user should verify if needed
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// appleProvider was removed previously.

let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  // Initialize Analytics only on the client side
  try {
    // Ensure essential configs are present for analytics
    if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId) {
        analytics = getAnalytics(app);
    } else {
        console.warn("Firebase Analytics not initialized due to missing essential Firebase config, or running on server.");
    }
  } catch (error) {
    console.error("Error initializing Firebase Analytics:", error);
  }
}

export { app, auth, googleProvider, analytics };
