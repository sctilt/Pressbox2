import { G } from "../styles/theme";

export default function StatCard({ label, value }) {
  return (
    <div style={{
      background: G.panel,
      border: `1px solid ${G.border}`,
      padding: 15,
      borderRadius: 10,
      width: 150
    }}>
      <div style={{ color: G.muted, fontSize: 12 }}>
        {label}
      </div>
      <div style={{
        fontSize: 20,
        fontWeight: "bold",
        color: G.gold
      }}>
        {value}
      </div>
    </div>
  );
}
