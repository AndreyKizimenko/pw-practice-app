import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/tables/smart-table");
});

test("finding and editing a row", async ({ page }) => {
  const twitterRow = page.getByRole("row", { name: "twitter@outlook.com" });
  await twitterRow.locator(".nb-edit").click();

  await page.locator("input-editor").getByPlaceholder("Age").fill("99");
  await twitterRow.locator(".nb-checkmark").click();

  expect(await twitterRow.innerText()).toContain("99");
});

test("finding specific element base on the column value", async ({ page }) => {
  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  const targetRowById = page
    .getByRole("row")
    .filter({ has: page.locator("td").nth(1).getByText("11") });
  await targetRowById.locator(".nb-edit").click();

  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("test@test.com");
  await page.locator(".nb-checkmark").click();
  await expect(targetRowById.locator("td").nth(5)).toHaveText("test@test.com");
});

test("filtering a table", async ({ page }) => {
  const ages = ["20", "30", "40", "200"];

  for (const age of ages) {
    await page.locator("th").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(500);
    const ageRows = page.locator("tbody tr");

    for (const row of await ageRows.all()) {
      const cellValue = await row.locator("td").last().textContent();

      age === "200"
        ? expect(cellValue).toContain("No data")
        : expect(cellValue).toEqual(age);
    }
  }
});
