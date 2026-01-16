import "./ReplayButton.css";

function ReplayButton({ children, text, idButton, idDiv, onTrigger }) {
  return (
    <div className="divReplay" id={idDiv}>
      <button onClick={onTrigger} className="replayButton" id={idButton}>
        <p className="replayText" id="replayPOne">{children}</p>
        <p className="replayText">{text}</p>
      </button>
    </div>
  );
}

export default ReplayButton;
