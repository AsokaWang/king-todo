import { z } from "zod"

export const quadrantsQuerySchema = z.object({
  includeDone: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
})

export type QuadrantsQuery = z.infer<typeof quadrantsQuerySchema>
