import { getTaskViewCountsForUser } from "@/features/tasks/server/task.service"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

export async function GET() {
  try {
    const session = await requireSession()
    const data = await getTaskViewCountsForUser(session.user)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
