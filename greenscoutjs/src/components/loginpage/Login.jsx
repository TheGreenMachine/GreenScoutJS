import "./Login.css";
import Username from "./username/username";
import Password from "./password/passwordBox";
import LoginButton from "./loginButton/LoginButton";
import GuestButton from "./loginButton/GuestButton";
import NavComponentLogin from "../NavComponentLogin";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../UseAuth";

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/GreenScoutJS/home");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://your-backend-url.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        login(data.user, data.token);
        navigate("/GreenScoutJS/home");
      } else {
        setError(data.message || "Invalid username or password");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to connect to server");
      setUsername("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestAccount = {
      id: 0,
      user: "Guest",
      role: "Guest",
      matchesLogged: 0,
    };
    const token = "guest-token-" + Date.now();

    login(guestAccount, token);
    navigate("/GreenScoutJS/home");
  };

  return (
    <div id="body">
      <NavComponentLogin></NavComponentLogin>
      <div id="parent" className="text">
        <h1 className="textlogin">Login</h1>
        <form onSubmit={handleLogin}>
          <Username
            className="input"
            onUserChange={setUsername}
            value={username}
          ></Username>
          <Password
            className="input"
            onPasswordChange={setPassword}
            value={password}
          ></Password>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="button-container">
            <LoginButton type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </LoginButton>
            <GuestButton onClick={handleGuestLogin} type="button"></GuestButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
