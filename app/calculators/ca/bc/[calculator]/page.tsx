import { notFound } from "next/navigation";
import Link from "next/link";

import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";

import BCSecurityDepositCalculator from "@/app/ca/calculators/bc/security-deposit/BCSecurityDepositCalculator";
import BCRentIncreaseCalculator from "@/app/ca/calculators/bc/rent-increase/BCRentIncreaseCalculator";
import BCEntryNoticeCalculator from "@/app/ca/calculators/bc/entry-notice/BCEntryNoticeCalculator";
import BCRepairRequestCalculator from "@/app/ca/calculators/bc/repair-request/BCRepairRequestCalculator";
import BCDepositReturnCalculator from "@/app/ca/calculators/bc/deposit-return/BCDepositReturnCalculator";
import BCConditionInspectionCalculator from "@/app/ca/calculators/bc/condition-inspection/BCConditionInspectionCalculator";
import BCEndingTenancyCalculator from "@/app/ca/calculators/bc/ending-tenancy/BCEndingTenancyCalculator";
import RuleFreshnessBanner from "@/components/RuleFreshnessBanner";

import {
  CalculatorIcon,
  ChevronLeftIcon,
  CodeBracketIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

const calculatorComponents: Record<string, React.ComponentType> = {
  "security-deposit": BCSecurityDepositCalculator,
  "rent-increase": BCRentIncreaseCalculator,
  "entry-notice": BCEntryNoticeCalculator,
  "repair-request": BCRepairRequestCalculator,
  "deposit-return": BCDepositReturnCalculator,
  "condition-inspection": BCConditionInspectionCalculator,
  "ending-tenancy": BCEndingTenancyCalculator,
};

const calculatorNames: Record<string, string> = {
  "security-deposit": "Security Deposit Calculator",
  "rent-increase": "Rent Increase Calculator",
  "entry-notice": "Entry Notice Calculator",
  "repair-request": "Repair Request Calculator",
  "deposit-return": "Deposit Return Deadline Calculator",
  "condition-inspection": "Condition Inspection Checklist",
  "ending-tenancy": "Ending Tenancy Calculator",
};

const calculatorApiTopics: Record<string, string> = {
  "security-deposit": "security-deposit",
  "rent-increase": "rent-increase",
  "entry-notice": "entry-notice",
  "repair-request": "repair-request",
  "deposit-return": "deposit-return",
  "condition-inspection": "condition-inspection",
  "ending-tenancy": "ending-tenancy",
};

export async function generateMetadata({
  params,
}: {
  params: { calculator: string };
}) {
  const name = calculatorNames[params.calculator.toLowerCase()] || params.calculator;
  return {
    title: `${name} for British Columbia | LegalCals`,
    description: `Use the ${name} for BC. Calculate deadlines, timelines, and legal requirements based on BC law.`,
  };
}

export default function Page({ params }: { params: { calculator: string } }) {
  const calcSlug = params.calculator.toLowerCase();
  const CalculatorComponent = calculatorComponents[calcSlug];

  if (!CalculatorComponent) {
    const calcName = calcSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="px-4 py-12 max-w-4xl mx-auto space-y-6">
          <RuleFreshnessBanner topic={calcSlug} jurisdiction="bc" />
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">{calcName}</h1>
            <p className="text-slate-600">
              This calculator is not yet available for{" "}
              <strong>British Columbia</strong>.
            </p>
            <p className="text-sm text-slate-500">
              We are working on adding jurisdiction-specific rules. Check back soon.
            </p>
            <div className="pt-2">
              <Link
                href={`/admin/rules/${calcSlug}/bc`}
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

  const theme = getTheme("ca", "bc");
  const calcName = calculatorNames[calcSlug] || calcSlug;
  const apiTopic = calculatorApiTopics[calcSlug] || calcSlug;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-4xl mx-auto space-y-10">
        <StateSectionHeader
          title={`${calcName} for British Columbia`}
          description="Calculate deadlines and rules specific to BC jurisdiction."
          icon={CalculatorIcon}
          theme={theme}
        />

        <div>
          <Link
            href="/calculators/ca/bc"
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            All BC Calculators
          </Link>
        </div>

        <RuleFreshnessBanner topic={apiTopic} jurisdiction="bc" />

        <LCCard theme={theme} className="space-y-6">
          <CalculatorComponent />
        </LCCard>

        <StateContentDivider theme={theme} />

        {/* Embed */}
        <section className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <CodeBracketIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
            Embed This Calculator
          </h3>
          <LCCard theme={theme} className="space-y-3">
            <p className="text-sm text-slate-600">
              Paste this snippet into your HTML to embed this BC calculator:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`<script src="https://legalcals.com/embed.js"></script>

<div
  data-legalcals-calculator="bc-${calcSlug}"
  data-country="ca"
  data-province="bc"
></div>`}</code>
              </pre>
            </div>
          </LCCard>
        </section>

        {/* API */}
        <section className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <CommandLineIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
            API Access
          </h3>
          <LCCard theme={theme} className="space-y-3">
            <p className="text-sm text-slate-600">
              Retrieve raw rule data, citations, and version history for this topic:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`GET /api/authority/ca/bc/${apiTopic}`}</code>
              </pre>
            </div>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`curl -H "x-api-key: lc_your_key_here" \\
  https://legalcals.com/api/authority/ca/bc/${apiTopic}`}</code>
              </pre>
            </div>
          </LCCard>
        </section>

        <StateContentDivider theme={theme} />

        <section>
          <LCCard theme={theme} className="space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              This calculator uses BC authority data. For more details, visit the{" "}
              <Link
                href="/calculators/ca/bc"
                className="underline font-medium"
                style={{ color: theme.colors.primary }}
              >
                BC Calculators Hub
              </Link>{" "}
              or the{" "}
              <Link
                href="/ca/provinces/bc"
                className="underline font-medium"
                style={{ color: theme.colors.primary }}
              >
                BC Province Page
              </Link>.
            </p>
          </LCCard>
        </section>

        <footer className="border-t pt-8 text-center text-sm text-slate-500">
          <p>LegalCals is not legal advice. Always consult a qualified attorney.</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} LegalCals. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
