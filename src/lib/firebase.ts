
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// IMPORTANT: This hardcoded configuration is for debugging purposes.
// For production, you should use environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyB99GzLRk1CslPNxwnCpWmBQWGEmgiU930", // UPDATED API KEY
  authDomain: "digital-wrapper.firebaseapp.com",
  projectId: "digital-wrapper",
  storageBucket: "digital-wrapper.appspot.com", // Corrected to standard .appspot.com
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
const appleProvider = new OAuthProvider('apple.com'); // Ensure 'apple.com' is enabled in Firebase Console

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

export { app, auth, googleProvider, appleProvider, analytics };
