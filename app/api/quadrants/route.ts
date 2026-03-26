import { NextRequest } from "next/server"
import { quadrantsQuerySchema } from "@/features/quadrants/server/quadrants.schema"
import { getQuadrantsData } from "@/features/quadrants/server/quadrants.service"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

export async function GET(request: NextRequest) {
  try {
    const session = await requireSession()
    const query = Object.fromEntries(request.nextUrl.searchParams.entries())
    const input = quadrantsQuerySchema.parse(query)
    const data = await getQuadrantsData(session.user, input)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
