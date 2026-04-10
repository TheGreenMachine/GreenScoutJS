import "./Autocounter.css";

function Autocounter({ nameText, value, onChange, name }) {
  return (
    <div className="child autocounterwrap animated-border-input">
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="autocountertextarea animated-text animated-border-input"
        placeholder={nameText}
        type="number"
        step="1"
      ></input>
    </div>
  );
}

export default Autocounter;
