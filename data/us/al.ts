import { StateData } from "@/types/stateData"

const data: StateData = {
  state: "Alabama",
  code: "AL",
  country: "US",

  noticePeriods: {
    monthToMonth: 30,
    weekToWeek: 7,
    yearToYear: 60
  },

  rules: {
    specialCases: [
      "If rent is paid weekly, notice is 7 days",
      "If tenant has lived in the unit for over 1 year, notice may differ"
    ],
    landlordRequirements: [
      "Landlord must provide written notice",
      "Notice must comply with state statutes"
    ],
    tenantRequirements: [
      "Tenant must deliver notice in writing",
      "Tenant must follow lease-specific notice rules if stricter"
    ]
  },

  citations: [
    { text: "Ala. Code § 35-9A-441", url: "https://example.com/al-35-9a-441" },
    { text: "Ala. Code § 35-9A-142", url: "https://example.com/al-35-9a-142" }
  ],

  metadata: {
    lastUpdated: "2024-01-01",
    source: "State statutes",
    editorNotes: "Reviewed for accuracy"
  }
}

export default data
