import "./NavComponent.css";
import "../../public/themes/animation.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getIsOffline } from "../api";

function NavComponent({ onNavigateOut, isAnimated }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleNavigation = (path) => {
    if (onNavigateOut) onNavigateOut();
    navigate(path);
  };

  function navHome() {
    handleNavigation("/home");
  }
  function navForm() {
    handleNavigation("/scout");
  }
  function navLeaderBoard() {
    handleNavigation("/leaderBoard");
  }
  function navSettings() {
    handleNavigation("/settings");
  }
  const handleLogout = () => {
    handleNavigation("/logout");
  };
  const handleNavToggle = (e) => {
    setChecked(e.target.checked);
  };
  const closeNav = () => {
    setChecked(false);
  };

  return (
    <div id="navWrapper">
      <input
        type="checkbox"
        id="nav-toggle"
        checked={checked}
        onChange={handleNavToggle}
      />
      <label
        htmlFor="nav-toggle"
        className={`hamburger${isAnimated ? " animated-accent" : ""}`}
      ></label>
      <div
        className={`${!getIsOffline ? "offline animated-offline" : ""}`}
      ></div>
      <label htmlFor="nav-toggle" id="aneeshButton"></label>
      <nav className="side-nav">
        <nav className="side-nav-top">
          <button
            className={`textp${isAnimated ? " animated-accent" : ""}`}
            onClick={navHome}
          >
            <span>Home</span>
          </button>
          <button
            className={`textp${isAnimated ? " animated-accent" : ""}`}
            onClick={navForm}
          >
            <span>Match Form</span>
          </button>
          <button
            className={`textp${isAnimated ? " animated-accent" : ""}`}
            onClick={navLeaderBoard}
          >
            <span>Leader Board</span>
          </button>
        </nav>
        <nav className="side-nav-bottom">
          <button
            id="settings"
            className={`textp${isAnimated ? " animated-accent" : ""}`}
            onClick={navSettings}
          >
            <span>Settings</span>
          </button>
          <button
            id="logout"
            className={`textp${isAnimated ? " animated-accent" : ""}`}
            onClick={handleLogout}
          >
            <span>Log Out</span>
          </button>
        </nav>
      </nav>
      <div className="invis-nav" onClick={closeNav}></div>
      <nav id="navbar" className={isAnimated ? "animated-accent" : ""}></nav>
    </div>
  );
}

export default NavComponent;
