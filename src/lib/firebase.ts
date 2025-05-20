
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// IMPORTANT: This hardcoded configuration is for debugging purposes.
// For production, you should use environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyB99GzLRk1CslPNxwnCpWmBQWGEmgiU930", // Using the API key you specified
  authDomain: "cryptodapper-demo.firebaseapp.com", // Derived from new projectId
  projectId: "cryptodapper-demo", // New projectId
  storageBucket: "cryptodapper-demo.appspot.com", // Derived from new projectId
  messagingSenderId: "643322336591", // Assuming this remains the same, or update if it changes with the project
  appId: "1:643322336591:web:a45c0d59d7511f1ca9613a", // Assuming this remains the same, or update if it changes
  measurementId: "G-63YS5VNJCV" // Assuming this remains the same, or update if it changes
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
        console.warn("Firebase Analytics not initialized due to missing essential Firebase config.");
    }
  } catch (error) {
    console.error("Error initializing Firebase Analytics:", error);
  }
}

export { app, auth, googleProvider, analytics };
