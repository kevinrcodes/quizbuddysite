import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [returnTo, setReturnTo] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session ? 'Session found' : 'No session');
      setSession(session);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session ? 'Session updated' : 'Session cleared');
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    returnTo,
    setReturnTo,
    signUp: async (email, password) => {
      console.log('Attempting sign up for:', email);
      try {
        const result = await authService.signUp(email, password);
        console.log('Sign up result: Success');
        return { error: null };
      } catch (error) {
        console.log('Sign up result: Failed');
        return { error };
      }
    },
    signIn: async (email, password) => {
      console.log('Attempting sign in for:', email);
      try {
        const result = await authService.signIn(email, password);
        console.log('Sign in result: Success');
        return { error: null };
      } catch (error) {
        console.log('Sign in result: Failed');
        return { error };
      }
    },
    signOut: async () => {
      console.log('Attempting sign out');
      try {
        await authService.signOut();
        console.log('Sign out result: Success');
        return { error: null };
      } catch (error) {
        console.log('Sign out result: Failed');
        return { error };
      }
    },
    resetPassword: async (email) => {
      console.log('Attempting password reset for:', email);
      try {
        await authService.resetPassword(email);
        console.log('Password reset result: Success');
        return { error: null };
      } catch (error) {
        console.log('Password reset result: Failed');
        return { error };
      }
    },
    updatePassword: async (password) => {
      console.log('Attempting password update');
      try {
        await authService.updatePassword(password);
        const { data: { session: newSession } } = await supabase.auth.getSession();
        setSession(newSession);
        console.log('Password update successful');
        return { error: null };
      } catch (error) {
        console.log('Password update failed');
        return { error };
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 