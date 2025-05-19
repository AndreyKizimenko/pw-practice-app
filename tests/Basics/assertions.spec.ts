import { test, expect } from "@playwright/test";

test.describe("Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("assertions", async ({ page }) => {
    const basicFormButton = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .locator("button");

    // general assertions
    const value = 5;
    expect(value).toEqual(5);

    const text = await basicFormButton.textContent();
    expect(text).toEqual("Submit");

    // Locator assertion
    await expect(basicFormButton).toHaveText("Submit");

    // soft assertions
    await expect.soft(basicFormButton).toHaveText("Submit");
    await basicFormButton.click();
  });
});
