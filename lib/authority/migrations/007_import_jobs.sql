-- Migration: Add import jobs and import logs for bulk state code importing

CREATE TABLE IF NOT EXISTS import_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  state TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  started_at TEXT DEFAULT CURRENT_TIMESTAMP,
  finished_at TEXT,
  error_message TEXT
);

CREATE TABLE IF NOT EXISTS import_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  statute_url TEXT NOT NULL,
  topic TEXT,
  action TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES import_jobs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_import_jobs_state ON import_jobs(state);
CREATE INDEX IF NOT EXISTS idx_import_logs_job_id ON import_logs(job_id);
