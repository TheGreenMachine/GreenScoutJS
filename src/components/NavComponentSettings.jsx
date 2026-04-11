import "./NavComponent.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getIsOffline } from "../api";

function NavComponent() {
  const navigate = useNavigate();

  function navBack() {
    navigate("/settings");
  }

  useEffect(() => {
    if (localStorage.getItem("guest_mode") === "false") {
      document.documentElement.dataset.offline = getIsOffline ? "1" : "0";
    } else {
      document.documentElement.dataset.offline = "1";
    }
  }, []);

  return (
    <div id="navWrapper">
      <div onClick={navBack} className="back"></div>
      <div onClick={navBack} className="aneeshBack"></div>
      <div className="offline animated-offline"></div>
      <nav id="navbar" className="animated-accent"></nav>
    </div>
  );
}

export default NavComponent;
