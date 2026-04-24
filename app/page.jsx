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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const fetchLiveScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`);
      if (!res.ok) throw new Error('Failed to fetch scores');
      const data = await res.json();
      const games = data.dates?.[0]?.games || [];
      setLiveGames(games);
    } catch (err: any) {
      console.error(err);
      setError('Could not load live scores');
      setLiveGames([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (tab === 'front') {
      fetchLiveScores();
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
        {/* FRONT PAGE - LIVE SCORES */}
        {tab === 'front' && (
          <>
            <div style={{ background: G.bg2, padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
              <h2 style={{ color: G.gold }}>🔴 Live MLB Scores</h2>
              {loading && <p>Loading live games...</p>}
              {error && <p style={{ color: G.down }}>{error}</p>}
              
              {liveGames.length > 0 ? (
                liveGames.map((game, i) => (
                  <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${G.border}` }}>
                    <strong>
                      {game.teams?.away?.team?.name} @ {game.teams?.home?.team?.name}
                    </strong>
                    <div style={{ color: G.muted, fontSize: '14px', marginTop: '4px' }}>
                      {game.status?.detailedState || 'Scheduled'}
                    </div>
                  </div>
                ))
              ) : !loading && <p>No games today or API unavailable.</p>}
            </div>

            <div style={{ background: G.bg2, padding: '20px', borderRadius: '10px' }}>
              <h2 style={{ color: G.gold }}>📰 Top Headlines</h2>
              <p style={{ color: G.muted }}>Live news &amp; card market updates will load here (next update).</p>
            </div>
          </>
        )}

        {/* MY PLAYERS */}
        {tab === 'watch' && (
          <div style={{ background: G.bg2, padding: '25px', borderRadius: '10px' }}>
            <h2 style={{ color: G.gold }}>👀 My Players</h2>
            <p style={{ color: G.muted }}>Real-time player stats and card values coming in next update.</p>
          </div>
        )}

        {/* WAX */}
        {tab === 'wax' && (
          <div style={{ background: G.bg2, padding: '25px', borderRadius: '10px' }}>
            <h2 style={{ color: G.gold }}>📦 Live Wax Market</h2>
            <p style={{ color: G.muted }}>Real-time release dates and secondary market prices coming soon.</p>
          </div>
        )}

        {/* OZ */}
        {tab === 'oz' && (
          <div style={{ background: G.bg2, padding: '25px', borderRadius: '10px' }}>
            <h2 style={{ color: G.gold }}>🔮 Oz Live Predictions</h2>
            <p style={{ color: G.muted }}>AI-powered betting edges and investment picks loading live...</p>
          </div>
        )}
      </div>
    </div>
  );
}
