import { z } from "zod"
import { requireSession } from "@/server/auth/require-session"
import { fail, ok } from "@/server/api/response"
import { resumeTimerForUser } from "@/features/timer/server/timer.service"

const resumeTimerBodySchema = z.object({
  sessionId: z.string().trim().optional(),
})

export async function POST(request: Request) {
  try {
    const session = await requireSession()
    const body = await request.json().catch(() => ({}))
    const input = resumeTimerBodySchema.parse(body)
    const data = await resumeTimerForUser(session.user, input.sessionId)

    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
