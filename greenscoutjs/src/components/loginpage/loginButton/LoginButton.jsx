import { useNavigate } from "react-router-dom";
import "./LoginButton.css"

function LoginButton () {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/home")
    }

    return (
        <button onClick={handleClick}>Continue</button>
    )
}

export default LoginButton;