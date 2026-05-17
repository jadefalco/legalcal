import { useMemo } from "react";
import { getRuleFromBundle } from "@/lib/authority/bundle";
import { getRuleFreshness } from "@/lib/authority/freshness";

export function useRuleFreshness(topic: string, jurisdiction: string) {
  return useMemo(() => {
    const rule = getRuleFromBundle(jurisdiction, topic);
    if (!rule) return null;
    return getRuleFreshness(rule);
  }, [topic, jurisdiction]);
}
