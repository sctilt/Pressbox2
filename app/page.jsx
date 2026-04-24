'use client';

import { useState, useEffect } from 'react';

const G = {
  bg: "#001a0d", bg2: "#002814", bg3: "#003318",
  border: "#004d24", border2: "#006a3d",
  green: "#006a3d", gold: "#ffd100",
  text: "#e8f5ee", muted: "#7ab893", dim: "#1a4030",
  up: "#00e676", down: "#ff4444",
};

export default function ThePressBox() {
  const [tab, setTab] = useState<'front' | 'watch' | 'wax' | 'oz'>('front');
  const [liveGames, setLiveGames] = useState<any[]>([]);
  const [headlines, setHeadlines] = useState<any[]>([]);
  const [loadingScores, setLoadingScores] = useState(false);
  const [loadingHeadlines, setLoadingHeadlines] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // Real MLB Scores
  const fetchLiveScores = async () => {
    setLoadingScores(true);
    try {
      const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`);
      const data = await res.json();
      const games = data.dates?.[0]?.games || [];
      setLiveGames(games);
    } catch (e) {
      console.error(e);
      setLiveGames([]);
    }
    setLoadingScores(false);
  };

  // Claude-powered Live Headlines
  const fetchHeadlines = async () => {
    setLoadingHeadlines(true);
    try {
      const res = await fetch('/api/headlines');
      const data = await res.json();
      setHeadlines(data.headlines || []);
    } catch (e) {
      console.error(e);
      setHeadlines([{ headline: "Claude headlines loading...", summary: "Real-time sports & card market news" }]);
    }
    setLoadingHeadlines(false);
  };

  useEffect(() => {
    if (tab === 'front') {
      fetchLiveScores();
      fetchHeadlines();
    }
  }, [tab]);

  return (
    <div style={{ minHeight: '100vh', background: G.bg, color: G.text, fontFamily: 'Arial, sans-serif' }}>
      {/* Masthead */}
      <div style={{ background: G.green, padding: '20px 10px', textAlign: 'center', borderBottom: `4px solid ${G.gold}` }}>
        <div style={{ color: G.gold, fontSize: '12px', letterSpacing: '6px' }}>⬥ REAL-TIME SPORTS EDITION ⬥</div>
        <h1 style={{ fontSize: '42px', fontWeight: '900', margin: '8px 0', color: 'white', letterSpacing: '3px' }}>
          THE PRESS BOX
        </h1>
        <div style={{ color: G.gold, fontSize: '16px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', background: G.bg2, overflowX: 'auto', borderBottom: `2px solid ${G.green}` }}>
        {[
          { id: 'front', label: '🏠 FRONT PAGE' },
          { id: 'watch', label: '👀 MY PLAYERS' },
          { id: 'wax', label: '📦 WAX' },
          { id: 'oz', label: '🔮 OZ' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            style={{
              flex: 1,
              padding: '16px 8px',
              background: tab === t.id ? G.gold : 'transparent',
              color: tab === t.id ? '#001a0d' : G.muted,
              border: 'none',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px', maxWidth: '720px', margin: '0 auto' }}>
        {tab === 'front' && (
          <>
            {/* LIVE SCORES */}
            <div style={{ background: G.bg2, padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
              <h2 style={{ color: G.gold }}>🔴 Live MLB Scores</h2>
              {loadingScores && <p>Loading live games...</p>}
              {liveGames.length > 0 ? liveGames.map((g, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${G.border}` }}>
                  <strong>{g.teams?.away?.team?.name} @ {g.teams?.home?.team?.name}</strong>
                  <div style={{ color: G.muted }}>{g.status?.detailedState || 'Scheduled'}</div>
                </div>
              )) : <p>No games today.</p>}
            </div>

            {/* CLAUDE HEADLINES */}
            <div style={{ background: G.bg2, padding: '20px', borderRadius: '10px' }}>
              <h2 style={{ color: G.gold }}>📰 Live Headlines</h2>
              {loadingHeadlines && <p>Generating fresh headlines with Claude...</p>}
              {headlines.map((h, i) => (
                <div key={i} style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: `1px solid ${G.border}` }}>
                  <strong style={{ color: G.gold }}>{h.headline}</strong>
                  <p style={{ color: G.muted, marginTop: '6px' }}>{h.summary}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'watch' && <div style={{ background: G.bg2, padding: '30px', borderRadius: '10px' }}><h2 style={{ color: G.gold }}>👀 My Players</h2><p>Real-time card values and stats coming next.</p></div>}
        {tab === 'wax' && <div style={{ background: G.bg2, padding: '30px', borderRadius: '10px' }}><h2 style={{ color: G.gold }}>📦 Wax Market</h2><p>Live release tracking coming soon.</p></div>}
        {tab === 'oz' && <div style={{ background: G.bg2, padding: '30px', borderRadius: '10px' }}><h2 style={{ color: G.gold }}>🔮 Oz Live Picks</h2><p>Dynamic AI predictions loading...</p></div>}
      </div>
    </div>
  );
}
