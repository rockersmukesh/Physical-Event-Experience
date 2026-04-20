import { expect, test } from "@playwright/test";

test("map supports rerouting around congestion", async ({ page }) => {
  await page.goto("/map");

  await expect(page.getByRole("heading", { name: "Interactive Map" })).toBeVisible();
  await expect(page.getByText("Fastest recommendation")).toBeVisible();

  await page.getByRole("button", { name: /Reroute Me/ }).click();

  await expect(page.getByRole("heading", { name: "Gate C Express" })).toBeVisible();
  await expect(page.getByText("Use the outdoor escalator to save 5 minutes versus South Corridor.")).toBeVisible();
});
