import { getDb, closeDb } from "@/lib/authority/db";

describe("Statute Change Detection", () => {
  beforeAll(() => {
    getDb();
  });

  afterAll(() => {
    closeDb();
  });

  it("has required tables for change detection", () => {
    const db = getDb();
    const tables = db
      .prepare(
        `SELECT name FROM sqlite_master WHERE type='table' AND name IN ('statute_snapshots', 'statute_alerts')`
      )
      .all() as { name: string }[];
    const names = tables.map((t) => t.name);
    expect(names).toContain("statute_snapshots");
    expect(names).toContain("statute_alerts");
  });

  it("has required indexes on statute tables", () => {
    const db = getDb();
    const indexes = db
      .prepare(
        `SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_snapshots%' OR name LIKE 'idx_alerts%'`
      )
      .all() as { name: string }[];
    const names = indexes.map((i) => i.name);
    expect(names).toContain("idx_snapshots_citation_id");
    expect(names).toContain("idx_alerts_citation_id");
    expect(names).toContain("idx_alerts_rule_id");
    expect(names).toContain("idx_alerts_acknowledged");
  });

  it("has correct columns on statute_snapshots", () => {
    const db = getDb();
    const columns = db
      .prepare(`PRAGMA table_info(statute_snapshots)`)
      .all() as { name: string }[];
    const names = columns.map((c) => c.name);
    expect(names).toContain("id");
    expect(names).toContain("citation_id");
    expect(names).toContain("fetched_at");
    expect(names).toContain("content_hash");
    expect(names).toContain("content_text");
  });
});
