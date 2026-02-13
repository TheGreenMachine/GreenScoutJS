import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authContext";
import LoginPage from "./LoginPage";
import { useState } from "react";

function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("../../../mock-api/user/accounts.cjs");
      const userData = await response.json();

      if (userData.username === username && userData.pass === password) {
        const token = "mock-token-" + Date.now() + "-" + username;
        setToken(token);
        navigate("/GreenScoutJS/home", { replace: true });
      } else {
        setError("Invalid username or password");
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPage
      login={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
    />
  );
}

export default Login;
