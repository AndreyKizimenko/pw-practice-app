import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("checkboxes", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();
  });

  test("checkboxes", async ({ page }) => {
    await page.getByRole("checkbox", { name: "Hide" }).click({ force: true });

    const allBoxes = page.getByRole("checkbox");
    for (const box of await allBoxes.all()) {
      await box.check({ force: true });
      expect(await box.isChecked()).toBeTruthy();
    }
  });
});