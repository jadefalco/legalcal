interface ExtractedCitation {
  statute: string;
  url: string | null;
  excerpt: string;
  sourceType: string;
  confidence: number;
}

interface ExtractedRule {
  data: Record<string, unknown>;
  citations: ExtractedCitation[];
  notes: string[];
}

function extractUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s\)\"\'\>]+/gi;
  return Array.from(new Set(text.match(urlRegex) || []));
}

function extractStatuteReferences(text: string): string[] {
  // Match patterns like "Cal. Civ. Code § 1950.5", "42 U.S.C. § 1983", "NRS 118A.242"
  const patterns = [
    /(?:\b[A-Z][a-z]+\.?\s+)+(?:Civ\.?\s+)?Code\s+[§\u00A7]\s*\d+[\w\d\.\-]*/gi,
    /\b\d+\s+U\.S\.C\.\s+[§\u00A7]\s*\d+[\w\d\.\-]*/gi,
    /\b[A-Z]{2,5}\s+\d+[A-Z]?\.?\d+[\w\d\.\-]*/gi,
    /\b[A-Z]{2,5}\s+§\s*\d+[\w\d\.\-]*/gi,
    /\bSection\s+\d+[\w\d\.\-]*/gi,
  ];
  const found = new Set<string>();
  for (const pattern of patterns) {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach((m) => found.add(m.trim()));
    }
  }
  return Array.from(found);
}

function extractNumberFields(text: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lower = text.toLowerCase();

  // Days / deadlines
  const dayMatches = text.match(/(\d+)\s*days?/gi);
  if (dayMatches) {
    // Try to associate with context
    for (const match of dayMatches) {
      const num = parseInt(match.match(/\d+/)![0], 10);
      const idx = lower.indexOf(match.toLowerCase());
      const context = lower.slice(Math.max(0, idx - 60), idx + 60);
      if (context.includes("return") || context.includes("refund") || context.includes("deposit")) {
        result.returnDeadlineDays = num;
      } else if (context.includes("notice") || context.includes("terminate")) {
        result.noticePeriodDays = num;
      } else if (context.includes("pay") || context.includes("payment") || context.includes("check")) {
        result.paycheckDeadlineDays = num;
      } else if (!result.genericDeadlineDays) {
        result.genericDeadlineDays = num;
      }
    }
  }

  // Months rent / limits
  const monthRentMatch = text.match(/(\d+(?:\.\d+)?)\s*months?'?\s+rent/gi);
  if (monthRentMatch) {
    result.maxMonthsRent = parseFloat(monthRentMatch[0].match(/\d+(?:\.\d+)?/)![0]);
  }

  // Dollar amounts
  const dollarMatches = text.match(/\$?([\d,]+(?:\.\d+)?)\s*(dollars?)?/gi);
  if (dollarMatches && !result.maxMonthsRent) {
    for (const match of dollarMatches) {
      const num = parseFloat(match.replace(/[$,]/g, ""));
      if (num > 100 && num < 100000 && !result.maxDollarAmount) {
        result.maxDollarAmount = num;
        break;
      }
    }
  }

  // Percentages
  const percentMatches = text.match(/(\d+(?:\.\d+)?)\s*%/g);
  if (percentMatches) {
    result.interestRatePercent = parseFloat(percentMatches[0].match(/\d+(?:\.\d+)?/)![0]);
  }

  // Boolean fields from keywords
  if (lower.includes("itemized") || lower.includes("itemization")) {
    result.itemizedStatementRequired = !lower.includes("not required") && !lower.includes("no itemized");
  }
  if (lower.includes("nonrefundable") || lower.includes("non-refundable")) {
    result.nonrefundableFeesAllowed = !lower.includes("not allowed") && !lower.includes("prohibited");
  }
  if (lower.includes("pet deposit") || lower.includes("pet fee")) {
    result.separatePetDepositAllowed = !lower.includes("not allowed") && !lower.includes("prohibited");
  }
  if (lower.includes("penalty") || lower.includes("treble") || lower.includes("triple")) {
    result.penaltyMultiple = lower.includes("treble") || lower.includes("triple") ? 3 : 2;
  }

  return result;
}

function generateExcerpt(text: string, keyword: string, radius = 120): string {
  const idx = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (idx === -1) return "";
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + keyword.length + radius);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

export async function extractRuleFromSource(sourceText: string): Promise<ExtractedRule> {
  const data = extractNumberFields(sourceText);
  const citations: ExtractedCitation[] = [];
  const notes: string[] = [];

  // Extract statute references as citations
  const statutes = extractStatuteReferences(sourceText);
  const urls = extractUrls(sourceText);

  for (const statute of statutes.slice(0, 5)) {
    const excerpt = generateExcerpt(sourceText, statute);
    citations.push({
      statute,
      url: urls.find((u) => excerpt.includes(u)) ?? null,
      excerpt: excerpt.length > 300 ? excerpt.slice(0, 300) + "..." : excerpt,
      sourceType: "statute",
      confidence: 0.75,
    });
  }

  // If no statute references found, try to create a generic citation
  if (citations.length === 0 && urls.length > 0) {
    citations.push({
      statute: "Unknown statute",
      url: urls[0],
      excerpt: sourceText.slice(0, 300),
      sourceType: "other",
      confidence: 0.4,
    });
  }

  notes.push(`Extracted ${Object.keys(data).length} rule fields from source text.`);
  notes.push(`Identified ${citations.length} potential citations.`);

  if (data.returnDeadlineDays) {
    notes.push(`Return deadline: ${data.returnDeadlineDays} days.`);
  }
  if (data.noticePeriodDays) {
    notes.push(`Notice period: ${data.noticePeriodDays} days.`);
  }
  if (data.maxMonthsRent) {
    notes.push(`Maximum deposit: ${data.maxMonthsRent} months' rent.`);
  }

  return { data, citations, notes };
}
