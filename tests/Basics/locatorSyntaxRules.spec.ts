import { expect, test } from "@playwright/test";

test.describe("Locator syntax rules", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Locator syntax rules", async ({ page }) => {
    // locator
    page.locator("input");
    // by ID
    page.locator("#inputEmail");
    // by Class
    page.locator(".shape-rectangle");
    // by attribute
    page.locator('[placeholder="Email"]');
    // by Class Value (full)
    page.locator(
      '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
    );
    // combination
    page.locator('input[placeholder="Email"][nbinput]');
    // partial text match
    page.locator(':text("Using")');
    // exact text match
    page.locator(':text-is("Using the Grid")');
  });

  test("User facing", async ({ page }) => {
    await page.getByRole("textbox", { name: "Email" }).first().click();
    await page.getByRole("button", { name: "Sign in" }).first().click();
    await page.getByLabel("Email").first().click();
    await page.getByPlaceholder("Jane Doe").click();
    await page.getByText("Using the grid").click();
    await page.getByTestId("SignIn").click();
    await page.getByTitle("IoT Dashboard").click();
  });
});
