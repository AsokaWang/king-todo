import { Prisma } from "@prisma/client"
import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import type { TaskDetailView, TaskListItemView } from "@/features/tasks/contracts"
import type { CreateTaskBody, ListTasksQuery, ReorderTasksBody, UpdateTaskBody } from "@/features/tasks/server/task.schema"
import { HttpError } from "@/server/errors/http"
import { getDateRanges } from "@/server/time/ranges"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

async function findTaskParent(spaceId: string, taskId: string) {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      spaceId,
      archivedAt: null,
    },
    select: {
      id: true,
      listId: true,
      parentTaskId: true,
    },
  })
}

async function assertValidParentTask(spaceId: string, parentTaskId: string | null | undefined) {
  if (!parentTaskId) return null

  const parentTask = await findTaskParent(spaceId, parentTaskId)
  if (!parentTask) {
    throw new HttpError(400, "INVALID_PARENT_TASK", "所选父任务无效。")
  }

  return parentTask
}

async function assertNoParentTaskCycle(spaceId: string, taskId: string, parentTaskId: string | null | undefined) {
  if (!parentTaskId) return

  let currentParentId: string | null = parentTaskId

  while (currentParentId) {
    if (currentParentId === taskId) {
      throw new HttpError(400, "INVALID_PARENT_TASK", "不能将任务移动到自己的子任务下。")
    }

    const currentNode: { parentTaskId: string | null } | null = await prisma.task.findFirst({
      where: {
        id: currentParentId,
        spaceId,
        archivedAt: null,
      },
      select: { parentTaskId: true },
    })

    if (!currentNode) {
      throw new HttpError(400, "INVALID_PARENT_TASK", "所选父任务无效。")
    }

    currentParentId = currentNode.parentTaskId
  }
}

function buildTaskSummary(task: {
  dueAt?: Date | null
  estimatedMinutes?: number | null
  actualMinutes: number
  subtasks?: Array<{ status: "todo" | "in_progress" | "done" | "cancelled" | "archived" }>
}) {
  const now = Date.now()
  const subtaskCount = task.subtasks?.length ?? 0
  const completedSubtaskCount = task.subtasks?.filter((item) => item.status === "done").length ?? 0
  return {
    subtaskCount,
    completedSubtaskCount,
    isOverdue: Boolean(task.dueAt && task.dueAt.getTime() < now),
    effortSummary: {
      estimatedMinutes: task.estimatedMinutes ?? null,
      actualMinutes: task.actualMinutes,
    },
  }
}

function toTaskListItemView(task: {
  id: string
  title: string
  description?: string | null
  status: "todo" | "in_progress" | "done" | "cancelled" | "archived"
  priority: "low" | "medium" | "high"
  source?: "manual" | "quick_add" | "ai" | "import"
  sortOrder: number
  dueAt?: Date | null
  startAt?: Date | null
  completedAt?: Date | null
  estimatedMinutes?: number | null
  actualMinutes: number
  list?: { id: string; name: string; emoji?: string | null; color?: string | null } | null
  parentTask?: { id: string; title: string } | null
  taskTags?: Array<{ tag: { id: string; name: string; color?: string | null } }>
  subtasks?: Array<{ id: string; status: "todo" | "in_progress" | "done" | "cancelled" | "archived"; sortOrder?: number | null }>
}): TaskListItemView {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? null,
    status: task.status,
    priority: task.priority,
    source: task.source,
    sortOrder: task.sortOrder,
    dueAt: task.dueAt?.toISOString() ?? null,
    startAt: task.startAt?.toISOString() ?? null,
    completedAt: task.completedAt?.toISOString() ?? null,
    estimatedMinutes: task.estimatedMinutes ?? null,
    actualMinutes: task.actualMinutes,
    list: task.list ?? null,
    parentTask: task.parentTask ?? null,
    taskTags: task.taskTags ?? [],
    subtasks: (task.subtasks ?? []).map((subtask) => ({ id: subtask.id, status: subtask.status, sortOrder: subtask.sortOrder ?? undefined })),
    summary: buildTaskSummary(task),
  }
}

