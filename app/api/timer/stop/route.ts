import { z } from "zod"
import { requireSession } from "@/server/auth/require-session"
import { fail, ok } from "@/server/api/response"
import { stopTimerForUser } from "@/features/timer/server/timer.service"

const stopTimerBodySchema = z.object({
  sessionId: z.string().trim().optional(),
})

export async function POST(request: Request) {
  try {
    const session = await requireSession()
    const body = await request.json().catch(() => ({}))
    const input = stopTimerBodySchema.parse(body)
    const data = await stopTimerForUser(session.user, input.sessionId)

    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
