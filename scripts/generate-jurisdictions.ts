import fs from "fs";
import path from "path";

/* ───────────────────────────────────────────────────────────────
   Jurisdiction Expansion Generator
   Scaffolds all 63 jurisdictions (Canada 13 + US 51) with:
   - placeholder rule blocks  (lib/authority/generated/)
   - empty history files      (data/rule-history/)
   - placeholder calc pages   (app/calculators/)
   - updated jurisdictions.ts (lib/authority/jurisdictions.ts)
   ─────────────────────────────────────────────────────────────── */

const CA_PROVINCES = [
  "bc", "ab", "sk", "mb", "on", "qc", "nb", "ns", "pe", "nl", "yt", "nt", "nu",
];

const US_STATES = [
  "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga",
  "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md",
  "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj",
  "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc",
  "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy", "dc",
];

const JURISDICTIONS: { country: "ca" | "us"; code: string; name: string; type: string }[] = [
  ...CA_PROVINCES.map((code) => {
    const names: Record<string, string> = {
      bc: "British Columbia", ab: "Alberta", sk: "Saskatchewan", mb: "Manitoba",
      on: "Ontario", qc: "Quebec", nb: "New Brunswick", ns: "Nova Scotia",
      pe: "Prince Edward Island", nl: "Newfoundland and Labrador",
      yt: "Yukon", nt: "Northwest Territories", nu: "Nunavut",
    };
    return { country: "ca" as const, code, name: names[code], type: code === "yt" || code === "nt" || code === "nu" ? "territory" : "province" };
  }),
  ...US_STATES.map((code) => {
    const names: Record<string, string> = {
      al: "Alabama", ak: "Alaska", az: "Arizona", ar: "Arkansas", ca: "California",
      co: "Colorado", ct: "Connecticut", de: "Delaware", fl: "Florida", ga: "Georgia",
      hi: "Hawaii", id: "Idaho", il: "Illinois", in: "Indiana", ia: "Iowa",
      ks: "Kansas", ky: "Kentucky", la: "Louisiana", me: "Maine", md: "Maryland",
      ma: "Massachusetts", mi: "Michigan", mn: "Minnesota", ms: "Mississippi", mo: "Missouri",
      mt: "Montana", ne: "Nebraska", nv: "Nevada", nh: "New Hampshire", nj: "New Jersey",
      nm: "New Mexico", ny: "New York", nc: "North Carolina", nd: "North Dakota", oh: "Ohio",
      ok: "Oklahoma", or: "Oregon", pa: "Pennsylvania", ri: "Rhode Island", sc: "South Carolina",
      sd: "South Dakota", tn: "Tennessee", tx: "Texas", ut: "Utah", vt: "Vermont",
      va: "Virginia", wa: "Washington", wv: "West Virginia", wi: "Wisconsin", wy: "Wyoming",
      dc: "District of Columbia",
    };
    return { country: "us" as const, code, name: names[code], type: code === "dc" ? "district" : "state" };
  }),
];

