import "./Login.css"
import Username from "./username/username"
import Password from "./password/password";
import LoginButton from './loginButton/LoginButton'
import { useState } from "react";
import GuestButton from "./loginButton/GuestButton";

function Login () {
    const[user, setUsername] = useState("");
    const[pass, setPassword] = useState("");
    return (
        <span id="body">
            <nav id="navbar"></nav>
            <span id="parent" className="text">
                <h1 className="text">Login</h1>
                <Username className="input" value={user} onChange={setUsername}></Username>
                <Password className="input" value={pass} onChange={setPassword}></Password>
                <LoginButton></LoginButton>
                <GuestButton></GuestButton>
            </span>
        </span>
    )
}

export default Login;