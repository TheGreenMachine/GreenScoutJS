import "./NavComponent.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useState } from "react";

function NavComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  function navHome() {
    navigate("/home");
  }

  function navForm() {
    navigate("/scout");
  }

  function navLeaderBoard() {
    navigate("/leaderBoard");
  }

  function navSettings() {
    navigate("/settings");
  }

  const handleLogout = () => {
    logout();
  };

  const toggleCheck = (e) => {
    e.preventDefault();
    setChecked(!checked);
  };

  return (
    <div id="navWrapper">
      <input type="checkbox" id="nav-toggle" checked={checked} />
      <label onClick={toggleCheck} className="hamburger"></label>
      <nav className="side-nav">
        {/* Add back later */}
        {/* <div id="usertile">
          <div id="userimage"></div>
          <div id="usertext">
            <h1>Guest</h1>
            <p>User</p>
          </div>
        </div> */}
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
      <div className="invis-nav" onClick={toggleCheck}></div>
      <nav id="navbar"></nav>
    </div>
  );
}

export default NavComponent;
