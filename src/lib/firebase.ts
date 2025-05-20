
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// IMPORTANT: This configuration uses a hardcoded API key based on user input.
// For a real production app, you should use environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyAhB3Wyl2hD0pfKayFo9y7GqqsT1K3Q5Co", // Updated API key
  authDomain: "cryptodapper-demo.firebaseapp.com",   // Based on projectId
  projectId: "cryptodapper-demo",                     // As per user request
  storageBucket: "cryptodapper-demo.appspot.com",   // Based on projectId
  messagingSenderId: "643322336591",                // Original value, assumed to be project-specific
  appId: "1:643322336591:web:a45c0d59d7511f1ca9613a", // Original value, assumed to be project-specific. Verify this if issues persist.
  measurementId: "G-63YS5VNJCV"                     // Original value, assumed to be project-specific
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
// Apple sign-in was removed, so appleProvider is no longer needed here.

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
