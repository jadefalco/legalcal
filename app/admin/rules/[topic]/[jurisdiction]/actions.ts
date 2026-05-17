"use server";

import { readFileSync, writeFileSync } from "fs";
import { authorityBundle } from "@/lib/authority/bundle";
import { saveRuleHistorySnapshot } from "@/lib/authority/history";
import { extractCitationsFromHtml } from "@/lib/authority/citationExtractor";
import type { LegalRuleBlock } from "@/data/authority/schema";

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function updateBundleFile(
  topic: string,
  jurisdiction: string,
  rule: LegalRuleBlock
): void {
  const path = "lib/authority/bundle.ts";
  let content = readFileSync(path, "utf-8");

  const topicRe = new RegExp(`"${escapeRegex(topic)}":\\s*\\{`);
  const topicMatch = content.match(topicRe);
  if (!topicMatch || topicMatch.index === undefined) {
    throw new Error(`Topic "${topic}" not found in bundle`);
  }

  const searchSlice = content.slice(topicMatch.index);
  const jurisRe = new RegExp(`"${escapeRegex(jurisdiction)}":\\s*\\{`);
  const jurisMatch = searchSlice.match(jurisRe);
  if (!jurisMatch || jurisMatch.index === undefined) {
    throw new Error(
      `Jurisdiction "${jurisdiction}" not found under topic "${topic}"`
    );
  }

  const blockStart = topicMatch.index + jurisMatch.index;
  let depth = 0;
  let inString = false;
  let escape = false;
  let blockEnd = -1;

  for (let i = blockStart; i < content.length; i++) {
    const c = content[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (c === "\\") {
      escape = true;
      continue;
    }
    if (c === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (c === "{") depth++;
    if (c === "}") {
      depth--;
      if (depth === 0) {
        blockEnd = i;
        break;
      }
    }
  }

  if (blockEnd === -1) {
    throw new Error("Could not find end of jurisdiction block");
  }

  const newBlock = `"${jurisdiction}": ${JSON.stringify(rule, null, 2)}`;
  content =
    content.slice(0, blockStart) + newBlock + content.slice(blockEnd + 1);
  writeFileSync(path, content);
}

function findJsonRuleFile(topic: string, jurisdiction: string): string | null {
  const jsonPath = `data/authority/us/${jurisdiction}/${topic}.json`;
  if (require("fs").existsSync(jsonPath)) return jsonPath;

  const caPath = `data/authority/ca/${jurisdiction}/${topic}.json`;
  if (require("fs").existsSync(caPath)) return caPath;

  return null;
}

function findGeneratedRuleFile(topic: string, jurisdiction: string): string | null {
  const generatedPath = `lib/authority/generated/${topic}/${jurisdiction}.ts`;
  if (require("fs").existsSync(generatedPath)) return generatedPath;
  return null;
}

export interface CitationExtractionResult {
  success: boolean;
  added: number;
  citations: {
    statute: string;
    section: string;
    url: string;
    excerpt: string;
    confidence: number;
    isNew: boolean;
  }[];
  error?: string;
}

export async function extractCitationsForRule(
  topic: string,
  jurisdiction: string
): Promise<CitationExtractionResult> {
  const rule = authorityBundle[topic]?.[jurisdiction];
  if (!rule) {
    return { success: false, added: 0, citations: [], error: "Rule not found" };
  }

  const sourceUrl = typeof rule.data.sourceUrl === "string" ? rule.data.sourceUrl : "";
  if (!sourceUrl) {
    return { success: false, added: 0, citations: [], error: "No sourceUrl available" };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    const res = await fetch(sourceUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      return { success: false, added: 0, citations: [], error: `HTTP ${res.status}` };
    }

    const html = await res.text();
    const extracted = extractCitationsFromHtml(html, sourceUrl);

    if (extracted.length === 0) {
      return { success: true, added: 0, citations: [], error: "No citations found in source" };
    }

    // Save history snapshot before mutation
    saveRuleHistorySnapshot(topic, jurisdiction, rule);

    // Deduplicate against existing citations
    const existingKeys = new Set(
      rule.citations.map((c) => `${c.statute}|${c.excerpt.slice(0, 50)}`)
    );

    const newCitations = extracted.filter(
      (ec) => !existingKeys.has(`${ec.statute}|${ec.excerpt.slice(0, 50)}`)
    );

    const today = new Date().toISOString().split("T")[0];
    const note = `Citations auto-extracted from source page on ${today}`;

    if (newCitations.length > 0) {
      rule.citations.push(
        ...newCitations.map((ec) => ({
          statute: ec.statute,
          url: ec.url,
          excerpt: ec.excerpt,
          sourceType: "statute" as const,
          lastUpdated: today,
          confidence: ec.confidence,
        }))
      );
      rule.lastUpdated = new Date().toISOString();
      if (!rule.version.notes.includes(note)) {
        rule.version.notes.push(note);
      }

      // Persist
      updateBundleFile(topic, jurisdiction, rule);

      const jsonFile = findJsonRuleFile(topic, jurisdiction);
      const generatedFile = findGeneratedRuleFile(topic, jurisdiction);

      if (jsonFile) {
        const content = JSON.parse(readFileSync(jsonFile, "utf-8"));
        content.rule = rule;
        writeFileSync(jsonFile, JSON.stringify(content, null, 2), "utf-8");
      } else if (generatedFile) {
        const varName = `rule_${topic.replace(/-/g, "_")}_${jurisdiction.replace(/-/g, "_")}`;
        const tsContent = `import type { LegalRuleBlock } from "@/data/authority/schema";

export const ${varName}: LegalRuleBlock = ${JSON.stringify(rule, null, 2)};
`;
        writeFileSync(generatedFile, tsContent, "utf-8");
      }
    }

    return {
      success: true,
      added: newCitations.length,
      citations: extracted.map((c) => ({
        ...c,
        isNew: newCitations.some(
          (nc) => nc.statute === c.statute && nc.excerpt === c.excerpt
        ),
      })),
    };
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : String(e);
    return { success: false, added: 0, citations: [], error: errorMsg };
  }
}
