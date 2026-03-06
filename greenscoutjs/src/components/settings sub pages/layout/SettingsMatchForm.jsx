import "../../settings.css";
import NavComponentSettings from "../../NavComponentSettings";

function SettingsLayout() {
  return (
    <div className="settingsBody">
      <NavComponentSettings />
      <div id="settingsContainer">
        <h1>Match Form Layout</h1>
      </div>
    </div>
  );
}

export default SettingsLayout;
