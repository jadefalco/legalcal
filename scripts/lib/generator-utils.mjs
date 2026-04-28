/**
 * Shared utilities for calculator and index generators (ESM).
 *
 * Used by:
 *   - generate-us-all.mjs
 *   - generate-ca-all.mjs
 *   - generate-state-calculators.mjs
 *   - generate-province-calculators.mjs
 *   - generate-us-indexes.mjs
 *   - generate-ca-indexes.mjs
 *   - generate-sitemap.mjs
 */

import fs from "fs";
import path from "path";
import url from "url";

/* ── Path helpers ─────────────────────────────────────────────────────────── */

export function resolveRoot() {
  return path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..", "..");
}

export function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/* ── Config / dataset loading ─────────────────────────────────────────────── */

/**
 * Load a JS/ESM config module and extract a named export.
 */
export async function loadConfig(configPath, exportName) {
  const module = await import(url.pathToFileURL(configPath).href);
  return module[exportName] ?? module.default?.[exportName] ?? module.default ?? module;
}

/**
 * Validate that a config object is non-empty.
 */
export function validateConfig(data, name) {
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    throw new Error(`Failed to load ${name} config, or config is empty.`);
  }
}

/* ── Zod validation ───────────────────────────────────────────────────────── */

/**
 * Validate a dataset object against a Zod schema loaded from a TypeScript file.
 */
export async function validateWithZod(data, schemaPath, name) {
  const absolutePath = path.resolve(resolveRoot(), schemaPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Schema file not found: ${absolutePath}`);
  }

  const schemaModule = await import(url.pathToFileURL(absolutePath).href);

  const schema =
    schemaModule[`${name}MapSchema`] ??
    schemaModule[`${name}Schema`] ??
    schemaModule.default?.[`${name}MapSchema`] ??
    schemaModule.default?.[`${name}Schema`];

  if (!schema || typeof schema.parse !== "function") {
    throw new Error(
      `Could not find ${name}MapSchema or ${name}Schema in ${schemaPath}. Available exports: ${Object.keys(schemaModule).join(", ")}`
    );
  }

  const result = schema.safeParse(data);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Dataset validation failed for "${name}".\n${issues}`
    );
  }

  const count = Array.isArray(data) ? data.length : Object.keys(data).length;
  console.log(`  ✔ Dataset "${name}" passed Zod validation (${count} entries).`);
  return result.data;
}

/* ── Template helpers ─────────────────────────────────────────────────────── */

export function loadTemplate(templatePath) {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  return fs.readFileSync(templatePath, "utf8");
}

/**
 * Replace placeholder variables in a template string.
 * vars: { PLACEHOLDER: value, ... }
 */
export function replaceVars(content, vars) {
  let result = content;
  for (const [key, value] of Object.entries(vars)) {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    result = result.replace(regex, String(value));
  }
  return result;
}

/* ── Page writing ─────────────────────────────────────────────────────────── */

export function writePage(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  logGenerated(filePath);
}

/* ── Logging ──────────────────────────────────────────────────────────────── */

export function logStart(name) {
  console.log(`\n▶ ${name}\n`);
}

export function logGenerated(filePath) {
  const rel = path.relative(resolveRoot(), filePath);
  console.log(`  ✔ Generated: ${rel}`);
}

export function logSuccess(name, count) {
  console.log(`\n✔ ${name} (${count} files)\n`);
}

export function logError(err) {
  console.error("\n❌ Error:", err.message || err);
  process.exit(1);
}

export function logSection(title) {
  console.log(`\n── ${title} ──\n`);
}
