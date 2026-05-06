-- Migration: Add review metadata table for research workflow

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rule_id INTEGER NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'placeholder',
  reviewer TEXT,
  reviewed_at TEXT,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rule_id) REFERENCES rules(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reviews_rule_id ON reviews(rule_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
