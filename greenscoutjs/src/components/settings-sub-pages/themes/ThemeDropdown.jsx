import "./themeDrop.css";

function ThemeDrop({ value, onChange, name }) {
  return (
    <div className="themechild" id="themedrop">
      <p id="Themedtext" className="textThemeDrop">
        Theme Pallete
      </p>
      <select
        className="textThemeDrop"
        id="themedropdown"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option>Light</option>
        <option>Dark</option>
      </select>
    </div>
  );
}

export default ThemeDrop;
