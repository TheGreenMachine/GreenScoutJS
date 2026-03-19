import "../../settings.css";
import NavComponentSettings from "../../NavComponentSettings";
import { useState, useRef, useEffect } from "react";

function SettingsDebug({ ip, eventData, uuid, certificate }) {
  const [matches, setMatches] = useState(() => {
    const cached = JSON.parse(localStorage.getItem("matchFormCache") || "[]");
    return cached.reverse(); // most recent first
  });

  const tileRef = useRef(null);

  useEffect(() => {
    if (tileRef.current) {
      const width = tileRef.current.offsetWidth;
      document.documentElement.style.setProperty("--tile-width", `${width}px`);
    }
  }, [matches]);

  const clearMatchCache = (event) => {
    event.preventDefault();
    if (confirm("Clear all cached matches?")) {
      localStorage.removeItem("matchFormCache");
      setMatches([]);
    }
  };

  const copyToClipboard = (text) => {
    if (text && confirm(`Do you want to save ${text} to your clipboard?`)) {
      navigator.clipboard.writeText(text);
    }
  };

  const forceSend = (text) => {
    alert(text);
  };

  return (
    <div id="settingsDebugBody">
      <NavComponentSettings />
      <div id="settingsContainerDebug">
        <button className="settingButtonDebug">
          <div className="image debug ipAddress"> </div>
          <div className="settingButtonDebugText">
            <h2>IP Address</h2>
            <p>{ip}</p>
          </div>
        </button>
        <button className="settingButtonDebug">
          <div className="image debug eventData"></div>
          <div className="settingButtonDebugText">
            <h2>Event Data</h2>
            <p>{eventData || "Unable to recieve from server"}</p>
          </div>
        </button>
        <button
          className="settingButtonDebug"
          onClick={() => copyToClipboard(JSON.stringify(uuid, null, 2))}
        >
          <div className="image debug uuid"></div>
          <div className="settingButtonDebugText">
            <h2>UUID</h2>
            <p>{uuid || "N/A"}</p>
          </div>
        </button>
        <button
          className="settingButtonDebug"
          onClick={() => copyToClipboard(JSON.stringify(certificate, null, 2))}
        >
          <div className="image debug certificate"></div>
          <div className="settingButtonDebugText">
            <h2>Certificate</h2>
            <p>{certificate || "N/A"}</p>
          </div>
        </button>
        <button className="settingButtonDebug" onClick={clearMatchCache}>
          <div className="image debug resetLife"></div>
          <div className="settingButtonDebugText">
            <h2>Reset Lifetime Matches</h2>
            <p>Gets rid of all the cached matches stored</p>
          </div>
        </button>
        <div id="settingsDebugCachedMatches">
          <h1 className="settingsh1">Cached Matches</h1>
          {matches.length === 0 && (
            <div className="settingsDebugCachedMatchesButton noneFound">
              <span>No cached matches found.</span>
            </div>
          )}
          {matches.map((entry, index) => (
            <div
              key={entry.key}
              ref={index === 0 ? tileRef : null}
              className="settingsDebugCachedMatchesButton"
            >
              <span className="settingsDebugCachedMatchesButton">
                Match # {JSON.stringify(entry.data.Match.Number) || "N/A"}
              </span>
              <span className="settingsDebugCachedMatchesButton">
                Team # {JSON.stringify(entry.data.Team) || "N/A"}
              </span>
              <span className="settingsDebugCachedMatchesButton">
                {JSON.stringify(entry.data.driverStation.IsBlue).includes(
                  "false",
                )
                  ? "Red " + JSON.stringify(entry.data.driverStation.Number)
                  : "Blue " + JSON.stringify(entry.data.driverStation.Number)}
              </span>
              <button
                onClick={() =>
                  copyToClipboard(JSON.stringify(entry.data, null, 2))
                }
              >
                Copy
              </button>
              {/* <button onClick={() => forceSend(JSON.stringify(entry, null, 2))}>
                Force Send
              </button> */}
            </div>
          ))}
          <h1 className="settingsh1">End</h1>
          <h1 className="settingsh1">Of Matches</h1>
        </div>
      </div>
    </div>
  );
}

export default SettingsDebug;
