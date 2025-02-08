"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// Define User type based on your schema
interface User {
  id: string;
  username: string;
  email: string;
  profilePic?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the expected login response structure
interface LoginResponse {
  data: {
    user: User;
    accessToken: string;
  };
  message: string;
}

// Define the context type
interface AuthContextType {
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

// Create the context with an initial undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on mount
  
  // Function to update last active timestamp
  const updateLastActive = () => {
    localStorage.setItem("lastActive", new Date().toISOString());
  };

  useEffect(() => {
    if(isAuthenticated){
      router.push('/');
    }
    else{
      router.push('/login');
    }
  }, [isAuthenticated]);

  const login = async (identifier: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        { username: identifier, password }
      );
  
      const { user, accessToken } = response.data;
  
     
      console.log(response.data);
      setIsAuthenticated(true);
      setUser(user);
      localStorage.setItem("isAuthenticated", "true");// Store user data and token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      updateLastActive(); // Update last active time
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  
  

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("lastActive");
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
