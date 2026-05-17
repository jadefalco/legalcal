import Link from "next/link";
import { getTheme } from "@/app/theme";

import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCSection } from "@/app/components/lc/LCSection";

import {
  ShieldCheckIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  ScaleIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  HomeIcon,
  CalculatorIcon,
  MapIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Tenant Rights in British Columbia | LegalCals",
  description:
    "A clear, authoritative guide to your rights under the Residential Tenancy Act (RTA). Learn what landlords can and cannot do, how much notice is required, and how to protect yourself using BC-specific calculators and notices.",
};

const theme = getTheme("ca", "bc");

const rightsSections = [
  {
    icon: BanknotesIcon,
    title: "Security Deposits",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          In BC, landlords can collect a security deposit of up to half of one
          month&apos;s rent.
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Deposits cannot exceed 50% of monthly rent</li>
          <li>Pet damage deposits are separate and also capped at 50%</li>
          <li>
            Deposits must be returned within 15 days after the tenancy ends and
            the tenant provides a forwarding address
          </li>
          <li>Interest may apply depending on RTB rules</li>
          <li>Landlords must provide written reasons for any deductions</li>
        </ul>
        <div className="pt-3">
          <Link href="/calculators/ca/bc/security-deposit">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-4 h-4" />
              BC Security Deposit Calculator
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: DocumentTextIcon,
    title: "Entry Notice Rules",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Tenants have the right to privacy and quiet enjoyment. Landlords may
          only enter when:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>They give 24 hours&apos; written notice</li>
          <li>Entry is between 8 a.m. and 9 p.m.</li>
          <li>
            The reason is valid (repairs, inspection, showing the unit, etc.)
          </li>
          <li>It is an emergency</li>
        </ul>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Unauthorized entry is a violation of the RTA.
        </p>
        <div className="pt-3">
          <Link href="/calculators/ca/bc/entry-notice">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-4 h-4" />
              BC Entry Notice Calculator
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: ChartBarIcon,
    title: "Rent Increase Rules",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          BC has strict rent increase rules. Your rights:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Rent can only be increased once every 12 months</li>
          <li>
            The increase must follow the annual maximum percentage set by the
            province
          </li>
          <li>Landlords must give 3 full months&apos; notice</li>
          <li>Above-guideline increases require RTB approval</li>
        </ul>
        <div className="pt-3">
          <Link href="/calculators/ca/bc/rent-increase">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-4 h-4" />
              BC Rent Increase Calculator
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Repairs & Maintenance",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Tenants have the right to a safe, livable home.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Landlords must maintain the unit in good repair and address essential
          services promptly.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Tenants must keep the unit reasonably clean and report issues in
          writing.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          If repairs are not completed, tenants may have options such as repair
          and deduct or withholding rent, but only in specific situations.
        </p>
        <div className="pt-3">
          <Link href="/calculators/ca/bc/repair-deduct">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-4 h-4" />
              BC Repair & Deduct Calculator
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: ExclamationTriangleIcon,
    title: "Withholding Rent",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Withholding rent is not automatically allowed in BC. It may apply only
          when:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>The landlord fails to provide essential services</li>
          <li>The tenant has documented the issue</li>
          <li>The tenant has followed RTB-approved steps</li>
          <li>The issue significantly affects health or safety</li>
        </ul>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Improper withholding can lead to eviction.
        </p>
        <div className="pt-3">
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
    title: "Eviction Rules",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Tenants can only be evicted for lawful reasons, including non-payment,
          repeated late payment, landlord use, renovations, or breach of
          agreement.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Rights include proper notice periods, RTB dispute resolution, and
          compensation in some cases.
        </p>
        <div className="pt-3">
          <Link href="/calculators/ca/bc/eviction-timeline">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-4 h-4" />
              BC Eviction Timeline Calculator
            </LCButton>
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: HomeIcon,
    title: "Dispute Resolution (RTB)",
    content: (
      <p className="text-sm text-slate-700 leading-relaxed">
        Tenants can file for dispute resolution through the Residential Tenancy
        Branch. Common disputes include deposit return, illegal entry, rent
        increases, repairs, and eviction notices. RTB decisions are legally
        binding.
      </p>
    ),
  },
];

const faqs = [
  {
    question: "Can my landlord enter without notice?",
    answer:
      "Only in emergencies. Otherwise, 24 hours' written notice is required.",
  },
  {
    question: "Can my landlord raise my rent by any amount?",
    answer: "No. BC sets an annual maximum percentage.",
  },
  {
    question: "What if my landlord refuses to return my deposit?",
    answer: "You can file for dispute resolution after 15 days.",
  },
  {
    question: "Can I be evicted for requesting repairs?",
    answer: "No. Retaliatory evictions are illegal.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <StateSectionHeader
          title="Tenant Rights in British Columbia"
          description="A clear, authoritative guide to your rights under the Residential Tenancy Act (RTA). Learn what landlords can and cannot do, how much notice is required, and how to protect yourself using BC-specific calculators and notices."
          icon={ShieldCheckIcon}
          theme={theme}
        />

        <StateContentDivider theme={theme} />

        {/* Rights Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rightsSections.map((section) => (
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
            description="Explore calculators, notices, and guides for BC tenants."
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
              <Link href="/ca/provinces/bc/eviction">
                <LCButton variant="ghost" theme={theme}>
                  <ScaleIcon className="w-4 h-4" />
                  Eviction Rules
                </LCButton>
              </Link>
              <Link href="/documents/bc-repair-request-letter">
                <LCButton variant="ghost" theme={theme}>
                  <DocumentTextIcon className="w-4 h-4" />
                  Repair Request
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
              <h2 className="font-semibold text-slate-800">Stay Informed</h2>
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
