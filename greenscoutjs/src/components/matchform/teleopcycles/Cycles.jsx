import "../Matchform.css";

const Cycles = ({ list }) => {
  return (
    <div id="cycleContainer">
      {list.map((event, index) => (
        <div key={index} className="cycleElement">
          {event}
        </div>
      ))}
    </div>
  );
};

export default Cycles;
