import { listTimeEntriesForUser } from "@/features/time-entries/server/time-entry.service"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

export async function GET() {
  try {
    const session = await requireSession()
    const data = await listTimeEntriesForUser(session.user)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
