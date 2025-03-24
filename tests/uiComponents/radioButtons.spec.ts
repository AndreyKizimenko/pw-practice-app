import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Radio buttons", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("radio buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    await usingTheGridForm.getByLabel("Option 1").check({ force: true });
    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .isChecked();

    //generic assertion
    expect(radioStatus).toBeTruthy();

    //locator assertion
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 2" })
    ).toBeChecked();
  });
});
