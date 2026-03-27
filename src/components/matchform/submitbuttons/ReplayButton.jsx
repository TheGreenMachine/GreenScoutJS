import "./ReplayButton.css";

function ReplayButton({ children, idButton, idDiv, name, value, onChange }) {
  const handleClick = (event) => {
    event.preventDefault();
    onChange({
      target: {
        name: name,
        value: !value,
      },
    });
  };

  return (
    <div className="divReplay" id={idDiv}>
      <button onClick={handleClick} className="replayButton" id={idButton}>
        <p className="replayText" id="replayPOne">
          {children}
        </p>
        <p className="replayText">{value ? "✔" : "✘"}</p>
      </button>
    </div>
  );
}

export default ReplayButton;
