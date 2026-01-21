import "./TriggerButton.css";

function TriggerButton({ onTrigger }) {
  return (
    <button id="sideButtonTrigger" onClick={onTrigger}>
      <div id="stopbuttonimg"></div>
      Climb
    </button>
  );
}

export default TriggerButton;
