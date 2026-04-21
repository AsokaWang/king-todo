import { NextRequest } from "next/server"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"
import { flowIdParamsSchema, updateFlowBodySchema } from "@/features/flows/server/flow.schema"
import { getFlowByIdForUser, updateFlowForUser } from "@/features/flows/server/flow.service"

type RouteContext = {
  params: Promise<{ flowId: string }>
}

export async function GET(_: NextRequest, context: RouteContext) {
  try {
    const session = await requireSession()
    const params = flowIdParamsSchema.parse(await context.params)
    const data = await getFlowByIdForUser(session.user, params.flowId)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = await requireSession()
    const params = flowIdParamsSchema.parse(await context.params)
    const input = updateFlowBodySchema.parse(await request.json())
    const data = await updateFlowForUser(session.user, params.flowId, input)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
