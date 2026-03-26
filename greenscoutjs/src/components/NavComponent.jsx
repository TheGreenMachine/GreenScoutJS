import "./NavComponent.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Add onNavigateOut as a prop
function NavComponent({ onNavigateOut }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  // Helper function to handle saving before navigating
  const handleNavigation = (path) => {
    if (onNavigateOut) {
      onNavigateOut();
    }
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
      <label htmlFor="nav-toggle" className="hamburger"></label>
      <nav className="side-nav">
        <nav className="side-nav-top">
          <button className="textp" onClick={navHome}>
            Home
          </button>
          <button className="textp" onClick={navForm}>
            Match Form
          </button>
          <button className="textp" onClick={navLeaderBoard}>
            Leaderboard
          </button>
        </nav>
        <nav className="side-nav-bottom">
          <button id="settings" className="textp" onClick={navSettings}>
            Settings
          </button>
          <button id="logout" className="textp" onClick={handleLogout}>
            Log Out
          </button>
        </nav>
      </nav>
      <div className="invis-nav" onClick={closeNav}></div>
      <nav id="navbar"></nav>
    </div>
  );
}

export default NavComponent;
