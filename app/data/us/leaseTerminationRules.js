// app/data/us/leaseTerminationRules.js

/** @type {import("../../types/LeaseTerminationRules").LeaseTerminationRulesMap} */
export const leaseTerminationRules = {
  al: {
    stateCode: "AL",
    name: "Alabama",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination of a fixed-term lease is governed by the lease agreement. Tenant remains liable for rent until the landlord mitigates damages by re-renting the unit. No statutory right to break lease early except under federal SCRA for military deployment.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "Notice must be in writing. For month-to-month tenancies, 30 days' notice is required from either party.",
    exceptions: null,
    citations: ["Ala. Code § 35-9A-441"],
  },

  ak: {
    stateCode: "AK",
    name: "Alaska",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early if the landlord fails to maintain the premises in a habitable condition, or if the tenant is a victim of domestic violence or sexual assault. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence or sexual assault may terminate the lease with 30 days' written notice and appropriate documentation (protective order or police report).",
    additionalRequirements:
      "Notice must be in writing. Tenant must provide written notice at least 30 days before the intended termination date for month-to-month tenancies.",
    exceptions: null,
    citations: ["Alaska Stat. § 34.03.290", "Alaska Stat. § 34.03.300"],
  },

  az: {
    stateCode: "AZ",
    name: "Arizona",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease terms. Tenant may terminate early if the landlord fails to maintain habitable premises, or if the tenant is a victim of domestic violence. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 30 days' written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "Notice must be in writing. For month-to-month tenancies, notice must be given at least 30 days prior to the periodic rental date.",
    exceptions: null,
    citations: ["Ariz. Rev. Stat. § 33-1375", "Ariz. Rev. Stat. § 33-1318"],
  },

  ar: {
    stateCode: "AR",
    name: "Arkansas",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination of a fixed-term lease is governed by the lease agreement. Tenant remains liable for rent until the end of the lease term unless the landlord agrees otherwise or breaches the lease. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "Notice must be in writing. For month-to-month tenancies, 30 days' notice is required from either party.",
    exceptions: null,
    citations: ["Ark. Code § 18-17-704"],
  },

  ca: {
    stateCode: "CA",
    name: "California",
    monthToMonthNoticeDays:
      "30 days (tenant in unit less than 1 year); 60 days (tenant in unit 1 year or more)",
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for: uninhabitable conditions, landlord harassment, domestic violence/sexual assault/stalking, military deployment (SCRA), or if the tenant is a senior citizen moving to a care facility. Lease terms govern in other situations; tenant may be liable for unpaid rent minus landlord's duty to mitigate.",
    domesticViolenceProtections:
      "Victims of domestic violence, sexual assault, stalking, or human trafficking may terminate the lease with written notice and appropriate documentation. Tenant is not liable for rent after 14 days from notice.",
    additionalRequirements:
      "Notice must be in writing. For month-to-month, notice must be given at least 30 or 60 days before the end of a rental period, depending on tenancy length. Some cities have additional local requirements.",
    exceptions:
      "Does not apply to properties subject to local rent control with additional just-cause eviction protections.",
    citations: [
      "Cal. Civ. Code § 1946",
      "Cal. Civ. Code § 1946.7",
      "Cal. Civ. Code § 1942",
    ],
  },

  co: {
    stateCode: "CO",
    name: "Colorado",
    monthToMonthNoticeDays: 21,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early if the premises are uninhabitable, the landlord violates the lease, or the tenant is a victim of domestic violence. Tenant remains liable for rent until the landlord mitigates damages. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and a copy of a protective order or police report within 90 days of the incident.",
    additionalRequirements:
      "For month-to-month tenancies, at least 21 days' written notice is required before the end of the applicable tenancy term. For longer tenancies, notice must equal the length of the tenancy period or 21 days, whichever is longer.",
    exceptions: null,
    citations: ["Colo. Rev. Stat. § 38-12-701", "Colo. Rev. Stat. § 38-12-402"],
  },

  ct: {
    stateCode: "CT",
    name: "Connecticut",
    monthToMonthNoticeDays:
      "Reasonable notice, typically one full rental period",
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early if the landlord fails to maintain habitable conditions or if the tenant is a victim of family violence. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of family violence may terminate the lease with reasonable notice and documentation of the violence.",
    additionalRequirements:
      "For month-to-month tenancies, reasonable notice (typically one rental period) is required. Notice should be in writing.",
    exceptions: null,
    citations: ["Conn. Gen. Stat. § 47a-23", "Conn. Gen. Stat. § 47a-11e"],
  },

  de: {
    stateCode: "DE",
    name: "Delaware",
    monthToMonthNoticeDays: 60,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 60 days' notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 30 days' written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "For month-to-month tenancies, 60 days' written notice is required. For year-to-year, 60 days' notice prior to the end of the year.",
    exceptions: null,
    citations: ["Del. Code tit. 25, § 5106", "Del. Code tit. 25, § 5146"],
  },

  fl: {
    stateCode: "FL",
    name: "Florida",
    monthToMonthNoticeDays: 15,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. Tenant remains liable for rent until the landlord mitigates damages. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 30 days' written notice and documentation (protective order, police report, or certified statement from a qualified third party).",
    additionalRequirements:
      "For month-to-month tenancies, 15 days' written notice is required before the end of the monthly rental period. For quarter-to-quarter, 30 days' notice.",
    exceptions: null,
    citations: ["Fla. Stat. § 83.57", "Fla. Stat. § 83.595"],
  },

  ga: {
    stateCode: "GA",
    name: "Georgia",
    monthToMonthNoticeDays:
      "60 days (landlord); 30 days (tenant)",
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. Tenant remains liable for rent until the landlord re-rents the unit. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, landlords must give 60 days' notice; tenants must give 30 days' notice. Notice should be in writing.",
    exceptions: null,
    citations: ["Ga. Code § 44-7-7"],
  },

  hi: {
    stateCode: "HI",
    name: "Hawaii",
    monthToMonthNoticeDays:
      "45 days (landlord); 28 days (tenant)",
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 45 days' notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "For month-to-month tenancies, landlords must give 45 days' notice; tenants must give 28 days' notice. For week-to-week, 10 days' notice.",
    exceptions: null,
    citations: ["Haw. Rev. Stat. § 521-71", "Haw. Rev. Stat. § 521-80"],
  },

  id: {
    stateCode: "ID",
    name: "Idaho",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For year-to-year, 1 month's notice.",
    exceptions: null,
    citations: ["Idaho Code § 55-208"],
  },

  il: {
    stateCode: "IL",
    name: "Illinois",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. Tenant remains liable for rent until the landlord mitigates damages. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic or sexual violence may terminate the lease with 30 days' written notice and documentation (protective order, police report, or statement from a qualified professional).",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For year-to-year, 60 days' notice.",
    exceptions: null,
    citations: ["765 ILCS 905/1", "765 ILCS 750/"],
  },

  in: {
    stateCode: "IN",
    name: "Indiana",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 30 days' written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. Notice must be given before the end of the rental period.",
    exceptions: null,
    citations: ["Ind. Code § 32-31-1-1", "Ind. Code § 32-31-9-12"],
  },

  ia: {
    stateCode: "IA",
    name: "Iowa",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic abuse may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 10 days' notice.",
    exceptions: null,
    citations: ["Iowa Code § 562A.34", "Iowa Code § 562A.27"],
  },

  ks: {
    stateCode: "KS",
    name: "Kansas",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 30 days' written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["Kan. Stat. § 58-2570", "Kan. Stat. § 58-2566"],
  },

  ky: {
    stateCode: "KY",
    name: "Kentucky",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For year-to-year, 30 days' notice.",
    exceptions: null,
    citations: ["Ky. Rev. Stat. § 383.695"],
  },

  la: {
    stateCode: "LA",
    name: "Louisiana",
    monthToMonthNoticeDays:
      "10 days before end of month for month-to-month",
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement (Louisiana Civil Code). Tenant may terminate early for uninhabitable conditions or landlord breach. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 10 days' notice before the end of the month is required. For tenancies from year to year, 60 days' notice before the end of the year.",
    exceptions: null,
    citations: ["La. Civ. Code art. 2728"],
  },

  me: {
    stateCode: "ME",
    name: "Maine",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For tenancies at will, 30 days' notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence, sexual assault, or stalking may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["14 Me. Rev. Stat. § 6002", "14 Me. Rev. Stat. § 6001"],
  },

  md: {
    stateCode: "MD",
    name: "Maryland",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 3 months' notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 30 days' written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "For month-to-month tenancies in Baltimore City and some counties, 30 days' notice is required. For week-to-week, 7 days' notice. For year-to-year, 3 months' notice.",
    exceptions:
      "Baltimore City and some counties have additional local notice requirements.",
    citations: ["Md. Code, Real Prop. § 8-402", "Md. Code, Real Prop. § 8-5A-02"],
  },

  ma: {
    stateCode: "MA",
    name: "Massachusetts",
    monthToMonthNoticeDays:
      "30 days or one full rental period, whichever is longer",
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 3 months' notice or one full rental period is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' notice or one full rental period (whichever is longer) is required. Notice must be in writing.",
    exceptions: null,
    citations: ["Mass. Gen. Laws ch. 186, § 12", "Mass. Gen. Laws ch. 186, § 24"],
  },

  mi: {
    stateCode: "MI",
    name: "Michigan",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 1 month's notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and a copy of a personal protection order or police report.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For year-to-year, 1 month's notice.",
    exceptions: null,
    citations: ["Mich. Comp. Laws § 554.134", "Mich. Comp. Laws § 554.601b"],
  },

  mn: {
    stateCode: "MN",
    name: "Minnesota",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 14 days' written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "For month-to-month tenancies, notice must be given at least 30 days before the end of the rental period. For week-to-week, 7 days' notice.",
    exceptions: null,
    citations: ["Minn. Stat. § 504B.135", "Minn. Stat. § 504B.206"],
  },

  ms: {
    stateCode: "MS",
    name: "Mississippi",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["Miss. Code § 89-8-19"],
  },

  mo: {
    stateCode: "MO",
    name: "Missouri",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. For year-to-year tenancies, 1 month's notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For year-to-year, 1 month's notice. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["Mo. Rev. Stat. § 441.060"],
  },

  mt: {
    stateCode: "MT",
    name: "Montana",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 1 month's notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For week-to-week, 7 days' notice.",
    exceptions: null,
    citations: ["Mont. Code § 70-24-441"],
  },

  ne: {
    stateCode: "NE",
    name: "Nebraska",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. For year-to-year tenancies, 1 month's notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For year-to-year, 1 month's notice.",
    exceptions: null,
    citations: ["Neb. Rev. Stat. § 76-1437"],
  },

  nv: {
    stateCode: "NV",
    name: "Nevada",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 30 days' notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 30 days' written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For week-to-week, 7 days' notice.",
    exceptions: null,
    citations: ["Nev. Rev. Stat. § 40.251", "Nev. Rev. Stat. § 118A.510"],
  },

  nh: {
    stateCode: "NH",
    name: "New Hampshire",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For week-to-week, 7 days' notice.",
    exceptions: null,
    citations: ["N.H. Rev. Stat. § 540:2"],
  },

  nj: {
    stateCode: "NJ",
    name: "New Jersey",
    monthToMonthNoticeDays:
      "1 month for month-to-month; 3 months for year-to-year",
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 3 months' notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 1 month's written notice is required. For year-to-year, 3 months' notice. Some municipalities have additional local requirements.",
    exceptions:
      "Rent-controlled and rent-stabilized units may have additional restrictions on lease termination.",
    citations: ["N.J.S.A. 2A:18-56", "N.J.S.A. 46:8-9.6"],
  },

  nm: {
    stateCode: "NM",
    name: "New Mexico",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 30 days' notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["N.M. Stat. § 47-8-37", "N.M. Stat. § 47-8-46"],
  },

  ny: {
    stateCode: "NY",
    name: "New York",
    monthToMonthNoticeDays:
      "30 days for month-to-month outside NYC (1 month); 90 days for rent-stabilized tenants in NYC",
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies outside NYC, 1 month's notice is required. NYC rent-stabilized tenants have additional protections. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies outside NYC, 30 days' notice is required. In NYC, rent-stabilized tenants may have 90-day notice requirements for certain terminations. Notice must be in writing.",
    exceptions:
      "Rent-controlled and rent-stabilized units in NYC have additional restrictions and notice requirements.",
    citations: [
      "N.Y. Real Prop. Law § 232-b",
      "N.Y. Real Prop. Law § 227-c",
    ],
  },

  nc: {
    stateCode: "NC",
    name: "North Carolina",
    monthToMonthNoticeDays:
      "7 days (week-to-week); 30 days (month-to-month)",
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 30 days' written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "For week-to-week tenancies, 7 days' notice is required. For month-to-month, 30 days' notice. For year-to-year, 1 month's notice.",
    exceptions: null,
    citations: ["N.C. Gen. Stat. § 42-14", "N.C. Gen. Stat. § 42-45.1"],
  },

  nd: {
    stateCode: "ND",
    name: "North Dakota",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. For year-to-year tenancies, 1 month's notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["N.D. Cent. Code § 47-16-15"],
  },

  oh: {
    stateCode: "OH",
    name: "Ohio",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For week-to-week, 7 days' notice.",
    exceptions: null,
    citations: ["Ohio Rev. Code § 5321.17", "Ohio Rev. Code § 5321.23"],
  },

  ok: {
    stateCode: "OK",
    name: "Oklahoma",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. For year-to-year tenancies, 1 month's notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["Okla. Stat. tit. 41, § 111"],
  },

  or: {
    stateCode: "OR",
    name: "Oregon",
    monthToMonthNoticeDays:
      "30 days (tenant in unit less than 1 year); 60 days (tenant in unit 1 year or more)",
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 30 days' notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence, sexual assault, or stalking may terminate the lease with 14 days' written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' notice (less than 1 year) or 60 days' notice (1 year or more). For week-to-week, 10 days' notice. Notice must specify the termination date.",
    exceptions: null,
    citations: ["Or. Rev. Stat. § 90.427", "Or. Rev. Stat. § 90.453"],
  },

  pa: {
    stateCode: "PA",
    name: "Pennsylvania",
    monthToMonthNoticeDays:
      "15 days (tenancy less than 1 year); 30 days (tenancy 1 year or more)",
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, 1 month's notice is required (3 months in some cases). Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with 30 days' written notice and a copy of a protection order or police report.",
    additionalRequirements:
      "For month-to-month tenancies, 15 days' notice if tenancy is less than 1 year; 30 days' notice if 1 year or more. For year-to-year, 1 month's notice.",
    exceptions: null,
    citations: [
      "68 Pa. Cons. Stat. § 250.501",
      "68 Pa. Cons. Stat. § 250.505a",
    ],
  },

  ri: {
    stateCode: "RI",
    name: "Rhode Island",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For week-to-week, 10 days' notice.",
    exceptions: null,
    citations: ["R.I. Gen. Laws § 34-18-37", "R.I. Gen. Laws § 34-37-2.3"],
  },

  sc: {
    stateCode: "SC",
    name: "South Carolina",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For week-to-week, 7 days' notice.",
    exceptions: null,
    citations: ["S.C. Code § 27-40-770"],
  },

  sd: {
    stateCode: "SD",
    name: "South Dakota",
    monthToMonthNoticeDays:
      "30 days for month-to-month; 1 month for year-to-year",
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. For year-to-year tenancies, 1 month's notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["S.D. Codified Laws § 43-32-13"],
  },

  tn: {
    stateCode: "TN",
    name: "Tennessee",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["Tenn. Code § 66-28-512", "Tenn. Code § 66-28-507"],
  },

  tx: {
    stateCode: "TX",
    name: "Texas",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. Tenant remains liable for rent until the landlord mitigates damages. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence or sexual assault may terminate the lease with 30 days' written notice and documentation (protective order, police report, or medical record).",
    additionalRequirements:
      "For month-to-month tenancies, notice must be given at least 30 days before the end of the rental period. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["Tex. Prop. Code § 91.001", "Tex. Prop. Code § 92.016"],
  },

  ut: {
    stateCode: "UT",
    name: "Utah",
    monthToMonthNoticeDays: 15,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 15 days' written notice is required before the end of the rental period. For tenancies at will, 5 days' notice.",
    exceptions: null,
    citations: ["Utah Code § 78B-6-802", "Utah Code § 57-22-5.1"],
  },

  vt: {
    stateCode: "VT",
    name: "Vermont",
    monthToMonthNoticeDays:
      "30 days for month-to-month (21 days if no written lease)",
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' notice if there is a written lease; 21 days' notice if no written lease. For tenancies at will, 21 days' notice.",
    exceptions: null,
    citations: ["9 V.S.A. § 4467"],
  },

  va: {
    stateCode: "VA",
    name: "Virginia",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of family abuse may terminate the lease with 30 days' written notice and a copy of a protective order or police report.",
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For tenancies at will, 30 days' notice.",
    exceptions: null,
    citations: ["Va. Code § 55.1-1253", "Va. Code § 55.1-1236"],
  },

  wa: {
    stateCode: "WA",
    name: "Washington",
    monthToMonthNoticeDays: 20,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic violence, sexual assault, or stalking may terminate the lease with written notice and documentation (protective order, police report, or statement from qualified professional).",
    additionalRequirements:
      "For month-to-month tenancies, 20 days' written notice is required before the end of the rental period. For tenancies at will, 20 days' notice.",
    exceptions: null,
    citations: ["Wash. Rev. Code § 59.18.200", "Wash. Rev. Code § 59.18.352"],
  },

  wv: {
    stateCode: "WV",
    name: "West Virginia",
    monthToMonthNoticeDays: 30,
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. For year-to-year tenancies, 3 months' notice is required. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "For month-to-month tenancies, 30 days' written notice is required. For year-to-year, 3 months' notice.",
    exceptions: null,
    citations: ["W. Va. Code § 37-6-5"],
  },

  wi: {
    stateCode: "WI",
    name: "Wisconsin",
    monthToMonthNoticeDays: 28,
    fixedTermEarlyTerminationRules:
      "Tenant may terminate early for uninhabitable conditions, landlord breach, or domestic violence. For year-to-year tenancies, notice must be given at least 1 month before the end of the term. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections:
      "Victims of domestic abuse may terminate the lease with written notice and documentation.",
    additionalRequirements:
      "For month-to-month tenancies, 28 days' written notice is required. For tenancies at will, 28 days' notice.",
    exceptions: null,
    citations: ["Wis. Stat. § 704.19", "Wis. Stat. § 704.16"],
  },

  wy: {
    stateCode: "WY",
    name: "Wyoming",
    monthToMonthNoticeDays:
      "No statutory notice period; governed by lease terms or reasonable notice",
    fixedTermEarlyTerminationRules:
      "Early termination is governed by the lease agreement. Tenant may terminate early for uninhabitable conditions or landlord breach. Military personnel may terminate under federal SCRA.",
    domesticViolenceProtections: null,
    additionalRequirements:
      "Wyoming does not specify a statutory notice period for month-to-month tenancies. Notice requirements are typically governed by the lease agreement. If no lease exists, reasonable notice (typically 30 days) is recommended.",
    exceptions: null,
    citations: ["Wyo. Stat. § 1-21-1202"],
  },
};
