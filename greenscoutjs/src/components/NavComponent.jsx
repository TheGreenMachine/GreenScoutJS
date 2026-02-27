import "./NavComponent.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function NavComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function navHome() {
    navigate("/home");
  }

  function navForm() {
    navigate("/scout");
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div id="navWrapper">
      <input type="checkbox" id="nav-toggle" />
      <label htmlFor="nav-toggle" className="hamburger"></label>
      <nav className="side-nav">
        {/* Add back later */}
        {/* <div id="usertile">
          <div id="userimage"></div>
          <div id="usertext">
            <h1>Guest</h1>
            <p>User</p>
          </div>
        </div> */}
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
    </div>
  );
}

export default NavComponent;
