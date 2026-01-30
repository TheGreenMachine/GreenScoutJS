import "./GuestButton.css";

function GuestButton({ onClick }) {
  return <p onClick={onClick}>Login As Guest</p>;
}

export default GuestButton;
