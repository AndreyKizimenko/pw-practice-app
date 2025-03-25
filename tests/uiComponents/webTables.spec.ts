import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/tables/smart-table");
});

test.describe("web tables", () => {
  test("finding and editing a row", async ({ page }) => {
    const twitterRow = page.getByRole("row", { name: "twitter@outlook.com" });
    await twitterRow.locator(".nb-edit").click();

    await page.locator("input-editor").getByPlaceholder("Age").fill("99");
    await twitterRow.locator(".nb-checkmark").click();

    expect(await twitterRow.innerText()).toContain("99");
  });
});
