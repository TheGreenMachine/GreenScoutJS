import "../auto/autocheck/Autocheck.css";

function HPCheck({ name, value, onChange }) {
  return (
    <div id="doeshp">
      <p id="autotext" className="textcheck">
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
