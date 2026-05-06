import { test, expect } from "@playwright/test";

const calculators = [
  "security-deposit",
  "eviction-timeline",
  "notice-period",
  "lease-termination",
];

for (const calc of calculators) {
  test.describe(`Calculator: ${calc}`, () => {
    test("loads and renders UI", async ({ page }) => {
      await page.goto(`/calculators/us/ca/${calc}`);
      await expect(page.locator("body")).toContainText(/California/i);
    });

    test("has no console errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });

      await page.goto(`/calculators/us/ca/${calc}`);
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  });
}
