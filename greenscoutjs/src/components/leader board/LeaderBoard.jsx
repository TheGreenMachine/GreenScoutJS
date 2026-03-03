import { useState } from "react";
import "./leaderBoard.css";
import NavComponent from "../NavComponent";

const MOCK_DATA = [
  {
    Username: "NoahE",
    DisplayName: "Noah Engelkes",
    Score: 1,
    LifeScore: 2,
    HighScore: 3,
  },
  {
    Username: "Jose",
    DisplayName: "Jose",
    Score: 3,
    LifeScore: 1,
    HighScore: 2,
  },
  {
    Username: "Landon",
    DisplayName: "Landon",
    Score: 2,
    LifeScore: 3,
    HighScore: 1,
  },
];

const SORT_KEYS = ["Score", "LifeScore"];
const SORT_LABELS = {
  Score: "Score",
  LifeScore: "Lifetime",
  HighScore: "High Score",
};

export default function Leaderboard({ data = MOCK_DATA }) {
  const [sortKey, setSortKey] = useState("Score");
  const sorted = [...data].sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <div id="leaderBody">
      <NavComponent />

      <h2
        style={{ textAlign: "center", fontWeight: "normal", marginBottom: 16 }}
      >
        Leaderboard
      </h2>

      <div id="sortContainer">
        {SORT_KEYS.map((key) => (
          <button
            className={`lb-sort-btn ${sortKey === key ? "active" : ""}`}
            key={key}
            onClick={() => setSortKey(key)}
          >
            {key === "Score" ? "Season" : SORT_LABELS[key]}
          </button>
        ))}
      </div>

      <div id="boardContainer">
        {sorted.map((user, index) => (
          <div key={user.Username} className="leaderBoardTile">
            <span className="lb-rank">{index + 1}.</span>
            <span className="lb-name">{user.DisplayName}</span>
            <span className="lb-score">{user[sortKey]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
