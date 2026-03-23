import { Prisma } from "@prisma/client"
import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import type { CreateTaskBody, ListTasksQuery, ReorderTasksBody, UpdateTaskBody } from "@/features/tasks/server/task.schema"
import { HttpError } from "@/server/errors/http"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

function getDateRanges() {
  const now = new Date()
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date(now)
  endOfToday.setHours(23, 59, 59, 999)

  const startOfTomorrow = new Date(startOfToday)
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)
  const endOfTomorrow = new Date(startOfTomorrow)
  endOfTomorrow.setHours(23, 59, 59, 999)

  const startOfWeek = new Date(startOfToday)
  const weekday = startOfWeek.getDay()
  const diffToMonday = weekday === 0 ? -6 : 1 - weekday
  startOfWeek.setDate(startOfWeek.getDate() + diffToMonday)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  return {
    startOfToday,
    endOfToday,
    startOfTomorrow,
    endOfTomorrow,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
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
        taskTags: {
          include: {
            tag: true,
          },
        },
      },
    }),
  ])

  return {
    items,
    page: input.page,
    pageSize: input.pageSize,
    total,
    hasNextPage: input.page * input.pageSize < total,
  }
}

export async function createTaskForUser(user: CurrentUser, input: CreateTaskBody) {
  const space = await ensureUserSpace(user)

  if (input.parentTaskId) {
    const parentTask = await prisma.task.findFirst({
      where: {
        id: input.parentTaskId,
        spaceId: space.id,
        archivedAt: null,
      },
      select: {
        id: true,
        listId: true,
      },
    })

    if (!parentTask) {
      throw new HttpError(400, "INVALID_PARENT_TASK", "所选父任务无效。")
    }

    if (!input.listId) {
      input.listId = parentTask.listId ?? undefined
    }
  }

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
        listId: input.listId ?? null,
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
        listId: input.listId,
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

  return task
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

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: input.title,
      description: input.description === null ? null : input.description,
      status: input.status,
      priority: input.priority,
      listId: input.listId === null ? null : input.listId,
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

  const tasks = await prisma.task.findMany({
    where: {
      spaceId: space.id,
      archivedAt: null,
      id: { in: input.orderedTaskIds },
      listId: input.listId ?? null,
    },
    select: { id: true },
  })

  if (tasks.length !== input.orderedTaskIds.length) {
    throw new HttpError(400, "INVALID_ORDER", "Ordered task ids are invalid.")
  }

  await prisma.$transaction(
    input.orderedTaskIds.map((taskId, index) =>
      prisma.task.update({
        where: { id: taskId },
        data: { sortOrder: index },
      }),
    ),
  )

  return { updated: input.orderedTaskIds.length }
}
