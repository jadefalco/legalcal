/**
 * Zod schema for Canada eviction rules dataset.
 *
 * Validates: app/data/ca/evictionRules.js
 */

import { z } from "zod";

export const CanadaEvictionRuleSchema = z.object({
  provinceCode: z.string().min(1),
  name: z.string().min(1),
  noticeForNonpayment: z.union([z.number(), z.string()]),
  noticeForLeaseViolation: z.union([z.number(), z.string()]),
  courtFilingTime: z.string().min(1),
  answerDeadline: z.union([z.number(), z.string()]),
  hearingTimeline: z.string().min(1),
  lockoutAllowedAfter: z.string().min(1),
  citations: z.array(z.string()),
});

export const CanadaEvictionRulesMapSchema = z.record(
  z.string(),
  CanadaEvictionRuleSchema
);

export type CanadaEvictionRule = z.infer<typeof CanadaEvictionRuleSchema>;
export type CanadaEvictionRulesMap = z.infer<
  typeof CanadaEvictionRulesMapSchema
>;
