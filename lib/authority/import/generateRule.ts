import { extractRuleFromSource } from "../research/extractRule";

interface GeneratedRule {
  data: Record<string, unknown>;
  citations: {
    statute: string;
    url: string | null;
    excerpt: string;
    sourceType: string;
    confidence: number;
  }[];
  notes: string[];
}

export async function generateRuleFromStatute(
  statuteText: string
): Promise<GeneratedRule> {
  const result = await extractRuleFromSource(statuteText);
  return {
    data: result.data,
    citations: result.citations,
    notes: result.notes,
  };
}
