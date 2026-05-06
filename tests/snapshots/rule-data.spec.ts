import { getRule } from "@/lib/authority/query";

const snapshotTopics = [
  { state: "ca", topic: "security-deposit" },
  { state: "ny", topic: "security-deposit" },
  { state: "tx", topic: "security-deposit" },
];

describe("Rule Data Snapshots", () => {
  for (const { state, topic } of snapshotTopics) {
    it(`matches snapshot for ${state}/${topic}`, () => {
      const rule = getRule(state, topic);
      expect(rule).not.toBeNull();
      expect(rule?.data).toMatchSnapshot(`rule-${state}-${topic}`);
    });
  }
});
