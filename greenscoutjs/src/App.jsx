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
            path="/dashboard"
            element={
              <ProtectedRoute>
                {/* <Dashboard /> */}
                <div>Dashboard - Protected Route</div>
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

          {/* Admin-only routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requireAdmin={true}>
                {/* <AdminDashboard /> */}
                <div>Admin Dashboard - Admin Only</div>
              </ProtectedRoute>
            }
          />

          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

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
