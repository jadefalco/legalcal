/**
 * Zod schema for US security-deposit rules dataset.
 *
 * Validates: app/data/us/securityDepositRules.js
 */

import { z } from "zod";

export const SecurityDepositRuleSchema = z.object({
  stateCode: z.string().min(1),
  name: z.string().min(1),
  maxDeposit: z.string().min(1),
  returnDeadline: z.union([z.number(), z.string()]),
  itemizedStatementRequired: z.boolean(),
  interestRequired: z.boolean(),
  petDepositRules: z.string().min(1),
  allowedDeductions: z.string().min(1),
  citations: z.array(z.string()),
});

export const SecurityDepositRulesMapSchema = z.record(
  z.string(),
  SecurityDepositRuleSchema
);

export type SecurityDepositRule = z.infer<typeof SecurityDepositRuleSchema>;
export type SecurityDepositRulesMap = z.infer<
  typeof SecurityDepositRulesMapSchema
>;
