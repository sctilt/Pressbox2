import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
    });

    const prompt = `Today is ${today}. Return ONLY valid JSON array of 4 news items about current MLB, NBA playoffs, or sports cards. Format: [{"headline": "...", "summary": "..."}]`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    const text = data.content?.[0]?.text || '[]';
    let headlines = [];
    try {
      headlines = JSON.parse(text);
    } catch {
      headlines = [{ headline: "Sports news updating", summary: "Claude is working..." }];
    }

    return NextResponse.json({ headlines });
  } catch (error) {
    return NextResponse.json({ 
      headlines: [{ headline: "Live news service", summary: "Check back in a moment" }] 
    });
  }
}
