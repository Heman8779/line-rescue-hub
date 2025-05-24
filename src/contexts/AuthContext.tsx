
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Define types
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    try {
      const storedUser = localStorage.getItem('lineRescueUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('lineRescueUser');
    }
    setIsLoading(false);
  }, []);

  // Simple login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simple validation
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return false;
      }

      if (!email.includes('@')) {
        toast.error("Please enter a valid email address");
        return false;
      }

      // Create user object
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email: email,
        role: 'lineman'
      };

      setUser(userData);
      localStorage.setItem('lineRescueUser', JSON.stringify(userData));
      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Simple register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simple validation
      if (!name || !email || !password) {
        toast.error("Please fill in all fields");
        return false;
      }

      if (!email.includes('@')) {
        toast.error("Please enter a valid email address");
        return false;
      }

      if (password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return false;
      }

      // Create user object
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        role: 'lineman'
      };

      setUser(userData);
      localStorage.setItem('lineRescueUser', JSON.stringify(userData));
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('lineRescueUser');
      toast.info("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
