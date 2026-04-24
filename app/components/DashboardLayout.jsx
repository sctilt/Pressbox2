
import { G } from "../styles/theme";

export default function DashboardLayout({ children }) {
  return (
    <div style={{
      background: G.bg,
      minHeight: "100vh",
      padding: 20,
      color: G.text,
      fontFamily: "Arial"
    }}>
      <h1 style={{ color: G.gold, marginBottom: 20 }}>
        ⚾ Pressbox Dashboard
      </h1>

      {children}
    </div>
  );
}
