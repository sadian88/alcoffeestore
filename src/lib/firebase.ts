import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Your Firebase configuration object
export const firebaseConfig = {
  apiKey: "AIzaSyCfYro0NgHqVfuGOUTxbwE88DLefw5fNqg",
  authDomain: "kawa-coffee-kit.firebaseapp.com",
  projectId: "kawa-coffee-kit",
  storageBucket: "kawa-coffee-kit.firebasestorage.app",
  messagingSenderId: "716216401027",
  appId: "1:716216401027:web:e039db9ee318d724316fb6",
  measurementId: "G-XXCM0CLGD0"
};

// Initialize Firebase app
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase Analytics
// We store the promise, so it's only initialized once.
let analyticsInstancePromise: Promise<Analytics | null> | null = null;

const getAnalyticsInstance = (): Promise<Analytics | null> => {
  if (!analyticsInstancePromise) {
    analyticsInstancePromise = isSupported().then(yes => {
      if (yes && typeof window !== 'undefined') { // Ensure it runs only on client
        return getAnalytics(app);
      }
      return null;
    });
  }
  return analyticsInstancePromise;
};


export { app, getAnalyticsInstance };
