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

      link.href = `${base}themes/${savedTheme}.css`;
    };

    updateStylesheet();
    window.addEventListener("themeChange", updateStylesheet);
    return () => window.removeEventListener("themeChange", updateStylesheet);
  }, []);

  useEffect(() => {
    const updateAnimation = () => {
      const isAnimated = localStorage.getItem("app-theme-animated") === "1";

      let link = document.getElementById("dynamic-theme-animation-link");
      if (!link) {
        link = document.createElement("link");
        link.id = "dynamic-theme-animation-link";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }

      const base = import.meta.env.BASE_URL.endsWith("/")
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`;

      link.href = isAnimated ? `${base}themes/animation.css` : "";
    };

    updateAnimation();
    window.addEventListener("themeAnimationChange", updateAnimation);
    return () =>
      window.removeEventListener("themeAnimationChange", updateAnimation);
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
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login getUser={getUser} />
              </PublicRoute>
            }
          />
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
                <SettingsDebug ip={ip} eventData={eventData} />
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
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
