/**
 * Deterministic notice-period lookup for BC landlord notices to end tenancy.
 */

export function getNoticePeriodDays(reason: string): number {
  switch (reason) {
    case "non_payment":
      return 10;
    case "breach_of_agreement":
      return 30;
    case "landlord_use":
      return 60;
    case "renovation_or_demolition":
      return 120;
    case "end_of_fixed_term":
      return 0;
    case "illegal_activity":
      return 10;
    default:
      return 0;
  }
}
