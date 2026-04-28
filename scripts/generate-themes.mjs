/**
 * Theme File Generator
 *
 * Generates app/theme/us/*.ts and app/theme/ca/*.ts
 * and app/theme/index.ts from config files.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/**
 * Guess a Tailwind gradient from a hex color.
 * Maps common state/province accent colors to reasonable gradients.
 */
function guessGradient(hex) {
  const h = hex.toLowerCase();

  // Reds
  if (["#9e1b32", "#bf0a30", "#9d2235", "#b5002d", "#c8102e", "#e41c38", "#cc0000"].includes(h)) {
    return "from-red-900 to-red-700";
  }
  // Deep blues
  if (["#0f204b", "#003366", "#0033a0", "#002f6c", "#002d72", "#003c71", "#003da5", "#002868", "#00205b"].includes(h)) {
    return "from-blue-900 to-blue-700";
  }
  // Navy / very dark blues
  if (["#002855", "#00274c", "#000000", "#0a3161", "#154734"].includes(h)) {
    return "from-slate-900 to-slate-700";
  }
  // Yellows / golds
  if (["#fcb813", "#ffd700", "#ffb81c", "#ffc72c"].includes(h)) {
    return "from-amber-700 to-yellow-600";
  }
  // Teals / greens
  if (["#0074ad", "#0072ce", "#00a3e0", "#006c54", "#005a2b", "#006a4e", "#00693e"].includes(h)) {
    return "from-teal-900 to-teal-700";
  }
  // Oranges
  if (["#f36f21"].includes(h)) {
    return "from-orange-800 to-orange-600";
  }

  // Default fallback based on rough hue
  return "from-slate-800 to-slate-600";
}

/**
 * Generate a light background tint from a hex color.
 */
function lightBackground(hex) {
  // Just return a consistent light gray tint for now.
  // Could be made smarter by lightening the hex.
  return "#F8FAFC";
}

/**
 * Write a single theme file.
 */
function writeThemeFile(dir, code, name, accent) {
  const gradient = guessGradient(accent);
  const background = lightBackground(accent);
  const emblem = `/emblems/${code}.svg`;

  const content = `import type { Theme } from "@/app/types/Theme";

export const theme: Theme = {
  colors: {
    primary: "${accent}",
    accent: "${accent}",
    background: "${background}",
  },
  emblem: "${emblem}",
  gradient: "${gradient}",
};
`;

  const filePath = path.join(dir, `${code}.ts`);
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✔ Generated: ${path.relative(root, filePath)}`);
}

/**
 * Generate the theme loader index.ts
 */
function writeThemeIndex(usStates, caProvinces) {
  const usImports = Object.keys(usStates)
    .map((code) => `import { theme as us${code.toUpperCase()} } from "./us/${code}";`)
    .join("\n");

  const caImports = Object.keys(caProvinces)
    .map((code) => `import { theme as ca${code.toUpperCase()} } from "./ca/${code}";`)
    .join("\n");

  const usMapEntries = Object.keys(usStates)
    .map((code) => `  ${code}: us${code.toUpperCase()},`)
    .join("\n");

  const caMapEntries = Object.keys(caProvinces)
    .map((code) => `  ${code}: ca${code.toUpperCase()},`)
    .join("\n");

  const content = `${usImports}
${caImports}

import type { Theme } from "@/app/types/Theme";

const defaultTheme: Theme = {
  colors: {
    primary: "#1E3A5F",
    accent: "#2563EB",
    background: "#F8FAFC",
  },
  emblem: "/emblems/default.svg",
  gradient: "from-slate-800 to-slate-600",
};

const usThemes: Record<string, Theme> = {
${usMapEntries}
};

const caThemes: Record<string, Theme> = {
${caMapEntries}
};

export function getTheme(country: "us" | "ca", code: string): Theme {
  const map = country === "us" ? usThemes : caThemes;
  return map[code.toLowerCase()] ?? defaultTheme;
}

export { defaultTheme };
`;

  const filePath = path.join(root, "app", "theme", "index.ts");
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✔ Generated: ${path.relative(root, filePath)}`);
}

async function main() {
  console.log("\n▶ Theme File Generator\n");

  // Load configs via dynamic import
  const usStatesPath = path.join(root, "app", "config", "usStates.js");
  const caProvincesPath = path.join(root, "app", "config", "caProvinces.js");

  const usModule = await import(pathToFileURL(usStatesPath).href);
  const caModule = await import(pathToFileURL(caProvincesPath).href);

  const usStates = usModule.usStates;
  const caProvinces = caModule.caProvinces;

  const usDir = path.join(root, "app", "theme", "us");
  const caDir = path.join(root, "app", "theme", "ca");

  fs.mkdirSync(usDir, { recursive: true });
  fs.mkdirSync(caDir, { recursive: true });

  // Generate US themes
  for (const [code, state] of Object.entries(usStates)) {
    writeThemeFile(usDir, code, state.name, state.accent);
  }

  // Generate CA themes
  for (const [code, province] of Object.entries(caProvinces)) {
    writeThemeFile(caDir, code, province.name, province.accent);
  }

  // Generate loader
  writeThemeIndex(usStates, caProvinces);

  const total = Object.keys(usStates).length + Object.keys(caProvinces).length + 1;
  console.log(`\n✔ All theme files generated (${total} files)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
