import { z } from "zod"

export const ALSchema = z.object({
  noticePeriods: z.object({
    monthToMonth: z.number(),
    weekToWeek: z.number(),
    yearToYear: z.number()
  }),

  rules: z.object({
    specialCases: z.array(z.string()),
    landlordRequirements: z.array(z.string()),
    tenantRequirements: z.array(z.string())
  }),

  citations: z.array(
    z.object({
      text: z.string(),
      url: z.string().url()
    })
  ),

  metadata: z.object({
    lastUpdated: z.string(),
    source: z.string(),
    editorNotes: z.string()
  })
})

export type ALSchemaType = z.infer<typeof ALSchema>
