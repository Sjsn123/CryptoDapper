
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Removed OAuthProvider
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// IMPORTANT: This hardcoded configuration is for debugging purposes.
// For production, you should use environment variables.
// Ensure this API key is the one you are actively configuring in Google Cloud Console
const firebaseConfig = {
  apiKey: "AIzaSyB99GzLRk1CslPNxwnCpWmBQWGEmgiU930", // Using the specific key you provided
  authDomain: "digital-wrapper.firebaseapp.com",
  projectId: "digital-wrapper",
  storageBucket: "digital-wrapper.appspot.com", // Corrected from firebasestorage.app
  messagingSenderId: "643322336591",
  appId: "1:643322336591:web:a45c0d59d7511f1ca9613a",
  measurementId: "G-63YS5VNJCV"
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
// appleProvider removed

let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  // Initialize Analytics only on the client side
  try {
    // Ensure essential configs are present for analytics
    if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId) {
        analytics = getAnalytics(app);
    } else {
        console.warn("Firebase Analytics not initialized due to missing essential Firebase config.");
    }
  } catch (error) {
    console.error("Error initializing Firebase Analytics:", error);
  }
}

export { app, auth, googleProvider, analytics }; // appleProvider removed from exports
