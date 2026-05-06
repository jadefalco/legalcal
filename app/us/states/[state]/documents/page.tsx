import Link from "next/link";

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
  MapIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

interface DocumentItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href?: string;
}

const EVICTION_DOCUMENTS: DocumentItem[] = [
  {
    title: "Notice to Quit",
    description:
      "Formal notice informing a tenant they must vacate the premises by a specified date.",
    icon: DocumentTextIcon,
  },
  {
    title: "Notice of Rent Nonpayment",
    description:
      "Demand letter notifying the tenant of overdue rent and the deadline to pay or face eviction proceedings.",
    icon: DocumentTextIcon,
  },
  {
    title: "Court Filing Packet",
    description:
      "Complete set of forms required to initiate an eviction lawsuit in {stateName} court.",
    icon: ScaleIcon,
  },
  {
    title: "Sheriff / Writ Forms",
    description:
      "Documents needed to request a writ of possession and coordinate lockout with local law enforcement.",
    icon: ScaleIcon,
  },
];

const DEPOSIT_DOCUMENTS: DocumentItem[] = [
  {
    title: "Move-In Checklist",
    description:
      "Standardized inspection form to document property condition at move-in, protecting both landlord and tenant.",
    icon: DocumentTextIcon,
  },
  {
    title: "Itemized Deductions Letter",
    description:
      "Detailed letter listing all deductions from the security deposit with supporting receipts and descriptions.",
    icon: DocumentTextIcon,
  },
  {
    title: "Deposit Return Letter",
    description:
      "Formal letter accompanying the returned security deposit, explaining any withholdings and refund amount.",
    icon: DocumentTextIcon,
  },
];

const GENERAL_DOCUMENTS: DocumentItem[] = [
  {
    title: "Lease Agreement",
    description:
      "Comprehensive residential lease tailored to {stateName} law, covering rent, term, maintenance, and dispute resolution.",
    icon: DocumentTextIcon,
  },
  {
    title: "Renewal Notice",
    description:
      "Notice to tenant offering lease renewal terms, rent adjustments, and response deadline.",
    icon: DocumentTextIcon,
  },
  {
    title: "Rent Increase Notice",
    description:
      "Legally compliant notice of upcoming rent increase, including required advance notice period.",
    icon: DocumentTextIcon,
  },
  {
    title: "Termination Notice",
    description:
      "Formal notice ending a month-to-month tenancy or declining renewal, with statutory notice period.",
    icon: DocumentTextIcon,
  },
];

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

  const title = `${stateName} Legal Documents & Forms | LegalCals`;
  const description = `Download and generate state-specific legal documents for ${stateName}. Eviction notices, lease agreements, deposit letters, and more.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/us/states/${stateCode}/documents`,
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

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`${stateName} Legal Documents`}
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
            Access state-specific legal documents and forms for {stateName}{" "}
            landlord-tenant matters. From eviction notices and lease agreements
            to deposit return letters and court filings, these templates are
            designed to comply with {stateName} statutes and streamline your
            workflow. Documents marked &ldquo;Coming Soon&rdquo; will be available for
            download and auto-generation in a future release.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Eviction Documents */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Eviction Documents"
          description="Forms and notices required for lawful eviction proceedings."
          icon={ScaleIcon}
          theme={theme}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {EVICTION_DOCUMENTS.map((doc) => (
            <DocumentCard
              key={doc.title}
              doc={doc}
              theme={theme}
              stateName={stateName}
            />
          ))}
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* Security Deposit Documents */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Security Deposit Documents"
          description="Forms for tracking, deducting, and returning security deposits."
          icon={DocumentTextIcon}
          theme={theme}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {DEPOSIT_DOCUMENTS.map((doc) => (
            <DocumentCard
              key={doc.title}
              doc={doc}
              theme={theme}
              stateName={stateName}
            />
          ))}
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* General Landlord-Tenant Documents */}
      <section className="space-y-4">
        <StateSectionHeader
          title="General Landlord-Tenant Documents"
          description="Core lease and notice documents for residential tenancies."
          icon={MapIcon}
          theme={theme}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {GENERAL_DOCUMENTS.map((doc) => (
            <DocumentCard
              key={doc.title}
              doc={doc}
              theme={theme}
              stateName={stateName}
            />
          ))}
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* CTA */}
      <section>
        <LCCard theme={theme} className="space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Looking for calculators instead? Try the{" "}
            <Link
              href={`/calculators/us/${stateCode}`}
              className="underline font-medium"
              style={{ color: theme.colors.primary }}
            >
              {stateName} Calculators
            </Link>{" "}
            or review the{" "}
            <Link
              href={`/us/states/${stateCode}/legal`}
              className="underline font-medium"
              style={{ color: theme.colors.primary }}
            >
              Legal Breakdown
            </Link>{" "}
            for detailed rule summaries.
          </p>
        </LCCard>
      </section>
    </StateLayout>
  );
}

function DocumentCard({
  doc,
  theme,
  stateName,
}: {
  doc: DocumentItem;
  theme: Theme;
  stateName: string;
}) {
  const Icon = doc.icon;
  const description = doc.description.replace(/{stateName}/g, stateName);

  return (
    <LCCard
      theme={theme}
      className="h-full hover:border-blue-300 transition-colors space-y-3"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800 text-sm">{doc.title}</h3>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      {doc.href ? (
        <Link href={doc.href}>
          <LCButton variant="primary" theme={theme} className="w-full">
            Open Document
          </LCButton>
        </Link>
      ) : (
        <LCButton variant="ghost" theme={theme} className="w-full" disabled>
          Coming Soon
        </LCButton>
      )}
    </LCCard>
  );
}
