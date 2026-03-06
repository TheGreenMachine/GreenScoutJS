import "./App.css";
import { AuthProvider } from "./AuthContext";
import {
  BrowserRouter as Router,
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
import LeaderBoard from "./components/leader board/leaderBoard";
import Settings from "./components/Settings";
import SettingsDebug from "./components/settings sub pages/debug/SettingsDebug";
import SettingsLayout from "./components/settings sub pages/layout/SettingsMatchForm";
import SettingsThemes from "./components/settings sub pages/themes/SettingsThemes";

function App() {
  return (
    <Router basename="/GreenScoutJS">
      <AuthProvider>
        {/* <RoutesList /> */}
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
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
            path="/settings/layout"
            element={
              <ProtectedRoute>
                <SettingsLayout />
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
                <SettingsDebug />
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
