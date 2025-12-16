import "./password.css"

function Password ({ value, onChange}) {
    return (
        <form>
            <input placeholder="Password" type="password" value={value} onChange={(e) => onChange(e.target.value)} id="pass" />
        </form>
    )
}

export default Password;