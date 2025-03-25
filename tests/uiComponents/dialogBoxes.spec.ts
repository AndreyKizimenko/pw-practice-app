import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("dialog boxes", () => {
  test("basic dialog", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Dialog").click();

    // finding and opening a dilog
    await page.getByRole("button", { name: "enter name" }).click();
    await page.getByRole("textbox", { name: "name" }).fill("Andrey");
    await page.getByRole("button", { name: "submit" }).click();
    //assertion for the name addition
    await expect(
      page
        .locator("nb-card", { hasText: "Return Result" })
        .getByRole("listitem")
    ).toHaveText("Andrey");
  });

  test("browser dialog", async ({ page }) => {
    await page.goto("http://localhost:4200/pages/tables/smart-table");

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toContain("Are you sure");
      dialog.accept();
    });

    await page
      .locator("tr", { hasText: "mdo@gmail.com" })
      .locator("i.nb-trash")
      .click();

    expect(await page.getByRole("table").innerText()).not.toContain(
      "mdo@gmail.com"
    );
  });
});
