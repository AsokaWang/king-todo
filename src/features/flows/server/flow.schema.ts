import { z } from "zod"

export const flowStatusSchema = z.enum(["draft", "active", "done", "cancelled"])
export const flowStepStatusSchema = z.enum(["todo", "in_progress", "done", "cancelled"])

export const flowIdParamsSchema = z.object({
  flowId: z.string().trim().min(1),
})

export const createFlowBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(4000).nullable().optional(),
  sourceTaskId: z.string().trim().nullable().optional(),
})

export const updateFlowBodySchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(4000).nullable().optional(),
  status: flowStatusSchema.optional(),
}).refine((value) => Object.keys(value).length > 0, { message: "At least one field is required." })

export const createFlowStepBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(4000).nullable().optional(),
  estimatedMinutes: z.number().int().min(0).max(24 * 60).nullable().optional(),
})

export const updateFlowStepBodySchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(4000).nullable().optional(),
  status: flowStepStatusSchema.optional(),
  estimatedMinutes: z.number().int().min(0).max(24 * 60).nullable().optional(),
  sortOrder: z.number().int().min(0).optional(),
}).refine((value) => Object.keys(value).length > 0, { message: "At least one field is required." })

export const flowStepIdParamsSchema = z.object({
  flowId: z.string().trim().min(1),
  stepId: z.string().trim().min(1),
})

export const reorderFlowStepsBodySchema = z.object({
  orderedStepIds: z.array(z.string().trim().min(1)).min(1),
})

export type CreateFlowBody = z.infer<typeof createFlowBodySchema>
export type UpdateFlowBody = z.infer<typeof updateFlowBodySchema>
export type CreateFlowStepBody = z.infer<typeof createFlowStepBodySchema>
export type UpdateFlowStepBody = z.infer<typeof updateFlowStepBodySchema>
export type ReorderFlowStepsBody = z.infer<typeof reorderFlowStepsBodySchema>
