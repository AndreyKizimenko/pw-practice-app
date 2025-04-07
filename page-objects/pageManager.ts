import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FormLayoutsPage } from "./formLayoutsPage";
import { DatePicker } from "./datePicker";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutPage: FormLayoutsPage;
  private readonly datePickerPage: DatePicker;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutPage = new FormLayoutsPage(this.page);
    this.datePickerPage = new DatePicker(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }
  onFormLayoutPage() {
    return this.formLayoutPage;
  }
  onDatePickerPage() {
    return this.datePickerPage;
  }
}
