import "./Autocheck.css"

function Autocheck ({ children }) {
    return (
        <div className="child divcheck">
            <p className="textcheck">{children}</p>
            <label className="checkcontainer">
                <input className="check" type="checkbox"/>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}

export default Autocheck;