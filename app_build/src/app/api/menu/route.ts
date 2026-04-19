import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const menu = await db.menuItem.findMany();
    // Return mock data if the database is completely empty (for preview before seeding)
    if (menu.length === 0) {
      return NextResponse.json([
        { id: "1", name: "Stadium Hot Dog", prepTime: "5 min", price: 8.00, icon: "lunch_dining", category: "Food" },
        { id: "2", name: "Craft IPA Pint", prepTime: "2 min", price: 12.00, icon: "sports_bar", category: "Drinks" },
        { id: "3", name: "Loaded Nachos", prepTime: "8 min", price: 10.50, icon: "fastfood", category: "Food" },
      ]);
    }
    return NextResponse.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}
