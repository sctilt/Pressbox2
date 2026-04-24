// app/api/headlines/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
    });

    const prompt = `You are a sports news editor. Today is ${today}. Return ONLY a valid JSON array of 4-5 news items about MLB, NBA playoffs, sports cards. Format: [{"headline": "...", "summary": "..."}]`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    const text = data.content?.[0]?.text || '[]';
    
    let headlines;
    try {
      headlines = JSON.parse(text);
    } catch {
      headlines = [{ headline: "Sports news updating...", summary: "Claude is generating fresh headlines" }];
    }

    return NextResponse.json({ headlines });
  } catch (error) {
    return NextResponse.json({ 
      headlines: [{ headline: "Live news unavailable", summary: "Check back soon" }] 
    });
  }
}
