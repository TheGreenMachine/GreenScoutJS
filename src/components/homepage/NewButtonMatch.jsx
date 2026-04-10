import "./Home.css";
import { useNavigate } from "react-router-dom";

function NewButtonMatch() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/scout");
  }
  return (
    <button
      onClick={handleClick}
      id="newmatchbutton"
      className="animated-accent"
    >
      <div id="newmatchbuttonimg"></div>
    </button>
  );
}

export default NewButtonMatch;
