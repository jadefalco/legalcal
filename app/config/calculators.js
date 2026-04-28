/** @type {import("../types/Calculators").CalculatorsList} */
export const calculators = [
  {
    name: "Eviction Timeline",
    slug: "eviction-timeline",
    description:
      "Calculate eviction timelines and key deadlines for your jurisdiction.",
  },
 {
  name: "Notice Period",
  slug: "notice-period",
  description: "Calculate notice period requirements for residential and employment terminations.",
  sections: [
    {
      title: "What is a Notice Period?",
      content: "A notice period is the required time a landlord or employer must give before ending a tenancy or employment."
    },
    {
      title: "Why Notice Periods Matter",
      content: "They protect tenants and employees by ensuring they have time to prepare for major life changes."
    }
  ]
},
  {
    name: "Security Deposit Return",
    slug: "security-deposit-return",
    description:
      "Calculate security deposit return deadlines and allowable deductions.",
  },
  {
    name: "Rent Increase Limits",
    slug: "rent-increase-limits",
    description:
      "Explain rent increase limits, notice requirements, and exemption rules.",
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
];
