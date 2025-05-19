import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Input fields", () => {
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
});
