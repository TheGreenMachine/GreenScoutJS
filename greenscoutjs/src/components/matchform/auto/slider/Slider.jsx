import "./slider.css";

function Slider({ value, onChange, name, nameText }) {
  const getAccuracyLabel = (value) => {
    const numValue = Number(value);
    if (numValue === 0) return "Miss";
    if (numValue <= 25) return "25%";
    if (numValue <= 50) return "50%";
    if (numValue <= 75) return "75%";
    return "100%";
  };

  return (
    <div className="child divAutoAccLabel">
      <p className="textAutoAccLabel">{nameText}</p>
      <label className="autoAccContainer">
        <input
          className="autoAccSlider"
          type="range"
          value={value || 0}
          min={0}
          max={100}
          step={25}
          name={name}
          onChange={onChange} // ← pass full event through
        />
        <div className="autoAccuracyLabel">{getAccuracyLabel(value || 0)}</div>
      </label>
    </div>
  );
}

export default Slider;
