import "./TriggerButton.css";

function TriggerButton({ onTrigger, active }) {
  return (
    <button
      id="sideButtonTrigger"
      className={active ? "active" : "inactive"}
      onClick={onTrigger}
    >
      <div className={active ? "act" : "inact"} id="stopbuttonimg"></div>
      Climb
    </button>
  );
}

export default TriggerButton;
