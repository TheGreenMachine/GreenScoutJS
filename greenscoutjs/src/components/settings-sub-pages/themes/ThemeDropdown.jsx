import { useEffect, useState } from "react";
import "../../settings.css";
import { useNavigate } from 'react-router-dom';
import { getThemeList, getCurrentTheme, setTheme, makeThemeLink } from "../../../api";

function ThemeDrop({ value, onChange, name = "theme" }) {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(value ?? "");
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

        setThemes(Array.isArray(themeList) ? themeList : []);
        setSelectedTheme(value ?? currentTheme ?? "");
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
      await setTheme(nextTheme);
      onChange?.(e);
      let themeLink = document.getElementById("themeLink");
      themeLink.href = makeThemeLink(nextTheme);
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
