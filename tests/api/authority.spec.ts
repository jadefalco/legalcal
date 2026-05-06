import { getRule } from "@/lib/authority/query";
import { getDb, closeDb } from "@/lib/authority/db";

describe("Authority API", () => {
  afterAll(() => {
    closeDb();
  });

  it("returns a rule for a valid state + topic", () => {
    const rule = getRule("ca", "security-deposit");
    expect(rule).not.toBeNull();
    expect(rule?.data).toBeDefined();
    expect(rule?.citations).toBeInstanceOf(Array);
    expect(rule?.version).toBeDefined();
  });

  it("returns null for an invalid state", () => {
    const rule = getRule("xx", "security-deposit");
    expect(rule).toBeNull();
  });

  it("returns null for an invalid topic", () => {
    const rule = getRule("ca", "nonexistent-topic");
    expect(rule).toBeNull();
  });

  it("has consistent response shape across all states for a topic", () => {
    const states = ["ca", "ny", "tx", "fl"];
    for (const state of states) {
      const rule = getRule(state, "security-deposit");
      if (rule) {
        expect(rule).toHaveProperty("data");
        expect(rule).toHaveProperty("citations");
        expect(rule).toHaveProperty("version");
        expect(rule.version).toHaveProperty("version");
        expect(rule.version).toHaveProperty("effectiveDate");
      }
    }
  });
});
