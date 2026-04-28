/**
 * Zod schema for US eviction rules dataset.
 *
 * Validates: app/data/us/evictionRules.js
 */

import { z } from "zod";

export const EvictionRuleSchema = z.object({
  stateCode: z.string().min(1),
  name: z.string().min(1),
  noticeForNonpayment: z.union([z.number(), z.string()]),
  noticeForLeaseViolation: z.union([z.number(), z.string()]),
  courtFilingTime: z.string().min(1),
  answerDeadline: z.union([z.number(), z.string()]),
  hearingTimeline: z.string().min(1),
  lockoutAllowedAfter: z.string().min(1),
  citations: z.array(z.string()),
});

export const EvictionRulesMapSchema = z.record(z.string(), EvictionRuleSchema);

export type EvictionRule = z.infer<typeof EvictionRuleSchema>;
export type EvictionRulesMap = z.infer<typeof EvictionRulesMapSchema>;
