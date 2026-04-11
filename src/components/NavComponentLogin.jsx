import "./NavComponent.css";
import { getIsOffline } from "../api";
import { useEffect } from "react";

function NavComponentLogin() {
  useEffect(() => {
    if (localStorage.getItem("guest_mode") === "false") {
      document.documentElement.dataset.offline = getIsOffline ? "1" : "0";
    } else {
      document.documentElement.dataset.offline = "1";
    }
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
