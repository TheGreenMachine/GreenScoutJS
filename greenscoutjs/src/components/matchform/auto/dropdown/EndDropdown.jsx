import "./Dropdown.css";

function EndDropdown({ name, value, onChange }) {
  return (
    <div className="child" id="dropDown">
      <p id="endtext" className="textDropdown">
        Climb Status
      </p>
      <select
        className="textDropdown dropdown"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option>Select</option>
        <option>Didn't Attempt To Climb</option>
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

export default EndDropdown;
