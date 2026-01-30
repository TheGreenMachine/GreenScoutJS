import "./username.css";

function Username({ onUserChange, value }) {
  const handleChange = (e) => {
    onUserChange(e.target.value);
  };

  return (
    <div>
      <input
        placeholder="Username"
        type="text"
        id="user"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

export default Username;
