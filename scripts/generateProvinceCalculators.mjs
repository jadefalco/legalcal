/**
 * Canada National Calculator Page Generator
 *
 * Generates national CA calculator wrappers under app/ca/calculators/{slug}/
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
const outputBase = path.join(root, "app/ca/calculators");

function toPascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase());
}

const PAGE_TEMPLATE = (name, slug, pascalName) => `import type { Metadata } from "next";
import ${pascalName}Calculator from "./${pascalName}Calculator";

export const metadata: Metadata = {
  title: "Canada ${name} Calculator",
  description: "Calculate ${name.toLowerCase()} for any Canadian province or territory.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <${pascalName}Calculator initialProvince={searchParams.province} />
    </main>
  );
}
`;

const CLIENT_TEMPLATE = (name, slug, pascalName) => `"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";
import { caProvinces } from "@/app/config/caProvinces";

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

type ProvinceKey = keyof typeof caProvinces;

export default function ${pascalName}Calculator({
  initialProvince,
}: {
  initialProvince?: string;
}) {
  const [provinceCode, setProvinceCode] = useState<ProvinceKey>(
    (initialProvince?.toLowerCase() as ProvinceKey) || "on"
  );
  const theme: Theme = getTheme("ca", provinceCode);

  useEffect(() => {
    if (initialProvince && caProvinces[initialProvince.toLowerCase() as ProvinceKey]) {
      setProvinceCode(initialProvince.toLowerCase() as ProvinceKey);
    }
  }, [initialProvince]);

  return (
    <div className="space-y-8">
      <LCSection
        title="Canada ${name} Calculator"
        description="Select a province to view ${name.toLowerCase()} rules and calculate deadlines."
        icon={CalculatorIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-6">
        <LCField label="Province / Territory" theme={theme}>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            value={provinceCode}
            onChange={(e) => setProvinceCode(e.target.value as ProvinceKey)}
          >
            {Object.entries(caProvinces).map(([key, province]) => (
              <option key={key} value={key}>
                {province.name}
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

        <Link href={\`/calculators/ca/\${provinceCode}/${slug}\`}>
          <LCButton variant="primary" theme={theme}>
            <ArrowRightCircleIcon className="w-4 h-4" />
            View Province-Specific ${name} Calculator
          </LCButton>
        </Link>
      </LCCard>
    </div>
  );
}
`;

async function main() {
  logStart("Canada National Calculator Generator");

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

  logSuccess("Canada national calculator pages generated", count);
}

main().catch(logError);