function toTaskDetailView(task: {
  id: string
  title: string
  description?: string | null
  status: "todo" | "in_progress" | "done" | "cancelled" | "archived"
  priority: "low" | "medium" | "high"
  source?: "manual" | "quick_add" | "ai" | "import"
  sortOrder: number
  dueAt?: Date | null
  startAt?: Date | null
  completedAt?: Date | null
  estimatedMinutes?: number | null
  actualMinutes: number
  createdAt?: Date
  updatedAt?: Date
  list?: { id: string; name: string; emoji?: string | null; color?: string | null } | null
  parentTask?: { id: string; title: string } | null
  taskTags?: Array<{ tag: { id: string; name: string; color?: string | null } }>
  reminders?: Array<{ id: string; triggerAt: Date; status?: string }>
  recurrenceRule?: { id: string; rrule: string } | null
  subtasks?: Array<{ id: string; title: string; status: "todo" | "in_progress" | "done" | "cancelled" | "archived"; sortOrder?: number | null; taskTags?: Array<{ tag: { id: string; name: string; color?: string | null } }> }>
  timeEntries?: Array<{ id: string; title: string; startedAt: Date; endedAt: Date; durationSec: number }>
}): TaskDetailView {
  const base = toTaskListItemView(task)
  return {
    ...base,
    createdAt: task.createdAt?.toISOString(),
    updatedAt: task.updatedAt?.toISOString(),
    reminders: task.reminders?.map((item) => ({ id: item.id, triggerAt: item.triggerAt.toISOString(), status: item.status })) ?? [],
    recurrenceRule: task.recurrenceRule ?? null,
    subtasks: (task.subtasks ?? []).map((subtask) => ({
      id: subtask.id,
      title: subtask.title,
      status: subtask.status,
      sortOrder: subtask.sortOrder ?? undefined,
      taskTags: subtask.taskTags ?? [],
    })),
    timeEntries: task.timeEntries?.map((entry) => ({
      id: entry.id,
      title: entry.title,
      startedAt: entry.startedAt.toISOString(),
      endedAt: entry.endedAt.toISOString(),
      durationSec: entry.durationSec,
    })) ?? [],
  }
}

function getViewWhere(view: ListTasksQuery["view"]) {
  const { startOfToday, endOfToday, startOfTomorrow, endOfTomorrow, startOfWeek, endOfWeek, startOfMonth, endOfMonth } =
    getDateRanges()

  switch (view) {
    case "today":
      return {
        OR: [
          { dueAt: { gte: startOfToday, lte: endOfToday } },
          { startAt: { gte: startOfToday, lte: endOfToday } },
        ],
      }
    case "tomorrow":
      return {
        OR: [
          { dueAt: { gte: startOfTomorrow, lte: endOfTomorrow } },
          { startAt: { gte: startOfTomorrow, lte: endOfTomorrow } },
        ],
      }
    case "week":
      return {
        OR: [
          { dueAt: { gte: startOfWeek, lte: endOfWeek } },
          { startAt: { gte: startOfWeek, lte: endOfWeek } },
        ],
      }
    case "month":
      return {
        OR: [
          { dueAt: { gte: startOfMonth, lte: endOfMonth } },
          { startAt: { gte: startOfMonth, lte: endOfMonth } },
        ],
      }
    default:
      return {}
  }
}

export async function getTaskViewCountsForUser(user: CurrentUser) {
  const space = await ensureUserSpace(user)
  const baseWhere = { spaceId: space.id, archivedAt: null }

  const [all, today, tomorrow, week, month] = await Promise.all([
    prisma.task.count({ where: baseWhere }),
    prisma.task.count({ where: { ...baseWhere, ...getViewWhere("today") } }),
    prisma.task.count({ where: { ...baseWhere, ...getViewWhere("tomorrow") } }),
    prisma.task.count({ where: { ...baseWhere, ...getViewWhere("week") } }),
    prisma.task.count({ where: { ...baseWhere, ...getViewWhere("month") } }),
  ])

  return { all, today, tomorrow, week, month }
}

export async function listTasks(user: CurrentUser, input: ListTasksQuery) {
  const space = await ensureUserSpace(user)

  const where: Prisma.TaskWhereInput = {
    spaceId: space.id,
    archivedAt: null,
    ...getViewWhere(input.view),
    ...(input.q
      ? {
          OR: [
            { title: { contains: input.q } },
            { description: { contains: input.q } },
          ],
        }
      : {}),
    ...(input.status ? { status: input.status } : {}),
    ...(input.priority ? { priority: input.priority } : {}),
    ...(input.listId ? { listId: input.listId } : {}),
    parentTaskId: null,
  }

  const [total, items] = await Promise.all([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      orderBy:
        input.sortBy === "sortOrder"
          ? [{ sortOrder: "asc" }, { updatedAt: "desc" }]
          : { [input.sortBy]: input.sortOrder },
      skip: (input.page - 1) * input.pageSize,
      take: input.pageSize,
      include: {
        list: true,
        parentTask: {
          select: {
            id: true,
            title: true,
          },
        },
        subtasks: {
          where: { archivedAt: null },
          select: {
            id: true,
            status: true,
            sortOrder: true,
          },
        },
        taskTags: {
          include: {
            tag: true,
          },
        },
      },
    }),
  ])

  return {
    items: items.map((item) => toTaskListItemView(item)),
    page: input.page,
    pageSize: input.pageSize,
    total,
    hasNextPage: input.page * input.pageSize < total,
  }
}