function getTopics(): string[] {
  const base = path.join(process.cwd(), "data", "authority");
  const topics = new Set<string>();
  if (!fs.existsSync(base)) return [];
  for (const country of fs.readdirSync(base)) {
    const countryDir = path.join(base, country);
    if (!fs.statSync(countryDir).isDirectory()) continue;
    for (const state of fs.readdirSync(countryDir)) {
      const stateDir = path.join(countryDir, state);
      if (!fs.statSync(stateDir).isDirectory()) continue;
      for (const file of fs.readdirSync(stateDir)) {
        if (file.endsWith(".json") && !file.includes(".override")) {
          topics.add(file.replace(".json", ""));
        }
      }
    }
  }
  return Array.from(topics).sort();
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeIfMissing(filePath: string, content: string) {
  if (fs.existsSync(filePath)) return;
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
}

function createPlaceholderRuleFile(topic: string, jurisdiction: string) {
  const dir = path.join(process.cwd(), "lib", "authority", "generated", topic);
  ensureDir(dir);
  const file = path.join(dir, `${jurisdiction}.ts`);
  const varName = `rule_${topic.replace(/-/g, "_")}_${jurisdiction.replace(/-/g, "_")}`;
  const content = `import type { LegalRuleBlock } from "@/data/authority/schema";

export const ${varName}: LegalRuleBlock = {
  data: {
    year: null,
    sourceUrl: null,
  },
  citations: [],
  version: {
    version: "0.0",
    effectiveDate: null,
    supersedes: null,
    notes: ["Placeholder auto-generated"],
  },
  lastUpdated: null,
  expiresOn: null,
};
`;
  writeIfMissing(file, content);
}

function createHistoryFile(topic: string, jurisdiction: string) {
  const dir = path.join(process.cwd(), "data", "rule-history", topic);
  ensureDir(dir);
  const file = path.join(dir, `${jurisdiction}.json`);
  writeIfMissing(file, "[]\n");
}

/** Topics with real calculator implementations in the US dynamic route. */
const US_CALCULATOR_SLUGS = new Set([
  "deposit-demand", "deposit-return", "duplicate-receipt", "entry-notice",
  "eviction-notice", "eviction-timeline", "final-paycheck-deadline",
  "itemized-deductions", "late-fee", "late-status", "lease-termination",
  "ledger-validation", "notice-period", "overtime-calculator",
  "payment-methods", "payment-proof", "receipt-validation", "rent-increase",
  "rent-increase-limits", "rent-receipt", "repair-deduct",
  "security-deposit", "security-deposit-return", "small-claims-eligibility",
  "withhold-rent",
]);

/** Topics with real calculator implementations in the BC dynamic route. */
const BC_CALCULATOR_SLUGS = new Set([
  "security-deposit", "rent-increase", "entry-notice", "repair-request",
  "deposit-return", "condition-inspection", "ending-tenancy",
]);

function shouldCreateCalculatorPage(country: string, jurisdiction: string, topic: string): boolean {
  // US has a dynamic route that handles all states — static pages would override it.
  if (country === "us") return false;
  // BC has a dynamic route for specific calculators — skip those.
  if (country === "ca" && jurisdiction === "bc" && BC_CALCULATOR_SLUGS.has(topic)) return false;
  return true;
}

function createCalculatorPage(country: string, jurisdiction: string, topic: string) {
  if (!shouldCreateCalculatorPage(country, jurisdiction, topic)) return;

  const dir = path.join(process.cwd(), "app", "calculators", country, jurisdiction, topic);
  ensureDir(dir);
  const file = path.join(dir, "page.tsx");
  const jurisdictionUpper = jurisdiction.toUpperCase();
  const topicTitle = topic.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const content = `import RuleFreshnessBanner from "@/components/RuleFreshnessBanner";
import Link from "next/link";

export const metadata = {
  title: "${topicTitle} for ${jurisdictionUpper} | LegalCals",
  description: "This calculator is coming soon for ${jurisdictionUpper}.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-4xl mx-auto space-y-6">
        <RuleFreshnessBanner topic="${topic}" jurisdiction="${jurisdiction}" />
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">${topicTitle}</h1>
          <p className="text-slate-600">
            This calculator is not yet available for{" "}
            <strong>${jurisdictionUpper}</strong>.
          </p>
          <p className="text-sm text-slate-500">
            We are working on adding jurisdiction-specific rules. Check back soon.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/rules/${topic}/${jurisdiction}"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
            >
              View Admin Rule Detail →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
`;
  writeIfMissing(file, content);
}

function updateJurisdictionsTs(topics: string[]) {
  const file = path.join(process.cwd(), "lib", "authority", "jurisdictions.ts");
  const lines: string[] = [
    `export interface Jurisdiction {`,
    `  country: string;`,
    `  code: string;`,
    `  name: string;`,
    `  type: "state" | "province" | "territory" | "district";`,
    `  calculators: string[];`,
    `  documents?: string[];`,
    `}`,
    ``,
    `export const jurisdictions: Jurisdiction[] = [`,
  ];

  for (const j of JURISDICTIONS) {
    lines.push(`  {`);
    lines.push(`    country: "${j.country}",`);
    lines.push(`    code: "${j.code}",`);
    lines.push(`    name: "${j.name}",`);
    lines.push(`    type: "${j.type}" as const,`);
    lines.push(`    calculators: [${topics.map((t) => `"${t}"`).join(", ")}],`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);
  lines.push(`export function getJurisdiction(country: string, code: string): Jurisdiction | undefined {`);
  lines.push(`  return jurisdictions.find(`);
  lines.push(`    (j) => j.country.toLowerCase() === country.toLowerCase() && j.code.toLowerCase() === code.toLowerCase()`);
  lines.push(`  );`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function listJurisdictionsByCountry(country: string): Jurisdiction[] {`);
  lines.push(`  return jurisdictions.filter(`);
  lines.push(`    (j) => j.country.toLowerCase() === country.toLowerCase()`);
  lines.push(`  );`);
  lines.push(`}`);

  fs.writeFileSync(file, lines.join("\n") + "\n", "utf-8");
  console.log(`Updated ${file}`);
}

function main() {
  const topics = getTopics();
  console.log(`Found ${topics.length} topics: ${topics.join(", ")}`);

  let ruleFiles = 0;
  let historyFiles = 0;
  let calcPages = 0;

  for (const j of JURISDICTIONS) {
    for (const topic of topics) {
      createPlaceholderRuleFile(topic, j.code);
      ruleFiles++;
      createHistoryFile(topic, j.code);
      historyFiles++;
      createCalculatorPage(j.country, j.code, topic);
      calcPages++;
    }
  }

  updateJurisdictionsTs(topics);

  console.log(`\nGenerated:`);
  console.log(`  - ${ruleFiles} placeholder rule files`);
  console.log(`  - ${historyFiles} empty history files`);
  console.log(`  - ${calcPages} placeholder calculator pages`);
  console.log(`\nNext step: run "npm run ingest:authority" to rebuild the bundle.`);
}

main();
