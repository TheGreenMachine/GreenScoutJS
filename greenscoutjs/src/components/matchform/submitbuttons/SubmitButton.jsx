import "./SubmitButton.css";
function SubmitButton({ children, idButton, idDiv, idImage, submit }) {
  return (
    <div className="divSubmit" id={idDiv}>
      <button onClick={submit} className="submitButton" id={idButton}>
        <p className="submitText">{children}</p>
        <div id={idImage} className="submitImage"></div>
      </button>
    </div>
  );
}

export default SubmitButton;
