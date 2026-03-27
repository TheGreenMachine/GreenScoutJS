import "./ShuttleButton.css";

function ShuttleButton({ onTrigger, active }) {
  return (
    <button className={active} id="shuttleButton" onClick={onTrigger}>
      <div id="shuttleButtonImg"></div>
      Shuttle
    </button>
  );
}

export default ShuttleButton;
