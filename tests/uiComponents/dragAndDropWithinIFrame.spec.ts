import { test, expect } from "@playwright/test";

test("drag and drop", async ({ page }) => {
  await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
  const frame = page.frameLocator(
    "iframe[data-src='../../demoSite/practice/droppable/photo-manager.html']"
  );
  await frame
    .locator("li", { hasText: "High Tatras 2" })
    .dragTo(frame.locator("#trash"));

  await frame.locator("li", { hasText: "High Tatras 4" }).hover();
  await page.mouse.down();
  await frame.locator("#trash").hover();
  await page.mouse.up();

  await expect(frame.locator("#trash li h5")).toHaveText([
    "High Tatras 2",
    "High Tatras 4",
  ]);
});
