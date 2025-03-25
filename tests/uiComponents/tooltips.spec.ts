import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();
});

test.describe("tooltips", () => {
  test("tooltip appears", async ({ page }) => {
    await expect(page.locator("nb-tooltip")).toBeHidden();
    const box = page.locator("nb-card", { hasText: "Placement" });
    await box.getByRole("button", { name: "Top" }).hover();
    await expect(page.locator("nb-tooltip")).toBeVisible();
  });
});
