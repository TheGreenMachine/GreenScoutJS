import "./username.css"

function Username ({ value, onChange}) {
    return (
        <form>
            <input placeholder="Username" type="text" id="user" value={value} onChange={(e) => onChange(e.target.value)}/>
        </form>
    )
}

export default Username;