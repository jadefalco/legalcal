/** @type {import("../types/Calculators").CalculatorsList} */
export const calculators = [
  //
  // Core LegalCals calculators (match your route generator)
  //
  {
    name: "Eviction Timeline",
    slug: "eviction-timeline",
    description:
      "Calculate eviction timelines and key deadlines for your jurisdiction.",
  },
  {
    name: "Deposit Return",
    slug: "deposit-return",
    description:
      "Calculate security deposit return deadlines and allowable deductions.",
  },
  {
    name: "Rent Increase",
    slug: "rent-increase",
    description:
      "Calculate notice periods and rules for rent increases.",
  },
  {
    name: "Lease Termination",
    slug: "lease-termination",
    description:
      "Calculate lease termination notice periods and rules for your state.",
  },
  {
    name: "Eviction Notice",
    slug: "eviction-notice",
    description:
      "Generate eviction notices based on state rules.",
  },
  {
    name: "Deposit Demand",
    slug: "deposit-demand",
    description:
      "Generate a demand letter for deposit return.",
  },
  {
    name: "Itemized Deductions",
    slug: "itemized-deductions",
    description:
      "Generate an itemized deduction statement.",
  },
  {
    name: "Entry Notice",
    slug: "entry-notice",
    description:
      "Calculate required notice before a landlord may enter a rental unit.",
  },

  //
  // Your original calculators (kept as-is)
  //
  {
    name: "Notice Period",
    slug: "notice-period",
    description:
      "Calculate notice period requirements for residential and employment terminations.",
    sections: [
      {
        title: "What is a Notice Period?",
        content:
          "A notice period is the required time a landlord or employer must give before ending a tenancy or employment.",
      },
      {
        title: "Why Notice Periods Matter",
        content:
          "They protect tenants and employees by ensuring they have time to prepare for major life changes.",
      },
    ],
  },
  {
    name: "Final Paycheck Deadline",
    slug: "final-paycheck-deadline",
    description:
      "Calculate final paycheck deadlines and accrued vacation payouts.",
  },
  {
    name: "Overtime Calculator",
    slug: "overtime-calculator",
    description:
      "Estimate overtime pay rules and eligibility for your jurisdiction.",
  },
  {
    name: "Small Claims Eligibility",
    slug: "small-claims-eligibility",
    description:
      "Explain small claims court eligibility, limits, and filing procedures.",
  },
  {
    name: "Late Fee",
    slug: "late-fee",
    description:
      "Calculate legal limits on late rent fees.",
  },
  {
    name: "Repair & Deduct",
    slug: "repair-deduct",
    description:
      "Calculate when tenants may repair issues and deduct costs from rent.",
  },
  {
    name: "Withhold Rent",
    slug: "withhold-rent",
    description:
      "Calculate when tenants may legally withhold rent due to habitability issues.",
  },
  {
    name: "Rent Receipt Requirements",
    slug: "rent-receipt",
    description:
      "Check whether landlords must provide rent receipts and under what conditions.",
  },
  {
    name: "Duplicate Rent Receipt",
    slug: "duplicate-receipt",
    description:
      "Check tenant rights to request a duplicate rent receipt and landlord obligations.",
  },
  {
    name: "Payment Methods",
    slug: "payment-methods",
    description:
      "Check which rent payment methods landlords must accept or may refuse.",
  },
  {
    name: "Receipt Validation",
    slug: "receipt-validation",
    description:
      "Check whether a rent receipt meets state legal requirements.",
  },
  {
    name: "Late Status",
    slug: "late-status",
    description:
      "Check whether rent is legally late today and when late fees may begin.",
  },
  {
    name: "Payment Proof",
    slug: "payment-proof",
    description:
      "Check whether your proof of rent payment is legally valid in your state.",
  },
  {
    name: "Ledger Validation",
    slug: "ledger-validation",
    description:
      "Check whether a landlord&apos;s rent ledger is accurate and legally compliant.",
  },
  {
    name: "Security Deposit",
    slug: "security-deposit",
    description:
      "Calculate security deposit caps, return deadlines, and penalties by state.",
  },
];