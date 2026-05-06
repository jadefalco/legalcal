import { getRule } from "@/lib/authority/query";
import type { LegalRuleBlock } from "@/data/authority/schema";

export interface ResolveOptions {
  templateHtml: string;
  jurisdiction: string;
  topic: string;
  userInput: Record<string, string>;
}

export interface ResolveResult {
  html: string;
  variablesUsed: string[];
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(date: Date): string {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Simple Handlebars-like variable resolver.
 * Supports:
 *   {{variable}} - simple substitution
 *   {{rule.data.field}} - nested rule data
 *   {{today}} - current date
 *   {{now}} - current datetime
 *   {{#if condition}}...{{/if}} - conditionals
 *   {{#each items}}...{{/each}} - loops
 */
export async function resolveDocumentVariables(
  options: ResolveOptions
): Promise<ResolveResult> {
  const { templateHtml, jurisdiction, topic, userInput } = options;

  // Load rule
  const parts = jurisdiction.split("-");
  const country = parts[0];
  const state = parts[1] ?? "";
  const city = parts[2] ?? undefined;
  const rule = getRule(state, topic, city);

  // Build variable map
  const variables: Record<string, any> = {
    ...userInput,
    today: formatDate(new Date()),
    now: formatDateTime(new Date()),
    jurisdiction_name: state.toUpperCase(),
  };

  if (rule) {
    // Flatten rule.data fields
    flattenObject(rule.data, "rule.data", variables);

    // First citation fields
    if (rule.citations.length > 0) {
      const first = rule.citations[0];
      variables["statute_citation"] = first.statute;
      variables["statute_url"] = first.url;
      variables["statute_excerpt"] = first.excerpt;
    }

    // Version fields
    variables["rule_version"] = rule.version.version;
    variables["rule_effective_date"] = rule.version.effectiveDate;
  }

  // Resolve template
  let html = templateHtml;
  const variablesUsed = new Set<string>();

  // {{variable}} simple substitution
  html = html.replace(/\{\{\{([^}]+)\}\}\}/g, (match, path) => {
    variablesUsed.add(path.trim());
    const value = getNestedValue(variables, path.trim());
    return value !== undefined ? String(value) : match;
  });

  html = html.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
    const trimmed = path.trim();
    variablesUsed.add(trimmed);
    const value = getNestedValue(variables, trimmed);
    if (value !== undefined) {
      return escapeHtml(String(value));
    }
    return match;
  });

  // {{#if condition}}...{{/if}}
  html = html.replace(
    /\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (match, condition, content) => {
      const value = getNestedValue(variables, condition.trim());
      const truthy =
        value === true ||
        value === "true" ||
        (typeof value === "number" && value > 0) ||
        (typeof value === "string" && value.length > 0);
      return truthy ? content : "";
    }
  );

  // {{#each items}}...{{/each}}
  html = html.replace(
    /\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (match, path, content) => {
      const items = getNestedValue(variables, path.trim());
      if (!Array.isArray(items)) return "";
      return items
        .map((item, index) => {
          let itemContent = content;
          itemContent = itemContent.replace(/\{\{@index\}\}/g, String(index));
          itemContent = itemContent.replace(/\{\{@item\}\}/g, escapeHtml(String(item)));
          if (typeof item === "object" && item !== null) {
            Object.entries(item).forEach(([key, val]) => {
              itemContent = itemContent.replace(
                new RegExp(`\\{\\{${key}\\}\\}`, "g"),
                escapeHtml(String(val))
              );
            });
          }
          return itemContent;
        })
        .join("");
    }
  );

  return { html, variablesUsed: Array.from(variablesUsed) };
}

function flattenObject(obj: any, prefix: string, target: Record<string, any>) {
  if (obj === null || typeof obj !== "object") {
    target[prefix] = obj;
    return;
  }
  for (const key of Object.keys(obj)) {
    const newKey = `${prefix}.${key}`;
    if (Array.isArray(obj[key])) {
      target[newKey] = obj[key];
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key], newKey, target);
    } else {
      target[newKey] = obj[key];
    }
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
