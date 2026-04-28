/**
 * US National Document Generator Page Generator
 *
 * Generates national US document generators under app/us/documents/{slug}/
 * with placeholder client components.
 * Skips folders that already contain a page.tsx (preserves hand-written generators).
 */

import fs from "fs";
import path from "path";
import {
  resolveRoot,
  ensureDirectory,
  writePage,
  logStart,
  logSuccess,
  logError,
} from "./lib/generator-utils.mjs";

const root = resolveRoot();
const outputBase = path.join(root, "app/us/documents");

function toPascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase());
}

const US_DOCUMENTS = [
  {
    name: "Eviction Notice",
    slug: "eviction-notice",
    description: "Generate a jurisdiction-specific eviction notice letter for any US state.",
  },
  {
    name: "Lease Termination",
    slug: "lease-termination",
    description: "Generate a lease termination notice letter for any US state.",
  },
  {
    name: "Rent Increase",
    slug: "rent-increase",
    description: "Generate a rent increase notice letter for any US state.",
  },
  {
    name: "Security Deposit Return",
    slug: "security-deposit-return",
    description: "Generate a security deposit return demand letter for any US state.",
  },
];

const PAGE_TEMPLATE = (name, slug, pascalName, description) => `import type { Metadata } from "next";
import ${pascalName}Generator from "./${pascalName}Generator";

export const metadata: Metadata = {
  title: "US ${name} Generator",
  description: "${description}",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <${pascalName}Generator initialState={searchParams.state} />
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
  DocumentTextIcon,
  ArrowRightCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

type StateKey = keyof typeof usStates;

export default function ${pascalName}Generator({
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
        title="US ${name} Generator"
        description="Select a state to generate a jurisdiction-specific ${name.toLowerCase()} document."
        icon={DocumentTextIcon}
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
          value="Document generator coming soon."
          icon={ExclamationTriangleIcon}
          theme={theme}
        />

        <Link href={\`/us/states/\${stateCode}/${slug}\`}>
          <LCButton variant="primary" theme={theme}>
            <ArrowRightCircleIcon className="w-4 h-4" />
            View ${name} Rules
          </LCButton>
        </Link>
      </LCCard>
    </div>
  );
}
`;

async function main() {
  logStart("US National Document Generator");

  let count = 0;

  for (const doc of US_DOCUMENTS) {
    const folder = path.join(outputBase, doc.slug);
    ensureDirectory(folder);

    const pascalName = toPascalCase(doc.slug);
    const pagePath = path.join(folder, "page.tsx");
    const clientPath = path.join(folder, `${pascalName}Generator.tsx`);

    if (fs.existsSync(pagePath)) {
      console.log(`  ⏭ Skipping ${doc.slug}: page.tsx already exists`);
      continue;
    }

    const pageContent = PAGE_TEMPLATE(doc.name, doc.slug, pascalName, doc.description);
    const clientContent = CLIENT_TEMPLATE(doc.name, doc.slug, pascalName);

    writePage(pagePath, pageContent);
    writePage(clientPath, clientContent);
    count += 2;
  }

  logSuccess("US national document generator pages generated", count);
}

main().catch(logError);
