import { expect, test } from "@playwright/test";

test.describe("Locator syntax rules", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Reusing locators", async ({ page }) => {
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    const passwordField = basicForm.getByRole("textbox", { name: "Password" });
    const signInButton = basicForm.getByRole("button");
    const checkbox = basicForm.locator("nb-checkbox");

    await emailField.fill("test@test.com");
    await passwordField.fill("Welcome123");
    await checkbox.click();
    await signInButton.click();

    await expect(emailField).toHaveValue("test@test.com");
    await expect(passwordField).toHaveValue("Welcome123");
  });
});
