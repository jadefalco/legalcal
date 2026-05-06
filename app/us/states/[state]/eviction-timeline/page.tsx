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
import { LCTimeline } from "@/app/components/lc/LCTimeline";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  ScaleIcon,
  DocumentTextIcon,
  MapIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowRightCircleIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

const toStr = (v: unknown) =>
  v === null ? "Varies" : typeof v === "number" ? `${v} days` : String(v);

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

  const title = `${stateName} Eviction Timeline | LegalCals`;
  const description = `Step-by-step eviction timeline for ${stateName}: notice periods, court filing, tenant answer deadlines, hearings, and lockout rules.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/us/states/${stateCode}/eviction-timeline`,
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

  const timelineSteps = [
    {
      title: "Notice Period (Nonpayment)",
      description: toStr(eviction.noticeForNonpayment),
      icon: ExclamationTriangleIcon,
      color: "text-amber-600",
    },
    {
      title: "Notice Period (Lease Violation)",
      description: toStr(eviction.noticeForLeaseViolation),
      icon: ExclamationTriangleIcon,
      color: "text-red-600",
    },
    {
      title: "Landlord Can File",
      description: toStr(eviction.courtFilingTime),
      icon: CalendarDaysIcon,
      color: "text-blue-600",
    },
    {
      title: "Tenant Answer Deadline",
      description: toStr(eviction.answerDeadline),
      icon: ClockIcon,
      color: "text-purple-600",
    },
    {
      title: "Hearing Timeline",
      description: toStr(eviction.hearingTimeline),
      icon: ClockIcon,
      color: "text-green-600",
    },
    {
      title: "Lockout / Physical Eviction",
      description: toStr(eviction.lockoutAllowedAfter),
      icon: ExclamationTriangleIcon,
      color: "text-red-700",
    },
  ];

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`${stateName} Eviction Timeline`}
          description="Step-by-step legal timeline from notice to lockout."
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
            The eviction process in {stateName} follows a strict statutory
            timeline. Landlords must provide proper notice, wait for the notice
            period to expire, file with the court, and obtain a judgment before
            a lockout can occur. The timeline below outlines each step in
            chronological order based on current state law.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Timeline */}
      <section>
        <LCTimeline
          title="Eviction Process Timeline"
          icon={ArrowRightCircleIcon}
          steps={timelineSteps}
          theme={theme}
        />
      </section>

      <StateContentDivider theme={theme} />

      {/* Related Resources */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Related Resources"
          description="Explore statutes, detailed rules, and calculators for this state."
          icon={MapIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Link href={`/us/states/${stateCode}/statutes`}>
              <LCButton variant="ghost" theme={theme}>
                <DocumentTextIcon className="w-4 h-4" />
                State Statutes
              </LCButton>
            </Link>
            <Link href={`/us/states/${stateCode}/eviction`}>
              <LCButton variant="ghost" theme={theme}>
                <ScaleIcon className="w-4 h-4" />
                Eviction Rules
              </LCButton>
            </Link>
            <Link
              href={`/calculators/us/${stateCode}/eviction-timeline`}
            >
              <LCButton variant="primary" theme={theme}>
                <CalculatorIcon className="w-4 h-4" />
                Eviction Calculator
              </LCButton>
            </Link>
          </div>
        </LCCard>
      </section>
    </StateLayout>
  );
}
