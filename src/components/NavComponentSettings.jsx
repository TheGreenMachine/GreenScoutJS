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
      <div onClick={navBack} className="aneeshBack"></div>
      <nav id="navbar" className="animated-accent"></nav>
    </div>
  );
}

export default NavComponent;
