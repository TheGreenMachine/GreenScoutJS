import "./NavComponent.css";
import { getIsOffline } from "../api";
import { useEffect } from "react";

function NavComponentLogin() {
  useEffect(() => {
    document.documentElement.dataset.offline = getIsOffline ? "0" : "1";
    console.log(document.documentElement.dataset.offline);
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
