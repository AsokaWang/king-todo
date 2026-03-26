import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import { getDateRanges, toDateKey } from "@/server/time/ranges"
import type { InsightsQuery } from "@/features/insights/server/insights.schema"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

function getRange(range: InsightsQuery["range"]) {
  const { now } = getDateRanges()
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)

  if (range === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    start.setHours(0, 0, 0, 0)
    return { start, end }
  }

  const days = range === "30d" ? 29 : 6
  const start = new Date(now)
  start.setDate(start.getDate() - days)
  start.setHours(0, 0, 0, 0)
  return { start, end }
}

export async function getInsightsData(user: CurrentUser, input: InsightsQuery) {
  const space = await ensureUserSpace(user)
  const { start, end } = getRange(input.range)

  const now = new Date()
  const [tasks, timeEntries] = await Promise.all([
    prisma.task.findMany({
      where: {
        spaceId: space.id,
        archivedAt: null,
        createdAt: { lte: end },
      },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        dueAt: true,
        completedAt: true,
        actualMinutes: true,
        updatedAt: true,
      },
    }),
    prisma.timeEntry.findMany({
      where: {
        spaceId: space.id,
        startedAt: { gte: start, lte: end },
      },
      select: {
        id: true,
        startedAt: true,
        durationSec: true,
      },
    }),
  ])

  const tasksInScope = tasks.filter((task) => {
    return Boolean(
      (task.completedAt && task.completedAt >= start && task.completedAt <= end) ||
        (task.dueAt && task.dueAt >= start && task.dueAt <= end) ||
        (task.updatedAt >= start && task.updatedAt <= end),
    )
  })

  const totalTasks = tasksInScope.length
  const completedTasks = tasksInScope.filter((task) => task.status === "done").length
  const overdueTasks = tasksInScope.filter((task) => task.status !== "done" && task.dueAt && task.dueAt < now).length
  const totalFocusSec = timeEntries.reduce((sum, item) => sum + item.durationSec, 0)
  const tasksWithActualMinutes = tasksInScope.filter((task) => task.actualMinutes > 0)
  const avgActualMinutes = tasksWithActualMinutes.length
    ? Math.round(tasksWithActualMinutes.reduce((sum, task) => sum + task.actualMinutes, 0) / tasksWithActualMinutes.length)
    : 0

  const days: string[] = []
  for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    days.push(toDateKey(new Date(cursor)))
  }

  const completionTrend = days.map((day) => ({
    day,
    count: tasksInScope.filter((task) => task.completedAt && toDateKey(task.completedAt) === day).length,
  }))

  const focusTrend = days.map((day) => ({
    day,
    durationSec: timeEntries
      .filter((entry) => toDateKey(entry.startedAt) === day)
      .reduce((sum, entry) => sum + entry.durationSec, 0),
  }))

  const priorityDistribution = {
    high: tasksInScope.filter((task) => task.priority === "high").length,
    medium: tasksInScope.filter((task) => task.priority === "medium").length,
    low: tasksInScope.filter((task) => task.priority === "low").length,
  }

  const statusDistribution = {
    todo: tasksInScope.filter((task) => task.status === "todo").length,
    in_progress: tasksInScope.filter((task) => task.status === "in_progress").length,
    done: tasksInScope.filter((task) => task.status === "done").length,
    archived: tasksInScope.filter((task) => task.status === "archived").length,
  }

  const risks = tasksInScope
    .filter((task) => task.status !== "done" && ((task.dueAt && task.dueAt < now) || task.actualMinutes >= 120))
    .sort((left, right) => right.actualMinutes - left.actualMinutes)
    .slice(0, 8)

  return {
    range: input.range,
    period: {
      start: start.toISOString(),
      end: end.toISOString(),
    },
    metrics: {
      totalTasks,
      completedTasks,
      completionRate: totalTasks ? Number(((completedTasks / totalTasks) * 100).toFixed(1)) : 0,
      totalFocusSec,
      avgActualMinutes,
      overdueTasks,
    },
    completionTrend,
    focusTrend,
    priorityDistribution,
    statusDistribution,
    risks,
  }
}
