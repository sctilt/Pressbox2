
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
    <div>
      <h2>Live MLB Scores</h2>
      {games.map((g,i)=>(
        <div key={i}>
          {g.away} {g.as} - {g.home} {g.hs} ({g.status})
        </div>
      ))}
    </div>
  );
}
