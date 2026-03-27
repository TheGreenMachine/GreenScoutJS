import "./hubSwitch.css";

function HubSwitch({ onTrigger, activeAlliance }) {
  return (
    <button className={activeAlliance} id="hubSwitchButton" onClick={onTrigger}>
      <div id="hubSwitchButtonImg"></div>
      Hub
    </button>
  );
}

export default HubSwitch;
