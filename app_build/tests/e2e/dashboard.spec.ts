import { expect, test } from "@playwright/test";

test("dashboard highlights core venue experience pillars", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Stadium Pulse" })).toBeVisible();
  await expect(page.getByText("Live routing, queue-aware ordering, and event coordination")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Championship Finals" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Keep Moving" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Operations Feed" })).toBeVisible();

  await page.getByRole("link", { name: "Open Map" }).click();
  await expect(page).toHaveURL(/\/map$/);
});
