// AuthContext.jsx - Context provider for authentication state
// Place this file in: greenscoutjs/src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { logoutUser } from "./api/";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn("Server logout failed:", err);
    }
    // Always clear local state even if server errors
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("greenscout_user");
    localStorage.removeItem("greenscout_auth");
    localStorage.removeItem("UUID");
    localStorage.removeItem("Certificate");
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem("greenscout_auth");
      const storedUser = localStorage.getItem("greenscout_user");

      if (storedAuth === "true" && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("greenscout_user", JSON.stringify(userData));
    localStorage.setItem("greenscout_auth", "true");
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("greenscout_user");
    localStorage.removeItem("greenscout_auth");
    localStorage.removeItem("UUID");
    localStorage.removeItem("Certificate");
  });

  const updateUser = useCallback((updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem("greenscout_user", JSON.stringify(newUser));
      return newUser;
    });
  }, []);

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
