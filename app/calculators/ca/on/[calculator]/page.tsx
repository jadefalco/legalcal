import { notFound } from "next/navigation";
import Link from "next/link";

import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";

import ONTerminationPayCalculator from "@/app/ca/calculators/on/termination-pay/ONTerminationPayCalculator";
import ONSeverancePayCalculator from "@/app/ca/calculators/on/severance-pay/ONSeverancePayCalculator";
import ONOvertimeCalculator from "@/app/ca/calculators/on/overtime/ONOvertimeCalculator";
import ONPublicHolidayCalculator from "@/app/ca/calculators/on/public-holiday/ONPublicHolidayCalculator";
import ONVacationPayCalculator from "@/app/ca/calculators/on/vacation-pay/ONVacationPayCalculator";
import ONMinimumWageCalculator from "@/app/ca/calculators/on/minimum-wage/ONMinimumWageCalculator";
import ONAverageWeeklyEarningsCalculator from "@/app/ca/calculators/on/average-weekly-earnings/ONAverageWeeklyEarningsCalculator";
import ONPregnancyParentalLeaveCalculator from "@/app/ca/calculators/on/pregnancy-parental-leave/ONPregnancyParentalLeaveCalculator";
import RuleFreshnessBanner from "@/components/RuleFreshnessBanner";

import {
  CalculatorIcon,
  ChevronLeftIcon,
  CodeBracketIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

const calculatorComponents: Record<string, React.ComponentType> = {
  "termination-pay": ONTerminationPayCalculator,
  "severance-pay": ONSeverancePayCalculator,
  "overtime": ONOvertimeCalculator,
  "public-holiday": ONPublicHolidayCalculator,
  "vacation-pay": ONVacationPayCalculator,
  "minimum-wage": ONMinimumWageCalculator,
  "average-weekly-earnings": ONAverageWeeklyEarningsCalculator,
  "pregnancy-parental-leave": ONPregnancyParentalLeaveCalculator,
};

const calculatorNames: Record<string, string> = {
  "termination-pay": "Termination Pay Calculator",
  "severance-pay": "Severance Pay Calculator",
  "overtime": "Overtime Pay Calculator",
  "public-holiday": "Public Holiday Pay Calculator",
  "vacation-pay": "Vacation Pay Calculator",
  "minimum-wage": "Minimum Wage Calculator",
  "average-weekly-earnings": "Average Weekly Earnings Calculator",
  "pregnancy-parental-leave": "Pregnancy & Parental Leave Calculator",
};

const calculatorApiTopics: Record<string, string> = {
  "termination-pay": "termination-pay",
  "severance-pay": "severance-pay",
  "overtime": "overtime",
  "public-holiday": "public-holiday",
  "vacation-pay": "vacation-pay",
  "minimum-wage": "minimum-wage",
  "average-weekly-earnings": "average-weekly-earnings",
  "pregnancy-parental-leave": "pregnancy-parental-leave",
};

export async function generateMetadata({
  params,
}: {
  params: { calculator: string };
}) {
  const name = calculatorNames[params.calculator.toLowerCase()] || params.calculator;
  return {
    title: `${name} for Ontario | LegalCals`,
    description: `Use the ${name} for Ontario. Calculate deadlines, timelines, and legal requirements based on Ontario law.`,
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
          <RuleFreshnessBanner topic={calcSlug} jurisdiction="on" />
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">{calcName}</h1>
            <p className="text-slate-600">
              This calculator is not yet available for{" "}
              <strong>Ontario</strong>.
            </p>
            <p className="text-sm text-slate-500">
              We are working on adding jurisdiction-specific rules. Check back soon.
            </p>
            <div className="pt-2">
              <Link
                href={`/admin/rules/${calcSlug}/on`}
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

  const theme = getTheme("ca", "on");
  const calcName = calculatorNames[calcSlug] || calcSlug;
  const apiTopic = calculatorApiTopics[calcSlug] || calcSlug;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-4xl mx-auto space-y-10">
        <StateSectionHeader
          title={`${calcName} for Ontario`}
          description="Calculate deadlines and rules specific to Ontario jurisdiction."
          icon={CalculatorIcon}
          theme={theme}
        />

        <div>
          <Link
            href="/calculators/ca/on"
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            All Ontario Calculators
          </Link>
        </div>

        <RuleFreshnessBanner topic={apiTopic} jurisdiction="on" />

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
              Paste this snippet into your HTML to embed this Ontario calculator:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`<script src="https://legalcals.com/embed.js"></script>

<div
  data-legalcals-calculator="on-${calcSlug}"
  data-country="ca"
  data-province="on"
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
                <code>{`GET /api/authority/ca/on/${apiTopic}`}</code>
              </pre>
            </div>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`curl -H "x-api-key: lc_your_key_here" \\
  https://legalcals.com/api/authority/ca/on/${apiTopic}`}</code>
              </pre>
            </div>
          </LCCard>
        </section>

        <StateContentDivider theme={theme} />

        <section>
          <LCCard theme={theme} className="space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              This calculator uses Ontario authority data. For more details, visit the{" "}
              <Link
                href="/calculators/ca/on"
                className="underline font-medium"
                style={{ color: theme.colors.primary }}
              >
                Ontario Calculators Hub
              </Link>{" "}
              or the{" "}
              <Link
                href="/ca/provinces/on"
                className="underline font-medium"
                style={{ color: theme.colors.primary }}
              >
                Ontario Province Page
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
