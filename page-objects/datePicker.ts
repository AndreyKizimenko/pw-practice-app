import { expect, Locator, Page } from "@playwright/test";

export class DatePicker {
  private readonly page: Page;
  readonly calendarDayCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.calendarDayCell = page.locator("[class='day-cell ng-star-inserted']");
  }

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const dateInput = this.page.getByPlaceholder("Form Picker");

    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);

    // define a date to look for in the calendar
    let intendedDate: Locator;
    if (numberOfDaysFromToday === 0) {
      intendedDate = this.page.locator(".today");
    } else {
      intendedDate =
        this.calendarDayCell.getByText(date.getDate().toString(), {
          exact: true,
        }) &&
        this.page.locator("nb-calendar-view-mode", {
          hasText: this.dateFormatter(date, "short"),
        });
    }

    // expand the calendar
    await dateInput.click();
    await this.page.waitForSelector(".day-cell.ng-star-inserted");

    // define a button the test should look for (back or forward 1 month)
    const paginationButton = (await intendedDate.isVisible())
      ? null
      : numberOfDaysFromToday < 0
      ? this.page.locator("button.prev-month")
      : this.page.locator("button.next-month");

    // if the date is today, just select that date
    if (numberOfDaysFromToday === 0) {
      await this.page.locator(".today").click();
    }
    // verify that the intended date is visible and if not change the page
    // once the date is available it is selected
    else {
      while (!(await intendedDate.isVisible())) {
        await paginationButton.click();
      }
      await this.calendarDayCell
        .getByText(date.getDate().toString(), { exact: true })
        .click();
    }
    // assertion
    await expect(dateInput).toHaveValue(this.dateFormatter(date, "full"));
  }

  private dateFormatter(date: Date, type: "full" | "short") {
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
  }
}
