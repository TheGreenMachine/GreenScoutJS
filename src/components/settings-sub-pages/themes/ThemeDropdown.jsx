import { useEffect, useState } from "react";
import "../../settings.css";
import { useNavigate } from "react-router-dom";
import {
  getThemeList,
  getCurrentTheme,
  setTheme,
  makeThemeLink,
} from "../../../api";

function ThemeDrop({ value, onChange, name = "theme" }) {
  const [themes, setThemes] = useState(["Light", "Dark", "Green"]); //, "Rainbow"
  const [selectedTheme, setSelectedTheme] = useState(
    value ?? localStorage.getItem("app-theme"),
  );
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function loadThemes() {
      try {
        const [themeList, currentTheme] = await Promise.all([
          getThemeList(),
          getCurrentTheme(),
        ]);

        if (!active) return;

        setThemes(
          Array.isArray(themeList) ? themeList : ["Light", "Dark", "Green"], //, "Rainbow"
        );
        setSelectedTheme(
          value ?? currentTheme ?? localStorage.getItem("app-theme"),
        );
      } catch (err) {
        console.error("Failed to load themes:", err);
      }
    }

    loadThemes();

    return () => {
      active = false;
    };
  }, [value]);

  const handleChange = async (e) => {
    const nextTheme = e.target.value;
    setSelectedTheme(nextTheme);

    try {
      if (Array.isArray(getThemeList)) {
        // Array.isArray(getThemeList)
        await setTheme(nextTheme);
        onChange?.(e);
        let themeLink = document.getElementById("themeLink");
        themeLink.href = makeThemeLink(nextTheme);
        localStorage.setItem("app-theme-animated", "0");
      } else {
        localStorage.setItem("app-theme", nextTheme);
        globalThis.dispatchEvent(new Event("themeChange"));

        const isRainbow = nextTheme === "Rainbow";
        localStorage.setItem("app-theme-animated", isRainbow ? "1" : "0");
        globalThis.dispatchEvent(new Event("themeAnimationChange"));
      }
    } catch (err) {
      console.error("Failed to set theme:", err);
    }
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
