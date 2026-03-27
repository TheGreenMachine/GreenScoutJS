import "./Autocounter.css";

function Autocounter({ nameText, value, onChange, name }) {
  return (
    <div className="child autocounterwrap">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="notesbox autocountertextarea"
        placeholder={nameText}
      ></textarea>
    </div>
  );
}

export default Autocounter;
