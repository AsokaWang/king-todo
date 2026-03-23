import { NextRequest } from "next/server"
import { reorderTasksBodySchema } from "@/features/tasks/server/task.schema"
import { reorderTasksForUser } from "@/features/tasks/server/task.service"
import { requireSession } from "@/server/auth/require-session"
import { fail, ok } from "@/server/api/response"

export async function POST(request: NextRequest) {
  try {
    const session = await requireSession()
    const body = await request.json()
    const input = reorderTasksBodySchema.parse(body)
    const data = await reorderTasksForUser(session.user, input)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
