import "./Home.css";
import { Navigate, useNavigate } from "react-router-dom";

function NewButtonMatch() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/scout");
  }
  return (
    <button onClick={handleClick} id="newmatchbutton">
      <div id="newmatchbuttonimg"></div>
    </button>
  );
}

export default NewButtonMatch;
