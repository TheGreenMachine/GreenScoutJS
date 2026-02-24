import NavComponent from "../NavComponent";
import "./Home.css";
import NewButtonMatch from "./newMatchButton/NewButtonMatch";
// import NewButtonPit from "./newPitButton/NewButtonPit";

function refreshPage() {
  location.reload();
}

function Home() {
  return (
    <span id="body">
      <NavComponent></NavComponent>
      <div id="refreshButtonContainer">
        <button id="refreshButton" onClick={refreshPage}></button>
      </div>
      <span id="parent" className="text">
        <h1 className="textHome">Create New Match Form</h1>
        <NewButtonMatch></NewButtonMatch>
        {/* Pit Scouting Future Implementation */}
        {/* <h1 className="text" padding="0">
          Create Pit Scouting Form
        </h1>
        <NewButtonPit></NewButtonPit> */}
        <h1 className="textHome2" id="assigned">
          Assigned Matches
        </h1>

        <h1 className="textHome2">All Matches</h1>
      </span>
    </span>
  );
}

export default Home;
