import { expect, test } from "@playwright/test";

test("express ordering supports both pickup and in-seat delivery", async ({ page }) => {
  await page.goto("/order");

  await expect(page.getByRole("heading", { name: "Express Order" })).toBeVisible();
  await expect(page.getByText("Connected to Neon demo data")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Stadium Hot Dog" })).toBeVisible();

  const hotDogCard = page
    .locator("article")
    .filter({ has: page.getByRole("heading", { name: "Stadium Hot Dog" }) });
  await hotDogCard.getByRole("button", { name: "Add +" }).click();

  await expect(page.getByText("Added Stadium Hot Dog to cart")).toBeVisible();
  await expect(page.getByText("Qty: 1")).toBeVisible();

  await page.getByRole("button", { name: /In-Seat Delivery/ }).click();
  await expect(page.getByRole("button", { name: "Checkout for In-Seat Delivery" })).toBeVisible();
  await page.getByRole("button", { name: "Checkout for In-Seat Delivery" }).click();

  await expect(page.getByText("Latest order")).toBeVisible();
  await expect(page.getByText("Section 114, Row G, Seat 23 • 14 min")).toBeVisible();
});
