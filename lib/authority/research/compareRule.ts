interface ComparisonResult {
  missingFields: string[];
  outdatedFields: string[];
  inconsistentFields: string[];
  suggestedUpdates: Record<string, unknown>;
  notes: string[];
}

function findMentions(text: string, fieldName: string): boolean {
  const lower = text.toLowerCase();
  const mappings: Record<string, string[]> = {
    returnDeadlineDays: ["return", "refund", "deposit back", "days"],
    noticePeriodDays: ["notice", "terminate", "termination", "days notice"],
    paycheckDeadlineDays: ["paycheck", "final pay", "wages", "days"],
    maxMonthsRent: ["month", "rent", "deposit limit", "security deposit"],
    maxDollarAmount: ["dollar", "$", "amount", "limit"],
    itemizedStatementRequired: ["itemized", "itemization", "statement"],
    nonrefundableFeesAllowed: ["nonrefundable", "non-refundable", "fee"],
    separatePetDepositAllowed: ["pet deposit", "pet fee", "animal"],
    penaltyMultiple: ["penalty", "treble", "triple", "damages"],
    interestRatePercent: ["interest", "percent", "%"],
  };
  const keywords = mappings[fieldName] || [fieldName.toLowerCase()];
  return keywords.some((k) => lower.includes(k));
}

function extractValueFromText(text: string, fieldName: string): unknown | undefined {
  const lower = text.toLowerCase();

  if (fieldName === "returnDeadlineDays" || fieldName === "noticePeriodDays" || fieldName === "paycheckDeadlineDays") {
    const matches = text.match(/(\d+)\s*days?/gi);
    if (matches) {
      for (const match of matches) {
        const num = parseInt(match.match(/\d+/)![0], 10);
        const idx = lower.indexOf(match.toLowerCase());
        const context = lower.slice(Math.max(0, idx - 60), idx + 60);
        if (fieldName === "returnDeadlineDays" && (context.includes("return") || context.includes("refund") || context.includes("deposit"))) {
          return num;
        }
        if (fieldName === "noticePeriodDays" && (context.includes("notice") || context.includes("terminate"))) {
          return num;
        }
        if (fieldName === "paycheckDeadlineDays" && (context.includes("pay") || context.includes("wage") || context.includes("check"))) {
          return num;
        }
      }
    }
  }

  if (fieldName === "maxMonthsRent") {
    const match = text.match(/(\d+(?:\.\d+)?)\s*months?'?\s+rent/gi);
    if (match) return parseFloat(match[0].match(/\d+(?:\.\d+)?/)![0]);
  }

  if (fieldName === "interestRatePercent") {
    const match = text.match(/(\d+(?:\.\d+)?)\s*%/g);
    if (match) return parseFloat(match[0].match(/\d+(?:\.\d+)?/)![0]);
  }

  if (fieldName === "penaltyMultiple") {
    if (lower.includes("treble") || lower.includes("triple")) return 3;
    if (lower.includes("double") || lower.includes("twice")) return 2;
  }

  if (fieldName === "itemizedStatementRequired") {
    return lower.includes("itemized") && !lower.includes("not required");
  }
  if (fieldName === "nonrefundableFeesAllowed") {
    return lower.includes("nonrefundable") && !lower.includes("prohibited");
  }
  if (fieldName === "separatePetDepositAllowed") {
    return lower.includes("pet deposit") && !lower.includes("prohibited");
  }

  return undefined;
}

export function compareRuleToSource(
  existingRuleData: Record<string, unknown>,
  sourceText: string
): ComparisonResult {
  const missingFields: string[] = [];
  const outdatedFields: string[] = [];
  const inconsistentFields: string[] = [];
  const suggestedUpdates: Record<string, unknown> = {};
  const notes: string[] = [];

  const sourceValues: Record<string, unknown> = {};

  for (const key of Object.keys(existingRuleData)) {
    const extracted = extractValueFromText(sourceText, key);
    if (extracted !== undefined) {
      sourceValues[key] = extracted;
    }
  }

  // Check existing fields against source
  for (const [key, existingValue] of Object.entries(existingRuleData)) {
    const sourceValue = sourceValues[key];
    const mentioned = findMentions(sourceText, key);

    if (!mentioned && sourceValue === undefined) {
      // Field not mentioned in source at all — could be missing context
      missingFields.push(key);
      notes.push(`Field "${key}" not found in source text. May need manual verification.`);
      continue;
    }

    if (sourceValue !== undefined && sourceValue !== existingValue) {
      outdatedFields.push(key);
      suggestedUpdates[key] = sourceValue;
      notes.push(`Field "${key}" may be outdated. Source suggests: ${JSON.stringify(sourceValue)} (existing: ${JSON.stringify(existingValue)}).`);
    }
  }

  // Check for new fields in source not in existing rule
  const commonFields = [
    "returnDeadlineDays",
    "noticePeriodDays",
    "paycheckDeadlineDays",
    "maxMonthsRent",
    "maxDollarAmount",
    "itemizedStatementRequired",
    "nonrefundableFeesAllowed",
    "separatePetDepositAllowed",
    "penaltyMultiple",
    "interestRatePercent",
  ];

  for (const field of commonFields) {
    if (!(field in existingRuleData)) {
      const extracted = extractValueFromText(sourceText, field);
      if (extracted !== undefined) {
        suggestedUpdates[field] = extracted;
        notes.push(`New field "${field}" detected in source: ${JSON.stringify(extracted)}.`);
      }
    }
  }

  // Detect inconsistencies
  if (
    "returnDeadlineDays" in sourceValues &&
    "noticePeriodDays" in sourceValues &&
    sourceValues.returnDeadlineDays === sourceValues.noticePeriodDays
  ) {
    inconsistentFields.push("returnDeadlineDays and noticePeriodDays have same value — verify context.");
  }

  notes.push(`Comparison complete. ${outdatedFields.length} outdated, ${missingFields.length} missing, ${Object.keys(suggestedUpdates).length} suggested updates.`);

  return {
    missingFields,
    outdatedFields,
    inconsistentFields,
    suggestedUpdates,
    notes,
  };
}
