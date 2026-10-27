import "./slider.css";

function Slider({ value, onChange, name, nameText }) {
  const current = Number(value) || 0;
  const label = current === 0 ? "Miss" : `${current}%`;

  return (
    <div className="child divAutoAccLabel">
      <p className="textAutoAccLabel animated-text">{nameText}</p>
      <label className="autoAccContainer" style={{ "--value": current }}>
        <input
          className="autoAccSlider animated-accent"
          type="range"
          value={current}
          min={0}
          max={100}
          step={10}
          name={name}
          onChange={onChange}
        />
        <div className="autoAccuracyLabel animated-text">{label}</div>
      </label>
    </div>
  );
}

export default Slider;
