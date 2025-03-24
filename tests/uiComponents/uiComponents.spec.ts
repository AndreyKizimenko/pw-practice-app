import { test, expect } from "@playwright/test";

test.describe("UI Components", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
  });

  test.describe("Form layouts pages", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByText("Forms").click();
      await page.getByText("Form Layouts").click();
    });

    test("input fields", async ({ page }) => {
      const usingTheGridEmailInput = page
        .locator("nb-card", { hasText: "Using the Grid" })
        .getByRole("textbox", { name: "Email" });

      await usingTheGridEmailInput.fill("test@test.com");

      //generic assertion
      const emailValue = await usingTheGridEmailInput.inputValue();
      expect(emailValue).toEqual("test@test.com");

      //locator assertion
      await expect(usingTheGridEmailInput).toHaveValue("test@test.com");
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
});
