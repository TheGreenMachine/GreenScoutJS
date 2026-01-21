import "./LoginButton.css";
import { Navigate, useNavigate } from "react-router-dom";

function LoginButton({ onClick}) {
  return <button onClick={onClick}>Continue</button>;
}

export default LoginButton;
