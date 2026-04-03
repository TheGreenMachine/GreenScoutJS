import { useState } from "react";
import "../../settings.css";

function ThemeDrop({ name }) {
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("app-theme") || "Light",
  );

  const handleChange = (e) => {
    const newTheme = e.target.value;

    setSelectedTheme(newTheme);

    localStorage.setItem("app-theme", newTheme);

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="themechild">
      <p id="themedtext">Theme Palette</p>
      <select
        id="themedropdown"
        value={selectedTheme}
        onChange={handleChange}
        name={name}
      >
        <option value="Light">Light</option>
        <option value="Dark">Dark</option>
        <option value="Green">Green</option>
      </select>
    </div>
  );
}

export default ThemeDrop;
