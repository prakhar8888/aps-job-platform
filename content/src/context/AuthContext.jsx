import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../lib/mockAPI.js';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on app load
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('aps_auth_token');
        const userData = localStorage.getItem('aps_user_data');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('aps_auth_token');
        localStorage.removeItem('aps_user_data');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials, role) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials, role);
      
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem('aps_auth_token', response.token);
        localStorage.setItem('aps_user_data', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('aps_auth_token');
    localStorage.removeItem('aps_user_data');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('aps_user_data', JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }