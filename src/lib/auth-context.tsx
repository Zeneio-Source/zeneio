'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useReducer } from 'react';
import { User, AuthState } from './types';

// --- Actions ---
type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      if (typeof window !== 'undefined') {
        localStorage.removeItem('zeneio_user');
        localStorage.removeItem('zeneio_token');
      }
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'UPDATE_USER':
      return state.user
        ? { ...state, user: { ...state.user, ...action.payload } }
        : state;
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

// --- Context ---
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  firstName?: string;
  lastName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Load session on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('zeneio_user');
      if (storedUser) {
        dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // TODO: Replace with real API call
      // For now, simulate login
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock successful login
      const mockUser: User = {
        id: 'user_001',
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('zeneio_user', JSON.stringify(mockUser));
      localStorage.setItem('zeneio_token', 'mock_token_' + Date.now());
      
      dispatch({ type: 'LOGIN', payload: mockUser });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: 'Invalid credentials. Please try again.' };
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // TODO: Replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: 'user_' + Date.now(),
        email: data.email,
        name: data.name || data.firstName + ' ' + data.lastName,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('zeneio_user', JSON.stringify(newUser));
      localStorage.setItem('zeneio_token', 'mock_token_' + Date.now());

      dispatch({ type: 'LOGIN', payload: newUser });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: data });
    if (authState.user) {
      localStorage.setItem('zeneio_user', JSON.stringify({
        ...authState.user,
        ...data,
      }));
    }
  }, [authState.user]);

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
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
