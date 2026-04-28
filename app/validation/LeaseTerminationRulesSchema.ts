/**
 * Zod schema for US lease termination rules dataset.
 *
 * Validates: app/data/us/leaseTerminationRules.js
 */

import { z } from "zod";

export const LeaseTerminationRuleSchema = z.object({
  stateCode: z.string().min(1),
  name: z.string().min(1),
  monthToMonthNoticeDays: z.union([z.number(), z.string()]),
  fixedTermEarlyTerminationRules: z.string().min(1),
  domesticViolenceProtections: z.union([z.string(), z.null()]),
  additionalRequirements: z.union([z.string(), z.null()]),
  exceptions: z.union([z.string(), z.null()]),
  citations: z.array(z.string()),
});

export const LeaseTerminationRulesMapSchema = z.record(
  z.string(),
  LeaseTerminationRuleSchema
);

export type LeaseTerminationRule = z.infer<typeof LeaseTerminationRuleSchema>;
export type LeaseTerminationRulesMap = z.infer<
  typeof LeaseTerminationRulesMapSchema
>;
