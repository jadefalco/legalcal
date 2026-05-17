import Link from "next/link";
import { getTheme } from "@/app/theme";

import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCSection } from "@/app/components/lc/LCSection";

import {
  PlayIcon,
  BanknotesIcon,
  DocumentTextIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  ScaleIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  ArrowRightIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
  MapIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "British Columbia Rental Law — Start Here | LegalCals",
  description:
    "Your complete guide to BC tenancy rules, legal timelines, calculators, and compliant notices. Whether you're a tenant or a landlord, this page gives you everything you need.",
};

const theme = getTheme("ca", "bc");

const quickLinks = [
  {
    icon: BanknotesIcon,
    title: "Security Deposits",
    description:
      "Learn how much can be collected, when it must be returned, and how interest works in BC.",
    href: "/calculators/ca/bc/security-deposit",
  },
  {
    icon: DocumentTextIcon,
    title: "Entry Notice Rules",
    description:
      "Understand when a landlord can enter, how much notice is required, and what counts as an emergency.",
    href: "/calculators/ca/bc/entry-notice",
  },
  {
    icon: ChartBarIcon,
    title: "Rent Increase Rules",
    description:
      "BC has strict rent increase limits. Check the current maximum and calculate your legal notice period.",
    href: "/calculators/ca/bc/rent-increase",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Repairs & Maintenance",
    description:
      "Who is responsible for what, how to request repairs, and when \"repair and deduct\" applies.",
    href: "/calculators/ca/bc/repair-request",
  },
  {
    icon: ExclamationTriangleIcon,
    title: "Withholding Rent",
    description:
      "When it's allowed, when it's not, and the risks involved.",
    href: "/calculators/ca/bc/withhold-rent",
  },
  {
    icon: ScaleIcon,
    title: "Eviction Process",
    description:
      "A step‑by‑step overview of BC's eviction rules, timelines, and dispute resolution process.",
    href: "/ca/provinces/bc/eviction",
  },
];

const calculators = [
  {
    name: "BC Security Deposit Calculator",
    href: "/calculators/ca/bc/security-deposit",
    icon: BanknotesIcon,
  },
  {
    name: "BC Entry Notice Calculator",
    href: "/calculators/ca/bc/entry-notice",
    icon: DocumentTextIcon,
  },
  {
    name: "BC Rent Increase Calculator",
    href: "/calculators/ca/bc/rent-increase",
    icon: ChartBarIcon,
  },
  {
    name: "BC Late Fee Calculator",
    href: "/calculators/ca/bc/late-fee",
    icon: ClockIcon,
  },
  {
    name: "BC Repair & Deduct Calculator",
    href: "/calculators/ca/bc/repair-deduct",
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "BC Withhold Rent Calculator",
    href: "/calculators/ca/bc/withhold-rent",
    icon: ExclamationTriangleIcon,
  },
  {
    name: "BC Eviction Timeline Calculator",
    href: "/calculators/ca/bc/eviction-timeline",
    icon: ScaleIcon,
  },
];

const forms = [
  { name: "Entry Notice", href: "/documents/bc-notice-to-enter" },
  { name: "Rent Increase Notice", href: "/documents/bc-rent-increase-notice" },
  { name: "Deposit Return Letter", href: "/documents/bc-deposit-return-letter" },
  { name: "Repair Request", href: "/documents/bc-repair-request-letter" },
  { name: "Withhold Rent Notice", href: "/calculators/ca/bc/withhold-rent" },
  { name: "Eviction Timeline Summary", href: "/ca/provinces/bc/eviction" },
];

