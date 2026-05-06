-- Migration: Document Templates and Document Logs

CREATE TABLE IF NOT EXISTS document_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  template_html TEXT NOT NULL,
  required_fields TEXT NOT NULL DEFAULT '[]',
  auto_fields TEXT NOT NULL DEFAULT '[]',
  jurisdiction_scopes TEXT NOT NULL DEFAULT '[]',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_id INTEGER NOT NULL,
  api_key_id INTEGER,
  jurisdiction TEXT NOT NULL,
  topic TEXT NOT NULL,
  timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT,
  FOREIGN KEY (template_id) REFERENCES document_templates(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_document_templates_slug ON document_templates(slug);
CREATE INDEX IF NOT EXISTS idx_document_logs_template_id ON document_logs(template_id);
CREATE INDEX IF NOT EXISTS idx_document_logs_timestamp ON document_logs(timestamp);
