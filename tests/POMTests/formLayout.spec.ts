import { test } from "@playwright/test";
import { PageManager } from "../../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("sign in using the grid", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.E2E_USERNAME,
      process.env.E2E_PASSWORD,
      "Option 2"
    );
});

test("Sign in inline form", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutPage()
    .submitInLineFormWithNameAndEmail("test@test.com", "12345password", true);
});
