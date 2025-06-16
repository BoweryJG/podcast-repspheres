import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase';
import { 
  setupCrossDomainAuthListener, 
  broadcastAuthState, 
  storeReturnUrl, 
  getMainDomain,
  handleCrossDomainRedirect,
  isOnSubdomain 
} from '../utils/crossDomainAuth';

// Create an authentication context
const AuthContext = createContext();

// Hook for easy access to the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Authentication provider component
export function AuthProvider({ children }) {
  // State for the current user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    try {
      // Store current URL before redirecting
      storeReturnUrl(window.location.href);
      
      // Always redirect to main domain for OAuth
      const mainDomain = getMainDomain();
      const redirectUrl = `${mainDomain}/auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  // Function to sign in with Facebook
  const signInWithFacebook = async () => {
    try {
      // Store current URL before redirecting
      storeReturnUrl(window.location.href);
      
      // Always redirect to main domain for OAuth
      const mainDomain = getMainDomain();
      const redirectUrl = `${mainDomain}/auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Facebook:', error.message);
    }
  };

  // Function to sign in with email and password
  const signInWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      // Broadcast auth state to other domains
      if (data.session) {
        broadcastAuthState(data.session);
      }
      
      return data;
    } catch (error) {
      console.error('Error signing in with email:', error.message);
      throw error;
    }
  };

  // Function to sign up with email and password
  const signUpWithEmail = async (email, password, metadata = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      if (error) throw error;
      
      // Broadcast auth state to other domains
      if (data.session) {
        broadcastAuthState(data.session);
      }
      
      return data;
    } catch (error) {
      console.error('Error signing up with email:', error.message);
      throw error;
    }
  };

  // Function to reset password
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error resetting password:', error.message);
      throw error;
    }
  };

  // Generic function to sign in with any OAuth provider
  const signInWithProvider = async (provider) => {
    try {
      // Store current URL before redirecting
      storeReturnUrl(window.location.href);
      
      // Always redirect to main domain for OAuth
      const mainDomain = getMainDomain();
      const redirectUrl = `${mainDomain}/auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error.message);
      throw error;
    }
  };

  // Function to sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      
      // Broadcast logout to other domains
      broadcastAuthState(null);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  // Effect to set up auth state listener and handle initial session
  useEffect(() => {
    // Get the current session
    const initializeAuth = async () => {
      setLoading(true);
      
      // Set up cross-domain auth listener
      setupCrossDomainAuthListener(supabase);
      
      // Check for cross-domain redirect
      const wasRedirected = await handleCrossDomainRedirect(supabase);
      if (wasRedirected) {
        setLoading(false);
        return;
      }
      
      // Check active session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);
        
        // Broadcast initial auth state if we have a session
        broadcastAuthState(session);
      }
      
      // Set up auth state change listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            setUser(currentUser);
            
            // Broadcast auth state changes to other domains
            broadcastAuthState(session);
          } else {
            setUser(null);
            
            // Broadcast logout to other domains
            broadcastAuthState(null);
          }
          setLoading(false);
        }
      );
      
      setLoading(false);
      
      // Clean up subscription on unmount
      return () => {
        if (authListener && authListener.subscription) {
          authListener.subscription.unsubscribe();
        }
      };
    };

    initializeAuth();
  }, []);

  // Determine admin status whenever user changes
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    const adminEmails = (process.env.REACT_APP_ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);
    if (adminEmails.includes(user.email)) {
      setIsAdmin(true);
    } else if (user.user_metadata?.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  // Values to provide through the context
  const value = {
    user,
    loading,
    isAdmin,
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    signInWithProvider,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
