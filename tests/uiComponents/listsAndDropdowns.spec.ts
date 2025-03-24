import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("lists and dropdowns", () => {
  const themes = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  test("dropdown button", async ({ page }) => {
    const navDropdown = page.locator("nb-option-list");
    const navDropdownButton = page
      .getByRole("navigation")
      .locator(".select-button");

    expect(navDropdown).toBeHidden();
    expect(Object.keys(themes)).toContain(
      (await navDropdownButton.textContent()).trim()
    );

    await navDropdownButton.click();
    expect(navDropdown).toBeVisible();

    await expect(navDropdown.locator("nb-option")).toContainText(
      Object.keys(themes)
    );
  });

  test("changing theme from a dropdown", async ({ page }) => {
    const header = page.locator("nb-layout-header");
    const navDropdownButton = page
      .getByRole("navigation")
      .locator(".select-button");

    for (const theme in themes) {
      await navDropdownButton.click();
      await page
        .locator("nb-option-list nb-option", { hasText: theme })
        .click();
      expect(await navDropdownButton.textContent()).toMatch(theme);
      expect(header).toHaveCSS("background-color", themes[theme]);
    }
  });
});