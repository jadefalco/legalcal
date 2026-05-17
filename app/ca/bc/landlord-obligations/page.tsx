import Link from "next/link";
import { getTheme } from "@/app/theme";

import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCSection } from "@/app/components/lc/LCSection";

import {
  ExclamationTriangleIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  ScaleIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  HomeIcon,
  CalculatorIcon,
  MapIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Landlord Obligations in British Columbia | LegalCals",
  description:
    "A clear, practical guide to your responsibilities under the Residential Tenancy Act (RTA). Learn what notices you must give, how to stay compliant, and how to use BC-specific calculators and forms to manage your rental legally and efficiently.",
};

const theme = getTheme("ca", "bc");

const obligationsSections = [
  {
    icon: BanknotesIcon,
    title: "Security Deposits",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Landlords in BC must follow strict rules when collecting and returning
          deposits.
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>
            You may collect up to half of one month&apos;s rent as a security
            deposit
          </li>
          <li>Pet damage deposits are separate and also capped at 50%</li>
          <li>You must provide a move-in condition inspection report</li>
          <li>
            You must return the deposit within 15 days after the tenant provides
            a forwarding address
          </li>
          <li>You must provide written justification for any deductions</li>
          <li>
            Failure to return the deposit on time may result in penalties
          </li>
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
    title: "Entry Notice Requirements",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          Landlords must respect tenant privacy and follow strict entry rules.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">You must:</p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Give 24 hours&apos; written notice</li>
          <li>Enter only between 8 a.m. and 9 p.m.</li>
          <li>
            State a valid reason (repairs, inspection, showing the unit, etc.)
          </li>
          <li>Only enter without notice in emergencies</li>
        </ul>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Improper entry can result in RTB penalties.
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
          BC limits rent increases more than almost any other province.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Obligations:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>You may increase rent once every 12 months</li>
          <li>
            You must follow the annual maximum percentage set by the province
          </li>
          <li>You must give 3 full months&apos; notice</li>
          <li>You must use the correct RTB-compliant notice format</li>
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
          Landlords must ensure the rental unit is safe, livable, and
          well-maintained.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Obligations:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Maintain the unit in good repair</li>
          <li>Address essential services promptly</li>
          <li>Fix issues that affect health or safety</li>
          <li>Respond to repair requests in a reasonable timeframe</li>
          <li>Keep common areas clean and safe</li>
        </ul>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Failure to maintain the unit can lead to rent reductions, repair
          orders, or compensation.
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
    title: "Handling Withholding of Rent",
    content: (
      <>
        <p className="text-sm text-slate-700 leading-relaxed">
          If a tenant withholds rent, you must understand the legal framework.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Key points:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Tenants may only withhold rent in specific situations</li>
          <li>You must respond to repair requests promptly</li>
          <li>
            You may apply for RTB dispute resolution if rent is withheld
            improperly
          </li>
          <li>Retaliatory actions are prohibited</li>
        </ul>
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
          Evictions in BC must follow strict procedures.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          Obligations:
        </p>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1 mt-2">
          <li>Use the correct notice type</li>
          <li>Provide proper notice periods</li>
          <li>Use approved RTB forms</li>
          <li>Provide compensation when required</li>
          <li>Avoid bad-faith evictions</li>
          <li>Attend RTB hearings if the tenant disputes the notice</li>
        </ul>
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
        Landlords may apply to the Residential Tenancy Branch for non-payment
        of rent, breach of agreement, damage claims, ending tenancy, or deposit
        disputes. RTB decisions are binding and enforceable.
      </p>
    ),
  },
];

const faqs = [
  {
    question: "Can I enter the unit without notice?",
    answer:
      "Only in emergencies. Otherwise, 24 hours' written notice is required.",
  },
  {
    question: "How much can I increase rent?",
    answer:
      "Only up to the annual maximum set by BC, with 3 months' notice.",
  },
  {
    question: "What if the tenant refuses to provide a forwarding address?",
    answer:
      "You must still attempt to return the deposit and document your efforts.",
  },
  {
    question: "Can I evict a tenant for requesting repairs?",
    answer: "No. Retaliatory evictions are illegal.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <StateSectionHeader
          title="Landlord Obligations in British Columbia"
          description="A clear, practical guide to your responsibilities under the Residential Tenancy Act (RTA). Learn what notices you must give, how to stay compliant, and how to use BC-specific calculators and forms to manage your rental legally and efficiently."
          icon={ExclamationTriangleIcon}
          theme={theme}
        />

        <StateContentDivider theme={theme} />

        {/* Obligations Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {obligationsSections.map((section) => (
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
            description="Explore calculators, notices, and guides for BC landlords."
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
              <Link href="/ca/bc/tenant-rights">
                <LCButton variant="ghost" theme={theme}>
                  <ShieldCheckIcon className="w-4 h-4" />
                  Tenant Rights
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
