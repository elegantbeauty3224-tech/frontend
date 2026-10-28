import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyC9cxF2l1neFpcIcJYOKCnakhZIHgmknjQ',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'elegant-beauty-252da.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'elegant-beauty-252da',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'elegant-beauty-252da.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '191902449070',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:191902449070:web:00e36be5a2eaa74f249c3f',
};

// Initialize Firebase safely for SSR & client
let app: FirebaseApp;
let auth: Auth | null = null;
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

if (typeof window !== 'undefined') {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.warn('Firebase initialization warning:', error);
  }
}

// Google Sign-In helper function
export const signInWithGoogle = async (): Promise<User | null> => {
  if (!auth) {
    throw new Error('Firebase Auth চালু করা যায়নি। অনুগ্রহ করে আপনার Firebase Credentials চেক করুন।');
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Firebase Google Sign-In error:', error);
    // User closed popup or cancelled
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('লগইন উইন্ডো বন্ধ করা হয়েছে।');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('পূর্ববর্তী লগইন রিকোয়েস্ট বাতিল করা হয়েছে।');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('এই ডোমেনটি Firebase Authentication Authorized Domains এ যুক্ত করা নেই।');
    }
    throw error;
  }
};

// Sign Out helper function
export const logOutUser = async (): Promise<void> => {
  if (!auth) return;
  await signOut(auth);
};

export { app, auth, googleProvider, onAuthStateChanged };
export type { User };

