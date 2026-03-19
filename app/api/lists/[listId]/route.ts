import { listIdParamsSchema, updateListBodySchema } from "@/features/lists/server/list.schema"
import { deleteListForUser, updateListForUser } from "@/features/lists/server/list.service"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

type RouteContext = {
  params: Promise<{
    listId: string
  }>
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await requireSession()
    const params = listIdParamsSchema.parse(await context.params)
    const body = await request.json()
    const input = updateListBodySchema.parse(body)
    const data = await updateListForUser(session.user, params.listId, input)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const session = await requireSession()
    const params = listIdParamsSchema.parse(await context.params)
    const data = await deleteListForUser(session.user, params.listId)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
