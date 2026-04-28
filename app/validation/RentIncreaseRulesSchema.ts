/**
 * Zod schema for US rent increase rules dataset.
 *
 * Validates: app/data/us/rentIncreaseRules.js
 */

import { z } from "zod";

export const RentIncreaseRuleSchema = z.object({
  stateCode: z.string().min(1),
  name: z.string().min(1),
  noticePeriodDays: z.union([z.number(), z.string()]),
  rentControl: z.union([z.boolean(), z.string()]),
  additionalRequirements: z.string().min(1),
  exceptions: z.string(),
  citations: z.array(z.string()),
});

export const RentIncreaseRulesMapSchema = z.record(z.string(), RentIncreaseRuleSchema);

export type RentIncreaseRule = z.infer<typeof RentIncreaseRuleSchema>;
export type RentIncreaseRulesMap = z.infer<typeof RentIncreaseRulesMapSchema>;
