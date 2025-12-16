import "./GuestButton.css"

function GuestButton () {
    function handleClick() {
        alert("Logged In As Guest");
    }
    return (
        <p onClick={handleClick}>Login As Guest</p>
    )
}

export default GuestButton;