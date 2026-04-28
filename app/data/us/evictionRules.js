// app/data/us/evictionRules.js

/** @type {import("../../types/EvictionRules").EvictionRulesMap} */
export const evictionRules = {
  al: {
    stateCode: "AL",
    name: "Alabama",
    noticeForNonpayment: 7, // business days
    noticeForLeaseViolation: 7, // business days
    courtFilingTime: "Landlord may file after the 7-day notice expires without cure or payment.",
    answerDeadline: 7, // days after service
    hearingTimeline: "Typically 1–2 weeks after filing, depending on the county.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of restitution after a court judgment.",
    citations: [
      "Ala. Code § 35-9A-421",
      "Ala. Code § 35-9A-441"
    ]
  },

  ak: {
    stateCode: "AK",
    name: "Alaska",
    noticeForNonpayment: 7,
    noticeForLeaseViolation: 10, // days to cure
    courtFilingTime: "Landlord may file a forcible entry and detainer action after the notice period expires.",
    answerDeadline: 20, // days after service
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of assistance after judgment; tenant gets 24 hours notice.",
    citations: [
      "Alaska Stat. § 09.45.090",
      "Alaska Stat. § 34.03.220"
    ]
  },

  az: {
    stateCode: "AZ",
    name: "Arizona",
    noticeForNonpayment: 5,
    noticeForLeaseViolation: "5 days (material health/safety); 10 days (other violations)",
    courtFilingTime: "Landlord may file after the 5-day or 10-day notice expires without cure.",
    answerDeadline: "Tenant typically appears at the hearing; written answer may be required.",
    hearingTimeline: "Usually 1–3 weeks after filing, depending on court backlog.",
    lockoutAllowedAfter:
      "Only a constable or sheriff may execute the writ of restitution after judgment.",
    citations: [
      "Ariz. Rev. Stat. § 33-1368",
      "Ariz. Rev. Stat. § 33-1377"
    ]
  },

  ar: {
    stateCode: "AR",
    name: "Arkansas",
    noticeForNonpayment: 3, // civil unlawful detainer; 10 days for criminal failure to vacate
    noticeForLeaseViolation: 14, // days to cure remediable violation
    courtFilingTime: "Landlord may file after the 3-day notice expires (civil) or 10-day notice (criminal failure to vacate).",
    answerDeadline: 5, // days before hearing
    hearingTimeline: "Typically 1–2 weeks after filing, depending on service.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "Ark. Code § 18-16-701",
      "Ark. Code § 18-17-101",
      "Ark. Code § 18-60-304"
    ]
  },

  ca: {
    stateCode: "CA",
    name: "California",
    noticeForNonpayment: 3, // days
    noticeForLeaseViolation: 3, // days to cure
    courtFilingTime: "After the 3-day notice expires and tenant has not paid or cured.",
    answerDeadline: 5, // business days after service of summons (typical)
    hearingTimeline: "Usually 3–8 weeks after filing, varies by county and court backlog.",
    lockoutAllowedAfter:
      "Only the sheriff can perform the physical lockout after a court judgment and writ of possession.",
    citations: [
      "Cal. Code Civ. Proc. § 1161",
      "Cal. Code Civ. Proc. § 1167",
      "Cal. Code Civ. Proc. § 715.010"
    ]
  },

  co: {
    stateCode: "CO",
    name: "Colorado",
    noticeForNonpayment: 10, // 5 days for exempt single-family homes
    noticeForLeaseViolation: "10 days to cure (non-substantial); 3 days for substantial violations",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant must respond by the return date on the summons.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on the county.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of restitution after judgment; self-help is prohibited.",
    citations: [
      "Colo. Rev. Stat. § 13-40-104",
      "Colo. Rev. Stat. § 13-40-107.5"
    ]
  },

  ct: {
    stateCode: "CT",
    name: "Connecticut",
    noticeForNonpayment: 3, // notice to quit; rent must be 9 days late before notice
    noticeForLeaseViolation: 15, // days; no cure for serious nuisance
    courtFilingTime: "Landlord may file a summary process action after the notice period expires.",
    answerDeadline: 2, // days
    hearingTimeline: "Typically 1–2 weeks after filing.",
    lockoutAllowedAfter:
      "Only a marshal or sheriff may execute the order of execution; tenant must move out within 24 hours of notice.",
    citations: [
      "Conn. Gen. Stat. § 47a-23",
      "Conn. Gen. Stat. § 47a-15"
    ]
  },

  de: {
    stateCode: "DE",
    name: "Delaware",
    noticeForNonpayment: 5,
    noticeForLeaseViolation: 7, // days to cure; immediate for irreparable harm
    courtFilingTime: "Landlord may file a summary possession action after the notice period expires.",
    answerDeadline: "Tenant appears at the hearing; no advance written answer is required.",
    hearingTimeline: "Typically 1–2 weeks after filing in Justice of the Peace Court.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession; tenant must leave within 24 hours after notice of writ.",
    citations: [
      "Del. Code tit. 25, § 5502",
      "Del. Code tit. 25, § 5513"
    ]
  },

  fl: {
    stateCode: "FL",
    name: "Florida",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: 7, // to cure or vacate
    courtFilingTime:
      "Landlord may file an eviction lawsuit after the 3-day or 7-day notice expires without cure or payment.",
    answerDeadline:
      5, // business days after service of summons (excluding the day of service and weekends/holidays)
    hearingTimeline:
      "Often 2–4 weeks after filing, depending on court schedule and whether the tenant contests.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession; landlord cannot change locks or remove tenant without sheriff.",
    citations: [
      "Fla. Stat. § 83.56",
      "Fla. Stat. § 83.59",
      "Fla. Stat. § 83.62"
    ]
  },

  ga: {
    stateCode: "GA",
    name: "Georgia",
    noticeForNonpayment: "No statutory period; landlord must demand possession (often immediate).",
    noticeForLeaseViolation: "No statutory cure period; landlord may demand possession immediately.",
    courtFilingTime:
      "Landlord may file a dispossessory warrant immediately after demanding possession.",
    answerDeadline:
      "Tenant has 7 days from service to file an answer.",
    hearingTimeline:
      "Hearings typically occur 1–3 weeks after filing depending on county.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession; landlord cannot self-evict.",
    citations: [
      "O.C.G.A. § 44-7-50",
      "O.C.G.A. § 44-7-7"
    ]
  },

  hi: {
    stateCode: "HI",
    name: "Hawaii",
    noticeForNonpayment: 5, // business days
    noticeForLeaseViolation: "10 days (24 hours + 5 days for nuisance; no notice for irremediable harm)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant typically appears at the hearing; written answer may be required.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "Haw. Rev. Stat. § 521-68",
      "Haw. Rev. Stat. § 521-72"
    ]
  },

  id: {
    stateCode: "ID",
    name: "Idaho",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: 3,
    courtFilingTime: "Landlord may file an unlawful detainer action after the 3-day notice expires.",
    answerDeadline: 5, // days
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of restitution after a court judgment.",
    citations: [
      "Idaho Code § 6-303"
    ]
  },

  il: {
    stateCode: "IL",
    name: "Illinois",
    noticeForNonpayment: 5,
    noticeForLeaseViolation: 10, // 10-day notice for violations
    courtFilingTime:
      "Landlord may file after the 5-day or 10-day notice expires without cure or compliance.",
    answerDeadline:
      "Tenant typically must appear on the hearing date; written answers not always required.",
    hearingTimeline:
      "Usually 2–4 weeks after filing depending on county and court backlog.",
    lockoutAllowedAfter:
      "Only the sheriff may perform the eviction after a court order and enforcement of the writ.",
    citations: [
      "735 ILCS 5/9-209",
      "735 ILCS 5/9-210",
      "Illinois Legal Aid — Eviction Process"
    ]
  },

  in: {
    stateCode: "IN",
    name: "Indiana",
    noticeForNonpayment: 10,
    noticeForLeaseViolation: "No statutory notice; landlord may file immediately (unconditional quit).",
    courtFilingTime: "Landlord may file after the 10-day notice expires for nonpayment, or immediately for lease violations.",
    answerDeadline: "Tenant typically appears at the hearing; written answers may be filed in advance.",
    hearingTimeline: "Typically 1–2 weeks after filing in small claims court.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the eviction order after a court judgment.",
    citations: [
      "Ind. Code § 32-31-1-6",
      "Ind. Code § 32-31-1-8"
    ]
  },

  ia: {
    stateCode: "IA",
    name: "Iowa",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: 7,
    courtFilingTime: "Landlord may file an eviction action after the notice period expires without cure.",
    answerDeadline: "Tenant typically appears at the hearing; written answers may be required.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of removal after a court judgment.",
    citations: [
      "Iowa Code § 562A.27"
    ]
  },

  ks: {
    stateCode: "KS",
    name: "Kansas",
    noticeForNonpayment: "3 days (tenancy < 3 months); 10 days (tenancy ≥ 3 months)",
    noticeForLeaseViolation: "14 days to cure, 30 days total to vacate",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant may appear at initial hearing; full trial set 7–14 days later if contested.",
    hearingTimeline: "Initial hearing often within 1 week; full trial 7–14 days later if needed.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of restitution after a court judgment.",
    citations: [
      "Kan. Stat. § 58-2507",
      "Kan. Stat. § 58-2564"
    ]
  },

  ky: {
    stateCode: "KY",
    name: "Kentucky",
    noticeForNonpayment: 7, // URLTA counties
    noticeForLeaseViolation: 15, // days to cure
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment (URLTA counties).",
    answerDeadline: "Tenant typically appears at the hearing; written answers may be filed.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on county.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of forcible detainer after judgment.",
    citations: [
      "Ky. Rev. Stat. § 383.660"
    ]
  },

  la: {
    stateCode: "LA",
    name: "Louisiana",
    noticeForNonpayment: "No notice required; landlord may terminate immediately (unconditional quit).",
    noticeForLeaseViolation: 5,
    courtFilingTime: "Landlord may file immediately for nonpayment; after 5-day notice for lease violations.",
    answerDeadline: 5, // days
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only a constable or sheriff may execute the warrant of eviction after judgment.",
    citations: [
      "La. Civ. Proc. Code art. 4701"
    ]
  },

  me: {
    stateCode: "ME",
    name: "Maine",
    noticeForNonpayment: 7,
    noticeForLeaseViolation: 7,
    courtFilingTime: "Landlord may file after the 7-day notice expires (rent must be 7 days late before notice).",
    answerDeadline: 7, // days
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court backlog.",
    lockoutAllowedAfter:
      "Only the sheriff may enforce the eviction after a court judgment.",
    citations: [
      "Me. Rev. Stat. tit. 14, § 6002"
    ]
  },

  md: {
    stateCode: "MD",
    name: "Maryland",
    noticeForNonpayment: 10,
    noticeForLeaseViolation: "30 days (14 days if clear and imminent danger)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: 5, // days
    hearingTimeline: "Typically 1–2 weeks after filing in District Court.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the warrant of restitution after a court judgment.",
    citations: [
      "Md. Code Real Prop., § 8-401",
      "Md. Code Real Prop., § 8-402.1"
    ]
  },

  ma: {
    stateCode: "MA",
    name: "Massachusetts",
    noticeForNonpayment: 14, // or per lease
    noticeForLeaseViolation: "30 days or one full rental period, whichever is longer",
    courtFilingTime: "Landlord may file a summary process action after the notice period expires.",
    answerDeadline: "Tenant must appear on or before the first court date.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only a sheriff or constable may execute the execution after judgment; self-help is illegal.",
    citations: [
      "Mass. Gen. Laws ch. 186, § 11",
      "Mass. Gen. Laws ch. 186, § 12"
    ]
  },

  mi: {
    stateCode: "MI",
    name: "Michigan",
    noticeForNonpayment: 7,
    noticeForLeaseViolation: 30,
    courtFilingTime:
      "Landlord may file after the notice period expires without cure or move-out.",
    answerDeadline:
      "Tenant must appear at the hearing; written answers not always required.",
    hearingTimeline:
      "Hearings typically occur 10–14 days after filing.",
    lockoutAllowedAfter:
      "Only a sheriff or court officer may remove the tenant after a writ of restitution.",
    citations: [
      "MCL 554.134",
      "Michigan Legal Help — Eviction Process"
    ]
  },

  mn: {
    stateCode: "MN",
    name: "Minnesota",
    noticeForNonpayment: 14, // or 30 days for leases > 20 years
    noticeForLeaseViolation: "No statutory notice required; landlord may file immediately for material violations.",
    courtFilingTime: "Landlord may file after the 14-day notice expires for nonpayment, or immediately for lease violations.",
    answerDeadline: "Tenant typically appears at the hearing; written answers may be required.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of recovery after a court judgment.",
    citations: [
      "Minn. Stat. § 504B.321",
      "Minn. Stat. § 504B.285"
    ]
  },

  ms: {
    stateCode: "MS",
    name: "Mississippi",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: "14 days; no cure if repeat violation within 6 months",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant typically appears at the hearing; written answers may be required.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "Miss. Code § 89-8-13"
    ]
  },

  mo: {
    stateCode: "MO",
    name: "Missouri",
    noticeForNonpayment: "No notice required; landlord may file immediately (unconditional quit).",
    noticeForLeaseViolation: 10, // unconditional notice to quit
    courtFilingTime: "Landlord may file immediately for nonpayment; after 10-day notice for lease violations.",
    answerDeadline: "Tenant typically has 4–10 days to respond, depending on service.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on county.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "Mo. Rev. Stat. § 535.010",
      "Mo. Rev. Stat. § 441.040"
    ]
  },

  mt: {
    stateCode: "MT",
    name: "Montana",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: "14 days (3 days for unauthorized pet/person or verbal abuse)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: 10, // business days
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may remove the tenant after a court judgment and writ.",
    citations: [
      "Mont. Code § 70-24-422"
    ]
  },

  ne: {
    stateCode: "NE",
    name: "Nebraska",
    noticeForNonpayment: 7,
    noticeForLeaseViolation: "14 days to cure, 16 additional days to vacate (14 days total if repeat within 6 months)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant appears at the trial date stated in the summons.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may remove the tenant after a court judgment.",
    citations: [
      "Neb. Rev. Stat. § 76-1431"
    ]
  },

  nv: {
    stateCode: "NV",
    name: "Nevada",
    noticeForNonpayment: 7,
    noticeForLeaseViolation: "5 days (3 days for nuisance or severe violations)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant may answer the complaint and file motions; summary eviction has specific timelines.",
    hearingTimeline: "Typically 1–3 weeks after filing, depending on whether the tenant contests.",
    lockoutAllowedAfter:
      "Only a constable or sheriff may serve the order of eviction or writ of restitution after judgment.",
    citations: [
      "Nev. Rev. Stat. § 40.2512",
      "Nev. Rev. Stat. § 40.2516"
    ]
  },

  nh: {
    stateCode: "NH",
    name: "New Hampshire",
    noticeForNonpayment: 7,
    noticeForLeaseViolation: "30 days (7 days for substantial damage or health/safety risk)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant appears at the hearing; written answers may be filed in advance.",
    hearingTimeline: "Typically 2–6 weeks after filing, depending on county.",
    lockoutAllowedAfter:
      "Only a court officer may execute the writ of possession after judgment; self-help is illegal.",
    citations: [
      "N.H. Rev. Stat. § 540:2",
      "N.H. Rev. Stat. § 540:3"
    ]
  },

  nj: {
    stateCode: "NJ",
    name: "New Jersey",
    noticeForNonpayment: 0, // no notice required
    noticeForLeaseViolation:
      "1-month Notice to Quit after Notice to Cease (varies by violation type).",
    courtFilingTime:
      "Landlord may file after the required statutory notice period expires.",
    answerDeadline:
      "Tenant must appear on the hearing date; written answers not required.",
    hearingTimeline:
      "Hearings typically occur 2–6 weeks after filing depending on county.",
    lockoutAllowedAfter:
      "Only a court officer may execute the warrant of removal; self-help is illegal.",
    citations: [
      "N.J.S.A. 2A:18-61.2",
      "New Jersey Anti-Eviction Act"
    ]
  },

  nm: {
    stateCode: "NM",
    name: "New Mexico",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: 7,
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant typically appears at the hearing; written answers may be required.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of restitution after a court judgment.",
    citations: [
      "N.M. Stat. § 47-8-33"
    ]
  },

  ny: {
    stateCode: "NY",
    name: "New York",
    noticeForNonpayment: 14,
    noticeForLeaseViolation: 10, // to cure, then additional notice to terminate
    courtFilingTime:
      "Landlord may file a nonpayment or holdover proceeding after the notice period expires.",
    answerDeadline:
      "Typically at or before the first court appearance date stated in the petition.",
    hearingTimeline:
      "Often 4–12 weeks or longer in busy courts (especially NYC), depending on backlog and whether the case is contested.",
    lockoutAllowedAfter:
      "Only a marshal, sheriff, or constable may perform the eviction after a warrant of eviction is issued.",
    citations: [
      "N.Y. Real Prop. Acts. Law § 711",
      "N.Y. Real Prop. Acts. Law § 731",
      "N.Y. Real Prop. Acts. Law § 749"
    ]
  },

  nc: {
    stateCode: "NC",
    name: "North Carolina",
    noticeForNonpayment: 10,
    noticeForLeaseViolation: "No statutory cure period; governed by lease terms.",
    courtFilingTime: "Landlord may file after the 10-day notice expires for nonpayment, or per lease for violations.",
    answerDeadline: 10, // days
    hearingTimeline: "Typically 2–4 weeks after filing, depending on county.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "N.C. Gen. Stat. § 42-3",
      "N.C. Gen. Stat. § 42-26"
    ]
  },

  nd: {
    stateCode: "ND",
    name: "North Dakota",
    noticeForNonpayment: 3, // unconditional quit
    noticeForLeaseViolation: 3,
    courtFilingTime: "Landlord may file after the 3-day notice expires without cure or payment.",
    answerDeadline: 10, // days
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "N.D. Cent. Code § 47-32-01",
      "N.D. Cent. Code § 47-32-02"
    ]
  },

  oh: {
    stateCode: "OH",
    name: "Ohio",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: 3,
    courtFilingTime:
      "Landlord may file after the 3-day Notice to Leave the Premises expires.",
    answerDeadline:
      "Tenant typically responds at the hearing; written answers not required.",
    hearingTimeline:
      "Hearings usually occur 10–21 days after filing depending on service.",
    lockoutAllowedAfter:
      "Only the sheriff or bailiff may execute the set-out after a writ of restitution.",
    citations: [
      "Ohio Rev. Code § 1923.04",
      "Ohio Legal Help — Eviction Process"
    ]
  },

  ok: {
    stateCode: "OK",
    name: "Oklahoma",
    noticeForNonpayment: 5,
    noticeForLeaseViolation: "10 days to cure, 15 days total to vacate",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant typically appears at the hearing; written answers may be filed.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of assistance after a court judgment.",
    citations: [
      "Okla. Stat. tit. 41, § 131",
      "Okla. Stat. tit. 41, § 132"
    ]
  },

  or: {
    stateCode: "OR",
    name: "Oregon",
    noticeForNonpayment: "10 days (if 8 days late) or 13 days (if 5 days late)",
    noticeForLeaseViolation: "14 days to cure, 30 days total (10 days for illegal pet)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: 7, // days
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of execution after a court judgment.",
    citations: [
      "Or. Rev. Stat. § 90.394",
      "Or. Rev. Stat. § 90.392"
    ]
  },

  pa: {
    stateCode: "PA",
    name: "Pennsylvania",
    noticeForNonpayment: 10,
    noticeForLeaseViolation: "15 days (lease ≤ 1 year) or 30 days (lease > 1 year)",
    courtFilingTime:
      "Landlord may file after the notice period expires without cure or move-out.",
    answerDeadline:
      "Tenant may appear at the Magisterial District Judge hearing; appeals must be filed within 10 days.",
    hearingTimeline:
      "Hearings are typically scheduled 7–15 days after filing.",
    lockoutAllowedAfter:
      "Only a sheriff or constable may perform the lockout after judgment and order for possession.",
    citations: [
      "68 P.S. § 250.501",
      "PA Landlord-Tenant Act"
    ]
  },

  ri: {
    stateCode: "RI",
    name: "Rhode Island",
    noticeForNonpayment: 5, // rent must be 15 days late before notice
    noticeForLeaseViolation: 20, // material noncompliance
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: 10, // days
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of eviction after a court judgment.",
    citations: [
      "R.I. Gen. Laws § 34-18-35",
      "R.I. Gen. Laws § 34-18-36"
    ]
  },

  sc: {
    stateCode: "SC",
    name: "South Carolina",
    noticeForNonpayment: 5,
    noticeForLeaseViolation: 14,
    courtFilingTime: "Landlord may file after the notice period expires (or immediately if lease specifies in bold, conspicuous type).",
    answerDeadline: 10, // days
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of ejectment after a court judgment.",
    citations: [
      "S.C. Code § 27-40-710",
      "S.C. Code § 27-37-10"
    ]
  },

  sd: {
    stateCode: "SD",
    name: "South Dakota",
    noticeForNonpayment: 3, // unconditional quit
    noticeForLeaseViolation: "3 days in some situations; no notice in others",
    courtFilingTime: "Landlord may file after the 3-day notice expires, or immediately if no notice is required.",
    answerDeadline: 4, // days after service
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of restitution after a court judgment.",
    citations: [
      "S.D. Codified Laws § 21-16-1",
      "S.D. Codified Laws § 21-16-2"
    ]
  },

  tn: {
    stateCode: "TN",
    name: "Tennessee",
    noticeForNonpayment: 14,
    noticeForLeaseViolation: "14 days (30 days for some violations; 3 days for illegal activity)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant typically appears at the hearing; written answers may be required.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on county.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "Tenn. Code § 66-28-505",
      "Tenn. Code § 66-7-109"
    ]
  },

  tx: {
    stateCode: "TX",
    name: "Texas",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: 3, // or per lease
    courtFilingTime:
      "Landlord may file an eviction (forcible detainer) case after the 3-day notice period or longer if the lease specifies.",
    answerDeadline:
      5, // days after judgment to appeal; tenant typically appears at the hearing date
    hearingTimeline:
      "Often 1–3 weeks after filing in Justice Court, depending on docket and service.",
    lockoutAllowedAfter:
      "Constable or sheriff executes the writ of possession after judgment; self-help lockouts are restricted.",
    citations: [
      "Tex. Prop. Code § 24.005",
      "Tex. Prop. Code § 24.0051",
      "Tex. Prop. Code § 24.0061"
    ]
  },

  ut: {
    stateCode: "UT",
    name: "Utah",
    noticeForNonpayment: 3, // business days
    noticeForLeaseViolation: 3,
    courtFilingTime: "Landlord may file after the 3-day notice expires without cure or payment.",
    answerDeadline: "Tenant typically has 3–10 days to respond, depending on service method.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of restitution after a court judgment.",
    citations: [
      "Utah Code § 78B-6-802"
    ]
  },

  vt: {
    stateCode: "VT",
    name: "Vermont",
    noticeForNonpayment: 14,
    noticeForLeaseViolation: "30 days (14 days for criminal activity, drug activity, or acts of violence)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: 10, // days
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "Vt. Stat. tit. 9, § 4467"
    ]
  },

  va: {
    stateCode: "VA",
    name: "Virginia",
    noticeForNonpayment: 5,
    noticeForLeaseViolation: "21 days to cure, 30 days total (30 days if violation cannot be cured)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant appears at the hearing; may pay rent + costs within 10 days before answer date to dismiss.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "Va. Code § 55.1-1245",
      "Va. Code § 55.1-1250"
    ]
  },

  wa: {
    stateCode: "WA",
    name: "Washington",
    noticeForNonpayment: 14,
    noticeForLeaseViolation: "10 days (3 days for waste, nuisance, or unlawful activity)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: 7, // days
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court backlog.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of restitution after a court judgment.",
    citations: [
      "Wash. Rev. Code § 59.12.030",
      "Wash. Rev. Code § 59.18.650"
    ]
  },

  wv: {
    stateCode: "WV",
    name: "West Virginia",
    noticeForNonpayment: "No notice required; landlord may file immediately.",
    noticeForLeaseViolation: "No notice required; landlord may file immediately.",
    courtFilingTime: "Landlord may file a wrongful occupation or unlawful detainer action immediately.",
    answerDeadline: 5, // days
    hearingTimeline: "Typically within 10 days after filing for wrongful occupation.",
    lockoutAllowedAfter:
      "Only the sheriff may evict the tenant after a court judgment.",
    citations: [
      "W. Va. Code § 55-3A-1"
    ]
  },

  wi: {
    stateCode: "WI",
    name: "Wisconsin",
    noticeForNonpayment: "5 days (month-to-month or lease < 1 year); 30 days (lease > 1 year)",
    noticeForLeaseViolation: "5 days (14 days with no cure if repeat within 1 year; 30 days for leases > 1 year)",
    courtFilingTime: "Landlord may file after the notice period expires without cure or payment.",
    answerDeadline: "Tenant typically appears at the hearing; written answers may be filed.",
    hearingTimeline: "Typically 2–4 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of restitution after a court judgment.",
    citations: [
      "Wis. Stat. § 704.17"
    ]
  },

  wy: {
    stateCode: "WY",
    name: "Wyoming",
    noticeForNonpayment: 3,
    noticeForLeaseViolation: 3,
    courtFilingTime: "Landlord may file after the 3-day notice expires without cure or payment.",
    answerDeadline: "Tenant typically has 3–5 days to respond, depending on service.",
    hearingTimeline: "Typically 1–2 weeks after filing, depending on court schedule.",
    lockoutAllowedAfter:
      "Only the sheriff may execute the writ of possession after a court judgment.",
    citations: [
      "Wyo. Stat. § 1-21-1002",
      "Wyo. Stat. § 1-21-1003"
    ]
  },
};
