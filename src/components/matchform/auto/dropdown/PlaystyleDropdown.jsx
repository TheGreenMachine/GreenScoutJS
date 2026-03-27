import "./Dropdown.css";

function PlaystyleDropdown({ value, onChange, name }) {
  return (
    <div id="driverStation">
      <p id="dtext" className="textDropdown">
        General Playstyle
      </p>
      <select
        className="textDropdown dropdown"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option>Select</option>
        <option>Mostly Aggressive</option>
        <option>Mostly Defensive</option>
        <option>N/A</option>
      </select>
    </div>
  );
}

export default PlaystyleDropdown;
