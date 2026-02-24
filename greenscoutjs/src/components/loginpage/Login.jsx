import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../api/mockApi";
import { useState } from "react";
import NavComponentLogin from "../NavComponentLogin";
import "./Login.css";
import { useAuth } from "../../AuthContext";

const Login = () => {
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

    // Simulate API delay for realistic UX
    setTimeout(() => {
      const result = authenticateUser(username, password);

      if (result.success) {
        // Store user data in localStorage
        login(result.user);

        console.log("Login successful:", result.user);

        // Navigate to home page
        navigate("/home");
      } else {
        setError(result.message);
      }

      setIsLoading(false);
    }, 500);
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
    // <div id="body">
    //   <NavComponentLogin />
    //   <div id="parent" className="text">
    //     <h1 className="textlogin">Login</h1>
    //     <form id="loginPageForm" onSubmit={handleSubmit}>
    //       <Username
    //         className="input"
    //         onUserChange={handleUsernameChange}
    //         value={username}
    //         disabled={isLoading}
    //       />
    //       <Password
    //         className="input"
    //         onPasswordChange={handlePasswordChange}
    //         value={password}
    //         disabled={isLoading}
    //       />
    //       {error && (
    //         <div className="error-message">
    //           <span className="error-icon">⚠</span>
    //           {error}
    //         </div>
    //       )}{" "}
    //       <LoginButton type="submit" disabled={isLoading}>
    //         {isLoading ? (
    //           <>
    //             <span className="spinner"></span>Logging in...
    //           </>
    //         ) : (
    //           "Sign In"
    //         )}
    //       </LoginButton>
    //     </form>
    //     <div className="test-credentials">
    //       <details>
    //         <summary>Test Credentials</summary>
    //         <div className="credentials-list">
    //           <div className="credential-item">
    //             <strong>Admin Account:</strong>
    //             <code>admin / greenscout2024</code>
    //           </div>
    //           <div className="credential-item">
    //             <strong>Scout Account:</strong>
    //             <code>scout1 / scout123</code>
    //           </div>
    //           <div className="credential-item">
    //             <strong>Team Lead:</strong>
    //             <code>teamlead / lead1816</code>
    //           </div>
    //         </div>
    //       </details>
    //     </div>
    //   </div>
    // </div>
    <div id="body">
      <NavComponentLogin />
      <div id="parent" className="text">
        <h1 className="textlogin">Login</h1>
        <form id="loginPageForm" onSubmit={handleSubmit}>
          <div>
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
          <div>
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

          <button type="submit" className="login-button" disabled={isLoading}>
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
