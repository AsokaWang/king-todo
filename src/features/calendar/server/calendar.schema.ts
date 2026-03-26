import { z } from "zod"

export const calendarQuerySchema = z.object({
  view: z.enum(["month", "week", "day"]).default("month"),
  anchor: z.string().datetime().optional(),
})

export type CalendarQuery = z.infer<typeof calendarQuerySchema>