export async function createTaskForUser(user: CurrentUser, input: CreateTaskBody) {
  const space = await ensureUserSpace(user)

  const parentTask = await assertValidParentTask(space.id, input.parentTaskId)
  const normalizedListId = input.listId ?? parentTask?.listId ?? undefined

  const namedTagIds = input.tagNames.length
    ? await Promise.all(
        Array.from(new Set(input.tagNames.map((item) => item.trim()).filter(Boolean))).map(async (name) => {
          const tag = await prisma.tag.upsert({
            where: {
              spaceId_name: {
                spaceId: space.id,
                name,
              },
            },
            update: {},
            create: {
              spaceId: space.id,
              name,
            },
          })

          return tag.id
        }),
      )
    : []

  const tagIds = Array.from(new Set([...input.tagIds, ...namedTagIds]))

  const task = await prisma.$transaction(async (tx) => {
    await tx.task.updateMany({
      where: {
        spaceId: space.id,
        archivedAt: null,
        listId: normalizedListId ?? null,
      },
      data: {
        sortOrder: {
          increment: 1,
        },
      },
    })

    return tx.task.create({
      data: {
        spaceId: space.id,
        title: input.title,
        description: input.description,
        listId: normalizedListId,
        parentTaskId: input.parentTaskId,
        priority: input.priority,
        sortOrder: 0,
        startAt: input.startAt ? new Date(input.startAt) : undefined,
        dueAt: input.dueAt ? new Date(input.dueAt) : undefined,
        estimatedMinutes: input.estimatedMinutes,
        taskTags:
          tagIds.length > 0
            ? {
                create: tagIds.map((tagId) => ({
                  tagId,
                })),
              }
            : undefined,
      },
      include: {
        subtasks: {
          where: { archivedAt: null },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        },
        taskTags: {
          include: {
            tag: true,
          },
        },
      },
    })
  })

  return task
}

export async function getTaskByIdForUser(user: CurrentUser, taskId: string) {
  const space = await ensureUserSpace(user)

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      spaceId: space.id,
      archivedAt: null,
    },
    include: {
      list: true,
      parentTask: {
        select: {
          id: true,
          title: true,
        },
      },
      taskTags: {
        include: {
          tag: true,
        },
      },
      reminders: true,
      recurrenceRule: true,
      subtasks: {
        where: { archivedAt: null },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        include: {
          taskTags: {
            include: {
              tag: true,
            },
          },
        },
      },
      timeEntries: {
        orderBy: {
          startedAt: "desc",
        },
        take: 10,
      },
    },
  })

  if (!task) {
    throw new HttpError(404, "NOT_FOUND", "Task not found.")
  }

  return toTaskDetailView(task)
}

