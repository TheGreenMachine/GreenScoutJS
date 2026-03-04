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
        <div className="settingButton" onClick={navMatchForm}>
          <div className="image match"></div>
          Match Form Layout
        </div>
        <div className="settingButton" onClick={navTheme}>
          <div className="image theme"></div>
          Themes (Work In Progress)
        </div>
        <div className="settingButton" onClick={navDebug}>
          <div className="image debug"></div>
          Debug Info
        </div>
      </div>
    </div>
  );
}

export default Settings;
