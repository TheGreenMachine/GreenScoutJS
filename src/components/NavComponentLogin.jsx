import "./NavComponent.css";
import { getIsOffline } from "../api";

function NavComponentLogin() {
  return (
    <span>
      <nav id="navbar">
        <div
          className={`${getIsOffline ? "offline animated-offline" : ""}`}
        ></div>
      </nav>
    </span>
  );
}

export default NavComponentLogin;