export async function updateTaskForUser(user: CurrentUser, taskId: string, input: UpdateTaskBody) {
  const space = await ensureUserSpace(user)

  const existing = await prisma.task.findFirst({
    where: {
      id: taskId,
      spaceId: space.id,
      archivedAt: null,
    },
  })

  if (!existing) {
    throw new HttpError(404, "NOT_FOUND", "Task not found.")
  }

  if (input.parentTaskId === taskId) {
    throw new HttpError(400, "INVALID_PARENT_TASK", "任务不能设置自己为父任务。")
  }

  const parentTask = await assertValidParentTask(space.id, input.parentTaskId)
  await assertNoParentTaskCycle(space.id, taskId, input.parentTaskId)

  if (input.pinToTop) {
    await prisma.$transaction(async (tx) => {
      await tx.task.updateMany({
        where: {
          spaceId: space.id,
          archivedAt: null,
          listId: existing.listId,
          parentTaskId: existing.parentTaskId,
          id: { not: taskId },
        },
        data: {
          sortOrder: {
            increment: 1,
          },
        },
      })

      await tx.task.update({
        where: { id: taskId },
        data: { sortOrder: 0 },
      })
    })

    return getTaskByIdForUser(user, taskId)
  }

  if (input.archive) {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: "archived",
        archivedAt: new Date(),
      },
    })

    return { ...existing, status: "archived", archivedAt: new Date() }
  }

  const tagIds = input.tagNames
    ? await Promise.all(
        Array.from(new Set(input.tagNames.map((item) => item.trim()).filter(Boolean))).map(async (name) => {
          const tag = await prisma.tag.upsert({
            where: {
              spaceId_name: {
                spaceId: space.id,
                name,
              },
            },
            update: {},
            create: {
              spaceId: space.id,
              name,
            },
          })

          return tag.id
        }),
      )
    : null

  const normalizedListId = input.listId === undefined ? undefined : input.listId === null ? null : input.listId
  const resolvedListId = normalizedListId === undefined ? undefined : normalizedListId ?? parentTask?.listId ?? null

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: input.title,
      description: input.description === null ? null : input.description,
      status: input.status,
      priority: input.priority,
      listId: resolvedListId,
      parentTaskId: input.parentTaskId === null ? null : input.parentTaskId,
      sortOrder: input.sortOrder,
      startAt: input.startAt === null ? null : input.startAt ? new Date(input.startAt) : undefined,
      dueAt: input.dueAt === null ? null : input.dueAt ? new Date(input.dueAt) : undefined,
      estimatedMinutes:
        input.estimatedMinutes === null ? null : input.estimatedMinutes,
      taskTags:
        tagIds !== null
          ? {
              deleteMany: {},
              create: tagIds.map((tagId) => ({ tagId })),
            }
          : undefined,
      reminders:
        input.reminderAt !== undefined
          ? input.reminderAt
            ? {
                deleteMany: {},
                create: {
                  triggerAt: new Date(input.reminderAt),
                  channel: "in_app",
                  status: "pending",
                },
              }
            : {
                deleteMany: {},
              }
          : undefined,
    },
    include: {
      taskTags: {
        include: {
          tag: true,
        },
      },
    },
  })

  if (input.recurrenceRule !== undefined) {
    if (input.recurrenceRule) {
      await prisma.recurrenceRule.upsert({
        where: { taskId },
        create: {
          taskId,
          rrule: input.recurrenceRule,
          timezone: "Asia/Shanghai",
        },
        update: {
          rrule: input.recurrenceRule,
        },
      })
    } else {
      await prisma.recurrenceRule.deleteMany({ where: { taskId } })
    }
  }

  return getTaskByIdForUser(user, updatedTask.id)
}

export async function deleteTaskForUser(user: CurrentUser, taskId: string) {
  const space = await ensureUserSpace(user)

  const existing = await prisma.task.findFirst({
    where: {
      id: taskId,
      spaceId: space.id,
      archivedAt: null,
    },
    select: { id: true },
  })

  if (!existing) {
    throw new HttpError(404, "NOT_FOUND", "Task not found.")
  }

  await prisma.task.delete({ where: { id: taskId } })
  return { id: taskId, deleted: true }
}

export async function reorderTasksForUser(user: CurrentUser, input: ReorderTasksBody) {
  const space = await ensureUserSpace(user)

  const task = await prisma.task.findFirst({
    where: {
      id: input.taskId,
      spaceId: space.id,
      archivedAt: null,
    },
    select: { id: true },
  })

  if (!task) {
    throw new HttpError(400, "INVALID_ORDER", "Task id is invalid.")
  }

  const targetWhere = {
    spaceId: space.id,
    archivedAt: null,
    ...(input.targetContainer.type === "list"
      ? { listId: input.targetContainer.id ?? null, parentTaskId: null }
      : { parentTaskId: input.targetContainer.id, listId: undefined }),
  }

  const siblings = await prisma.task.findMany({
    where: targetWhere,
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    select: { id: true },
  })

  const siblingIds = siblings.map((item) => item.id).filter((id) => id !== input.taskId)
  const nextIds = [...siblingIds]
  nextIds.splice(Math.min(input.targetIndex, nextIds.length), 0, input.taskId)

  await prisma.$transaction([
    prisma.task.update({
      where: { id: input.taskId },
      data: input.targetContainer.type === "list"
        ? { listId: input.targetContainer.id ?? null, parentTaskId: null }
        : { parentTaskId: input.targetContainer.id ?? null },
    }),
    ...nextIds.map((taskId, index) =>
      prisma.task.update({
        where: { id: taskId },
        data: { sortOrder: index },
      }),
    ),
  ])

  return { updated: nextIds.length }
}
