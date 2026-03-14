import "./Dropdown.css";

function BotTypeDropdown({ value, onChange, name }) {
  return (
    <div id="driverStation">
      <p id="dtext" className="textDropdown">
        Bot Type
      </p>
      <select
        className="textDropdown"
        id="dropdown"
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
