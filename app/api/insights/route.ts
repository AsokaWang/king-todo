import { NextRequest } from "next/server"
import { insightsQuerySchema } from "@/features/insights/server/insights.schema"
import { getInsightsData } from "@/features/insights/server/insights.service"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

export async function GET(request: NextRequest) {
  try {
    const session = await requireSession()
    const query = Object.fromEntries(request.nextUrl.searchParams.entries())
    const input = insightsQuerySchema.parse(query)
    const data = await getInsightsData(session.user, input)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
