import { expect, test } from "@playwright/test";

test.describe("Locator syntax rules", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Extracting values", async ({ page }) => {
    //textContent
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const buttonText = await basicForm.locator("button").textContent();
    expect(buttonText).toEqual("Submit");

    //allTextContents
    const radioButtons = await page.locator("nb-radio").allTextContents();
    expect(radioButtons).toContain("Option 2");

    //input field value
    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    await emailField.fill("test@test.com");
    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual("test@test.com");

    //attribute value
    const placeholderVelue = await emailField.getAttribute("placeholder");
    expect(placeholderVelue).toEqual("Email");
  });
});
