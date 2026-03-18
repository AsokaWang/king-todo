import { getTodaySummary } from "@/features/today/server/today.service"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

export async function GET() {
  try {
    const session = await requireSession()
    const data = await getTodaySummary(session.user)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
