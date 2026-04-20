import { getVenueMapData } from "@/lib/demo-data";

export async function GET() {
  try {
    const data = await getVenueMapData();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching venue map data:", error);
    return Response.json(
      { error: "Failed to load venue routing data from the demo database." },
      { status: 500 },
    );
  }
}
