import "./Matchform.css";
import { useState } from "react";
import NavComponent from "../NavComponent";
import Dropdown from "./auto/dropdown/Dropdown";
import Autocheck from "./auto/autocheck/Autocheck";
import Autocounter from "./auto/autocounter/Autocounter";
import Neutralcheck from "./collection/NeutralCheck";
import HPCheck from "./collection/HPCheck";
import CollectDrop from "./collection/CollectDrop";
import ClimbTime from "./climbing/ClimbTime";
import TriggerButton from "./climbing/TriggerButton";
import ResetButton from "./climbing/ResetButton";
import EndDropDown from "./auto/dropdown/EndDropDown";
import SubmitButton from "./submitbuttons/SubmitButton";
import ReplayButton from "./submitbuttons/ReplayButton";

function Matchform() {
  const [formData, setFormData] = useState({
    match: 0,
    team: 0,
    driverStation: "",
    canAuto: false,
    hangAuto: false,
    autoScores: 0,
    autoMisses: 0,
    autoEjects: 0,
    collectNeutral: false,
    collectHp: false,
    fuelCapacity: 0,
    climbTimer: 0.0,
    park: "",
    disconnect: false,
    loseTrack: false,
    notes: "",
    replayed: false,
  });

  // const [matchNum, setMatchNum] = useState(0);
  // const [teamNum, setTeamNum] = useState(0);
  // const [driveStation, setDriveStation] = useState("");
  // const [auto, setAuto] = useState(false);
  // const [autoHang, setAutoHang] = useState(false);
  // const [scoreAuto, setScoreAuto] = useState(0);
  // const [missAuto, setMissAuto] = useState(0);
  // const [ejectAuto, setEjectAuto] = useState(0);
  // const [neutralCollect, setNeutralCollect] = useState(false);
  // const [hpCollect, setHpCollect] = useState(false);
  // const [fuelStorage, setFuelStorage] = useState(0);
  // const [parkValue, setParkValue] = useState("");
  // const [didDisconnect, setDidDisconnect] = useState(false);
  // const [lostTrack, setLostTrack] = useState(false);
  // const [notesContents, setNotesContents] = useState("");
  // const [isReplay, setIsReplay] = useState(false);

  const [time, setTime] = useState(0);

  const [check, setCheck] = useState(false);
  const [replay, setReplay] = useState("✘");

  const firstCount = "Scores";
  const secondCount = "Misses";
  const thirdCount = "Ejects";

  const [isRunning, setIsRunning] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const toggleStopwatch = (event) => {
    if (event) event.preventDefault();
    setIsRunning(!isRunning);
  };

  const triggerReset = (event) => {
    if (event) event.preventDefault();
    if (confirm("Reset The Climber?")) {
      setResetKey((prev) => prev + 1);
      setIsRunning(false);
    }
  };

  const toggleCheck = (event) => {
    if (event) event.preventDefault();
    if (!check) {
      setCheck(true);
      setReplay("✔");
    } else {
      setCheck(false);
      setReplay("✘");
    }
    console.log("Checked? " + { check });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitAll = (event) => {
    event.preventDefault();

    const jsonString = JSON.stringify(formData, null, 2);

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

  return (
    <span id="body">
      <NavComponent></NavComponent>
      <span id="form">
        <form id="formBody" className="formElement">
          <input
            placeholder="Match #"
            type="text"
            className="child"
            id="matchNum"
            value={formData.match}
            onChange={handleChange}
          />
          <input
            placeholder="Team #"
            type="text"
            className="child"
            id="teamNum"
            value={formData.team}
            onChange={handleChange}
          />
          <Dropdown
            value={formData.driverStation}
            onChange={handleChange}
          ></Dropdown>
          <div className="child" id="headparent">
            <h1 className="header">Auto Mode</h1>
          </div>
          <Autocheck value={formData.canAuto} onChange={handleChange}>
            Can Do It?
          </Autocheck>
          <Autocheck value={formData.hangAuto} onChange={handleChange}>
            Does Auto Hang?
          </Autocheck>
          <Autocounter
            value={formData.autoScores}
            onChange={handleChange}
            name={firstCount}
          ></Autocounter>
          <Autocounter
            value={formData.autoMisses}
            onChange={handleChange}
            name={secondCount}
          ></Autocounter>
          <Autocounter
            value={formData.autoEjects}
            onChange={handleChange}
            name={thirdCount}
          ></Autocounter>
          <div className="child" id="headparent">
            <h1 className="header">Cycles</h1>
          </div>
          <div className="child" id="headparent">
            <h1 className="header">Collection Ability</h1>
          </div>
          <Neutralcheck
            value={formData.collectNeutral}
            onChange={handleChange}
          ></Neutralcheck>
          <HPCheck value={formData.collectHp} onChange={handleChange}></HPCheck>
          <CollectDrop
            value={formData.fuelCapacity}
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
            onChange={handleChange}
          ></ClimbTime>
          <div className="child">
            <ResetButton onReset={triggerReset}></ResetButton>
          </div>
          <div className="child" id="endheadparent">
            <h1 className="header">End Game</h1>
          </div>
          <EndDropDown
            value={formData.park}
            onChange={handleChange}
          ></EndDropDown>
          <div className="child" id="headparent">
            <h1 className="header">Misc.</h1>
          </div>
          <Autocheck value={formData.disconnect} onChange={handleChange}>
            Was Their Robot Disconnected Or Disabled?
          </Autocheck>
          <Autocheck value={formData.loseTrack} onChange={handleChange}>
            Did You Lose Track At Any Point?
          </Autocheck>
          <div className="child" id="headparent">
            <h1 className="header">Notes</h1>
          </div>
          <div className="child" id="notesdiv">
            <input
              value={formData.notes}
              onChange={handleChange}
              id="notesbox"
            ></input>
          </div>
          <ReplayButton
            idButton={"replayButtonId"}
            idDiv={"replayButtonDiv"}
            checked={check}
            onTrigger={toggleCheck}
            text={replay}
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
        </form>

        <div id="formScore" className="formElement">
          <TriggerButton onTrigger={toggleStopwatch}></TriggerButton>
        </div>
      </span>
    </span>
  );
}

export default Matchform;
