// app/data/us/securityDepositRules.js

/** @type {import("../../types/SecurityDepositRules").SecurityDepositRulesMap} */
export const securityDepositRules = {
  al: {
    stateCode: "AL",
    name: "Alabama",
    maxDeposit: "1 month's rent (additional may be required for pets, alterations, or increased liability)",
    returnDeadline: 60,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "Additional deposit may be required for pets.",
    allowedDeductions: "Unpaid rent and damages beyond normal wear and tear.",
    citations: [
      "Ala. Code § 35-9A-201"
    ]
  },

  ak: {
    stateCode: "AK",
    name: "Alaska",
    maxDeposit: "2 months' rent (excludes rents exceeding $2,000/month)",
    returnDeadline: "14 days (no deductions) / 30 days (with deductions)",
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Deterioration beyond normal wear and tear, unpaid rent, and damages from tenant's failure to comply with lease terms.",
    citations: [
      "Alaska Stat. § 34.03.070"
    ]
  },

  az: {
    stateCode: "AZ",
    name: "Arizona",
    maxDeposit: "1.5 months' rent",
    returnDeadline: 14,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Unpaid rent, damage beyond normal wear and tear, and other expenses from lease violations.",
    citations: [
      "Ariz. Rev. Stat. § 33-1321"
    ]
  },

  ar: {
    stateCode: "AR",
    name: "Arkansas",
    maxDeposit: "2 months' rent (landlords with 6+ properties or managed properties)",
    returnDeadline: 60,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, cleaning costs, unpaid rent, and late fees.",
    citations: [
      "Ark. Code § 18-16-305"
    ]
  },

  ca: {
    stateCode: "CA",
    name: "California",
    maxDeposit: "2 months' rent (unfurnished); 3 months' rent (furnished)",
    returnDeadline: 21,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "Pet deposits are generally considered part of the security deposit and subject to the same cap.",
    allowedDeductions: "Unpaid rent, damage beyond normal wear and tear, cleaning costs to return unit to move-in condition, and costs of restoring or replacing personal property.",
    citations: [
      "Cal. Civ. Code § 1950.5"
    ]
  },

  co: {
    stateCode: "CO",
    name: "Colorado",
    maxDeposit: "No statutory limit",
    returnDeadline: "30 days (60 days with written notice in lease)",
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Unpaid rent, damage beyond normal wear and tear, cleaning costs, and other lease violation costs.",
    citations: [
      "C.R.S. § 38-12-103"
    ]
  },

  ct: {
    stateCode: "CT",
    name: "Connecticut",
    maxDeposit: "2 months' rent (tenants 62+ may be limited to 1 month)",
    returnDeadline: "30 days (15 days if tenancy > 5 years)",
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Unpaid rent and damage beyond normal wear and tear.",
    citations: [
      "Conn. Gen. Stat. § 47a-21"
    ]
  },

  de: {
    stateCode: "DE",
    name: "Delaware",
    maxDeposit: "1 month's rent (leases ≥ 1 year); no limit for month-to-month first year; no limit for furnished rentals",
    returnDeadline: 20,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "1 month's rent for a pet deposit (excluding service animals).",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent or late fees, and costs of re-renting after early lease termination.",
    citations: [
      "25 Del. Code § 5514"
    ]
  },

  fl: {
    stateCode: "FL",
    name: "Florida",
    maxDeposit: "No statutory limit",
    returnDeadline: "15 days (no deductions) / 30 days (with deductions)",
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Fla. Stat. § 83.49"
    ]
  },

  ga: {
    stateCode: "GA",
    name: "Georgia",
    maxDeposit: "No statutory limit",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, cleaning costs, unpaid rent, late fees, unpaid utility bills, unpaid pet fees, and other lease violation costs.",
    citations: [
      "O.C.G.A. § 44-7-34"
    ]
  },

  hi: {
    stateCode: "HI",
    name: "Hawaii",
    maxDeposit: "1 month's rent",
    returnDeadline: 14,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "Up to 1 additional month's rent for a pet deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, cleaning costs, unpaid rent, late fees, failure to return keys, and early lease termination costs.",
    citations: [
      "Haw. Rev. Stat. § 521-44"
    ]
  },

  id: {
    stateCode: "ID",
    name: "Idaho",
    maxDeposit: "No statutory limit",
    returnDeadline: 21,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear and other costs associated with lease violations.",
    citations: [
      "Idaho Code § 6-321"
    ]
  },

  il: {
    stateCode: "IL",
    name: "Illinois",
    maxDeposit: "No statutory limit",
    returnDeadline: "30 days (with deductions) / 45 days (return in full, or 30 days for repairs)",
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, cleaning costs, unpaid rent, and unpaid utility bills.",
    citations: [
      "765 ILCS 710/1"
    ]
  },

  in: {
    stateCode: "IN",
    name: "Indiana",
    maxDeposit: "No statutory limit",
    returnDeadline: 45,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Ind. Code § 32-31-3-12"
    ]
  },

  ia: {
    stateCode: "IA",
    name: "Iowa",
    maxDeposit: "2 months' rent",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Iowa Code § 562A.12"
    ]
  },

  ks: {
    stateCode: "KS",
    name: "Kansas",
    maxDeposit: "1 month's rent (furnished may require additional; pet deposit up to 0.5 month)",
    returnDeadline: 14,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "Up to 0.5 month's rent for a pet deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Kan. Stat. § 58-2550"
    ]
  },

  ky: {
    stateCode: "KY",
    name: "Kentucky",
    maxDeposit: "No statutory limit",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Ky. Rev. Stat. § 383.580"
    ]
  },

  la: {
    stateCode: "LA",
    name: "Louisiana",
    maxDeposit: "No statutory limit",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, unpaid utility bills, and other costs associated with lease violations.",
    citations: [
      "La. Rev. Stat. § 9:3251"
    ]
  },

  me: {
    stateCode: "ME",
    name: "Maine",
    maxDeposit: "2 months' rent",
    returnDeadline: "30 days (written lease) / 21 days (tenancy-at-will or seasonal)",
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "14 M.R.S. § 6033"
    ]
  },

  md: {
    stateCode: "MD",
    name: "Maryland",
    maxDeposit: "2 months' rent",
    returnDeadline: 45,
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Md. Code Real Prop., § 8-203"
    ]
  },

  ma: {
    stateCode: "MA",
    name: "Massachusetts",
    maxDeposit: "1 month's rent",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, unpaid water bills, and unpaid real estate taxes (if lease requires tenant to pay).",
    citations: [
      "Mass. Gen. Laws ch. 186, § 15B"
    ]
  },

  mi: {
    stateCode: "MI",
    name: "Michigan",
    maxDeposit: "1.5 months' rent",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, unpaid utility bills, and other costs associated with lease violations.",
    citations: [
      "Mich. Comp. Laws § 554.613"
    ]
  },

  mn: {
    stateCode: "MN",
    name: "Minnesota",
    maxDeposit: "No statutory limit",
    returnDeadline: 21,
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Minn. Stat. § 504B.178"
    ]
  },

  ms: {
    stateCode: "MS",
    name: "Mississippi",
    maxDeposit: "No statutory limit",
    returnDeadline: 45,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, cleaning costs, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Miss. Code § 89-8-21"
    ]
  },

  mo: {
    stateCode: "MO",
    name: "Missouri",
    maxDeposit: "2 months' rent",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Mo. Rev. Stat. § 535.300"
    ]
  },

  mt: {
    stateCode: "MT",
    name: "Montana",
    maxDeposit: "No statutory limit",
    returnDeadline: "30 days (10 days if no deductions)",
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, late fees, landlord's labor charges, unpaid utilities, and other lease violation costs.",
    citations: [
      "Mont. Code § 70-25-202"
    ]
  },

  ne: {
    stateCode: "NE",
    name: "Nebraska",
    maxDeposit: "1 month's rent, plus up to 0.25 month's rent for a pet deposit",
    returnDeadline: 14,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "Up to 0.25 month's rent for a pet deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and unpaid utilities.",
    citations: [
      "Neb. Rev. Stat. § 76-1416"
    ]
  },

  nv: {
    stateCode: "NV",
    name: "Nevada",
    maxDeposit: "3 months' rent (private housing); 1 month's rent (public housing)",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit. Tenant may elect a surety bond instead if both parties agree.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and cleaning costs.",
    citations: [
      "Nev. Rev. Stat. § 118A.242"
    ]
  },

  nh: {
    stateCode: "NH",
    name: "New Hampshire",
    maxDeposit: "1 month's rent or $100, whichever is greater (no limit for shared facilities/boarding houses)",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, unpaid taxes, and other costs associated with lease violations.",
    citations: [
      "N.H. Rev. Stat. § 540-B:10"
    ]
  },

  nj: {
    stateCode: "NJ",
    name: "New Jersey",
    maxDeposit: "1.5 months' rent",
    returnDeadline: "30 days (5 days for fire/disaster relocation)",
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear and unpaid rent.",
    citations: [
      "N.J.S.A. § 46:8-21.1"
    ]
  },

  nm: {
    stateCode: "NM",
    name: "New Mexico",
    maxDeposit: "1 month's rent (< 1 year); any amount if held in interest-bearing account (≥ 1 year)",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, unpaid utilities, and other costs associated with lease violations.",
    citations: [
      "N.M. Stat. § 47-8-18"
    ]
  },

  ny: {
    stateCode: "NY",
    name: "New York",
    maxDeposit: "1 month's rent",
    returnDeadline: 14,
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "N.Y. Real Prop. Law § 227-e"
    ]
  },

  nc: {
    stateCode: "NC",
    name: "North Carolina",
    maxDeposit: "2 weeks' rent (week-to-week); 1.5 months' rent (month-to-month); 2 months' rent (> 2 months)",
    returnDeadline: "30 days (60 days if dispute over deductions)",
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "Reasonable non-refundable pet fee allowed (no specific limit).",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, unpaid utilities, breach of lease, court costs, costs of removing possessions after eviction, and re-renting costs after breach.",
    citations: [
      "N.C. Gen. Stat. § 42-52"
    ]
  },

  nd: {
    stateCode: "ND",
    name: "North Dakota",
    maxDeposit: "1 month's rent; additional pet deposit up to $2,500 or 2 months' rent (whichever is greater); up to 2 months' rent for tenants with felony convictions",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "Up to $2,500 or 2 months' rent (whichever is greater) for a pet deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and cleaning costs.",
    citations: [
      "N.D. Cent. Code § 47-16-07.1"
    ]
  },

  oh: {
    stateCode: "OH",
    name: "Ohio",
    maxDeposit: "No statutory limit",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: true,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear and unpaid rent.",
    citations: [
      "Ohio Rev. Code § 5321.16"
    ]
  },

  ok: {
    stateCode: "OK",
    name: "Oklahoma",
    maxDeposit: "No statutory limit",
    returnDeadline: 45,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Okla. Stat. tit. 41, § 115"
    ]
  },

  or: {
    stateCode: "OR",
    name: "Oregon",
    maxDeposit: "No statutory limit",
    returnDeadline: 31,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; deposit may be increased within first year if both parties agree.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Or. Rev. Stat. § 90.300"
    ]
  },

  pa: {
    stateCode: "PA",
    name: "Pennsylvania",
    maxDeposit: "2 months' rent (first year); 1 month's rent (successive years); no increase after 5 years",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "68 P.S. § 250.512"
    ]
  },

  ri: {
    stateCode: "RI",
    name: "Rhode Island",
    maxDeposit: "1 month's rent",
    returnDeadline: 20,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "R.I. Gen. Laws § 34-18-19"
    ]
  },

  sc: {
    stateCode: "SC",
    name: "South Carolina",
    maxDeposit: "No statutory limit",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear and unpaid rent.",
    citations: [
      "S.C. Code § 27-40-410"
    ]
  },

  sd: {
    stateCode: "SD",
    name: "South Dakota",
    maxDeposit: "1 month's rent (higher allowed for special conditions such as pets)",
    returnDeadline: 14,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "Higher amount allowed if tenant presents special conditions (e.g., pet) that pose danger to premises.",
    allowedDeductions: "Damage beyond normal wear and tear and unpaid rent.",
    citations: [
      "S.D. Codified Laws § 43-32-24"
    ]
  },

  tn: {
    stateCode: "TN",
    name: "Tennessee",
    maxDeposit: "No statutory limit",
    returnDeadline: "No specific statutory deadline; landlord must notify tenant of refund due (tenant has 60 days to respond)",
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Tenn. Code § 66-28-301"
    ]
  },

  tx: {
    stateCode: "TX",
    name: "Texas",
    maxDeposit: "No statutory limit",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear and other costs associated with lease violations.",
    citations: [
      "Tex. Prop. Code § 92.109"
    ]
  },

  ut: {
    stateCode: "UT",
    name: "Utah",
    maxDeposit: "No statutory limit",
    returnDeadline: 30,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "Non-refundable deposits allowed if clearly stated in a signed lease or document.",
    allowedDeductions: "Damage beyond normal wear and tear, cleaning costs, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Utah Code § 57-17-3"
    ]
  },

  vt: {
    stateCode: "VT",
    name: "Vermont",
    maxDeposit: "No statutory limit",
    returnDeadline: "14 days (60 days for seasonal rentals not used as primary residence)",
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid utilities, unpaid rent, and costs of removing items after move-out.",
    citations: [
      "Vt. Stat. tit. 9, § 4461"
    ]
  },

  va: {
    stateCode: "VA",
    name: "Virginia",
    maxDeposit: "2 months' rent",
    returnDeadline: 45,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit; included in max deposit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid utilities, and other costs associated with lease violations.",
    citations: [
      "Va. Code § 55.1-1226"
    ]
  },

  wa: {
    stateCode: "WA",
    name: "Washington",
    maxDeposit: "No statutory limit",
    returnDeadline: 21,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit. Deposits are not allowed for normal cleaning.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, and other costs associated with lease violations.",
    citations: [
      "Wash. Rev. Code § 59.18.280"
    ]
  },

  wv: {
    stateCode: "WV",
    name: "West Virginia",
    maxDeposit: "No statutory limit",
    returnDeadline: "60 days (or within 45 days of new tenant occupancy, whichever is shorter); 15 additional days if damage exceeds deposit and requires professional work",
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, unpaid utilities, costs of removing items after tenant vacates, and other lease violation costs.",
    citations: [
      "W. Va. Code § 37-6A-2"
    ]
  },

  wi: {
    stateCode: "WI",
    name: "Wisconsin",
    maxDeposit: "No statutory limit",
    returnDeadline: 21,
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, unpaid utilities, and other costs outlined in a separate Nonstandard Rental Provisions document.",
    citations: [
      "Wis. Stat. § 704.28"
    ]
  },

  wy: {
    stateCode: "WY",
    name: "Wyoming",
    maxDeposit: "No statutory limit",
    returnDeadline: "30 days if applied to unpaid rent, or 15 days after receiving forwarding address; additional 30 days if deductions are made for damage",
    itemizedStatementRequired: true,
    interestRequired: false,
    petDepositRules: "No separate statutory pet deposit limit.",
    allowedDeductions: "Damage beyond normal wear and tear, unpaid rent, cleaning costs, and other costs associated with lease violations.",
    citations: [
      "Wyo. Stat. § 1-21-1207"
    ]
  },
};
