import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return null;
};

export default Logout;
