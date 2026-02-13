import Username from "./username/username";
import Password from "./password/passwordBox";
import LoginButton from "./loginButton/LoginButton";
import NavComponentLogin from "../NavComponentLogin";
import "./Login.css";

function LoginPage({
  login,
  username,
  setUsername,
  password,
  setPassword,
  error,
  loading,
}) {
  return (
    <div id="body">
      <NavComponentLogin />
      <div id="parent" className="text">
        <h1 className="textlogin">Login</h1>
        <form id="loginPageForm" onSubmit={login}>
          <Username
            className="input"
            onUserChange={setUsername}
            value={username}
            disabled={loading}
          />
          <Password
            className="input"
            onPasswordChange={setPassword}
            value={password}
            disabled={loading}
          />
          {error && <p className="error-message">{error}</p>}
          <LoginButton type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </LoginButton>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
