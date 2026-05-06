import { notFound } from "next/navigation";
import Link from "next/link";

import { securityDepositRules } from "@/app/data/us/securityDepositRules";
import { evictionRules } from "@/app/data/us/evictionRules";
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
  BanknotesIcon,
  DocumentTextIcon,
  MapIcon,
} from "@heroicons/react/24/outline";

const DEPOSIT_KEYWORDS = [
  "deposit",
  "security",
  "deduction",
  "itemized",
  "interest",
  "pet deposit",
  "landlord-tenant",
];

function isDepositStatute(statute: { title: string; summary: string }) {
  const text = `${statute.title} ${statute.summary}`.toLowerCase();
  return DEPOSIT_KEYWORDS.some((kw) => text.includes(kw));
}

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}) {
  const stateCode = params.state.toLowerCase();
  const deposit = securityDepositRules[stateCode];
  const stateName =
    deposit?.name ||
    evictionRules[stateCode]?.name ||
    stateCode.toUpperCase();

  const title = `${stateName} Security Deposit Rules | LegalCals`;
  const description = `Learn about ${stateName} security deposit limits, return deadlines, itemization requirements, and allowed deductions.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/us/states/${stateCode}/security-deposit`,
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
  const deposit = securityDepositRules[stateCode];

  if (!deposit) {
    return notFound();
  }

  const stateName =
    deposit.name ||
    evictionRules[stateCode]?.name ||
    stateCode.toUpperCase();

  const theme = getTheme("us", stateCode);

  const allStatutes = usStatutes[stateCode as keyof typeof usStatutes];
  const depositStatutes = allStatutes?.filter(isDepositStatute);

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`${stateName} Security Deposit Rules`}
          icon={BanknotesIcon}
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
            {stateName} has specific laws governing how landlords collect, hold,
            and return security deposits. The rules below cover maximum deposit
            limits, return deadlines, itemization requirements, and what
            deductions are permitted under state law.
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
              <dt className="font-semibold text-slate-800">Maximum Deposit</dt>
              <dd>{deposit.maxDeposit}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Return Deadline</dt>
              <dd>
                {typeof deposit.returnDeadline === "number"
                  ? `${deposit.returnDeadline} days`
                  : deposit.returnDeadline}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">
                Itemized Statement
              </dt>
              <dd>{deposit.itemizedStatementRequired ? "Required" : "Not required"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">
                Interest Required
              </dt>
              <dd>{deposit.interestRequired ? "Yes" : "No"}</dd>
            </div>
          </dl>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Maximum Deposit Allowed */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Maximum Deposit Allowed"
          description="The maximum amount a landlord may charge as a security deposit."
          icon={BanknotesIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-4">
          <dl className="space-y-3 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-800">Maximum Deposit</dt>
              <dd>{deposit.maxDeposit}</dd>
            </div>
          </dl>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Return Deadline */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Return Deadline"
          description="The deadline by which a landlord must return the deposit after tenancy ends."
          icon={DocumentTextIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-4">
          <dl className="space-y-3 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-800">Return Deadline</dt>
              <dd>
                {typeof deposit.returnDeadline === "number"
                  ? `${deposit.returnDeadline} days`
                  : deposit.returnDeadline}
              </dd>
            </div>
          </dl>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Itemization Requirements */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Itemization Requirements"
          description="Rules around providing itemized statements and interest on deposits."
          icon={DocumentTextIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-4">
          <dl className="space-y-3 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-800">
                Itemized Statement Required
              </dt>
              <dd>
                {deposit.itemizedStatementRequired
                  ? "Yes — landlords must provide a written itemized list of any deductions."
                  : "No — not explicitly required by state statute."}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">
                Interest Required
              </dt>
              <dd>
                {deposit.interestRequired
                  ? "Yes — landlords must pay interest on security deposits held."
                  : "No — state law does not require interest on deposits."}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Pet Deposit Rules</dt>
              <dd>{deposit.petDepositRules}</dd>
            </div>
          </dl>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Allowed Deductions */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Allowed Deductions"
          description="What landlords may legally deduct from the security deposit."
          icon={BanknotesIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-4">
          <dl className="space-y-3 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-800">Allowed Deductions</dt>
              <dd>{deposit.allowedDeductions}</dd>
            </div>
          </dl>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Statutes */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Relevant Statutes"
          description="Security deposit-related laws and statutes for this state."
          icon={DocumentTextIcon}
          theme={theme}
        />
        {depositStatutes && depositStatutes.length > 0 ? (
          <div className="space-y-4">
            {depositStatutes.map((statute, i) => (
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
              Security deposit-specific statutes for this state are being added.
              Check the{" "}
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
