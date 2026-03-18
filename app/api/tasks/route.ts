import { NextRequest } from "next/server"
import { createTaskBodySchema, listTasksQuerySchema } from "@/features/tasks/server/task.schema"
import { createTaskForUser, listTasks } from "@/features/tasks/server/task.service"
import { requireSession } from "@/server/auth/require-session"
import { fail, ok } from "@/server/api/response"

export async function GET(request: NextRequest) {
  try {
    const session = await requireSession()
    const query = Object.fromEntries(request.nextUrl.searchParams.entries())
    const input = listTasksQuerySchema.parse(query)
    const data = await listTasks(session.user, input)

    return ok(data)
  } catch (error) {
    return fail(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireSession()
    const body = await request.json()
    const input = createTaskBodySchema.parse(body)
    const data = await createTaskForUser(session.user, input)

    return ok(data, 201)
  } catch (error) {
    return fail(error)
  }
}
