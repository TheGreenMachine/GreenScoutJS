import "./App.css";
import { AuthProvider } from "./AuthContext";
// import RoutesList from "./routes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./components/loginpage/Login";
import Home from "./components/homepage/Home";

function App() {
  return (
    <Router basename="/GreenScoutJS">
      <AuthProvider>
        {/* <RoutesList /> */}
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

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
                {/* <ScoutingForm /> */}
                <div>Scouting Form - Protected Route</div>
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
          <Route path="/" element={<Home />} />

          {/* 404 route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
