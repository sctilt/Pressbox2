import DashboardLayout from "./components/DashboardLayout";
import LiveScores from "./components/LiveScores";
import PlayerChart from "./components/PlayerChart";
import StatCard from "./components/StatCard";
import { sampleChart } from "./data/sampleChart";

export default function Page() {
  return (
    <DashboardLayout>

      {/* Top stats row */}
      <div style={{
        display: "flex",
        gap: 12,
        marginBottom: 30
      }}>
        <StatCard label="Total Games" value="12" />
        <StatCard label="Live Games" value="5" />
        <StatCard label="Top Player" value="Ohtani" />
      </div>

      {/* Scores */}
      <LiveScores />

      {/* Chart */}
      <div style={{ marginTop: 40 }}>
        <h2>Player Trend</h2>
        <PlayerChart data={sampleChart} />
      </div>

    </DashboardLayout>
  );
}
