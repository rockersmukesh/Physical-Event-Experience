import { getGameState, getHubEvents } from "@/lib/demo-data";

export async function GET() {
  try {
    const [gameState, events] = await Promise.all([getGameState(), getHubEvents()]);
    return Response.json({ gameState, events });
  } catch (error) {
    console.error("Error fetching live hub:", error);
    return Response.json({ error: "Failed to load the live hub from the demo database." }, { status: 500 });
  }
}
