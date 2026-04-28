/**
 * Shared utilities for content-page generators (CommonJS).
 *
 * Used by:
 *   - generateStatePages.cjs
 *   - generateSecurityDepositPages.cjs
 *   - generateCanadaEvictionPages.cjs
 */

const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

/* ── Path helpers ─────────────────────────────────────────────────────────── */

function resolveRoot() {
  return path.resolve(__dirname, "..", "..");
}

function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/* ── Dataset loading ──────────────────────────────────────────────────────── */

/**
 * Load a JS/ESM dataset module, trying compiled .next paths first,
 * then falling back to source files.
 */
async function loadDataset(compiledPaths, sourcePaths, name) {
  for (const candidate of compiledPaths) {
    if (!fs.existsSync(candidate)) continue;
    try {
      return require(candidate);
    } catch (requireError) {
      try {
        return await import(pathToFileURL(candidate).href);
      } catch (importError) {
        console.warn(
          `Unable to load compiled ${name} from ${candidate}: ${requireError.message || requireError} / ${importError.message || importError}`
        );
      }
    }
  }

  for (const candidate of sourcePaths) {
    if (!fs.existsSync(candidate)) continue;
    return await import(pathToFileURL(candidate).href);
  }

  throw new Error(
    `Could not locate ${name} data. Checked compiled .next paths and source files.`
  );
}

/**
 * Extract the actual data object from a loaded module, handling both
 * named exports and default exports.
 */
function extractData(module, exportName) {
  return (
    module[exportName] ??
    module.default?.[exportName] ??
    module.default ??
    module
  );
}

/**
 * Validate that a dataset is a non-empty object.
 */
function validateDataset(data, name) {
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    throw new Error(
      `Failed to load ${name} from the module, or dataset is empty.`
    );
  }
}

/* ── Zod validation ───────────────────────────────────────────────────────── */

/**
 * Validate a dataset object against a Zod schema loaded from a TypeScript file.
 * This function uses dynamic import() so it works with tsx for .ts files.
 */
async function validateWithZod(data, schemaPath, name) {
  const absolutePath = path.resolve(resolveRoot(), schemaPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Schema file not found: ${absolutePath}`);
  }

  const schemaModule = await import(pathToFileURL(absolutePath).href);

  // Detect the schema export (e.g., EvictionRulesMapSchema or CalculatorsSchema)
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

/* ── Page writing ─────────────────────────────────────────────────────────── */

function writePage(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  logGenerated(filePath);
}

/* ── Logging ──────────────────────────────────────────────────────────────── */

function logStart(name) {
  console.log(`\n▶ ${name}\n`);
}

function logGenerated(filePath) {
  const rel = path.relative(resolveRoot(), filePath);
  console.log(`  ✔ Generated: ${rel}`);
}

function logSuccess(name, count) {
  console.log(`\n✔ ${name} (${count} files)\n`);
}

function logError(err) {
  console.error("\n❌ Error:", err.message || err);
  process.exit(1);
}

/* ── Exports ──────────────────────────────────────────────────────────────── */

module.exports = {
  resolveRoot,
  ensureDirectory,
  loadDataset,
  extractData,
  validateDataset,
  validateWithZod,
  writePage,
  logStart,
  logGenerated,
  logSuccess,
  logError,
};
