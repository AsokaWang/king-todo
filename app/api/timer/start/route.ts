import { z } from "zod"
import { requireSession } from "@/server/auth/require-session"
import { fail, ok } from "@/server/api/response"
import { startTimerForUser } from "@/features/timer/server/timer.service"

const startTimerBodySchema = z.object({
  taskId: z.string().trim().optional(),
})

export async function POST(request: Request) {
  try {
    const session = await requireSession()
    const body = await request.json()
    const input = startTimerBodySchema.parse(body)
    const data = await startTimerForUser(session.user, input.taskId)

    return ok(data, 201)
  } catch (error) {
    return fail(error)
  }
}
