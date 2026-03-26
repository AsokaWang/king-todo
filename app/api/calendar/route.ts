import { NextRequest } from "next/server"
import { calendarQuerySchema } from "@/features/calendar/server/calendar.schema"
import { getCalendarData } from "@/features/calendar/server/calendar.service"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

export async function GET(request: NextRequest) {
  try {
    const session = await requireSession()
    const query = Object.fromEntries(request.nextUrl.searchParams.entries())
    const input = calendarQuerySchema.parse(query)
    const data = await getCalendarData(session.user, input)
    return ok(data)
  } catch (error) {
    return fail(error)
  }
}
