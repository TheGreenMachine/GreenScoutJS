import "./Dropdown.css";

function Dropdown({ name, value, onChange }) {
  return (
    <div className="child" id="endDropDown">
      <p id="dtext" className="text">
        Park Status
      </p>
      <select
        className="text"
        id="dropdown"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option>Didn't Attempt To Park</option>
        <option>Failed Attempt To Park</option>
        <option>Failed Attempt Climb Low</option>
        <option>Failed Attempt Climb Medium</option>
        <option>Failed Attempt Climb High</option>
        <option>Climbed Low</option>
        <option>Climbed Medium</option>
        <option>Climbed High</option>
      </select>
    </div>
  );
}

export default Dropdown;
