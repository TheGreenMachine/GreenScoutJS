import "./Matchform.css";
import { useState } from "react";
import NavComponent from "../NavComponent";
import Dropdown from "./auto/dropdown/Dropdown";
import Autocheck from "./auto/autocheck/Autocheck";
import Autocounter from "./auto/autocounter/Autocounter";
import Neutralcheck from "./collection/NeutralCheck";
import HPCheck from "./collection/HPCheck";
import CollectDrop from "./collection/CollectDrop";
import ClimbTime from "./climbing-timer/ClimbTime";
import TriggerButton from "./climbing-timer/TriggerButton";
import ResetButton from "./climbing-timer/ResetButton";
import EndDropDown from "./auto/dropdown/EndDropDown";
import SubmitButton from "./submitbuttons/SubmitButton";
import ReplayButton from "./submitbuttons/ReplayButton";
import Cycles from "./teleopcycles/Cycles";
import CycleTimerToggle from "./teleopcycles/CycleTimerToggle";
import ScoreButton from "./teleopcycles/ScoreButton";
import ShuttleButton from "./teleopcycles/ShuttleButton";

function Matchform() {
  const [formData, setFormData] = useState({
    match: "",
    team: "",
    driverStation: "",
    canAuto: false,
    hangAuto: false,
    autoScores: 0,
    autoMisses: 0,
    autoEjects: 0,
    collectNeutral: false,
    collectHp: false,
    fuelCapacity: "0",
    climbTimer: 0.0,
    park: "",
    disconnect: false,
    loseTrack: false,
    notes: "",
    replayed: false,
  });

  const [time, setTime] = useState(0);
  const [cycleTime, setCycleTime] = useState(0);

  const firstCount = "Scores";
  const secondCount = "Misses";
  const thirdCount = "Ejects";

  const [isRunning, setIsRunning] = useState(false);
  const [isCycleRunning, setIsCycleRunning] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const [cycleList, setCycleList] = useState([]);

  const [isButtonActive, setIsButtonActive] = useState("true");

  const toggleStopwatch = (event) => {
    if (event) event.preventDefault();
    setIsRunning(!isRunning);
  };

  const triggerReset = (event) => {
    if (event) event.preventDefault();
    if (confirm("Reset The Climber?")) {
      setTime(0);
      setResetKey((prev) => prev + 1);
      setIsRunning(false);
      setFormData({
        ...formData,
        climbTimer: 0.0,
      });
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const submitAll = (event) => {
    event.preventDefault();

    const dataToSubmit = {
      ...formData,
      cyclesLists: cycleList,
    };

    const jsonString = JSON.stringify(dataToSubmit, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "form-data.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleCycleStopwatch = (event) => {
    if (event) event.preventDefault();
    setIsCycleRunning(!isCycleRunning);
    if (isCycleRunning) {
      setIsButtonActive("true");
    } else {
      setIsButtonActive("false");
    }
  };

  const updateCycleAccuracy = (index, newAccuracy) => {
    setCycleList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, accuracy: parseInt(newAccuracy) } : item,
      ),
    );
  };

  const addCycleEvent = (eventName) => {
    if (isCycleRunning) {
      const currentTime = (cycleTime / 1000).toFixed(2);
      setCycleList((prevList) => [
        ...prevList,
        {
          event: eventName,
          time: currentTime,
          accuracy: eventName === "Score" ? 1 : null,
        },
      ]);
    }
  };

  const removeCycleEvent = (indexRemoval) => {
    setCycleList((prevList) => [
      ...prevList.slice(0, indexRemoval),
      ...prevList.slice(indexRemoval + 1),
    ]);
  };

  return (
    <span id="body">
      <NavComponent></NavComponent>
      <span id="form">
        <form id="formBody" className="formElement">
          <input
            placeholder="Match #"
            type="textMatchForm"
            className="child"
            id="matchNum"
            name="match"
            value={formData.match}
            onChange={handleChange}
          />
          <input
            placeholder="Team #"
            type="textMatchForm"
            className="child"
            id="teamNum"
            name="team"
            value={formData.team}
            onChange={handleChange}
          />
          <Dropdown
            value={formData.driverStation}
            onChange={handleChange}
            name="driverStation"
          ></Dropdown>
          <div className="child" id="headparent">
            <h1 className="header">Auto Mode</h1>
          </div>
          <Autocheck
            name="canAuto"
            value={formData.canAuto}
            onChange={handleChange}
          >
            Can Do It?
          </Autocheck>
          <Autocheck
            name="hangAuto"
            value={formData.hangAuto}
            onChange={handleChange}
          >
            Does Auto Hang?
          </Autocheck>
          <Autocounter
            value={formData.autoScores}
            onChange={handleChange}
            nameText={firstCount}
            name="autoScores"
          ></Autocounter>
          <Autocounter
            value={formData.autoMisses}
            onChange={handleChange}
            nameText={secondCount}
            name="autoMisses"
          ></Autocounter>
          <Autocounter
            value={formData.autoEjects}
            onChange={handleChange}
            nameText={thirdCount}
            name="autoEjects"
          ></Autocounter>
          <div className="child" id="headparent">
            <h1 className="header">Cycles</h1>
          </div>
          <Cycles
            list={cycleList}
            runningBool={isCycleRunning}
            time={cycleTime}
            setTime={setCycleTime}
            onChange={handleChange}
            onTrigger={removeCycleEvent}
            onUpdateAccuracy={updateCycleAccuracy}
          ></Cycles>
          <div className="child" id="headparent">
            <h1 className="header">Collection Ability</h1>
          </div>
          <Neutralcheck
            value={formData.collectNeutral}
            onChange={handleChange}
            name="collectNeutral"
          ></Neutralcheck>
          <HPCheck
            name="collectHp"
            value={formData.collectHp}
            onChange={handleChange}
          ></HPCheck>
          <CollectDrop
            value={formData.fuelCapacity}
            name="fuelCapacity"
            onChange={handleChange}
          ></CollectDrop>
          <div className="child" id="climbheadparent">
            <h1 className="header" id="climbheadtext">
              Climbing
            </h1>
          </div>
          <ClimbTime
            runningBool={isRunning}
            key={resetKey}
            onToggle={toggleStopwatch}
            time={time}
            setTime={setTime}
            value={formData.climbTimer}
            name="climbTimer"
            onChange={handleChange}
          ></ClimbTime>
          <div className="child">
            <ResetButton onReset={triggerReset}></ResetButton>
          </div>
          <div className="child" id="endheadparent">
            <h1 className="header">End Game</h1>
          </div>
          <EndDropDown
            name="park"
            value={formData.park}
            onChange={handleChange}
          ></EndDropDown>
          <div className="child" id="headparent">
            <h1 className="header">Misc.</h1>
          </div>
          <Autocheck
            name="disconnect"
            checked={formData.disconnect}
            onChange={handleChange}
          >
            Was Their Robot Disconnected Or Disabled?
          </Autocheck>
          <Autocheck
            name="loseTrack"
            checked={formData.loseTrack}
            onChange={handleChange}
          >
            Did You Lose Track At Any Point?
          </Autocheck>
          <div className="child" id="headparent">
            <h1 className="header">Notes</h1>
          </div>
          <div className="child" id="notesdiv">
            <input
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              id="notesbox"
            ></input>
          </div>
          <ReplayButton
            idButton={"replayButtonId"}
            idDiv={"replayButtonDiv"}
            name="replayed"
            value={formData.replayed}
            onChange={handleChange}
          >
            Is Replay?
          </ReplayButton>
          <SubmitButton
            idButton={"submitButtonId"}
            idDiv={"submitButtonDiv"}
            idImage={"submitImage"}
            submit={submitAll}
          >
            Save
          </SubmitButton>
          <div id="bottomspace"></div>
        </form>
        <div id="formScore">
          <CycleTimerToggle
            active={isButtonActive}
            isCycleRunning={isCycleRunning}
            onTrigger={toggleCycleStopwatch}
          ></CycleTimerToggle>
          <ScoreButton
            active={isButtonActive}
            onTrigger={() => addCycleEvent("Score")}
          ></ScoreButton>
          <ShuttleButton
            active={isButtonActive}
            onTrigger={() => addCycleEvent("Shuttle")}
          ></ShuttleButton>
          <TriggerButton
            onTrigger={toggleStopwatch}
            active={isRunning}
          ></TriggerButton>
        </div>
      </span>
    </span>
  );
}

export default Matchform;
