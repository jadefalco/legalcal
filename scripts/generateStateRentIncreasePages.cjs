/**
 * US Rent Increase Rules Page Generator
 *
 * Outputs: app/us/states/{code}/rent-increase/page.tsx (50 states)
 */

const path = require("path");
const {
  resolveRoot,
  ensureDirectory,
  loadDataset,
  extractData,
  validateDataset,
  validateWithZod,
  writePage,
  logStart,
  logSuccess,
  logError,
} = require("./lib/generator-utils.cjs");

const root = resolveRoot();

const DATASET_NAME = "rentIncreaseRules";
const DATASET_EXPORT = "rentIncreaseRules";
const SCHEMA_PATH = "app/validation/RentIncreaseRulesSchema.ts";

const compiledPaths = [
  path.join(root, ".next", "server", "app", "data", "us", "rentIncreaseRules.js"),
  path.join(root, ".next", "server", "app", "data", "us", "rentIncreaseRules.mjs"),
];

const sourcePaths = [
  path.join(root, "app", "data", "us", "rentIncreaseRules.js"),
  path.join(root, "app", "data", "us", "rentIncreaseRules.mjs"),
];

const OUTPUT_DIR = path.join(root, "app", "us", "states");

const TEMPLATE = (stateCode, stateName) => `"use client";

import { notFound } from "next/navigation";
import Link from "next/link";

import { rentIncreaseRules } from "@/app/data/us/rentIncreaseRules";
import type { RentIncreaseRule } from "@/app/types/RentIncreaseRules";
import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCNotice } from "@/app/components/lc/LCNotice";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  BanknotesIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowRightCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const toStr = (v: unknown) =>
  v === null ? "Varies" : typeof v === "boolean" ? (v ? "Yes" : "No") : String(v);

export default function Page() {
  const stateCode = "${stateCode}";
  const rules: RentIncreaseRule | undefined = rentIncreaseRules[stateCode];
  const theme: Theme = getTheme("us", stateCode);

  if (!rules) {
    return notFound();
  }

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-12">
      <LCSection
        title={"${stateName} Rent Increase Rules"}
        description="Official notice periods, rent control status, and legal citations for this state."
        icon={ArrowRightCircleIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Notice Requirements
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <LCNotice
            label="Notice Period"
            value={toStr(rules.noticePeriodDays)}
            icon={ClockIcon}
            theme={theme}
          />

          <LCNotice
            label="Rent Control"
            value={toStr(rules.rentControl)}
            icon={rules.rentControl ? ExclamationTriangleIcon : BanknotesIcon}
            color={rules.rentControl ? "text-amber-600" : "text-slate-700"}
            theme={theme}
          />
        </div>

        <LCNotice
          label="Additional Requirements"
          value={toStr(rules.additionalRequirements)}
          icon={DocumentTextIcon}
          color="text-slate-700"
          theme={theme}
        />

        {rules.exceptions && (
          <LCNotice
            label="Exceptions"
            value={toStr(rules.exceptions)}
            icon={ExclamationTriangleIcon}
            color="text-amber-600"
            theme={theme}
          />
        )}
      </LCCard>

      {rules.citations.length > 0 && (
        <LCCard theme={theme}>
          <LCSection title="Legal Citations" icon={DocumentTextIcon} theme={theme} />
          <ul className="text-sm text-slate-700 list-disc list-inside space-y-1 mt-2">
            {rules.citations.map((citation) => (
              <li key={citation}>{citation}</li>
            ))}
          </ul>
        </LCCard>
      )}

      <div className="flex gap-4">
        <Link href={"/us/calculators/rent-increase"}>
          <LCButton variant="primary" theme={theme}>
            Open Rent Increase Calculator
          </LCButton>
        </Link>

        <Link href="/us">
          <LCButton variant="ghost" theme={theme}>Back to US Index</LCButton>
        </Link>
      </div>
    </main>
  );
}
`;

async function run() {
  logStart("US Rent Increase Page Generator");

  const module = await loadDataset(compiledPaths, sourcePaths, DATASET_NAME);
  /** @type {import("../app/types/RentIncreaseRules").RentIncreaseRulesMap} */
  const data = extractData(module, DATASET_EXPORT);
  validateDataset(data, DATASET_NAME);
  await validateWithZod(data, SCHEMA_PATH, "RentIncreaseRules");

  ensureDirectory(OUTPUT_DIR);

  let count = 0;
  for (const [stateCode, rules] of Object.entries(data)) {
    const stateDir = path.join(OUTPUT_DIR, stateCode, "rent-increase");
    ensureDirectory(stateDir);

    const filePath = path.join(stateDir, "page.tsx");
    const content = TEMPLATE(stateCode, rules.name);

    writePage(filePath, content);
    count++;
  }

  logSuccess("All US rent increase pages generated", count);
}

run().catch(logError);
