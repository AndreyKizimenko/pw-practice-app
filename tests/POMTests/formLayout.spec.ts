import { test, expect } from "@playwright/test";
import { NavigationPage } from "../../page-objects/navigationPage";
import { FormLayoutsPage } from "../../page-objects/formLayoutsPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("sign in using the grid", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const formLayoutsPage = new FormLayoutsPage(page);
  await navigateTo.formLayoutsPage();
  await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "test@test.com",
    "12345password",
    "Option 2"
  );
});

test("Sign in inline form", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const formLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await formLayoutsPage.submitInLineFormWithNameAndEmail(
    "test@test.com",
    "12345password",
    true
  );
});
