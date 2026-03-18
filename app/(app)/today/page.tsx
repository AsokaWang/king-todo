import { TodayDashboard } from "@/features/today/components/today-dashboard"
import { getTodaySummary } from "@/features/today/server/today.service"
import { getSession } from "@/server/auth/get-session"

export default async function TodayPage() {
  const session = await getSession()

  if (!session?.user) {
    return null
  }

  const data = await getTodaySummary(session.user)
  const normalizedData = {
    ...data,
    tasks: data.tasks.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      dueAt: task.dueAt ? task.dueAt.toISOString() : null,
    })),
    activeTimer:
      data.activeTimer && (data.activeTimer.status === "running" || data.activeTimer.status === "paused")
        ? {
            id: data.activeTimer.id,
            status: data.activeTimer.status,
            accumulatedSec: data.activeTimer.accumulatedSec,
            task: data.activeTimer.task
              ? {
                  id: data.activeTimer.task.id,
                  title: data.activeTimer.task.title,
                }
              : null,
          }
        : null,
  }

  return <TodayDashboard data={normalizedData} />
}
