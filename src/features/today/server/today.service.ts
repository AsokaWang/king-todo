import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import { getDateRanges } from "@/server/time/ranges"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

export async function getTodaySummary(user: CurrentUser) {
  const space = await ensureUserSpace(user)

  const { now, startOfToday: startOfDay, endOfToday: endOfDay } = getDateRanges()

  const [todayTasks, todayTaskCount, completedCount, inProgressCount, overdueCount, activeTimer, timeEntries] =
    await Promise.all([
      prisma.task.findMany({
        where: {
          spaceId: space.id,
          archivedAt: null,
          OR: [
            { dueAt: { gte: startOfDay, lte: endOfDay } },
            { startAt: { gte: startOfDay, lte: endOfDay } },
          ],
        },
        orderBy: [{ priority: "desc" }, { updatedAt: "desc" }],
        take: 5,
      }),
      prisma.task.count({
        where: {
          spaceId: space.id,
          archivedAt: null,
          OR: [
            { dueAt: { gte: startOfDay, lte: endOfDay } },
            { startAt: { gte: startOfDay, lte: endOfDay } },
          ],
        },
      }),
      prisma.task.count({
        where: { spaceId: space.id, archivedAt: null, status: "done" },
      }),
      prisma.task.count({
        where: { spaceId: space.id, archivedAt: null, status: "in_progress" },
      }),
      prisma.task.count({
        where: {
          spaceId: space.id,
          archivedAt: null,
          status: { not: "done" },
          dueAt: { lt: now },
        },
      }),
      prisma.timerSession.findFirst({
        where: {
          spaceId: space.id,
          status: { in: ["running", "paused"] },
        },
        orderBy: { updatedAt: "desc" },
        include: { task: true },
      }),
      prisma.timeEntry.aggregate({
        where: {
          spaceId: space.id,
          startedAt: { gte: startOfDay, lte: endOfDay },
        },
        _sum: {
          durationSec: true,
        },
      }),
    ])

  return {
    taskCount: todayTaskCount,
    completedCount,
    inProgressCount,
    overdueCount,
    tasks: todayTasks,
    activeTimer,
    trackedDurationSec: timeEntries._sum.durationSec ?? 0,
  }
}
