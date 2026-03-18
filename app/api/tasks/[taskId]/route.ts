import { NextRequest } from "next/server"
import { taskIdParamsSchema, updateTaskBodySchema } from "@/features/tasks/server/task.schema"
import { getTaskByIdForUser, updateTaskForUser } from "@/features/tasks/server/task.service"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

type RouteContext = {
  params: Promise<{
    taskId: string
  }>
}

export async function GET(_: NextRequest, context: RouteContext) {
  try {
    const session = await requireSession()
    const params = taskIdParamsSchema.parse(await context.params)
    const data = await getTaskByIdForUser(session.user, params.taskId)

    return ok(data)
  } catch (error) {
    return fail(error)
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = await requireSession()
    const params = taskIdParamsSchema.parse(await context.params)
    const body = await request.json()
    const input = updateTaskBodySchema.parse(body)
    const data = await updateTaskForUser(session.user, params.taskId, input)

    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
