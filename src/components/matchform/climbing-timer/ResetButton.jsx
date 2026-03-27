import "./TriggerButton.css";

function ResetButton({ onReset }) {
  return <button id="resetbutton" onClick={onReset}>Reset</button>;
}

export default ResetButton;
