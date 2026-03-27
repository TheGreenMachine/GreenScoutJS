import "./Autocounter.css";

function Autocounter({ nameText, value, onChange, name }) {
  return (
    <div className="child autocounterwrap">
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="notesbox autocountertextarea"
        placeholder={nameText}
        type="number"
        step="1"
      ></input>
    </div>
  );
}

export default Autocounter;
