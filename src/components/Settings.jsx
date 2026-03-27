import NavComponent from "./NavComponent";
import "./settings.css";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  function navTheme() {
    navigate("/settings/theme");
  }

  function navDebug() {
    navigate("/settings/debug");
  }

  const clearMatchCache = (event) => {
    event.preventDefault();
    if (confirm("Clear all cached matches?")) {
      localStorage.removeItem("matchFormCache");
      setMatches([]);
    }
  };

  return (
    <div className="settingsBody">
      <NavComponent />
      <div id="settingsContainer">
        <h1 className="settingsh1">Settings</h1>
        {<button className="settingButton" onClick={navTheme}>
          <div className="image themeImage"></div>
          Themes
        </button>}
        <button className="settingButton" onClick={navDebug}>
          <div className="image debugImage"></div>
          Debug Info
        </button>
      </div>
    </div>
  );
}

export default Settings;
