import { useEffect, useMemo, useState } from "react";
import "./leaderBoard.css";
import "../homepage/Home.css";
import NavComponent from "../NavComponent";
import { getLeaderboard } from "../../api";

const SORT_KEYS = ["HighScore", "Score", "LifeScore"];
const SORT_LABELS = {
  Score: "Season",
  LifeScore: "Lifetime",
  HighScore: "Event",
};

function BoardContent({ isLoading, error, sortedLeaderboardData, sortKey }) {
  if (isLoading) {
    return (
      <div className="leaderBoardTile animated-text animated-border">
        Loading leaderboards...
      </div>
    );
  }

  if (error) {
    return <div className="leaderBoardTile animated-text">{error}</div>;
  }

  return sortedLeaderboardData.map((user, index) => (
    <div
      key={user.Username ?? `${user.DisplayName}-${index}`}
      className="leaderBoardTile animated-border"
    >
      <span className="lb-rank animated-text">{index + 1}.</span>
      <span className="lb-name animated-text">{user.DisplayName}</span>
      <span className="lb-score animated-text">{user[sortKey] ?? "-"}</span>
    </div>
  ));
}

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
  const [sortKey, setSortKey] = useState("HighScore");
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

  function refreshPage() {
    location.reload();
  }

  return (
    <div id="leaderBody">
      <div id="refreshButtonContainer">
        <button
          id="refreshButton"
          className="animated-accent"
          onClick={refreshPage}
        ></button>
      </div>
      <NavComponent />

      <h2
        style={{ textAlign: "center", fontWeight: "normal", marginBottom: 16 }}
        className="animated-text"
      >
        Leaderboard
      </h2>

      <div id="sortContainer">
        {SORT_KEYS.map((key) => (
          <button
            className={`lb-sort-btn ${sortKey === key ? "active animated-accent" : ""}`}
            key={key}
            onClick={() => setSortKey(key)}
          >
            {SORT_LABELS[key]}
          </button>
        ))}
      </div>

      <div id="boardContainer">
        <BoardContent
          isLoading={isLoading}
          error={error}
          sortedLeaderboardData={sortedLeaderboardData}
          sortKey={sortKey}
        />
      </div>
    </div>
  );
}
