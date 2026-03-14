import { useEffect, useMemo, useState } from "react";
import "./leaderBoard.css";
import NavComponent from "../NavComponent";
import { getLeaderboard } from "../../api";

const SORT_KEYS = ["Score", "LifeScore", "HighScore"];
const SORT_LABELS = {
  Score: "Season",
  LifeScore: "Lifetime",
  HighScore: "High",
};

function normalizeLeaderboardData(rawData) {
  if (!Array.isArray(rawData)) {
    return [];
  }

  return rawData.map((user) => ({
    Username: user.username ?? user.Username,
    DisplayName: user.DisplayName,
    Score: user.Score,
    LifeScore: user.LifeScore,
    HighScore: user.HighScore,
  }));
}

export default function Leaderboard({ data }) {
  const [sortKey, setSortKey] = useState("Score");
  const [leaderboardData, setLeaderboardData] = useState(
    normalizeLeaderboardData(data),
  );
  const [isLoading, setIsLoading] = useState(!Array.isArray(data));
  const [error, setError] = useState("");

  const sortedLeaderboardData = useMemo(
    () =>
      [...leaderboardData].sort(
        (a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0),
      ),
    [leaderboardData, sortKey],
  );

  useEffect(() => {
    let isMounted = true;

    if (Array.isArray(data)) {
      setLeaderboardData(normalizeLeaderboardData(data));
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getLeaderboard(sortKey);
        const leaderboardResponse = Array.isArray(response)
          ? response
          : response?.data;

        if (!isMounted) {
          return;
        }

        setLeaderboardData(normalizeLeaderboardData(leaderboardResponse));
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }

        setLeaderboardData([]);
        setError(fetchError?.message ?? "Failed to load leaderboard.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [sortKey, data]);

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
            {SORT_LABELS[key]}
          </button>
        ))}
      </div>

      <div id="boardContainer">
        {isLoading ? (
          <div className="leaderBoardTile">Loading leaderboards...</div>
        ) : error ? (
          <div className="leaderBoardTile">{error}</div>
        ) : (
          sortedLeaderboardData.map((user, index) => (
            <div
              key={user.Username ?? `${user.DisplayName}-${index}`}
              className="leaderBoardTile"
            >
              <span className="lb-rank">{index + 1}.</span>
              <span className="lb-name">{user.DisplayName}</span>
              <span className="lb-score">{user[sortKey] ?? "-"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
