import "./App.css";
import { AuthProvider } from "./AuthContext";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Login from "./components/loginpage/Login";
import Home from "./components/homepage/Home";
import Logout from "./components/loginpage/Logout";
import Matchform from "./components/matchform/Matchform";
import LeaderBoard from "./components/leaderboard/LeaderBoard";
import Settings from "./components/Settings";
import SettingsDebug from "./components/settings-sub-pages/debug/SettingsDebug";
import SettingsThemes from "./components/settings-sub-pages/themes/SettingsThemes";
import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    const updateStylesheet = () => {
      const rawTheme = localStorage.getItem("app-theme") || "Green";
      const savedTheme = rawTheme.toLowerCase();

      let link = document.getElementById("dynamic-theme-link");
      if (!link) {
        link = document.createElement("link");
        link.id = "dynamic-theme-link";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }

      const base = import.meta.env.BASE_URL.endsWith("/")
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`;

      const newHref = `${base}themes/${savedTheme}.css`;

      console.log("Loading CSS from:", newHref);
      link.href = newHref;

      globalThis.addEventListener("themeChange", updateStylesheet);
      return () =>
        globalThis.removeEventListener("themeChange", updateStylesheet);
    };

    updateStylesheet();
    window.addEventListener("storage", updateStylesheet);
    return () => window.removeEventListener("storage", updateStylesheet);
  }, []);

  const getIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (err) {
      console.warn("Failed to fetch IP:", err);
      return null;
    }
  };

  const [ip, setIp] = useState("");
  const [eventData, setEventData] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    getIpAddress().then((address) => {
      if (address) setIp(address);
    });
  }, []);

  const getUser = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <AuthProvider>
        {/* <RoutesList /> */}
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login getUser={getUser} />
              </PublicRoute>
            }
          />

          {/* Protected routes - require authentication */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scout"
            element={
              <ProtectedRoute>
                <Matchform />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaderBoard"
            element={
              <ProtectedRoute>
                <LeaderBoard />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/theme"
            element={
              <ProtectedRoute>
                <SettingsThemes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/debug"
            element={
              <ProtectedRoute>
                <SettingsDebug ip={ip} eventData={eventData} />{" "}
                {/* Temporary values replace with backend values */}
              </ProtectedRoute>
            }
          />

          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />

          {/* 404 route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
