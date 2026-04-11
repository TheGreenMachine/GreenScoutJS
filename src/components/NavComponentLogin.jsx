import "./NavComponent.css";
import { getIsOffline } from "../api";
import { useEffect } from "react";

function NavComponentLogin() {
  useEffect(() => {
    getIsOffline();
  }, []);

  return (
    <span>
      <nav id="navbar" className="animated-accent">
        <div className="offline animated-offline"></div>
      </nav>
    </span>
  );
}

export default NavComponentLogin;
