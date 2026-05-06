export interface StateData {
  state: string
  code: string
  country: string
  noticePeriods: {
    monthToMonth: number
    weekToWeek: number
    yearToYear: number
  }
  rules: {
    specialCases: string[]
    landlordRequirements: string[]
    tenantRequirements: string[]
  }
  citations: {
    text: string
    url: string
  }[]
  metadata: {
    lastUpdated: string
    source: string
    editorNotes: string
  }
}
