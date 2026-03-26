import "../../settings.css";

function ThemeDrop({ value, onChange, name }) {
  return (
    <div className="themechild">
      <p id="themedtext">Theme Palette</p>
      <select id="themedropdown" name={name} value={value} onChange={onChange}>
        <option>Light</option>
        <option>Dark</option>
      </select>
    </div>
  );
}

export default ThemeDrop;
