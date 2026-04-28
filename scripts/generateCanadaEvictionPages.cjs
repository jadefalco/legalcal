/**
 * Canada Eviction Rules Page Generator
 *
 * Outputs: app/ca/provinces/{code}/eviction/page.tsx (13 provinces/territories)
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

const DATASET_NAME = "evictionRules";
const DATASET_EXPORT = "evictionRules";
const SCHEMA_PATH = "app/validation/CanadaEvictionRulesSchema.ts";

const compiledPaths = [
  path.join(root, ".next", "server", "app", "data", "ca", "evictionRules.js"),
  path.join(root, ".next", "server", "app", "data", "ca", "evictionRules.mjs"),
];

const sourcePaths = [
  path.join(root, "app", "data", "ca", "evictionRules.js"),
  path.join(root, "app", "data", "ca", "evictionRules.mjs"),
];

const OUTPUT_DIR = path.join(root, "app", "ca", "provinces");

const TEMPLATE = (provinceCode, provinceName) => `"use client";

import { notFound } from "next/navigation";
import Link from "next/link";

import { evictionRules } from "@/app/data/ca/evictionRules";
import type { CanadaEvictionRule } from "@/app/types/CanadaEvictionRules";
import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCNotice } from "@/app/components/lc/LCNotice";
import { LCTimeline } from "@/app/components/lc/LCTimeline";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

const toStr = (v: unknown) =>
  v === null ? "Varies" : typeof v === "number" ? \`\${v}\` : String(v);

export default function Page() {
  const provinceCode = "${provinceCode}";
  const rules: CanadaEvictionRule | undefined = evictionRules[provinceCode];
  const theme: Theme = getTheme("ca", provinceCode);

  if (!rules) {
    return notFound();
  }

  const noticeNonpayment = toStr(
    typeof rules.noticeForNonpayment === "number"
      ? \`\${rules.noticeForNonpayment} days\`
      : rules.noticeForNonpayment
  );

  const noticeViolation = toStr(
    typeof rules.noticeForLeaseViolation === "number"
      ? \`\${rules.noticeForLeaseViolation} days\`
      : rules.noticeForLeaseViolation
  );

  const timelineSteps = [
    {
      title: "Notice Period (Nonpayment)",
      description: noticeNonpayment,
      icon: ExclamationTriangleIcon,
      color: "text-amber-600",
    },
    {
      title: "Notice Period (Lease Violation)",
      description: noticeViolation,
      icon: ExclamationTriangleIcon,
      color: "text-red-600",
    },
    {
      title: "Landlord Can File",
      description: toStr(rules.courtFilingTime),
      icon: CalendarDaysIcon,
      color: "text-blue-600",
    },
    {
      title: "Tenant Answer Deadline",
      description: toStr(rules.answerDeadline),
      icon: ClockIcon,
      color: "text-purple-600",
    },
    {
      title: "Hearing Timeline",
      description: toStr(rules.hearingTimeline),
      icon: ClockIcon,
      color: "text-green-600",
    },
    {
      title: "Lockout / Physical Eviction",
      description: toStr(rules.lockoutAllowedAfter),
      icon: ExclamationTriangleIcon,
      color: "text-red-700",
    },
  ];

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-12">
      <LCSection
        title={"${provinceName} Eviction Rules"}
        description="Official notice periods, filing timelines, and legal citations for this province."
        icon={ArrowRightCircleIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Notice Requirements
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <LCNotice
            label="Nonpayment of Rent"
            value={noticeNonpayment}
            icon={ExclamationTriangleIcon}
            theme={theme}
          />

          <LCNotice
            label="Lease Violation"
            value={noticeViolation}
            icon={ExclamationTriangleIcon}
            color="text-red-700"
            theme={theme}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <LCNotice
            label="When can the landlord file?"
            value={toStr(rules.courtFilingTime)}
            icon={CalendarDaysIcon}
            color="text-slate-700"
            theme={theme}
          />

          <LCNotice
            label="Tenant answer deadline"
            value={toStr(rules.answerDeadline)}
            icon={ClockIcon}
            color="text-slate-700"
            theme={theme}
          />
        </div>

        <LCNotice
          label="Hearing timeline"
          value={toStr(rules.hearingTimeline)}
          icon={ClockIcon}
          color="text-slate-700"
          theme={theme}
        />

        <LCNotice
          label="Lockout / physical eviction"
          value={toStr(rules.lockoutAllowedAfter)}
          icon={ExclamationTriangleIcon}
          color="text-slate-700"
          theme={theme}
        />
      </LCCard>

      <LCTimeline
        title="Eviction Process Timeline"
        icon={ArrowRightCircleIcon}
        steps={timelineSteps}
        theme={theme}
      />

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
        <Link href={"/calculators/ca/${provinceCode}/eviction-timeline"}>
          <LCButton variant="primary" theme={theme}>
            Open Eviction Calculator
          </LCButton>
        </Link>

        <Link href="/ca">
          <LCButton variant="ghost" theme={theme}>Back to Canada Index</LCButton>
        </Link>
      </div>
    </main>
  );
}
`;

async function run() {
  logStart("Canada Eviction Page Generator");

  const module = await loadDataset(compiledPaths, sourcePaths, DATASET_NAME);
  /** @type {import("../app/types/CanadaEvictionRules").CanadaEvictionRulesMap} */
  const data = extractData(module, DATASET_EXPORT);
  validateDataset(data, DATASET_NAME);
  await validateWithZod(data, SCHEMA_PATH, "CanadaEvictionRules");

  ensureDirectory(OUTPUT_DIR);

  let count = 0;
  for (const [provinceCode, rules] of Object.entries(data)) {
    const provinceDir = path.join(OUTPUT_DIR, provinceCode, "eviction");
    ensureDirectory(provinceDir);

    const filePath = path.join(provinceDir, "page.tsx");
    const content = TEMPLATE(provinceCode, rules.name);

    writePage(filePath, content);
    count++;
  }

  logSuccess("All Canada eviction pages generated", count);
}

run().catch(logError);
