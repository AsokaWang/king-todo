import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import type { QuadrantsQuery } from "@/features/quadrants/server/quadrants.schema"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

function getQuadrant(task: { priority: "low" | "medium" | "high"; dueAt: Date | null }) {
  const now = new Date()
  const endOfToday = new Date(now)
  endOfToday.setHours(23, 59, 59, 999)

  const important = task.priority === "high"
  const urgent = Boolean(task.dueAt && task.dueAt <= endOfToday)

  if (important && urgent) return "important_urgent"
  if (important && !urgent) return "important_not_urgent"
  if (!important && urgent) return "not_important_urgent"
  return "not_important_not_urgent"
}

export async function getQuadrantsData(user: CurrentUser, input: QuadrantsQuery) {
  const space = await ensureUserSpace(user)

  const tasks = await prisma.task.findMany({
    where: {
      spaceId: space.id,
      archivedAt: null,
      status: input.includeDone ? { not: "archived" } : { notIn: ["done", "archived"] },
      parentTaskId: null,
    },
    orderBy: [{ dueAt: "asc" }, { priority: "desc" }, { updatedAt: "desc" }],
    include: {
      list: {
        select: { id: true, name: true, emoji: true, color: true },
      },
      taskTags: {
        include: {
          tag: {
            select: { id: true, name: true, color: true },
          },
        },
      },
    },
  })

  const grouped = {
    important_urgent: [] as typeof tasks,
    important_not_urgent: [] as typeof tasks,
    not_important_urgent: [] as typeof tasks,
    not_important_not_urgent: [] as typeof tasks,
  }

  for (const task of tasks) {
    grouped[getQuadrant({ priority: task.priority, dueAt: task.dueAt })].push(task)
  }

  return {
    rule: {
      important: "priority === high",
      urgent: "dueAt <= today end or overdue",
    },
    totals: {
      all: tasks.length,
      overdue: tasks.filter((task) => task.dueAt && task.dueAt < new Date()).length,
    },
    quadrants: grouped,
  }
}
