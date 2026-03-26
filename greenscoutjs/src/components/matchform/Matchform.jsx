import "./Matchform.css";
import { useState, useCallback } from "react";
import { useAuth } from "../../AuthContext";
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
import EndDropdown from "./auto/dropdown/EndDropdown";
import SubmitButton from "./submitbuttons/SubmitButton";
import ReplayButton from "./submitbuttons/ReplayButton";
import Cycles from "./teleopcycles/Cycles";
import CycleTimerToggle from "./teleopcycles/CycleTimerToggle";
import ScoreButton from "./teleopcycles/ScoreButton";
import ShuttleButton from "./teleopcycles/ShuttleButton";
import { submitMatchform } from "../../api";
import { useNavigate } from "react-router-dom";
import Slider from "./auto/slider/Slider";
import CollapsibleDropdown from "./auto/collapsible-div/CollapsibleDropdown";
import BotTypeDropdown from "./auto/dropdown/BotTypeDropdown";
import PlaystyleDropdown from "./auto/dropdown/PlaystyleDropdown";
import HubSwitch from "./teleopcycles/HubSwitch";

function Matchform() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    match: "",
    team: "",
    driverStation: "",
    canAuto: false,
    hangAuto: false,
    autoScores: 0,
    autoMisses: 0,
    autoEjects: 0,
    autoHPAccuracy: 0,
    autoRobotAccuracy: 0,
    autoWon: false,
    autoFieldLeft: false,
    autoFieldRight: false,
    autoFieldMid: false,
    autoFieldTop: false,
    autoFieldBump: false,
    autoFieldTrench: false,
    autoFieldDidntCross: false,
    autoFieldHP: false,
    autoFieldFuel: false,
    collectNeutral: false,
    collectHp: false,
    fuelCapacity: "0",
    climbTimer: 0.0,
    teleFieldBump: false,
    teleFieldTrench: false,
    park: "",
    endgameShoot: false,
    botType: "",
    playstyle: "",
    disconnect: false,
    loseTrack: false,
    everBeached: false,
    autoNotes: "",
    teleNotes: "",
    perfNotes: "",
    eventsNotes: "",
    commentsNotes: "",
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
  const [activeAlliance, setActiveAlliance] = useState("blue");

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

 const handleChange = useCallback(
    (e) => {
      const { name, type, checked, value } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      if (name === "autoWon" || name === "driverStation") {
        const isBlue =
          name === "driverStation"
            ? value.toLowerCase().includes("blue")
            : formData.driverStation.toLowerCase().includes("blue");

        // If autoWon is checked, flip the alliance, if unchecked revert to driver station side
        setActiveAlliance(
          name === "autoWon" && checked
            ? isBlue
              ? "red"
              : "blue"
            : isBlue
              ? "blue"
              : "red",
        );
      }
    },
    [formData.driverStation],
  );
  const submitAll = async (event) => {
    event.preventDefault();

    // fallback is the value to be used if a number cant be found in the form data/string
    const prettyInt = (str, fallback = 1) => {
      const parsed = parseInt(String(str ?? "").replace(/[^\d]/g, ""), 10);
      return Number.isNaN(parsed) ? fallback : parsed;
    };

    // fallback is the value to be used if a number cant be found in the form data/string
    const prettyFloat = (val, fallback = 0) => {
      const parsed = parseFloat(String(val ?? "").replace(/[^\d.]/g, ""));
      return Number.isNaN(parsed) ? fallback : parsed;
    };

    const parseDriverStation = (dsRaw) => {
      const ds = String(dsRaw ?? "");

      return {
        isBlue: ds.toLowerCase().includes("blue"),
        number: prettyInt(ds, 1),
      };
    };

    const expandCycles = () => {
      if (!cycleList || cycleList.length === 0) {
        return [{ time: 0, type: "None", success: false, accuracy: 0, activeHub: "blue"}];
      }

      return cycleList.map((cycle) => {
        const accNum = Number(cycle.accuracy);

        return {
          time: prettyFloat(cycle.time, 0),
          type: String(cycle.event ?? ""),
          activeHub: cycle.activeHub,
          accuracy: Number.isFinite(accNum) ? accNum : 0,
        };
      });
    };

    const dataToSubmit = {
      team: prettyInt(formData.team, 1),

      match: {
        number: prettyInt(formData.match, 1),
        isReplay: !!formData.replayed,
      },

      scouter: "",

      driverStation: parseDriverStation(formData.driverStation),

      cycles: expandCycles(),

      auto: {
        canAuto: !!formData.canAuto,
        hangAuto: !!formData.hangAuto,
        scores: prettyInt(formData.autoScores, 0),
        misses: prettyInt(formData.autoMisses, 0),
        ejects: prettyInt(formData.autoEjects, 0),
        won: !!formData.autoWon,

        accuracy: {
          hpAccuracy: prettyInt(formData.autoHPAccuracy, 0),
          robotAccuracy: prettyInt(formData.autoRobotAccuracy, 0),
        },

        field: {
          left: !!formData.autoFieldLeft,
          right: !!formData.autoFieldRight,
          mid: !!formData.autoFieldMid,
          top: !!formData.autoFieldTop,
          bump: !!formData.autoFieldBump,
          trench: !!formData.autoFieldTrench,
          didntCross: !!formData.autoFieldDidntCross,
          hp: !!formData.autoFieldHP,
          fuel: !!formData.autoFieldFuel,
        },
      },

      teleop: {
        collection: {
          collectNeutral: !!formData.collectNeutral,
          collectHp: !!formData.collectHp,
          fuelCapacity: String(formData.fuelCapacity ?? "0"),
        },

        field: {
          bump: !!formData.teleFieldBump,
          trench: !!formData.teleFieldTrench,
        },

        botType: String(formData.botType ?? ""),
        playstyle: String(formData.playstyle ?? ""),
      },

      endgame: {
        park: String(formData.park ?? ""),
        climbTimer: prettyFloat(formData.climbTimer, 0),
        endgameShoot: !!formData.endgameShoot,
      },

      issues: {
        disconnect: !!formData.disconnect,
        loseTrack: !!formData.loseTrack,
        everBeached: !!formData.everBeached,
      },

      notes: {
        autoNotes: String(formData.autoNotes ?? ""),
        teleNotes: String(formData.teleNotes ?? ""),
        perfNotes: String(formData.perfNotes ?? ""),
        eventsNotes: String(formData.eventsNotes ?? ""),
        commentsNotes: String(formData.commentsNotes ?? ""),
      },

      rescouting: !!formData.rescouting,
      prescouting: !!formData.prescouting,
    };

    const jsonString = JSON.stringify(dataToSubmit, null, 2);


    await submitMatchform(jsonString);
    const cacheKey = `match_${formData.match}_team_${formData.team}_driverstation_${formData.driverStation}_${Date.now()}`;
    try {
      const existingCache = JSON.parse(
        localStorage.getItem("matchFormCache") || "[]",
      );
      existingCache.push({
        key: cacheKey,
        timestamp: Date.now(),
        data: dataToSubmit,
      });
      localStorage.setItem("matchFormCache", JSON.stringify(existingCache));
      navigate("/home");
    } catch (err) {
      console.warn("Failed to cache form data:", err);
    }
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
      if (eventName === "hubSwitch") {
        setActiveAlliance(activeAlliance === "red" ? "blue" : "red");
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
            Robot Moves?
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
          <Slider
            value={formData.autoHPAccuracy}
            onChange={handleChange}
            nameText="Human Player Accuracy:"
            name="autoHPAccuracy"
          ></Slider>
          <Slider
            value={formData.autoRobotAccuracy}
            onChange={handleChange}
            nameText="Robot Accuracy:"
            name="autoRobotAccuracy"
          ></Slider>
          <Autocheck
            name="autoWon"
            value={formData.autoWon}
            onChange={handleChange}
          >
            Won Auto?
          </Autocheck>
          <CollapsibleDropdown title="Auto Field Coverage">
            <p>&emsp;Went To:</p>
            <Autocheck
              name="autoFieldLeft"
              value={formData.autoFieldLeft}
              onChange={handleChange}
            >
              Left Of Field
            </Autocheck>
            <Autocheck
              name="autoFieldMid"
              value={formData.autoFieldMid}
              onChange={handleChange}
            >
              Middle Of Field
            </Autocheck>
            <Autocheck
              name="autoFieldRight"
              value={formData.autoFieldRight}
              onChange={handleChange}
            >
              Right Of Field
            </Autocheck>
            <Autocheck
              name="autoFieldTop"
              value={formData.autoFieldTop}
              onChange={handleChange}
            >
              Top Of Field
            </Autocheck>
            <Autocheck
              name="autoFieldBump"
              value={formData.autoFieldBump}
              onChange={handleChange}
            >
              Over Bump
            </Autocheck>
            <Autocheck
              name="autoFieldTrench"
              value={formData.autoFieldTrench}
              onChange={handleChange}
            >
              Under Trench
            </Autocheck>
            <Autocheck
              name="autoFieldDidntCross"
              value={formData.autoFieldDidntCross}
              onChange={handleChange}
            >
              Didn't Cross
            </Autocheck>
            <Autocheck
              name="autoFieldHP"
              value={formData.autoFieldHP}
              onChange={handleChange}
            >
              HP Station
            </Autocheck>
            <Autocheck
              name="autoFieldFuel"
              value={formData.autoFieldFuel}
              onChange={handleChange}
            >
              Fuel Station
            </Autocheck>
          </CollapsibleDropdown>
          <div className="child" id="headparent">
            <h1 className="header">TeleOp Mode</h1>
          </div>
          <CollapsibleDropdown title="Cycles">
            <Cycles
              list={cycleList}
              runningBool={isCycleRunning}
              time={cycleTime}
              setTime={setCycleTime}
              onChange={handleChange}
              onTrigger={removeCycleEvent}
              onUpdateAccuracy={updateCycleAccuracy}
            ></Cycles>
          </CollapsibleDropdown>
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
              Hang
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
          <div className="child" id="headparent"></div>
          <CollapsibleDropdown title="TeleOp Field Coverage">
            <p>&emsp;Went:</p>
            <Autocheck
              name="teleFieldBump"
              value={formData.teleFieldBump}
              onChange={handleChange}
            >
              Over Bump
            </Autocheck>
            <Autocheck
              name="teleFieldTrench"
              value={formData.teleFieldTrench}
              onChange={handleChange}
            >
              Under Trench
            </Autocheck>
          </CollapsibleDropdown>
          <div className="child" id="endheadparent">
            <h1 className="header">End Game</h1>
          </div>
          <EndDropdown
            name="park"
            value={formData.park}
            onChange={handleChange}
          ></EndDropdown>
          <Autocheck
            name="endgameShoot"
            checked={formData.endgameShoot}
            onChange={handleChange}
          >
            Shot During Endgame?
          </Autocheck>
          <div className="child" id="headparent">
            <h1 className="header">Misc.</h1>
          </div>
          <BotTypeDropdown
            value={formData.botType}
            onChange={handleChange}
            name="botType"
          ></BotTypeDropdown>
          <PlaystyleDropdown
            value={formData.playstyle}
            onChange={handleChange}
            name="playstyle"
          ></PlaystyleDropdown>
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
          <Autocheck
            name="everBeached"
            checked={formData.everBeached}
            onChange={handleChange}
          >
            Were They Ever Beached?
          </Autocheck>
          <div className="child" id="headparent"></div>
          <CollapsibleDropdown title="Notes">
            <p>&emsp;Auto Notes: </p>
            <div className="child notesdiv">
              <textarea
                name="autoNotes"
                value={formData.autoNotes}
                onChange={handleChange}
                id="notesbox"
              ></textarea>
            </div>
            <p>&emsp;TeleOp Notes: </p>
            <div className="child notesdiv">
              <textarea
                placeholder="What is the general TeleOp Strategy? Ex: Shuttling (include loc.), Blocking, etc."
                name="teleNotes"
                value={formData.teleNotes}
                onChange={handleChange}
                id="notesbox"
              ></textarea>
            </div>
            <p>&emsp;Performance Notes: </p>
            <div className="child notesdiv">
              <textarea
                placeholder="Did the robot drive well? Did it impede their alliance members?
desc things like speed, susceptibility to defense, etc (or put here if they played defense during this period)
"
                name="perfNotes"
                value={formData.perfNotes}
                onChange={handleChange}
                id="notesbox"
              ></textarea>
            </div>
            <p>&emsp;Special Events Notes: </p>
            <div className="child notesdiv">
              <textarea
                name="eventsNotes"
                placeholder="Any unexpected or notable events?
Ex. Did you notice something about their shooter, a tendency to bump easily, an intake not working, if beached were they unbeached?…
"
                value={formData.eventsNotes}
                onChange={handleChange}
                id="notesbox"
              ></textarea>
            </div>
            <p>&emsp;Any Other Comments: </p>
            <div className="child notesdiv">
              <textarea
                name="commentsNotes"
                value={formData.commentsNotes}
                onChange={handleChange}
                id="notesbox"
              ></textarea>
            </div>
          </CollapsibleDropdown>
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
          <HubSwitch
            activeAlliance={activeAlliance}
            onTrigger={() => addCycleEvent("hubSwitch")}
          ></HubSwitch>
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
