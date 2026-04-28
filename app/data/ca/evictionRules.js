// app/data/ca/evictionRules.js

/** @type {import("../../types/CanadaEvictionRules").CanadaEvictionRulesMap} */
export const evictionRules = {
  ab: {
    provinceCode: "AB",
    name: "Alberta",
    noticeForNonpayment: 14,
    noticeForLeaseViolation: "14 days (24 hours for damage or assault)",
    courtFilingTime: "Landlord may apply to RTDRS or court after the notice period expires without cure or payment.",
    answerDeadline: "Tenant must object in writing within 14 days of receiving the notice.",
    hearingTimeline: "RTDRS hearings average approximately 9 business days from filing (2023-2024 data).",
    lockoutAllowedAfter:
      "Only a sheriff or court officer may enforce an eviction order; self-help is prohibited.",
    citations: [
      "Residential Tenancies Act, SA 2004, c R-17.1",
      "RTDRS Annual Report 2023-2024"
    ]
  },

  bc: {
    provinceCode: "BC",
    name: "British Columbia",
    noticeForNonpayment: 10,
    noticeForLeaseViolation: "1 month for cause; 2 months for landlord use; 3 months for purchaser use (as of Aug 2024)",
    courtFilingTime: "Landlord may apply for dispute resolution with the RTB after the notice period expires.",
    answerDeadline: "Tenant has 5 days to dispute a 10-day notice; 10 days for a 1-month notice; 15 days for a 2-month notice; 30 days for a 3-month notice.",
    hearingTimeline: "Typically 2–6 weeks after filing, depending on RTB backlog.",
    lockoutAllowedAfter:
      "Only a court-approved bailiff may physically remove a tenant after an RTB order for possession.",
    citations: [
      "Residential Tenancy Act, SBC 2002, c 78",
      "Residential Tenancy Regulation, BC Reg 477/2003"
    ]
  },

  mb: {
    provinceCode: "MB",
    name: "Manitoba",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: "Warning usually required before formal eviction notice; notice period depends on violation type.",
    courtFilingTime: "Landlord may apply to the Residential Tenancies Branch after the notice period expires.",
    answerDeadline: "Tenant may dispute the notice through the Residential Tenancies Branch.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on backlog.",
    lockoutAllowedAfter:
      "Only a sheriff or court officer may enforce an eviction order; self-help is prohibited.",
    citations: [
      "Residential Tenancies Act, CCSM c R119"
    ]
  },

  nb: {
    provinceCode: "NB",
    name: "New Brunswick",
    noticeForNonpayment: "7 days to pay, then 15 days to vacate if unpaid",
    noticeForLeaseViolation: 15,
    courtFilingTime: "Landlord may apply to the Residential Tenancies Tribunal after the notice period expires.",
    answerDeadline: "Tenant may file for assistance with the Residential Tenancies Tribunal within 15 days of receiving notice.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on tribunal schedule.",
    lockoutAllowedAfter:
      "Only a judge or residential tenancies officer may order eviction; self-help is prohibited.",
    citations: [
      "Residential Tenancies Act, SNB 2009, c R-15.2"
    ]
  },

  nl: {
    provinceCode: "NL",
    name: "Newfoundland and Labrador",
    noticeForNonpayment: "5 days to move out (cannot evict until 10 days after rent is 5 days late)",
    noticeForLeaseViolation: 5,
    courtFilingTime: "Landlord may apply to the Residential Tenancies Office after the notice period expires.",
    answerDeadline: "Tenant may mediate disagreements through the Residential Tenancies Office.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on office schedule.",
    lockoutAllowedAfter:
      "Only a court officer or sheriff may enforce an eviction order; self-help is prohibited.",
    citations: [
      "Residential Tenancies Act, SNL 2018, c R-15.1"
    ]
  },

  ns: {
    provinceCode: "NS",
    name: "Nova Scotia",
    noticeForNonpayment: 15,
    noticeForLeaseViolation: 15,
    courtFilingTime: "Landlord may file with the Residential Tenancies Program after the notice period expires.",
    answerDeadline: "Tenant has 15 days to pay rent or file a formal dispute of the eviction.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on program backlog.",
    lockoutAllowedAfter:
      "Only a sheriff or court officer may enforce an eviction order; self-help is prohibited.",
    citations: [
      "Residential Tenancies Act, SNS 2018, c 26"
    ]
  },

  nt: {
    provinceCode: "NT",
    name: "Northwest Territories",
    noticeForNonpayment: 10,
    noticeForLeaseViolation: 10,
    courtFilingTime: "Landlord must go to the Rental Office to obtain an eviction order if the tenant has not moved out.",
    answerDeadline: "Tenant may dispute the notice through the Rental Office.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on Rental Office schedule.",
    lockoutAllowedAfter:
      "Only a rental officer or court may order and enforce eviction; self-help is prohibited.",
    citations: [
      "Residential Tenancies Act, SNWT 2007, c 15"
    ]
  },

  nu: {
    provinceCode: "NU",
    name: "Nunavut",
    noticeForNonpayment: 10,
    noticeForLeaseViolation: 10,
    courtFilingTime: "Landlord may apply to the Residential Tenancies Office after the notice period expires.",
    answerDeadline: "Tenant may dispute the notice through the Residential Tenancies Office.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on office schedule.",
    lockoutAllowedAfter:
      "Only a court officer or sheriff may enforce an eviction order; self-help is prohibited.",
    citations: [
      "Residential Tenancies Act, SNu 2009, c 10"
    ]
  },

  on: {
    provinceCode: "ON",
    name: "Ontario",
    noticeForNonpayment: "14 days (monthly/weekly); 7 days (daily)",
    noticeForLeaseViolation: "20 days (N5; 7 days if repeated); 10 days (N6/N7)",
    courtFilingTime: "Landlord may file an L1 or L2 application with the Landlord and Tenant Board (LTB) after the notice period expires.",
    answerDeadline: "Tenant may dispute the notice and request a hearing before the LTB.",
    hearingTimeline: "Non-payment applications: approximately 3 months; other applications: 5–7 months (2024 data).",
    lockoutAllowedAfter:
      "Only the Court Enforcement Office (Sheriff) may enforce an LTB eviction order; self-help is prohibited.",
    citations: [
      "Residential Tenancies Act, 2006, SO 2006, c 17",
      "Landlord and Tenant Board (LTB)"
    ]
  },

  pe: {
    provinceCode: "PE",
    name: "Prince Edward Island",
    noticeForNonpayment: "20 days to move out (tenant can remain if rent paid within 10 days)",
    noticeForLeaseViolation: 30,
    courtFilingTime: "Landlord may apply to the Rental Office after the notice period expires.",
    answerDeadline: "Tenant may request that any eviction notice be set aside.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on Rental Office schedule.",
    lockoutAllowedAfter:
      "Only a court officer or sheriff may enforce an eviction order; self-help is prohibited.",
    citations: [
      "Rental of Residential Property Act, RSPEI 1988, c R-13.1"
    ]
  },

  qc: {
    provinceCode: "QC",
    name: "Quebec",
    noticeForNonpayment: "No fixed statutory period; lease termination for non-payment requires TAL proceedings.",
    noticeForLeaseViolation: "Varies by lease length and violation type; TAL adjudication required.",
    courtFilingTime: "Landlord must file an application with the Tribunal administratif du logement (TAL).",
    answerDeadline: "Tenant must file an objection with the TAL within one month of receiving the notice.",
    hearingTimeline: "Typically 2–6 months after filing, depending on TAL backlog.",
    lockoutAllowedAfter:
      "Only a bailiff or court officer may enforce a TAL eviction order; self-help is prohibited.",
    citations: [
      "Civil Code of Quebec, CQLR c CCQ-1991",
      "Tribunal administratif du logement (TAL)"
    ]
  },

  sk: {
    provinceCode: "SK",
    name: "Saskatchewan",
    noticeForNonpayment: 15,
    noticeForLeaseViolation: 15,
    courtFilingTime: "Landlord may apply to the Office of Residential Tenancies after the notice period expires.",
    answerDeadline: "Tenant has 15 days to dispute an eviction notice after receiving it.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on office schedule.",
    lockoutAllowedAfter:
      "Only a sheriff or court officer may enforce an eviction order; self-help is prohibited.",
    citations: [
      "Residential Tenancies Act, 2006, SS 2006, c R-22.0001"
    ]
  },

  yt: {
    provinceCode: "YT",
    name: "Yukon",
    noticeForNonpayment: 14,
    noticeForLeaseViolation: 14,
    courtFilingTime: "Landlord may apply to the Rental Office after the notice period expires.",
    answerDeadline: "Tenant has 10 days to apply for dispute resolution after receiving a notice.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on Rental Office schedule.",
    lockoutAllowedAfter:
      "Only a court officer or sheriff may enforce an eviction order; self-help is prohibited.",
    citations: [
      "Residential Landlord and Tenant Act, SY 2015, c 10"
    ]
  },
};
