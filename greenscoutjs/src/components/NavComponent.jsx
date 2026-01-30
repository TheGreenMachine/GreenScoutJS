import "./NavComponent.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../UseAuth";

function NavComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function navHome() {
    navigate("/GreenScoutJS/home");
  }

  function navForm() {
    navigate("/GreenScoutJS/match");
  }

  const handleLogout = () => {
    logout();
    navigate("/GreenScoutJS");
  };

  return (
    <span>
      <input type="checkbox" id="nav-toggle" />
      <label htmlFor="nav-toggle" className="hamburger"></label>
      <nav className="side-nav">
        <div id="usertile">
          <div id="userimage"></div>
          <div id="usertext">
            <h1>Guest</h1>
            <p>User</p>
          </div>
        </div>
        <p className="textp" onClick={navHome}>
          Home
        </p>
        <p className="textp" onClick={navForm}>
          Match Form
        </p>
        <p id="logout" className="textp" onClick={handleLogout}>
          Log Out
        </p>
      </nav>
      <nav id="navbar"></nav>
    </span>
  );
}

export default NavComponent;
