
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { toast } from "@/components/ui/sonner";

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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || '',
          role: 'lineman'
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Login failed. Please try again.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid credentials.";
      }
      
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      toast.success("Registration successful!");
      return true;
    } catch (error: any) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      }
      
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
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
