import { getRuleFromBundle } from "./bundle";
import type { LegalRuleBlock } from "@/data/authority/schema";

export function getRule(
  state: string,
  topic: string,
  city?: string
): LegalRuleBlock | null {
  const rule = getRuleFromBundle(state, topic);
  if (!rule) {
    return null;
  }

  // If city is specified, we would need city-level override logic here.
  // For now, city overrides are merged at ingestion time into the bundle.
  return rule;
}
