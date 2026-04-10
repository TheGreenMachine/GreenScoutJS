import "../../settings.css";
import NavComponentSettings from "../../NavComponentSettings";
import ThemeDrop from "./ThemeDropdown";
import { useState, useEffect } from "react";

function SettingsThemes() {
  return (
    <div className="settingsBody">
      <NavComponentSettings />
      <div id="settingsContainer">
        <h1 className="settingsh1 animated-text">Themes</h1>
        <ThemeDrop />
      </div>
    </div>
  );
}

export default SettingsThemes;
