import { notFound } from "next/navigation";
import Link from "next/link";

import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";
import { usStatutes } from "@/app/config/usStatutes";
import { getTheme } from "@/app/theme";

import StateLayout from "@/app/components/lc/StateLayout";
import { StateSidebar } from "@/app/components/lc/StateSidebar";
import { StateFooterNav } from "@/app/components/lc/StateFooterNav";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  ScaleIcon,
  DocumentTextIcon,
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

function isEvictionStatute(statute: { title: string; summary: string }) {
  const text = `${statute.title} ${statute.summary}`.toLowerCase();
  return EVICTION_KEYWORDS.some((kw) => text.includes(kw));
}

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}) {
  const stateCode = params.state.toLowerCase();
  const eviction = evictionRules[stateCode];
  const stateName =
    eviction?.name ||
    securityDepositRules[stateCode]?.name ||
    stateCode.toUpperCase();

  const title = `${stateName} Eviction Rules & Timelines | LegalCals`;
  const description = `Learn about ${stateName} eviction notice requirements, court filing deadlines, hearing timelines, and lockout rules.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/us/states/${stateCode}/eviction`,
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
  const eviction = evictionRules[stateCode];

  if (!eviction) {
    return notFound();
  }

  const stateName =
    eviction.name ||
    securityDepositRules[stateCode]?.name ||
    stateCode.toUpperCase();

  const theme = getTheme("us", stateCode);

  const allStatutes = usStatutes[stateCode as keyof typeof usStatutes];
  const evictionStatutes = allStatutes?.filter(isEvictionStatute);

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`${stateName} Eviction Rules`}
          icon={ScaleIcon}
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
            {stateName} has specific eviction procedures that landlords must
            follow. The rules below cover notice requirements, filing deadlines,
            court timelines, and lockout restrictions based on current state
            statutes.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Quick Facts */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Quick Facts"
          icon={MapIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-2">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-800">
                Notice for Nonpayment
              </dt>
              <dd>
                {typeof eviction.noticeForNonpayment === "number"
                  ? `${eviction.noticeForNonpayment} days`
                  : eviction.noticeForNonpayment}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">
                Notice for Lease Violation
              </dt>
              <dd>
                {typeof eviction.noticeForLeaseViolation === "number"
                  ? `${eviction.noticeForLeaseViolation} days`
                  : eviction.noticeForLeaseViolation}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Answer Deadline</dt>
              <dd>
                {typeof eviction.answerDeadline === "number"
                  ? `${eviction.answerDeadline} days`
                  : eviction.answerDeadline}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Hearing Timeline</dt>
              <dd>{eviction.hearingTimeline}</dd>
            </div>
          </dl>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Notice Requirements */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Notice Requirements"
          description="Statutory notice periods landlords must provide before filing for eviction."
          icon={DocumentTextIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-4">
          <dl className="space-y-3 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-800">
                Nonpayment of Rent
              </dt>
              <dd>
                {typeof eviction.noticeForNonpayment === "number"
                  ? `${eviction.noticeForNonpayment} days`
                  : eviction.noticeForNonpayment}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Lease Violation</dt>
              <dd>
                {typeof eviction.noticeForLeaseViolation === "number"
                  ? `${eviction.noticeForLeaseViolation} days`
                  : eviction.noticeForLeaseViolation}
              </dd>
            </div>
          </dl>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Filing Deadlines */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Filing Deadlines"
          description="Timeframes for court filings and tenant responses."
          icon={DocumentTextIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-4">
          <dl className="space-y-3 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-800">Court Filing Time</dt>
              <dd>{eviction.courtFilingTime}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">
                Tenant Answer Deadline
              </dt>
              <dd>
                {typeof eviction.answerDeadline === "number"
                  ? `${eviction.answerDeadline} days`
                  : eviction.answerDeadline}
              </dd>
            </div>
          </dl>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Court Process */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Court Process"
          description="Hearing schedules and lockout restrictions."
          icon={ScaleIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-4">
          <dl className="space-y-3 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-800">Hearing Timeline</dt>
              <dd>{eviction.hearingTimeline}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Lockout Rules</dt>
              <dd>{eviction.lockoutAllowedAfter}</dd>
            </div>
          </dl>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Statutes */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Relevant Statutes"
          description="Eviction-related laws and statutes for this state."
          icon={DocumentTextIcon}
          theme={theme}
        />
        {evictionStatutes && evictionStatutes.length > 0 ? (
          <div className="space-y-4">
            {evictionStatutes.map((statute, i) => (
              <LCCard key={i} theme={theme} className="space-y-2">
                <h3 className="font-semibold text-slate-800 text-sm">
                  {statute.citation} — {statute.title}
                </h3>
                <p className="text-sm text-slate-600">{statute.summary}</p>
                <Link
                  href={statute.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LCButton variant="ghost" theme={theme}>
                    View Full Statute
                  </LCButton>
                </Link>
              </LCCard>
            ))}
          </div>
        ) : (
          <LCCard theme={theme}>
            <p className="text-sm text-slate-600">
              Eviction-specific statutes for this state are being added. Check
              the{" "}
              <Link
                href={`/us/states/${stateCode}/legal`}
                className="underline"
              >
                Legal Breakdown
              </Link>{" "}
              page for all available statutes.
            </p>
          </LCCard>
        )}
      </section>
    </StateLayout>
  );
}
