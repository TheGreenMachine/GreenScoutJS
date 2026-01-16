import "./CollectCheck.css";

function HPCheck({ name, value, onChange }) {
  return (
    <div className="child" id="doeshp">
      <p id="autotext" className="text">
        Collect From Human Player?
      </p>
      <label className="checkcontainer">
        <input
          id="check"
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}

export default HPCheck;
