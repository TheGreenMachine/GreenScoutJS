import "./Autocounter.css";

function Autocounter({ nameText, value, onChange, name }) {
  return (
    <div className="child textAutoCounter">
      <p id="autocounttext" className="textAutoCounter">
        {nameText}
      </p>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="notesbox"
      ></textarea>
    </div>
  );
}

export default Autocounter;
