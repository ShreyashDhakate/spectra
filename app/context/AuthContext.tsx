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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Function to update last active timestamp
  const updateLastActive = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastActive", new Date().toISOString());
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(isAuthenticated);
      if (!isAuthenticated) {
        router.push('/login');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        { username: identifier, password }
      );

      const { user, accessToken } = response.data;

      setUser(user);
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        updateLastActive();
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("lastActive");
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
