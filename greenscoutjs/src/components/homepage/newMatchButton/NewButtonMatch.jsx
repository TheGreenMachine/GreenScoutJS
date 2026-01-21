import "./NewButtonMatch.css";
import { Navigate, useNavigate } from "react-router-dom";

function NewButtonMatch() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/GreenScoutJS/match");
  }
  return <button onClick={handleClick} id="newmatchbutton"></button>;
}

export default NewButtonMatch;
