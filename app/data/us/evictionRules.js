export const evictionRules = {
  ca: {
    noticeForNonpayment: 3,
    noticeForLeaseViolation: 3,
    courtFilingTime: "Varies by county",
    answerDeadline: 5,
    hearingTimeline: "20–30 days after filing",
    lockoutAllowedAfter: "Sheriff only, after court judgment",
    citations: [
      "California Code of Civil Procedure § 1161",
      "California Code of Civil Procedure § 1167"
    ]
  },

  tx: {
    noticeForNonpayment: 3,
    noticeForLeaseViolation: 3,
    courtFilingTime: "Immediately after notice expires",
    answerDeadline: 5,
    hearingTimeline: "10–21 days after filing",
    lockoutAllowedAfter: "Constable only, after judgment",
    citations: [
      "Texas Property Code § 24.005",
      "Texas Property Code § 24.0051"
    ]
  },

  // …repeat for all states
};