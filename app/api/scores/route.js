
export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=linescore`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  const games = (data.dates?.[0]?.games || []).map(g => ({
    home: g.teams.home.team.abbreviation,
    away: g.teams.away.team.abbreviation,
    hs: g.teams.home.score || 0,
    as: g.teams.away.score || 0,
    status: g.status.detailedState
  }));

  return Response.json(games);
}
