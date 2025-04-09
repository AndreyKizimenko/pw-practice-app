import { test, expect } from "@playwright/test";

test.describe("auto waiting examples", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("http://uitestingplayground.com/ajax");
    await page.getByRole("button", { name: "AJAX Request" }).click();
    // testInfo.setTimeout(testInfo.timeout + 15000);
  });

  test("wait for", async ({ page }) => {
    const successMessage = page.locator(".bg-success");
    await successMessage.waitFor({ state: "visible" });
    await expect(successMessage).toBeVisible();
  });

  test("timeout", async ({ page }) => {
    const successMessage = page.locator(".bg-success");
    await expect(successMessage).toBeVisible({ timeout: 20000 });
  });

  test("alternative waits", async ({ page }) => {
    const successMessage = page.locator(".bg-success");

    // wait for element
    //await page.waitForSelector(".bg-success");

    // wait for particular response
    await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

    // wait for network calls to be completed ("Not recommended")
    //await page.waitForLoadState("networkidle");

    // test.slow()

    // assertion
    await expect(successMessage).toBeVisible();
  });
});
