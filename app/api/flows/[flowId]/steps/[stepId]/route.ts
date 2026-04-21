import { NextRequest } from "next/server"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"
import { flowStepIdParamsSchema, updateFlowStepBodySchema } from "@/features/flows/server/flow.schema"
import { updateFlowStepForUser } from "@/features/flows/server/flow.service"

type RouteContext = {
  params: Promise<{ flowId: string; stepId: string }>
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = await requireSession()
    const params = flowStepIdParamsSchema.parse(await context.params)
    const input = updateFlowStepBodySchema.parse(await request.json())
    const data = await updateFlowStepForUser(session.user, params.flowId, params.stepId, input)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
