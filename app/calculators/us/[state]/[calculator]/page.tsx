import { notFound } from "next/navigation";
import Link from "next/link";
import RuleFreshnessBanner from "@/components/RuleFreshnessBanner";

import { usStates } from "@/app/config/usStates";
import { calculators as configCalculators } from "@/app/config/calculators";
import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { Paywall } from "@/app/components/Paywall";
import DepositReturnCalculator from "@/app/us/calculators/deposit-return/DepositReturnCalculator";
import DepositDemandCalculator from "@/app/us/calculators/deposit-demand/DepositDemandCalculator";
import ItemizedDeductionsCalculator from "@/app/us/calculators/itemized-deductions/ItemizedDeductionsCalculator";
import EntryNoticeCalculator from "@/app/us/calculators/entry-notice/EntryNoticeCalculator";
import LateFeeCalculator from "@/app/us/calculators/late-fee/LateFeeCalculator";
import RepairDeductCalculator from "@/app/us/calculators/repair-deduct/RepairDeductCalculator";
import WithholdRentCalculator from "@/app/us/calculators/withhold-rent/WithholdRentCalculator";
import RentReceiptCalculator from "@/app/us/calculators/rent-receipt/RentReceiptCalculator";
import DuplicateReceiptCalculator from "@/app/us/calculators/duplicate-receipt/DuplicateReceiptCalculator";
import PaymentMethodsCalculator from "@/app/us/calculators/payment-methods/PaymentMethodsCalculator";
import ReceiptValidationCalculator from "@/app/us/calculators/receipt-validation/ReceiptValidationCalculator";
import LateStatusCalculator from "@/app/us/calculators/late-status/LateStatusCalculator";
import PaymentProofCalculator from "@/app/us/calculators/payment-proof/PaymentProofCalculator";
import LedgerValidationCalculator from "@/app/us/calculators/ledger-validation/LedgerValidationCalculator";
import SecurityDepositCalculator from "@/app/us/calculators/security-deposit/SecurityDepositCalculator";
import {
  CalculatorIcon,
  ChevronRightIcon,
  ScaleIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  BanknotesIcon,
  ChartBarIcon,
  WrenchIcon,
  ShieldExclamationIcon,
  CreditCardIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentChartBarIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

// Calculator components
import EvictionTimelineCalculator from "@/app/us/calculators/eviction-timeline/EvictionTimelineCalculator";
import EvictionNoticeCalculator from "@/app/us/calculators/eviction-notice/EvictionNoticeCalculator";
import SecurityDepositReturnCalculator from "@/app/us/calculators/security-deposit-return/SecurityDepositReturnCalculator";
import NoticePeriodCalculator from "@/app/us/calculators/notice-period/NoticePeriodCalculator";
import LeaseTerminationCalculator from "@/app/us/calculators/lease-termination/LeaseTerminationCalculator";
import RentIncreaseCalculator from "@/app/us/calculators/rent-increase/RentIncreaseCalculator";
import RentIncreaseLimitsCalculator from "@/app/us/calculators/rent-increase-limits/RentIncreaseLimitsCalculator";
import FinalPaycheckDeadlineCalculator from "@/app/us/calculators/final-paycheck-deadline/FinalPaycheckDeadlineCalculator";
import OvertimeCalculatorCalculator from "@/app/us/calculators/overtime-calculator/OvertimeCalculatorCalculator";
import SmallClaimsEligibilityCalculator from "@/app/us/calculators/small-claims-eligibility/SmallClaimsEligibilityCalculator";

const calculatorComponents: Record<string, React.ComponentType<{ initialState?: string }>> = {
  "eviction-timeline": EvictionTimelineCalculator,
  "eviction-notice": EvictionNoticeCalculator,
  "security-deposit-return": SecurityDepositReturnCalculator,
  "notice-period": NoticePeriodCalculator,
  "lease-termination": LeaseTerminationCalculator,
  "rent-increase": RentIncreaseCalculator,
  "rent-increase-limits": RentIncreaseLimitsCalculator,
  "final-paycheck-deadline": FinalPaycheckDeadlineCalculator,
  "overtime-calculator": OvertimeCalculatorCalculator,
  "small-claims-eligibility": SmallClaimsEligibilityCalculator,
  "deposit-return": DepositReturnCalculator,
  "deposit-demand": DepositDemandCalculator,
  "itemized-deductions": ItemizedDeductionsCalculator,
  "entry-notice": EntryNoticeCalculator,
  "late-fee": LateFeeCalculator,
  "repair-deduct": RepairDeductCalculator,
  "withhold-rent": WithholdRentCalculator,
  "rent-receipt": RentReceiptCalculator,
  "duplicate-receipt": DuplicateReceiptCalculator,
  "payment-methods": PaymentMethodsCalculator,
  "receipt-validation": ReceiptValidationCalculator,
  "late-status": LateStatusCalculator,
  "payment-proof": PaymentProofCalculator,
  "ledger-validation": LedgerValidationCalculator,
  "security-deposit": SecurityDepositCalculator,
};

const calculatorIconMap: Record<string, React.ComponentType<any>> = {
  "eviction-timeline": ScaleIcon,
  "eviction-notice": DocumentTextIcon,
  "security-deposit-return": BanknotesIcon,
  "notice-period": DocumentTextIcon,
  "lease-termination": DocumentTextIcon,
  "rent-increase": BanknotesIcon,
  "rent-increase-limits": ChartBarIcon,
  "final-paycheck-deadline": DocumentTextIcon,
  "overtime-calculator": CalculatorIcon,
  "small-claims-eligibility": ScaleIcon,
  "deposit-return": BanknotesIcon,
  "deposit-demand": DocumentTextIcon,
  "itemized-deductions": DocumentTextIcon,
  "entry-notice": DocumentTextIcon,
  "late-fee": BanknotesIcon,
  "repair-deduct": WrenchIcon,
  "withhold-rent": ShieldExclamationIcon,
  "rent-receipt": DocumentTextIcon,
  "duplicate-receipt": DocumentDuplicateIcon,
  "payment-methods": CreditCardIcon,
  "receipt-validation": ClipboardDocumentCheckIcon,
  "late-status": ClockIcon,
  "payment-proof": ShieldCheckIcon,
  "ledger-validation": DocumentChartBarIcon,
  "security-deposit": HomeIcon,
};

const allCalculators = [
  ...configCalculators,
  {
    name: "Eviction Notice",
    slug: "eviction-notice",
    description:
      "Generate a jurisdiction-specific eviction notice letter for any US state.",
  },
  {
    name: "Rent Increase",
    slug: "rent-increase",
    description:
      "Calculate rent increase limits, notice requirements, and exemption rules.",
  },
  {
    name: "Lease Termination",
    slug: "lease-termination",
    description:
      "Calculate lease termination deadlines and required notice periods.",
  },
];

const relatedSlugs: Record<string, string[]> = {
  "eviction-timeline": [
    "eviction-notice",
    "notice-period",
    "security-deposit-return",
  ],
  "eviction-notice": [
    "eviction-timeline",
    "notice-period",
    "lease-termination",
  ],
  "security-deposit-return": [
    "eviction-timeline",
    "lease-termination",
    "rent-increase-limits",
  ],
  "notice-period": [
    "eviction-timeline",
    "lease-termination",
    "final-paycheck-deadline",
  ],
  "lease-termination": [
    "security-deposit-return",
    "eviction-timeline",
    "notice-period",
  ],
  "rent-increase": [
    "rent-increase-limits",
    "notice-period",
    "lease-termination",
  ],
  "rent-increase-limits": [
    "rent-increase",
    "notice-period",
    "lease-termination",
  ],
  "final-paycheck-deadline": [
    "notice-period",
    "overtime-calculator",
    "lease-termination",
  ],
  "overtime-calculator": [
    "final-paycheck-deadline",
    "notice-period",
    "small-claims-eligibility",
  ],
  "small-claims-eligibility": [
    "eviction-timeline",
    "security-deposit-return",
    "overtime-calculator",
  ],
  "deposit-return": [
    "security-deposit-return",
    "rent-receipt",
    "late-fee",
  ],
  "deposit-demand": [
    "deposit-return",
    "security-deposit-return",
    "rent-receipt",
  ],
  "itemized-deductions": [
    "deposit-return",
    "security-deposit-return",
    "rent-receipt",
  ],
  "entry-notice": [
    "eviction-timeline",
    "notice-period",
    "lease-termination",
  ],
  "late-fee": [
    "rent-increase",
    "rent-receipt",
    "deposit-return",
  ],
  "repair-deduct": [
    "withhold-rent",
    "eviction-timeline",
    "security-deposit-return",
  ],
  "withhold-rent": [
    "repair-deduct",
    "eviction-timeline",
    "security-deposit-return",
  ],
  "rent-receipt": [
    "duplicate-receipt",
    "late-fee",
    "deposit-return",
  ],
  "duplicate-receipt": [
    "rent-receipt",
    "deposit-return",
    "late-fee",
  ],
  "payment-methods": [
    "rent-receipt",
    "late-fee",
    "deposit-return",
  ],
  "receipt-validation": [
    "rent-receipt",
    "duplicate-receipt",
    "late-fee",
  ],
  "late-status": [
    "late-fee",
    "rent-receipt",
    "payment-methods",
  ],
  "payment-proof": [
    "payment-methods",
    "rent-receipt",
    "receipt-validation",
  ],
  "ledger-validation": [
    "payment-proof",
    "late-fee",
    "rent-receipt",
  ],
  "security-deposit": [
    "deposit-return",
    "lease-termination",
    "rent-receipt",
  ],
};

export async function generateMetadata({
  params,
}: {
  params: { state: string; calculator: string };
}) {
  const stateCode = params.state.toLowerCase();
  const calcSlug = params.calculator.toLowerCase();
  const state = usStates[stateCode as keyof typeof usStates];
  const calc = allCalculators.find((c) => c.slug === calcSlug);

  const stateName = state?.name || stateCode.toUpperCase();
  const calcName = calc?.name || calcSlug;

  const title = `${calcName} for ${stateName} | LegalCals`;
  const description = `Use the ${calcName} for ${stateName}. Calculate deadlines, timelines, and legal requirements based on state law.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/calculators/us/${stateCode}/${calcSlug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page({
  params,
}: {
  params: { state: string; calculator: string };
}) {
  const stateCode = params.state.toLowerCase();
  const calcSlug = params.calculator.toLowerCase();

  const state = usStates[stateCode as keyof typeof usStates];
  const CalculatorComponent = calculatorComponents[calcSlug];

  if (!state) {
    return notFound();
  }

  if (!CalculatorComponent) {
    const calcName = calcSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="px-4 py-12 max-w-4xl mx-auto space-y-6">
          <RuleFreshnessBanner topic={calcSlug} jurisdiction={stateCode} />
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">{calcName}</h1>
            <p className="text-slate-600">
              This calculator is not yet available for{" "}
              <strong>{state.name}</strong>.
            </p>
            <p className="text-sm text-slate-500">
              We are working on adding jurisdiction-specific rules. Check back soon.
            </p>
            <div className="pt-2">
              <Link
                href={`/admin/rules/${calcSlug}/${stateCode}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
              >
                View Admin Rule Detail →
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const theme = getTheme("us", stateCode);
  const stateName = state.name;

  const relatedCalculators = allCalculators.filter(
    (c) => relatedSlugs[calcSlug]?.includes(c.slug) && c.slug !== calcSlug
  );

  return (
    <main className="min-h-screen">
      <div className="px-4 py-10 max-w-4xl mx-auto">
        <CalculatorComponent initialState={stateCode} />
      </div>

      <div className="px-4 pb-12 max-w-4xl mx-auto">
        <Paywall
          featureName="Advanced Calculator"
          description="Unlock document downloads, notice generators, and premium calculator features. Upgrade to Pro for full access."
          theme={theme}
        />

        <StateContentDivider theme={theme} />

        {/* Related Calculators */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Related Calculators
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              People in {stateName} also use these tools.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCalculators.map((calc) => {
              const Icon = calculatorIconMap[calc.slug] || CalculatorIcon;
              return (
                <Link
                  key={calc.slug}
                  href={`/calculators/us/${stateCode}/${calc.slug}`}
                >
                  <LCCard
                    theme={theme}
                    className="h-full hover:border-blue-300 transition-colors space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className="w-5 h-5 shrink-0"
                        style={{ color: theme.colors.primary }}
                      />
                      <h3 className="font-semibold text-slate-800 text-sm">
                        {calc.name}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {calc.description}
                    </p>
                    <div
                      className="flex items-center gap-1 text-sm font-medium"
                      style={{ color: theme.colors.primary }}
                    >
                      <span>Open</span>
                      <ChevronRightIcon className="w-4 h-4" />
                    </div>
                  </LCCard>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
