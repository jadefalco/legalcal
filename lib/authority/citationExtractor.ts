/**
 * Citation Auto-Extractor
 * Parses HTML to discover statutory references, section numbers, and excerpts.
 */

export interface ExtractedCitation {
  statute: string;
  section: string;
  url: string;
  excerpt: string;
  confidence: number;
}

// Common statute keywords used to identify legislative references
const STATUTE_KEYWORDS = [
  "Act",
  "Code",
  "Statute",
  "Regulation",
  "Ordinance",
  "Law",
  "Decree",
];

// Patterns that identify section references (capture group 1 = section number)
const SECTION_PATTERNS = [
  // "s. 45", "s.45", "s 45", "sec. 45", "sec 45", "section 45", "Section 45(1)"
  /\b(?:s|sec|sect|section)\.?\s*(\d[\w\-.()]*)/gi,
  // "§ 8-101", "§8.101", "§ 45(1)"
  /\u00A7\s*(\d[\w\-.()]*)/g,
];

// Pattern to find statute names: "Something Act", "Something Code", etc.
// Avoids matching leading words like "The", "Under", "In", "Of", etc.
const STATUTE_NAME_PATTERN = new RegExp(
  `\\b([A-Z][A-Za-z\\s'&]+(?:${STATUTE_KEYWORDS.join("|")}))\\b`,
  "g"
);

const LEADING_NOISE_WORDS = /^(?:under\s+|the\s+|in\s+|of\s+|pursuant\s+to\s+|according\s+to\s+|per\s+|by\s+)/i;

// Clean HTML to plain text
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Extract sentences around a match
function extractExcerpt(text: string, matchIndex: number, matchLength: number): string {
  const sentenceEnders = /[.!?]/;
  let start = matchIndex;
  let end = matchIndex + matchLength;

  // Walk backward to find sentence start (or reasonable boundary)
  let sentencesBack = 0;
  while (start > 0 && sentencesBack < 1) {
    start--;
    if (sentenceEnders.test(text[start])) {
      sentencesBack++;
    }
  }
  start = Math.max(0, start + 1);

  // Walk forward to find sentence end
  let sentencesForward = 0;
  while (end < text.length && sentencesForward < 2) {
    if (sentenceEnders.test(text[end])) {
      sentencesForward++;
    }
    end++;
  }

  let excerpt = text.slice(start, end).trim();
  // Clean up whitespace
  excerpt = excerpt.replace(/\s+/g, " ");
  // Limit length
  if (excerpt.length > 400) {
    excerpt = excerpt.slice(0, 400) + "…";
  }
  return excerpt;
}

// Score confidence based on what we found
function scoreConfidence(hasStatute: boolean, hasSection: boolean, excerptQuality: number): number {
  if (hasStatute && hasSection) {
    return Math.min(0.95, 0.7 + excerptQuality * 0.25);
  }
  if (hasStatute) {
    return Math.min(0.7, 0.4 + excerptQuality * 0.25);
  }
  if (hasSection) {
    return Math.min(0.5, 0.2 + excerptQuality * 0.2);
  }
  return 0.1;
}

// Assess excerpt quality (length, presence of digits, etc.)
function assessExcerptQuality(excerpt: string): number {
  let score = 0;
  if (excerpt.length > 80) score += 0.3;
  else if (excerpt.length > 40) score += 0.15;
  if (/\d/.test(excerpt)) score += 0.3;
  if (/\b(?:tenant|landlord|rent|lease|deposit|eviction|notice|termination)\b/i.test(excerpt)) {
    score += 0.4;
  }
  return Math.min(1, score);
}

// Try to build a deep link if the URL supports fragment or query-based anchors
function buildDeepLink(baseUrl: string, _statute: string, section: string): string {
  if (!baseUrl) return "";

  const [urlBase] = baseUrl.split("#");
  if (section && /^\d/.test(section)) {
    return `${urlBase}#sec-${section.replace(/[()]/g, "").replace(/\./g, "-")}`;
  }
  return baseUrl;
}

