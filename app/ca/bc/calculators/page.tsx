import Link from "next/link";
import { getTheme } from "@/app/theme";

import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCSection } from "@/app/components/lc/LCSection";

import {
  CalculatorIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  ScaleIcon,
  MapIcon,
  ShieldCheckIcon,
  HomeIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "BC Rental Calculators | LegalCals",
  description:
    "Accurate, statute-based calculators for British Columbia tenancy rules. These tools follow the Residential Tenancy Act (RTA) and Residential Tenancy Branch (RTB) guidelines to help tenants and landlords stay compliant.",
};

const theme = getTheme("ca", "bc");

const calculators = [
  {
    icon: BanknotesIcon,
    title: "BC Security Deposit Calculator",
    description:
      "Determine deposit limits, return deadlines, and compliance requirements under BC law.",
    href: "/calculators/ca/bc/security-deposit",
  },
  {
    icon: DocumentTextIcon,
    title: "BC Entry Notice Calculator",
    description:
      "Generate a compliant 24-hour entry notice and calculate legal entry timelines.",
    href: "/calculators/ca/bc/entry-notice",
  },
  {
    icon: ChartBarIcon,
    title: "BC Rent Increase Calculator",
    description:
      "Check if a rent increase is legal, calculate notice periods, and generate compliant notices.",
    href: "/calculators/ca/bc/rent-increase",
  },
  {
    icon: ClockIcon,
    title: "BC Late Fee Calculator",
    description:
      "Understand BC's rules on late fees and calculate allowable charges.",
    href: "/calculators/ca/bc/late-fee",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "BC Repair & Deduct Calculator",
    description:
      "Determine whether tenants may repair and deduct costs under BC's repair rules.",
    href: "/calculators/ca/bc/repair-deduct",
  },
  {
    icon: ExclamationTriangleIcon,
    title: "BC Withhold Rent Calculator",
    description:
      "Check if withholding rent is legally justified and generate a compliant notice.",
    href: "/calculators/ca/bc/withhold-rent",
  },
  {
    icon: ScaleIcon,
    title: "BC Eviction Timeline Calculator",
    description:
      "Calculate exact eviction timelines based on BC's notice types and RTB procedures.",
    href: "/calculators/ca/bc/eviction-timeline",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <StateSectionHeader
          title="BC Rental Calculators"
          description="Accurate, statute-based calculators for British Columbia tenancy rules. These tools follow the Residential Tenancy Act (RTA) and Residential Tenancy Branch (RTB) guidelines to help tenants and landlords stay compliant."
          icon={CalculatorIcon}
          theme={theme}
        />

        <StateContentDivider theme={theme} />

        {/* Calculator Cards */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <CalculatorIcon
              className="w-5 h-5"
              style={{ color: theme.colors.primary }}
            />
            <h2 className="font-semibold text-slate-800">
              Available Calculators
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculators.map((calc) => (
              <Link key={calc.title} href={calc.href} className="block">
                <LCCard
                  theme={theme}
                  className="space-y-3 h-full hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <calc.icon
                      className="w-5 h-5"
                      style={{ color: theme.colors.primary }}
                    />
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {calc.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {calc.description}
                  </p>
                  <div
                    className="flex items-center text-sm"
                    style={{ color: theme.colors.primary }}
                  >
                    Open Calculator <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </div>
                </LCCard>
              </Link>
            ))}
          </div>
        </section>

        <StateContentDivider theme={theme} />

        {/* Related Resources */}
        <section className="space-y-4">
          <LCSection
            title="Related Resources"
            description="Explore guides, notices, and forms for BC."
            icon={InformationCircleIcon}
            theme={theme}
          />
          <LCCard theme={theme} className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <Link href="/ca/bc/start-here">
                <LCButton variant="primary" theme={theme}>
                  <MapIcon className="w-4 h-4" />
                  BC Start Here
                </LCButton>
              </Link>
              <Link href="/ca/bc/tenant-rights">
                <LCButton variant="ghost" theme={theme}>
                  <ShieldCheckIcon className="w-4 h-4" />
                  Tenant Rights
                </LCButton>
              </Link>
              <Link href="/ca/bc/landlord-obligations">
                <LCButton variant="ghost" theme={theme}>
                  <HomeIcon className="w-4 h-4" />
                  Landlord Obligations
                </LCButton>
              </Link>
              <Link href="/ca/bc/forms-notices">
                <LCButton variant="ghost" theme={theme}>
                  <ClipboardDocumentCheckIcon className="w-4 h-4" />
                  Forms & Notices
                </LCButton>
              </Link>
            </div>
          </LCCard>
        </section>

        <StateContentDivider theme={theme} />

        {/* Email Capture */}
        <section>
          <LCCard theme={theme} className="space-y-4">
            <div className="flex items-center gap-2">
              <EnvelopeIcon
                className="w-5 h-5"
                style={{ color: theme.colors.primary }}
              />
              <h2 className="font-semibold text-slate-800">Stay Updated</h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              BC rental laws change frequently. Get updates when rules, limits,
              or forms change.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  borderColor: theme.colors.primary
                    ? `${theme.colors.primary}33`
                    : undefined,
                }}
              />
              <LCButton variant="primary" theme={theme}>
                Subscribe for BC updates
              </LCButton>
            </div>
          </LCCard>
        </section>

        <footer className="border-t pt-8 text-center text-sm text-slate-500">
          <p>LegalCals is not legal advice. Always consult a qualified attorney.</p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} LegalCals. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
