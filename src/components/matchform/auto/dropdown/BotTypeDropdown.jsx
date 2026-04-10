import "./Dropdown.css";

function BotTypeDropdown({ value, onChange, name }) {
  return (
    <div id="driverStation">
      <p id="dtext" className="textDropdown animated-text">
        Bot Type
      </p>
      <select
        className="textDropdown dropdown animated-text"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option>Select</option>
        <option>Mainly Shuttles</option>
        <option>Mainly Shoots</option>
        <option>Mixture</option>
      </select>
    </div>
  );
}

export default BotTypeDropdown;
