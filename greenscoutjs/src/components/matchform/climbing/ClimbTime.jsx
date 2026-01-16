import "./climbtimer.css";
import { useEffect, useRef } from "react";

function ClimbTime({ runningBool, time, setTime, name, onChange }) {
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (runningBool) {
      startRef.current = Date.now() - lastTimeRef.current;
      timerRef.current = setInterval(() => {
        const newTime = Date.now() - startRef.current;
        setTime(newTime);
        lastTimeRef.current = newTime;
      }, 10);
    } else {
      clearInterval(timerRef.current);
      // Only update formData when timer stops and time is greater than 0
      if (lastTimeRef.current > 0) {
        onChange({
          target: {
            name: name,
            value: (lastTimeRef.current / 1000).toFixed(2),
          },
        });
      }
    }

    return () => clearInterval(timerRef.current);
  }, [runningBool, name, onChange, setTime]);

  return (
    <div className="child text" id="climbtimehead">
      <p id="climbtimetext" className="text">
        {(time / 1000).toFixed(2)} secs
      </p>
    </div>
  );
}

export default ClimbTime;
