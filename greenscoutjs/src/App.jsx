import "./App.css";
import Login from "./components/loginpage/Login";
import Home from "./components/homepage/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Matchform from "./components/matchform/Matchform";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const accounts = [
    {
      id: 1,
      user: "Noah",
      role: "Admin",
      matchesLogged: 9999999999999,
      pass: "1816",
    },
  ];

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            exact
            path="/GreenScoutJS"
            element={<Login accountList={accounts} />}
          />
          <Route
            path="/GreenScoutJS/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/GreenScoutJS/match"
            element={
              <ProtectedRoute>
                <Matchform />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/GreenScoutJS" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
