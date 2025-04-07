import { test, expect, Locator } from "@playwright/test";
import { NavigationPage } from "../../page-objects/navigationPage";
import { DatePicker } from "../../page-objects/datePicker";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("date picker", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const datePicker = new DatePicker(page);
  await navigateTo.datePickerPage();
  const testCases = [0, 1, 25, 50, 300, -1, -25, -50, -300];

  for (const testCase of testCases) {
    await datePicker.selectCommonDatePickerDateFromToday(testCase);
    
  }
});
