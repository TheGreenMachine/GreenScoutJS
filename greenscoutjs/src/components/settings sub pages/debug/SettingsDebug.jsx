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
          onClick={() => copyToClipboard(uuid)}
        >
          <div className="image debug uuid"></div>
          <div className="settingButtonDebugText">
            <h2>UUID</h2>
            <p>{uuid || "N/A"}</p>
          </div>
        </button>
        <button
          className="settingButtonDebug"
          onClick={() => copyToClipboard(certificate)}
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
          <h1>Cached Matches</h1>
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
                Match # {entry.data.match || "N/A"}
              </span>
              <span className="settingsDebugCachedMatchesButton">
                Team # {entry.data.team || "N/A"}
              </span>
              <span className="settingsDebugCachedMatchesButton">
                {entry.data.driverStation}
              </span>
              <button onClick={() => copyToClipboard(entry.data)}>Copy</button>
              <button onClick={() => forceSend(entry)}>Force Send</button>
            </div>
          ))}
          <h1>End</h1>
          <h1>Of Matches</h1>
        </div>
      </div>
    </div>
  );
}

export default SettingsDebug;
