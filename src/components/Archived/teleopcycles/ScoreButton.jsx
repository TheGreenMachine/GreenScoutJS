import "./ScoreButton.css";

function ScoreButton({ onTrigger, active }) {
  return (
    <button className={active} id="scoreButton" onClick={onTrigger}>
      <div id="scoreButtonImg"></div>
      Score
    </button>
  );
}

export default ScoreButton;
