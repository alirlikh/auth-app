'use client';

import { createContext, useContext, useState, useEffect, ReactNode, SetStateAction } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { hasRequiredRole } from './auth-utils';


export interface RandomUserResponse {
  results: RandomUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface RandomUser extends UserRole {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface UserRole {
  role? : string
}


interface AuthContextType {
  user: RandomUser | null;
  login: (userData: RandomUser) => void;
  logout: () => void;
  loading: boolean;
  hasRole: (role: string) => boolean;
  setUser: React.Dispatch<React.SetStateAction<RandomUser | null>>;
  isAuthenticated: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<RandomUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = () => {
    try {
      // Check localStorage for user data
      const userData = localStorage.getItem('user');
      const authToken = localStorage.getItem('auth-token');
      
      if (userData && authToken) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Set cookie for middleware to read
        document.cookie = `auth-token=${authToken}; path=/; max-age=86400`; // 24 hours
      } else {
        // Clear any stale auth data
        clearAuthData();
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  const login = (userData: RandomUser): void => {
    const authToken = `token_${userData.id}_${Date.now()}`; // Generate simple token
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('auth-token', authToken);
    
    // Set cookie for middleware
    document.cookie = `auth-token=${authToken}; path=/; max-age=86400`;
    
    // Handle redirect after login
    const redirectUrl = searchParams?.get('redirect') || '/dashboard';
    router.push(redirectUrl);
  };

  const logout = () => {
    setUser(null);
    clearAuthData();
    router.push('/login');
  };

  const hasRole = (requiredRole: any) => {
    if (!user) return false;
    return hasRequiredRole(user.role, requiredRole);
  };

  const value :  AuthContextType = {
    user,
    login,
    logout,
    loading,
    hasRole,
    isAuthenticated: !!user,
    setUser: function (value: SetStateAction<RandomUser | null>): void {
      throw new Error('Function not implemented.');
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};