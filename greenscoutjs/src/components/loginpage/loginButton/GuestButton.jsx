import { Navigate, useNavigate } from "react-router-dom";
import "./GuestButton.css";

function GuestButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/GreenScoutJS/home");
  }
  return <p onClick={handleClick}>Login As Guest</p>;
}

export default GuestButton;
