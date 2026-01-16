import "./CollectDrop.css";

function CollectDrop({ value, onChange, name }) {
  return (
    <div className="collectchild" id="collectdrop">
      <p id="collectdtext" className="text">
        How Much Fuel Can They Hold? (Estimate)
      </p>
      <select
        className="text"
        id="collectdropdown"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option>Select a Fuel Amount</option>
        <option>None</option>
        <option>1-5</option>
        <option>6-10</option>
        <option>11-15</option>
        <option>16-20</option>
        <option>21+</option>
      </select>
    </div>
  );
}

export default CollectDrop;
