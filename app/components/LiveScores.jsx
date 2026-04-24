"use client";

import { useEffect, useState } from "react";

export default function LiveScores() {
  const [games, setGames] = useState([]);

  async function fetchScores() {
    const res = await fetch("/api/scores");
    const data = await res.json();
    setGames(data);
  }

  useEffect(() => {
    fetchScores();
    const i = setInterval(fetchScores, 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{
      padding: 20,
      background: "#001a0d",
      minHeight: "100vh",
      color: "#e8f5ee"
    }}>
      <h2 style={{ color: "#ffd100", marginBottom: 20 }}>
        ⚾ Live MLB Scores
      </h2>

      <div style={{
        display: "grid",
        gap: 12
      }}>
        {games.map((g, i) => (
          <div key={i} style={{
            background: "#002814",
            padding: 15,
            borderRadius: 10,
            border: "1px solid #004d24",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <div>
              <div>{g.away}</div>
              <div>{g.home}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div>{g.as}</div>
              <div>{g.hs}</div>
            </div>

            <div style={{
              fontSize: 12,
              color: "#7ab893"
            }}>
              {g.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
