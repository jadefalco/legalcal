interface TopicMapping {
  keywords: string[];
  topic: string;
}

const TOPIC_MAPPINGS: TopicMapping[] = [
  { keywords: ["security deposit", "deposit return", "tenant deposit"], topic: "security-deposit" },
  { keywords: ["late fee", "late charge", "late payment fee"], topic: "late-fee" },
  { keywords: ["notice to enter", "landlord entry", "entry notice"], topic: "entry-notice" },
  { keywords: ["rent increase", "rent control", "rent stabilization"], topic: "rent-increase" },
  { keywords: ["eviction", "unlawful detainer", "forcible entry"], topic: "eviction-timeline" },
  { keywords: ["lease termination", "terminate lease", "end lease"], topic: "lease-termination" },
  { keywords: ["notice period", "termination notice", "move out notice"], topic: "notice-period" },
  { keywords: ["repair and deduct", "habitability", "repair deductible"], topic: "repair-deduct" },
  { keywords: ["rent receipt", "payment receipt"], topic: "rent-receipt" },
  { keywords: ["withhold rent", "rent withholding"], topic: "withhold-rent" },
];

/**
 * Classify a statute text into a LegalCals topic using keyword heuristics.
 * Returns null if no match is found.
 *
 * Architecture note: replace this function with an LLM call
 * (e.g., OpenAI/Anthropic) when ready for production use.
 */
export function classifyTopic(statuteText: string): string | null {
  const lower = statuteText.toLowerCase();

  for (const mapping of TOPIC_MAPPINGS) {
    const match = mapping.keywords.some((kw) => lower.includes(kw.toLowerCase()));
    if (match) {
      return mapping.topic;
    }
  }

  return null;
}