// Clean up a statute name by removing leading noise words
function cleanStatuteName(name: string): string {
  let cleaned = name.trim();
  let prev = "";
  while (prev !== cleaned) {
    prev = cleaned;
    cleaned = cleaned.replace(LEADING_NOISE_WORDS, "").trim();
  }
  return cleaned;
}

export function extractCitationsFromHtml(html: string, url: string): ExtractedCitation[] {
  const text = htmlToText(html);
  const citations: ExtractedCitation[] = [];
  const seen = new Set<string>();

  // Find all statute names
  const statuteMatches: { name: string; index: number }[] = [];
  let match: RegExpExecArray | null;
  while ((match = STATUTE_NAME_PATTERN.exec(text)) !== null) {
    const rawName = match[1].trim();
    const cleaned = cleanStatuteName(rawName);
    // Require at least 3 words or 15 chars to avoid false positives like "X Act"
    if (cleaned.length >= 10 && cleaned.split(/\s+/).length >= 2) {
      statuteMatches.push({ name: cleaned, index: match.index });
    }
  }

  // Find all section references
  const sectionMatches: { section: string; index: number }[] = [];
  for (const pattern of SECTION_PATTERNS) {
    pattern.lastIndex = 0;
    while ((match = pattern.exec(text)) !== null) {
      const section = match[1]?.trim();
      // Reject obviously wrong matches like single digits in isolation
      if (section && /^\d/.test(section) && section.length >= 1) {
        sectionMatches.push({ section, index: match.index });
      }
    }
  }

  // Pair nearby statute + section references (closest match wins)
  const usedSectionIndices = new Set<number>();

  for (const sm of statuteMatches) {
    // Find the closest unpaired section reference within 400 characters
    let bestSection: { section: string; index: number } | null = null;
    let bestDistance = Infinity;

    for (const sec of sectionMatches) {
      if (usedSectionIndices.has(sec.index)) continue;
      const distance = Math.abs(sec.index - sm.index);
      if (distance < 400 && distance < bestDistance) {
        bestDistance = distance;
        bestSection = sec;
      }
    }

    if (bestSection) {
      usedSectionIndices.add(bestSection.index);
    }

    const key = `${sm.name}|${bestSection?.section ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const excerpt = extractExcerpt(
      text,
      sm.index,
      sm.name.length + (bestSection ? bestSection.section.length + 10 : 0)
    );
    const quality = assessExcerptQuality(excerpt);
    const confidence = scoreConfidence(true, !!bestSection, quality);

    citations.push({
      statute: sm.name,
      section: bestSection?.section ?? "",
      url: buildDeepLink(url, sm.name, bestSection?.section ?? ""),
      excerpt,
      confidence: Math.round(confidence * 100) / 100,
    });
  }

  // Also capture standalone section references that might have statute context nearby
  for (const sec of sectionMatches) {
    if (usedSectionIndices.has(sec.index)) continue;

    // Try to find statute context backward
    const contextWindow = text.slice(Math.max(0, sec.index - 400), sec.index);
    let contextStatute: RegExpExecArray | null = null;
    STATUTE_NAME_PATTERN.lastIndex = 0;
    while ((match = STATUTE_NAME_PATTERN.exec(contextWindow)) !== null) {
      contextStatute = match;
    }

    const statuteName = contextStatute ? cleanStatuteName(contextStatute[1].trim()) : "Unknown Statute";
    const key = `${statuteName}|${sec.section}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const excerpt = extractExcerpt(text, sec.index, sec.section.length + 20);
    const quality = assessExcerptQuality(excerpt);
    const confidence = scoreConfidence(!!contextStatute, true, quality);

    citations.push({
      statute: statuteName,
      section: sec.section,
      url: buildDeepLink(url, statuteName, sec.section),
      excerpt,
      confidence: Math.round(confidence * 100) / 100,
    });
  }

  // Deduplicate and sort by confidence descending
  return citations
    .filter((c) => c.confidence >= 0.2)
    .sort((a, b) => b.confidence - a.confidence);
}
