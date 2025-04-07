import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  readonly formLayoutsMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly datepickerMenuItem: Locator;
  readonly dialogMenuItem: Locator;
  readonly tooltipMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    this.formLayoutsMenuItem = page.getByText("Form Layouts");
    this.toastrMenuItem = page.getByText("Toastr");
    this.datepickerMenuItem = page.getByText("Datepicker");
    this.dialogMenuItem = page.getByText("Dialog");
    this.tooltipMenuItem = page.getByText("Tooltip");
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutsMenuItem.click();
    await this.waitForNumberOfSeconds(2);
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toastrMenuItem.click();
  }

  async datePickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datepickerMenuItem.click();
  }

  async dialogPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.dialogMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenuItem.click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    expandedState === "false" && (await groupMenuItem.click());
  }
}
