import "./Autocounter.css";

function Autocounter({ nameText, value, onChange, name }) {
  const subtract = (event) => {
    event.preventDefault();
    if (value > 0) {
      onChange({
        target: {
          name: name,
          value: value - 1,
        },
      });
    }
  };

  const add = (event) => {
    event.preventDefault();
    onChange({
      target: {
        name: name,
        value: value + 1,
      },
    });
  };

  return (
    <div className="child text">
      <p id="autocounttext" className="text">
        {nameText}
      </p>
      <button onClick={subtract} className="text" id="remove">
        -
      </button>
      <button onClick={add} className="text" id="addto">
        {value}
      </button>
    </div>
  );
}

export default Autocounter;
