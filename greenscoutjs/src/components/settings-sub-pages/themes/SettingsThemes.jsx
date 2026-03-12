import "../../settings.css";
import NavComponentSettings from "../../NavComponentSettings";
import ThemeDrop from "./ThemeDropdown";

function SettingsThemes() {
  return (
    <div className="settingsBody">
      <NavComponentSettings />
      <div id="settingsContainer">
        <h1 className="settingsh1">Themes</h1>
        <ThemeDrop />
      </div>
    </div>
  );
}

export default SettingsThemes;
