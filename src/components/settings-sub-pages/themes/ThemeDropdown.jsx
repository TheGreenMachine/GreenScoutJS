import { useState } from "react";
import "../../settings.css";
import "../../../../public/animation.css";
import { applyTheme } from "../../../theme";

function ThemeDrop() {
  const [themes] = useState(__THEME_NAMES__);
  const [selectedTheme, setSelectedTheme] = useState(
    () => localStorage.getItem("app-theme") ?? "Green",
  );

  const handleChange = (e) => {
    const nextTheme = e.target.value;
    setSelectedTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <div className="themechild">
      <p id="themedtext" className="animated-text">
        Theme Palette
      </p>
      <select
        id="themedropdown"
        value={selectedTheme}
        onChange={handleChange}
        name={"theme"}
        className="animated-text"
      >
        {themes.map((theme) => (
          <option key={theme} value={theme} className="animated-text">
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeDrop;
