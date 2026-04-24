'use client';

import { useState, useEffect } from 'react';

const G = {
  bg: "#001a0d", bg2: "#002814", bg3: "#003318",
  border: "#004d24", border2: "#006a3d",
  green: "#006a3d", gold: "#ffd100", white: "#ffffff",
  text: "#e8f5ee", muted: "#7ab893", dim: "#1a4030",
  up: "#00e676", down: "#ff4444",
};

export default function ThePressBox() {
  const [tab, setTab] = useState('front');
  const [liveGames, setLiveGames] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const fetchLiveScores = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`);
      const data = await res.json();
      setLiveGames(data.dates?.[0]?.games || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchHeadlines = async () => {
    try {
      const res = await fetch('/api/headlines');
      const data = await res.json();
      setHeadlines(data.headlines || []);
    } catch (e) {
      setHeadlines([{ headline: "Welcome to The Press Box", summary: "Real-time sports cards & scores" }]);
    }
  };

  useEffect(() => {
    if (tab === 'front') {
      fetchLiveScores();
      fetchHeadlines();
    }
  }, [tab]);

  return (
    <div style={{ minHeight: '100vh', background: G.bg, color: G.text, fontFamily: 'Arial, sans-serif' }}>
      {/* Rich Masthead */}
      <div style={{ background: G.green, padding: '25px 15px', textAlign: 'center', borderBottom: `5px solid ${G.gold}` }}>
        <div style={{ color: G.gold, fontSize: '13px', letterSpacing: '8px', marginBottom: '8px' }}>⬥ FENWAY EDITION ⬥</div>
        <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0', color: 'white', letterSpacing: '4px' }}>
          THE PRESS BOX
        </h1>
        <div style={{ color: G.gold, fontSize: '18px', marginTop: '8px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', background: G.bg2, overflowX: 'auto', borderBottom: `3px solid ${G.green}` }}>
        {[
          { id: 'front', label: 'FRONT PAGE' },
          { id: 'watch', label: 'MY PLAYERS' },
          { id: 'wax', label: 'WAX TRACKER' },
          { id: 'oz', label: 'OZ PREDICTIONS' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: '18px 10px',
              background: tab === t.id ? G.gold : 'transparent',
              color: tab === t.id ? G.bg : G.muted,
              border: 'none',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px', maxWidth: '750px', margin: '0 auto' }}>
        {tab === 'front' && (
          <>
            <div style={{ background: G.bg2, padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
              <h2 style={{ color: G.gold }}>🔴 LIVE SCORES</h2>
              {loading && <p>Loading today's games...</p>}
              {liveGames.map((g, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: `1px solid ${G.border}` }}>
                  <strong>{g.teams?.away?.team?.name} @ {g.teams?.home?.team?.name}</strong>
                  <div style={{ color: G.muted }}>{g.status?.detailedState}</div>
                </div>
              ))}
            </div>

            <div style={{ background: G.bg2, padding: '20px', borderRadius: '10px' }}>
              <h2 style={{ color: G.gold }}>📰 LIVE HEADLINES</h2>
              {headlines.map((h, i) => (
                <div key={i} style={{ marginBottom: '18px' }}>
                  <div style={{ color: G.gold, fontWeight: '700' }}>{h.headline}</div>
                  <p style={{ color: G.muted, marginTop: '4px' }}>{h.summary}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'watch' && (
          <div style={{ background: G.bg2, padding: '25px', borderRadius: '10px' }}>
            <h2 style={{ color: G.gold }}>👀 MY PLAYERS — CARD WATCHLIST</h2>
            <p style={{ color: G.muted }}>Dynamic player cards and real-time values will load here.</p>
          </div>
        )}

        {tab === 'wax' && (
          <div style={{ background: G.bg2, padding: '25px', borderRadius: '10px' }}>
            <h2 style={{ color: G.gold }}>📦 WAX TRACKER</h2>
            <p>Live
