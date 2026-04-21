import { NextRequest } from "next/server"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"
import { createFlowStepBodySchema, flowIdParamsSchema } from "@/features/flows/server/flow.schema"
import { createFlowStepForUser } from "@/features/flows/server/flow.service"

type RouteContext = {
  params: Promise<{ flowId: string }>
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const session = await requireSession()
    const params = flowIdParamsSchema.parse(await context.params)
    const input = createFlowStepBodySchema.parse(await request.json())
    const data = await createFlowStepForUser(session.user, params.flowId, input)
    return ok(data, 201)
  } catch (error) {
    return fail(error)
  }
}
