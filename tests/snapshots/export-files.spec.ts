import fs from "fs";
import path from "path";

describe("Export File Snapshots", () => {
  it("produces valid JSON for CA security-deposit", () => {
    const exportPath = path.join(
      process.cwd(),
      "data",
      "export",
      "us",
      "ca",
      "security-deposit.json"
    );

    if (!fs.existsSync(exportPath)) {
      console.warn("Export file not found, skipping snapshot test");
      return;
    }

    const content = fs.readFileSync(exportPath, "utf-8");
    const parsed = JSON.parse(content);

    expect(parsed).toHaveProperty("jurisdiction");
    expect(parsed).toHaveProperty("topic");
    expect(parsed).toHaveProperty("rule");
    expect(parsed).toHaveProperty("review");
    expect(parsed).toHaveProperty("exportedAt");
    expect(parsed.jurisdiction).toHaveProperty("state");
    expect(parsed.jurisdiction.state).toBe("ca");
  });
});
