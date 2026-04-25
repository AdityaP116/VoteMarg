import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

// Initialize Firebase only if the core projectId is present
const app = getApps().length > 0 
  ? getApp() 
  : (firebaseConfig.projectId ? initializeApp(firebaseConfig) : null);

// Initialize Firestore, Analytics, and Auth only if app was initialized
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;
const analytics = (typeof window !== "undefined" && app) 
  ? isSupported().then(yes => yes ? getAnalytics(app) : null) 
  : null;

export { db, auth, analytics };
