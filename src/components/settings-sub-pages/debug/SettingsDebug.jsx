import "../../settings.css";
import NavComponentSettings from "../../NavComponentSettings";
import { useState, useRef, useEffect } from "react";
import { submitMatchform } from "../../../api";

function SettingsDebug({ ip, eventData }) {
  const [matches, setMatches] = useState(() => {
    const cached = JSON.parse(localStorage.getItem("matchFormCache") || "[]");
    return cached.reverse(); //Most Recent First
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

  const copyAllToClipboard = () => {
    if (window.confirm("Do you want to save all matches to your clipboard?")) {
      const formattedData = matches
        .map((entry) => JSON.stringify(entry))
        .join("\n");
      navigator.clipboard.writeText(formattedData);
    }
  };

  const forceSend = (text) => {
    submitMatchform(text).catch((err) => {
      console.error("Submission failed:", err);
    });
  };

  const forceSendAll = () => {
    matches.map((entry) =>
      submitMatchform(entry).catch((err) => {
        console.error("Submission failed:", err);
      }),
    );
  };

  return (
    <div id="settingsDebugBody">
      <NavComponentSettings />
      <div id="settingsContainerDebug">
        <button className="settingButtonDebug">
          <div className="image debug ipAddress animated-accent"></div>
          <div className="settingButtonDebugText animated-text">
            <h2>IP Address</h2>
            <p>{ip}</p>
          </div>
        </button>
        <button className="settingButtonDebug">
          <div className="image debug eventData  animated-accent"></div>
          <div className="settingButtonDebugText animated-text">
            <h2>Event Data</h2>
            <p>{eventData || "Unable to receive from server"}</p>
          </div>
        </button>
        <button className="settingButtonDebug" onClick={clearMatchCache}>
          <div className="image debug resetLife animated-accent"></div>
          <div className="settingButtonDebugText animated-text">
            <h2>Reset Lifetime Matches</h2>
            <p>Gets rid of all the cached matches stored</p>
          </div>
        </button>
        <button className="settingButtonDebug" onClick={copyAllToClipboard}>
          <div className="image debug copyAll animated-accent"></div>
          <div className="settingButtonDebugText animated-text">
            <h2>Copy All Matches To Clipboard</h2>
          </div>
        </button>
        <button className="settingButtonDebug" onClick={forceSendAll}>
          <div className="image debug forceAll animated-accent"></div>
          <div className="settingButtonDebugText animated-text">
            <h2>Force Send All Matches</h2>
          </div>
        </button>
        <div id="settingsDebugCachedMatches">
          <h1 className="settingsh1 animated-text">Cached Matches</h1>
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
              <span className="animated-text">
                Match # {JSON.stringify(entry.data?.Match?.Number) || "N/A"}
              </span>
              <span className="animated-text">
                Team # {JSON.stringify(entry.data?.Team) || "N/A"}
              </span>
              <span className="animated-text">
                {entry.data?.driverStation?.IsBlue === false
                  ? "Red " + entry.data?.driverStation?.Number
                  : "Blue " + entry.data?.driverStation?.Number}
              </span>
              <button
                className="forceSendCopy animated-text"
                onClick={() =>
                  copyToClipboard(JSON.stringify(entry.data, null, 2))
                }
              >
                Copy
              </button>
              <button
                className="forceSendCopy animated-text"
                onClick={() => forceSend(JSON.stringify(entry, null, 2))}
              >
                Force Send
              </button>
            </div>
          ))}
          <h1 className="settingsh1 animated-text">End</h1>
          <h1 className="settingsh1 animated-text">Of Matches</h1>
        </div>
      </div>
    </div>
  );
}

export default SettingsDebug;
