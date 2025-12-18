import "./Home.css"
import NewButtonMatch from "./newMatchButton/NewButtonMatch";
import NewButtonPit from "./newPitButton/NewButtonPit";

function Home () {
    return (
        <span id="body">
            <nav id="navbar"></nav>
            <span id="parent" className="text">
                <h1 className="text" padding="0">Create New Match Form</h1>
                <NewButtonMatch></NewButtonMatch>
                <h1 className="text" padding="0">Create Pit Scouting Form</h1>
                <NewButtonPit></NewButtonPit>
                <h1 className="text2" id="assigned">Assigned Matches</h1>

                <h1 className="text2">All Matches</h1>
            </span>
        </span>
    )
}

export default Home;