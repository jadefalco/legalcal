import { redirect, notFound } from "next/navigation";
import Link from "next/link";

import { calculators } from "@/app/config/calculators";
import { usStates } from "@/app/config/usStates";
import { caProvinces } from "@/app/config/caProvinces";
import { defaultTheme } from "@/app/theme";

import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  MapIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

const selectClass =
  "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

export async function generateMetadata({
  params,
}: {
  params: { calculator: string };
}) {
  const calc = calculators.find((c) => c.slug === params.calculator);
  const calculatorName = calc?.name || params.calculator;

  return {
    title: `${calculatorName} Calculator — Select Your State`,
    description: `Choose your state to calculate ${calculatorName.toLowerCase()} deadlines and rules.`,
    openGraph: {
      title: `${calculatorName} Calculator — Select Your State`,
      description: `Choose your state to calculate ${calculatorName.toLowerCase()} deadlines and rules.`,
      url: `https://legalcals.com/calculators/${params.calculator}`,
      type: "website",
    },
  };
}

export default function Page({
  params,
  searchParams,
}: {
  params: { calculator: string };
  searchParams: { state?: string };
}) {
  const calcSlug = params.calculator;
  const calc = calculators.find((c) => c.slug === calcSlug);

  if (!calc) {
    return notFound();
  }

  // If state query param is present, redirect immediately
  if (searchParams.state) {
    const code = searchParams.state.toLowerCase();
    if (code in caProvinces) {
      redirect(`/calculators/ca/${code}/${calcSlug}`);
    }
    redirect(`/calculators/us/${code}/${calcSlug}`);
  }

  const theme = defaultTheme;
  const stateList = Object.entries(usStates).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  );

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <StateSectionHeader
        title={`${calc.name} Calculator`}
        description="Select your state to calculate deadlines and rules specific to your jurisdiction."
        icon={CalculatorIcon}
        theme={theme}
      />

      {/* Back link */}
      <div>
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          All Calculators
        </Link>
      </div>

      {/* Jurisdiction Selector Form */}
      <LCCard theme={theme} className="space-y-5">
        <div className="flex items-center gap-2">
          <MapIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">Select Your Jurisdiction</h2>
        </div>

        <p className="text-sm text-slate-600">
          Choose a state or province below to run the {calc.name.toLowerCase()} calculator
          with jurisdiction-specific rules and deadlines.
        </p>

        <form method="GET" className="space-y-4">
          <LCField label="State / Province" theme={theme}>
            <select name="state" required className={selectClass}>
              <option value="">— Select a jurisdiction —</option>
              <optgroup label="United States">
                {stateList.map(([code, info]) => (
                  <option key={code} value={code}>
                    {info.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Canada">
                <option value="bc">British Columbia</option>
              </optgroup>
            </select>
          </LCField>

          <LCButton variant="primary" theme={theme} type="submit">
            <ArrowRightIcon className="w-4 h-4" />
            Go to Calculator
          </LCButton>
        </form>
      </LCCard>

      <StateContentDivider theme={theme} />

      {/* Calculator Info */}
      <LCCard theme={theme} className="space-y-3">
        <h3 className="font-semibold text-slate-800 text-sm">
          About this calculator
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          {calc.description}
        </p>
        {/* sections property not available on Calculator type */}
      </LCCard>

      <StateContentDivider theme={theme} />

      {/* Browse All Jurisdictions */}
      <section className="space-y-4">
        <h3 className="font-semibold text-slate-800">Or browse by jurisdiction</h3>

        <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide">United States</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {stateList.map(([code, info]) => (
            <Link
              key={code}
              href={`/calculators/us/${code}/${calcSlug}`}
              className="block"
            >
              <LCCard
                theme={theme}
                className="text-center py-3 hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-medium text-slate-700">
                  {info.name}
                </span>
              </LCCard>
            </Link>
          ))}
        </div>

        <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide pt-4">Canada</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <Link
            href={`/calculators/ca/bc/${calcSlug}`}
            className="block"
          >
            <LCCard
              theme={theme}
              className="text-center py-3 hover:shadow-md transition-shadow"
            >
              <span className="text-sm font-medium text-slate-700">
                British Columbia
              </span>
            </LCCard>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-8 text-center text-sm text-slate-500">
        <p>LegalCals is not legal advice. Always consult a qualified attorney.</p>
      </footer>
    </main>
  );
}
