import { test, expect } from "@playwright/test";

const adminPages = [
  "/admin",
  "/admin/authority",
  "/admin/authority/review",
  "/admin/authority/export",
  "/admin/widgets",
];

for (const path of adminPages) {
  test(`admin page loads: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("body")).toBeVisible();
    // Admin shell should be present
    await expect(page.locator("text=LegalCals Authority Admin")).toBeVisible();
  });
}
