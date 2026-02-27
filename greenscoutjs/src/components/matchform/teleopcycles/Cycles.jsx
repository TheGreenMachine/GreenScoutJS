import "../Matchform.css";
import { useEffect, useRef } from "react";

const Cycles = ({
  list,
  runningBool,
  setTime,
  onTrigger,
  onUpdateAccuracy,
}) => {
  const getAccuracyLabel = (value) => {
    const numValue = Number(value);
    if (numValue <= 5) return "Miss";
    if (numValue <= 10) return "1-5";
    if (numValue <= 15) return "6-10";
    if (numValue <= 20) return "11-15";
    if (numValue <= 25) return "16-20";
    if (numValue <= 30) return "21-25";
    return "26+";
  };

  const handleAccuracyChange = (index, value) => {
    onUpdateAccuracy(index, value);
  };

  const timerCycleRef = useRef(null);

  useEffect(() => {
    if (runningBool) {
      timerCycleRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timerCycleRef.current);
    }

    return () => clearInterval(timerCycleRef.current);
  }, [runningBool, setTime]);

  const remove = (ind, event) => {
    if (event) event.preventDefault();
    onTrigger(ind);
  };

  return (
    <div id="cycleContainer">
      {list.map((item, index) => (
        <div className={`cycle-item ${item.event}`} key={index}>
          <div className="cycleElementImg"></div>
          <div className={`${item.event} cycleElementText`}>
            {item.event} {item.time}s
          </div>
          {item.event === "Score" && (
            <div className="accuracy-control">
              <input
                type="range"
                min={1}
                max={31}
                step={5}
                className="accSlider"
                value={item.accuracy || 1}
                onChange={(e) => handleAccuracyChange(index, e.target.value)}
              />
              <div className="accuracyLabel">
                {getAccuracyLabel(item.accuracy || 1)}
              </div>
            </div>
          )}
          <button
            className={`deleteButton ${item.event}`}
            onClick={(event) => remove(index, event)}
          ></button>
        </div>
      ))}
    </div>
  );
};

export default Cycles;
