import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import { addDays, endOfDay, startOfDay, toDateKey } from "@/server/time/ranges"
import type { CalendarQuery } from "@/features/calendar/server/calendar.schema"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

function getRange(view: CalendarQuery["view"], anchorDate: Date) {
  const anchor = startOfDay(anchorDate)

  if (view === "day") {
    return { start: anchor, end: endOfDay(anchor) }
  }

  if (view === "week") {
    const start = new Date(anchor)
    const weekday = start.getDay()
    const diffToMonday = weekday === 0 ? -6 : 1 - weekday
    start.setDate(start.getDate() + diffToMonday)
    return { start: startOfDay(start), end: endOfDay(addDays(start, 6)) }
  }

  const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const monthEnd = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0)
  const gridStart = addDays(monthStart, -(monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1))
  const monthEndWeekday = monthEnd.getDay()
  const diffToSunday = monthEndWeekday === 0 ? 0 : 7 - monthEndWeekday
  const gridEnd = addDays(monthEnd, diffToSunday)
  return { start: startOfDay(gridStart), end: endOfDay(gridEnd) }
}

function toEvent(task: {
  id: string
  title: string
  status: string
  priority: string
  startAt: Date | null
  dueAt: Date | null
  list: { id: string; name: string; emoji: string | null; color: string | null } | null
}) {
  const effectiveStart = task.startAt ?? task.dueAt
  const effectiveEnd = task.dueAt ?? task.startAt

  return {
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    startAt: effectiveStart?.toISOString() ?? null,
    dueAt: effectiveEnd?.toISOString() ?? null,
    list: task.list,
    isAllDayLike: Boolean(!task.startAt || !task.dueAt || task.startAt.getTime() === task.dueAt.getTime()),
  }
}

export async function getCalendarData(user: CurrentUser, input: CalendarQuery) {
  const space = await ensureUserSpace(user)
  const anchor = input.anchor ? new Date(input.anchor) : new Date()
  const { start, end } = getRange(input.view, anchor)

  const tasks = await prisma.task.findMany({
    where: {
      spaceId: space.id,
      archivedAt: null,
      status: { not: "archived" },
      OR: [
        {
          startAt: {
            gte: start,
            lte: end,
          },
        },
        {
          dueAt: {
            gte: start,
            lte: end,
          },
        },
        {
          AND: [
            { startAt: { lte: start } },
            { dueAt: { gte: end } },
          ],
        },
      ],
    },
    orderBy: [{ startAt: "asc" }, { dueAt: "asc" }, { updatedAt: "desc" }],
    include: {
      list: {
        select: {
          id: true,
          name: true,
          emoji: true,
          color: true,
        },
      },
    },
  })

  const now = new Date()
  const events = tasks.map(toEvent)
  const totalDays = Math.floor((startOfDay(end).getTime() - startOfDay(start).getTime()) / 86400000) + 1
  const eventsByDate = new Map<string, typeof events>()

  for (const event of events) {
    const eventStart = event.startAt ? startOfDay(new Date(event.startAt)) : event.dueAt ? startOfDay(new Date(event.dueAt)) : null
    const eventEnd = event.dueAt ? endOfDay(new Date(event.dueAt)) : event.startAt ? endOfDay(new Date(event.startAt)) : null
    if (!eventStart || !eventEnd) continue

    for (let cursor = new Date(eventStart); cursor <= eventEnd; cursor = addDays(cursor, 1)) {
      const key = toDateKey(cursor)
      const bucket = eventsByDate.get(key) ?? []
      bucket.push(event)
      eventsByDate.set(key, bucket)
    }
  }

  const days = Array.from({ length: totalDays }).map((_, index) => {
    const date = addDays(start, index)
    const dateKey = toDateKey(date)

    return {
      date: dateKey,
      isToday: dateKey === toDateKey(now),
      isCurrentMonth: date.getMonth() === anchor.getMonth(),
      items: eventsByDate.get(dateKey) ?? [],
    }
  })

  return {
    view: input.view,
    anchor: anchor.toISOString(),
    range: {
      start: start.toISOString(),
      end: end.toISOString(),
    },
    events,
    days,
  }
}
