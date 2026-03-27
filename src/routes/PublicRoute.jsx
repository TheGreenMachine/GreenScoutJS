// PublicRoute.jsx - Component for public-only routes (like login)
// Place this file in: greenscoutjs/src/routes/PublicRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontSize: "24px",
          color: "var(--kelly-green)",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // If not authenticated, show the login page
  return children;
};

export default PublicRoute;
