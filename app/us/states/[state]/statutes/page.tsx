import Link from "next/link";

import { usStatutes } from "@/app/config/usStatutes";
import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";
import { getTheme } from "@/app/theme";
import type { Theme } from "@/app/types/Theme";

import StateLayout from "@/app/components/lc/StateLayout";
import { StateSidebar } from "@/app/components/lc/StateSidebar";
import { StateFooterNav } from "@/app/components/lc/StateFooterNav";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  DocumentTextIcon,
  ScaleIcon,
  MapIcon,
} from "@heroicons/react/24/outline";

const EVICTION_KEYWORDS = [
  "evict",
  "termination",
  "terminat",
  "unlawful",
  "detainer",
  "forcible",
  "possession",
  "summary",
];

const DEPOSIT_KEYWORDS = [
  "deposit",
  "security",
  "deduction",
  "itemized",
  "interest",
  "pet deposit",
];

interface Statute {
  citation: string;
  title: string;
  url: string;
  summary: string;
}

function isEvictionStatute(statute: Statute) {
  const text = `${statute.title} ${statute.summary}`.toLowerCase();
  return EVICTION_KEYWORDS.some((kw) => text.includes(kw));
}

function isDepositStatute(statute: Statute) {
  const text = `${statute.title} ${statute.summary}`.toLowerCase();
  return DEPOSIT_KEYWORDS.some((kw) => text.includes(kw));
}

function sortByTitle<T extends { title: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

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

  const title = `${stateName} Landlord-Tenant Statutes & Laws | LegalCals`;
  const description = `Browse ${stateName} landlord-tenant statutes, eviction laws, security deposit regulations, and legal citations.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/us/states/${stateCode}/statutes`,
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

  const rawStatutes = usStatutes[stateCode as keyof typeof usStatutes];
  const statutes: Statute[] | undefined = rawStatutes
    ? rawStatutes.map((s) => ({ ...s }))
    : undefined;

  const evictionStatutes = statutes?.filter(isEvictionStatute);
  const depositStatutes = statutes?.filter(isDepositStatute);

  const sortedAll = statutes ? sortByTitle(statutes) : [];
  const sortedEviction = evictionStatutes ? sortByTitle(evictionStatutes) : [];
  const sortedDeposit = depositStatutes ? sortByTitle(depositStatutes) : [];

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`${stateName} Statutes`}
          icon={DocumentTextIcon}
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
            The statutes below represent the key landlord-tenant laws for{" "}
            {stateName}. These include eviction procedures, security deposit
            regulations, notice requirements, and other tenant protections
            codified in state law. Each entry includes the official citation, a
            plain-language summary, and a link to the full text where available.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Eviction Statutes */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Eviction Statutes"
          description="Laws governing eviction procedures, notice requirements, and unlawful detainer."
          icon={ScaleIcon}
          theme={theme}
        />
        {sortedEviction.length > 0 ? (
          <div className="space-y-4">
            {sortedEviction.map((statute, i) => (
              <StatuteCard key={i} statute={statute} theme={theme} />
            ))}
          </div>
        ) : (
          <EmptyState theme={theme} type="eviction" stateCode={stateCode} />
        )}
      </section>

      <StateContentDivider theme={theme} />

      {/* Security Deposit Statutes */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Security Deposit Statutes"
          description="Laws governing deposit limits, return deadlines, and allowable deductions."
          icon={DocumentTextIcon}
          theme={theme}
        />
        {sortedDeposit.length > 0 ? (
          <div className="space-y-4">
            {sortedDeposit.map((statute, i) => (
              <StatuteCard key={i} statute={statute} theme={theme} />
            ))}
          </div>
        ) : (
          <EmptyState
            theme={theme}
            type="security deposit"
            stateCode={stateCode}
          />
        )}
      </section>

      <StateContentDivider theme={theme} />

      {/* All Statutes */}
      <section className="space-y-4">
        <StateSectionHeader
          title={`All Statutes for ${stateName}`}
          description="Complete list of landlord-tenant statutes for this state."
          icon={MapIcon}
          theme={theme}
        />
        {sortedAll.length > 0 ? (
          <div className="space-y-4">
            {sortedAll.map((statute, i) => (
              <StatuteCard key={i} statute={statute} theme={theme} />
            ))}
          </div>
        ) : (
          <LCCard theme={theme}>
            <p className="text-sm text-slate-600">
              Statutes for {stateName} are being added. Check back soon or visit
              the{" "}
              <Link
                href={`/us/states/${stateCode}/legal`}
                className="underline"
              >
                Legal Breakdown
              </Link>{" "}
              page for other available resources.
            </p>
          </LCCard>
        )}
      </section>

      <StateContentDivider theme={theme} />
    </StateLayout>
  );
}

function StatuteCard({ statute, theme }: { statute: Statute; theme: Theme }) {
  return (
    <LCCard theme={theme} className="space-y-2">
      <h3 className="font-semibold text-slate-800 text-sm">
        {statute.citation} — {statute.title}
      </h3>
      <p className="text-sm text-slate-600">{statute.summary}</p>
      {statute.url && (
        <Link href={statute.url} target="_blank" rel="noopener noreferrer">
          <LCButton variant="ghost" theme={theme}>
            View Full Statute
          </LCButton>
        </Link>
      )}
    </LCCard>
  );
}

function EmptyState({
  theme,
  type,
  stateCode,
}: {
  theme: Theme;
  type: string;
  stateCode: string;
}) {
  return (
    <LCCard theme={theme}>
      <p className="text-sm text-slate-600">
        {type.charAt(0).toUpperCase() + type.slice(1)}-specific statutes for
        this state are being added. Visit the{" "}
        <Link href={`/us/states/${stateCode}/legal`} className="underline">
          Legal Breakdown
        </Link>{" "}
        page for all currently available statutes.
      </p>
    </LCCard>
  );
}
