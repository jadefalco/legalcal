/**
 * Jest global setup
 */

// Ensure test database path is isolated
process.env.AUTHORITY_DB_PATH = ":memory:";
