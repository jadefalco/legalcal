-- Migration: Add statute snapshot and alert tables for automated change detection

CREATE TABLE IF NOT EXISTS statute_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  citation_id INTEGER NOT NULL,
  fetched_at TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  content_text TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (citation_id) REFERENCES citations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS statute_alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  citation_id INTEGER NOT NULL,
  rule_id INTEGER NOT NULL,
  detected_at TEXT NOT NULL,
  old_hash TEXT NOT NULL,
  new_hash TEXT NOT NULL,
  diff_text TEXT NOT NULL,
  acknowledged INTEGER NOT NULL DEFAULT 0,
  acknowledged_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (citation_id) REFERENCES citations(id) ON DELETE CASCADE,
  FOREIGN KEY (rule_id) REFERENCES rules(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_snapshots_citation_id ON statute_snapshots(citation_id);
CREATE INDEX IF NOT EXISTS idx_alerts_citation_id ON statute_alerts(citation_id);
CREATE INDEX IF NOT EXISTS idx_alerts_rule_id ON statute_alerts(rule_id);
CREATE INDEX IF NOT EXISTS idx_alerts_acknowledged ON statute_alerts(acknowledged);
