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
      localStorage.setItem("guest_mode", true);

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

  const loginGuest = (event) => {
    event.preventDefault();
    setIsLoading(true);

    localStorage.setItem(
      "greenscout_user",
      JSON.stringify({
        username: {
          uuid: 0,
          certificate: 0,
          role: "Guest",
          username: "Guest",
          DisplayName: "Guest",
        },
      }),
    );
    localStorage.setItem("greenscout_auth", true);
    localStorage.setItem("guest_mode", true);

    setIsLoading(false);

    navigate("/home");
    globalThis.location.reload();
  };

  return (
    <div id="body">
      <NavComponentLogin />
      <div id="parent" className="text">
        <h1 className="textlogin loginh1 animated-text">Login</h1>
        <form id="loginPageForm" onSubmit={handleSubmit}>
          <div id="usercontainer" className="animated-border-input">
            <div id="userimg" className="animated-accent"></div>{" "}
            <input
              className="input animated-text"
              placeholder="Enter Username"
              type="text"
              id="user"
              onChange={handleUsernameChange}
              value={username}
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          <div id="passcontainer" className="animated-border-input">
            <div id="passimg" className="animated-accent"></div>
            <input
              className="input animated-text"
              placeholder="Enter Password"
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
            <div className="error-message animated-text">
              <span className="error-icon">⚠ </span>
              {error}
            </div>
          )}

          <button
            type="submit"
            id="loginButton"
            className="login-button animated-accent"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner">Logging in...</span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <button
          id="guestButton"
          className="login-button animated-accent"
          onClick={loginGuest}
        >
          Sign In as Guest
        </button>
      </div>
    </div>
  );
};

export default Login;
