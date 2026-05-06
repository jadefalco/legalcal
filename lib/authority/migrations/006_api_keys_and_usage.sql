-- Migration: Add API keys, usage logs, and billing tiers

CREATE TABLE IF NOT EXISTS api_tiers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  monthly_quota INTEGER NOT NULL,
  rate_limit_per_minute INTEGER NOT NULL,
  overage_price_per_1000 REAL NOT NULL
);

INSERT OR IGNORE INTO api_tiers (name, monthly_quota, rate_limit_per_minute, overage_price_per_1000)
VALUES
  ('free', 1000, 30, 5),
  ('pro', 100000, 300, 2),
  ('enterprise', 1000000, 2000, 1);

CREATE TABLE IF NOT EXISTS api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  owner_name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'free',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  last_used_at TEXT,
  FOREIGN KEY (tier) REFERENCES api_tiers(name)
);

CREATE TABLE IF NOT EXISTS api_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key_id INTEGER NOT NULL,
  route TEXT NOT NULL,
  timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER NOT NULL,
  FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(key);
CREATE INDEX IF NOT EXISTS idx_api_keys_active ON api_keys(active);
CREATE INDEX IF NOT EXISTS idx_api_usage_api_key_id ON api_usage(api_key_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_timestamp ON api_usage(timestamp);
CREATE INDEX IF NOT EXISTS idx_api_usage_route ON api_usage(route);
