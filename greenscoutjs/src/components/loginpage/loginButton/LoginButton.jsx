import "./LoginButton.css";

function LoginButton({ type = "button" }) {
  return (
    <button type={type} id="loginButton">
      Continue
    </button>
  );
}

export default LoginButton;
