'use client';

import { useState } from 'react';

const G = {
  bg: "#001a0d", bg2: "#002814", bg3: "#003318",
  border: "#004d24", border2: "#006a3d",
  green: "#006a3d", gold: "#ffd100",
  text: "#e8f5ee", muted: "#7ab893", dim: "#1a4030",
  up: "#00e676", down: "#ff4444",
};

const ALL_PLAYERS = [
  { name: "Shohei Ohtani", team: "LA Dodgers", sport: "MLB", rankCurrent: 1, cardCurrent: 2100, cardPctChange: 7.7, trend: "⚡ OB streak snapped" },
  { name: "Aaron Judge", team: "NY Yankees", sport: "MLB", rankCurrent: 2, cardCurrent: 965, cardPctChange: 10.3, trend: "📈 Heating up" },
  { name: "Mike Trout", team: "LA Angels", sport: "MLB", rankCurrent: 9, cardCurrent: 620, cardPctChange: 63.2, trend: "🔥 Vintage Trout" },
  { name: "VJ Edgecombe", team: "Philadelphia 76ers", sport: "NBA", rankCurrent: 18, cardCurrent: 175, cardPctChange: 169.2, trend: "🔥🔥 Playoff breakout" },
  { name: "Dalton Rushing", team: "LA Dodgers", sport: "MLB", rankCurrent: 35, cardCurrent: 88, cardPctChange: 193.3, trend: "🚀 Breakout season" },
];

export default function ThePressBox() {
  const [tab, setTab] = useState<'front' | 'watch' | 'wax' | 'oz'>('front');
  const [subTab, setSubTab] = useState('all');

  return (
    <div style={{ minHeight: '100vh', background: G.bg, color: G.text, fontFamily: 'Arial, sans-serif' }}>
      {/* Masthead */}
      <div style={{ background: G.green, padding: '20px 10px', textAlign: 'center', borderBottom: `4px solid ${G.gold}` }}>
        <div style={{ color: G.gold, fontSize: '12px', letterSpacing: '6px' }}>⬥ DAILY SPORTS EDITION ⬥</div>
        <h1 style={{ fontSize: '42px', fontWeight: '900', margin: '8px 0', color: 'white', letterSpacing: '3px' }}>
          THE PRESS BOX
        </h1>
        <div style={{ color: G.gold, fontSize: '16px' }}>April 23, 2026 • Fenway Edition</div>
      </div>

      {/* Main Navigation */}
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
        {/* FRONT PAGE */}
        {tab === 'front' && (
          <>
            <div style={{ background: G.bg2, padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
              <h2 style={{ color: G.gold }}>🔥 Breaking News</h2>
              <p><strong>VJ Edgecombe</strong> drops 30 in Playoffs G2 • Series tied 1-1</p>
              <p><strong>Dalton Rushing</strong> .476 AVG — Dodgers roster dilemma</p>
              <p><strong>Jose Soriano</strong> historic 0.28 ERA start</p>
            </div>

            <div style={{ background: G.bg2, padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
              <h3 style={{ color: G.gold }}>Today's Games</h3>
              <p>BOS @ NYY • 6:45 PM</p>
              <p>OKC vs PHX • 9:30 PM (Playoffs G2)</p>
            </div>
          </>
        )}

        {/* MY PLAYERS */}
        {tab === 'watch' && (
          <div>
            <h2 style={{ color: G.gold, marginBottom: '15px' }}>My Players — Card Watchlist</h2>
            
            {ALL_PLAYERS.map((p, i) => (
              <div key={i} style={{ 
                background: G.bg2, 
                padding: '18px', 
                marginBottom: '12px', 
                borderRadius: '10px',
                border: `1px solid ${G.border}` 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '18px', fontWeight: '700' }}>{p.name}</div>
                    <div style={{ color: G.muted }}>{p.team} • {p.sport}</div>
                    <div style={{ color: G.up, fontSize: '14px', marginTop: '4px' }}>{p.trend}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: G.gold, fontSize: '24px', fontWeight: '700' }}>${p.cardCurrent}</div>
                    <div style={{ color: G.up, fontWeight: '700' }}>+{p.cardPctChange}%</div>
                    <div style={{ color: G.muted, fontSize: '12px' }}>#{p.rankCurrent}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WAX TRACKER */}
        {tab === 'wax' && (
          <div style={{ background: G.bg2, padding: '25px', borderRadius: '10px' }}>
            <h2 style={{ color: G.gold }}>📦 Wax Tracker — Upcoming Releases</h2>
            
            <div style={{ margin: '20px 0', padding: '15px', background: G.bg3, borderRadius: '8px' }}>
              <strong>2026 Bowman Baseball</strong><br />
              May 13 • Pre-order live • Ethan Holliday 1st Bowman 🔥
            </div>

            <div style={{ margin: '20px 0', padding: '15px', background: G.bg3, borderRadius: '8px' }}>
              <strong>2026 Topps Chrome Baseball</strong><br />
              August • Most anticipated Chrome class in years
            </div>
          </div>
        )}

        {/* OZ PREDICTIONS */}
        {tab === 'oz' && (
          <div style={{ background: G.bg2, padding: '25px', borderRadius: '10px' }}>
            <h2 style={{ color: G.gold }}>🔮 Oz Daily Picks</h2>
            
            <div style={{ marginTop: '20px' }}>
              <strong>STRONG BUY</strong><br />
              Ethan Holliday 1st Bowman Chrome Auto — Target $400–600
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <strong>Today's Best Bet</strong><br />
              Angels ML vs TOR (Jose Soriano pitching) — Great value
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
