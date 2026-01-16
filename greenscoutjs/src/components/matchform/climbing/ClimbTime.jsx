import "./climbtimer.css";
import { useEffect, useRef } from "react";

function ClimbTime({ runningBool, time, setTime }) {
  const timerRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (runningBool) {
      startRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startRef.current);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [runningBool]);

  return (
    <div className="child text" id="climbtimehead">
      <p id="climbtimetext" className="text">
        {(time / 1000).toFixed(2)} secs
      </p>
    </div>
  );
}

export default ClimbTime;
