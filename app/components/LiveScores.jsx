"use client";

import { useEffect, useState } from "react";
import { G } from "../styles/theme";

export default function LiveScores() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchScores() {
      const res = await fetch("/api/scores");
      const data = await res.json();
      setGames(data);
    }

    fetchScores();
    const i = setInterval(fetchScores, 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <div>
      <h2 style={{ color: G.gold }}>Live MLB Scores</h2>

      <div style={{
        display: "grid",
        gap: 12,
        marginTop: 10
      }}>
        {games.map((g, i) => (
          <div key={i} style={{
            background: G.panel,
            border: `1px solid ${G.border}`,
            borderRadius: 10,
            padding: 15,
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

            <div style={{ color: G.muted, fontSize: 12 }}>
              {g.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
