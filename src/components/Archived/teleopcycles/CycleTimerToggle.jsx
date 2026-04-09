import "./CycleButton.css";
import { useState } from "react";

function CycleTimerToggle({ isCycleRunning, onTrigger, active }) {
  const [idz, setIdz] = useState("cycleImg");

  const setTheId = () => {
    if (isCycleRunning) {
      setIdz("cycleImg");
    } else {
      setIdz("stopImg");
    }
  };

  return (
    <button
      className={active}
      id="sideButtonCycleTrigger"
      onClick={() => {
        onTrigger();
        setTheId();
      }}
    >
      <div id={idz}></div>
      Cycles
    </button>
  );
}

export default CycleTimerToggle;
