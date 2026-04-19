import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await db.hubEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    
    if (events.length === 0) {
      return NextResponse.json([
        { id: "1", type: 'play', text: 'Mercer hits a deep 3-pointer! The crowd is going wild.', createdAt: new Date().toISOString(), icon: 'sports_basketball' },
        { id: "2", type: 'poll', text: 'Who will take the last shot?', createdAt: new Date(Date.now() - 300000).toISOString(), icon: 'how_to_vote' },
      ]);
    }
    
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching hub events:", error);
    return NextResponse.json({ error: "Failed to fetch live events" }, { status: 500 });
  }
}
