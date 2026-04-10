import "./Matchform.css";
import { useState, useEffect, Children } from "react";
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
import { getIsOffline, submitMatchform } from "../../api";
import { useNavigate } from "react-router-dom";
import Slider from "./auto/slider/Slider";
import CollapsibleDropdown from "./auto/collapsible-div/CollapsibleDropdown";
import BotTypeDropdown from "./auto/dropdown/BotTypeDropdown";
import PlaystyleDropdown from "./auto/dropdown/PlaystyleDropdown";

const defaultFormData = {
  match: "",
  team: "",
  driverStation: "",
  canAuto: false,
  hangAuto: false,
  autoScores: undefined,
  autoMisses: undefined,
  autoEjects: undefined,
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
};

function AnimatedSpan({ children }) {
  console.log(document.documentElement.dataset.animated + "1 = animated");
  if (document.documentElement.dataset.animated == "1") {
    return <span className="animated-border-input">{children}</span>;
  }
  return children;
}

function Matchform() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [time, setTime] = useState(0);
  const [cycleTime, setCycleTime] = useState(0);

  const firstCount = "Scores";
  const secondCount = "Misses";
  const thirdCount = "Ejects";

  const [hubSwitchCount, setHubSwitchCount] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isCycleRunning, setIsCycleRunning] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const [cycleList, setCycleList] = useState([]);

  const [isButtonActive, setIsButtonActive] = useState("true");

  const [teamAlliance, setTeamAlliance] = useState("");
  const [activeAlliance, setActiveAlliance] = useState("gray");

  const [hasCache, setHasCache] = useState(false);

  useEffect(() => {
    const cachedData = localStorage.getItem("tempMatchFormCache");
    if (cachedData) {
      setHasCache(true);
    }
  }, []);

  const handleNavigateOut = () => {
    compileAndCache("tempMatchFormCache", true);
  };

  const restoreFromCache = (e) => {
    e.preventDefault();
    try {
      const raw = localStorage.getItem("tempMatchFormCache");
      console.log("raw cache:", raw);

      const cached = JSON.parse(raw);
      console.log("parsed cache:", cached);
      console.log("cached.data:", cached?.data);

      if (cached?.data) {
        const restored = { ...defaultFormData, ...cached.data };
        console.log("restoring to:", restored);
        setFormData(restored);
        setHasCache(false);
      } else {
        console.log("no data found in cache");
      }
    } catch (err) {
      console.warn("Failed to restore cache:", err);
    }
  };

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

  const compileAndCache = (cacheLocation, replace) => {
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

    const dataToSubmit = {
      team: prettyInt(formData.team, 1),
      match: {
        number: prettyInt(formData.match, 1),
        isReplay: !!formData.replayed,
      },
      driverStation: parseDriverStation(formData.driverStation),
      isBlue: parseDriverStation(formData.driverStation).isBlue,
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

      rescouting: !!formData.replayed,
    };

    const jsonString = JSON.stringify(dataToSubmit, null, 2);

    const cacheKey = `match_${formData.match}_team_${formData.team}_driverstation_${formData.driverStation}_${Date.now()}`;
    if (replace) {
      const newCacheEntry = {
        key: cacheKey,
        timestamp: Date.now(),
        data: formData,
      };

      localStorage.removeItem(cacheLocation);
      localStorage.setItem(cacheLocation, JSON.stringify(newCacheEntry));
    } else {
      try {
        const existingCache = JSON.parse(
          localStorage.getItem(cacheLocation) || "[]",
        );
        existingCache.push({
          key: cacheKey,
          timestamp: Date.now(),
          data: dataToSubmit,
        });
        localStorage.setItem(cacheLocation, JSON.stringify(existingCache));
      } catch (err) {
        console.warn("Failed to cache form data:", err);
      }
    }

    return jsonString;
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "driverStation") {
      const newAlliance = value.includes("Blue") ? "blue" : "red";
      setTeamAlliance(newAlliance);
      updateHub(newAlliance, formData.autoWon, hubSwitchCount);
    } else if (name === "autoWon") {
      updateHub(teamAlliance, checked, hubSwitchCount);
    } else {
      updateHub(teamAlliance, formData.autoWon, hubSwitchCount);
    }
  };

  useEffect(() => {
    compileAndCache("tempMatchFormCache", true);
  }, [formData]);

  const submitAll = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isSubmitting) return;

    if (formData.match === "") {
      alert("Fill in the Match Number");
    } else if (!Number.isInteger(parseInt(formData.match))) {
      alert("Fill in the Match Number with an Integer");
    } else if (formData.team === "") {
      alert("Fill in the Team Number");
    } else if (!Number.isInteger(parseInt(formData.team))) {
      alert("Fill in the Team Number with an Integer");
    } else if (formData.driverStation === "") {
      alert("Select a Driver Station");
    } else {
      setIsSubmitting(true);
      localStorage.removeItem("tempMatchFormCache");

      let jsonString = compileAndCache("matchFormCache", false);

      navigate("/home");

      submitMatchform(jsonString).catch((err) => {
        console.error("Submission failed:", err);
      });
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

  return (
    <span id="body">
      <NavComponent onNavigateOut={handleNavigateOut}></NavComponent>
      <span id="form">
        <form id="formBody" className="formElement">
          {/* {hasCache && (
            <button className="child animated-accent" id="restore" onClick={restoreFromCache}>
              Restore Unsaved Match
            </button>
          )} */}
          <div className="sectionBox animated-border">
            <div className="child headparent">
              <h1 className="header animated-text">Match Info</h1>
            </div>
            <AnimatedSpan>
              <input
                placeholder="Match #"
                type="number"
                step="1"
                className="child backgroundcolorfilled animated-text"
                id="matchNum"
                name="match"
                value={formData.match}
                onChange={handleChange}
              />
            </AnimatedSpan>
            <AnimatedSpan>
              <input
                placeholder="Team #"
                type="number"
                step="1"
                className="child backgroundcolorfilled animated-text"
                id="teamNum"
                name="team"
                value={formData.team}
                onChange={handleChange}
              />
            </AnimatedSpan>
            <Dropdown
              value={formData.driverStation}
              onChange={handleChange}
              name="driverStation"
            ></Dropdown>
          </div>
          <div className="sectionBox animated-border">
            <div className="child headparent">
              <h1 className="header animated-text">Auto Mode</h1>
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
              <p className="animated-text">&emsp;Went To:</p>
              <Autocheck
                name="autoFieldLeft"
                value={formData.autoFieldLeft}
                onChange={handleChange}
              >
                Left Of Field
              </Autocheck>
              <Autocheck
                name="autoFieldRight"
                value={formData.autoFieldRight}
                onChange={handleChange}
              >
                Right Of Field
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
          </div>
          <div className="sectionBox animated-border">
            <div className="child" id="headparent">
              <h1 className="header animated-text">TeleOp Mode</h1>
            </div>
            <div className="child" id="headparent">
              <h1 className="header animated-text">Collection Ability</h1>
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
              <h1 className="header animated-text" id="climbheadtext">
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
              <p className="animated-text">&emsp;Went:</p>
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
          </div>
          <div className="sectionBox animated-border">
            <div className="child" id="endheadparent">
              <h1 className="header animated-text">End Game</h1>
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
          </div>
          <div className="sectionBox animated-border">
            <div className="child" id="headparent">
              <h1 className="header animated-text">Misc.</h1>
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
            <CollapsibleDropdown title="Notes" startOpen={true}>
              <p className="animated-text">&emsp;Auto Notes: </p>
              <div className="child notesdiv animated-border-input">
                <textarea
                  name="autoNotes"
                  value={formData.autoNotes}
                  onChange={handleChange}
                  className="notesbox animated-text"
                ></textarea>
              </div>
              <p className="animated-text">&emsp;TeleOp Notes: </p>
              <div className="child notesdiv animated-border-input">
                <textarea
                  placeholder="What is the general TeleOp Strategy? Ex: Shuttling (include loc.), Blocking, etc."
                  name="teleNotes"
                  value={formData.teleNotes}
                  onChange={handleChange}
                  className="notesbox animated-text"
                ></textarea>
              </div>
              <p className="animated-text">&emsp;Performance Notes: </p>
              <div className="child notesdiv animated-border-input">
                <textarea
                  placeholder="Did the robot drive well? Did it impede their alliance members?
desc things like speed, susceptibility to defense, etc (or put here if they played defense during this period)
"
                  name="perfNotes"
                  value={formData.perfNotes}
                  onChange={handleChange}
                  className="notesbox animated-text"
                ></textarea>
              </div>
              <p className="animated-text">&emsp;Special Events Notes: </p>
              <div className="child notesdiv animated-border-input">
                <textarea
                  name="eventsNotes"
                  placeholder="Any unexpected or notable events?
Ex. Did you notice something about their shooter, a tendency to bump easily, an intake not working, if beached were they unbeached?…
"
                  value={formData.eventsNotes}
                  onChange={handleChange}
                  className="notesbox animated-text"
                ></textarea>
              </div>
              <p className="animated-text">&emsp;Any Other Comments: </p>
              <div className="child notesdiv animated-border-input">
                <textarea
                  name="commentsNotes"
                  value={formData.commentsNotes}
                  onChange={handleChange}
                  className="notesbox animated-text"
                ></textarea>
              </div>
            </CollapsibleDropdown>
          </div>
          <ReplayButton
            idButton={"replayButtonId"}
            idDiv={"replayButtonDiv"}
            name="replayed"
            value={formData.replayed}
            onChange={handleChange}
          >
            Is Rescout?
          </ReplayButton>
          <SubmitButton
            idButton={"submitButtonId"}
            idDiv={"submitButtonDiv"}
            idImage={"submitImage"}
            submit={submitAll}
            disabled={isSubmitting}
          >
            Save
          </SubmitButton>
          <div id="bottomspace"></div>
        </form>
        <div id="formScore">
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
