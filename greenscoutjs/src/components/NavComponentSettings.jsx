import "./NavComponent.css";
import { useNavigate } from "react-router-dom";

function NavComponent() {
  const navigate = useNavigate();

  function navBack() {
    navigate("/settings");
  }

  return (
    <div id="navWrapper">
      <div onClick={navBack} className="back"></div>
      <nav id="navbar"></nav>
    </div>
  );
}

export default NavComponent;
