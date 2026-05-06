import Link from "next/link";
import { defaultTheme } from "@/app/theme";

import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  CheckIcon,
  XMarkIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Pricing — LegalCals",
  description:
    "Choose the plan that fits your needs. Free access to basic calculators, or upgrade for notice generators, document downloads, and advanced tools.",
  openGraph: {
    title: "Pricing — LegalCals",
    description:
      "Choose the plan that fits your needs. Free access to basic calculators, or upgrade for notice generators and advanced tools.",
    url: "https://legalcals.com/pricing",
    type: "website",
  },
};

const plans = [
  {
    name: "Free",
    icon: UserIcon,
    price: "$0",
    period: "forever",
    description: "Basic calculators and state rules for occasional use.",
    features: [
      { text: "Eviction timeline calculator", included: true },
      { text: "Deposit return calculator", included: true },
      { text: "Notice period lookup", included: true },
      { text: "State legal summaries", included: true },
      { text: "Rent increase calculator", included: true },
      { text: "Notice generators", included: false },
      { text: "Document downloads", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    href: "/us/states",
    primary: false,
  },
  {
    name: "Pro",
    icon: ShieldCheckIcon,
    price: "$12",
    period: "/ month",
    description: "Notice generators, document tools, and full calculator access.",
    features: [
      { text: "All Free features", included: true },
      { text: "Notice generators (all 8 types)", included: true },
      { text: "Document downloads", included: true },
      { text: "Advanced calculators", included: true },
      { text: "Priority email support", included: true },
      { text: "No ads", included: true },
      { text: "API access", included: false },
      { text: "Team sharing", included: false },
    ],
    cta: "Start Pro Trial",
    href: "#",
    primary: true,
  },
  {
    name: "Business",
    icon: BuildingOfficeIcon,
    price: "$39",
    period: "/ month",
    description: "For property managers, law firms, and teams.",
    features: [
      { text: "All Pro features", included: true },
      { text: "Team seats (up to 5)", included: true },
      { text: "API access", included: true },
      { text: "White-label documents", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated support", included: true },
      { text: "Bulk exports", included: true },
      { text: "SSO & audit logs", included: false },
    ],
    cta: "Contact Sales",
    href: "#",
    primary: false,
  },
];

const faqs = [
  {
    question: "What is included in the Free plan?",
    answer:
      "The Free plan includes all basic calculators — eviction timelines, deposit returns, notice periods, rent increases, and state legal summaries. You can browse rules and timelines for all 50 states at no cost.",
  },
  {
    question: "Do I need a credit card to sign up?",
    answer:
      "No. The Free plan requires no payment information. If you upgrade to Pro, you can start with a 7-day free trial before any billing begins.",
  },
  {
    question: "Can I cancel my Pro subscription anytime?",
    answer:
      "Yes. You can cancel your Pro or Business subscription at any time from your account settings. You will retain access until the end of your current billing period.",
  },
  {
    question: "Is LegalCals a substitute for a lawyer?",
    answer:
      "No. LegalCals provides statute-based calculators and informational tools, but it is not legal advice. Always consult a qualified attorney for your specific situation.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day free trial for Pro plans so you can evaluate the service risk-free. If you are unsatisfied after billing begins, contact us within 14 days for a full refund.",
  },
  {
    question: "What is the difference between Pro and Business?",
    answer:
      "Pro is designed for individual landlords and tenants who need notice generators and document downloads. Business adds team collaboration, API access, white-label documents, and dedicated support for property management companies and law firms.",
  },
];

export default function PricingPage() {
  const theme = defaultTheme;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <StateSectionHeader
            title="Simple, Transparent Pricing"
            description="Start free. Upgrade when you need notice generators, documents, and advanced tools."
            icon={BanknotesIcon}
            theme={theme}
          />
        </div>
      </section>

      {/* PLANS */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <LCCard
              key={plan.name}
              theme={theme}
              className={`space-y-6 ${plan.primary ? "ring-2 ring-blue-500" : ""}`}
            >
              {plan.primary && (
                <div className="text-center -mt-2">
                  <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <plan.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <p className="text-sm text-slate-600">{plan.description}</p>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 text-sm ${
                      feature.included ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {feature.included ? (
                      <CheckIcon className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <XMarkIcon className="w-5 h-5 text-slate-300 shrink-0" />
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <LCButton
                  variant={plan.primary ? "primary" : "ghost"}
                  theme={theme}
                  className="w-full justify-center"
                >
                  {plan.cta}
                </LCButton>
              </Link>
            </LCCard>
          ))}
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* TRUST SIGNALS */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <LockClosedIcon className="w-8 h-8 mx-auto text-blue-600" />
            <h4 className="font-semibold text-slate-800 text-sm">
              Statute-Based Data
            </h4>
            <p className="text-xs text-slate-500">
              Sourced from official state laws
            </p>
          </div>
          <div className="space-y-2">
            <ShieldCheckIcon className="w-8 h-8 mx-auto text-blue-600" />
            <h4 className="font-semibold text-slate-800 text-sm">
              7-Day Free Trial
            </h4>
            <p className="text-xs text-slate-500">Try Pro risk-free</p>
          </div>
          <div className="space-y-2">
            <CheckIcon className="w-8 h-8 mx-auto text-blue-600" />
            <h4 className="font-semibold text-slate-800 text-sm">
              Cancel Anytime
            </h4>
            <p className="text-xs text-slate-500">No long-term contracts</p>
          </div>
          <div className="space-y-2">
            <BanknotesIcon className="w-8 h-8 mx-auto text-blue-600" />
            <h4 className="font-semibold text-slate-800 text-sm">
              14-Day Refund
            </h4>
            <p className="text-xs text-slate-500">Money-back guarantee</p>
          </div>
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <StateSectionHeader
          title="Frequently Asked Questions"
          description="Everything you need to know about LegalCals pricing and plans."
          icon={QuestionMarkCircleIcon}
          theme={theme}
        />

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <LCCard key={i} theme={theme} className="space-y-2">
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

      {/* DISCLAIMER */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <LCCard theme={theme} className="bg-amber-50 border-amber-200">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Disclaimer:</strong> LegalCals is not a law firm and does
            not provide legal advice. Our calculators and tools are based on
            publicly available statutes and are intended for informational
            purposes only. Always consult a qualified attorney for advice
            specific to your situation.
          </p>
        </LCCard>
      </section>

      {/* CTA */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Not sure which plan is right?
          </h2>
          <p className="text-slate-600">
            Start with the Free plan and upgrade anytime when you need notice
            generators or document downloads.
          </p>
          <Link href="/us/states">
            <LCButton variant="primary" theme={theme} className="px-8 py-3">
              Get Started Free
            </LCButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
