import { useState, useEffect } from "react";
import NavComponent from "../NavComponent";
import "./Home.css";
import NewButtonMatch from "./NewButtonMatch";

function refreshPage() {
  location.reload();
}

function Home() {
  const [isAnimated, setIsAnimated] = useState(
    localStorage.getItem("app-theme-animated") === "1",
  );

  useEffect(() => {
    const checkAnimated = () => {
      setIsAnimated(localStorage.getItem("app-theme-animated") === "1");
    };

    window.addEventListener("themeAnimationChange", checkAnimated);
    return () =>
      window.removeEventListener("themeAnimationChange", checkAnimated);
  }, []);

  return (
    <span id="homeBody">
      <NavComponent isAnimated={isAnimated} />
      <div id="refreshButtonContainer">
        <button
          id="refreshButton"
          className={isAnimated ? "animated-accent" : ""}
          onClick={refreshPage}
        ></button>
      </div>
      <span id="parent" className="text">
        <h1 className={`textHome${isAnimated ? " animated-text" : ""}`}>
          Create New Match Form
        </h1>
        <NewButtonMatch isAnimated={isAnimated} />
      </span>
    </span>
  );
}

export default Home;
