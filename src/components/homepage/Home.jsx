import { useState, useEffect } from "react";
import NavComponent from "../NavComponent";
import "./Home.css";
import NewButtonMatch from "./NewButtonMatch";

function refreshPage() {
  location.reload();
}

function Home() {
  return (
    <span id="homeBody">
      <NavComponent />
      <div id="refreshButtonContainer">
        <button
          id="refreshButton"
          className="animated-accent"
          onClick={refreshPage}
        ></button>
      </div>
      <span id="parent" className="text">
        <h1 className="textHome animated-text">Create New Match Form</h1>
        <NewButtonMatch />
      </span>
    </span>
  );
}

export default Home;
