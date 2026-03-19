import { z } from "zod"

const emojiSchema = z.string().trim().max(32)
const nullableIdSchema = z
  .string()
  .trim()
  .transform((value) => value || null)
  .nullable()
  .optional()

const nullableColorSchema = z
  .string()
  .trim()
  .transform((value) => value || null)
  .nullable()
  .optional()

export const createListBodySchema = z.object({
  emoji: emojiSchema.transform((value) => value || "📁").optional().default("📁"),
  name: z.string().trim().min(1).max(120),
  parentId: nullableIdSchema,
  color: nullableColorSchema,
})

export const updateListBodySchema = z
  .object({
    emoji: emojiSchema.transform((value) => value || null).nullable().optional(),
    name: z.string().trim().min(1).max(120).optional(),
    parentId: nullableIdSchema,
    color: nullableColorSchema,
    sortOrder: z.number().int().min(0).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required.",
  })

export const listIdParamsSchema = z.object({
  listId: z.string().trim().min(1),
})

export type CreateListBody = z.infer<typeof createListBodySchema>
export type UpdateListBody = z.infer<typeof updateListBodySchema>
