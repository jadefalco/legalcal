import { getDb, closeDb } from "@/lib/authority/db";

describe("Bulk Importer", () => {
  beforeAll(() => {
    getDb();
  });

  afterAll(() => {
    closeDb();
  });

  it("has required tables for import jobs", () => {
    const db = getDb();
    const tables = db
      .prepare(
        `SELECT name FROM sqlite_master WHERE type='table' AND name IN ('import_jobs', 'import_logs', 'research_queue')`
      )
      .all() as { name: string }[];
    const names = tables.map((t) => t.name);
    expect(names).toContain("import_jobs");
    expect(names).toContain("import_logs");
    expect(names).toContain("research_queue");
  });

  it("can create and update an import job", () => {
    const db = getDb();
    const result = db
      .prepare("INSERT INTO import_jobs (state) VALUES (?)")
      .run("ca");
    const jobId = result.lastInsertRowid;

    expect(typeof jobId).toBe("number");

    db.prepare(
      "UPDATE import_jobs SET status = ?, finished_at = datetime('now') WHERE id = ?"
    ).run("completed", jobId);

    const job = db
      .prepare("SELECT * FROM import_jobs WHERE id = ?")
      .get(jobId) as { status: string };

    expect(job.status).toBe("completed");
  });
});
