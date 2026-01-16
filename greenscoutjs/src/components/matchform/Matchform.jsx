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
  // const [formData, setFormData] = useState({
  //   match: '',
  //   team: '',
  //   driverStation: '',
  //   canAuto: '',
  //   hangAuto: '',
  //   autoScores: '',
  //   autoMisses: '',
  //   autoEjects: '',
  // });

  const [matchNum, setMatchNum] = useState(0);
  const [teamNum, setTeamNum] = useState(0);

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

  const submitAll = (event) => {
    if (event) event.preventDefault();
    // setFormData({
    //   match: matchNum,
    //   team: teamNum
    // })
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
            onChange={setMatchNum}
          />
          <input
            placeholder="Team #"
            type="text"
            className="child"
            id="teamNum"
            onChange={setTeamNum}
          />
          <Dropdown></Dropdown>
          <div className="child" id="headparent">
            <h1 className="header">Auto Mode</h1>
          </div>
          <Autocheck>Can Do It?</Autocheck>
          <Autocheck>Does Auto Hang?</Autocheck>
          <Autocounter name={firstCount}></Autocounter>
          <Autocounter name={secondCount}></Autocounter>
          <Autocounter name={thirdCount}></Autocounter>
          <div className="child" id="headparent">
            <h1 className="header">Cycles</h1>
          </div>
          <div className="child" id="headparent">
            <h1 className="header">Collection Ability</h1>
          </div>
          <Neutralcheck></Neutralcheck>
          <HPCheck></HPCheck>
          <CollectDrop></CollectDrop>
          <div className="child" id="climbheadparent">
            <h1 className="header" id="climbheadtext">
              Climbing
            </h1>
          </div>
          <ClimbTime
            runningBool={isRunning}
            key={resetKey}
            onToggle={toggleStopwatch}
          ></ClimbTime>
          <div className="child">
            <ResetButton onReset={triggerReset}></ResetButton>
          </div>
          <div className="child" id="endheadparent">
            <h1 className="header">End Game</h1>
          </div>
          <EndDropDown></EndDropDown>
          <div className="child" id="headparent">
            <h1 className="header">Misc.</h1>
          </div>
          <Autocheck>Was Their Robot Disconnected Or Disabled?</Autocheck>
          <Autocheck>Did You Lose Track At Any Point?</Autocheck>
          <div className="child" id="headparent">
            <h1 className="header">Notes</h1>
          </div>
          <div className="child" id="notesdiv">
            <input id="notesbox"></input>
          </div>
          <ReplayButton
            idButton={"replayButtonId"}
            idDiv={"replayButtonDiv"}
            checked={check}
            onTrigger={toggleCheck}
            text={replay}
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
