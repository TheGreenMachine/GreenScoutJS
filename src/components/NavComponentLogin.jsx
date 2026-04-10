import "./NavComponent.css";
import { getIsOffline } from "../api";

function NavComponentLogin() {
  return (
    <span>
      <nav id="navbar" className="animated-accent">
        <div
          className={`${getIsOffline ? "offline animated-offline" : ""}`}
        ></div>
      </nav>
    </span>
  );
}

export default NavComponentLogin;
