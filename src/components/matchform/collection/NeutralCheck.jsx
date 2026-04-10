import "../auto/autocheck/Autocheck.css";

function Neutralcheck({ name, value, onChange }) {
  return (
    <div className="child divcheck">
      <p id="autotext" className="textcheck animated-text">
        Collect From Neutral Zone?
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

export default Neutralcheck;
