import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/GreenScoutJS" replace />;
  }

  return children;
}

export default ProtectedRoute;
