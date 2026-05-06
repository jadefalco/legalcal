import { notFound } from "next/navigation";

import { usStates } from "@/app/config/usStates";
import { getTheme } from "@/app/theme";

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

import { EmbedResizer } from "../components/EmbedResizer";

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

interface EmbedPageProps {
  params: { calculator: string };
  searchParams: { state?: string; city?: string; theme?: string };
}

export default function EmbedPage({ params, searchParams }: EmbedPageProps) {
  const calcSlug = params.calculator.toLowerCase();
  const stateCode = (searchParams.state || "ca").toLowerCase();
  const themeParam = searchParams.theme || "light";

  const state = usStates[stateCode as keyof typeof usStates];
  const CalculatorComponent = calculatorComponents[calcSlug];

  if (!state || !CalculatorComponent) {
    return notFound();
  }

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: themeParam === "dark" ? "#0f172a" : "#ffffff",
        color: themeParam === "dark" ? "#f1f5f9" : "#1e293b",
      }}
    >
      <EmbedResizer>
        <CalculatorComponent initialState={stateCode} />
      </EmbedResizer>
    </div>
  );
}
