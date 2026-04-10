import "./TriggerButton.css";

function ResetButton({ onReset }) {
  return (
    <button id="resetbutton" className="animated-accent" onClick={onReset}>
      Reset
    </button>
  );
}

export default ResetButton;
