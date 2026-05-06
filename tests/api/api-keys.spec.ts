import {
  getDb,
  closeDb,
  createApiKey,
  listApiKeys,
  getApiKey,
  updateApiKeyStatus,
  regenerateApiKey,
} from "@/lib/authority/db";

describe("API Keys", () => {
  beforeAll(() => {
    getDb();
  });

  afterAll(() => {
    closeDb();
  });

  it("creates an API key", async () => {
    const key = await createApiKey("Test User", "test@example.com", "free");
    expect(typeof key).toBe("string");
    expect(key).toMatch(/^lc_/);
  });

  it("lists API keys", async () => {
    await createApiKey("List Test", "list@example.com", "free");
    const keys = await listApiKeys();
    expect(Array.isArray(keys)).toBe(true);
    expect(keys.length).toBeGreaterThan(0);
    expect(keys[0]).toHaveProperty("active");
  });

  it("validates an active key", async () => {
    const key = await createApiKey("Valid Test", "valid@example.com", "free");
    const record = await getApiKey(key);
    expect(record).not.toBeNull();
    expect(record?.active).toBe(true);
  });

  it("returns null for an invalid key", async () => {
    const record = await getApiKey("lc_invalid_key_12345");
    expect(record).toBeNull();
  });

  it("deactivates a key", async () => {
    const key = await createApiKey(
      "Deactivate Test",
      "deactivate@example.com",
      "free"
    );
    const before = await getApiKey(key);
    expect(before?.active).toBe(true);

    await updateApiKeyStatus(before!.id, false);
    const after = await getApiKey(key);
    expect(after?.active).toBe(false);
  });

  it("regenerates a key", async () => {
    const oldKey = await createApiKey(
      "Regen Test",
      "regen@example.com",
      "free"
    );
    const record = await getApiKey(oldKey);
    const newKey = await regenerateApiKey(record!.id);

    expect(newKey).not.toBe(oldKey);
    expect(await getApiKey(oldKey)).toBeNull();
    expect(await getApiKey(newKey)).not.toBeNull();
  });
});
