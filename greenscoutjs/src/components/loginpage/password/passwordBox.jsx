import "./password.css";

function Password({ onPasswordChange, value }) {
  const handleChange = (e) => {
    onPasswordChange(e.target.value);
  };

  return (
    <div>
      <input
        placeholder="Password"
        type="password"
        onChange={handleChange}
        id="pass"
        value={value}
      />
    </div>
  );
}

export default Password;
