import { expect, test } from "@playwright/test";

test("live hub keeps updates and polls interactive", async ({ page }) => {
  await page.goto("/hub");

  await expect(page.getByRole("heading", { name: "Live Hub" })).toBeVisible();
  await expect(page.getByText("Live feed active")).toBeVisible();
  await expect(page.getByText("Who takes the final shot?")).toBeVisible({ timeout: 15_000 });

  await page.getByRole("button", { name: /Mercer/ }).click();

  await expect(page.getByRole("button", { name: /Mercer 45%/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Diaz 55%/ })).toBeVisible();
});
