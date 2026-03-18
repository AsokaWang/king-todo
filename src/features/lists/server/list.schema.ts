import { z } from "zod"

export const createListBodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  parentId: z.string().trim().nullable().optional(),
  color: z.string().trim().nullable().optional(),
})

export type CreateListBody = z.infer<typeof createListBodySchema>
