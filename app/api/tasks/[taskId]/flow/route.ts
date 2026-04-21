import { NextRequest } from "next/server"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"
import { taskIdParamsSchema } from "@/features/tasks/server/task.schema"
import { createFlowFromTaskForUser } from "@/features/flows/server/flow.service"

type RouteContext = {
  params: Promise<{ taskId: string }>
}

export async function POST(_: NextRequest, context: RouteContext) {
  try {
    const session = await requireSession()
    const params = taskIdParamsSchema.parse(await context.params)
    const data = await createFlowFromTaskForUser(session.user, params.taskId)
    return ok(data, 201)
  } catch (error) {
    return fail(error)
  }
}
