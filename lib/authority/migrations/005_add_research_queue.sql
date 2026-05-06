-- Migration: Add research queue for AI-assisted research tracking

CREATE TABLE IF NOT EXISTS research_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jurisdiction_id INTEGER NOT NULL,
  topic_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  assigned_to TEXT,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id) ON DELETE CASCADE,
  FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
  UNIQUE(jurisdiction_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_research_queue_jurisdiction_id ON research_queue(jurisdiction_id);
CREATE INDEX IF NOT EXISTS idx_research_queue_topic_id ON research_queue(topic_id);
CREATE INDEX IF NOT EXISTS idx_research_queue_status ON research_queue(status);
