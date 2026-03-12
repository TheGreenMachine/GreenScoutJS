import { useState } from "react";
import "./leaderBoard.css";
import NavComponent from "../NavComponent";
import { getAllUsers } from "../../api/mockApi";

const MOCK_DATA = getAllUsers().map((user) => ({
  Username: user.username,
  DisplayName: user.DisplayName,
  Score: user.Score,
  LifeScore: user.LifeScore,
}));

const SORT_KEYS = ["Score", "LifeScore"];
const SORT_LABELS = {
  Score: "Score",
  LifeScore: "Lifetime",
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
