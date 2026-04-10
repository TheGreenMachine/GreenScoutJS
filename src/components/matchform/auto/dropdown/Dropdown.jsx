import "./Dropdown.css";
// import { Textfit } from "react-textfit";

function Dropdown({ value, onChange, name }) {
  return (
    <div id="driverStation">
      <p id="dtext" className="textDropdown animated-text">
        Driver Station
      </p>
      <select
        className="textDropdown dropdown animated-text"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option>Select</option>
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
