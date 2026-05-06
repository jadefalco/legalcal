import Link from "next/link";

import { calculators } from "@/app/config/calculators";
import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";
import { getTheme } from "@/app/theme";

import StateLayout from "@/app/components/lc/StateLayout";
import { StateSidebar } from "@/app/components/lc/StateSidebar";
import { StateFooterNav } from "@/app/components/lc/StateFooterNav";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  CalculatorIcon,
  MapIcon,
  ScaleIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const iconMap: Record<string, React.ComponentType<any>> = {
  "eviction-timeline": ScaleIcon,
  "notice-period": DocumentTextIcon,
  "security-deposit-return": BanknotesIcon,
  "rent-increase-limits": ChartBarIcon,
  "final-paycheck-deadline": DocumentTextIcon,
  "overtime-calculator": CalculatorIcon,
  "small-claims-eligibility": ScaleIcon,
};

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}) {
  const stateCode = params.state.toLowerCase();
  const stateName =
    evictionRules[stateCode]?.name ||
    securityDepositRules[stateCode]?.name ||
    stateCode.toUpperCase();

  const title = `${stateName} Legal Calculators | LegalCals`;
  const description = `Browse state-specific legal calculators for ${stateName}. Calculate eviction timelines, notice periods, security deposit returns, rent increases, and more.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/calculators/us/${stateCode}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();

  const stateName =
    evictionRules[stateCode]?.name ||
    securityDepositRules[stateCode]?.name ||
    stateCode.toUpperCase();

  const theme = getTheme("us", stateCode);

  const sortedCalculators = [...calculators].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`Calculators for ${stateName}`}
          icon={MapIcon}
          theme={theme}
        />
      }
      sidebar={<StateSidebar stateCode={stateCode} theme={theme} />}
      footer={<StateFooterNav stateCode={stateCode} theme={theme} />}
    >
      {/* Overview */}
      <section>
        <LCCard theme={theme} className="space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Explore state-specific legal calculators tailored to {stateName}{" "}
            law. Quickly compute deadlines, notice periods, deposit returns, and
            other key landlord-tenant metrics. Select a calculator below to get
            started.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Available Calculators */}
      <section className="space-y-6">
        <StateSectionHeader
          title="Available Calculators"
          description="All calculators available for this state, sorted alphabetically."
          icon={CalculatorIcon}
          theme={theme}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedCalculators.map((calc) => {
            const Icon = iconMap[calc.slug] || CalculatorIcon;
            return (
              <Link
                key={calc.slug}
                href={`/calculators/us/${stateCode}/${calc.slug}`}
              >
                <LCCard
                  theme={theme}
                  className="h-full hover:border-blue-300 transition-colors space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className="w-5 h-5"
                      style={{ color: theme.colors.primary }}
                    />
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {calc.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {calc.description}
                  </p>
                  <LCButton variant="primary" theme={theme} className="w-full">
                    Open Calculator
                  </LCButton>
                </LCCard>
              </Link>
            );
          })}
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* CTA / Additional context */}
      <section>
        <LCCard theme={theme} className="space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Need more details on {stateName} landlord-tenant laws? Visit the{" "}
            <Link
              href={`/us/states/${stateCode}`}
              className="underline font-medium"
              style={{ color: theme.colors.primary }}
            >
              State Hub
            </Link>{" "}
            or{" "}
            <Link
              href={`/us/states/${stateCode}/legal`}
              className="underline font-medium"
              style={{ color: theme.colors.primary }}
            >
              Legal Breakdown
            </Link>{" "}
            for comprehensive rule summaries, statutes, and citations.
          </p>
        </LCCard>
      </section>
    </StateLayout>
  );
}
