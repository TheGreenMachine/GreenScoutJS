import "./Dropdown.css";

function Dropdown({ value, onChange, name }) {
  return (
    <div className="child" id="driverStation">
      <p id="dtext" className="text">
        Driver Station
      </p>
      <select
        className="text"
        id="dropdown"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option>Select a Driver Station</option>
        <option>Red 1</option>
        <option>Red 2</option>
        <option>Red 3</option>
        <option>Blue 1</option>
        <option>Blue 2</option>
        <option>Blue 3</option>
      </select>
    </div>
  );
}

export default Dropdown;
