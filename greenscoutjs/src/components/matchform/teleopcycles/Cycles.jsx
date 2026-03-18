import "../Matchform.css";
import { useEffect, useRef } from "react";

const Cycles = ({
  list,
  runningBool,
  setTime,
  onTrigger,
  onUpdateAccuracy,
}) => {
  const getAccuracyLabelScore = (value) => {
    const numValue = Number(value);
    if (numValue <= 0) return "Miss";
    if (numValue <= 25) return "25%";
    if (numValue <= 50) return "50%";
    if (numValue <= 75) return "75%";
    return "100%";
  };

  const getAccuracyLabelShuttle = (value) => {
    const numValue = Number(value);
    if (numValue === 0) return "Shot";
    return "Drove";
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
          <div className={`cycleElementImg  ${item.activeHub}`}></div>
          <div className={`${item.event} cycleElementText`}>
            {item.event} {item.time}s
          </div>
          {item.event === "Score" && (
            <div className="accuracy-control">
              <input
                type="range"
                min={0}
                max={100}
                step={25}
                className="accSlider"
                value={item.accuracy || 0}
                onChange={(e) => handleAccuracyChange(index, e.target.value)}
              />
              <div className="accuracyLabel">
                {getAccuracyLabelScore(item.accuracy || 0)}
              </div>
            </div>
          )}
          {item.event === "Shuttle" && (
            <div className="accuracy-control">
              <input
                type="range"
                min={0}
                max={1}
                step={1}
                className="accSlider"
                value={item.accuracy || 0}
                onChange={(e) => handleAccuracyChange(index, e.target.value)}
              />
              <div className="accuracyLabel">
                {getAccuracyLabelShuttle(item.accuracy || 0)}
              </div>
            </div>
          )}
          {item.event === "hubSwitch" && (
            <div className="accuracy-control">
              <div className="accuracyLabel"></div>
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
