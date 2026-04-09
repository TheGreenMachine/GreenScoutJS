import { useEffect, useState } from "react";
import "../../settings.css";

function applyThemeStylesheet(themeName) {
  document.getElementById("dynamic-theme")?.remove();

  const link = document.createElement("link");
  link.id = "dynamic-theme";
  link.rel = "stylesheet";
  link.href = `GreenScoutJS/themes/${themeName.toLowerCase()}.css`;
  document.head.appendChild(link);
}

function ThemeDrop() {
  const cssModules = import.meta.glob("/public/themes/*.css");
  const fileNames = Object.keys(cssModules).map((path) => {
    const name = path.replace("/public/themes/", "").replace(".css", "");
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  const [themes, setThemes] = useState(fileNames);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("app-theme"),
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
  };

  return (
    <div className="themechild">
      <p id="themedtext">Theme Palette</p>
      <select
        id="themedropdown"
        value={selectedTheme}
        onChange={handleChange}
        name={"theme"}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeDrop;
