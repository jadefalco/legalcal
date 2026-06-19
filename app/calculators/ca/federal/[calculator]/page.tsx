import { notFound } from "next/navigation";
import Link from "next/link";

import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";

import FederalEIMaternityCalculator from "@/app/ca/calculators/federal/ei-maternity/FederalEIMaternityCalculator";
import FederalEIParentalCalculator from "@/app/ca/calculators/federal/ei-parental/FederalEIParentalCalculator";
import FederalEISicknessCalculator from "@/app/ca/calculators/federal/ei-sickness/FederalEISicknessCalculator";
import FederalEIRegularCalculator from "@/app/ca/calculators/federal/ei-regular/FederalEIRegularCalculator";
import FederalCPPRetirementCalculator from "@/app/ca/calculators/federal/cpp-retirement/FederalCPPRetirementCalculator";
import FederalCPPDisabilityCalculator from "@/app/ca/calculators/federal/cpp-disability/FederalCPPDisabilityCalculator";
import FederalCLCOvertimeCalculator from "@/app/ca/calculators/federal/clc-overtime/FederalCLCOvertimeCalculator";
import FederalCLCHolidayPayCalculator from "@/app/ca/calculators/federal/clc-holiday-pay/FederalCLCHolidayPayCalculator";
import RuleFreshnessBanner from "@/components/RuleFreshnessBanner";

import {
  CalculatorIcon,
  ChevronLeftIcon,
  CodeBracketIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

const calculatorComponents: Record<string, React.ComponentType> = {
  "ei-maternity": FederalEIMaternityCalculator,
  "ei-parental": FederalEIParentalCalculator,
  "ei-sickness": FederalEISicknessCalculator,
  "ei-regular": FederalEIRegularCalculator,
  "cpp-retirement": FederalCPPRetirementCalculator,
  "cpp-disability": FederalCPPDisabilityCalculator,
  "clc-overtime": FederalCLCOvertimeCalculator,
  "clc-holiday-pay": FederalCLCHolidayPayCalculator,
};

const calculatorNames: Record<string, string> = {
  "ei-maternity": "EI Maternity Benefits Calculator",
  "ei-parental": "EI Parental Benefits Calculator",
  "ei-sickness": "EI Sickness Benefits Calculator",
  "ei-regular": "EI Regular Benefits Calculator",
  "cpp-retirement": "CPP Retirement Pension Calculator",
  "cpp-disability": "CPP Disability Benefits Calculator",
  "clc-overtime": "Canada Labour Code Overtime Calculator",
  "clc-holiday-pay": "Canada Labour Code General Holiday Pay Calculator",
};

const calculatorApiTopics: Record<string, string> = {
  "ei-maternity": "ei-maternity",
  "ei-parental": "ei-parental",
  "ei-sickness": "ei-sickness",
  "ei-regular": "ei-regular",
  "cpp-retirement": "cpp-retirement",
  "cpp-disability": "cpp-disability",
  "clc-overtime": "clc-overtime",
  "clc-holiday-pay": "clc-holiday-pay",
};

export async function generateMetadata({
  params,
}: {
  params: { calculator: string };
}) {
  const name = calculatorNames[params.calculator.toLowerCase()] || params.calculator;
  return {
    title: `${name} — Federal | LegalCals`,
    description: `Use the ${name} for Canada federal jurisdiction. Calculate entitlements and legal requirements based on federal law.`,
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
          <RuleFreshnessBanner topic={calcSlug} jurisdiction="federal" />
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">{calcName}</h1>
            <p className="text-slate-600">
              This calculator is not yet available for{" "}
              <strong>Federal</strong> jurisdiction.
            </p>
            <p className="text-sm text-slate-500">
              We are working on adding jurisdiction-specific rules. Check back soon.
            </p>
            <div className="pt-2">
              <Link
                href={`/admin/rules/${calcSlug}/federal`}
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

  const theme = getTheme("ca", "federal");
  const calcName = calculatorNames[calcSlug] || calcSlug;
  const apiTopic = calculatorApiTopics[calcSlug] || calcSlug;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-4xl mx-auto space-y-10">
        <StateSectionHeader
          title={`${calcName} — Federal`}
          description="Calculate entitlements and rules specific to Canadian federal jurisdiction."
          icon={CalculatorIcon}
          theme={theme}
        />

        <div>
          <Link
            href="/calculators/ca/federal"
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            All Federal Calculators
          </Link>
        </div>

        <RuleFreshnessBanner topic={apiTopic} jurisdiction="federal" />

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
              Paste this snippet into your HTML to embed this Federal calculator:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`<script src="https://legalcals.com/embed.js"></script>

<div
  data-legalcals-calculator="federal-${calcSlug}"
  data-country="ca"
  data-province="federal"
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
                <code>{`GET /api/authority/ca/federal/${apiTopic}`}</code>
              </pre>
            </div>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`curl -H "x-api-key: lc_your_key_here" \\
  https://legalcals.com/api/authority/ca/federal/${apiTopic}`}</code>
              </pre>
            </div>
          </LCCard>
        </section>

        <StateContentDivider theme={theme} />

        <section>
          <LCCard theme={theme} className="space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              This calculator uses Federal authority data. For more details, visit the{" "}
              <Link
                href="/calculators/ca/federal"
                className="underline font-medium"
                style={{ color: theme.colors.primary }}
              >
                Federal Calculators Hub
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
