import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Hook to protect routes that require authentication
 * Redirects to /auth if user is not logged in
 */
export const useRequireAuth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  return { user, loading };
};

/**
 * Hook to protect routes that should redirect authenticated users
 * Redirects to / if user is already logged in
 */
export const useRedirectIfAuthenticated = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  return { user, loading };
};

/**
 * Hook for components that need user data but don't require auth
 * Returns user data without redirecting
 */
export const useOptionalAuth = () => {
  const { user, profile, loading } = useAuth();
  return { user, profile, loading };
};
