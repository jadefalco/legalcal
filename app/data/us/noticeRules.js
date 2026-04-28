// app/data/us/noticeRules.js

export const noticeRules = {
  al: {
    nonpayment: null,
    curableViolation: null,
    unconditionalQuit: null,
    monthToMonth: null,
    endOfLease: "",
    dvProtections: "",
    deliveryMethods: "",
    noticeContent: "",
    exceptions: "",
    citations: []
  },

  ak: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  az: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  ar: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

 ca: {
  nonpayment: 3,
  curableViolation: 3,
  unconditionalQuit: 3,
  monthToMonth: 30,
  endOfLease: "30 days if tenant lived there under 1 year, 60 days if 1 year or more.",
  dvProtections: "Tenant may request lock change within 24 hours with documentation.",
  deliveryMethods: "Personal delivery, substituted service, or posting plus mailing.",
  noticeContent: "Must state the reason, deadline, and required action (pay, fix, or move).",
  exceptions: "Local rent control may require longer notice; some properties may require 60 or 90 days.",
  citations: [
    "Cal. Code Civ. Proc. § 1161",
    "Cal. Civ. Code § 1946",
    "California Courts Self‑Help Guide"
  ]
},

  co: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  ct: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  de: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

fl: {
  nonpayment: 3, // 3‑Day Notice to Pay Rent or Quit
  curableViolation: 7, // 7‑Day Notice to Cure (fix the violation)
  unconditionalQuit: 7, // 7‑Day Notice to Terminate (serious violations)
  monthToMonth: 15, // 15‑Day Notice to terminate month‑to‑month tenancy
  endOfLease: "15‑day written notice before the next rental period for month‑to‑month; 7‑day for weekly.",
  dvProtections: "Florida law allows early termination for victims of domestic violence with documentation.",
  deliveryMethods: "Personal delivery, posting, or mailing; must comply with Florida Statutes.",
  noticeContent: "Must state the reason, the deadline, and whether the tenant may cure the violation.",
  exceptions: "CARES Act or subsidized housing may require longer notice; serious violations allow immediate termination.",
  citations: [
    "Florida Statutes § 83.56",
    "Florida Statutes § 83.57",
    "Florida Statutes § 83.60",
    "Florida Eviction Notice Requirements (3‑Day, 7‑Day, 15‑Day)"
  ]

},
ga: {
  nonpayment: "No statutory notice period; landlord must make a demand for possession (often immediate).",
  curableViolation: "No statutory cure period; landlord may demand possession immediately.",
  unconditionalQuit: "Georgia does not require a separate unconditional quit notice.",
  monthToMonth: 60, // landlord must give 60 days to terminate
  endOfLease: "Tenant must give 30 days’ notice; landlord must give 60 days’ notice (O.C.G.A. § 44‑7‑7).",
  dvProtections: "Limited protections; subsidized housing may offer additional rights.",
  deliveryMethods: "Personal delivery, posting on the door, or certified mail.",
  noticeContent: "Demand for possession must state that the tenant must vacate or face dispossessory action.",
  exceptions: "Subsidized housing, public housing authorities, and some local courts may require a 3‑day grace period.",
  citations: [
    "O.C.G.A. § 44‑7‑50",
    "O.C.G.A. § 44‑7‑7",
    "Georgia Legal Aid — What to Know About Evictions"
  ]
},
  hi: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  id: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

il: {
  nonpayment: 5, // 5‑Day Notice for unpaid rent
  curableViolation: 10, // 10‑Day Notice to comply with lease terms
  unconditionalQuit: 10, // 10‑Day Notice for criminal activity or non‑curable violations
  monthToMonth: 30, // 30‑Day Notice for non‑renewal or end of lease
  endOfLease: "30‑day written notice required for non‑renewal or termination of periodic tenancy.",
  dvProtections: "Illinois law allows early lease termination for domestic violence survivors under the Safe Homes Act.",
  deliveryMethods: "Personal service, certified/registered mail, or substitute service as allowed by law.",
  noticeContent: "Must state the reason, the deadline, and that eviction will be filed if the tenant does not comply.",
  exceptions: "Local laws (Chicago CRLTO, Cook County RTLO) may require longer notice periods; Cook County requires filing within 30 days of a 10‑day notice.",
  citations: [
    "Illinois Forcible Entry and Detainer Act (735 ILCS 5/9‑209, 5/9‑210, 5/9‑207)",
    "Illinois Legal Aid — Eviction Notices (5‑Day, 10‑Day, 30‑Day)"
  ]
},
  in: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  ia: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  ks: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  ky: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  la: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  me: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  md: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  ma: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

mi: {
  nonpayment: 7, // 7‑Day Demand for Possession (nonpayment)
  curableViolation: 30, // 30‑Day Notice to Quit for lease violations (unless lease states otherwise)
  unconditionalQuit: "24‑hour notice for illegal drug activity; 7‑day notice for health hazard or property damage.",
  monthToMonth: 30, // 30‑Day Notice to Quit to end a month‑to‑month tenancy
  endOfLease: "30‑day notice required unless lease specifies otherwise; no notice required in some holdover situations.",
  dvProtections: "Michigan law provides additional protections in subsidized housing and mobile home parks.",
  deliveryMethods: "Personal delivery, leaving with responsible household member, mailing, or email (with written consent and confirmation).",
  noticeContent: "Must state reason, cure/vacate deadline, property description, landlord address, and date of notice.",
  exceptions: "No notice required for squatting/forced entry; subsidized housing and mobile home parks have special rules.",
  citations: [
    "MCL 554.134",
    "Michigan Legal Help — Eviction Process",
    "Michigan Court Rules on Service of Notices"
  ]
},
  mn: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  ms: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  mo: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  mt: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  ne: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  nv: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  nh: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

nj: {
  nonpayment: 0, // No notice required for nonpayment (2A:18‑61.2)
  curableViolation: "1‑month Notice to Quit after Notice to Cease for rule violations or substantial breach.",
  unconditionalQuit: "3‑day notice for disorderly conduct, property damage, or grounds under m–r.",
  monthToMonth: "1‑month Notice to Quit for ending tenancy without cause (if allowed under Anti‑Eviction Act).",
  endOfLease: "Varies: 1 month (lease changes), 2 months (subsection l), 3 months (subsection g), 18 months (retirement), 3 years (subsection k).",
  dvProtections: "Additional protections apply in subsidized housing; federal rules may override state notice periods.",
  deliveryMethods: "Personal service, leaving with family member 14+, certified mail; if unclaimed, send by regular mail.",
  noticeContent: "Must specify in detail the cause for termination and comply with Anti‑Eviction Act requirements.",
  exceptions: "Public housing follows federal notice rules; no notice required for nonpayment; must wait for lease expiration for subsections h, l, k.",
  citations: [
    "N.J.S.A. 2A:18‑61.2",
    "New Jersey Anti‑Eviction Act"
  ]
},
  nm: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

ny: {
  nonpayment: 14, // 14‑Day Rent Demand (RPAPL 711)
  curableViolation: 10, // 10‑Day Notice to Cure
  unconditionalQuit: 30, // 30‑Day Notice of Termination after failure to cure
  monthToMonth: "30/60/90 days depending on length of occupancy",
  endOfLease: "30 days if tenant lived <1 year, 60 days if 1–2 years, 90 days if >2 years (RPL § 226‑c).",
  dvProtections: "NY law allows early lease termination for domestic violence victims with documentation.",
  deliveryMethods: "Personal delivery, substituted service, or conspicuous place + mail (RPAPL 735).",
  noticeContent: "Must state the violation, cure period (if any), termination date, and consequences of failing to comply.",
  exceptions: "Rent‑stabilized and rent‑controlled units have additional notice requirements; NYC has enhanced protections.",
  citations: [
    "RPAPL § 711(2)",
    "RPAPL § 735",
    "RPL § 226‑c",
    "NYC Housing Court — Notice to Cure / Notice of Termination / Notice to Quit"
  ]
},
  nc: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  nd: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

oh: {
  nonpayment: 3, // 3‑Day Notice to Leave the Premises
  curableViolation: 3, // Ohio uses the same 3‑day notice for lease violations
  unconditionalQuit: 3, // No separate unconditional quit; all evictions start with a 3‑day notice
  monthToMonth: 30, // 30‑day notice to terminate a month‑to‑month tenancy (outside eviction context)
  endOfLease: "Landlord must give 30‑day notice to end a month‑to‑month tenancy; fixed‑term leases end automatically.",
  dvProtections: "Ohio law allows early lease termination for domestic violence victims under certain conditions.",
  deliveryMethods: "Personal delivery, leaving at the premises, or posting on the door; certified mail is commonly used.",
  noticeContent: "Must include statutory warning: 'You are being asked to leave the premises… seek legal assistance.'",
  exceptions: "Different rules apply in subsidized housing and mobile home parks; federal programs may require longer notice.",
  citations: [
    "Ohio Revised Code § 1923.04",
    "Ohio Legal Help — Eviction Process Overview"
  ]
},
  ok: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  or: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

pa: {
  nonpayment: 10, // 10‑day Notice to Quit for unpaid rent
  curableViolation: "15 days if lease ≤ 1 year; 30 days if lease > 1 year.", 
  unconditionalQuit: "Varies; drug‑related activity may allow immediate filing.",
  monthToMonth: "15 days if tenancy ≤ 1 year; 30 days if > 1 year.",
  endOfLease: "15‑day notice for terms ≤ 1 year; 30‑day notice for terms > 1 year.",
  dvProtections: "Additional protections may apply in subsidized housing programs.",
  deliveryMethods: "Personal service or conspicuous posting on the property.",
  noticeContent: "Must state reason, deadline, and that eviction will be filed if tenant does not comply.",
  exceptions: "Leases may shorten or waive notice; different rules apply in Philadelphia, mobile home parks, and subsidized housing.",
  citations: [
    "68 P.S. § 250.501",
    "PA Landlord‑Tenant Act",
    "Walters & Galloway — Eviction Notice Rules in PA",
    "Strassburger McKenna — PA Notice to Quit Guidance"
  ]
},
  ri: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  sc: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  sd: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  tn: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

tx: {
  nonpayment: 3, 
  curableViolation: 3, 
  unconditionalQuit: 3, 
  monthToMonth: 30, 
  endOfLease: "Notice depends on lease terms; many leases require only 1 day.",
  dvProtections: "Tenant may terminate early with documentation under Texas Property Code.",
  deliveryMethods: "Hand delivery, to someone 16+, mail, or posting on inside of front door; email allowed if lease permits.",
  noticeContent: "Must state whether it's a Notice to Pay Rent or Vacate or a Notice to Vacate, and the deadline before filing.",
  exceptions: "CARES Act or subsidized housing may require 30-day notice before filing.",
  citations: [
    "Texas Property Code § 24.005",
    "TexasLawHelp.org — Eviction Notices and Procedures"
  ]
},
  ut: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  vt: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  va: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  wa: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  wv: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  wi: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] },

  wy: { nonpayment: null, curableViolation: null, unconditionalQuit: null, monthToMonth: null, endOfLease: "", dvProtections: "", deliveryMethods: "", noticeContent: "", exceptions: "", citations: [] }
};