import "./SubmitButton.css";
function SubmitButton({
  children,
  idButton,
  idDiv,
  idImage,
  submit,
  disabled,
}) {
  return (
    <div className="divSubmit" id={idDiv}>
      <button
        onClick={submit}
        className="submitButton  animated-accent"
        id={idButton}
        disabled={disabled}
      >
        <p className="submitText">{children}</p>
        <div id={idImage} className="submitImage"></div>
      </button>
    </div>
  );
}

export default SubmitButton;
