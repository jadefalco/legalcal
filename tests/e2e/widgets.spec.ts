import { test, expect } from "@playwright/test";

test.describe("Widget Embeds", () => {
  test("iframe embed loads calculator", async ({ page }) => {
    await page.goto("/embed/security-deposit?state=ca&theme=light");
    await expect(page.locator("body")).toBeVisible();
  });

  test("embed.js script is publicly accessible", async ({ request }) => {
    const res = await request.get("/embed.js");
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain("LegalCals Embed Script");
  });
});
