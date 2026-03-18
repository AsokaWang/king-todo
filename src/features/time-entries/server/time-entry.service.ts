import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

export async function listTimeEntriesForUser(user: CurrentUser) {
  const space = await ensureUserSpace(user)

  const [items, aggregate, currentTimer] = await Promise.all([
    prisma.timeEntry.findMany({
      where: {
        spaceId: space.id,
      },
      orderBy: {
        startedAt: "desc",
      },
      take: 30,
      include: {
        task: true,
      },
    }),
    prisma.timeEntry.aggregate({
      where: {
        spaceId: space.id,
      },
      _sum: {
        durationSec: true,
      },
      _count: {
        id: true,
      },
    }),
    prisma.timerSession.findFirst({
      where: {
        spaceId: space.id,
        status: { in: ["running", "paused"] },
      },
      orderBy: { updatedAt: "desc" },
      include: {
        task: true,
      },
    }),
  ])

  return {
    items,
    totalCount: aggregate._count.id,
    totalDurationSec: aggregate._sum.durationSec ?? 0,
    currentTimer,
  }
}
