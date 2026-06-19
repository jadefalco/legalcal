/**
 * Simple in-memory temporary session store for form data during checkout flows.
 * Sessions expire automatically after 1 hour.
 */

import { randomBytes } from "crypto";

interface SessionEntry {
  data: Record<string, unknown>;
  createdAt: number;
}

const sessions = new Map<string, SessionEntry>();
const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour

function cleanup() {
  const now = Date.now();
  sessions.forEach((entry, id) => {
    if (now - entry.createdAt > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  });
}

// Run cleanup every 5 minutes
setInterval(cleanup, 5 * 60 * 1000);

export function createSession(data: Record<string, unknown>): string {
  const id = randomBytes(32).toString("hex");
  sessions.set(id, { data, createdAt: Date.now() });
  return id;
}

export function getSession(id: string): Record<string, unknown> | null {
  const entry = sessions.get(id);
  if (!entry) return null;
  if (Date.now() - entry.createdAt > SESSION_TTL_MS) {
    sessions.delete(id);
    return null;
  }
  return entry.data;
}

export function deleteSession(id: string): void {
  sessions.delete(id);
}
