/**
 * US National Calculator Page Generator
 *
 * Generates national US calculator wrappers under app/us/calculators/{slug}/
 * with placeholder client components.
 * Skips folders that already contain a page.tsx (preserves hand-written calculators).
 */

import fs from "fs";
import path from "path";
import {
  resolveRoot,
  ensureDirectory,
  loadConfig,
  validateConfig,
  validateWithZod,
  writePage,
  logStart,
  logSuccess,
  logError,
} from "./lib/generator-utils.mjs";

const root = resolveRoot();

const calculatorsConfigPath = path.join(root, "app/config/calculators.js");
const outputBase = path.join(root, "app/us/calculators");

function toPascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase());
}

const PAGE_TEMPLATE = (name, slug, pascalName) => `import type { Metadata } from "next";
import ${pascalName}Calculator from "./${pascalName}Calculator";

export const metadata: Metadata = {
  title: "US ${name} Calculator",
  description: "Calculate ${name.toLowerCase()} for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <${pascalName}Calculator initialState={searchParams.state} />
    </main>
  );
}
`;

const CLIENT_TEMPLATE = (name, slug, pascalName) => `"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCNotice } from "@/app/components/lc/LCNotice";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  ArrowRightCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

type StateKey = keyof typeof usStates;

export default function ${pascalName}Calculator({
  initialState,
}: {
  initialState?: string;
}) {
  const [stateCode, setStateCode] = useState<StateKey>(
    (initialState?.toLowerCase() as StateKey) || "ca"
  );
  const theme: Theme = getTheme("us", stateCode);

  useEffect(() => {
    if (initialState && usStates[initialState.toLowerCase() as StateKey]) {
      setStateCode(initialState.toLowerCase() as StateKey);
    }
  }, [initialState]);

  return (
    <div className="space-y-8">
      <LCSection
        title="US ${name} Calculator"
        description="Select a state to view ${name.toLowerCase()} rules and calculate deadlines."
        icon={CalculatorIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-6">
        <LCField label="State" theme={theme}>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value as StateKey)}
          >
            {Object.entries(usStates).map(([key, state]) => (
              <option key={key} value={key}>
                {state.name}
              </option>
            ))}
          </select>
        </LCField>

        <LCNotice
          label="Status"
          value="Calculator logic coming soon."
          icon={ExclamationTriangleIcon}
          theme={theme}
        />

        <Link href={\`/calculators/us/\${stateCode}/${slug}\`}>
          <LCButton variant="primary" theme={theme}>
            <ArrowRightCircleIcon className="w-4 h-4" />
            View State-Specific ${name} Calculator
          </LCButton>
        </Link>
      </LCCard>
    </div>
  );
}
`;

async function main() {
  logStart("US National Calculator Generator");

  const calculators = await loadConfig(calculatorsConfigPath, "calculators");
  validateConfig(calculators, "calculators");
  await validateWithZod(calculators, "app/validation/CalculatorsSchema.ts", "Calculators");

  let count = 0;

  for (const calc of calculators) {
    const folder = path.join(outputBase, calc.slug);
    ensureDirectory(folder);

    const pascalName = toPascalCase(calc.slug);
    const pagePath = path.join(folder, "page.tsx");
    const clientPath = path.join(folder, `${pascalName}Calculator.tsx`);

    if (fs.existsSync(pagePath)) {
      console.log(`  ⏭ Skipping ${calc.slug}: page.tsx already exists`);
      continue;
    }

    const pageContent = PAGE_TEMPLATE(calc.name, calc.slug, pascalName);
    const clientContent = CLIENT_TEMPLATE(calc.name, calc.slug, pascalName);

    writePage(pagePath, pageContent);
    writePage(clientPath, clientContent);
    count += 2;
  }

  logSuccess("US national calculator pages generated", count);
}

main().catch(logError);
