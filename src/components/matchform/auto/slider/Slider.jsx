import "./slider.css";

function Slider({ value, onChange, name, nameText }) {
  const getAccuracyLabel = (value) => {
    const numValue = Number(value);
    if (numValue === 0) return "Miss";
    if (numValue <= 10) return "10%";
    if (numValue <= 20) return "20%";
    if (numValue <= 30) return "30%";
    if (numValue <= 40) return "40%";
    if (numValue <= 50) return "50%";
    if (numValue <= 60) return "60%";
    if (numValue <= 70) return "70%";
    if (numValue <= 80) return "80%";
    if (numValue <= 90) return "90%";
    return "100%";
  };

  return (
    <div className="child divAutoAccLabel">
      <p className="textAutoAccLabel animated-text">{nameText}</p>
      <label className="autoAccContainer">
        <input
          className="autoAccSlider animated-accent"
          type="range"
          value={value || 0}
          min={0}
          max={100}
          step={10}
          name={name}
          onChange={onChange} // ← pass full event through
        />
        <div className="autoAccuracyLabel animated-text">
          {getAccuracyLabel(value || 0)}
        </div>
      </label>
    </div>
  );
}

export default Slider;
