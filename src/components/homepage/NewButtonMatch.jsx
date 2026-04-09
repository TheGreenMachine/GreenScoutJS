import "./Home.css";
import { useNavigate } from "react-router-dom";

function NewButtonMatch({ isAnimated }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/scout");
  }
  return (
    <button
      onClick={handleClick}
      id="newmatchbutton"
      className={isAnimated ? "animated-accent" : ""}
    >
      <div id="newmatchbuttonimg"></div>
    </button>
  );
}

export default NewButtonMatch;
