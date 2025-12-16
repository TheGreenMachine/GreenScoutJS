import "./LoginButton.css"

function LoginButton () {
    function handleClick() {
        alert ('hi')
    }

    return (
        <button onClick={handleClick}>Continue</button>
    )
}

export default LoginButton;