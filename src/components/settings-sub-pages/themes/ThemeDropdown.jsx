import { useEffect, useState } from "react";
import "../../settings.css";
import { getThemeList, setTheme, makeThemeLink } from "../../../api";

function ThemeDrop({ onChange, name = "theme" }) {
  const [themes, setThemes] = useState(["Light", "Dark", "Green"]); //, "Rainbow"
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("app-theme"),
  );

  useEffect(() => {
    let active = true;

    async function loadThemes() {
      try {
        if (!active) return;

        setThemes(
          Array.isArray(await getThemeList())
            ? await getThemeList()
            : ["Light", "Dark", "Green"], //, "Rainbow"
        );

        setSelectedTheme(localStorage.getItem("app-theme"));
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
    localStorage.setItem("app-theme", nextTheme);

    try {
      if (Array.isArray(getThemeList)) {
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
