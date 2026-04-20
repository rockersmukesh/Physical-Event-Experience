import { getMenuItems } from "@/lib/demo-data";

export async function GET() {
  try {
    const menuItems = await getMenuItems();
    return Response.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return Response.json({ error: "Failed to load menu from the demo database." }, { status: 500 });
  }
}
