import { z } from "zod"

export const taskStatusSchema = z.enum(["todo", "in_progress", "done", "archived"])
export const taskPrioritySchema = z.enum(["low", "medium", "high"])

export const listTasksQuerySchema = z.object({
  q: z.string().trim().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  listId: z.string().trim().optional(),
  view: z.enum(["all", "today", "tomorrow", "week", "month"]).default("all"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["updatedAt", "dueAt", "createdAt"]).default("updatedAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

export const createTaskBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(4000).optional(),
  listId: z.string().trim().optional(),
  priority: taskPrioritySchema.optional(),
  startAt: z.string().datetime().optional(),
  dueAt: z.string().datetime().optional(),
  tagIds: z.array(z.string().trim()).default([]),
  estimatedMinutes: z.number().int().min(0).max(24 * 60).optional(),
})

export const taskIdParamsSchema = z.object({
  taskId: z.string().trim().min(1),
})

export const updateTaskBodySchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(4000).nullable().optional(),
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema.optional(),
    listId: z.string().trim().nullable().optional(),
    startAt: z.string().datetime().nullable().optional(),
    dueAt: z.string().datetime().nullable().optional(),
    estimatedMinutes: z.number().int().min(0).max(24 * 60).nullable().optional(),
    tagNames: z.array(z.string().trim().min(1)).optional(),
    reminderAt: z.string().datetime().nullable().optional(),
    recurrenceRule: z.string().trim().nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required.",
  })

export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>
export type CreateTaskBody = z.infer<typeof createTaskBodySchema>
export type UpdateTaskBody = z.infer<typeof updateTaskBodySchema>
