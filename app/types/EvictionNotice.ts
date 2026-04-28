/**
 * Type definitions for Eviction Notice Generator inputs.
 */

export interface EvictionNoticeInput {
  /** Two-letter lowercase state code */
  stateCode: string;

  /** Eviction reason key */
  reason: "nonpayment" | "lease-violation" | "month-to-month" | "other";

  /** Date the notice is served */
  servedDate: string;

  /** Full name of the tenant */
  tenantName: string;

  /** Full name of the landlord or property manager */
  landlordName: string;

  /** Rental property street address */
  rentalAddress: string;

  /** City of the rental property */
  rentalCity: string;

  /** Amount of rent owed (if nonpayment) */
  amountOwed: string;

  /** Description of lease violation (if lease-violation) */
  violationDescription: string;

  /** Additional notes to include in the notice */
  additionalNotes: string;

  /** Method of delivery (e.g., "Personal delivery", "Certified mail", "Posted on door") */
  deliveryMethod: string;
}
