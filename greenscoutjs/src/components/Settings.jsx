import NavComponent from "./NavComponent";
import "./settings.css";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  function navMatchForm() {
    navigate("/settings/layout");
  }

  function navTheme() {
    navigate("/settings/theme");
  }

  function navDebug() {
    navigate("/settings/debug");
  }

  return (
    <div className="settingsBody">
      <NavComponent />
      <div id="settingsContainer">
        <h1>Settings</h1>
        <button className="settingButton" onClick={navMatchForm}>
          <div className="image matchImage"></div>
          Match Form Layout
        </button>
        <button className="settingButton" onClick={navTheme}>
          <div className="image themeImage"></div>
          Themes (Work In Progress)
        </button>
        <button className="settingButton" onClick={navDebug}>
          <div className="image debugImage"></div>
          Debug Info
        </button>
      </div>
    </div>
  );
}

export default Settings;
