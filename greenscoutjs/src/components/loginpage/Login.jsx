import "./Login.css";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../api";
import { useState } from "react";
import NavComponentLogin from "../NavComponentLogin";
import { useAuth } from "../../AuthContext";

const Login = ({ getUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await authenticateUser(username, password);
    console.log("Authentication result:", result);

    if (result.success) {
      // Store user data in localStorage
      getUser(username);

      login({ username: result.user, role: result.role });

      console.log("Login successful:", result.user);

      // Navigate to home page
      navigate("/home");
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear error when user starts typing
    if (error) setError("");
  };

  return (
    <div id="body">
      <NavComponentLogin />
      <div id="parent" className="text">
        <h1 className="textlogin loginh1">Login</h1>
        <form id="loginPageForm" onSubmit={handleSubmit}>
          <div id="usercontainer">
            <div id="userimg"></div>
            <input
              className="input"
              placeholder="Enter your username"
              type="text"
              id="user"
              onChange={handleUsernameChange}
              value={username}
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          <div id="passcontainer">
            <div id="passimg"></div>
            <input
              className="input"
              placeholder="Enter your password"
              required
              disabled={isLoading}
              autoComplete="current-password"
              type="password"
              onChange={handlePasswordChange}
              id="pass"
              value={password}
            />
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            id="loginButton"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
