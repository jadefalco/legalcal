import { notFound } from "next/navigation";
import Link from "next/link";

import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";
import { leaseTerminationRules } from "@/app/data/us/leaseTerminationRules";
import { rentIncreaseRules } from "@/app/data/us/rentIncreaseRules";
import { getTheme } from "@/app/theme";

import StateLayout from "@/app/components/lc/StateLayout";
import { StateSidebar } from "@/app/components/lc/StateSidebar";
import { StateFooterNav } from "@/app/components/lc/StateFooterNav";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  PlayIcon,
  ScaleIcon,
  DocumentTextIcon,
  ClockIcon,
  BanknotesIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CalculatorIcon,
  ArrowRightIcon,
  KeyIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}) {
  const stateCode = params.state.toLowerCase();
  const state =
    evictionRules[stateCode] ||
    securityDepositRules[stateCode] ||
    leaseTerminationRules[stateCode] ||
    rentIncreaseRules[stateCode];
  const stateName = state?.name || stateCode.toUpperCase();

  return {
    title: `Start Here: ${stateName} Rental Laws & Tools`,
    description: `Everything you need to understand and navigate landlord-tenant law in ${stateName}.`,
    openGraph: {
      title: `Start Here: ${stateName} Rental Laws & Tools`,
      description: `Everything you need to understand and navigate landlord-tenant law in ${stateName}.`,
      url: `https://legalcals.com/us/states/${stateCode}/start`,
      type: "website",
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();
  const eviction = evictionRules[stateCode];
  const deposit = securityDepositRules[stateCode];
  const termination = leaseTerminationRules[stateCode];
  const rentIncrease = rentIncreaseRules[stateCode];

  if (!eviction && !deposit && !termination && !rentIncrease) {
    return notFound();
  }

  const stateName =
    eviction?.name ||
    deposit?.name ||
    termination?.name ||
    rentIncrease?.name ||
    stateCode.toUpperCase();

  const theme = getTheme("us", stateCode);

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`Start Here: ${stateName} Rental Laws & Tools`}
          description={`Everything you need to understand and navigate landlord-tenant law in ${stateName}.`}
          icon={PlayIcon}
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
            Welcome to the {stateName} legal toolkit. Whether you are a tenant
            facing eviction, a landlord managing a property, or simply looking
            to understand your rights, this page will guide you to the right
            resource. Explore calculators, notice generators, legal summaries,
            and state-specific rules—all in one place.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* 1. Quick Actions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ArrowRightIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {eviction && (
            <ActionCard
              icon={ClockIcon}
              title="Eviction Timeline"
              description="See how long each step of the eviction process takes."
              href={`/us/states/${stateCode}/eviction-timeline`}
              theme={theme}
            />
          )}
          {deposit && (
            <ActionCard
              icon={BanknotesIcon}
              title="Deposit Timeline"
              description="Track when your deposit should be returned."
              href={`/us/states/${stateCode}/security-deposit-timeline`}
              theme={theme}
            />
          )}
          <ActionCard
            icon={DocumentTextIcon}
            title="Notice Generators"
            description="Create state-specific notices and letters."
            href={`/us/states/${stateCode}/notices/nonpayment`}
            theme={theme}
          />
          <ActionCard
            icon={ShieldCheckIcon}
            title="Tenant Rights"
            description="Know your rights as a renter in this state."
            href={`/us/states/${stateCode}/tenant-rights`}
            theme={theme}
          />
          <ActionCard
            icon={HomeIcon}
            title="Landlord Obligations"
            description="Understand your legal duties as a landlord."
            href={`/us/states/${stateCode}/landlord-obligations`}
            theme={theme}
          />
          <ActionCard
            icon={ScaleIcon}
            title="Legal Summary"
            description="Read the complete overview of state rental law."
            href={`/us/states/${stateCode}/summary`}
            theme={theme}
          />
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* 2. Essential Guides */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">Essential Guides</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LCCard theme={theme} className="space-y-3">
            <div className="flex items-center gap-2">
              <ScaleIcon className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-800 text-sm">Legal Summary</h3>
            </div>
            <p className="text-sm text-slate-600">
              A complete overview of eviction, deposit, tenant rights, and
              landlord obligations in {stateName}.
            </p>
            <Link href={`/us/states/${stateCode}/summary`}>
              <LCButton variant="ghost" theme={theme}>
                Read Summary
                <ArrowRightIcon className="w-4 h-4" />
              </LCButton>
            </Link>
          </LCCard>

          {eviction && (
            <LCCard theme={theme} className="space-y-3">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-800 text-sm">Eviction Overview</h3>
              </div>
              <p className="text-sm text-slate-600">
                Notice periods, court filing rules, hearing timelines, and
                lockout procedures.
              </p>
              <Link href={`/us/states/${stateCode}/eviction`}>
                <LCButton variant="ghost" theme={theme}>
                  View Eviction Rules
                  <ArrowRightIcon className="w-4 h-4" />
                </LCButton>
              </Link>
            </LCCard>
          )}

          {deposit && (
            <LCCard theme={theme} className="space-y-3">
              <div className="flex items-center gap-2">
                <BanknotesIcon className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-800 text-sm">Deposit Overview</h3>
              </div>
              <p className="text-sm text-slate-600">
                Maximum deposit limits, return deadlines, deductions, and
                itemized statement rules.
              </p>
              <Link href={`/us/states/${stateCode}/security-deposit`}>
                <LCButton variant="ghost" theme={theme}>
                  View Deposit Rules
                  <ArrowRightIcon className="w-4 h-4" />
                </LCButton>
              </Link>
            </LCCard>
          )}

          <LCCard theme={theme} className="space-y-3">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-800 text-sm">Required Notices</h3>
            </div>
            <p className="text-sm text-slate-600">
              Generate nonpayment, lease violation, end-of-lease, rent
              increase, and entry notices.
            </p>
            <div className="flex flex-wrap gap-2">
              {eviction && (
                <Link href={`/us/states/${stateCode}/notices/nonpayment`}>
                  <LCButton variant="ghost" theme={theme}>
                    Nonpayment
                  </LCButton>
                </Link>
              )}
              {eviction && (
                <Link href={`/us/states/${stateCode}/notices/lease-violation`}>
                  <LCButton variant="ghost" theme={theme}>
                    Violation
                  </LCButton>
                </Link>
              )}
              <Link href={`/us/states/${stateCode}/notices/end-of-lease`}>
                <LCButton variant="ghost" theme={theme}>
                  End-of-Lease
                </LCButton>
              </Link>
            </div>
          </LCCard>
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* 3. Tools & Calculators */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <CalculatorIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">Tools & Calculators</h2>
        </div>
        <LCCard theme={theme} className="space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            Run state-specific calculations for eviction deadlines, deposit
            returns, notice periods, rent increases, and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/calculators/us/${stateCode}`}>
              <LCButton variant="primary" theme={theme}>
                <CalculatorIcon className="w-4 h-4" />
                All Calculators
              </LCButton>
            </Link>
            {eviction && (
              <Link href={`/calculators/us/${stateCode}/eviction-timeline`}>
                <LCButton variant="ghost" theme={theme}>
                  <ClockIcon className="w-4 h-4" />
                  Eviction Timeline
                </LCButton>
              </Link>
            )}
            {deposit && (
              <Link href={`/calculators/us/${stateCode}/security-deposit-return`}>
                <LCButton variant="ghost" theme={theme}>
                  <BanknotesIcon className="w-4 h-4" />
                  Deposit Return
                </LCButton>
              </Link>
            )}
            <Link href={`/calculators/us/${stateCode}/notice-period`}>
              <LCButton variant="ghost" theme={theme}>
                <ClockIcon className="w-4 h-4" />
                Notice Period
              </LCButton>
            </Link>
            <Link href={`/calculators/us/${stateCode}/rent-increase-limits`}>
              <LCButton variant="ghost" theme={theme}>
                <ExclamationTriangleIcon className="w-4 h-4" />
                Rent Increase
              </LCButton>
            </Link>
          </div>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* 4. Legal References */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ScaleIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">Legal References</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <LCCard theme={theme} className="space-y-3">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-800 text-sm">Statutes</h3>
            </div>
            <p className="text-sm text-slate-600">
              Browse the full text of state landlord-tenant statutes.
            </p>
            <Link href={`/us/states/${stateCode}/statutes`}>
              <LCButton variant="ghost" theme={theme}>
                View Statutes
                <ArrowRightIcon className="w-4 h-4" />
              </LCButton>
            </Link>
          </LCCard>

          {eviction && (
            <LCCard theme={theme} className="space-y-3">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-800 text-sm">Eviction Rules</h3>
              </div>
              <p className="text-sm text-slate-600">
                Detailed rules for notices, filings, hearings, and lockouts.
              </p>
              <Link href={`/us/states/${stateCode}/eviction`}>
                <LCButton variant="ghost" theme={theme}>
                  View Rules
                  <ArrowRightIcon className="w-4 h-4" />
                </LCButton>
              </Link>
            </LCCard>
          )}

          {deposit && (
            <LCCard theme={theme} className="space-y-3">
              <div className="flex items-center gap-2">
                <BanknotesIcon className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-800 text-sm">Deposit Rules</h3>
              </div>
              <p className="text-sm text-slate-600">
                Maximum limits, return deadlines, and deduction rules.
              </p>
              <Link href={`/us/states/${stateCode}/security-deposit`}>
                <LCButton variant="ghost" theme={theme}>
                  View Rules
                  <ArrowRightIcon className="w-4 h-4" />
                </LCButton>
              </Link>
            </LCCard>
          )}

          {termination && (
            <LCCard theme={theme} className="space-y-3">
              <div className="flex items-center gap-2">
                <HomeIcon className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-800 text-sm">Lease Termination</h3>
              </div>
              <p className="text-sm text-slate-600">
                Notice periods, early termination rules, and exceptions.
              </p>
              <Link href={`/us/states/${stateCode}/lease-termination`}>
                <LCButton variant="ghost" theme={theme}>
                  View Rules
                  <ArrowRightIcon className="w-4 h-4" />
                </LCButton>
              </Link>
            </LCCard>
          )}

          {rentIncrease && (
            <LCCard theme={theme} className="space-y-3">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-800 text-sm">Rent Increase</h3>
              </div>
              <p className="text-sm text-slate-600">
                Notice requirements and rent control rules.
              </p>
              <Link href={`/us/states/${stateCode}/rent-increase`}>
                <LCButton variant="ghost" theme={theme}>
                  View Rules
                  <ArrowRightIcon className="w-4 h-4" />
                </LCButton>
              </Link>
            </LCCard>
          )}

          <LCCard theme={theme} className="space-y-3">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-800 text-sm">Documents</h3>
            </div>
            <p className="text-sm text-slate-600">
              State-specific document templates and forms.
            </p>
            <Link href={`/us/states/${stateCode}/documents`}>
              <LCButton variant="ghost" theme={theme}>
                View Documents
                <ArrowRightIcon className="w-4 h-4" />
              </LCButton>
            </Link>
          </LCCard>
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* 5. Help Me Choose */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <QuestionMarkCircleIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">Help Me Choose</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LCCard theme={theme} className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />
              <h3 className="font-semibold text-slate-800">I&apos;m a Tenant</h3>
            </div>
            <p className="text-sm text-slate-600">
              Learn your rights, demand your deposit back, or generate a
              lease termination notice.
            </p>
            <div className="flex flex-col gap-2">
              <Link href={`/us/states/${stateCode}/tenant-rights`}>
                <LCButton variant="primary" theme={theme} className="w-full justify-center">
                  Tenant Rights
                </LCButton>
              </Link>
              {deposit && (
                <Link href={`/us/states/${stateCode}/notices/deposit-demand`}>
                  <LCButton variant="ghost" theme={theme} className="w-full justify-center">
                    Deposit Demand Letter
                  </LCButton>
                </Link>
              )}
              <Link href={`/us/states/${stateCode}/notices/lease-termination`}>
                <LCButton variant="ghost" theme={theme} className="w-full justify-center">
                  Termination Notice
                </LCButton>
              </Link>
            </div>
          </LCCard>

          <LCCard theme={theme} className="space-y-4">
            <div className="flex items-center gap-2">
              <HomeIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />
              <h3 className="font-semibold text-slate-800">I&apos;m a Landlord</h3>
            </div>
            <p className="text-sm text-slate-600">
              Understand your obligations, generate eviction notices, or
              review eviction procedures.
            </p>
            <div className="flex flex-col gap-2">
              <Link href={`/us/states/${stateCode}/landlord-obligations`}>
                <LCButton variant="primary" theme={theme} className="w-full justify-center">
                  Landlord Obligations
                </LCButton>
              </Link>
              {eviction && (
                <Link href={`/us/states/${stateCode}/notices/nonpayment`}>
                  <LCButton variant="ghost" theme={theme} className="w-full justify-center">
                    Nonpayment Notice
                  </LCButton>
                </Link>
              )}
              {eviction && (
                <Link href={`/us/states/${stateCode}/eviction`}>
                  <LCButton variant="ghost" theme={theme} className="w-full justify-center">
                    Eviction Rules
                  </LCButton>
                </Link>
              )}
            </div>
          </LCCard>

          <LCCard theme={theme} className="space-y-4">
            <div className="flex items-center gap-2">
              <QuestionMarkCircleIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />
              <h3 className="font-semibold text-slate-800">I&apos;m Not Sure</h3>
            </div>
            <p className="text-sm text-slate-600">
              Start with the complete legal summary to understand your
              situation and find the right next step.
            </p>
            <div className="flex flex-col gap-2">
              <Link href={`/us/states/${stateCode}/summary`}>
                <LCButton variant="primary" theme={theme} className="w-full justify-center">
                  Legal Summary
                </LCButton>
              </Link>
              <Link href={`/us/states/${stateCode}/legal`}>
                <LCButton variant="ghost" theme={theme} className="w-full justify-center">
                  Legal Hub
                </LCButton>
              </Link>
              <Link href={`/calculators/us/${stateCode}`}>
                <LCButton variant="ghost" theme={theme} className="w-full justify-center">
                  Browse Calculators
                </LCButton>
              </Link>
            </div>
          </LCCard>
        </div>
      </section>
    </StateLayout>
  );
}

function ActionCard({
  icon: Icon,
  title,
  description,
  href,
  theme,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  href: string;
  theme: import("@/app/types/Theme").Theme;
}) {
  return (
    <Link href={href} className="block">
      <LCCard
        theme={theme}
        className="space-y-2 h-full hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
        <div className="flex items-center text-sm" style={{ color: theme.colors.primary }}>
          Go <ArrowRightIcon className="w-4 h-4 ml-1" />
        </div>
      </LCCard>
    </Link>
  );
}
