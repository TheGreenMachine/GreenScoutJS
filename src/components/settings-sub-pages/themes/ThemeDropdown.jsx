import { useEffect, useState } from "react";
import "../../settings.css";
import "../../../../public/animation.css";

function applyThemeStylesheet(themeName) {
  document.getElementById("dynamic-theme")?.remove();

  const link = document.createElement("link");
  link.id = "dynamic-theme";
  link.rel = "stylesheet";
  link.href = `GreenScoutJS/themes/${themeName}.css`;
  document.head.appendChild(link);
}

function ThemeDrop() {
  const [themes] = useState(__THEME_NAMES__);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("app-theme")
      ? localStorage.getItem("app-theme")
      : "Green",
  );

  useEffect(() => {
    const saved = localStorage.getItem("app-theme") ?? "Green";
    setSelectedTheme(saved);
    document.documentElement.dataset.theme = saved;
    applyThemeStylesheet(saved);
  }, []);

  const handleChange = async (e) => {
    const nextTheme = e.target.value;
    setSelectedTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("app-theme", nextTheme);
    applyThemeStylesheet(nextTheme);
    localStorage.setItem(
      "app-theme-animated",
      nextTheme === "Rainbow" ? "1" : "0",
    );
    document.documentElement.dataset.animated =
      nextTheme === "Rainbow" ? "1" : "0";
    console.log(document.documentElement.dataset.animated);
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
