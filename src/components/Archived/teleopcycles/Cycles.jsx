// import "../Matchform.css";
import { useEffect, useRef } from "react";

// Methods for handling cycles, in matchform.jsx
const [hubSwitchCount, setHubSwitchCount] = useState(0);
const [isCycleRunning, setIsCycleRunning] = useState(false);

const [cycleList, setCycleList] = useState([]);

const [isButtonActive, setIsButtonActive] = useState("true");

const [activeAlliance, setActiveAlliance] = useState("gray");

const [cycleTime, setCycleTime] = useState(0);

const [teamAlliance, setTeamAlliance] = useState("");

updateHub(newAlliance, formData.autoWon, hubSwitchCount);

//from handle change
if (name === "driverStation") {
  const newAlliance = value.includes("Blue") ? "blue" : "red";
  setTeamAlliance(newAlliance);
} else if (name === "autoWon") {
  updateHub(teamAlliance, checked, hubSwitchCount);
} else {
  updateHub(teamAlliance, formData.autoWon, hubSwitchCount);
}

const updateHub = (alliance, autoWon, switchCount) => {
  if (alliance === "blue") {
    if (autoWon) {
      setActiveAlliance((switchCount + 1) % 2 === 0 ? "red" : "blue");
    } else {
      setActiveAlliance(switchCount % 2 === 0 ? "red" : "blue");
    }
  } else if (alliance === "red") {
    if (autoWon) {
      setActiveAlliance((switchCount + 1) % 2 === 0 ? "blue" : "red");
    } else {
      setActiveAlliance(switchCount % 2 === 0 ? "blue" : "red");
    }
  }
};

const updateCycleAccuracy = (index, newAccuracy) => {
  setCycleList((prevList) =>
    prevList.map((item, i) =>
      i === index ? { ...item, accuracy: parseInt(newAccuracy) } : item,
    ),
  );
};

const removeCycleEvent = (indexRemoval) => {
  setCycleList((prevList) => [
    ...prevList.slice(0, indexRemoval),
    ...prevList.slice(indexRemoval + 1),
  ]);
};

const Cycles = ({
  list,
  runningBool,
  setTime,
  onTrigger,
  onUpdateAccuracy,
}) => {
  const toggleCycleStopwatch = (event) => {
    if (event) event.preventDefault();
    setIsCycleRunning(!isCycleRunning);
    if (isCycleRunning) {
      setIsButtonActive("true");
    } else {
      setIsButtonActive("false");
    }
  };

  const addCycleEvent = (eventName) => {
    if (isCycleRunning) {
      let newSwitchCount = hubSwitchCount;
      const currentTime = (cycleTime / 1000).toFixed(2);
      if (eventName === "hubSwitch") {
        newSwitchCount = hubSwitchCount + 1;
        setHubSwitchCount(newSwitchCount);
      }
      setCycleList((prevList) => [
        ...prevList,
        {
          event: eventName,
          time: currentTime,
          accuracy: eventName === "Score" ? 0 : null,
          activeHub: activeAlliance,
        },
      ]);
      updateHub(teamAlliance, formData.autoWon, newSwitchCount);
    }
  };

  const getAccuracyLabelScore = (value) => {
    const numValue = Number(value);
    if (numValue === 0) return "Miss";
    if (numValue <= 10) return "10%";
    if (numValue <= 20) return "20%";
    if (numValue <= 30) return "30%";
    if (numValue <= 40) return "40%";
    if (numValue <= 50) return "50%";
    if (numValue <= 60) return "60%";
    if (numValue <= 70) return "70%";
    if (numValue <= 80) return "80%";
    if (numValue <= 90) return "90%";
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
                step={10}
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
