// app/data/us/rentIncreaseRules.js

/** @type {import("../../types/RentIncreaseRules").RentIncreaseRulesMap} */
export const rentIncreaseRules = {
  al: {
    stateCode: "AL",
    name: "Alabama",
    noticePeriodDays: "No statutory notice period; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must comply with any notice period specified in the written lease agreement.",
    exceptions: "",
    citations: ["Ala. Code § 35-9A-161"],
  },

  ak: {
    stateCode: "AK",
    name: "Alaska",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as specified in the rental agreement.",
    exceptions: "",
    citations: ["Alaska Stat. § 34.03.290"],
  },

  az: {
    stateCode: "AZ",
    name: "Arizona",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "For month-to-month tenancies, landlord must provide at least 30 days' notice before the end of the rental period for any change in terms.",
    exceptions: "",
    citations: ["Ariz. Rev. Stat. § 33-1375"],
  },

  ar: {
    stateCode: "AR",
    name: "Arkansas",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must give notice as required by the lease agreement.",
    exceptions: "",
    citations: ["Ark. Code § 18-17-704"],
  },

  ca: {
    stateCode: "CA",
    name: "California",
    noticePeriodDays: 30,
    rentControl:
      "Local rent control ordinances apply in many cities. Statewide rent cap (AB 1482) limits increases to 5% + CPI or 10%, whichever is lower, for qualifying properties.",
    additionalRequirements:
      "30 days' notice for increases ≤10% in any 12-month period. 60 days' notice for increases >10% in any 12-month period. 90 days' notice required in some jurisdictions for increases above certain thresholds.",
    exceptions:
      "Properties built within the last 15 years and single-family homes owned by individuals (not corporations) are exempt from statewide rent cap. Properties already subject to local rent control may have stricter limits.",
    citations: [
      "Cal. Civ. Code § 827",
      "Cal. Gov. Code § 65863.10 (AB 1482)",
      "Cal. Civ. Code § 1947.12",
    ],
  },

  co: {
    stateCode: "CO",
    name: "Colorado",
    noticePeriodDays: 21,
    rentControl: false,
    additionalRequirements:
      "21 days' notice for month-to-month tenancies. For longer tenancies, notice must equal the length of the tenancy period or 21 days, whichever is longer. Notice must be in writing.",
    exceptions:
      "Mobile home park tenants may have different notice requirements.",
    citations: [
      "Colo. Rev. Stat. § 38-12-701",
      "Colo. Rev. Stat. § 38-12-102",
    ],
  },

  ct: {
    stateCode: "CT",
    name: "Connecticut",
    noticePeriodDays: "No statutory notice period for private residential rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "For month-to-month tenancies, landlord must provide reasonable notice of any change in terms. Some municipalities may have local ordinances.",
    exceptions: "",
    citations: ["Conn. Gen. Stat. § 47a-23"],
  },

  de: {
    stateCode: "DE",
    name: "Delaware",
    noticePeriodDays: 60,
    rentControl: false,
    additionalRequirements:
      "60 days' written notice required for any rent increase on a month-to-month tenancy. Notice must specify the amount of the increase and the date it takes effect.",
    exceptions:
      "Does not apply to tenancies with a fixed-term lease unless the lease specifically allows for increases with 60 days' notice.",
    citations: ["Del. Code tit. 25, § 5107"],
  },

  fl: {
    stateCode: "FL",
    name: "Florida",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "For month-to-month tenancies, landlord must provide notice at least 15 days before the end of the monthly rental period for any change in terms. Some local jurisdictions may have additional requirements.",
    exceptions: "",
    citations: ["Fla. Stat. § 83.57"],
  },

  ga: {
    stateCode: "GA",
    name: "Georgia",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must comply with notice requirements set forth in the lease agreement.",
    exceptions: "",
    citations: ["O.C.G.A. § 44-7-7"],
  },

  hi: {
    stateCode: "HI",
    name: "Hawaii",
    noticePeriodDays: 45,
    rentControl: false,
    additionalRequirements:
      "45 days' written notice required for month-to-month tenancies. 15 days' notice for week-to-week tenancies. Notice must state the amount of the new rent and the date it becomes effective.",
    exceptions:
      "Does not apply if the rental agreement specifies a different notice period.",
    citations: ["Haw. Rev. Stat. § 521-21"],
  },

  id: {
    stateCode: "ID",
    name: "Idaho",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as specified in the rental agreement. For month-to-month tenancies, standard termination notice is 30 days.",
    exceptions: "",
    citations: ["Idaho Code § 55-208"],
  },

  il: {
    stateCode: "IL",
    name: "Illinois",
    noticePeriodDays: "No statewide statutory notice period for rent increases; governed by lease terms.",
    rentControl:
      "Cook County and the City of Chicago have rent control-related ordinances that may limit rent increases in certain properties.",
    additionalRequirements:
      "Local jurisdictions may impose additional notice requirements. Chicago requires 30 days' notice for rent increases under certain conditions.",
    exceptions: "",
    citations: [
      "765 ILCS 705/1",
      "Chicago Residential Landlord and Tenant Ordinance (RLTO) § 5-12-080",
    ],
  },

  in: {
    stateCode: "IN",
    name: "Indiana",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as required by the lease agreement.",
    exceptions: "",
    citations: ["Ind. Code § 32-31-1-8"],
  },

  ia: {
    stateCode: "IA",
    name: "Iowa",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "For month-to-month tenancies, landlord must provide at least 30 days' notice for any change in terms.",
    exceptions: "",
    citations: ["Iowa Code § 562A.13"],
  },

  ks: {
    stateCode: "KS",
    name: "Kansas",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must comply with notice requirements specified in the lease.",
    exceptions: "",
    citations: ["Kan. Stat. § 58-2570"],
  },

  ky: {
    stateCode: "KY",
    name: "Kentucky",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "For month-to-month tenancies, landlord must provide 30 days' notice for any change in terms.",
    exceptions: "",
    citations: ["Ky. Rev. Stat. § 383.695"],
  },

  la: {
    stateCode: "LA",
    name: "Louisiana",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Louisiana follows civil law principles. Lease terms govern rent increases unless the lease is silent, in which case reasonable notice may be required.",
    exceptions: "",
    citations: ["La. Civ. Code art. 2682"],
  },

  me: {
    stateCode: "ME",
    name: "Maine",
    noticePeriodDays: 45,
    rentControl: false,
    additionalRequirements:
      "45 days' written notice required for any rent increase on a month-to-month tenancy. Notice must state the new rent amount and effective date.",
    exceptions:
      "Does not apply to tenancies at will where the parties have agreed to a different notice period in writing.",
    citations: ["Me. Rev. Stat. tit. 14, § 6015"],
  },

  md: {
    stateCode: "MD",
    name: "Maryland",
    noticePeriodDays: "No statewide statutory notice period for rent increases; governed by lease terms.",
    rentControl:
      "Montgomery County and other local jurisdictions may have rent stabilization programs.",
    additionalRequirements:
      "For month-to-month tenancies in Baltimore, 30 days' notice may be required. Local jurisdictions may impose additional requirements.",
    exceptions: "",
    citations: ["Md. Code Real Prop., § 8-402"],
  },

  ma: {
    stateCode: "MA",
    name: "Massachusetts",
    noticePeriodDays: 30,
    rentControl:
      "Local rent control is prohibited by state law, but some municipalities have rent stabilization or just-cause eviction ordinances.",
    additionalRequirements:
      "30 days' notice or one full rental period, whichever is longer, required for any rent increase on a tenancy at will.",
    exceptions:
      "Does not apply to fixed-term leases unless the lease specifically allows for increases with proper notice.",
    citations: ["Mass. Gen. Laws ch. 186, § 12"],
  },

  mi: {
    stateCode: "MI",
    name: "Michigan",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as specified in the lease agreement. For month-to-month tenancies, standard notice for changes in terms is one rental period.",
    exceptions: "",
    citations: ["MCL 554.134"],
  },

  mn: {
    stateCode: "MN",
    name: "Minnesota",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "For month-to-month tenancies, landlord must provide written notice at least one full rental period before any increase takes effect.",
    exceptions: "",
    citations: ["Minn. Stat. § 504B.135"],
  },

  ms: {
    stateCode: "MS",
    name: "Mississippi",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must comply with notice requirements in the lease agreement.",
    exceptions: "",
    citations: ["Miss. Code § 89-8-19"],
  },

  mo: {
    stateCode: "MO",
    name: "Missouri",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "For month-to-month tenancies, landlord must provide one rental period's notice for any change in terms.",
    exceptions: "",
    citations: ["Mo. Rev. Stat. § 441.060"],
  },

  mt: {
    stateCode: "MT",
    name: "Montana",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as required by the lease agreement.",
    exceptions: "",
    citations: ["Mont. Code § 70-24-426"],
  },

  ne: {
    stateCode: "NE",
    name: "Nebraska",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must comply with notice requirements in the lease agreement.",
    exceptions: "",
    citations: ["Neb. Rev. Stat. § 76-1437"],
  },

  nv: {
    stateCode: "NV",
    name: "Nevada",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "For periodic tenancies, landlord must provide notice as specified in the rental agreement. Clark County and Las Vegas may have additional requirements.",
    exceptions: "",
    citations: ["Nev. Rev. Stat. § 118A.300"],
  },

  nh: {
    stateCode: "NH",
    name: "New Hampshire",
    noticePeriodDays: 30,
    rentControl: false,
    additionalRequirements:
      "30 days' written notice required for any rent increase on a month-to-month tenancy. Notice must state the new rent and effective date.",
    exceptions:
      "Does not apply if the lease specifies a different notice period or if the tenancy is for a fixed term.",
    citations: ["N.H. Rev. Stat. § 540:2"],
  },

  nj: {
    stateCode: "NJ",
    name: "New Jersey",
    noticePeriodDays: 30,
    rentControl:
      "Local rent control ordinances exist in many municipalities. Tenant protection laws limit rent increases in certain circumstances.",
    additionalRequirements:
      "30 days' written notice required for month-to-month tenancies. For yearly tenancies, notice must be given at least one month before the end of the term. Some municipalities require 60 or 90 days' notice.",
    exceptions:
      "Does not apply to fixed-term leases unless the lease specifically allows for increases with proper notice. Local rent control ordinances may impose additional restrictions.",
    citations: [
      "N.J.S.A. 2A:18-56",
      "N.J.S.A. 2A:18-61.2",
      "Anti-Eviction Act",
    ],
  },

  nm: {
    stateCode: "NM",
    name: "New Mexico",
    noticePeriodDays: 30,
    rentControl: false,
    additionalRequirements:
      "30 days' written notice required for any rent increase on a month-to-month tenancy. Notice must specify the new rent amount and effective date.",
    exceptions:
      "Does not apply to fixed-term leases or if the lease specifies a different notice period.",
    citations: ["N.M. Stat. § 47-8-15(F)"],
  },

  ny: {
    stateCode: "NY",
    name: "New York",
    noticePeriodDays: 30,
    rentControl:
      "NYC, Nassau, Westchester, and other municipalities have rent stabilization and rent control programs. Outside regulated units, there is no statewide rent control.",
    additionalRequirements:
      "30 days' notice for month-to-month tenancies. For tenants who have occupied for 1-2 years, 60 days' notice. For tenants who have occupied for 2+ years, 90 days' notice. These notice requirements apply to all rent increases.",
    exceptions:
      "Rent-stabilized and rent-controlled units have strict limits on rent increases set by local rent guidelines boards. Does not apply to fixed-term leases during the lease term.",
    citations: [
      "N.Y. Real Prop. Law § 226-C",
      "NYC Rent Stabilization Code",
      "NYC Rent Control Regulations",
    ],
  },

  nc: {
    stateCode: "NC",
    name: "North Carolina",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as specified in the lease agreement. For month-to-month tenancies, standard notice for changes is typically one rental period.",
    exceptions: "",
    citations: ["N.C. Gen. Stat. § 42-14"],
  },

  nd: {
    stateCode: "ND",
    name: "North Dakota",
    noticePeriodDays: 30,
    rentControl: false,
    additionalRequirements:
      "30 days' written notice required for any rent increase on a month-to-month tenancy.",
    exceptions:
      "Does not apply to fixed-term leases or if the lease specifies a different notice period.",
    citations: ["N.D. Cent. Code § 47-16-07"],
  },

  oh: {
    stateCode: "OH",
    name: "Ohio",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must comply with notice requirements in the lease agreement. For month-to-month tenancies, standard notice for changes is 30 days.",
    exceptions: "",
    citations: ["Ohio Rev. Code § 5321.17"],
  },

  ok: {
    stateCode: "OK",
    name: "Oklahoma",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as required by the lease agreement.",
    exceptions: "",
    citations: ["Okla. Stat. tit. 41, § 111"],
  },

  or: {
    stateCode: "OR",
    name: "Oregon",
    noticePeriodDays: 90,
    rentControl:
      "Statewide rent control limits increases to 7% + CPI annually for qualifying properties. Local jurisdictions may have additional restrictions.",
    additionalRequirements:
      "90 days' written notice required for any rent increase after the first year of tenancy. For increases ≤5% during the first year, 30 days' notice. For increases >5% during the first year, 90 days' notice.",
    exceptions:
      "Properties built within the last 15 years and certain subsidized housing are exempt from statewide rent control. Fixed-term leases may have different rules.",
    citations: [
      "Or. Rev. Stat. § 90.323",
      "Or. Rev. Stat. § 90.600 (SB 608)",
    ],
  },

  pa: {
    stateCode: "PA",
    name: "Pennsylvania",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl:
      "Some local jurisdictions, including Philadelphia, have rent control or rent stabilization ordinances.",
    additionalRequirements:
      "Landlord must comply with notice requirements in the lease agreement. Philadelphia requires 60 days' notice for certain rent increases.",
    exceptions: "",
    citations: ["68 P.S. § 250.501"],
  },

  ri: {
    stateCode: "RI",
    name: "Rhode Island",
    noticePeriodDays: 30,
    rentControl: false,
    additionalRequirements:
      "30 days' written notice required for any rent increase on a month-to-month tenancy.",
    exceptions:
      "Does not apply to fixed-term leases during the lease term or if the lease specifies a different notice period.",
    citations: ["R.I. Gen. Laws § 34-18-16.1"],
  },

  sc: {
    stateCode: "SC",
    name: "South Carolina",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as required by the lease agreement.",
    exceptions: "",
    citations: ["S.C. Code § 27-40-770"],
  },

  sd: {
    stateCode: "SD",
    name: "South Dakota",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must comply with notice requirements in the lease agreement.",
    exceptions: "",
    citations: ["S.D. Codified Laws § 43-32-13"],
  },

  tn: {
    stateCode: "TN",
    name: "Tennessee",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as required by the lease agreement. For month-to-month tenancies, standard notice for changes is 30 days.",
    exceptions: "",
    citations: ["Tenn. Code § 66-28-512"],
  },

  tx: {
    stateCode: "TX",
    name: "Texas",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as required by the lease agreement. For month-to-month tenancies, landlord must give at least one rental period's notice for any change in terms.",
    exceptions: "",
    citations: ["Tex. Prop. Code § 91.001"],
  },

  ut: {
    stateCode: "UT",
    name: "Utah",
    noticePeriodDays: 15,
    rentControl: false,
    additionalRequirements:
      "15 days' written notice required for any rent increase on a month-to-month tenancy. Notice must state the new rent amount and effective date.",
    exceptions:
      "Does not apply to fixed-term leases or if the lease specifies a different notice period.",
    citations: ["Utah Code § 57-17-3"],
  },

  vt: {
    stateCode: "VT",
    name: "Vermont",
    noticePeriodDays: 60,
    rentControl: false,
    additionalRequirements:
      "60 days' written notice required for any rent increase. For tenancies of 2+ years, 90 days' notice may be required in some circumstances.",
    exceptions:
      "Does not apply to fixed-term leases during the lease term or if the lease specifies a different notice period.",
    citations: ["Vt. Stat. tit. 9, § 4455"],
  },

  va: {
    stateCode: "VA",
    name: "Virginia",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must comply with notice requirements in the lease agreement. For month-to-month tenancies, standard notice for changes is 30 days.",
    exceptions: "",
    citations: ["Va. Code § 55.1-1253"],
  },

  wa: {
    stateCode: "WA",
    name: "Washington",
    noticePeriodDays: 60,
    rentControl:
      "Local rent control is prohibited by state law, but some cities have just-cause eviction and relocation assistance ordinances.",
    additionalRequirements:
      "60 days' written notice required for any rent increase on a month-to-month tenancy. Notice must state the new rent amount and effective date.",
    exceptions:
      "Does not apply to fixed-term leases during the lease term or if the lease specifies a different notice period. Subsidized housing may have different rules.",
    citations: ["Wash. Rev. Code § 59.18.140"],
  },

  wv: {
    stateCode: "WV",
    name: "West Virginia",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as required by the lease agreement.",
    exceptions: "",
    citations: ["W. Va. Code § 37-6-5"],
  },

  wi: {
    stateCode: "WI",
    name: "Wisconsin",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must comply with notice requirements in the lease agreement. For month-to-month tenancies, standard notice for changes is 28 days.",
    exceptions: "",
    citations: ["Wis. Stat. § 704.19"],
  },

  wy: {
    stateCode: "WY",
    name: "Wyoming",
    noticePeriodDays: "No statutory notice period for rent increases; governed by lease terms.",
    rentControl: false,
    additionalRequirements:
      "Landlord must provide notice as required by the lease agreement.",
    exceptions: "",
    citations: ["Wyo. Stat. § 1-21-1202"],
  },
};
