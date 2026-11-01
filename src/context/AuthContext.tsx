'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  auth,
  signInWithGoogle as firebaseGoogleSignIn,
  logOutUser,
  onAuthStateChanged,
  User,
} from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isVerified: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<User | null>;
  logOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isVerified: false,
  error: null,
  signInWithGoogle: async () => null,
  logOut: async () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentAuth = auth;
    if (!currentAuth) {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | null = null;
    let isMounted = true;

    const initAuth = () => {
      if (!isMounted) return;
      unsubscribe = onAuthStateChanged(currentAuth, (currentUser) => {
        if (isMounted) {
          setUser(currentUser);
          setLoading(false);
        }
      });
    };

    // Defer heavy Firebase Auth iframe until main thread is idle to eliminate 3,000ms critical path latency
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as any).requestIdleCallback(initAuth, { timeout: 2000 });
      return () => {
        isMounted = false;
        if ('cancelIdleCallback' in window) {
          (window as any).cancelIdleCallback(idleId);
        }
        if (unsubscribe) unsubscribe();
      };
    } else {
      const timer = setTimeout(initAuth, 500);
      return () => {
        isMounted = false;
        clearTimeout(timer);
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    setError(null);
    try {
      const loggedUser = await firebaseGoogleSignIn();
      setUser(loggedUser);
      return loggedUser;
    } catch (err: any) {
      const msg = err.message || 'Google দিয়ে লগইন করতে সমস্যা হয়েছে।';
      setError(msg);
      throw err;
    }
  };

  const logOut = async () => {
    try {
      await logOutUser();
      setUser(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const clearError = () => setError(null);

  const isVerified = useMemo(() => {
    // Google users are verified accounts
    return Boolean(user && (user.emailVerified || user.providerData?.some(p => p.providerId === 'google.com')));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isVerified,
        error,
        signInWithGoogle,
        logOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

