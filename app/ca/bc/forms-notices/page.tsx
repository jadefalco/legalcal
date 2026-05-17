import Link from "next/link";
import { getTheme } from "@/app/theme";

import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCSection } from "@/app/components/lc/LCSection";

import {
  DocumentTextIcon,
  CalculatorIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  MapIcon,
  ShieldCheckIcon,
  ScaleIcon,
  HomeIcon,
  ChartBarIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "BC Forms & Notices | LegalCals",
  description:
    "Generate compliant notices and documents under the Residential Tenancy Act (RTA). These tools help tenants and landlords create legally valid forms, calculate timelines, and stay compliant with BC rental law.",
};

const theme = getTheme("ca", "bc");

const formSections = [
  {
    icon: DocumentTextIcon,
    title: "Entry Notice (24-Hour Notice to Enter)",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Landlords must give 24 hours&apos; written notice before entering a
          rental unit, except in emergencies.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          A compliant notice must include:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Date and time of entry</li>
          <li>Reason for entry</li>
          <li>Proper delivery to the tenant</li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-3">
          <Link href="/calculators/ca/bc/entry-notice">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-4 h-4" />
              BC Entry Notice Calculator
            </LCButton>
          </Link>
          <Link href="/documents/bc-notice-to-enter">
            <LCButton variant="ghost" theme={theme}>
              <DocumentTextIcon className="w-4 h-4" />
              Entry Notice Document Template
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: ChartBarIcon,
    title: "Rent Increase Notice",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          BC requires strict compliance for rent increases:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Only once every 12 months</li>
          <li>Must follow the annual maximum percentage</li>
          <li>Requires 3 full months&apos; notice</li>
          <li>Must use the correct format</li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-3">
          <Link href="/calculators/ca/bc/rent-increase">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-4 h-4" />
              BC Rent Increase Calculator
            </LCButton>
          </Link>
          <Link href="/documents/bc-rent-increase-notice">
            <LCButton variant="ghost" theme={theme}>
              <DocumentTextIcon className="w-4 h-4" />
              Rent Increase Notice Document Template
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: BanknotesIcon,
    title: "Deposit Return Letter",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Landlords must return security and pet deposits within 15 days after
          the tenancy ends and the tenant provides a forwarding address.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          If deductions are made, landlords must provide written justification.
        </p>
        <div className="pt-3">
          <Link href="/documents/bc-deposit-return-letter">
            <LCButton variant="primary" theme={theme}>
              <DocumentTextIcon className="w-4 h-4" />
              Deposit Return Letter Document Template
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Repair Request",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Tenants must request repairs in writing before taking further action.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          A proper repair request should include:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Description of the issue</li>
          <li>Date the issue was discovered</li>
          <li>Impact on health, safety, or habitability</li>
          <li>A reasonable deadline for response</li>
        </ul>
        <div className="pt-3">
          <Link href="/documents/bc-repair-request-letter">
            <LCButton variant="primary" theme={theme}>
              <DocumentTextIcon className="w-4 h-4" />
              Repair Request Document Template
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: ExclamationTriangleIcon,
    title: "Withhold Rent Notice",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Withholding rent is only allowed in specific situations.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          A compliant notice must:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Document the issue</li>
          <li>Show attempts to resolve it</li>
          <li>Explain why withholding is justified</li>
          <li>Reference essential services or safety concerns</li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-3">
          <Link href="/calculators/ca/bc/withhold-rent">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-4 h-4" />
              BC Withhold Rent Calculator
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: ScaleIcon,
    title: "Eviction Timeline Summary",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Eviction rules in BC vary depending on the reason:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Non-payment of rent</li>
          <li>Landlord use of property</li>
          <li>Renovations</li>
          <li>Breach of agreement</li>
        </ul>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Each has its own notice period and RTB process.
        </p>
        <div className="flex flex-wrap gap-3 pt-3">
          <Link href="/calculators/ca/bc/eviction-timeline">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-4 h-4" />
              BC Eviction Timeline Calculator
            </LCButton>
          </Link>
          <Link href="/ca/provinces/bc/eviction">
            <LCButton variant="ghost" theme={theme}>
              <ScaleIcon className="w-4 h-4" />
              Eviction Timeline Summary
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
];

const faqs = [
  {
    question: "Do I need to use RTB forms?",
    answer:
      "Some notices require RTB-approved forms; others can be generated through LegalCals.",
  },
  {
    question: "Can I email notices?",
    answer:
      "Only if the tenant has agreed in writing to receive notices electronically.",
  },
  {
    question: "Are handwritten notices valid?",
    answer:
      "Yes, if they include all required information and are delivered properly.",
  },
  {
    question: "Can tenants refuse to sign a notice?",
    answer: "Yes — signatures are not required for validity.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <StateSectionHeader
          title="BC Forms & Notices"
          description="Generate compliant notices and documents under the Residential Tenancy Act (RTA). These tools help tenants and landlords create legally valid forms, calculate timelines, and stay compliant with BC rental law."
          icon={DocumentTextIcon}
          theme={theme}
        />

        <StateContentDivider theme={theme} />

        {/* Forms Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formSections.map((section) => (
            <LCCard key={section.title} theme={theme} className="space-y-3">
              <div className="flex items-center gap-2">
                <section.icon
                  className="w-5 h-5"
                  style={{ color: theme.colors.primary }}
                />
                <h3 className="font-semibold text-slate-800 text-sm">
                  {section.title}
                </h3>
              </div>
              {section.content}
            </LCCard>
          ))}
        </section>

        <StateContentDivider theme={theme} />

        {/* FAQ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <QuestionMarkCircleIcon
              className="w-5 h-5"
              style={{ color: theme.colors.primary }}
            />
            <h2 className="font-semibold text-slate-800">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <LCCard key={faq.question} theme={theme} className="space-y-2">
                <h3 className="font-semibold text-slate-800 text-sm">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </LCCard>
            ))}
          </div>
        </section>

        <StateContentDivider theme={theme} />

        {/* Related Resources */}
        <section className="space-y-4">
          <LCSection
            title="Related Resources"
            description="Explore calculators, notices, and guides for BC."
            icon={InformationCircleIcon}
            theme={theme}
          />
          <LCCard theme={theme} className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <Link href="/calculators/ca/bc">
                <LCButton variant="primary" theme={theme}>
                  <CalculatorIcon className="w-4 h-4" />
                  All BC Calculators
                </LCButton>
              </Link>
              <Link href="/ca/bc/start-here">
                <LCButton variant="ghost" theme={theme}>
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
              <h2 className="font-semibold text-slate-800">Stay Compliant</h2>
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
