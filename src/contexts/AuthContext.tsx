import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase"; 
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  login: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Track mount status
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Restore user safely
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
  
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!isMounted) return; // Prevent setting state after unmount
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });
  
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);  
  

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };
