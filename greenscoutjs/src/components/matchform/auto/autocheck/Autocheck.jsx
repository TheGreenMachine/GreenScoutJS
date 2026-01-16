import "./Autocheck.css";

function Autocheck({ children, value, onChange, name }) {
  return (
    <div className="child divcheck">
      <p className="textcheck">{children}</p>
      <label className="checkcontainer">
        <input
          className="check"
          type="checkbox"
          checked={value}
          onChange={onChange}
          name={name}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}

export default Autocheck;
