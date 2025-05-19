import { test } from "@playwright/test";
import { PageManager } from "../../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("date picker", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().datePickerPage();
  const testCases = [0, 1, 25, 50, 300, -1, -25, -50, -300];

  for (const testCase of testCases) {
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(testCase);
  }
});
