import { notFound } from "next/navigation";
import Link from "next/link";

import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";

import ABTerminationPayCalculator from "@/app/ca/calculators/ab/termination-pay/ABTerminationPayCalculator";
import ABTerminationNoticePayCalculator from "@/app/ca/calculators/ab/termination-notice-pay/ABTerminationNoticePayCalculator";
import ABOvertimeCalculator from "@/app/ca/calculators/ab/overtime/ABOvertimeCalculator";
import ABGeneralHolidayCalculator from "@/app/ca/calculators/ab/general-holiday/ABGeneralHolidayCalculator";
import ABVacationPayCalculator from "@/app/ca/calculators/ab/vacation-pay/ABVacationPayCalculator";
import ABMinimumWageCalculator from "@/app/ca/calculators/ab/minimum-wage/ABMinimumWageCalculator";
import ABAverageDailyWageCalculator from "@/app/ca/calculators/ab/average-daily-wage/ABAverageDailyWageCalculator";
import ABMaternityParentalLeaveCalculator from "@/app/ca/calculators/ab/maternity-parental-leave/ABMaternityParentalLeaveCalculator";
import RuleFreshnessBanner from "@/components/RuleFreshnessBanner";

import {
  CalculatorIcon,
  ChevronLeftIcon,
  CodeBracketIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

const calculatorComponents: Record<string, React.ComponentType> = {
  "termination-pay": ABTerminationPayCalculator,
  "termination-notice-pay": ABTerminationNoticePayCalculator,
  "overtime": ABOvertimeCalculator,
  "general-holiday": ABGeneralHolidayCalculator,
  "vacation-pay": ABVacationPayCalculator,
  "minimum-wage": ABMinimumWageCalculator,
  "average-daily-wage": ABAverageDailyWageCalculator,
  "maternity-parental-leave": ABMaternityParentalLeaveCalculator,
};

const calculatorNames: Record<string, string> = {
  "termination-pay": "Termination Pay Calculator",
  "termination-notice-pay": "Termination Notice Pay Calculator",
  "overtime": "Overtime Pay Calculator",
  "general-holiday": "General Holiday Pay Calculator",
  "vacation-pay": "Vacation Pay Calculator",
  "minimum-wage": "Minimum Wage Calculator",
  "average-daily-wage": "Average Daily Wage Calculator",
  "maternity-parental-leave": "Maternity & Parental Leave Calculator",
};

const calculatorApiTopics: Record<string, string> = {
  "termination-pay": "termination-pay",
  "termination-notice-pay": "termination-notice-pay",
  "overtime": "overtime",
  "general-holiday": "general-holiday",
  "vacation-pay": "vacation-pay",
  "minimum-wage": "minimum-wage",
  "average-daily-wage": "average-daily-wage",
  "maternity-parental-leave": "maternity-parental-leave",
};

export async function generateMetadata({
  params,
}: {
  params: { calculator: string };
}) {
  const name = calculatorNames[params.calculator.toLowerCase()] || params.calculator;
  return {
    title: `${name} for Alberta | LegalCals`,
    description: `Use the ${name} for Alberta. Calculate deadlines, timelines, and legal requirements based on Alberta law.`,
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
          <RuleFreshnessBanner topic={calcSlug} jurisdiction="ab" />
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">{calcName}</h1>
            <p className="text-slate-600">
              This calculator is not yet available for{" "}
              <strong>Alberta</strong>.
            </p>
            <p className="text-sm text-slate-500">
              We are working on adding jurisdiction-specific rules. Check back soon.
            </p>
            <div className="pt-2">
              <Link
                href={`/admin/rules/${calcSlug}/ab`}
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

  const theme = getTheme("ca", "ab");
  const calcName = calculatorNames[calcSlug] || calcSlug;
  const apiTopic = calculatorApiTopics[calcSlug] || calcSlug;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-4xl mx-auto space-y-10">
        <StateSectionHeader
          title={`${calcName} for Alberta`}
          description="Calculate deadlines and rules specific to Alberta jurisdiction."
          icon={CalculatorIcon}
          theme={theme}
        />

        <div>
          <Link
            href="/calculators/ca/ab"
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            All Alberta Calculators
          </Link>
        </div>

        <RuleFreshnessBanner topic={apiTopic} jurisdiction="ab" />

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
              Paste this snippet into your HTML to embed this Alberta calculator:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`<script src="https://legalcals.com/embed.js"></script>

<div
  data-legalcals-calculator="ab-${calcSlug}"
  data-country="ca"
  data-province="ab"
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
                <code>{`GET /api/authority/ca/ab/${apiTopic}`}</code>
              </pre>
            </div>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`curl -H "x-api-key: lc_your_key_here" \\
  https://legalcals.com/api/authority/ca/ab/${apiTopic}`}</code>
              </pre>
            </div>
          </LCCard>
        </section>

        <StateContentDivider theme={theme} />

        <section>
          <LCCard theme={theme} className="space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              This calculator uses Alberta authority data. For more details, visit the{" "}
              <Link
                href="/calculators/ca/ab"
                className="underline font-medium"
                style={{ color: theme.colors.primary }}
              >
                Alberta Calculators Hub
              </Link>{" "}
              or the{" "}
              <Link
                href="/ca/provinces/ab"
                className="underline font-medium"
                style={{ color: theme.colors.primary }}
              >
                Alberta Province Page
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
