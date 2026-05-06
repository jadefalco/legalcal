import {
  getDb,
  closeDb,
  createApiKey,
  getApiKey,
  logApiUsage,
  getMonthlyUsage,
  getRecentUsage,
  getTierLimits,
} from "@/lib/authority/db";

describe("Rate Limiting", () => {
  beforeAll(() => {
    getDb();
  });

  afterAll(() => {
    closeDb();
  });

  it("tracks API usage", async () => {
    const key = await createApiKey(
      "Rate Limit Test",
      "ratelimit@example.com",
      "free"
    );
    const record = await getApiKey(key);
    expect(record).not.toBeNull();

    // Log multiple usages
    for (let i = 0; i < 5; i++) {
      await logApiUsage(
        record!.id,
        "/api/authority/us/ca/security-deposit",
        200,
        50
      );
    }

    const monthly = await getMonthlyUsage(record!.id);
    expect(monthly).toBeGreaterThanOrEqual(5);
  });

  it("respects tier quotas", async () => {
    const limits = await getTierLimits("free");
    expect(limits.monthlyQuota).toBe(1000);
    expect(limits.rateLimitPerMinute).toBe(30);
  });

  it("tracks recent usage within a window", async () => {
    const key = await createApiKey(
      "Recent Test",
      "recent@example.com",
      "free"
    );
    const record = await getApiKey(key);

    await logApiUsage(record!.id, "/api/test", 200, 10);
    await logApiUsage(record!.id, "/api/test", 200, 10);

    const recent = await getRecentUsage(record!.id, 1);
    expect(recent).toBeGreaterThanOrEqual(2);
  });
});
