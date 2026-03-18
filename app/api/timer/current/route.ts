import { requireSession } from "@/server/auth/require-session"
import { fail, ok } from "@/server/api/response"
import { getCurrentTimerForUser } from "@/features/timer/server/timer.service"

export async function GET() {
  try {
    const session = await requireSession()
    const data = await getCurrentTimerForUser(session.user)

    return ok({ currentTimer: data })
  } catch (error) {
    return fail(error)
  }
}