const faqs = [
  {
    question: "How much can my landlord increase rent in BC?",
    answer:
      "BC sets an annual rent increase limit based on inflation. Landlords must use approved forms and give proper notice. Use the BC Rent Increase Calculator for current limits.",
  },
  {
    question: "How much notice is required for entry?",
    answer:
      "Landlords must generally provide at least 24 hours' written notice to enter a rental unit, and entry must be at a reasonable time.",
  },
  {
    question: "When must a deposit be returned?",
    answer:
      "In BC, landlords must return the security deposit (and any pet deposit) within 15 days of the tenancy ending, along with any required interest.",
  },
  {
    question: "Can I withhold rent for repairs?",
    answer:
      "Withholding rent in BC is risky and generally not recommended without legal guidance. Tenants should document repair requests and may apply for dispute resolution through the RTB.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <StateSectionHeader
          title="British Columbia Rental Law — Start Here"
          description="Your complete guide to BC tenancy rules, legal timelines, calculators, and compliant notices. Whether you're a tenant or a landlord, this page gives you everything you need to understand your rights, obligations, and the rules that govern rental housing in British Columbia."
          icon={PlayIcon}
          theme={theme}
        />

        <StateContentDivider theme={theme} />

        {/* Quick Links */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <ArrowRightIcon
              className="w-5 h-5"
              style={{ color: theme.colors.primary }}
            />
            <h2 className="font-semibold text-slate-800">Quick Links</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href} className="block">
                <LCCard
                  theme={theme}
                  className="space-y-2 h-full hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <link.icon
                      className="w-5 h-5"
                      style={{ color: theme.colors.primary }}
                    />
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {link.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">{link.description}</p>
                  <div
                    className="flex items-center text-sm"
                    style={{ color: theme.colors.primary }}
                  >
                    Go <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </div>
                </LCCard>
              </Link>
            ))}
          </div>
        </section>

        <StateContentDivider theme={theme} />

        {/* BC Calculator Directory */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <CalculatorIcon
              className="w-5 h-5"
              style={{ color: theme.colors.primary }}
            />
            <h2 className="font-semibold text-slate-800">
              BC Calculator Directory
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculators.map((calc) => (
              <Link key={calc.name} href={calc.href} className="block">
                <LCCard
                  theme={theme}
                  className="space-y-2 h-full hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <calc.icon
                      className="w-5 h-5"
                      style={{ color: theme.colors.primary }}
                    />
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {calc.name}
                    </h3>
                  </div>
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
          <div className="flex gap-3">
            <Link href="/calculators/ca/bc">
              <LCButton variant="primary" theme={theme}>
                <MapIcon className="w-4 h-4" />
                All BC Calculators
              </LCButton>
            </Link>
          </div>
        </section>

        <StateContentDivider theme={theme} />

        {/* Tenant Rights & Landlord Obligations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section>
            <LCSection
              title="Tenant Rights Overview"
              icon={ShieldCheckIcon}
              theme={theme}
            />
            <LCCard theme={theme} className="mt-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                Tenants in British Columbia have strong protections under the
                RTA. Key rights include limits on rent increases, rules for
                lawful entry, protection against illegal fees, requirements for
                timely repairs, rules for deposit return, and access to RTB
                dispute resolution.
              </p>
            </LCCard>
          </section>

          <section>
            <LCSection
              title="Landlord Obligations Overview"
              icon={HomeIcon}
              theme={theme}
            />
            <LCCard theme={theme} className="mt-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                Landlords must follow strict rules when managing a rental
                property. Obligations include providing proper notice for entry,
                maintaining the unit in good repair, following rent increase
                limits, returning deposits on time, using approved forms, and
                complying with RTB procedures.
              </p>
            </LCCard>
          </section>
        </div>

        <StateContentDivider theme={theme} />

        {/* Forms & Notices Hub */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <ClipboardDocumentCheckIcon
              className="w-5 h-5"
              style={{ color: theme.colors.primary }}
            />
            <h2 className="font-semibold text-slate-800">
              Forms & Notices Hub
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {forms.map((form) => (
              <Link key={form.name} href={form.href} className="block">
                <LCCard
                  theme={theme}
                  className="space-y-2 h-full hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon
                      className="w-5 h-5"
                      style={{ color: theme.colors.primary }}
                    />
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {form.name}
                    </h3>
                  </div>
                  <div
                    className="flex items-center text-sm"
                    style={{ color: theme.colors.primary }}
                  >
                    Generate <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </div>
                </LCCard>
              </Link>
            ))}
          </div>
        </section>

        <StateContentDivider theme={theme} />

        {/* About BC Tenancy Law */}
        <section>
          <LCSection
            title="About BC Tenancy Law"
            icon={InformationCircleIcon}
            theme={theme}
          />
          <LCCard theme={theme} className="mt-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              Rental housing in British Columbia is governed by the Residential
              Tenancy Act (RTA), Residential Tenancy Regulation, and the
              Residential Tenancy Branch (RTB). LegalCals calculators follow BC
              statutes and RTB guidelines to ensure accuracy and compliance.
            </p>
          </LCCard>
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
          <p className="mt-2">&copy; {new Date().getFullYear()} LegalCals. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
