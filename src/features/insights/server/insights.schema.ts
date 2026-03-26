import { z } from "zod"

export const insightsQuerySchema = z.object({
  range: z.enum(["7d", "30d", "month"]).default("7d"),
})

export type InsightsQuery = z.infer<typeof insightsQuerySchema>
