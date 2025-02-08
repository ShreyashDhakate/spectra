"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define User type based on your schema
interface User {
  username: string;
  email: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the context type
interface AuthContextType {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

// Create the context with initial undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const storedTime = localStorage.getItem('lastActive');
      
      if (storedUser && storedTime) {
        const lastActive = new Date(storedTime);
        const now = new Date();
        const diffInDays = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
        
        if (diffInDays < 7) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          updateLastActive();
        } else {
          // Clear expired session
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const updateLastActive = () => {
    localStorage.setItem('lastActive', new Date().toISOString());
  };

  // Update last active timestamp on any activity
  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      updateLastActive();
    };

    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Check session validity every minute
    const interval = setInterval(() => {
      const lastActive = localStorage.getItem('lastActive');
      if (lastActive) {
        const lastActiveDate = new Date(lastActive);
        const now = new Date();
        const diffInDays = (now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (diffInDays >= 7) {
          logout();
        }
      }
    }, 60000);

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData: User = await response.json();
      
      // Store user data and timestamp
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('lastActive', new Date().toISOString());
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('lastActive');
  };

  return (
    <AuthContext.Provider value={{ 
      login, 
      logout, 
      isAuthenticated, 
      user,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
