import { getRuleFromBundle } from "@/lib/authority/bundle";

describe("BC Authority Rules", () => {
  const bcTopics = [
    "security-deposit",
    "rent-increase",
    "entry-notice",
    "repair-request",
    "deposit-return",
    "condition-inspection",
    "ending-tenancy",
  ];

  bcTopics.forEach((topic) => {
    it(`returns a valid rule for bc / ${topic}`, () => {
      const rule = getRuleFromBundle("bc", topic);
      expect(rule).not.toBeNull();
      expect(rule!.data).toBeDefined();
      expect(Array.isArray(rule!.citations)).toBe(true);
      expect(rule!.citations.length).toBeGreaterThan(0);
      expect(rule!.version).toBeDefined();
      expect(rule!.version.version).toBeTruthy();
    });
  });

  it("security-deposit has expected data fields", () => {
    const rule = getRuleFromBundle("bc", "security-deposit")!;
    const data = rule.data as Record<string, unknown>;
    expect(data.maxDepositMonths).toBe(0.5);
    expect(data.returnDeadlineDays).toBe(15);
    expect(data.itemizedStatementRequired).toBe(true);
  });

  it("rent-increase has expected data fields", () => {
    const rule = getRuleFromBundle("bc", "rent-increase")!;
    const data = rule.data as Record<string, unknown>;
    expect(data.rentIncreaseLimit).toBe(3.5);
    expect(data.noticePeriodDays).toBe(90);
  });

  it("entry-notice has expected data fields", () => {
    const rule = getRuleFromBundle("bc", "entry-notice")!;
    const data = rule.data as Record<string, unknown>;
    expect(data.noticeHours).toBe(24);
    expect(data.noticeRequired).toBe(true);
  });

  it("repair-request has expected data fields", () => {
    const rule = getRuleFromBundle("bc", "repair-request")!;
    const data = rule.data as Record<string, unknown>;
    expect(data.repairUrgentTimelineHours).toBe(24);
    expect(data.repairNonUrgentTimelineDays).toBe(7);
  });

  it("deposit-return has expected data fields", () => {
    const rule = getRuleFromBundle("bc", "deposit-return")!;
    const data = rule.data as Record<string, unknown>;
    expect(data.returnDeadlineDays).toBe(15);
    expect(data.itemizedStatementRequired).toBe(true);
  });

  it("condition-inspection has expected data fields", () => {
    const rule = getRuleFromBundle("bc", "condition-inspection")!;
    const data = rule.data as Record<string, unknown>;
    expect(data.inspectionRequired).toBe(true);
    expect(data.moveInInspection).toBe(true);
    expect(data.moveOutInspection).toBe(true);
  });

  it("ending-tenancy has expected data fields", () => {
    const rule = getRuleFromBundle("bc", "ending-tenancy")!;
    const data = rule.data as Record<string, unknown>;
    expect(data.tenantNoticePeriodDays).toBe(30);
    expect(data.landlordNoticePeriodDays).toBe(30);
  });
});
