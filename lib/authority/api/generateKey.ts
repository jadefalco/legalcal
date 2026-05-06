import { randomBytes } from "crypto";

export function generateApiKey(): string {
  return `lc_${randomBytes(32).toString("hex")}`;
}
