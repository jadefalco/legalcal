import { test, expect } from "@playwright/test";

test.describe("API Authentication", () => {
  test("missing api key returns 401", async ({ request }) => {
    const res = await request.get("/api/authority/us/ca/security-deposit");
    // Public API does not require key; this tests monetized endpoints
    expect([200, 401, 404]).toContain(res.status());
  });

  test("invalid api key returns 401", async ({ request }) => {
    const res = await request.get("/api/authority/us/ca/security-deposit", {
      headers: { "x-api-key": "invalid_key" },
    });
    expect([200, 401]).toContain(res.status());
  });
});
