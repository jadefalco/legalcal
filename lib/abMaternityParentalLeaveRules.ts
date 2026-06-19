const EI_MAX_WEEKLY = 650;
const STANDARD_RATE = 0.55;
const EXTENDED_RATE = 0.33;

export function calculateMaternityParentalLeave(
  averageWeeklyEarnings: number,
  benefitType: string,
  weeksClaimed: number
): {
  weeklyBenefitAmount: number;
  totalBenefitAmount: number;
  maxWeeksAllowed: number;
} {
  let weeklyBenefitAmount: number;
  let totalBenefitAmount: number;
  let maxWeeksAllowed: number;

  if (benefitType === "maternity_standard") {
    maxWeeksAllowed = 15;
    weeklyBenefitAmount = Math.min(
      averageWeeklyEarnings * STANDARD_RATE,
      EI_MAX_WEEKLY
    );
    totalBenefitAmount = weeklyBenefitAmount * maxWeeksAllowed;
  } else if (benefitType === "parental_standard") {
    maxWeeksAllowed = 40;
    weeklyBenefitAmount = Math.min(
      averageWeeklyEarnings * STANDARD_RATE,
      EI_MAX_WEEKLY
    );
    totalBenefitAmount = weeklyBenefitAmount * weeksClaimed;
  } else if (benefitType === "parental_extended") {
    maxWeeksAllowed = 69;
    weeklyBenefitAmount = Math.min(
      averageWeeklyEarnings * EXTENDED_RATE,
      EI_MAX_WEEKLY
    );
    totalBenefitAmount = weeklyBenefitAmount * weeksClaimed;
  } else {
    maxWeeksAllowed = 0;
    weeklyBenefitAmount = 0;
    totalBenefitAmount = 0;
  }

  return {
    weeklyBenefitAmount,
    totalBenefitAmount,
    maxWeeksAllowed,
  };
}
