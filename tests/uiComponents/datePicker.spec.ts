import { test, expect, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("date picker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const testCases = [0, 1, 25, 50, 300, -1, -25, -50, -300];
  const dateFormatter = (date: Date, type: "full" | "short") => {
    if (type === "full") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }
  };  

  const dateInput = page.getByPlaceholder("Form Picker");
  const dateLocator = page.locator("[class='day-cell ng-star-inserted']");

  for (const testCase of testCases) {
    //initial date initialization
    let date = new Date();
    date.setDate(date.getDate() + testCase);

    // define a date to look for in the calendar
    let intendedDate: Locator;
    if (testCase === 0) {
      intendedDate = page.locator(".today");
    } else {
      intendedDate =
        dateLocator.getByText(date.getDate().toString(), { exact: true }) &&
        page.locator("nb-calendar-view-mode", {
          hasText: dateFormatter(date, "short"),
        });
    }

    // define a button the test should look for (back or forward 1 month)
    const paginationButton = (await intendedDate.isVisible())
      ? null
      : testCase < 0
      ? page.locator("button.prev-month")
      : page.locator("button.next-month");

    // expand the calendar
    dateInput.click();
    await page.waitForSelector(".day-cell.ng-star-inserted");

    // if the date is today, just select that date
    if (testCase === 0) {
      await page.locator(".today").click();
    }
    // verify that the intended date is visible and if not change the page
    // once the date is available it is selected
    else {
      while (!(await intendedDate.isVisible())) {
        await paginationButton.click();
      }
      await dateLocator
        .getByText(date.getDate().toString(), { exact: true })
        .click();
    }

    // assertion
    await expect(dateInput).toHaveValue(dateFormatter(date, "full"));    
  }
});
